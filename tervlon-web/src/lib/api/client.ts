/**
 * The one fetch wrapper. Injects the bearer token, and on a 401 runs a single
 * silent refresh and retries once. Every live hook calls through `request`.
 *
 * This is the single most important integration seam: the backend is action-driven,
 * so most mutating calls go through `runAction` (which calls `request`), and reads
 * go through the data source (which, in live mode, also calls `request`).
 */
import { env } from "../env";
import { getAccessToken, setAccessToken } from "../auth/session";
import { endpoints } from "./endpoints";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  /** absolute path beginning with "/" — relative to NEXT_PUBLIC_API_BASE_URL */
  signal?: AbortSignal;
  /** skip the auth header (login/refresh) */
  anonymous?: boolean;
}

let refreshing: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  // Coalesce concurrent 401s into one refresh.
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const res = await fetch(`${env.apiBaseUrl}${endpoints.auth.refresh}`, {
          method: "POST",
          credentials: "include", // refresh token rides in an httpOnly cookie
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return false;
        const data = (await res.json()) as { accessToken?: string };
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        refreshing = null;
      }
    })();
  }
  return refreshing;
}

export async function request<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, signal, anonymous } = options;

  const doFetch = async (): Promise<Response> => {
    const headers: Record<string, string> = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const token = getAccessToken();
    if (!anonymous && token) headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${env.apiBaseUrl}${path}`, {
      method,
      headers,
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  };

  let res = await doFetch();

  if (res.status === 401 && !anonymous) {
    const refreshed = await attemptRefresh();
    if (refreshed) res = await doFetch();
  }

  if (!res.ok) {
    let parsed: unknown;
    try {
      parsed = await res.json();
    } catch {
      parsed = undefined;
    }
    const message =
      (parsed as { message?: string })?.message ?? `Request failed (${res.status})`;
    throw new ApiError(res.status, message, parsed);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
