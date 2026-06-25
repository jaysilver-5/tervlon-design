import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { TRACK_COLOR } from "@/lib/people";
import { COMPANY } from "@/mocks/company";
import { StatusChip } from "@/features/company/ui";

export default function AssessmentsPage() {
  const c = COMPANY;
  return (
    <section className="page fade" style={{ maxWidth: 1080 }}>
      <div className="crumb">
        <Link className="c-link" href="/app/company">Dashboard</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>Assessments</span>
      </div>
      <div className="greet" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26 }}>Assessments</h1>
          <p className="lead" style={{ marginTop: 6 }}>Pick a scenario, invite candidates, read evidence-backed reports.</p>
        </div>
        <div className="greet-r"><button className="btn btn-pri btn-sm"><Icon path={icon.plus} size={14} sw={2.2} /> Create assessment</button></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {c.assessments.map((a) => (
          <div className="pnl as-full" key={a.id}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px" }}>
              <div className="av" style={{ background: TRACK_COLOR[a.track], width: 40, height: 40, fontSize: 13 }}>{a.track[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 560, fontSize: 15, letterSpacing: "-.01em" }}>{a.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{a.scenario} · {a.track}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                  <span><b style={{ color: "var(--ink)" }}>{a.invited}</b> invited</span>
                  <span><b style={{ color: "var(--ink)" }}>{a.completed}</b> completed</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <StatusChip status={a.status} />
                <div style={{ display: "flex", gap: 8 }}>
                  <Link className="btn btn-ghost btn-sm" href="/app/company/review-board">Candidates</Link>
                  <button className="btn btn-blue btn-sm" disabled={a.status === "Draft"}><Icon path={icon.plus} size={13} sw={2.2} /> Invite</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer"><span>Pricing is credits; runtime access is gated on credits, never a dollar wall.</span><span>{c.assessments.length} assessments</span></div>
    </section>
  );
}
