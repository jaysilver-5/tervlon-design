import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Icon, icon } from "@/components/icons";
import { PEOPLE, TRACK_COLOR, type PersonKey } from "@/lib/people";
import { DEV } from "@/mocks/dev";
import { mockScenarios } from "@/mocks/scenarios";
import { Spark, MiniRing, BandPill } from "@/features/dev/charts";

export default function HomePage() {
  const d = DEV;
  const cw = d.continueWork;
  const reco = mockScenarios.filter((s) =>
    ["campaign-analytics-sprint", "feature-flags-sprint", "analytics-dashboard-sprint"].includes(s.slug),
  );

  return (
    <section className="page fade">
      <div className="greet">
        <div>
          <span className="label" style={{ color: "var(--blue-d)" }}>Your verified engineering record</span>
          <h1 className="display">Good morning, <em className="serif">{d.name}</em>.</h1>
        </div>
        <div className="greet-r">
          <span className="avl"><span className="dot" style={{ background: "var(--ok)" }} />{d.availability}</span>
          <Link className="btn btn-ghost btn-sm" href="/app/profile">View public profile <Icon path={icon.arrow} size={14} sw={2} /></Link>
        </div>
      </div>

      {/* continue */}
      <div className="continue">
        <div className="continue-in">
          <div className="l">
            <div className="rk"><span className="live-dot" /> Continue where you left off</div>
            <h3>{cw.title}</h3>
            <div className="sub">{cw.track} · {cw.level} · {cw.ticket}</div>
            <div className="cnote">Your team kept moving — Sarah has a standup queued and James is waiting to review.</div>
            <div className="pwrap"><div className="bar"><i style={{ width: `${cw.pct}%` }} /></div><span className="pmeta">{cw.done} of {cw.total} tickets · ~{cw.mins}m left</span></div>
          </div>
          <div className="r">
            <span className="ppl">{cw.team.map((k) => <Avatar key={k} who={k as PersonKey} size={28} />)}</span>
            <Link className="rbtn" href="/sprint/ecommerce-api-sprint">Resume sprint <Icon path={icon.arrow} size={16} sw={2.2} /></Link>
          </div>
        </div>
      </div>

      {/* signal strip */}
      <div className="signal" style={{ marginTop: 26 }}>
        <div className="sg"><div className="k">Sprints completed</div><div className="v tnum">{d.stats.completed}</div><div className="d" style={{ color: "var(--muted)" }}>of {d.stats.attempts} taken</div></div>
        <div className="sg"><div className="k">Verified scorecards</div><div className="v tnum">{d.stats.reports}</div><div className="d" style={{ color: "var(--muted)" }}>2 featured</div></div>
        <div className="sg"><div className="k">Tracks verified</div><div className="v tnum">2</div><div className="d" style={{ color: "var(--muted)" }}>Backend · Frontend</div></div>
        <div className="sg"><div className="k">Integrity</div><div className="v" style={{ fontSize: 22, alignItems: "center", gap: 7 }}><span className="dot" style={{ background: "var(--ok)", width: 8, height: 8 }} />Clear</div><div className="d" style={{ color: "var(--muted)" }}>across 3 sprints</div></div>
      </div>

      {/* skill evidence */}
      <div className="pnl" style={{ marginTop: 24 }}>
        <div className="pnl-h"><div className="t">Skill evidence</div><div className="x">Track record, growing over time — not a ranking</div></div>
        {d.trajectory.map((t) => (
          <div className={`trk ${t.verified ? "" : "empty"}`} key={t.track}>
            <div className="ti">
              <span className="sq" style={{ background: t.verified ? TRACK_COLOR[t.track] : "var(--line-3)" }} />
              <div><div className="tn">{t.track}</div><div className="tl2">{t.verified ? `Verified · ${t.verified} sprint${t.verified > 1 ? "s" : ""}` : "Not started"}</div></div>
            </div>
            <div className="spark"><Spark vals={t.spark} w={240} h={32} /></div>
            <div className="tv">{t.last != null ? <><b>{t.last}</b> <span className="vr">latest</span></> : <span className="lvl-chip" style={{ background: "var(--well)", color: "var(--faint)" }}>—</span>}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: "1.6fr 1fr", marginTop: 24 }}>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Recent sprints</div><Link className="link" href="/app/catalog">Sprint history</Link></div>
          <table className="htab">
            <thead><tr><th>Sprint</th><th>Track</th><th>Date</th><th>Score</th><th>Integrity</th></tr></thead>
            <tbody>
              {d.history.map((h, i) => (
                <tr key={i}>
                  <td><Link href="/app/scorecard" className="ht2">{h.title}</Link></td>
                  <td><span className="track" style={{ fontSize: 11.5 }}><span className="sq" style={{ width: 7, height: 7, background: TRACK_COLOR[h.track] }} />{h.track}</span></td>
                  <td style={{ color: "var(--muted)", fontSize: 12.5 }}>{h.date}</td>
                  <td className="hs">{h.score}</td>
                  <td><BandPill band={h.band} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Featured scorecards</div><div className="x">The credential</div></div>
          {d.featured.map((f, i) => (
            <Link className="cred" href="/app/scorecard" key={i}>
              <MiniRing score={f.score} />
              <div style={{ minWidth: 0 }}><div className="ct">{f.title}</div><div className="cs">{f.track} · {f.date}</div></div>
              <span className="vbadge" title="Verified evidence"><Icon path='<path d="M12 2 4 6v6c0 4 3 7 8 8 5-1 8-4 8-8V6z"/><path d="m9 12 2 2 4-4"/>' size={17} sw={1.9} /></span>
            </Link>
          ))}
          <div style={{ padding: "12px 16px", fontSize: 11, color: "var(--faint)", borderTop: "1px solid var(--line)" }}>Pinned to your public profile — sprint evidence, more trusted than a resume claim.</div>
        </div>
      </div>

      {/* explore next */}
      <div className="sec-head" style={{ marginTop: 44 }}>
        <div className="h2">Explore next</div>
        <Link className="link" href="/app/catalog">All sprints <Icon path={icon.arrow} size={14} sw={2} /></Link>
      </div>
      <div className="grid">
        {reco.map((s) => (
          <Link key={s.slug} href={`/sprint/${s.slug}`} className="sprint">
            <div className="sprint-head">
              <span className="track"><span className="sq" style={{ background: TRACK_COLOR[s.track] }} />{s.track}</span>
              {s.flagship ? <span className="flag-tag">Flagship</span> : <span className="lvl">{[1, 2, 3].map((i) => <i key={i} className={i <= s.level ? "on" : ""} />)}</span>}
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="sprint-foot">
              <span>{s.level === 1 ? "Junior" : "Mid"}</span><span className="sep" /><span>{s.tickets} tickets</span><span className="sep" /><span>~{s.estimatedMinutes}m</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="footer"><span>Tervlon — skill evidence growing over time, never a leaderboard.</span><span>Design preview</span></div>
    </section>
  );
}
