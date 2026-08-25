# NLDS 2026 Registration System - Security Architecture

This document strictly defines the operational and application-layer security architecture deployed for the NLDS 2026 Platform.

## 1. Authentication & Identity Verification
- **AIESEC Identity Foundation**: The AIESEC Email is exclusively verified via high-entropy cryptographically secure OTPs (`crypto.scryptSync()`). The Personal Email field is isolated and deliberately blocked from authentication vectors to negate cross-channel identity spoofing.
- **OTP Hardening**: OTP codes are temporarily active (`600s/10m` expiry), mathematically constrained against brute force (`max 5 attempts`), implicitly revoked post-consumption, and safely decoupled from UI transmission responses.

## 2. Session Integrity & Exploitation Defenses
- **Storage Profile**: Authentication keys are issued strictly as UUIDv4 session identifiers. Sessions are persisted on the backend (State mapped in `ParticipantSession` and `AdminSession`).
- **XSS & Hijacking Resistances**: Next.js automatically transmits session tracking via `Set-Cookie` mapped explicitly to `HttpOnly: true, Secure: true (in Prod), SameSite: "Lax"`. Passively blocks DOM-based scraper scraping/hijacking natively via architecture config.

## 3. Authorization & RBAC Boundaries
- **Identity Decoupling**: API constraints operate purely off backend explicit mappings (`/api/admin-context`). `AdminUser` roles/permissions are never retrieved/parsed from arbitrary unvalidated JWT scopes.
- **Strict Hierarchy Check**: `OC_ADMIN` entities inherit dynamic capabilities (e.g. `VIEW_SENSITIVE_PROFILE`) enabling zero-trust isolation around Medical and Document PI.
- **Previlege Escalation Bounds**: `SUPER_ADMIN` tier represents root hierarchy—`MANAGE_ADMINS` delegated roles dynamically block upgrading arbitrary OC admins into `SUPER_ADMIN` layers.

## 4. Application Threat Mitigation
- **IDOR (Insecure Direct Object Reference) Mitigation**: Endpoints like `/api/register/status/[id]` aggressively tie the targeted generic payload (`UUID`) natively to the `session.participantId`. Participants can only extract their own datasets.
- **SSRF & Malicious File Disallowances**: Explicit regex boundaries (`z.string().url()`) filter `data:` or `javascript:` protocols across target elements (e.g., CV Document strings) neutralizing edge-node network probing.
- **CSRF (Cross-Site Request Forgery)**: Inherently safeguarded via `SameSite: Lax`, CORS Pre-flight checks on `application/json`, and decoupled NextJS boundaries.

## 5. Defense In Depth (Infrastructure vs. Application)
**Important Note:** The Next.js application executes algorithmic Rate Limiting (via transient memory map validations `security/rate-limiter.ts`) enforcing protections onto heavily asymmetric execution paths (`/request-otp` | `/verify-otp`). 
*HOWEVER*, Application node bounding **Does NOT** equal DDoS Protection. 

Volumetric DDoS/HTTP flood resistance is handled intrinsically outside this node boundary via:
- **Edge Layer (WAF / Cloudflare CDN)**: Mitigating HTTP parsing bursts, blocking IP anomalies natively, stopping layer 7 bots scaling operations natively before hitting Vercel/NextJS.
- **Private Data Network**: `YugabyteDB` connections reside isolated strictly relying on explicit Server runtime Environment Variables without external firewall bridges exposed.

## 6. Audit & Logging Integrities
- Every structural mutation (`REGISTRATION_ACCEPTED`, Admin Access, System State modifications) invokes asynchronous mapping into the `AuditLog` structure wrapping native `reviewer` parameters immutably. Stack traces and database failures are caught by native global NextJS API boundary interceptors resolving to safe generic HTTP closures (`500: Internal Server Interruption`).

## 7. Data Protection Strategies
- Yugabyte DB automated backup architectures require static chronological cron setups independently off application space.
- Internal Rationale (Admin Decisions) is structurally omitted from GET routes bound to the client environment, locking logical bias firmly on the administrative backend scope.
