import { useEffect, useRef, useState, type CSSProperties } from "react";
import DetailView from "./components/DetailView";
import IndexView from "./components/IndexView";
import ProfileView from "./components/ProfileView";
import Sidebar, { MenuIcon } from "./components/Sidebar";
import { getProfile } from "./data/profile";
import { HEROES } from "./data/superheroes";
import "./styles/global.css";
import { HOUSES, MAX_STAT, type House, type UserProfile } from "./types";

export interface AppProps {
  startHouse?: House;
  motion?: boolean;
}

type View = "index" | "detail" | "profile";
type Theme = "light" | "dark";

const MOBILE_BREAKPOINT = 860;
const THEME_KEY = "shr-theme";

function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface CardSnapshot {
  top: number;
  left: number;
  width: number;
  height: number;
  html: string;
}

export default function App({ startHouse = "All", motion = true }: AppProps) {
  const [view, setView] = useState<View>("index");
  const [activeHouse, setActiveHouse] = useState<House | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [prowessIndex, setProwessIndex] = useState(0);
  const [prowessDir, setProwessDir] = useState<1 | -1>(1);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const flipSnapRef = useRef<Map<string, CardSnapshot> | null>(null);
  const fadeLayerRef = useRef<HTMLDivElement | null>(null);
  const barsDoneForRef = useRef<string | null>(null);
  const trackRef = useRef({ view, house: activeHouse as House | null, sel: selectedId });
  const mountedRef = useRef(false);

  const ah = activeHouse || startHouse;

  const list = HEROES.filter((h) => ah === "All" || h.house === ah).map((h) => ({
    ...h,
    onClick: () => select(h.id),
  }));

  const houseChips = HOUSES.map((h) => {
    const active = h === ah;
    return {
      name: h,
      onClick: () => setHouse(h),
      bg: active ? "var(--ink)" : "transparent",
      fg: active ? "var(--bg)" : "rgba(var(--ink-rgb),.7)",
      bd: active ? "var(--ink)" : "rgba(var(--ink-rgb),.22)",
    };
  });

  let idx = HEROES.findIndex((h) => h.id === selectedId);
  if (idx < 0) idx = 0;
  const raw = HEROES[idx];
  const sel = {
    ...raw,
    affiliationsText: raw.affiliations.join(", "),
    stats: raw.stats.map((s) => ({ label: s.label, value: s.value, width: Math.round((s.value / MAX_STAT) * 100) + "%" })),
  };
  const prev = HEROES[(idx - 1 + HEROES.length) % HEROES.length];
  const next = HEROES[(idx + 1) % HEROES.length];
  const prowessIdx = Math.min(prowessIndex, sel.prowess.length - 1);

  function select(id: string) {
    setView("detail");
    setSelectedId(id);
  }

  function goProwess(dir: 1 | -1) {
    const len = sel.prowess.length;
    setProwessDir(dir);
    setProwessIndex((i) => (Math.min(i, len - 1) + dir + len) % len);
  }

  function setHouse(h: House) {
    // Snapshot current card positions so surviving cards can slide (FLIP) into their
    // new slots after the list is re-filtered.
    if (motion !== false && view !== "detail") {
      flipSnapRef.current = snapshotCards();
    }
    setActiveHouse(h);
  }

  function snapshotCards(): Map<string, CardSnapshot> {
    const root = rootRef.current || document;
    const map = new Map<string, CardSnapshot>();
    root.querySelectorAll<HTMLElement>("[data-card-id]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const id = el.dataset.cardId;
      if (!id) return;
      map.set(id, { top: r.top, left: r.left, width: r.width, height: r.height, html: el.outerHTML });
    });
    return map;
  }

  function fadeLayer(): HTMLDivElement {
    if (!fadeLayerRef.current || !document.body.contains(fadeLayerRef.current)) {
      const l = document.createElement("div");
      l.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60";
      document.body.appendChild(l);
      fadeLayerRef.current = l;
    }
    return fadeLayerRef.current;
  }

  function runFilterFlip() {
    const snap = flipSnapRef.current;
    flipSnapRef.current = null;
    if (!snap) return;
    const root = rootRef.current || document;
    const present = new Set<string>();
    // Surviving / new cards: slide the inner card from its old slot to the new one.
    root.querySelectorAll<HTMLElement>("[data-card-id]").forEach((el) => {
      const id = el.dataset.cardId;
      if (!id) return;
      present.add(id);
      const inner = el.querySelector<HTMLElement>("[data-flip]") || (el.firstElementChild as HTMLElement | null);
      const old = snap.get(id);
      if (!inner) return;
      if (!old) {
        // Brand-new card entering the grid: fade + rise the inner element in.
        inner.style.transition = "none";
        inner.style.opacity = "0";
        inner.style.transform = "translateY(16px)";
        inner.getBoundingClientRect();
        requestAnimationFrame(() => {
          inner.style.transition = "opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1)";
          inner.style.opacity = "";
          inner.style.transform = "";
          const clr = () => {
            inner.style.transition = "";
            inner.removeEventListener("transitionend", clr);
          };
          inner.addEventListener("transitionend", clr);
        });
        return;
      }
      const nr = el.getBoundingClientRect();
      const dx = old.left - nr.left,
        dy = old.top - nr.top;
      if (!dx && !dy) return;
      inner.style.transition = "none";
      inner.style.transform = `translate(${dx}px,${dy}px)`;
      inner.getBoundingClientRect(); // force reflow so the start position sticks
      requestAnimationFrame(() => {
        inner.style.transition = "transform .55s cubic-bezier(.16,1,.3,1)";
        inner.style.transform = "";
        const clr = () => {
          inner.style.transition = "";
          inner.removeEventListener("transitionend", clr);
        };
        inner.addEventListener("transitionend", clr);
      });
    });
    // Removed cards: fade (and gently shrink) out in place via a fixed overlay clone.
    const layer = fadeLayer();
    snap.forEach((old, id) => {
      if (present.has(id)) return;
      const holder = document.createElement("div");
      holder.innerHTML = old.html;
      const c = holder.firstElementChild as HTMLElement | null;
      if (!c) return;
      c.classList.remove("is-in");
      c.style.cssText += `;position:fixed;margin:0;top:${old.top}px;left:${old.left}px;width:${old.width}px;height:${old.height}px;opacity:1;transform:none;transition:opacity .38s ease,transform .38s ease;pointer-events:none`;
      layer.appendChild(c);
      requestAnimationFrame(() => {
        c.style.opacity = "0";
        c.style.transform = "scale(.97)";
      });
      setTimeout(() => {
        c.remove();
      }, 480);
    });
  }

  function reveal(el: HTMLElement, delayMs?: number) {
    if (el.classList.contains("is-in")) return;
    const d = delayMs != null ? delayMs : (parseInt(el.dataset.stagger || "0", 10) || 0) * 55;
    el.style.transitionDelay = Math.min(d, 900) + "ms";
    // Class carries opacity/transform via an !important rule React can't overwrite.
    el.classList.add("is-in");
  }

  function animateBars(container: Element) {
    const bars = Array.from(container.querySelectorAll<HTMLElement>("[data-bar]"));
    const counts = Array.from(container.querySelectorAll<HTMLElement>("[data-count]"));
    // Scale on the X axis rather than transitioning `width` — width is a layout-
    // triggering property, while transform stays compositor-only.
    const scaleFor = (b: HTMLElement) => (parseFloat(b.dataset.target || "0") || 0) / 100;
    if (motion === false) {
      bars.forEach((b) => {
        b.classList.remove("is-filling");
        b.style.transform = `scaleX(${scaleFor(b)})`;
      });
      counts.forEach((c) => {
        c.textContent = c.dataset.target || "";
      });
      return;
    }
    const LEAD = 450; // let the section settle into view before "calculating"
    // Driven by a CSS @keyframes animation (toggled via a class) rather than a
    // hand-rolled transition/rAF dance — the same reliable technique `reveal()`
    // already uses for [data-reveal].is-in, since that combo has proven robust
    // across browsers while the old transition-toggling approach wasn't.
    bars.forEach((b, i) => {
      b.classList.remove("is-filling");
      b.style.setProperty("--bar-target", String(scaleFor(b)));
      b.style.animationDelay = LEAD + i * 120 + "ms";
      b.getBoundingClientRect(); // reflow so the class removal sticks before re-adding
      b.classList.add("is-filling");
    });
    counts.forEach((c, i) => {
      const target = parseInt(c.dataset.target || "0", 10) || 0;
      const dur = 850,
        startAt = performance.now() + LEAD + i * 120;
      c.textContent = "0";
      const tick = (now: number) => {
        if (now < startAt) return requestAnimationFrame(tick);
        const p = Math.min(1, (now - startAt) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        c.textContent = Math.round(e * target).toString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // Reveal every not-yet-revealed [data-reveal] whose top has entered the viewport.
  // Plain scroll/resize check (not IntersectionObserver, whose first async callback
  // can be dropped on a transition, leaving cards blank).
  function checkReveals() {
    if (motion === false) return;
    const root = rootRef.current || document;
    const vh = window.innerHeight || 800;
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.classList.contains("is-in")) return;
      if (el.getBoundingClientRect().top < vh * 0.94) reveal(el);
    });
    // The Power Grid "calculates" only once it is actually observed in the viewport.
    maybeAnimateBars();
  }

  // Fire the bar calc the first time the grid enters the viewport, per character.
  // Reads view/selectedId off trackRef (not the closed-over params) because the
  // scroll/resize listener below is wired up once on mount with an empty dep array —
  // it always invokes the checkReveals/maybeAnimateBars instances captured at that
  // first render, so plain closure variables here would stay stuck on their initial
  // values ("index"/null) forever and this would never fire on scroll.
  function maybeAnimateBars() {
    if (trackRef.current.view !== "detail" || motion === false) return;
    const root = rootRef.current || document;
    const bar = root.querySelector("[data-bar]");
    if (!bar) return;
    const key = trackRef.current.sel;
    if (barsDoneForRef.current === key) return;
    const section = bar.closest("[data-reveal]") || bar.parentElement;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const inView = r.top < vh * 0.82 && r.bottom > vh * 0.15;
    if (inView) {
      barsDoneForRef.current = key;
      animateBars(section);
    }
  }

  function setupReveals(revealAll?: boolean) {
    const root = rootRef.current || document;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (motion === false) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    if (revealAll) {
      // Reveal in-view cards fast; below-fold cards follow on a short stagger so
      // nothing depends on a scroll event ever firing.
      const vh = window.innerHeight || 800;
      let below = 0;
      els.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        if (el.getBoundingClientRect().top < vh * 0.94) {
          reveal(el);
        } else {
          reveal(el, 120 + below++ * 45);
        }
      });
      return;
    }
    // Initial load: scroll-triggered stagger.
    checkReveals();
  }

  // componentDidMount / componentWillUnmount equivalent.
  useEffect(() => {
    const onScroll = () => checkReveals();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    requestAnimationFrame(() => setupReveals());
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile nav drawer: close on Escape, lock background scroll while open, and
  // auto-close if the viewport is resized past the desktop breakpoint.
  useEffect(() => {
    if (!mobileNavOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileNavOpen(false);
    }
    function onResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMobileNavOpen(false);
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    getProfile().then((p) => {
      if (!cancelled) setProfile(p);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A newly-selected hero always starts on their first prowess entry.
  useEffect(() => {
    setProwessIndex(0);
  }, [selectedId]);

  // componentDidUpdate equivalent — runs after view/activeHouse/selectedId change, but not on mount.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      trackRef.current = { view, house: activeHouse, sel: selectedId };
      return;
    }
    // Track previous values ourselves — don't trust effect dep arrays for this.
    const pv = trackRef.current;
    const viewChanged = pv.view !== view;
    const filterChanged = pv.house !== activeHouse;
    const charChanged = pv.sel !== selectedId;
    trackRef.current = { view, house: activeHouse, sel: selectedId };

    if (viewChanged || charChanged) window.scrollTo({ top: 0, left: 0 });

    const timers: number[] = [];
    // On any filter/view/character change reveal ALL entries (staggered) rather than
    // depending on scroll events. Re-assert across several frames/timeouts so it runs
    // AFTER React's final commit for the new node set, not the frame they mount.
    if (filterChanged && !viewChanged && !charChanged) {
      // Reveal everything instantly (no fade), then play the FLIP slide + fade-out.
      requestAnimationFrame(() => {
        setupReveals(true);
        runFilterFlip();
      });
      timers.push(window.setTimeout(() => setupReveals(true), 120));
    } else if (viewChanged || charChanged) {
      requestAnimationFrame(() => setupReveals(true));
      requestAnimationFrame(() => requestAnimationFrame(() => setupReveals(true)));
      timers.push(window.setTimeout(() => setupReveals(true), 80));
      timers.push(window.setTimeout(() => setupReveals(true), 260));
      // New character / entering detail: arm the bars again; they animate only once
      // the grid is scrolled into view (or right away if already visible).
      barsDoneForRef.current = null;
      requestAnimationFrame(() => maybeAnimateBars());
      timers.push(window.setTimeout(() => maybeAnimateBars(), 120));
    } else {
      // Any other re-render (e.g. recycled node lost its class): re-assert what's shown.
      requestAnimationFrame(() => checkReveals());
    }
    return () => timers.forEach((t) => clearTimeout(t));
  }, [view, activeHouse, selectedId]);

  const shellStyle = { "--sidebar-width": sidebarCollapsed ? "72px" : "240px" } as CSSProperties;

  return (
    <div className="app-shell" style={shellStyle}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((v) => !v)}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        activeView={view}
        onGoToHeroes={() => {
          setView("index");
          setMobileNavOpen(false);
        }}
        onGoToProfile={() => {
          setView("profile");
          setMobileNavOpen(false);
        }}
        darkMode={theme === "dark"}
        onToggleDarkMode={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <button type="button" className="mobile-nav-toggle" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
        <MenuIcon />
      </button>
      <div className="app-content" ref={rootRef}>
        {view === "index" ? (
          <IndexView heroes={list} houseChips={houseChips} total={HEROES.length} count={list.length} />
        ) : view === "detail" ? (
          <DetailView
            sel={sel}
            prevName={prev.name}
            nextName={next.name}
            onBack={() => setView("index")}
            onPrev={() => select(prev.id)}
            onNext={() => select(next.id)}
            prowessIndex={prowessIdx}
            prowessDir={prowessDir}
            onProwessPrev={() => goProwess(-1)}
            onProwessNext={() => goProwess(1)}
            motion={motion}
          />
        ) : (
          <ProfileView profile={profile} />
        )}
      </div>
    </div>
  );
}
