import type { UserProfile } from "../types";

const MOCK_PROFILE: UserProfile = {
  id: "u-001",
  name: "Hagen",
  handle: "@hagen",
  title: "Registrar",
  email: "hagen@the-register.example",
  bio: "Maintains The Superhuman Register — cataloguing costumed heroes across publishers, one dossier at a time.",
  accent: "oklch(0.58 0.13 235)",
  memberSince: "Edition I",
};

// Stand-in for the real endpoint. Swap the body for a `fetch()` call once the
// TypeScript API exists — callers only depend on this signature.
export async function getProfile(): Promise<UserProfile> {
  return MOCK_PROFILE;
}
