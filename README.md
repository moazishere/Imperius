# Imperius website

Landing page for Imperius, built with Next.js (App Router), TypeScript and CSS Modules.

The original single-file page is kept in `reference/index.html` for comparison, and `index-analysis.md` holds the design review.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Pilot form

The form posts to a server action (`src/app/actions/pilot.ts`) that emails each request through [Resend](https://resend.com).
Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `PILOT_EMAIL_TO` and `PILOT_EMAIL_FROM`.
Without them, requests are logged to the terminal in development, and in production the visitor sees an error instead of a false "received".

## Where things live

| Path | What |
|---|---|
| `src/app/globals.css` | Colour tokens, reset, shared type, buttons, pills |
| `src/app/layout.tsx` | Fonts (`next/font`), page metadata |
| `src/app/page.tsx` | Section order |
| `src/content/` | All page text, including the English/Arabic demo strings |
| `src/components/` | One folder per area; each component has its own `.module.css` |
| `src/lib/bustGrid.ts` | The hero bust as a 64×85 halftone grid |

Components marked `"use client"` (Header, Hero, BustCanvas, MessIllustration, Demo, PilotForm) run in the browser; the rest render on the server.
