import type { FrontendContractResponse, LayoutPriority } from "../lib/types";

const gatedOff = (reason: string) => ({
  method: "POST" as const,
  url: null,
  enabled: false,
  disabledReason: reason,
});
const on = (method: "GET" | "POST" | "PATCH", url: string) => ({
  method,
  url,
  enabled: true,
  disabledReason: null,
});

/**
 * A fixture for each of the five layoutPriority states — the same idea as the
 * backend's GET /runtime/sessions/frontend-contract/fixtures. Build & storybook the
 * five layouts against these before ever touching a live session.
 */
export function mockContract(
  sessionId: string,
  layoutPriority: LayoutPriority = "workspace",
): FrontendContractResponse {
  const standupLive =
    layoutPriority === "standup_meeting" || layoutPriority === "standup_incoming";
  return {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    sessionId,
    runtime: {
      session: {
        id: sessionId,
        attemptId: "att_mock",
        currentPhase: "ticket_work",
        currentTicketId: "T-03",
      },
      pendingStandup:
        layoutPriority === "standup_incoming"
          ? {
              id: "su_1",
              purpose: "daily",
              host: "sarah",
              canDelayOnce: true,
              autoJoin: true,
              countdownSeconds: 8,
              message: "Sarah wants to sync on T-03.",
            }
          : null,
      activeStandup:
        layoutPriority === "standup_meeting"
          ? {
              id: "su_1",
              standupKey: "daily-1",
              purpose: "daily",
              trigger: "ticket.reviewed",
              status: "ACTIVE",
              hostActor: "sarah",
              activeSpeaker: "sarah",
              scores: { comprehension: 0, communication: 0, authenticity: 0 },
              extractedSummary: null,
              contextSnapshot: {},
              exchanges: [
                {
                  speakerActor: "sarah",
                  content:
                    "Morning — walk me through T-03. What was actually failing on the auth guard?",
                  turnIndex: 0,
                },
                {
                  speakerActor: "candidate",
                  content:
                    "Expired tokens were slipping through — the guard checked presence but never the exp claim.",
                  turnIndex: 1,
                },
                {
                  speakerActor: "sarah",
                  content: "Good catch. How are you proving it's fixed?",
                  turnIndex: 2,
                },
              ],
            }
          : null,
      sarah: {
        name: "Sarah Chen",
        role: "Engineering Lead",
        label: "Engineering Lead · Daily Standup",
        message: "Let's talk through the auth guard before you go further.",
        tone: "calm-direct",
      },
      ui: {
        mode: standupLive
          ? layoutPriority === "standup_meeting"
            ? "focused_standup"
            : "standup_incoming"
          : "workspace",
        canDelay: layoutPriority === "standup_incoming",
        canJoin: layoutPriority === "standup_incoming",
        canReply: layoutPriority === "standup_meeting",
        canWrap: layoutPriority === "standup_meeting",
        shouldAutoWrap: false,
        autoWrapUrl: null,
        wrapCtaLabel: "Continue to workspace",
        nextActionLabel: standupLive ? "Reply to Sarah" : "Keep coding",
        quickPrompts: [
          "I'm still understanding the task",
          "I found the likely issue",
          "I'm blocked",
          "I'm ready to implement",
        ],
      },
    },
    contract: {
      layoutPriority,
      eventTransport: {
        streamUrl: `/runtime/events/session/${sessionId}/stream`,
        catchUpUrl: `/runtime/events/session/${sessionId}/catch-up`,
        cursor: null,
        heartbeatMs: 15000,
        reconnectRule: "catch-up, then refetch contract, then repaint",
      },
      workspace: {
        stateUrl: `/runtime/sessions/${sessionId}/state`,
        engineStateUrl: `/engines/software-sprint/sessions/${sessionId}/state`,
        previewUrl: null,
        sandboxStatus: "ready",
        sandboxTemplate: "node-postgres",
        templateContractUrl: null,
        board: [
          {
            status: "IN_PROGRESS",
            tickets: [{ id: "tr3", ticketId: "T-03", title: "Harden the auth guard" }],
          },
          {
            status: "TODO",
            tickets: [
              { id: "tr4", ticketId: "T-04", title: "Rate-limit checkout" },
              { id: "tr5", ticketId: "T-05", title: "Idempotent webhooks" },
            ],
          },
          {
            status: "DONE",
            tickets: [
              { id: "tr1", ticketId: "T-01", title: "Seed the product catalog" },
              { id: "tr2", ticketId: "T-02", title: "Cart totals + tax" },
            ],
          },
        ],
        currentTicket: {
          id: "tr3",
          ticketId: "T-03",
          title: "Harden the auth guard",
          status: "IN_PROGRESS",
          reviewStatus: null,
          acceptanceCriteria: [
            "Reject requests with no Authorization header (401).",
            "Reject expired tokens — verify the exp claim.",
            "Attach the decoded userId to the request.",
            "Hidden suite passes.",
          ],
        },
        files: [
          {
            id: "f1",
            path: "src/middleware/auth.guard.ts",
            language: "typescript",
            version: 4,
            content:
              "export interface AuthRequest extends Request {\n  userId?: string;\n}\n\n// reject expired tokens before the handler runs\nexport const authGuard = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401);\n};\n",
          },
        ],
        actions: {
          writeFile:
            layoutPriority === "standup_meeting"
              ? gatedOff("A standup has the floor — the editor is read-only.")
              : on("POST", `/engines/software-sprint/sessions/${sessionId}/files/write`),
          runChecks:
            layoutPriority === "standup_meeting"
              ? gatedOff("A standup has the floor right now.")
              : on("POST", `/engines/software-sprint/sessions/${sessionId}/checks/run`),
          startDevServer: gatedOff("Backend track — no dev server."),
          preview: gatedOff("Backend track — no preview."),
        },
      },
      standup: {
        status: standupLive ? "ACTIVE" : "idle",
        pending: null,
        active: null,
        latest: null,
        incoming: null,
        actions: {
          current: on("GET", `/runtime/standups/sessions/${sessionId}/current`),
          delayOnce: layoutPriority === "standup_incoming"
            ? on("POST", `/runtime/standups/sessions/${sessionId}/delay`)
            : gatedOff("No standup is incoming."),
          join: layoutPriority === "standup_incoming"
            ? on("POST", `/runtime/standups/sessions/${sessionId}/join`)
            : gatedOff("No standup is incoming."),
          realtimeToken: on("POST", `/runtime/voice/sessions/${sessionId}/realtime-token`),
          textTurn: layoutPriority === "standup_meeting"
            ? on("POST", `/runtime/standups/su_1/turns`)
            : gatedOff("The standup is not active."),
          silentPrompt: gatedOff("The standup is not active."),
          wrap: layoutPriority === "standup_meeting"
            ? on("POST", `/runtime/standups/su_1/wrap`)
            : gatedOff("The standup is not active."),
        },
        meetingRules: {
          countdownSeconds: 8,
          delayLabel: "Need 30s",
          autoJoin: true,
          backgroundBehavior: "preserve-workspace",
          context: "ticket+checks+prior-summary",
        },
      },
      review: {
        latest:
          layoutPriority === "review_waiting"
            ? null
            : {
                status: "COMPLETED",
                summary:
                  "Solid fix. You reproduced the bug first and the exp check is correct. Watch the error shape — return a typed 401 body, not a bare status.",
                score: 81,
                comments: [
                  {
                    severity: "minor",
                    location: "auth.guard.ts:8",
                    snippet: "if (!token) return res.status(401);",
                    note: "Return a JSON body too, so clients can branch on a code.",
                  },
                ],
              },
        latestCheck: {
          status: "PASSED",
          signals: [
            { label: "Rejects missing header", passed: true },
            { label: "Rejects expired token", passed: true },
            { label: "Attaches userId", passed: true },
            { label: "Hidden suite", passed: true },
          ],
        },
        canRequestReview: layoutPriority !== "standup_meeting",
        requestReview:
          layoutPriority === "standup_meeting"
            ? gatedOff("A standup has the floor right now.")
            : on("POST", `/engines/software-sprint/sessions/${sessionId}/review/request`),
        rule: "Run and pass checks first.",
      },
      report: {
        readiness: {
          allTicketsDone: layoutPriority === "retrospective_ready",
          hasCompletedStandup: layoutPriority === "retrospective_ready",
          sessionCompleted: layoutPriority === "retrospective_ready",
          canRequestCompletion: layoutPriority === "retrospective_ready",
          canGenerateDraft: layoutPriority === "retrospective_ready",
          canLockFinal: false,
        },
        generate:
          layoutPriority === "retrospective_ready"
            ? on("POST", `/runtime/reports/sessions/${sessionId}/generate`)
            : gatedOff("Finish the sprint and a standup first."),
        candidateView: on("GET", `/runtime/reports/attempts/att_mock/candidate-view`),
        companyView: on("GET", `/runtime/reports/attempts/att_mock/company-view`),
      },
      pricing: {
        owner: { ownerType: "USER", ownerId: "u_mock" },
        reservation: null,
        quote: null,
        quoteUrl: null,
        checkoutUrl: "/platform/billing/checkout",
        walletUrl: "/platform/billing/owners/USER/u_mock/wallets",
      },
      copyRules: {
        noInstructionalChrome: true,
        notificationLoudness: "backend-classified",
      },
    },
  };
}
