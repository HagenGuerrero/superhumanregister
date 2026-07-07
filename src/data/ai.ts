import type { AIProvider, Message } from "../types";

export interface AIReplyRequest {
  threadId: string;
  provider: AIProvider;
  /** Full conversation so far, oldest first — a real backend would forward
   *  this (or a trimmed window of it) as context for the model. */
  history: Message[];
  prompt: string;
}

const PLACEHOLDER_REPLY =
  "This is a placeholder reply — no AI backend is connected yet. Once a TypeScript backend route proxies this conversation to Gemini server-side, this thread will return a live model response instead.";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Stand-in for a future backend endpoint (e.g. `POST /api/ai/reply`) that
// forwards the conversation to Gemini server-side and returns its reply.
// A Gemini API key must never be held or called directly from the browser —
// this function is the seam where that server call belongs once it exists.
// Callers only depend on this signature, so swapping the body for a real
// `fetch()` later requires no changes elsewhere.
export async function getAIReply(request: AIReplyRequest): Promise<Message> {
  await delay(500);
  return {
    id: `m-ai-${Date.now()}`,
    author: "ai",
    body: `${PLACEHOLDER_REPLY} (provider: ${request.provider})`,
    sentAt: new Date().toISOString(),
  };
}
