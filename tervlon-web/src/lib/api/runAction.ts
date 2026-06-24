/**
 * The single gate for every mutating call. The backend pre-computes whether each
 * action is allowed and returns `{ method, url, enabled, disabledReason }`. You do
 * NOT decide whether the candidate may write a file, run checks, request review,
 * join a standup, etc. — you read `enabled`, call `url` with `method`, and surface
 * `disabledReason` when it's false. Route every runtime mutation through here.
 */
import type { RuntimeAction } from "../types";
import { request } from "./client";

export class ActionDisabledError extends Error {
  constructor(public reason: string | null) {
    super(reason ?? "This action is not available right now.");
    this.name = "ActionDisabledError";
  }
}

export async function runAction<T = unknown>(
  action: RuntimeAction | undefined,
  body?: unknown,
): Promise<T> {
  if (!action || !action.enabled || !action.url) {
    throw new ActionDisabledError(action?.disabledReason ?? null);
  }
  return request<T>(action.url, {
    method: action.method,
    body,
  });
}

/** Friendly copy for a gated action — use in disabled buttons/tooltips. */
export function disabledReason(action: RuntimeAction | undefined): string | null {
  if (!action || action.enabled) return null;
  return action.disabledReason ?? "Not available right now.";
}
