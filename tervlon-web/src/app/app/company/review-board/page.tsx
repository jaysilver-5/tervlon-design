import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { TRACK_COLOR } from "@/lib/people";
import { COMPANY } from "@/mocks/company";
import { BandPill } from "@/features/dev/charts";
import { StatusChip, PersonSquare } from "@/features/company/ui";

export default function ReviewBoardPage() {
  const c = COMPANY;
  return (
    <section className="page fade">
      <div className="crumb">
        <Link className="c-link" href="/app/company">Dashboard</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>Review board</span>
      </div>
      <div className="greet" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26 }}>Candidate pipeline</h1>
          <p className="lead" style={{ marginTop: 6 }}>Every candidate, the same real sprint. Open a report for the evidence and the integrity band.</p>
        </div>
        <div className="greet-r"><Link className="btn btn-pri btn-sm" href="/app/company/assessments"><Icon path={icon.plus} size={14} sw={2.2} /> New assessment</Link></div>
      </div>
      <div className="pnl">
        <table className="htab">
          <thead><tr><th>Candidate</th><th>Assessment</th><th>Track</th><th>Status</th><th>Score</th><th>Integrity</th><th></th></tr></thead>
          <tbody>
            {c.pipeline.map((p) => (
              <tr key={p.name}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><PersonSquare name={p.name} track={p.track} /><span className="ht2">{p.name}</span></div></td>
                <td style={{ fontSize: 12.5 }}>{p.assessment}</td>
                <td><span className="track" style={{ fontSize: 11.5 }}><span className="sq" style={{ width: 7, height: 7, background: TRACK_COLOR[p.track] }} />{p.track}</span></td>
                <td><StatusChip status={p.status} /></td>
                <td className="hs">{p.score != null ? p.score : "—"}</td>
                <td><BandPill band={p.band} /></td>
                <td style={{ textAlign: "right" }}>
                  {p.status === "Completed"
                    ? <Link className="link" style={{ fontSize: 12.5 }} href="/app/company/report">View report →</Link>
                    : <span style={{ color: "var(--faint)", fontSize: 12 }}>in progress</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer"><span>Reports show evidence + a neutral integrity band — a human draws the conclusion.</span><span>{c.pipeline.length} candidates</span></div>
    </section>
  );
}
