# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
I'm working with TypeScript.
I'm working with React.
I'm using Vite as a build tool.
On the start of every response, say my name.
On every code change, update the README.md file to reflect the change.
dont runa visual validation, ill handle that, just verify the project runs and the code is valid TypeScript/React.

## Commands

```
npm install       # install dependencies
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # typecheck (tsc -b) then production build to dist/
npm run preview   # serve the production build locally
```

There is no lint or test setup in this project yet.

## Architecture

This is a single-page Vite + React + TypeScript app ("The Superhuman Register") with no router. It has exactly two views, toggled by state rather than routes:

- `src/App.tsx` is the app's brain. It owns the three pieces of state (`view: 'index' | 'detail'`, `activeHouse`, `selectedId`) and derives everything else (filtered list, house chips, selected hero + prev/next) fresh on every render from `src/data/superheroes.ts`. It also owns all the imperative DOM/animation logic via refs — not idiomatic React, but deliberate:
  - **Scroll reveal** (`checkReveals`/`setupReveals`/`reveal`) — `[data-reveal]` elements fade/rise in via a plain scroll/resize position check (not `IntersectionObserver`, since its first async callback can be dropped mid-transition and leave cards blank).
  - **FLIP card transitions** (`snapshotCards`/`runFilterFlip`) — when the house filter changes, card positions are snapshotted _before_ the state update, then diffed against post-render positions to slide surviving cards and fade out removed ones via a fixed overlay layer.
  - **Animated stat bars/counters** (`animateBars`/`maybeAnimateBars`) — the detail view's "Power Grid" bars and counters animate once, the first time they're scrolled into view per character.
  - A `componentDidUpdate`-style `useEffect` (keyed on `[view, activeHouse, selectedId]`, explicitly skipped on mount via `mountedRef`) tracks what changed since the last render and decides which of the above to (re)run.
  - All of this is a hand-port of a legacy class-component runtime (see `legacy/`) — if behavior seems over-engineered for "just" a filter/detail toggle, that's why.
- `src/components/IndexView.tsx` and `src/components/DetailView.tsx` are pure presentational components — all props in, no state, no effects.
- `src/data/superheroes.ts` is the single source of truth for content (10 heroes across 5 publishers/houses). `src/types.ts` defines `Hero`, `House` (a union derived from the `HOUSES` const tuple), `Stat`, `Relationship`.
- `legacy/Superhero Register.dc.html` + `legacy/support.js` are the original design-canvas prototype this app was ported from (a custom template DSL — `sc-if`/`sc-for`/`{{ }}` bindings — interpreted by a React-based runtime). Kept for historical/behavioral reference only; not part of the build.

## Design System

The visual language is a print/editorial "field guide" or specimen-encyclopedia aesthetic, not a typical app UI — inspired by the framing text "Encyclopædia · Edition I" and "A cross-publisher field guide to costumed heroes."

**Typography** (Google Fonts, loaded in `index.html`):

- `Newsreader` (serif, ital+opsz axes) — display headings (`h1`/`h3`/`h4`) and italic sub-labels (aliases, dossier body copy). Tight letter-spacing (`-.01em` to `-.022em`), large sizes via `clamp()`.
- `Space Mono` (monospace) — all-caps micro-labels, metadata, stat values, chip buttons. Wide letter-spacing (`.06em`–`.22em`), small sizes (9–12px).
- `Public Sans` — base body font (`body` element).

**Color palette:**

- Background: `#f4f2ec` (warm off-white paper)
- Ink/text: `#191816` (near-black), with translucency for hierarchy (`rgba(25,24,22,.4–.62)` for secondary text, `.1–.22` for hairline borders)
- Bio copy: `#26241f`; prowess callout background: `#faf8f3`
- Per-hero **accent** colors are hand-picked `oklch(0.58 <chroma> <hue>)` values (one per hero, stored on each record in `superheroes.ts`) — used for card corner brackets, the detail page's accent bar/dot, power-grid bar fill, and bullet marks
- Placeholder "portrait" blocks use a diagonal repeating-linear-gradient hatch (`#e7e3da`/`#eeeae2`) rather than real images
- Selection highlight is inverted (`::selection { background:#191816; color:#f4f2ec }`)

**Motion principles** (all reversible via a `motion` prop/flag — see `App.tsx`, `motion === false` short-circuits every animation to its end state):

- Staggered reveal-on-scroll for nearly every section/card (`data-reveal` + `data-stagger`, ~55ms per step, capped at 900ms delay), using `cubic-bezier(.16,1,.3,1)` for an eased "settle" feel
- FLIP-based re-layout when filtering the grid, rather than an instant re-render
- Stat bars and counters animate from zero once actually scrolled into view (not on mount), with a ~450ms "lead" delay so the section settles first

**Content model:** each hero record carries `id, no (catalog number), name, alias, house, publisher, first (first appearance), accent, bio, powers[], affiliations[], relationships[], stats[] (Intelligence/Strength/Speed/Durability/Energy/Fighting, 0–7 scale), prowessLabel, prowessNote`. The index view is a numbered specimen grid grouped/filterable by publisher "house"; the detail view is a dossier layout (portrait + facts on the left, bio/powers/power-grid/relationships/prowess callout on the right).
