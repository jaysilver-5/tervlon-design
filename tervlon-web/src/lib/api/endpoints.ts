/**
 * Every backend path the client touches, in one typed place. Verified against the
 * NestJS controllers (Appendix A of the engineering doc). When a path changes, it
 * changes here only.
 */
export const endpoints = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  catalog: {
    scenarios: "/platform/catalog/scenarios",
    scenario: (slug: string) => `/platform/catalog/scenarios/${slug}`,
  },
  attempts: {
    create: "/platform/attempts",
    get: (id: string) => `/platform/attempts/${id}`,
  },
  runtime: {
    start: "/runtime/sessions/start",
    current: (attemptId: string) =>
      `/runtime/sessions/attempts/${attemptId}/current`,
    state: (sessionId: string) => `/runtime/sessions/${sessionId}/state`,
    frontendContract: (sessionId: string) =>
      `/runtime/sessions/${sessionId}/frontend-contract`,
    contractFixtures: "/runtime/sessions/frontend-contract/fixtures",
    complete: (sessionId: string) => `/runtime/sessions/${sessionId}/complete`,
    engineState: (sessionId: string) =>
      `/engines/software-sprint/sessions/${sessionId}/state`,
  },
  events: {
    sessionStream: (sessionId: string) =>
      `/runtime/events/session/${sessionId}/stream`,
    sessionCatchUp: (sessionId: string, after: string) =>
      `/runtime/events/session/${sessionId}/catch-up?after=${after}`,
  },
  billing: {
    plans: "/platform/billing/plans",
    quote: (slug: string, regionTier: string) =>
      `/platform/billing/plans/${slug}/quote?regionTier=${regionTier}`,
    checkout: "/platform/billing/checkout",
    wallets: (ownerType: string, ownerId: string) =>
      `/platform/billing/owners/${ownerType}/${ownerId}/wallets`,
  },
} as const;
