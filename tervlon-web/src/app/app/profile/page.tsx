import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Icon, icon } from "@/components/icons";
import { TRACK_COLOR } from "@/lib/people";
import { DEV } from "@/mocks/dev";
import { MiniRing } from "@/features/dev/charts";

/** The credential — verified skills + featured scorecards, what an employer sees. */
export default function ProfilePage() {
  const d = DEV;
  return (
    <section className="page fade" style={{ maxWidth: 1080 }}>
      <div className="crumb">
        <Link className="c-link" href="/app">Home</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>Profile</span>
      </div>

      <div className="prof-hero">
        <div className="prof-av">
          <Avatar who="you" size={76} />
          <span className="prof-vbadge" title="Verified by Tervlon"><Icon path='<path d="M12 2 4 6v6c0 4 3 7 8 8 5-1 8-4 8-8V6z"/><path d="m9 12 2 2 4-4"/>' size={16} sw={2} /></span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="display" style={{ fontSize: 27 }}>{d.fullName}</h1>
          <div className="prof-headline">{d.headline}</div>
          <div className="prof-meta">
            <span className="avl"><span className="dot" style={{ background: "var(--ok)" }} />{d.availability}</span>
            <span><Icon path='<path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>' size={14} sw={1.9} style={{ color: "var(--muted)" }} /> {d.location}</span>
          </div>
        </div>
        <div className="prof-actions">
          <span className="vis-toggle" title="Profile visibility"><Icon path='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/>' size={14} sw={1.9} /> {d.visibility}</span>
          <button className="btn btn-pri btn-sm"><Icon path='<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/>' size={14} sw={2} /> Share profile</button>
        </div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: "1.4fr 1fr", marginTop: 26 }}>
        <div className="pnl">
          <div className="pnl-h"><div className="t">Verified skills</div><div className="x">Evidence from real sprints, not self-reported</div></div>
          <div style={{ padding: "6px 4px" }}>
            {d.trajectory.map((t) => (
              <div className={`sk-row ${t.verified ? "" : "empty"}`} key={t.track}>
                <span className="sq" style={{ background: t.verified ? TRACK_COLOR[t.track] : "var(--line-3)" }} />
                <div className="sk-n">
                  <div className="t">{t.track}</div>
                  <div className="s">{t.verified ? `Verified · ${t.verified} sprint${t.verified > 1 ? "s" : ""} · best ${t.last}` : "Not started"}</div>
                </div>
                {t.verified ? <span className="lvl-chip">{t.level}</span> : <span className="sk-none">—</span>}
              </div>
            ))}
          </div>
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
          <div style={{ padding: "12px 16px", fontSize: 11, color: "var(--faint)", borderTop: "1px solid var(--line)" }}>This is what an employer opening your profile sees — verified evidence, not editable claims.</div>
        </div>
      </div>
      <div className="footer"><span>The profile is the credential — sprint evidence, more trusted than a resume.</span><span>Public · tervlon.dev/joshua</span></div>
    </section>
  );
}
