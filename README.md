# The Superhuman Register

A cross-publisher field guide to costumed heroes — origins, powers, and the people behind the mask.

A single-page encyclopedia-style app with two views: a filterable specimen grid of heroes, and a per-hero dossier (bio, powers, animated power-grid stats, key relationships).

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
  App.tsx               state (view / house filter / selected hero) + animation logic
  components/
    IndexView.tsx        specimen grid + house filter chips
    DetailView.tsx        hero dossier (bio, powers, power grid, relationships)
  data/superheroes.ts    hero content (source of truth)
  types.ts               Hero/House/Stat/Relationship types
  styles/global.css      fonts, reset, reveal-animation & hover rules
legacy/                  original design-canvas prototype this app was ported from
```

See `CLAUDE.md` for the full design system (fonts, colors, motion principles) and architecture notes.
