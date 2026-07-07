import type { Message, MessageTemplate, MessageThread } from "../types";

const MOCK_THREADS: MessageThread[] = [
  {
    id: "th-gemini",
    kind: "ai",
    aiProvider: "gemini",
    subject: "Ask the Register's Assistant",
    unread: false,
    updatedAt: "2026-07-07T08:00:00Z",
    messages: [
      {
        id: "m-ai-000",
        author: "ai",
        body: "Hi — I'm the Register's Gemini-powered assistant. Ask me to help draft dossier notes, cross-check a hero's stats, or summarize a thread.",
        sentAt: "2026-07-07T08:00:00Z",
      },
    ],
  },
  {
    id: "th-spider-man",
    kind: "user",
    heroId: "spider-man",
    subject: "Dossier correction — web-fluid formula",
    unread: true,
    updatedAt: "2026-07-07T09:14:00Z",
    messages: [
      {
        id: "m-001",
        author: "hero",
        body: "Hey — noticed the entry lists my web fluid as \"organic.\" It's self-engineered, not biological. Mind fixing that before someone quotes it?",
        sentAt: "2026-07-06T18:42:00Z",
      },
      {
        id: "m-002",
        author: "registrar",
        body: "Good catch. Send over the corrected spec whenever you get a chance and I'll update the powers list.",
        sentAt: "2026-07-06T19:03:00Z",
      },
      {
        id: "m-003",
        author: "hero",
        replyToId: "m-002",
        body: "On it. Also — any chance the catalog number can stay 001? Feels weird to renumber at this point.",
        sentAt: "2026-07-07T09:14:00Z",
      },
    ],
  },
  {
    id: "th-wonder-woman",
    kind: "user",
    heroId: "wonder-woman",
    subject: "Affiliation update — Justice League roster",
    unread: true,
    updatedAt: "2026-07-06T21:10:00Z",
    messages: [
      {
        id: "m-004",
        author: "hero",
        body: "The Register still lists Themyscira as an affiliation. It should read \"Amazons\" going forward — the island itself isn't an organization.",
        sentAt: "2026-07-06T20:51:00Z",
      },
      {
        id: "m-005",
        author: "registrar",
        body: "Understood — that distinction matters for the archive. I'll have it corrected in this edition's next pass.",
        sentAt: "2026-07-06T21:10:00Z",
      },
    ],
  },
  {
    id: "th-batman",
    kind: "user",
    heroId: "batman",
    subject: "Requesting redaction of last known address",
    unread: false,
    updatedAt: "2026-07-05T14:11:00Z",
    messages: [
      {
        id: "m-006",
        author: "hero",
        body: "For obvious reasons, I'd like the manor's location left out of the public dossier entirely.",
        sentAt: "2026-07-05T13:40:00Z",
      },
      {
        id: "m-007",
        author: "registrar",
        body: "Already handled — the Register never published a location for you. Let me know if you'd like anything else scrubbed.",
        sentAt: "2026-07-05T14:02:00Z",
      },
      {
        id: "m-009",
        author: "registrar",
        replyToId: "m-006",
        body: "Following up on this one specifically — I also blurred the manor out of the background of your last field photo.",
        sentAt: "2026-07-05T14:11:00Z",
      },
    ],
  },
  {
    id: "th-storm",
    kind: "user",
    heroId: "storm",
    subject: "New public appearance for the field log",
    unread: false,
    updatedAt: "2026-07-03T11:22:00Z",
    messages: [
      {
        id: "m-008",
        author: "hero",
        body: "Ended a drought over three counties last week — figured it was worth a line in the record.",
        sentAt: "2026-07-03T11:22:00Z",
      },
    ],
  },
];

const MOCK_TEMPLATES: MessageTemplate[] = [
  { id: "t-ack", label: "Acknowledge", body: "Acknowledged — logging this to your dossier now." },
  { id: "t-details", label: "Request Details", body: "Could you file a full incident report? I need specifics for the record." },
  { id: "t-standby", label: "Standing By", body: "Received. The Register is standing by for further updates." },
  { id: "t-escalate", label: "Escalate", body: "Flagging this for editorial review — I'll follow up shortly." },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Stand-ins for the real endpoints — swap the bodies for `fetch()` calls once the
// TypeScript API exists. Callers only depend on these signatures, so nothing else
// needs to change when the mock is replaced.

export async function getThreads(): Promise<MessageThread[]> {
  return clone(MOCK_THREADS);
}

export async function getTemplates(): Promise<MessageTemplate[]> {
  return clone(MOCK_TEMPLATES);
}

export async function sendReply(threadId: string, body: string, replyToId?: string): Promise<Message> {
  const message: Message = {
    id: `m-${Date.now()}`,
    author: "registrar",
    body,
    sentAt: new Date().toISOString(),
    ...(replyToId ? { replyToId } : {}),
  };
  const thread = MOCK_THREADS.find((t) => t.id === threadId);
  if (thread) thread.messages.push(message);
  return clone(message);
}
