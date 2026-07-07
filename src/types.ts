export const HOUSES = ["All", "Marvel", "DC", "Image", "Dark Horse", "Valiant"] as const;
export type House = (typeof HOUSES)[number];

export interface Relationship {
  name: string;
  role: string;
}

export interface Stat {
  label: string;
  value: number;
}

export interface Prowess {
  label: string;
  note: string;
  source: string;
}

export interface Hero {
  id: string;
  no: string;
  name: string;
  alias: string;
  house: House;
  publisher: string;
  first: string;
  accent: string;
  bio: string;
  powers: string[];
  affiliations: string[];
  relationships: Relationship[];
  stats: Stat[];
  prowess: Prowess[];
}

export const MAX_STAT = 7;

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  title: string;
  email: string;
  bio: string;
  accent: string;
  memberSince: string;
}

export type MessageAuthor = "hero" | "registrar" | "ai";

export interface Message {
  id: string;
  author: MessageAuthor;
  body: string;
  /** ISO 8601 timestamp — real API responses are expected to send this shape. */
  sentAt: string;
  /** Id of another message in the same thread this is a quoted reply to (WhatsApp/Instagram-style). */
  replyToId?: string;
}

/** "user" threads are between the registrar and another hero; "ai" is the
 *  single reserved thread backed by an AI assistant instead of a hero. */
export type ThreadKind = "user" | "ai";

export type AIProvider = "gemini";

export interface MessageThread {
  id: string;
  kind: ThreadKind;
  /** Foreign key into HEROES — kept separate from hero display fields so the
   *  thread payload matches what a real API would return (an id, not a join).
   *  Present only when kind === "user". */
  heroId?: string;
  /** Which AI backend this thread talks to. Present only when kind === "ai". */
  aiProvider?: AIProvider;
  subject: string;
  unread: boolean;
  /** ISO 8601 timestamp of the most recent message. */
  updatedAt: string;
  messages: Message[];
}
