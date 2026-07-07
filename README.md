# The Superhuman Register

A cross-publisher field guide to costumed heroes — origins, powers, and the people behind the mask.

A single-page encyclopedia-style app with a filterable specimen grid of heroes, a per-hero dossier (bio, powers, animated power-grid stats, key relationships), and a messages view for dispatches between the Registrar and cataloged heroes, with WhatsApp/Instagram-style quoted replies to a specific message. The messages view is a fixed two-pane layout (thread list + active chat) that each scroll independently, with the composer pinned to the bottom of the chat pane — nothing scrolls with the page. One thread is reserved for a Gemini-backed AI assistant — its reply is currently a placeholder pending a real backend. Includes a collapsible sidebar and a light/dark theme toggle (persisted to `localStorage`).

## Stack

Vite + React + TypeScript.

## Getting started

```
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  App.tsx               state (view / house filter / selected hero / message threads / theme) + animation logic
  components/
    Sidebar.tsx          collapsible nav + light/dark theme toggle
    IndexView.tsx        specimen grid + house filter chips
    DetailView.tsx        hero dossier (bio, powers, power grid, relationships)
    MessagesView.tsx     fixed-pane inbox: independently-scrolling thread list + active chat, pinned reply composer
    ProfileView.tsx      registrar profile page
  data/
    superheroes.ts       hero content (source of truth)
    profile.ts           mock profile "endpoint" (async stand-in for a future API call)
    messages.ts          mock message threads "endpoint" (async stand-in for a future TS API)
    ai.ts                mock Gemini reply "endpoint" for the reserved AI thread — seam for a future backend proxy (never call Gemini directly from the browser)
  types.ts               Hero/House/Stat/Relationship/Message/MessageThread/ThreadKind types
  styles/global.css      fonts, reset, theme variables, reveal-animation & hover rules
legacy/                  original design-canvas prototype this app was ported from
```

See `CLAUDE.md` for the full design system (fonts, colors, motion principles) and architecture notes.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages. Live at:

https://hagenguerrero.github.io/superhumanregister/

The Vite `base` path in `vite.config.ts` is set to `/superhumanregister/` to match this repo's Pages URL — update it if the repo is ever renamed or moved.
