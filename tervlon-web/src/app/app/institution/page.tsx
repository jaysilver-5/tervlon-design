import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { TRACK_COLOR } from "@/lib/people";
import { INSTITUTION } from "@/mocks/company";
import { StatusChip } from "@/features/company/ui";

export default function InstitutionPage() {
  const I = INSTITUTION;
  return (
    <section className="page fade">
      <div className="greet">
        <div>
          <span className="label" style={{ color: "var(--sarah)" }}>Cohort skill verification</span>
          <h1 className="display">{I.name}</h1>
        </div>
        <div className="greet-r">
          <Link className="btn btn-ghost btn-sm" href="/app/institution/cohort"><Icon path={icon.users} size={14} sw={2} /> Cohorts</Link>
          <button className="btn btn-pri btn-sm"><Icon path={icon.plus} size={14} sw={2.2} /> New cohort assessment</button>
        </div>
      </div>

      <div className="signal" style={{ marginTop: 24 }}>
        <div className="sg"><div className="k">Cohorts</div><div className="v tnum">{I.stats.cohorts}</div></div>
        <div className="sg"><div className="k">Learners</div><div className="v tnum">{I.stats.learners}</div></div>
        <div className="sg"><div className="k">Skills verified</div><div className="v tnum">{I.stats.verified}</div></div>
        <div className="sg"><div className="k">Avg completion</div><div className="v tnum">{I.stats.completion}%</div></div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: "1.5fr 1fr", marginTop: 24 }}>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Cohorts</div><Link className="link" href="/app/institution/cohort">All cohorts</Link></div>
          <div style={{ padding: "8px 16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {I.cohorts.map((c) => (
              <Link className="cohort-card" href="/app/institution/cohort" key={c.id}>
                <div className="av" style={{ background: TRACK_COLOR[c.track], width: 38, height: 38, fontSize: 12 }}>{c.track[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 540, fontSize: 13.5 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{c.learners} learners · {c.track}</div>
                  <div className="cohort-bar"><div className="cb-track"><i style={{ width: `${c.completion}%` }} /></div><span>{c.completion}% complete</span></div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontSize: 16, fontWeight: 600 }} className="tnum">{c.avg}</div><div style={{ fontSize: 10, color: "var(--faint)" }}>avg</div></div>
                <StatusChip status={c.status} />
              </Link>
            ))}
          </div>
        </div>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Skill coverage</div><div className="x">Where the cohort is strong / thin</div></div>
          <div style={{ padding: "14px 18px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
            {I.coverage.map((x) => (
              <div key={x.k}>
                <div className="cov-h"><span>{x.k}</span><span className="tnum" style={{ fontWeight: 600 }}>{x.v}</span></div>
                <div className="dim-bar"><i style={{ width: `${x.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer"><span>Cohort learning signals — never a learner leaderboard.</span><span>Institution · {I.name}</span></div>
    </section>
  );
}
