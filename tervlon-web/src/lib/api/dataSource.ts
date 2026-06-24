/**
 * The mock ⇄ live seam. Hooks call `api.*` and never know which backing they hit.
 *
 *   NEXT_PUBLIC_DATA_SOURCE=mock  → fixtures from src/mocks (default; runs with no API)
 *   NEXT_PUBLIC_DATA_SOURCE=live  → real NestJS via the auth fetch wrapper (request)
 *
 * To integrate: implement/confirm the `liveApi` methods (the endpoints are already
 * wired), set DATA_SOURCE=live, and sign in so the bearer token is present. No hook
 * or component changes required.
 */
import { isLive } from "../env";
import { request } from "./client";
import { endpoints } from "./endpoints";
import type {
  BillingPlan,
  FrontendContractResponse,
  LayoutPriority,
  Scenario,
  Wallet,
} from "../types";
import { mockScenarios } from "../../mocks/scenarios";
import { mockContract } from "../../mocks/contract";
import { mockPlans, mockWallet } from "../../mocks/billing";

export interface TervlonApi {
  listScenarios(): Promise<Scenario[]>;
  getScenario(slug: string): Promise<Scenario | undefined>;
  getFrontendContract(
    sessionId: string,
    layoutPriority?: LayoutPriority,
  ): Promise<FrontendContractResponse>;
  listPlans(): Promise<BillingPlan[]>;
  getWallet(ownerType: string, ownerId: string): Promise<Wallet>;
}

const delay = (ms = 220) => new Promise((r) => setTimeout(r, ms));

const mockApi: TervlonApi = {
  async listScenarios() {
    await delay();
    return mockScenarios;
  },
  async getScenario(slug) {
    await delay();
    return mockScenarios.find((s) => s.slug === slug);
  },
  async getFrontendContract(sessionId, layoutPriority = "workspace") {
    await delay();
    return mockContract(sessionId, layoutPriority);
  },
  async listPlans() {
    await delay();
    return mockPlans;
  },
  async getWallet() {
    await delay();
    return mockWallet;
  },
};

const liveApi: TervlonApi = {
  listScenarios: () => request<Scenario[]>(endpoints.catalog.scenarios),
  getScenario: (slug) => request<Scenario>(endpoints.catalog.scenario(slug)),
  getFrontendContract: (sessionId) =>
    request<FrontendContractResponse>(
      endpoints.runtime.frontendContract(sessionId),
    ),
  // The live response wraps plans as { plans, flexibilityNote } — adapt here so the
  // rest of the app keeps a clean Scenario/Plan shape.
  listPlans: async () => {
    const res = await request<{ plans: unknown[] }>(endpoints.billing.plans);
    return res.plans as unknown as BillingPlan[];
  },
  getWallet: async (ownerType, ownerId) => {
    const wallets = await request<Wallet[]>(
      endpoints.billing.wallets(ownerType, ownerId),
    );
    return wallets[0];
  },
};

export const api: TervlonApi = isLive ? liveApi : mockApi;
