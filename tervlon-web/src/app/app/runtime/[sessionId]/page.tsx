"use client";
import { useState } from "react";
import { useFrontendContract } from "@/features/runtime/useFrontendContract";
import { useRuntimeEvents } from "@/features/runtime/useRuntimeEvents";
import { disabledReason } from "@/lib/api/runAction";
import type { LayoutPriority, RuntimeAction } from "@/lib/types";

const LAYOUTS: LayoutPriority[] = [
  "workspace",
  "standup_incoming",
  "standup_meeting",
  "review_waiting",
  "retrospective_ready",
];

export default function RuntimePage({
  params,
}: {
  params: { sessionId: string };
}) {
  const [layout, setLayout] = useState<LayoutPriority>("workspace");
  const { data, isLoading } = useFrontendContract(params.sessionId, layout);

  // Live event loop (inert on mock) — demonstrates the wiring is ready.
  useRuntimeEvents(params.sessionId, data?.contract.eventTransport);

  if (isLoading || !data) {
    return (
      <div className="page">
        <p className="skel">Loading runtime contract…</p>
      </div>
    );
  }

  const { contract, runtime } = data;
  const lp = contract.layoutPriority;

  return (
    <div className="page">
      {/* the routing brain, made visible */}
      <div className="layout-banner">
        <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
          Top-level layout is switched off{" "}
          <span className="mono" style={{ color: "var(--ink)" }}>
            contract.layoutPriority
          </span>{" "}
          →
        </span>
        <span className="lp">{lp}</span>
        <div className="layout-switch">
          {LAYOUTS.map((l) => (
            <a
              key={l}
              className={l === layout ? "on" : ""}
              onClick={() => setLayout(l)}
              role="button"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      {lp === "standup_incoming" || lp === "standup_meeting" ? (
        <StandupView contract={contract} runtime={runtime} />
      ) : (
        <WorkspaceView contract={contract} layoutPriority={lp} />
      )}
    </div>
  );
}

function ActionButton({
  action,
  label,
}: {
  action: RuntimeAction;
  label: string;
}) {
  const reason = disabledReason(action);
  return (
    <button
      className="btn btn-sm btn-ghost"
      disabled={!action.enabled}
      title={reason ?? undefined}
    >
      {label}
    </button>
  );
}

function WorkspaceView({
  contract,
  layoutPriority,
}: {
  contract: import("@/lib/types").FrontendContract;
  layoutPriority: LayoutPriority;
}) {
  const ws = contract.workspace;
  const ticket = ws.currentTicket;
  const checkSignals = contract.review.latestCheck?.signals ?? [];
  const gate =
    disabledReason(ws.actions.writeFile) ?? disabledReason(ws.actions.runChecks);

  return (
    <div className="rt-grid">
      {/* board */}
      <div className="rt-pane">
        <h4>Board</h4>
        <div className="body">
          {ws.board.map((col) => (
            <div key={col.status}>
              <div className="bcol">{col.status.replace("_", " ")}</div>
              {col.tickets.map((t) => (
                <div
                  key={t.id}
                  className={`btk${t.ticketId === ticket?.ticketId ? " on" : ""}`}
                >
                  <span className="id">{t.ticketId}</span>
                  <div className="t">{t.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* task + editor */}
      <div className="rt-pane">
        <h4>{ticket ? `${ticket.ticketId} · ${ticket.title}` : "Task"}</h4>
        <div className="body">
          {ticket?.acceptanceCriteria.map((c, i) => (
            <div key={i} className={`crit${checkSignals[i]?.passed ? " done" : ""}`}>
              <span className="tick" />
              <span>{c}</span>
            </div>
          ))}
          <div className="editor-mini" style={{ marginTop: 14 }}>
            {ws.files[0]?.content ?? "// no file open"}
          </div>
          {gate && <div className="gate-note">{gate}</div>}
          <div className="action-row" style={{ marginTop: 12 }}>
            <ActionButton action={ws.actions.runChecks} label="Run checks" />
            <ActionButton action={contract.review.requestReview} label="Request review" />
          </div>
        </div>
      </div>

      {/* review / report */}
      <div className="rt-pane">
        <h4>{layoutPriority === "retrospective_ready" ? "Report" : "Review"}</h4>
        <div className="body">
          {layoutPriority === "review_waiting" ? (
            <p className="muted" style={{ fontSize: 13 }}>
              James is reviewing… narrative arrives first, the score second and quieter.
            </p>
          ) : contract.review.latest ? (
            <>
              <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
                {contract.review.latest.summary}
              </p>
              <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--muted)" }}>
                Score{" "}
                <b style={{ color: "var(--ink-2)", fontSize: 15 }}>
                  {contract.review.latest.score}
                </b>{" "}
                · shown only after review completes
              </div>
            </>
          ) : (
            <p className="muted" style={{ fontSize: 13 }}>
              {contract.review.rule}
            </p>
          )}
          {layoutPriority === "retrospective_ready" && (
            <div className="action-row" style={{ marginTop: 14 }}>
              <ActionButton action={contract.report.generate} label="Generate report" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StandupView({
  contract,
  runtime,
}: {
  contract: import("@/lib/types").FrontendContract;
  runtime: import("@/lib/types").RuntimePresenter;
}) {
  const incoming = contract.layoutPriority === "standup_incoming";
  const active = runtime.activeStandup;

  if (incoming) {
    return (
      <div className="rt-pane" style={{ maxWidth: 360, margin: "10px auto" }}>
        <h4 style={{ color: "var(--sarah)" }}>Standup incoming — the only interrupt</h4>
        <div className="body" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
            {runtime.sarah.message}
          </p>
          <div className="action-row" style={{ justifyContent: "center", marginTop: 14 }}>
            <ActionButton action={contract.standup.actions.join} label="Join standup" />
            <ActionButton action={contract.standup.actions.delayOnce} label="Need 30s" />
          </div>
          <p style={{ fontSize: 11, color: "var(--faint)", marginTop: 10 }}>
            Countdown {contract.standup.meetingRules.countdownSeconds}s · a delay, not a
            dismissal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="meet shot">
      <div className="meet-head">
        <span className="av">SC</span>
        <div>
          <div className="t">{runtime.sarah.name}</div>
          <div className="s">{runtime.sarah.label}</div>
        </div>
        <span className="live">
          <span className="d" />
          Live · listening
        </span>
      </div>
      <div className="meet-body">
        <div className="stage">
          <div className="tile spk">
            <span className="av big" style={{ background: "var(--sarah)" }}>SC</span>
            <span className="role">Speaking</span>
            <span className="wave"><i /><i /><i /><i /></span>
            <span className="nm">Sarah</span>
          </div>
          <div className="tile"><span className="av big" style={{ background: "var(--marcus)" }}>MR</span><span className="nm">Marcus</span></div>
          <div className="tile"><span className="av big" style={{ background: "var(--priya)" }}>PR</span><span className="nm">Priya</span></div>
          <div className="tile"><span className="av big" style={{ background: "var(--blue)" }}>JO</span><span className="nm">You</span></div>
        </div>
        <div className="transcript">
          <div className="tr-h">Transcript</div>
          <div className="tr-body">
            {active?.exchanges.map((ex) => (
              <div key={ex.turnIndex} className={`tl${ex.speakerActor === "candidate" ? " you" : ""}`}>
                <div className="tl-h">{ex.speakerActor === "candidate" ? "You" : "Sarah"}</div>
                <div className="tl-b">{ex.content}</div>
              </div>
            ))}
          </div>
          <div className="tr-foot">
            <div className="qps">
              {runtime.ui.quickPrompts.map((q) => (
                <span key={q} className="qp">{q}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
