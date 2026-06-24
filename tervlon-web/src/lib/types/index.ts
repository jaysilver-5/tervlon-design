export * from "./runtime";

/* ── auth ── */
export type UserRole =
  | "DEVELOPER"
  | "COMPANY_ADMIN"
  | "COMPANY_MEMBER"
  | "INSTITUTION_ADMIN"
  | "PLATFORM_ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthTokens {
  user: AuthUser;
}

/* ── catalog ── */
export type Track = "Backend" | "Frontend" | "Full-stack";

export interface Scenario {
  slug: string;
  title: string;
  track: Track;
  level: number; // 1 = Junior, 2 = Mid
  estimatedMinutes: number;
  description: string;
  active: boolean;
  tickets?: number;
  flagship?: boolean;
}

/* ── attempts ── */
export interface Attempt {
  id: string;
  scenarioSlug: string;
  status: string;
  billingSnapshot?: unknown;
  creditReservation?: unknown;
}

/* ── billing ── */
export type RegionTier = "TIER_1" | "TIER_2" | "TIER_3" | "TIER_4" | "CUSTOM";

export interface BillingPlan {
  slug: string;
  name: string;
  blurb: string;
  kind: "PAYG" | "sub";
  amount: { display: string; cents: number; currency: string };
  credits: number | null;
  period?: string;
  features: string[];
  popular?: boolean;
  configured: boolean;
}

export interface Wallet {
  creditType: string;
  balance: number;
  reserved: number;
  unlimited: boolean;
  available: number | null;
  availabilityLabel: string;
}
