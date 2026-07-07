import type { CSSProperties } from "react";
import type { UserProfile } from "../types";

export interface ProfileViewProps {
  profile: UserProfile | null;
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

export default function ProfileView({ profile }: ProfileViewProps) {
  if (!profile) {
    return (
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "34px 40px 110px" }}>
        <div style={sectionLabel}>Loading profile…</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "34px 40px 110px" }}>
      <header
        data-reveal
        data-stagger="0"
        style={{ opacity: 0, transform: "translateY(24px)", borderBottom: "1px solid rgba(var(--ink-rgb),.14)", padding: "24px 0 30px" }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>
          <span style={{ color: profile.accent }}>{profile.title}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(var(--ink-rgb),.3)" }} />
          <span style={{ color: "rgba(var(--ink-rgb),.55)" }}>Member since {profile.memberSince}</span>
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
          {profile.name}
        </h1>
        <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: "italic", fontSize: 20, color: "rgba(var(--ink-rgb),.55)", margin: "8px 0 0" }}>{profile.handle}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,336px) 1fr", gap: 54, marginTop: 42, alignItems: "start" }}>
        <div data-reveal data-stagger="1" style={{ opacity: 0, transform: "translateY(28px)" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "4/5",
              background: "repeating-linear-gradient(135deg,var(--hatch-1),var(--hatch-1) 11px,var(--hatch-2) 11px,var(--hatch-2) 22px)",
              border: "1px solid rgba(var(--ink-rgb),.12)",
            }}
          >
            <span style={{ position: "absolute", left: 0, top: 0, width: 34, height: 34, borderTop: `2px solid ${profile.accent}`, borderLeft: `2px solid ${profile.accent}` }} />
            <span
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "rgba(var(--ink-rgb),.42)",
              }}
            >
              Portrait · {profile.name}
            </span>
          </div>
          <dl style={{ margin: "22px 0 0", borderTop: "1px solid rgba(var(--ink-rgb),.14)" }}>
            <div style={dlRow}>
              <dt style={dtStyle}>Handle</dt>
              <dd style={ddStyle}>{profile.handle}</dd>
            </div>
            <div style={dlRow}>
              <dt style={dtStyle}>Email</dt>
              <dd style={ddStyle}>{profile.email}</dd>
            </div>
            <div style={dlRow}>
              <dt style={dtStyle}>Role</dt>
              <dd style={ddStyle}>{profile.title}</dd>
            </div>
            <div style={dlRow}>
              <dt style={dtStyle}>Member since</dt>
              <dd style={ddStyle}>{profile.memberSince}</dd>
            </div>
          </dl>
        </div>

        <div style={{ minWidth: 0 }}>
          <section data-reveal data-stagger="2" style={{ opacity: 0, transform: "translateY(24px)" }}>
            <div style={sectionLabel}>About</div>
            <p style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 22, lineHeight: 1.5, margin: "14px 0 0", color: "var(--bio)", textWrap: "pretty" }}>{profile.bio}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
