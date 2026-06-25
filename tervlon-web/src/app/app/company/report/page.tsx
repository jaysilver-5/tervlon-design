import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { REPORT } from "@/mocks/dev";

/** Company / reviewer scorecard — adds the integrity confidence band + the neutral
 *  evidence timeline a human reads. No "flagged" state, by design. */
export default function CompanyReportPage() {
  const r = REPORT;
  const C = 2 * Math.PI * 50;
  const band = r.integrity.confidence;

  return (
    <section className="page fade" style={{ maxWidth: 1160 }}>
      <div className="crumb">
        <Link className="c-link" href="/app/company">Dashboard</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <Link className="c-link" href="/app/company/review-board">Review board</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{r.meta.candidate}</span>
      </div>

      <div className="meta-strip">
        <div className="mc"><div className="mk">Candidate</div><div className="mv">{r.meta.candidate}</div></div>
        <div className="mc"><div className="mk">Sprint</div><div className="mv">E-Commerce API · Mid</div></div>
        <div className="mc"><div className="mk">Completed</div><div className="mv">{r.meta.when}</div></div>
        <div className="mc"><div className="mk">Duration</div><div className="mv">{r.meta.duration}</div></div>
        <div className="mc"><div className="mk">Attempt</div><div className="mv mono" style={{ fontWeight: 500 }}>{r.meta.attempt}</div></div>
      </div>

      <div className="report-hd" style={{ marginTop: 18 }}>
        <div className="score-ring">
          <svg width="112" height="112" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="56" cy="56" r="50" fill="none" stroke="var(--well)" strokeWidth="8" />
            <circle cx="56" cy="56" r="50" fill="none" stroke="url(#lg)" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - r.score / 100)} />
          </svg>
          <div className="n"><b className="tnum">{r.score}</b><s>Evidence</s></div>
        </div>
        <div style={{ flex: 1 }}>
          <span className="label" style={{ color: "var(--blue-d)" }}>Hiring report · evidence for a human call</span>
          <h1 className="display" style={{ fontSize: 24, margin: "8px 0 10px" }}>How this candidate actually works</h1>
          <p className="lead serif" style={{ fontSize: 16, lineHeight: 1.5, color: "var(--ink-2)" }}>{r.narrative}</p>
        </div>
      </div>

      <div className="rep-grid">
        <div className="panel">
          <div className="ph">Per-moment evidence</div>
          {r.evidence.map((e, i) => (
            <div className="ev-row" key={i}><span className="tag">{e.tag}</span><div className="ex" dangerouslySetInnerHTML={{ __html: e.ex }} /></div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="panel">
            <div className="ph">Weighted dimensions</div>
            {r.dims.map((d) => (
              <div className="dim" key={d.k}>
                <div className="dim-h"><b>{d.k}</b><span className="sc">{d.v}</span></div>
                <div className="dim-bar"><i style={{ width: `${d.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="ph">Integrity confidence — neutral evidence, you draw the conclusion</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 30, fontWeight: 650, letterSpacing: "-.03em" }} className="tnum">{band}</div>
          <div style={{ flex: 1 }}>
            <div className="band">
              <div className="band-track"><div className="mk2" style={{ left: `calc(${band}% - 2px)` }} /></div>
              <div className="band-scale"><span>review recommended</span><span>review suggested</span><span>clear</span></div>
            </div>
          </div>
          <span className="chip chip-ok" style={{ fontSize: 12, padding: "5px 12px" }}>Band: clear</span>
        </div>
        <div className="itl">
          {r.integrity.timeline.map((x, i) => (
            <div className="it" key={i}>
              <div className={`ic2 ${x.kind}`}>
                <Icon path={x.kind === "signal" ? icon.check : '<path d="M12 8v4M12 16h.01"/><circle cx="12" cy="12" r="9"/>'} size={14} sw={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex" }}><div className="itt">{x.t}</div><div className="itw">{x.when}</div></div>
                <div className="itn">{x.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="prov">{r.provenance}</div>
      </div>

      <div className="panel" style={{ marginTop: 20, background: "var(--blue-tint)", borderColor: "var(--blue-line)" }}>
        <div style={{ display: "flex", gap: 11 }}>
          <div style={{ flexShrink: 0 }}><Icon path='<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>' size={20} sw={1.9} style={{ color: "var(--blue-d)" }} /></div>
          <div>
            <div style={{ fontWeight: 560, fontSize: 13, color: "var(--blue-d)", marginBottom: 3 }}>How to read this</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{r.hiringNote} There is no &quot;pass/fail&quot; or &quot;cheater&quot; state by design — the report supports your judgment, it does not replace it.</div>
          </div>
        </div>
      </div>

      <div className="footer"><span>Narrative first · evidence + a neutral band · a human decides.</span><Link className="btn btn-ghost btn-sm" href="/app/company/review-board">Back to review board</Link></div>
    </section>
  );
}
