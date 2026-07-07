import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { House, Message, MessageThread } from "../types";

export type MessageThreadListItem = MessageThread & {
  name: string;
  subtitle: string;
  house?: House;
  accent: string;
};

const aiBadge: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 8.5,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  borderRadius: 3,
  padding: "1px 5px",
  flexShrink: 0,
};

export interface MessagesViewProps {
  threads: MessageThreadListItem[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onSendReply: (threadId: string, body: string, replyToId?: string) => void | Promise<void>;
}

const monoMeta: CSSProperties = {
  fontFamily: "'Space Mono',monospace",
  fontSize: 10.5,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "rgba(var(--ink-rgb),.45)",
};

// Only lets the panel itself scroll when it actually overflows, and stops the
// gesture from chaining/bouncing into neighboring panels or the page.
const scrollPane: CSSProperties = {
  overflowY: "auto",
  overscrollBehavior: "contain",
};

function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function MessagesView({ threads, activeThreadId, onSelectThread, onSendReply }: MessagesViewProps) {
  const active = threads.find((t) => t.id === activeThreadId) ?? threads[0] ?? null;
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // A newly-opened thread always starts with an empty composer — any in-flight
  // quoted reply shouldn't bleed into the next conversation.
  useEffect(() => {
    setDraft("");
    setReplyTarget(null);
  }, [active?.id]);

  // Jump to the newest message whenever the open thread changes or a message
  // is appended (own reply or the AI's), so the latest line is always in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [active?.id, active?.messages.length]);

  async function handleSend() {
    if (!active || !draft.trim() || sending) return;
    setSending(true);
    try {
      await onSendReply(active.id, draft.trim(), replyTarget?.id);
      setDraft("");
      setReplyTarget(null);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ height: "100%", minHeight: 0, minWidth: 0, display: "grid", gridTemplateColumns: "320px 1fr" }}>
      <div
        style={{
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(var(--ink-rgb),.14)",
        }}
      >
        <div style={{ ...scrollPane, flex: 1, minHeight: 0 }}>
          {threads.map((t) => {
            const isActive = active != null && t.id === active.id;
            const last = t.messages[t.messages.length - 1];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectThread(t.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "none",
                  borderBottom: "1px solid rgba(var(--ink-rgb),.12)",
                  background: isActive ? "var(--panel)" : "transparent",
                  padding: "14px 14px 14px 16px",
                  borderLeft: `3px solid ${isActive ? t.accent : "transparent"}`,
                  fontFamily: "inherit",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 16.5, fontWeight: 500 }}>{t.name}</span>
                  {t.kind === "ai" && <span style={{ ...aiBadge, border: `1px solid ${t.accent}`, color: t.accent }}>AI</span>}
                  <span style={{ flex: 1 }} />
                  {t.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, flexShrink: 0 }} aria-label="Unread" />}
                </div>
                <div style={{ ...monoMeta, marginTop: 3, color: "rgba(var(--ink-rgb),.4)" }}>{t.house ?? t.subtitle}</div>
                <div style={{ fontSize: 13.5, fontWeight: t.unread ? 600 : 400, margin: "8px 0 0", lineHeight: 1.3 }}>{t.subject}</div>
                {last && (
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "rgba(var(--ink-rgb),.5)",
                      margin: "4px 0 0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {last.author === "registrar" ? "You: " : ""}
                    {last.body}
                  </div>
                )}
                <div style={{ ...monoMeta, marginTop: 8, fontSize: 9.5, color: "rgba(var(--ink-rgb),.38)" }}>{formatWhen(t.updatedAt)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {active ? (
        <div style={{ height: "100%", minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              flexShrink: 0,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderBottom: "1px solid rgba(var(--ink-rgb),.14)",
              padding: "20px 32px",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: active.accent, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span>
                  {active.name} <span style={{ fontStyle: "italic", color: "rgba(var(--ink-rgb),.5)", fontSize: 15 }}>· {active.subtitle}</span>
                </span>
                {active.kind === "ai" && <span style={{ ...aiBadge, border: `1px solid ${active.accent}`, color: active.accent }}>AI</span>}
              </div>
              <div style={{ ...monoMeta, marginTop: 4 }}>{active.subject}</div>
            </div>
          </div>

          <div ref={scrollRef} style={{ ...scrollPane, flex: 1, minHeight: 0, minWidth: 0, display: "grid", alignContent: "start", gap: 14, padding: "22px 32px" }}>
            {active.messages.map((m) => {
              const mine = m.author === "registrar";
              const quoted = m.replyToId ? active.messages.find((x) => x.id === m.replyToId) : undefined;
              return (
                <div key={m.id} className="msg-row" style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", minWidth: 0 }}>
                  <div style={{ display: "flex", flexDirection: mine ? "row-reverse" : "row", alignItems: "flex-end", gap: 6, maxWidth: "84%", minWidth: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: mine ? "flex-end" : "flex-start", minWidth: 0 }}>
                      <div
                        style={{
                          background: mine ? "var(--ink)" : "var(--panel)",
                          color: mine ? "var(--bg)" : "inherit",
                          border: mine ? "none" : "1px solid rgba(var(--ink-rgb),.12)",
                          padding: "10px 14px",
                          fontSize: 14.5,
                          lineHeight: 1.45,
                        }}
                      >
                        {quoted && (
                          <div
                            style={{
                              borderLeft: `3px solid ${mine ? "var(--bg)" : active.accent}`,
                              opacity: 0.72,
                              paddingLeft: 8,
                              marginBottom: 7,
                              fontSize: 12.5,
                              lineHeight: 1.35,
                            }}
                          >
                            <div style={{ fontWeight: 600 }}>{quoted.author === "registrar" ? "You" : active.name}</div>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{quoted.body}</div>
                          </div>
                        )}
                        {m.body}
                      </div>
                      <div style={{ ...monoMeta, fontSize: 9.5, marginTop: 4, color: "rgba(var(--ink-rgb),.4)" }}>
                        {mine ? "You" : active.name} · {formatWhen(m.sentAt)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="msg-reply-btn"
                      onClick={() => setReplyTarget(m)}
                      aria-label="Reply to this message"
                      title="Reply"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        border: "1px solid rgba(var(--ink-rgb),.22)",
                        background: "var(--bg)",
                        color: "rgba(var(--ink-rgb),.6)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        lineHeight: 1,
                        padding: 0,
                        flexShrink: 0,
                        marginBottom: 18,
                      }}
                    >
                      ↩
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ flexShrink: 0, minWidth: 0, borderTop: "1px solid rgba(var(--ink-rgb),.14)", padding: "16px 32px" }}>
            {replyTarget && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  background: "var(--panel)",
                  borderLeft: `3px solid ${active.accent}`,
                  padding: "8px 10px",
                  marginBottom: 14,
                }}
              >
                <div style={{ overflow: "hidden", minWidth: 0 }}>
                  <div style={{ ...monoMeta, fontSize: 9.5 }}>Replying to {replyTarget.author === "registrar" ? "yourself" : active.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(var(--ink-rgb),.65)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {replyTarget.body}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyTarget(null)}
                  aria-label="Cancel reply"
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, color: "rgba(var(--ink-rgb),.5)", flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            )}

            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={replyTarget ? `Reply to ${replyTarget.author === "registrar" ? "yourself" : active.name}…` : `Reply to ${active.name}…`}
              rows={3}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontFamily: "'Public Sans',system-ui,sans-serif",
                fontSize: 14.5,
                lineHeight: 1.45,
                color: "inherit",
                background: "var(--panel)",
                border: "1px solid rgba(var(--ink-rgb),.18)",
                resize: "vertical",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim() || sending}
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  border: "none",
                  background: "var(--ink)",
                  color: "var(--bg)",
                  cursor: !draft.trim() || sending ? "not-allowed" : "pointer",
                  opacity: !draft.trim() || sending ? 0.5 : 1,
                }}
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...monoMeta, fontSize: 11 }}>No correspondence yet</div>
        </div>
      )}
    </div>
  );
}
