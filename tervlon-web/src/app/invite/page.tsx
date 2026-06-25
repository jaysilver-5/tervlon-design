import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon, icon } from "@/components/icons";
import { mockScenarios } from "@/mocks/scenarios";

/**
 * Public invite landing — no auth. Accepting mints an attempt and drops the
 * candidate straight into the runtime (in live: POST assessment-invites/:token/accept).
 */
export default function InvitePage() {
  const s = mockScenarios.find((x) => x.slug === "ecommerce-api-sprint")!;
  return (
    <div className="invite-land fade">
      <div className="il-top"><Logo size={26} /><span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-.03em" }}>Tervlon</span></div>
      <div className="il-card">
        <div className="il-from">
          <span className="av" style={{ background: "var(--marcus)", width: 30, height: 30, fontSize: 11 }}>NW</span>
          Northwind invited you to an assessment
        </div>
        <h1 className="display" style={{ fontSize: 25, margin: "14px 0 6px" }}>{s.title}</h1>
        <p className="lead" style={{ marginBottom: 18 }}>
          You&apos;ll join a software team that&apos;s already mid-sprint, pick up real tickets, and
          get pulled into a standup with the engineering lead. It&apos;s a real day of work — not a quiz.
        </p>
        <div className="il-meta">
          <div className="ilm"><div className="k">Track</div><div className="v">{s.track}</div></div>
          <div className="ilm"><div className="k">Level</div><div className="v">{s.level === 1 ? "Junior" : "Mid"}</div></div>
          <div className="ilm"><div className="k">Tickets</div><div className="v">{s.tickets}</div></div>
          <div className="ilm"><div className="k">Time</div><div className="v">~{s.estimatedMinutes}m</div></div>
        </div>
        <Link className="btn btn-pri" href={`/sprint/${s.slug}`} style={{ width: "100%", marginTop: 20, padding: 12 }}>
          Accept &amp; start the sprint <Icon path={icon.arrow} size={15} sw={2.1} />
        </Link>
        <div className="auth-note" style={{ textAlign: "center" }}>Accepting mints your attempt and drops you straight into the runtime — no long signup.</div>
      </div>
      <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 18 }}>
        Your work is observed to produce a fair, evidence-backed report. <Link href="/auth" style={{ color: "var(--blue-d)" }}>Have an account?</Link>
      </div>
    </div>
  );
}
