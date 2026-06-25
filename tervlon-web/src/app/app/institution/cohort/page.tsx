import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { INSTITUTION } from "@/mocks/company";
import { BandPill } from "@/features/dev/charts";
import { StatusChip, PersonSquare } from "@/features/company/ui";

export default function CohortPage() {
  const I = INSTITUTION;
  const c = I.cohorts[0];
  return (
    <section className="page fade" style={{ maxWidth: 1080 }}>
      <div className="crumb">
        <Link className="c-link" href="/app/institution">Dashboard</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{c.name}</span>
      </div>
      <div className="greet" style={{ marginBottom: 16 }}>
        <div>
          <h1 className="display" style={{ fontSize: 25 }}>{c.name}</h1>
          <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12.5, color: "var(--muted)" }}>
            <span><b style={{ color: "var(--ink)" }}>{c.learners}</b> learners</span>
            <span><b style={{ color: "var(--ink)" }}>{c.completion}%</b> complete</span>
            <span><b style={{ color: "var(--ink)" }}>{c.avg}</b> avg evidence</span>
            <span><StatusChip status={c.status} /></span>
          </div>
        </div>
        <div className="greet-r"><button className="btn btn-pri btn-sm"><Icon path={icon.plus} size={14} sw={2.2} /> Add learners</button></div>
      </div>
      <div className="pnl">
        <table className="htab">
          <thead><tr><th>Learner</th><th>Status</th><th>Score</th><th>Integrity</th><th></th></tr></thead>
          <tbody>
            {I.learners.map((l) => (
              <tr key={l.name}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><PersonSquare name={l.name} track={l.track} /><span className="ht2">{l.name}</span></div></td>
                <td><StatusChip status={l.status} /></td>
                <td className="hs">{l.score != null ? l.score : "—"}</td>
                <td><BandPill band={l.band} /></td>
                <td style={{ textAlign: "right" }}>
                  {l.status === "Completed"
                    ? <Link className="link" style={{ fontSize: 12.5 }} href="/app/company/report">View evidence →</Link>
                    : <span style={{ color: "var(--faint)", fontSize: 12 }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer"><span>Open a learner&apos;s evidence to coach — the report shows what they can and can&apos;t yet do.</span><span>{I.learners.length} learners</span></div>
    </section>
  );
}
