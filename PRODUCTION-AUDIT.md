# NLDS 2026 — PRODUCTION TRAFFIC & CONCURRENCY AUDIT

**Date:** 2026-08-27  
**Scope:** Complete registration flow — 50+ participants  
**Target:** Vercel (Hobby/Pro) → Next.js 16 → Prisma 5 → YugabyteDB → Google Drive / Sheets / Telegram / Resend  
**Methodology:** Static analysis of all source files in the current codebase  

---

## ARCHITECTURE OVERVIEW (AS INSPECTED)

```
Participant Browser
  ├── File Upload (XHR + FormData) ──→ /api/register/upload/cv   ──→ Google Drive API
  │                                 ──→ /api/register/upload/photo ──→ Google Drive API
  └── Form Submit (fetch POST JSON) ──→ /api/register/submit ───→ Prisma $transaction ──→ YugabyteDB
                                                                └── syncService.dispatch() (awaited)
                                                                    ├── TelegramStrategy    → Telegram Bot API
                                                                    ├── GoogleSheetsStrategy → Sheets API
                                                                    ├── EmailStrategy        → Resend API
                                                                    └── SocketIoStrategy     → localhost:3001 (non-blocking)
```

**Critical path timing per registration:**
1. Duplicate check (1 DB query) → ~50ms
2. Validation (Zod) → ~5ms
3. Entity/IG resolution (2–4 DB queries + possible creates) → ~100–200ms
4. `$transaction` (upsert Participant + create Registration + create Documents + create AuditLog) → ~200–500ms
5. `syncService.dispatch()` (4 strategies via `Promise.allSettled`) → ~1–5s
6. **Total per request: ~2–6 seconds**

---

## 1. DATABASE — Prisma + YugabyteDB

### 1.1 Connection Pooling

| Item | Current State | Assessment |
|------|--------------|------------|
| `connection_limit` | **NOT CONFIGURED** in DATABASE_URL | ⚠️ POTENTIAL BOTTLENECK |
| `pool_timeout` | **NOT CONFIGURED** in DATABASE_URL | ⚠️ POTENTIAL BOTTLENECK |
| PrismaClient instantiation | Singleton via `globalForPrisma` pattern ✅ | SAFE AS-IS |
| Prisma log level | `["error", "info", "warn", "query"]` — query logging on in prod | ⚠️ Performance overhead in production |

**Analysis:**  
Prisma defaults to `connection_limit=5` when not specified. On Vercel serverless, each function invocation can spin up its own PrismaClient instance. Although the singleton pattern prevents multiple clients *within the same container*, Vercel can spin up **N concurrent containers** — each opening up to 5 connections. With 20 simultaneous submissions, you could open **100 DB connections**.

YugabyteDB's free/starter tier typically allows 10–15 concurrent connections. **This is the #1 risk.**

**Recommendation:** Add `?connection_limit=3&pool_timeout=10` to DATABASE_URL. This keeps each Vercel container at 3 connections max, allowing ~6–7 containers to coexist within YugabyteDB's limit.

### 1.2 Transaction Duration

| Item | Current State | Assessment |
|------|--------------|------------|
| `maxWait` | 15,000ms (15s) | SAFE AS-IS for 50 users |
| `timeout` | 25,000ms (25s) | SAFE AS-IS for 50 users |
| Transaction scope | Participant upsert + Registration create + Documents create + AuditLog create | SAFE — well-scoped |

**Analysis:** The transaction (`registration.repository.ts:51–86`) does 3–4 operations. At ~50–100ms each, total is well under 25s. The generous timeouts protect against YugabyteDB latency spikes. **This is well designed.**

### 1.3 Concurrent Writes

| Item | Current State | Assessment |
|------|--------------|------------|
| Unique constraints | `nationalIdOrPassport` (Participant), `referenceCode` (Registration) | ✅ SAFE |
| Duplicate check pre-transaction | `findUnique` on `nationalIdOrPassport` before insert | ✅ SAFE |
| Upsert in transaction | `participant.upsert` inside `$transaction` | ✅ SAFE |
| Race condition on duplicate check | Time-of-check-to-time-of-use (TOCTOU) gap between findUnique and $transaction | ⚠️ LOW RISK — DB unique constraint acts as final guard |

**Analysis:** If two requests hit `/api/register/submit` simultaneously with the same NIC/Passport, the duplicate check at route.ts:22–29 could pass for both (TOCTOU). However, the `@unique` constraint on `Participant.nationalIdOrPassport` will cause the second `$transaction` to fail with a Prisma error. The error handler returns a 500 (not a clean 409). **Low risk at 50 users but could produce a confusing error message.**

### 1.4 Reference Code Collision

| Item | Current State | Assessment |
|------|--------------|------------|
| Generation method | `Math.random().toString(36).substring(2, 8).toUpperCase()` | ⚠️ Minor concern |
| Collision probability at 50 | ~1 in 2,176,782 per pair → negligible | SAFE for 50 users |
| DB constraint | `referenceCode @unique` — Prisma will fail on collision | ✅ Fallback exists |

**Verdict:** SAFE at 50 users. At 500+ you'd want UUID/nanoid.

---

## 2. VERCEL / NEXT.JS

### 2.1 Serverless Function Limits

| Item | Hobby Plan | Pro Plan | Current State |
|------|-----------|---------|---------------|
| Execution timeout | 10s | 60s | ⚠️ **NOT CONFIGURED** (no `maxDuration` export) |
| Memory | 1024 MB | 1024 MB (configurable to 3008) | Default |
| Body size limit | 4.5 MB | 4.5 MB | ⚠️ **NOT CONFIGURED** (no `bodySizeLimit`) |
| Concurrent executions | 1000 | 1000 | SAFE for 50 |
| `vercel.json` | Does not exist | — | — |

**CRITICAL: Hobby Plan Timeout Risk**

The submit route does:
1. DB queries (~200–500ms)
2. DB transaction (~200–500ms)  
3. `syncService.dispatch()` awaits **all 4 strategies** via `Promise.allSettled` (~1–5s)

Total: **2–6 seconds on average, potentially 8–10s under load.**

On Hobby plan (10s timeout), this is dangerously close. If Google Sheets API is slow or Telegram has a hiccup, the function **will timeout**, and the participant will see an error even though their DB record was saved.

### 2.2 File Upload Handling

| Item | Current State | Assessment |
|------|--------------|------------|
| File reading | `Buffer.from(await file.arrayBuffer())` — **entire file loaded into memory** | ⚠️ Works but not ideal |
| CV max size | 10 MB | Within Vercel's 4.5MB body limit? **NO — EXCEEDS LIMIT** |
| Photo max size | 5 MB | Exceeds Vercel's 4.5 MB body limit |
| File type validation | MIME type check on server ✅ | SAFE |
| Filename sanitization | Regex cleanup + random suffix ✅ | SAFE |

**⚠️ HIGH PRIORITY: Vercel's default body size limit is 4.5 MB.** Any CV > 4.5 MB will be rejected by Vercel before your code even runs. Your code allows up to 10 MB, but Vercel will kill the request at 4.5 MB. Users will see a generic error.

### 2.3 Concurrent Execution Behavior

| Item | Current State | Assessment |
|------|--------------|------------|
| Cold starts | Each new container initializes PrismaClient + GoogleDriveClient + Google Auth | ~1–3s overhead |
| Warm container reuse | Singleton pattern works correctly with `globalForPrisma` | ✅ SAFE |
| Module-level instantiation | `const driveClient = new GoogleDriveClient()` at module scope in upload routes | ✅ Efficient (reused in warm containers) |
| `syncService` module-level init | Strategies registered at module scope | ✅ Efficient |

---

## 3. GOOGLE DRIVE

### 3.1 Concurrent Uploads

| Item | Current State | Assessment |
|------|--------------|------------|
| API quota | 20,000 queries/100s/user for service accounts | ✅ SAFE for 50 users |
| Rate limiting | **NONE** — concurrent uploads fire without throttling | ⚠️ SAFE at 50, risky at 100+ |
| Retry handling | **NONE** — single attempt, then error | ⚠️ POTENTIAL BOTTLENECK |
| Duplicate uploads | **YES, POSSIBLE** — re-uploading creates a new file with a new name each time | ⚠️ Creates orphaned files |
| Error logging | `require('fs').writeFileSync('upload_error.txt')` — **will fail on Vercel** (read-only filesystem) | ⚠️ BROKEN ON PRODUCTION |

**Analysis:** Google Drive API allows ~12,000 write requests per minute for service accounts. 50 users uploading 2 files each = 100 uploads. Even if all hit simultaneously, this is well within quota. However, the **zero-retry policy** means any transient Google API error fails the upload entirely. The user CAN re-upload (replacing their file), but this creates **orphaned files** in Google Drive.

### 3.2 `require('fs').writeFileSync` on Vercel

Both `cv/route.ts:54` and `photo/route.ts:56` write error logs to disk. **Vercel's filesystem is read-only** — this `writeFileSync` call will throw an exception inside the catch block, potentially swallowing the original error. This is a **broken error handler in production**.

---

## 4. GOOGLE SHEETS

### 4.1 Implementation Review

| Item | Current State | Assessment |
|------|--------------|------------|
| Idempotent upsert | ✅ **YES** — `upsertRow()` searches Column A for referenceCode, updates if found, appends if not | WELL DESIGNED |
| Concurrent writes | ⚠️ **RACE CONDITION** — two concurrent `values.get` + `values.append` could both "not find" the same row and both append | POTENTIAL BOTTLENECK |
| API quota | 300 read requests/min, 300 write requests/min per user | ⚠️ At 50 concurrent submissions → 100 API calls (50 reads + 50 writes) within seconds |
| Retry handling | **NONE** — throws on failure | ⚠️ POTENTIAL BOTTLENECK |

**Race Condition Detail:**  
The `upsertRow` method does a **read-then-write** pattern:
1. Read Column A to find the referenceCode → not found
2. Append new row

If two requests process the same registration (shouldn't happen due to DB idempotency), both could append. However, the ExternalSync service guards against this with its `findFirst(status: "SUCCESS")` check. **The real risk is the Sheets API quota being exhausted during burst traffic.** 

Google Sheets API has a hard limit of **300 write requests per minute** for a single spreadsheet. Each submission uses 1 read + 1 write. 50 concurrent submissions = 50 reads + 50 writes = 100 API calls. **This is within limits** but leaves no headroom for retries.

---

## 5. TELEGRAM

| Item | Current State | Assessment |
|------|--------------|------------|
| API rate limit | 30 messages/second to a group chat | ✅ SAFE for 50 users |
| Retry handling | **NONE** | ⚠️ |
| Does failure block registration? | **NO** ✅ | The syncService uses `Promise.allSettled` + catch, then records `FAILED` in ExternalSync. DB registration is already saved before sync runs. |
| Error handling | Throws on non-OK response → caught by syncService → stored in ExternalSync table | ✅ WELL DESIGNED |

**Verdict:** SAFE AS-IS. Telegram failures do NOT block registration. The ExternalSync table records failures correctly.

---

## 6. RESEND (Email)

| Item | Current State | Assessment |
|------|--------------|------------|
| Free tier limit | 100 emails/day, 1 email/second | ⚠️ POTENTIAL BOTTLENECK if on free tier |
| Pro tier limit | 50,000 emails/month | ✅ SAFE |
| Does failure block registration? | **NO** ✅ | Same as Telegram — handled via syncService |
| Unverified domain handling | Gracefully degrades with a mock return | ✅ Smart |
| Retry handling | **NONE** | ⚠️ Single attempt |

**Analysis:** If on Resend's **free tier** (100 emails/day), 50 registrations use 50 emails — half the daily quota. If testing earlier consumed some, you could hit the limit. On Pro tier, this is a non-issue.

**Key finding:** Email failures do NOT block registration. They create a `FAILED` ExternalSync record. ✅

---

## 7. EXTERNALSYNC SERVICE — Deep Inspection

This is the **most important architectural component** in the system. Let me break it down:

### 7.1 What ExternalSync ALREADY Provides ✅

| Feature | Implemented? | Details |
|---------|-------------|---------|
| **Idempotency** | ✅ **YES** | `handleDispatch()` checks for existing `SUCCESS` record before executing. Re-dispatching won't create duplicates. |
| **Failure recording** | ✅ **YES** | Failed strategies create `FAILED` records with error messages in the ExternalSync table. |
| **Non-blocking failures** | ✅ **YES** | `Promise.allSettled` ensures one strategy failing doesn't prevent others from executing. |
| **Attempt tracking** | ✅ **YES** | `attempts` field tracks how many times a sync was attempted. |
| **Per-provider tracking** | ✅ **YES** | Each provider (TELEGRAM, GOOGLE_SHEETS, RESEND_EMAIL, SOCKET_IO_REALTIME) gets its own ExternalSync record. |
| **DB registration completes first** | ✅ **YES** | The `$transaction` in `registration.repository.ts` completes and returns BEFORE `syncService.dispatch()` runs. |

### 7.2 What ExternalSync is MISSING ⚠️

| Feature | Status | Impact |
|---------|--------|--------|
| **Automatic retry** | ❌ NOT IMPLEMENTED | Failed syncs stay as `FAILED` forever. No automatic retry mechanism. |
| **Manual retry API** | ❌ NOT IMPLEMENTED | No admin endpoint to re-trigger failed syncs. |
| **Retry count logic** | ❌ PARTIAL | `attempts` field exists but is hardcoded to `1` — never incremented on retry because retries don't exist. |
| **PENDING record race condition** | ⚠️ YES | If a serverless function times out after creating a `PENDING` record but before updating to `SUCCESS`/`FAILED`, the record stays `PENDING` forever. The idempotency check only looks for `SUCCESS`, so a retry would create a SECOND `PENDING` record instead of updating the first. |
| **Duplicate PENDING records** | ⚠️ POSSIBLE | Due to the above, a function timeout + retry could create duplicate external records (e.g., two Google Sheets rows). There's no `@@unique([registrationId, provider, eventType])` constraint. |

### 7.3 Verdict on ExternalSync

**For 50 users:** The ExternalSync design is **remarkably solid**. The core database registration is never at risk. External failures are properly isolated and recorded. The idempotency check prevents duplicate notifications on re-execution.

**The only real gap:** Failed syncs cannot be retried later without writing a manual script or admin endpoint. For 50 users, you can manually check the ExternalSync table and re-trigger if needed.

---

## 8. SECURITY

### 8.1 Rate Limiting

| Item | Current State | Assessment |
|------|--------------|------------|
| Rate limiter exists | ✅ `RateLimiter` class in `security/rate-limiter.ts` | — |
| Applied to registration submit | ❌ **NOT APPLIED** | ⚠️ HIGH PRIORITY |
| Applied to file uploads | ❌ **NOT APPLIED** | ⚠️ HIGH PRIORITY |
| Applied to OTP routes | ✅ Applied (100 requests / 10 min) | — |
| Storage | In-memory `Map` (per-container) | ⚠️ Each Vercel container has its own Map — rate limiting is **per-container**, NOT global |

**Analysis:** The rate limiter EXISTS but is only used on OTP routes (which are deprecated). The `/api/register/submit` and `/api/register/upload/*` routes have **ZERO rate limiting**. A malicious actor could spam submissions.

However, at 50 legitimate users, this is LOW risk. The real protection is the `nationalIdOrPassport` unique constraint in the DB.

### 8.2 Upload Security

| Item | Current State | Assessment |
|------|--------------|------------|
| File type validation (server) | ✅ MIME type check for CV (PDF only) and Photo (JPEG/PNG/WEBP) | SAFE |
| File type validation (client) | ✅ Extension check in `FileUpload.tsx` | SAFE |
| File size validation (server) | ✅ CV: 10MB, Photo: 5MB | SAFE (but see Vercel body limit issue) |
| File size validation (client) | ✅ Same limits checked before upload | SAFE |
| Filename sanitization | ✅ Regex + random suffix | SAFE |
| No authentication on uploads | ⚠️ Anyone can upload files without being in a registration flow | LOW RISK for 50 users |

### 8.3 Request Validation

| Item | Current State | Assessment |
|------|--------------|------------|
| Server-side Zod validation | ✅ `ServerRegistrationSchema` validates all fields | SAFE |
| Client-side Zod validation | ✅ Per-step schemas with react-hook-form | SAFE |
| SQL injection | ✅ Protected — Prisma parameterizes all queries | SAFE |
| XSS | ✅ React auto-escapes, security headers set in next.config.ts | SAFE |
| CSRF | ⚠️ No CSRF token — POST routes accept JSON from any origin | LOW RISK (same-origin fetch + SameSite cookies) |

### 8.4 Spam / Duplicate Protection

| Item | Current State | Assessment |
|------|--------------|------------|
| Duplicate NIC/Passport | ✅ Checked before AND enforced by DB unique constraint | SAFE |
| Duplicate email | ⚠️ `personalEmail` is NOT unique in schema, `aiesecEmail` IS unique | See below |
| Duplicate registration | ✅ Query checks for existing non-CANCELLED registration for the NIC | SAFE |

**Note:** `personalEmail` has no `@unique` constraint in the Prisma schema. Two registrations with the same personal email but different NIC numbers would both succeed. This may be intentional (e.g., family members sharing an email), but worth noting.

---

## 9. FRONTEND

### 9.1 Multiple-Click Submit Protection

| Item | Current State | Assessment |
|------|--------------|------------|
| `isSubmitting` state guard | ✅ `if (isSubmitting) return;` at line 245 | SAFE |
| Button disabled during submit | ✅ `disabled={isSubmitting}` on submit button | SAFE |
| Button text changes | ✅ Shows "TRANSMITTING..." during submit | SAFE |
| Double-submit via rapid Enter key | ⚠️ The `<form>` can still be submitted via Enter before `isSubmitting` state updates | VERY LOW RISK |

### 9.2 Upload Progress

| Item | Current State | Assessment |
|------|--------------|------------|
| XHR progress tracking | ✅ `xhr.upload.onprogress` with percentage display | SAFE |
| Indeterminate state | ✅ Falls back to indeterminate progress bar | SAFE |
| Upload state isolation | ✅ `isUploading` flag prevents re-upload during active upload | SAFE |

### 9.3 Error Handling / Retry

| Item | Current State | Assessment |
|------|--------------|------------|
| Submit failure display | ✅ Error shown in `SubmissionSuccess` component with "RETRY TRANSMISSION" button | SAFE |
| Upload failure display | ✅ Error banner with message in `FileUpload` component | SAFE |
| Upload retry | ✅ User can re-click to re-upload (picks new file) | SAFE |
| Re-upload creates orphan on Drive | ⚠️ Each re-upload creates a NEW file — old file stays on Drive | LOW CONCERN |

### 9.4 Session Recovery

| Item | Current State | Assessment |
|------|--------------|------------|
| Background tab recovery | ✅ `sessionStorage` backup on every form change | SAFE |
| Manual refresh clears data | ✅ Performance API navigation type check | SAFE |
| Post-submit cleanup | ✅ `sessionStorage.removeItem("nlds_reg_backup")` on success | SAFE |

### 9.5 Network Interruption

| Item | Current State | Assessment |
|------|--------------|------------|
| Submit timeout handling | ⚠️ `fetch()` has NO timeout configured — will hang indefinitely if Vercel doesn't respond | POTENTIAL ISSUE |
| XHR upload timeout | ⚠️ No `xhr.timeout` set on upload requests | POTENTIAL ISSUE |
| Offline detection | ❌ No `navigator.onLine` check | NICE TO HAVE |

---

## 10. ADDITIONAL FINDINGS

### 10.1 `require('fs').writeFileSync` in Upload Routes (BROKEN)
- **Files:** `cv/route.ts:54`, `photo/route.ts:56`
- **Impact:** Vercel's filesystem is read-only. This `writeFileSync` call inside the catch block will throw a second exception, potentially swallowing the original upload error. The user could see a generic 500 instead of the actual error.
- **Priority:** HIGH — must be removed.

### 10.2 Prisma Query Logging in Production
- **File:** `prisma.ts:30` — `log: ["error", "info", "warn", "query"]`
- **Impact:** Every SQL query is logged to stdout. On Vercel, this counts toward logging bandwidth and adds ~5% latency overhead. For 50 users, this is fine for debugging but should be reduced to `["error", "warn"]` in production.

### 10.3 Socket.IO Strategy Points to localhost
- **File:** `publisher.ts:7` — `return "http://localhost:3001"`
- **Impact:** On Vercel, this will fail silently (connection refused). The SocketIoStrategy will always create a `FAILED` ExternalSync record. This does NOT block registration but is noise.

### 10.4 `fs.writeFileSync` is Synchronous
- The `require('fs')` call in upload routes also uses CommonJS `require` inside an ES module context, which works but is unconventional.

### 10.5 2.5-Second Artificial Delay
- **File:** `RegistrationForm.tsx:293` — `await new Promise((resolve) => setTimeout(resolve, 2500))`
- **Impact:** Every successful submission waits 2.5 seconds for "cinematic" effect. This is by design but worth remembering when measuring user-perceived latency. Total submit time = **API time (2–6s) + 2.5s = 4.5–8.5s.**

---

## FINAL VERDICT

### A. SAFE AS-IS ✅

| Component | Why |
|-----------|-----|
| **Prisma singleton pattern** | Prevents multiple PrismaClient instances per container |
| **DB transaction design** | Well-scoped, properly timed (15s wait / 25s timeout) |
| **Duplicate submission guard** | NIC/Passport unique constraint + pre-check query |
| **ExternalSync idempotency** | Prevents duplicate Telegram/Sheets/Email on re-execution |
| **ExternalSync isolation** | Failures don't block DB registration |
| **Server-side validation** | Zod schema validates all fields |
| **Client-side validation** | Per-step Zod schemas with react-hook-form |
| **File type + size validation** | Both client and server enforce limits |
| **Multiple-click protection** | `isSubmitting` guard + button disabled |
| **Session recovery** | Smart sessionStorage backup/restore |
| **Upload progress tracking** | XHR progress with visual feedback |
| **Security headers** | HSTS, X-Frame-Options, X-Content-Type-Options, etc. |
| **Google Sheets upsert** | Idempotent write by referenceCode |
| **Telegram rate limits** | 50 messages << 30/second limit |
| **Error message sanitization** | Technical DB errors hidden from users |

### B. POTENTIAL BOTTLENECKS ⚠️

| # | Component | Risk | Impact at 50 users |
|---|-----------|------|-------------------|
| B1 | **Prisma connection_limit not set** | Each Vercel container opens up to 5 connections. 20 concurrent containers = 100 connections. | YugabyteDB may reject connections, causing 500 errors |
| B2 | **syncService.dispatch() is awaited** | All 4 strategies run before the response is sent. Slow Google Sheets or Telegram delays the user response. | User sees 5–10s submit time; Hobby plan may timeout |
| B3 | **Resend free tier limit** | 100 emails/day max on free tier | Could exhaust quota if > 100 registrations + tests |
| B4 | **Google Sheets race condition** | Two concurrent reads before write could produce duplicate rows | Low probability but possible under burst |
| B5 | **No retry on external integrations** | A transient Google/Telegram failure = permanent FAILED record | Admin must manually check/re-trigger |

### C. HIGH PRIORITY FIXES 🔴

| # | Fix | Why | Effort |
|---|-----|-----|--------|
| C1 | **Add `connection_limit=3&pool_timeout=10` to DATABASE_URL** | Without this, 20+ concurrent Vercel containers will exhaust YugabyteDB's connection limit, causing widespread 500 errors. This is the **single most likely failure mode** at 50 concurrent users. | 1 min — env variable change |
| C2 | **Remove `require('fs').writeFileSync` from upload routes** | This crashes inside the catch block on Vercel (read-only FS), swallowing the actual error. Users see a blank 500 with no useful error returned. | 2 min — delete 2 lines |
| C3 | **Set `export const maxDuration = 30` on submit route** | Without this on Vercel Pro, the default timeout may be too short given the awaited sync dispatch. On Hobby, you CANNOT change this (10s max), making the risk real. | 1 min — 1 line |
| C4 | **Add `bodySizeLimit` or reduce CV max size to 4MB** | Vercel's 4.5MB body limit means any CV upload > 4.5MB silently fails. Either increase the limit (Pro plan config) or reduce the allowed CV size to 4MB to match Vercel's constraint. | 1 min — change validation constant |

### D. NICE-TO-HAVE FIXES 🟡

| # | Fix | Why | Effort |
|---|-----|-----|--------|
| D1 | **Add rate limiting to `/api/register/submit`** | RateLimiter exists but isn't applied to registration. Add `RateLimiter.check(ip, 5, 60000)` to prevent spam. | 5 min |
| D2 | **Add rate limiting to `/api/register/upload/*`** | Same — prevent someone from flooding Google Drive with file uploads. | 5 min |
| D3 | **Add `fetch` timeout on frontend submit** | Currently `fetch("/api/register/submit")` has no timeout. If Vercel hangs, the user waits forever. Use `AbortController` with 15s timeout. | 5 min |
| D4 | **Reduce Prisma log level in production** | Change to `["error", "warn"]` to reduce Vercel logging overhead. | 1 min |
| D5 | **Disable SocketIoStrategy in production** | It always fails (localhost:3001 not available on Vercel) and creates noise in ExternalSync table. | 2 min |
| D6 | **Add retry endpoint for failed ExternalSyncs** | Allow admin to re-trigger FAILED sync records. The infrastructure (ExternalSync table) already supports this. | 30 min |
| D7 | **Add `@@unique([registrationId, provider, eventType])` to ExternalSync** | Prevents duplicate PENDING records if a function times out mid-sync. | 5 min — schema + migration |
| D8 | **Add `xhr.timeout = 30000` to upload XHR** | Prevents infinite hang on slow/dead connections. | 1 min |

### E. NOT REQUIRED FOR 50+ USERS ❌

| Item | Why Not Required |
|------|-----------------|
| Redis queue | The `Promise.allSettled` + ExternalSync pattern handles concurrency adequately for 50 users |
| Background job system | Same — sync is fast enough to run inline at this scale |
| CDN for uploads | Files go directly to Google Drive — no public serving needed |
| Database connection pooler (PgBouncer) | `connection_limit=3` in DATABASE_URL is sufficient at this scale |
| Separate microservices | Monolithic Next.js handles this workload fine |
| WebSocket server in production | Registration flow doesn't need real-time updates |
| Global rate limiting (Redis/Upstash) | Per-container rate limiting is sufficient for 50 users |
| CSRF tokens | Same-origin fetch + JSON content type provides adequate protection |
| File virus scanning | PDF/image files from AIESEC members — low risk |
| Load balancer | Vercel handles this automatically |

---

## LOAD SCENARIO ANALYSIS

### Scenario 1: 50 registrations total (spread over hours/days)
**Verdict: ✅ SAFE** — No concurrency issues. Each request gets its own warm container.

### Scenario 2: 50 registrations within 10 minutes
**Verdict: ✅ SAFE WITH C1 FIX** — ~5 req/min average. Vercel will reuse warm containers. Apply C1 (connection_limit) to prevent connection exhaustion.

### Scenario 3: 50 registrations within 5 minutes
**Verdict: ⚠️ SAFE WITH C1+C3+C4 FIXES** — ~10 req/min. Multiple concurrent containers. Need connection pooling (C1), timeout config (C3), and body size fix (C4).

### Scenario 4: 20+ simultaneous submissions
**Verdict: ⚠️ NEEDS C1** — 20 containers × 5 connections = 100 connections. YugabyteDB will likely reject the excess. With C1 (limit=3): 20 × 3 = 60 connections — still aggressive but survivable.

### Scenario 5: Multiple simultaneous CV uploads
**Verdict: ⚠️ NEEDS C2+C4** — Google Drive API can handle it, but Vercel's body limit (4.5MB) means large CVs fail silently. Also, the broken error handler (C2) hides errors.

### Scenario 6: Multiple simultaneous photo uploads
**Verdict: ⚠️ NEEDS C2+C4** — Same as CVs. Photos are 5MB max but Vercel caps at 4.5MB.

---

## EXECUTIVE SUMMARY

The NLDS 2026 registration system has **strong architectural foundations**:
- The ExternalSync pattern with idempotency checks is well-designed
- DB transactions are properly scoped and timed
- Duplicate submission protection is robust (DB constraint + pre-check)
- External integration failures are properly isolated from core registration
- Frontend submit protection and session recovery are well implemented

**The system CAN handle 50+ registrations** with **4 small fixes** (C1–C4), none of which require architectural changes:

1. **Add `connection_limit=3` to DATABASE_URL** (1 minute)
2. **Remove broken `writeFileSync` from upload error handlers** (2 minutes)
3. **Export `maxDuration` on submit route** (1 minute)
4. **Align file size limits with Vercel's body limit** (1 minute)

**Total estimated fix time: ~5 minutes of code changes.**

No Redis. No queues. No new databases. No architectural changes needed.
