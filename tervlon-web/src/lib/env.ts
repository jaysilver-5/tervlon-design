/**
 * Central, typed access to the (few) public env vars. Read these here, never
 * `process.env.*` scattered through the app.
 */

export type DataSource = "mock" | "live";

export const env = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
    "http://localhost:3001",
  dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) ?? "mock",
} as const;

export const isLive = env.dataSource === "live";
export const isMock = env.dataSource === "mock";
