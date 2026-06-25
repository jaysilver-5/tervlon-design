"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Logo } from "@/components/Logo";
import { Icon, icon } from "@/components/icons";
import { PEOPLE } from "@/lib/people";
import {
  TICKET, REFS, CHAT, ACTIVITY, CODE,
  type Tier,
} from "@/mocks/workspace";
import { highlightLine } from "./highlight";
import { StandupLayer } from "./StandupLayer";
import { ReviewModal } from "./ReviewModal";

type Dock = "board" | "team" | "ref" | "act";
type Term = "terminal" | "problems" | "output";
type Checks = "idle" | "running" | "passed";
type Standup = "none" | "incoming" | "meeting";

export function Workspace({ sessionId }: { sessionId: string }) {
  const [dock, setDock] = useState<Dock>("board");
  const [term, setTerm] = useState<Term>("terminal");
  const [checks, setChecks] = useState<Checks>("idle");
  const [reviewReq, setReviewReq] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [standup, setStandup] = useState<Standup>("none");
  const [reportReady, setReportReady] = useState(false);
  const [toast, setToast] = useState(false);
  const [nudge, setNudge] = useState(30);
  const fired = useRef(false);

  // Run checks → queued/running → result over the (mock) stream → review unlocks.
  function runChecks() {
    if (checks === "running") return;
    setChecks("running");
    setTerm("problems");
    setTimeout(() => {
      setChecks("passed");
      setReviewReq(true);
    }, 1600);
  }

  // Demo nudge: the director decides this in the real app (e.g. ticket.reviewed).
  useEffect(() => {
    if (standup !== "none" || fired.current) return;
    if (nudge <= 0) {
      fired.current = true;
      setStandup("incoming");
      return;
    }
    const id = setTimeout(() => setNudge((n) => n - 1), 1000);
    return () => clearTimeout(id);
  }, [nudge, standup]);

  // Active-tier pairing toast (the only thing louder than ambient, bar the standup).
  useEffect(() => {
    const id = setTimeout(() => setToast(true), 1600);
    return () => clearTimeout(id);
  }, []);

  const critDone = TICKET.criteria.filter((c) => c.done).length;

  return (
    <div className="ws fade">
      {/* top bar */}
      <div className="ws-top">
        <Link className="ws-home" href="/"><span className="mark"><Logo size={24} /></span></Link>
        <div className="ws-id"><div className="t">E-Commerce API Sprint</div><div className="s">Backend · Mid · Day 2</div></div>
        <span className="chip chip-line"><span className="dot" style={{ background: "var(--blue)" }} />Node / TypeScript</span>
        <div style={{ flex: 1 }} />
        <div className="presence">
          <Avatar who="sarah" size={27} /><Avatar who="marcus" size={27} /><Avatar who="priya" size={27} />
          <Avatar who="james" size={27} off />
        </div>
        <span className="chip chip-line" title="Files autosave to the server (writeFile) — no manual save">
          <span className="dot" style={{ background: "var(--ok)" }} />Saved · v4
        </span>
        <button
          className="btn btn-pri" disabled={!reportReady}
          title={reportReady ? "Generate your evidence-backed report" : "Unlocks when tickets pass review and you've completed a standup"}
        >
          <Icon path={icon.file} size={15} sw={2} /> Generate report
        </button>
      </div>

      {/* three columns */}
      <div className="ws-main">
        {/* TASK */}
        <div className="col col-task">
          <div className="pane-h">Your task</div>
          <div className="task">
            <div className="task-id">
              <span className="mono">{TICKET.id}</span>
              <span className="chip chip-blue">Active</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>~{TICKET.estimate}m</span>
            </div>
            <h2>{TICKET.title}</h2>
            <div className="brief" dangerouslySetInnerHTML={{ __html: TICKET.brief }} />
            <div className="task-sec">
              <div className="lab">Definition of done <span className="n">{critDone}/{TICKET.criteria.length}</span></div>
              <div>
                {TICKET.criteria.map((c, i) => {
                  const done = c.done || (checks === "passed" && i < 3);
                  return (
                    <div className={`crit ${done ? "done" : "todo"}`} key={i}>
                      <span className="tick">{done && <Icon path={icon.check} size={9} sw={3} />}</span>
                      {c.t}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="task-sec">
              <div className="lab">Files to touch</div>
              {TICKET.files.map((f) => (
                <div className="file-pill" key={f}>
                  <Icon path={icon.file} size={14} sw={1.9} /><span className="mono">{f}</span>
                  <span className="edit-dot" title="unsaved edits" />
                </div>
              ))}
            </div>
            <div className="task-sec">
              <div className="lab">From the team</div>
              <div className="hint">
                <Avatar who={TICKET.hint.who} size={26} />
                <div className="ht">
                  <span className="nm">{PEOPLE[TICKET.hint.who].name.split(" ")[0]}</span> ·{" "}
                  <span dangerouslySetInnerHTML={{ __html: TICKET.hint.text }} />
                </div>
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button className="btn btn-ghost" onClick={runChecks}>
              <Icon path={icon.play} size={15} sw={2} /> Run checks
            </button>
            <button
              className="btn btn-blue" disabled={!reviewReq}
              title={reviewReq ? "Request James to review T-03" : "Run and pass checks before requesting review"}
              onClick={() => setReviewOpen(true)}
            >
              <Icon path={icon.check} size={15} sw={2} /> Request review
            </button>
          </div>
        </div>

        {/* CENTER: editor + terminal */}
        <div className="col col-center">
          <div className="editor-wrap">
            <div className="tabbar">
              <div className="ftab on"><span className="lang" />auth.guard.ts<span className="x">×</span></div>
              <div className="ftab"><span className="lang" style={{ background: "var(--marcus)" }} />products.ts</div>
              <div className="ftab"><span className="lang" style={{ background: "var(--warn)" }} />auth.ts</div>
            </div>
            <div className="editor">
              <div className="tree">
                <div className="tnode dir"><Icon path={icon.chevron} size={14} sw={1.9} />src</div>
                <div className="tnode dir" style={{ paddingLeft: 22 }}><Icon path={icon.chevron} size={14} sw={1.9} />middleware</div>
                <div className="tnode on" style={{ paddingLeft: 38 }}><Icon path={icon.file} size={14} sw={1.9} />auth.guard.ts</div>
                <div className="tnode dir" style={{ paddingLeft: 22 }}><Icon path={icon.chevron} size={14} sw={1.9} />routes</div>
                <div className="tnode" style={{ paddingLeft: 38 }}><Icon path={icon.file} size={14} sw={1.9} />products.ts</div>
                <div className="tnode" style={{ paddingLeft: 38 }}><Icon path={icon.file} size={14} sw={1.9} />auth.ts</div>
                <div className="tnode" style={{ paddingLeft: 22 }}><Icon path={icon.file} size={14} sw={1.9} />index.ts</div>
              </div>
              <div className="code">
                {CODE.map((parts, i) => (
                  <div className="line" key={i}>
                    <span className="ln">{i + 1}</span>
                    <span className="cl">{highlightLine(parts)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Terminal term={term} setTerm={setTerm} checks={checks} />
        </div>

        {/* DOCK */}
        <div className="col col-dock">
          <div className="dock-tabs">
            <DockTab id="board" ic="grid" label="Board" cur={dock} set={setDock} />
            <DockTab id="team" ic="chat" label="Team" cur={dock} set={setDock} badge="2" />
            <DockTab id="ref" ic="book" label="Refs" cur={dock} set={setDock} />
            <DockTab id="act" ic="pulse" label="Activity" cur={dock} set={setDock} />
          </div>
          <div className="dock-body">
            {dock === "board" && <DockBoard />}
            {dock === "team" && <DockTeam />}
            {dock === "ref" && <DockRef />}
            {dock === "act" && <DockActivity />}
          </div>
        </div>
      </div>

      {/* status bar */}
      <footer className="statusbar">
        <span className="sb-item"><span className="sb-led" />Live · SSE connected</span>
        <span className="sb-item mono" style={{ color: "var(--faint)" }}>{sessionId}</span>
        <span className="sb-item">workspace</span>
        <div style={{ flex: 1 }} />
        {standup === "none" && (
          <span className="sb-item" style={{ color: "var(--sarah)" }}>
            <Icon path={icon.mic} size={12} sw={2} /> standup nudge in 0:{String(Math.max(0, nudge)).padStart(2, "0")}
          </span>
        )}
        <span className="sb-item">Sandbox warm · Postgres migrated</span>
        <span className="sb-item">TypeScript</span>
      </footer>

      {/* overlays */}
      {standup !== "none" && (
        <StandupLayer
          phase={standup === "incoming" ? "incoming" : "meeting"}
          onJoin={() => setStandup("meeting")}
          onClose={() => { setStandup("none"); setReportReady(true); }}
        />
      )}
      {reviewOpen && <ReviewModal onClose={() => setReviewOpen(false)} />}

      {toast && standup === "none" && (
        <div className="toasts">
          <div className="toast">
            <div className="th"><Avatar who="marcus" size={22} /><span className="nm">Marcus · Senior</span><span className="tier">Active</span></div>
            <p>Want to pair on the expired-token branch? You keep the keyboard.</p>
            <div className="ta">
              <button className="btn btn-blue btn-sm" onClick={() => setToast(false)}>Accept</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setToast(false)}>Not now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DockTab({ id, ic, label, cur, set, badge }: {
  id: Dock; ic: keyof typeof icon; label: string; cur: Dock; set: (d: Dock) => void; badge?: string;
}) {
  return (
    <button className={`dock-tab${cur === id ? " on" : ""}`} onClick={() => set(id)}>
      <Icon path={icon[ic]} size={15} sw={1.9} />{label}
      {badge && <span className="badge">{badge}</span>}
    </button>
  );
}

function Terminal({ term, setTerm, checks }: { term: Term; setTerm: (t: Term) => void; checks: Checks }) {
  return (
    <div className="terminal">
      <div className="term-h">
        <div className={`term-tab${term === "terminal" ? " on" : ""}`} onClick={() => setTerm("terminal")}>Terminal</div>
        <div className={`term-tab${term === "problems" ? " on" : ""}`} onClick={() => setTerm("problems")}>
          Problems
          <span className="ct" style={{ background: checks === "passed" ? "var(--ok)" : "var(--warn)" }}>{checks === "passed" ? 0 : 2}</span>
        </div>
        <div className={`term-tab${term === "output" ? " on" : ""}`} onClick={() => setTerm("output")}>Output</div>
        <div className="term-tools"><div className="tt" title="Clear"><Icon path={icon.trash} size={14} sw={2} /></div></div>
      </div>
      <div className="term-body">
        {term === "problems" ? <ChecksPanel checks={checks} />
          : term === "output" ? <OutputPanel />
            : <ShellPanel />}
      </div>
    </div>
  );
}

function ShellPanel() {
  return (
    <>
      <div className="row"><span className="tg">Tervlon sandbox · node-backend · Postgres migrated. Type </span><span className="tu">help</span><span className="tg"> for commands.</span></div>
      <div className="row"><span className="pr">dev@tervlon:~/project$</span> npm test</div>
      <div className="row"><span className="tg">&gt; jest --runInBand __tervlon_tests__</span></div>
      <div className="row"><span className="tok">PASS</span> header-missing returns 401</div>
      <div className="row"><span className="tok">PASS</span> valid token attaches userId</div>
      <div className="row"><span className="te">FAIL</span> expired token returns distinct code <span className="tg">— got 401 INVALID_TOKEN, expected TOKEN_EXPIRED</span></div>
      <div className="row"><span className="tg">Tests: 2 passed, 2 failed, 4 total · hidden test bodies stay hidden.</span></div>
      <div className="term-input"><span className="pr">dev@tervlon:~/project$</span><input autoComplete="off" spellCheck={false} /></div>
    </>
  );
}

function OutputPanel() {
  return (
    <div className="term-body" style={{ padding: 0 }}>
      <div className="row"><span className="tg">[dev server]</span> waiting — backend sprint has no preview. Run <span className="tu">npm run dev</span> to boot the API on :3000.</div>
    </div>
  );
}

function ChecksPanel({ checks }: { checks: Checks }) {
  const passed = checks === "passed";
  const sigs: [string, string, string][] = passed
    ? [["pass", "header-missing → 401", "clean short-circuit"], ["pass", "valid token attaches userId", ""], ["pass", "tampered token → 401 INVALID_TOKEN", ""], ["pass", "expired token → 401 TOKEN_EXPIRED", "distinct branch ✓"]]
    : [["pass", "header-missing → 401", "clean short-circuit"], ["pass", "valid token attaches userId", ""], ["fail", "expired token → distinct code", "got INVALID_TOKEN, expected TOKEN_EXPIRED"], ["fail", "guard reused across routers", "not yet attached in products.ts"]];
  return (
    <div className="checks">
      {checks === "running" && (
        <div className="check-running"><span className="spinner" /> Running hidden checks… queued on the isolated runner.</div>
      )}
      {sigs.map(([st, t, h], i) => (
        <div className={`sig ${st}`} key={i}>
          <span className="si">{st === "pass" ? <Icon path={icon.check} size={9} sw={3} /> : "!"}</span>
          <div><div className="st2">{t}</div>{h && <div className="sh">{h}</div>}</div>
        </div>
      ))}
      <div className="note">Hidden-test backed — you see pass/fail signals and hints, never the test file. Checks run async: the result arrives over the live stream.</div>
    </div>
  );
}

function DockBoard() {
  const Tk = ({ id, title, owner, cls, chip }: { id: string; title: string; owner?: React.ReactNode; cls?: string; chip?: React.ReactNode }) => (
    <div className={`tk ${cls || ""}`}>
      <div className="tk-top"><span className="tk-id">{id}</span>{chip}</div>
      <div className="tk-title">{title}</div>
      {owner && <div className="tk-owner">{owner}</div>}
    </div>
  );
  return (
    <div className="board">
      <div className="board-group">
        <div className="bg-h"><span className="status-led" style={{ background: "var(--blue)" }} />In progress <span className="n">1</span></div>
        <Tk id="T-03" title="Build reusable JWT bearer auth middleware" cls="active"
          owner={<><Avatar who="you" size={17} />You · 2 criteria left</>}
          chip={<span className="chip chip-blue" style={{ marginLeft: "auto" }}>Active</span>} />
      </div>
      <div className="board-group">
        <div className="bg-h"><span className="status-led" style={{ background: "var(--line-3)" }} />To do <span className="n">2</span></div>
        <Tk id="T-04" title="Protect order routes with the guard" owner={<><Avatar who="priya" size={17} />Priya wires the model first</>} />
        <Tk id="T-05" title="Soft-delete filtering on product reads" owner="Unassigned" />
      </div>
      <div className="board-group">
        <div className="bg-h"><span className="status-led" style={{ background: "var(--sarah)" }} />In review <span className="n">0</span></div>
        <div style={{ fontSize: 11.5, color: "var(--faint)", padding: "2px 2px 4px" }}>James reviews here once checks pass.</div>
      </div>
      <div className="board-group">
        <div className="bg-h"><span className="status-led" style={{ background: "var(--ok)" }} />Done <span className="n">2</span></div>
        <Tk id="T-01" title="Login route issues a signed JWT" cls="done" chip={<span className="chip chip-ok" style={{ marginLeft: "auto" }}>Passed</span>} />
        <Tk id="T-02" title="Token payload carries userId + role" cls="done" chip={<span className="chip chip-ok" style={{ marginLeft: "auto" }}>Passed</span>} />
      </div>
    </div>
  );
}

function DockTeam() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="chan" style={{ flex: 1 }}>
        {CHAT.map((x, i) => (
          <div className="msg" key={i}>
            <Avatar who={x.who} size={26} />
            <div className="msg-b">
              <div className="msg-h"><span className="nm" style={{ color: PEOPLE[x.who].c }}>{PEOPLE[x.who].name.split(" ")[0]}</span><span className="ti">{x.ti}</span></div>
              <div className="msg-t" dangerouslySetInnerHTML={{ __html: x.t }} />
            </div>
          </div>
        ))}
        <div className="msg">
          <Avatar who="priya" size={26} />
          <div className="msg-b">
            <div className="msg-h"><span className="nm" style={{ color: PEOPLE.priya.c }}>Priya</span></div>
            <div className="typing"><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="composer"><div className="box"><input placeholder="Message the team…  (type @ to mention)" autoComplete="off" /></div></div>
    </div>
  );
}

function DockRef() {
  return (
    <div className="ref">
      <div className="ref-search"><Icon path={icon.search} size={14} sw={2} /> Search references for {TICKET.id}…</div>
      {REFS.map((r, i) => (
        <div className={`ref-card ${r.tagged ? "tagged" : ""}`} key={i}>
          <span className="ref-kind">{r.kind}</span>
          <div className="ref-t">{r.t}</div>
          <div className="ref-s">{r.s}</div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 12, textAlign: "center" }}>Consulted 4 references · reading docs is expected engineering</div>
    </div>
  );
}

function DockActivity() {
  const dotColor: Record<Tier, string> = { ambient: "var(--line-3)", info: "var(--blue)", active: "var(--warn)" };
  return (
    <>
      <div className="activity">
        {ACTIVITY.map((x, i) => (
          <div className={`ev ${x.tier}`} key={i}>
            <div className="erail"><div className="ed" style={{ background: dotColor[x.tier] }} /><div className="eln" /></div>
            <div className="et">{x.who && <span className="who">{x.who}</span>} <span dangerouslySetInnerHTML={{ __html: x.t }} /> <span className="time">· {x.time}</span></div>
          </div>
        ))}
      </div>
      <div className="tier-key">
        <span><span className="dot" style={{ background: "var(--line-3)" }} />ambient</span>
        <span><span className="dot" style={{ background: "var(--blue)" }} />info</span>
        <span><span className="dot" style={{ background: "var(--warn)" }} />active</span>
        <span><span className="dot" style={{ background: "var(--sarah)" }} />standup interrupts</span>
      </div>
    </>
  );
}
