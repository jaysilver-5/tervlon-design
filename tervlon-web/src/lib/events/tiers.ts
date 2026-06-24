/**
 * The notification grammar. The BACKEND decides loudness — render strictly by tier
 * and never escalate on your own. Only `STANDUP_INCOMING` interrupts; unknown types
 * are treated as `internal` and never surfaced.
 *
 * Prefer a `tier` field on the event payload when present; otherwise fall back to
 * this table (mirrored from engineering doc Part 9).
 */
import type { LoudnessTier } from "../types";

const TIER_BY_TYPE: Record<string, LoudnessTier> = {
  // ambient — inline in the activity timeline, no sound
  FILE_EDITED: "ambient",
  TEST_RUN: "ambient",
  TEST_COMPLETED: "ambient",
  BOARD_UPDATED: "ambient",
  TICKET_STATUS_CHANGED: "ambient",
  REVIEW_REQUESTED: "ambient",
  REVIEW_STARTED: "ambient",
  SANDBOX_READY: "ambient",
  SANDBOX_DEV_SERVER_STARTED: "ambient",
  SANDBOX_COMMAND_RAN: "ambient",
  REFERENCE_OPENED: "ambient",
  STANDUP_JOINED: "ambient",
  STANDUP_ACTIVE: "ambient",
  STANDUP_SARAH_RESPONDED: "ambient",
  STANDUP_COMPLETED: "ambient",
  REPORT_GENERATED: "ambient",
  TERMINAL_COMMAND_STARTED: "ambient",
  TERMINAL_COMMAND_COMPLETED: "ambient",

  // informational — side-slide, optional soft chime, dismissible
  AGENT_RESPONDED: "informational",
  AGENT_REDIRECTED: "informational",
  TEAMMATE_MOMENT_FIRED: "informational",
  HELP_PAIRING_ACCEPTED: "informational",
  HELP_PAIRING_DECLINED: "informational",
  SUPPORT_RESOLVED: "informational",
  CHAT_MESSAGE_QUEUED: "informational",
  CHAT_MESSAGE_RELEASED: "informational",

  // active — toast from top, brief chime, replyable
  HELP_PAIRING_OFFERED: "active",
  REVIEW_COMPLETED: "active",
  STANDUP_SILENCE_PROMPTED: "active",
  SUPPORT_REQUESTED: "active",
  SUPPORT_ESCALATED: "active",
  SANDBOX_DEV_SERVER_FAILED: "active",

  // interrupting — full-width, countdown, cannot dismiss, auto-join. ONLY this.
  STANDUP_INCOMING: "interrupting",
};

export function classifyTier(
  eventType: string,
  payloadTier?: string,
): LoudnessTier {
  if (payloadTier && isTier(payloadTier)) return payloadTier;
  return TIER_BY_TYPE[eventType] ?? "internal";
}

function isTier(value: string): value is LoudnessTier {
  return (
    value === "ambient" ||
    value === "informational" ||
    value === "active" ||
    value === "interrupting" ||
    value === "internal"
  );
}

/** Whether an event should ever reach the candidate's UI. */
export function isRenderable(tier: LoudnessTier): boolean {
  return tier !== "internal";
}
