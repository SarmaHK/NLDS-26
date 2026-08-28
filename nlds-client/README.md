# NLDS 2026 — Official Website

**National Leadership Development Seminar 2026**  
Organized by AIESEC in Sri Lanka

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion + Lenis
- **Icons:** Lucide React

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── layout/       # Navbar, MobileMenu, Footer
│   ├── hero/         # Hero section
│   ├── sections/     # All page sections
│   └── ui/           # Reusable UI primitives
├── data/             # Typed event data (event, speakers, agenda, partners, team)
└── lib/              # Utilities, constants, metadata factory
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/partners` | Sponsors & Partners |
| `/delegates` | Room Allocation |
| `/store` | Merch Store |
| `/register` | Delegate Registration |

---

## Content Updates

All event content lives in `src/data/`:

- `event.ts` — Dates, venue, stats, tagline
- `speakers.ts` — Speaker profiles
- `agenda.ts` — 3-day schedule
- `partners.ts` — Sponsors and partners
- `team.ts` — MC and OC members

Update these files without touching component logic.

---

*Dream Bigger, Achieve Together. — AIESEC in Sri Lanka*
