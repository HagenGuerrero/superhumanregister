import type { CSSProperties } from "react";
import type { Hero, House } from "../types";

export type HeroListItem = Hero & { onClick: () => void };

export interface HouseChip {
  name: House;
  onClick: () => void;
  bg: string;
  fg: string;
  bd: string;
}

export interface IndexViewProps {
  heroes: HeroListItem[];
  houseChips: HouseChip[];
  total: number;
  count: number;
}

const monoLabel: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 9,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "rgba(var(--ink-rgb),.4)",
};

export default function IndexView({ heroes, houseChips, total, count }: IndexViewProps) {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 40px 100px" }}>
      <header style={{ borderBottom: "1px solid rgba(var(--ink-rgb),.14)", paddingBottom: 8 }}>
        <div data-reveal data-stagger="0" style={{ opacity: 0, transform: "translateY(28px)" }}>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 11,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(var(--ink-rgb),.5)",
            }}
          >
            Encyclopædia · Edition I
          </div>
        </div>
        <div data-reveal data-stagger="1" style={{ opacity: 0, transform: "translateY(28px)" }}>
          <h1
            style={{
              fontFamily: "'Newsreader',Georgia,serif",
              fontWeight: 400,
              fontSize: "clamp(46px,7.4vw,90px)",
              lineHeight: 0.96,
              letterSpacing: "-.022em",
              margin: "20px 0 0",
            }}
          >
            The Superhuman
            <br />
            Register
          </h1>
        </div>
        <div
          data-reveal
          data-stagger="2"
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
            margin: "26px 0 30px",
          }}
        >
          <p style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 460, color: "rgba(var(--ink-rgb),.62)", margin: 0 }}>
            A cross-publisher field guide to costumed heroes — origins, powers, and the people behind the mask.
          </p>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "rgba(var(--ink-rgb),.5)",
              whiteSpace: "nowrap",
            }}
          >
            {total} entries · 5 houses
          </div>
        </div>
      </header>

      <div
        data-reveal
        data-stagger="3"
        style={{
          opacity: 0,
          transform: "translateY(18px)",
          position: "sticky",
          top: 0,
          zIndex: 5,
          background: "var(--bg)",
          padding: "16px 0",
          display: "flex",
          gap: 9,
          flexWrap: "wrap",
          alignItems: "center",
          borderBottom: "1px solid rgba(var(--ink-rgb),.1)",
        }}
      >
        {houseChips.map((ch) => (
          <button key={ch.name} onClick={ch.onClick} className="chip-button" style={{ borderColor: ch.bd, background: ch.bg, color: ch.fg }}>
            {ch.name}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(var(--ink-rgb),.45)" }}>{count} shown</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(236px,1fr))", gap: "40px 30px", marginTop: 44 }}>
        {heroes.map((item, i) => (
          <div key={item.id} data-reveal data-stagger={i} data-card-id={item.id} style={{ opacity: 0, transform: "translateY(30px)" }}>
            <a data-flip className="hero-card-link" onClick={item.onClick}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  background: "repeating-linear-gradient(135deg,var(--hatch-1),var(--hatch-1) 10px,var(--hatch-2) 10px,var(--hatch-2) 20px)",
                  border: "1px solid rgba(var(--ink-rgb),.1)",
                }}
              >
                <span style={{ position: "absolute", left: 12, top: 11, fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: ".08em", color: item.accent }}>
                  {item.no}
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 26,
                    height: 26,
                    borderTop: `2px solid ${item.accent}`,
                    borderLeft: `2px solid ${item.accent}`,
                    opacity: 0.55,
                  }}
                />
                <span style={{ position: "absolute", left: 12, bottom: 12, ...monoLabel }}>Portrait</span>
                <span style={{ position: "absolute", right: 12, bottom: 12, ...monoLabel, letterSpacing: ".12em", color: "rgba(var(--ink-rgb),.42)" }}>{item.house}</span>
              </div>
              <div style={{ marginTop: 14 }}>
                <h3 style={{ fontFamily: "'Newsreader',Georgia,serif", fontWeight: 450, fontSize: 24, lineHeight: 1.05, letterSpacing: "-.01em", margin: 0 }}>
                  {item.name}
                </h3>
                <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: "italic", fontSize: 14, color: "rgba(var(--ink-rgb),.55)", margin: "3px 0 0" }}>
                  {item.alias}
                </p>
                <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10.5, letterSpacing: ".04em", color: "rgba(var(--ink-rgb),.42)", margin: "9px 0 0" }}>
                  {item.first}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
