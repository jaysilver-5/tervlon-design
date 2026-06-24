/** Stable query keys so cache reads/invalidations line up across the app. */
export const qk = {
  me: ["auth", "me"] as const,
  scenarios: ["catalog", "scenarios"] as const,
  scenario: (slug: string) => ["catalog", "scenario", slug] as const,
  attempt: (id: string) => ["attempt", id] as const,
  frontendContract: (sessionId: string) =>
    ["runtime", "contract", sessionId] as const,
  engineState: (sessionId: string) => ["runtime", "engine", sessionId] as const,
  plans: ["billing", "plans"] as const,
  wallets: (ownerType: string, ownerId: string) =>
    ["billing", "wallets", ownerType, ownerId] as const,
};
