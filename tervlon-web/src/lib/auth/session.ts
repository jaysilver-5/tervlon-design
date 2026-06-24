/**
 * Minimal in-memory access-token store. The refresh token is expected to live in
 * an httpOnly cookie (set by the backend), which is also what authorizes the SSE
 * stream — see lib/sse/stream.ts. Nothing here touches localStorage on purpose:
 * access tokens in memory + refresh in an httpOnly cookie is the robust default.
 *
 * Integration: call `setAccessToken` after /auth/login and /auth/refresh.
 */

let accessToken: string | null = null;
const listeners = new Set<(token: string | null) => void>();

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
  listeners.forEach((fn) => fn(token));
}

export function onAccessTokenChange(fn: (token: string | null) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
