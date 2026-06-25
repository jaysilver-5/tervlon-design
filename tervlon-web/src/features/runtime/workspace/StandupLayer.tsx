"use client";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { Icon, icon } from "@/components/icons";
import { PEOPLE, type PersonKey } from "@/lib/people";
import { STANDUP_SCRIPT, QUICK_PROMPTS, TICKET } from "@/mocks/workspace";

type Turn = { who: PersonKey; t: string };

/**
 * The standup — the one interrupting moment. Incoming ring → meeting (workspace
 * preserved behind) → turns → wrap. Minimisable; the meeting "keeps going".
 * In live mode this is driven by STANDUP_INCOMING + the standup contract/actions.
 */
export function StandupLayer({
  phase,
  onJoin,
  onClose,
}: {
  phase: "incoming" | "meeting";
  onJoin: () => void;
  onClose: () => void;
}) {
  const [count, setCount] = useState(8);
  const [lines, setLines] = useState<Turn[]>([STANDUP_SCRIPT[0]]);
  const [turn, setTurn] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const done = turn >= STANDUP_SCRIPT.length - 1;

  useEffect(() => {
    if (phase !== "incoming") return;
    if (count <= 0) {
      onJoin();
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, count, onJoin]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function reply(text: string) {
    if (!text.trim() || done) return;
    const next = turn + 1;
    const additions: Turn[] = [{ who: "you", t: text }];
    if (next < STANDUP_SCRIPT.length) additions.push(STANDUP_SCRIPT[next]);
    setLines((l) => [...l, ...additions]);
    setTurn(next);
    setDraft("");
  }

  if (phase === "incoming") {
    const C = 2 * Math.PI * 16;
    return (
      <div className="standup-incoming">
        <div className="nudge">
          <div className="nudge-h">
            <Avatar who="sarah" size={34} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="nk">Standup · the one interruption</div>
              <div className="nh"><b>Sarah Chen</b> is pulling you into a sync</div>
            </div>
          </div>
          <div className="nudge-q">“Quick check-in with the team before {TICKET.id} — walk me through the auth guard.”</div>
          <div className="nudge-actions">
            <button className="nudge-join" onClick={onJoin}>Join now</button>
            <button className="nudge-delay" onClick={onClose}>Need 30s</button>
            <div className="nudge-ring">
              <svg width="38" height="38">
                <circle cx="19" cy="19" r="16" fill="none" stroke="var(--warn-tint)" strokeWidth="3" />
                <circle cx="19" cy="19" r="16" fill="none" stroke="#eca31c" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - count / 8)} style={{ transition: "stroke-dashoffset 1s linear" }} />
              </svg>
              <b>{count}</b>
            </div>
          </div>
          <div className="nudge-sub">A delay, not a dismissal · auto-joins at 0</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`meet-layer${minimized ? " minimized" : ""}`}>
      <div className="meet-modal">
        <div className="meet-head">
          <div className="mh-av"><Avatar who="sarah" size={36} /><span className="breath" /></div>
          <div className="mh-id"><div className="t">Daily Standup</div><div className="s">Sarah Chen · Engineering Lead</div></div>
          <span className="chip chip-violet">Comprehension check · {TICKET.id}</span>
          <div style={{ flex: 1 }} />
          <div className="mh-live"><span className="dot" style={{ background: "var(--ok)" }} /> she&apos;s listening</div>
          <button className="mh-ctrl" title="Minimize — the standup keeps going" onClick={() => setMinimized(true)}>
            <Icon path={icon.minus} size={16} sw={2.2} />
          </button>
        </div>
        <div className="meet-content">
          <div className="stage">
            {(["sarah", "marcus", "priya", "you"] as PersonKey[]).map((k) => {
              const spk = !done && lines[lines.length - 1]?.who === k;
              const you = k === "you";
              return (
                <div className={`tile${spk ? " spk" : ""}`} key={k}>
                  <Avatar who={k} size={64} className="big-av" />
                  <div className="wave">{[6, 11, 5, 9, 7].map((h, i) => <i key={i} style={{ height: h, animationDelay: `${i * 0.1}s` }} />)}</div>
                  <div className="nm">{you ? "You" : PEOPLE[k].name.split(" ")[0]}</div>
                  <div className="role">{you ? "Your turn" : "Speaking"}</div>
                </div>
              );
            })}
          </div>
          <div className="transcript">
            <div className="tr-h"><span className="dot" style={{ background: "var(--ok)" }} /> Live transcript · she has your checks + the auth guard in context</div>
            <div className="tr-body" ref={bodyRef}>
              {lines.map((m, i) => {
                const you = m.who === "you";
                return (
                  <div className={`tl${you ? " you" : ""}`} key={i}>
                    <div className="tl-h" style={{ color: you ? "var(--blue)" : PEOPLE[m.who].c }}>
                      {you ? "You" : PEOPLE[m.who].name.split(" ")[0]}
                    </div>
                    <div className="tl-b" dangerouslySetInnerHTML={{ __html: m.t }} />
                  </div>
                );
              })}
            </div>
            <div className="tr-foot">
              {done ? (
                <button className="btn btn-violet" style={{ width: "100%" }} onClick={onClose}>
                  <Icon path={icon.check} size={15} sw={2} /> Continue to workspace
                </button>
              ) : (
                <>
                  <div className="qps">
                    {QUICK_PROMPTS.map((q) => (
                      <button className="qp" key={q} onClick={() => reply(q)}>{q}</button>
                    ))}
                  </div>
                  <div className="tr-input">
                    <input
                      placeholder="Walk Sarah through your work…"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && reply(draft)}
                      autoFocus
                    />
                    <button className="btn btn-violet" onClick={() => reply(draft)}>
                      <Icon path={icon.send} size={15} sw={2} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="meet-pill" onClick={() => setMinimized(false)} title="Expand standup">
        <div className="mh-av"><Avatar who="sarah" size={32} /></div>
        <div className="mp-wave">{[6, 11, 5, 9, 7].map((h, i) => <i key={i} style={{ height: h, animationDelay: `${i * 0.1}s` }} />)}</div>
        <div className="mp-txt"><div className="mp-t">Standup in progress</div><div className="mp-s">Sarah is speaking…</div></div>
        <span className="mp-exp"><Icon path={icon.expand} size={15} sw={2} /></span>
      </div>
    </div>
  );
}
