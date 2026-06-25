import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { REPORT } from "@/mocks/dev";
import { Radar } from "@/features/dev/charts";

/** Candidate scorecard — narrative first, the number quieter. (Company/reviewer
 *  view with the evidence timeline ships with the company surface.) */
export default function ScorecardPage() {
  const r = REPORT;
  const C = 2 * Math.PI * 50;
  const first = r.meta.candidate.split(" ")[0];

  return (
    <section className="page fade" style={{ maxWidth: 1160 }}>
      <div className="crumb">
        <Link className="c-link" href="/app">Home</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>E-Commerce API Sprint</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn btn-ghost btn-sm"><Icon path='<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>' size={14} sw={2} /> Export PDF</button>
        </div>
      </div>

      <div className="meta-strip rep-meta">
        <div className="mc"><div className="mk">Candidate</div><div className="mv">{r.meta.candidate}</div></div>
        <div className="mc"><div className="mk">Sprint</div><div className="mv">{r.scenario} · {r.level}</div></div>
        <div className="mc"><div className="mk">Track</div><div className="mv">{r.track}</div></div>
        <div className="mc"><div className="mk">Duration</div><div className="mv">{r.duration}</div></div>
        <div className="mc"><div className="mk">Status</div><div className="mv"><span className="chip chip-ok">{r.status}</span></div></div>
      </div>

      <div className="report-hero">
        <div className="score-ring">
          <svg width="112" height="112" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="56" cy="56" r="50" fill="none" stroke="var(--well)" strokeWidth="8" />
            <circle cx="56" cy="56" r="50" fill="none" stroke="url(#lgr)" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - r.score / 100)} />
            <defs>
              <linearGradient id="lgr" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#56c6eb" />
                <stop offset="100%" stopColor="#155fa0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="n"><b className="tnum">{r.score}</b><s>Evidence</s></div>
        </div>
        <div className="rh-narr">
          <span className="label" style={{ color: "var(--blue-d)" }}>Evidence-backed scorecard</span>
          <h1 className="display" style={{ fontSize: 26, margin: "8px 0 12px" }}>How {first} actually worked</h1>
          <p className="serif rh-lead">{r.narrative}</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 26 }}>
        <div className="pnl-h"><div className="t">Weighted dimensions</div><div className="x">Final score is the weighted sum — code 30 · impl 25 · comms 20 · team 15 · integrity 10</div></div>
        <div className="dimgrid">
          <div className="radar"><Radar dims={r.dims} /></div>
          <div className="dimlist">
            {r.dims.map((d) => (
              <div className="dimx" key={d.k}>
                <div className="dimx-h"><span className="dn">{d.k}</span><span className="dw">{d.w}% weight</span><span className="ds tnum">{d.v}</span></div>
                <div className="dim-bar"><i style={{ width: `${d.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rep2">
        <div className="panel">
          <div className="pnl-h"><div className="t">Evidence by moment</div><div className="x">Each score traces to what happened</div></div>
          <div style={{ padding: "4px 20px 14px" }}>
            {r.evidence.map((e, i) => (
              <div className="ev-row" key={i}><span className="tag">{e.tag}</span><div className="ex" dangerouslySetInnerHTML={{ __html: e.ex }} /></div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="pnl-h"><div className="t">What to work on next</div></div>
          <div style={{ padding: "6px 20px 16px" }}>
            {r.recommendations.map((rec, i) => (
              <div className="rec" key={i}><span className="ri"><Icon path={icon.arrow} size={13} sw={2.4} /></span><div>{rec}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel rep-integ">
        <div className="integ-badge"><Icon path='<path d="M12 4 4 8v5c0 4 3.2 6.5 8 8 4.8-1.5 8-4 8-8V8z"/>' size={20} sw={1.9} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Integrity · Clear</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>Verified — nothing to flag. On your side this is reassurance; the neutral evidence timeline is shown to reviewers only, never as an accusation.</div>
        </div>
        <div className="tnum" style={{ fontSize: 27, fontWeight: 650, color: "var(--ok)" }}>{r.integrity.confidence}</div>
      </div>

      <div className="rep-caveat">This scorecard supports a hiring decision; it does not replace one. Read the moments, not just the number — there is no “pass / fail” here, by design.</div>

      <div className="footer">
        <span>Narrative first · the number is present, never the headline.</span>
        <Link className="btn btn-ghost btn-sm" href="/sprint/ecommerce-api-sprint">Back to workspace</Link>
      </div>
    </section>
  );
}
