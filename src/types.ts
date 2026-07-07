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
