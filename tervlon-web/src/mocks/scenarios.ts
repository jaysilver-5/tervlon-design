import type { Scenario } from "../lib/types";

/** Mirrors the live catalog at time of writing. In live mode this comes from
 *  GET /platform/catalog/scenarios — never hardcoded into layout. */
export const mockScenarios: Scenario[] = [
  {
    slug: "campaign-analytics-sprint",
    title: "Campaign Analytics Sprint",
    track: "Backend",
    level: 1,
    estimatedMinutes: 60,
    tickets: 3,
    description:
      "Ship a reporting endpoint for a marketing analytics service. Aggregate spend, guard against bad inputs, and keep the query fast.",
    active: true,
  },
  {
    slug: "ecommerce-api-sprint",
    title: "E-Commerce API Sprint",
    track: "Backend",
    level: 2,
    estimatedMinutes: 90,
    tickets: 5,
    description:
      "Join a checkout team mid-sprint. Harden the auth guard, make webhooks idempotent, and stop expired tokens slipping through.",
    active: true,
    flagship: true,
  },
  {
    slug: "wallet-ledger-sprint",
    title: "Wallet Ledger Sprint",
    track: "Backend",
    level: 2,
    estimatedMinutes: 90,
    tickets: 5,
    description:
      "Build a double-entry wallet ledger: reservations, consumption, refunds — without ever letting a balance go wrong.",
    active: true,
  },
  {
    slug: "checkout-form-sprint",
    title: "Checkout Form Sprint",
    track: "Frontend",
    level: 1,
    estimatedMinutes: 60,
    tickets: 3,
    description:
      "Wire a resilient checkout form: validation, optimistic state, and a clean error path when the network blinks.",
    active: true,
  },
  {
    slug: "analytics-dashboard-sprint",
    title: "Analytics Dashboard Sprint",
    track: "Frontend",
    level: 2,
    estimatedMinutes: 90,
    tickets: 5,
    description:
      "Build a live dashboard against a streaming source — loading, empty, and reconnect states that feel considered.",
    active: true,
  },
  {
    slug: "feature-flags-sprint",
    title: "Feature Flags Sprint",
    track: "Full-stack",
    level: 2,
    estimatedMinutes: 90,
    tickets: 5,
    description:
      "Ship a feature-flag system end to end: an API, a typed client, and a rollout that can't take the app down.",
    active: true,
  },
];
