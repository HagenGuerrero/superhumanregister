import type { CSSProperties } from "react";
import type { Hero } from "../types";

interface DetailStat {
  label: string;
  value: number;
  width: string;
}

export type DetailHero = Omit<Hero, "stats"> & {
  affiliationsText: string;
  stats: DetailStat[];
};

export interface DetailViewProps {
  sel: DetailHero;
  prevName: string;
  nextName: string;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const sectionLabel: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 11,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "rgba(var(--ink-rgb),.5)",
};

const dlRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  padding: "12px 0",
  borderBottom: "1px solid rgba(var(--ink-rgb),.1)",
};

const dtStyle: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 10.5,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "rgba(var(--ink-rgb),.5)",
};

const ddStyle: CSSProperties = { margin: 0, fontSize: 14, textAlign: "right", maxWidth: 200 };

const navLabel: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 10.5,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "rgba(var(--ink-rgb),.45)",
};

const navName: CSSProperties = { fontFamily: "'Newsreader',Georgia,serif", fontSize: 20, marginTop: 5 };

export default function DetailView({ sel, prevName, nextName, onBack, onPrev, onNext }: DetailViewProps) {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "34px 40px 110px" }}>
      <div data-reveal data-stagger="0" style={{ opacity: 0, transform: "translateY(14px)" }}>
        <a
          onClick={onBack}
          style={{
            cursor: "pointer",
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "rgba(var(--ink-rgb),.5)",
            textDecoration: "none",
          }}
        >
          ← The Register
        </a>
      </div>

      <header
        data-reveal
        data-stagger="1"
        style={{ opacity: 0, transform: "translateY(24px)", borderBottom: "1px solid rgba(var(--ink-rgb),.14)", padding: "24px 0 30px", marginTop: 18 }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>
          <span style={{ color: sel.accent }}>{sel.no}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(var(--ink-rgb),.3)" }} />
          <span style={{ color: "rgba(var(--ink-rgb),.55)" }}>{sel.house}</span>
        </div>
        <h1
          style={{
            fontFamily: "'Newsreader',Georgia,serif",
            fontWeight: 400,
            fontSize: "clamp(44px,7.2vw,84px)",
            lineHeight: 0.97,
            letterSpacing: "-.022em",
            margin: "16px 0 0",
          }}
        >
          {sel.name}
        </h1>
        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: "italic", fontSize: 20, color: "rgba(var(--ink-rgb),.55)", margin: "8px 0 0" }}>{sel.alias}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,336px) 1fr", gap: 54, marginTop: 42, alignItems: "start" }}>
        <div data-reveal data-stagger="2" style={{ opacity: 0, transform: "translateY(28px)" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "4/5",
              background: "repeating-linear-gradient(135deg,var(--hatch-1),var(--hatch-1) 11px,var(--hatch-2) 11px,var(--hatch-2) 22px)",
              border: "1px solid rgba(var(--ink-rgb),.12)",
            }}
          >
            <span style={{ position: "absolute", left: 0, top: 0, width: 34, height: 34, borderTop: `2px solid ${sel.accent}`, borderLeft: `2px solid ${sel.accent}` }} />
            <span style={{ position: "absolute", left: 14, bottom: 14, fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(var(--ink-rgb),.42)" }}>
              Portrait · {sel.name}
            </span>
          </div>
          <dl style={{ margin: "22px 0 0", borderTop: "1px solid rgba(var(--ink-rgb),.14)" }}>
            <div style={dlRow}>
              <dt style={dtStyle}>Real name</dt>
              <dd style={ddStyle}>{sel.alias}</dd>
            </div>
            <div style={dlRow}>
              <dt style={dtStyle}>First seen</dt>
              <dd style={ddStyle}>{sel.first}</dd>
            </div>
            <div style={dlRow}>
              <dt style={dtStyle}>Publisher</dt>
              <dd style={ddStyle}>{sel.publisher}</dd>
            </div>
            <div style={dlRow}>
              <dt style={dtStyle}>Affiliations</dt>
              <dd style={ddStyle}>{sel.affiliationsText}</dd>
            </div>
          </dl>
        </div>

        <div style={{ minWidth: 0 }}>
          <section data-reveal data-stagger="3" style={{ opacity: 0, transform: "translateY(24px)" }}>
            <div style={sectionLabel}>Dossier</div>
            <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 22, lineHeight: 1.5, margin: "14px 0 0", color: "var(--bio)", textWrap: "pretty" }}>{sel.bio}</p>
          </section>

          <section data-reveal data-stagger="4" style={{ opacity: 0, transform: "translateY(24px)", marginTop: 46 }}>
            <div style={sectionLabel}>Powers &amp; Abilities</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", borderTop: "1px solid rgba(var(--ink-rgb),.12)" }}>
              {sel.powers.map((pw, i) => (
                <li key={i} style={{ display: "flex", gap: 16, alignItems: "baseline", padding: "13px 0", borderBottom: "1px solid rgba(var(--ink-rgb),.1)" }}>
                  <span style={{ fontSize: 9, color: sel.accent }}>◆</span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.4 }}>{pw}</span>
                </li>
              ))}
            </ul>
          </section>

          <section data-reveal data-stagger="5" style={{ opacity: 0, transform: "translateY(24px)", marginTop: 46 }}>
            <div style={sectionLabel}>Power Grid</div>
            <div style={{ display: "grid", gap: 15, marginTop: 18 }}>
              {sel.stats.map((st, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "104px 1fr 26px", gap: 16, alignItems: "center" }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(var(--ink-rgb),.6)" }}>
                    {st.label}
                  </span>
                  <span style={{ position: "relative", height: 6, background: "rgba(var(--ink-rgb),.1)", borderRadius: 3, overflow: "hidden" }}>
                    <span data-bar data-target={st.width} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 0, background: sel.accent, borderRadius: 3 }} />
                  </span>
                  <span data-count data-target={st.value} style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, textAlign: "right", color: "rgba(var(--ink-rgb),.55)" }}>
                    {st.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section data-reveal data-stagger="6" style={{ opacity: 0, transform: "translateY(24px)", marginTop: 42 }}>
            <div style={{ border: "1px solid rgba(var(--ink-rgb),.14)", padding: "26px 28px", background: "var(--panel)", position: "relative", overflow: "hidden" }}>
              <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: sel.accent }} />
              <div style={sectionLabel}>Signature Prowess</div>
              <h4 style={{ fontFamily: "'Newsreader',Georgia,serif", fontWeight: 450, fontSize: 30, margin: "12px 0 0", letterSpacing: "-.01em" }}>{sel.prowessLabel}</h4>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(var(--ink-rgb),.62)", margin: "10px 0 0", maxWidth: 540, textWrap: "pretty" }}>{sel.prowessNote}</p>
            </div>
          </section>

          <section data-reveal data-stagger="7" style={{ opacity: 0, transform: "translateY(24px)", marginTop: 46 }}>
            <div style={sectionLabel}>Key Relationships</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(178px,1fr))",
                gap: 1,
                background: "rgba(var(--ink-rgb),.12)",
                border: "1px solid rgba(var(--ink-rgb),.12)",
                marginTop: 15,
              }}
            >
              {sel.relationships.map((rel, i) => (
                <div key={i} style={{ background: "var(--bg)", padding: "16px 18px" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.25 }}>{rel.name}</div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(var(--ink-rgb),.5)", marginTop: 5 }}>
                    {rel.role}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <nav
        data-reveal
        data-stagger="8"
        style={{ opacity: 0, transform: "translateY(20px)", display: "flex", justifyContent: "space-between", gap: 20, marginTop: 66, borderTop: "1px solid rgba(var(--ink-rgb),.14)", paddingTop: 22 }}
      >
        <a onClick={onPrev} style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
          <div style={navLabel}>← Previous</div>
          <div style={navName}>{prevName}</div>
        </a>
        <a onClick={onNext} style={{ cursor: "pointer", textDecoration: "none", color: "inherit", textAlign: "right" }}>
          <div style={navLabel}>Next →</div>
          <div style={navName}>{nextName}</div>
        </a>
      </nav>
    </div>
  );
}
