import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { COMPANY } from "@/mocks/company";
import { MiniRing, BandPill } from "@/features/dev/charts";
import { StatusChip, PersonSquare } from "@/features/company/ui";

export default function CompanyPage() {
  const c = COMPANY;
  const reviewable = c.pipeline.filter((p) => p.status === "Completed");

  return (
    <section className="page fade">
      <div className="greet">
        <div>
          <span className="label" style={{ color: "var(--marcus)" }}>Hiring · real-work signal</span>
          <h1 className="display">{c.name} <em className="serif">hiring</em>.</h1>
        </div>
        <div className="greet-r">
          <Link className="btn btn-ghost btn-sm" href="/app/company/review-board"><Icon path={icon.users} size={14} sw={2} /> Review board</Link>
          <Link className="btn btn-pri btn-sm" href="/app/company/assessments"><Icon path={icon.plus} size={14} sw={2.2} /> New assessment</Link>
        </div>
      </div>

      <div className="signal" style={{ marginTop: 24 }}>
        <div className="sg"><div className="k">Open assessments</div><div className="v tnum">{c.stats.openAssessments}</div></div>
        <div className="sg"><div className="k">Candidates</div><div className="v tnum">{c.stats.candidates}</div></div>
        <div className="sg"><div className="k">Needs review</div><div className="v tnum" style={{ color: "var(--warn)" }}>{c.stats.needsReview}</div></div>
        <div className="sg"><div className="k">Hired</div><div className="v tnum">{c.stats.hired}</div></div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: "1.5fr 1fr", marginTop: 24 }}>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Needs your review</div><Link className="link" href="/app/company/review-board">Full review board</Link></div>
          <div style={{ padding: "8px 16px 14px" }}>
            {reviewable.map((p) => (
              <Link className="need-row" href="/app/company/report" key={p.name}>
                <PersonSquare name={p.name} track={p.track} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 540, fontSize: 13 }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{p.assessment}</div>
                </div>
                <MiniRing score={p.score!} size={44} /> <BandPill band={p.band} />
                <span className="btn btn-ghost btn-sm">View report <Icon path={icon.arrow} size={13} sw={2} /></span>
              </Link>
            ))}
          </div>
        </div>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Assessments</div><Link className="link" href="/app/company/assessments">Manage</Link></div>
          <div style={{ padding: "8px 16px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {c.assessments.map((a) => (
              <div className="as-card" key={a.id}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 540, fontSize: 13 }}>{a.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{a.scenario}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 540 }}>{a.completed}/{a.invited}</div>
                  <div style={{ fontSize: 10.5, color: "var(--faint)" }}>completed</div>
                </div>
                <StatusChip status={a.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer"><span>Real-work signal on candidates — cheaper than interviews, harder to fake.</span><span>Company · {c.name}</span></div>
    </section>
  );
}
