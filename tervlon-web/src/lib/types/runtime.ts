/**
 * Types mirrored from the NestJS backend's runtime contract. These are the shapes
 * the frontend depends on; they are intentionally close to the backend DTOs so that
 * swapping mock → live changes data, not types.
 *
 * Source of truth: TERVLON_FRONTEND_ENGINEERING.md (Parts 6–11) + the live
 * `/runtime/sessions/:id/frontend-contract` schema.
 */

/** Every mutating capability is described by the backend, never computed client-side. */
export interface RuntimeAction {
  method: "GET" | "POST" | "PATCH";
  url: string | null;
  enabled: boolean;
  disabledReason: string | null;
}

/** The top-level routing brain. Switch the whole screen off this — do not derive it. */
export type LayoutPriority =
  | "workspace"
  | "standup_incoming"
  | "standup_meeting"
  | "review_waiting"
  | "retrospective_ready";

export type LoudnessTier =
  | "ambient"
  | "informational"
  | "active"
  | "interrupting"
  | "internal";

export interface EventTransport {
  streamUrl: string;
  catchUpUrl: string;
  cursor: string | null;
  heartbeatMs: number;
  reconnectRule: string;
}

export interface WorkspaceContract {
  stateUrl: string;
  engineStateUrl: string;
  previewUrl: string | null;
  sandboxStatus: string;
  sandboxTemplate: string;
  templateContractUrl: string | null;
  board: BoardColumn[];
  currentTicket: TicketRun | null;
  files: WorkspaceFile[];
  actions: {
    writeFile: RuntimeAction;
    runChecks: RuntimeAction;
    startDevServer: RuntimeAction;
    preview: RuntimeAction;
  };
}

export interface StandupContract {
  status: string;
  pending: PendingStandup | null;
  active: ActiveStandup | null;
  latest: unknown | null;
  incoming: PendingStandup | null;
  actions: {
    current: RuntimeAction;
    delayOnce: RuntimeAction;
    join: RuntimeAction;
    realtimeToken: RuntimeAction;
    textTurn: RuntimeAction;
    silentPrompt: RuntimeAction;
    wrap: RuntimeAction;
  };
  meetingRules: {
    countdownSeconds: number;
    delayLabel: string;
    autoJoin: boolean;
    backgroundBehavior: string;
    context: string;
  };
}

export interface ReviewContract {
  latest: ReviewResult | null;
  latestCheck: CheckResult | null;
  canRequestReview: boolean;
  requestReview: RuntimeAction;
  rule: string | null;
}

export interface ReportContract {
  readiness: {
    allTicketsDone: boolean;
    hasCompletedStandup: boolean;
    sessionCompleted: boolean;
    canRequestCompletion: boolean;
    canGenerateDraft: boolean;
    canLockFinal: boolean;
  };
  generate: RuntimeAction;
  candidateView: RuntimeAction;
  companyView: RuntimeAction;
}

export interface PricingContract {
  owner: { ownerType: string; ownerId: string } | null;
  reservation: unknown | null;
  quote: unknown | null;
  quoteUrl: string | null;
  checkoutUrl: string | null;
  walletUrl: string | null;
}

export interface FrontendContract {
  layoutPriority: LayoutPriority;
  eventTransport: EventTransport;
  workspace: WorkspaceContract;
  standup: StandupContract;
  review: ReviewContract;
  report: ReportContract;
  pricing: PricingContract;
  copyRules: {
    noInstructionalChrome: boolean;
    notificationLoudness: string;
  };
}

export interface FrontendContractResponse {
  schemaVersion: string;
  generatedAt: string;
  sessionId: string;
  runtime: RuntimePresenter;
  contract: FrontendContract;
}

/** The presenter object — initial paint for standup/Sarah/ui state. */
export interface RuntimePresenter {
  session: {
    id: string;
    attemptId: string;
    currentPhase: string;
    currentTicketId: string | null;
  };
  pendingStandup: PendingStandup | null;
  activeStandup: ActiveStandup | null;
  sarah: {
    name: string;
    role: string;
    label: string;
    message: string;
    tone: string;
  };
  ui: StandupUi;
}

export interface StandupUi {
  mode: "workspace" | "standup_incoming" | "focused_standup";
  canDelay: boolean;
  canJoin: boolean;
  canReply: boolean;
  canWrap: boolean;
  shouldAutoWrap: boolean;
  autoWrapUrl: string | null;
  wrapCtaLabel: string;
  nextActionLabel: string;
  quickPrompts: string[];
  reconnect?: {
    shouldKeepMeetingOpen: boolean;
    catchUpUrl: string;
    frontendContractUrl: string;
    recoveryRule: string;
  };
}

export interface PendingStandup {
  id: string;
  purpose: string;
  trigger?: string;
  host: string;
  canDelayOnce: boolean;
  autoJoin: boolean;
  countdownSeconds?: number;
  message?: string;
}

export interface StandupExchange {
  speakerActor: Actor;
  content: string;
  turnIndex: number;
}

export interface ActiveStandup {
  id: string;
  standupKey: string;
  purpose: string;
  trigger: string;
  status: string;
  hostActor: Actor;
  activeSpeaker: Actor | null;
  scores: { comprehension: number; communication: number; authenticity: number };
  extractedSummary: string | null;
  contextSnapshot: unknown;
  exchanges: StandupExchange[];
}

export type Actor =
  | "candidate"
  | "sarah"
  | "marcus"
  | "priya"
  | "james"
  | "system"
  | "director";

export type TicketStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export interface BoardColumn {
  status: TicketStatus;
  tickets: { id: string; ticketId: string; title: string; reviewStatus?: string }[];
}

export interface TicketRun {
  id: string;
  ticketId: string;
  title: string;
  status: TicketStatus;
  reviewStatus: string | null;
  acceptanceCriteria: string[];
}

export interface WorkspaceFile {
  id: string;
  path: string;
  language: string;
  content: string;
  version: number;
}

export interface CheckResult {
  status: string;
  signals: { label: string; passed: boolean; hint?: string }[];
}

export interface ReviewResult {
  status: string;
  summary: string;
  score: number | null;
  comments: {
    severity: string;
    location: string;
    snippet?: string;
    note: string;
  }[];
}
