"use client";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { EmailCapture } from "@/features/landing/EmailCapture";
import { useLandingEffects } from "@/features/landing/useLandingEffects";

export default function LandingPage() {
  useLandingEffects();

  return (
    <>
      {/* nav */}
      <nav className="nav" id="nav">
        <div className="wrap">
          <a className="brand" href="#top">
            <Logo size={28} />
            <span className="brand-name">Tervlon</span>
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#tracks">Tracks</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="nav-right">
            <a className="nav-ghost" href="#join">
              Talk to the team
              <svg className="ico" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
            <a className="nav-cta" href="#join">
              Get notified
              <svg className="ico" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M5 12h13M12 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy reveal">
            <span className="eyebrow">
              <span className="d" />
              Coming soon
            </span>
            <h1>
              Not a coding test.
              <br />
              <span className="serif">A day on the team.</span>
            </h1>
            <p className="hero-sub">
              Tervlon drops you into a software team that&apos;s already mid-sprint.
              Real tickets, real code in a real sandbox, a standup with your engineering
              lead — and an evidence-backed scorecard at the end.
            </p>
            <EmailCapture cta="Get early access" />
            <div className="capture-note">
              <svg className="ico" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Be first in. One note when we open — nothing else.
            </div>
          </div>

          <div className="hero-media reveal">
            <div className="shot">
              <div className="shot-bar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="shot-url">tervlon.com/app/sprint</span>
              </div>
              <div className="shot-body">
                <div className="wsm-top">
                  <div className="wsm-title">
                    E-Commerce API Sprint
                    <small>Backend · Mid · T-03 Auth guard</small>
                  </div>
                  <div className="wsm-pres">
                    <span className="av" style={{ background: "var(--sarah)" }}>SC</span>
                    <span className="av" style={{ background: "var(--marcus)" }}>MR</span>
                    <span className="av" style={{ background: "var(--priya)" }}>PR</span>
                    <span className="av" style={{ background: "var(--james)" }}>JM</span>
                  </div>
                </div>
                <div className="wsm-grid">
                  <div className="wsm-board">
                    <div className="wsm-blab">In progress</div>
                    <div className="wsm-tk on">
                      <span className="id">T-03</span>
                      <div className="t">Harden the auth guard</div>
                    </div>
                    <div className="wsm-blab" style={{ marginTop: 13 }}>To do</div>
                    <div className="wsm-tk"><span className="id">T-04</span><div className="t">Rate-limit checkout</div></div>
                    <div className="wsm-tk"><span className="id">T-05</span><div className="t">Idempotent webhooks</div></div>
                  </div>
                  <div className="wsm-code">
                    <div><span className="ln">1</span><span className="k">export interface</span> <span className="ty">AuthRequest</span> <span className="k">extends</span> Request {"{"}</div>
                    <div><span className="ln">2</span>{"  "}userId?: <span className="ty">string</span>;</div>
                    <div><span className="ln">3</span>{"}"}</div>
                    <div><span className="ln">4</span></div>
                    <div><span className="ln">5</span><span className="cm">// reject expired tokens before the handler</span></div>
                    <div><span className="ln">6</span><span className="k">export const</span> <span className="fn">authGuard</span> = (req, res, next) ={">"} {"{"}</div>
                    <div><span className="ln">7</span>{"  "}<span className="k">const</span> token = req.headers.<span className="st">authorization</span>;</div>
                    <div><span className="ln">8</span>{"  "}<span className="k">if</span> (!token) <span className="k">return</span> res.<span className="fn">status</span>(<span className="ty">401</span>);</div>
                  </div>
                </div>
                {/* the standup nudge, the way it actually arrives */}
                <div className="si-dim">
                  <div className="si-card">
                    <div className="si-kick">Standup starting</div>
                    <div className="si-ring">
                      <svg width="72" height="72">
                        <circle cx="36" cy="36" r="32" fill="none" stroke="var(--sarah-line)" strokeWidth="3" />
                        <circle cx="36" cy="36" r="32" fill="none" stroke="var(--sarah)" strokeWidth="3" strokeLinecap="round" strokeDasharray="201" strokeDashoffset="64" />
                      </svg>
                      <span className="av">SC</span>
                    </div>
                    <h3>Sarah wants to sync</h3>
                    <div className="si-host">Sarah Chen · Engineering Lead</div>
                    <div className="si-ctx">
                      On <b>T-03</b> — let&apos;s talk through the auth guard before you go further.
                    </div>
                    <div className="si-actions">
                      <button className="si-join" type="button">Join standup</button>
                      <button className="si-delay" type="button">Need 30s</button>
                    </div>
                    <div className="si-sub">A delay, not a dismissal.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* why */}
      <section className="why">
        <div className="wrap reveal">
          <div className="rule" />
          <blockquote>
            Interviews test how people interview. Take-homes test how people take tests.
          </blockquote>
          <p>
            Neither shows you how someone actually works on a team. Tervlon shows the
            work itself — the tickets they pick up, the calls they make, how they talk
            about it under a little pressure.
          </p>
        </div>
      </section>

      {/* how it works */}
      <section className="band tight" id="how">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it works</span>
            <h2 className="sec-h">
              One sprint, start to <span className="serif">scorecard</span>.
            </h2>
            <p className="sec-lead">
              No setup, no contrived puzzle. You join a team that&apos;s already moving
              and do the work — the platform watches quietly and assembles the evidence.
            </p>
          </div>

          <div className="arc reveal">
            {[
              ["01", "Join mid-sprint", "The board's already moving. You're the new hire on day one.", false],
              ["02", "Pick up a ticket", "Real acceptance criteria, real files, a teammate hint.", false],
              ["03", "Code in a sandbox", "A live environment with hidden tests and curated docs.", false],
              ["04", "Standup with Sarah", "Your lead pulls you in and asks about the work.", true],
              ["05", "Request a review", "James reviews your code and writes it up — narrative first.", false],
              ["06", "Evidence scorecard", "How you actually worked, backed by what you did.", false],
            ].map(([n, t, d, key]) => (
              <div className={`step${key ? " key" : ""}`} key={n as string}>
                <div className="sn">{n}</div>
                <div className="st2">{t}</div>
                <div className="sd">{d}</div>
              </div>
            ))}
          </div>

          <div className="row reveal">
            <div className="row-media">
              <div className="shot">
                <div className="ide-tabs">
                  <div className="ide-tab on"><span className="lang" />auth.guard.ts</div>
                  <div className="ide-tab">retry.ts</div>
                </div>
                <div className="ide-code">
                  <div><span className="cm">// run the hidden suite — pass it to unlock review</span></div>
                  <div><span className="k">export const</span> <span className="fn">verify</span> = (token: <span className="ty">string</span>) ={">"} {"{"}</div>
                  <div>{"  "}<span className="k">const</span> decoded = jwt.<span className="fn">verify</span>(token, <span className="st">SECRET</span>);</div>
                  <div>{"  "}<span className="k">if</span> (decoded.exp {"<"} <span className="fn">now</span>()) <span className="k">throw new</span> <span className="ty">Expired</span>();</div>
                  <div>{"  "}<span className="k">return</span> decoded;</div>
                  <div>{"}"};</div>
                </div>
                <div className="ide-term">
                  <div><span className="g">$</span> <span className="pr">npm test</span></div>
                  <div><span className="g">queued · running hidden suite…</span></div>
                  <div><span className="ok">✓ 4 of 4 signals passing</span> <span className="g">— review unlocked</span></div>
                </div>
              </div>
            </div>
            <div className="row-copy">
              <h3>
                Real code, <span className="serif">real consequences.</span>
              </h3>
              <p>
                You write in an actual sandbox — a migrated database, a running dev
                server, hidden tests behind the acceptance criteria. Run the checks and
                watch them pass before you ask for a review. Nothing is simulated except
                the teammates.
              </p>
              <div className="micro">
                <svg className="ico" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M12 2 4 6v6c0 4 3 7 8 8 5-1 8-4 8-8V6z" />
                </svg>
                Curated references, never the open internet — reading docs is expected
                engineering.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* standup */}
      <section className="band standup-band">
        <div className="wrap">
          <div className="head reveal">
            <span className="sec-eyebrow" style={{ color: "var(--sarah)" }}>
              The headline moment
            </span>
            <h2 className="sec-h">
              The standup is where it <span className="serif">gets real.</span>
            </h2>
            <p className="sec-lead" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Your engineering lead pulls you in, asks about your ticket, and listens.
              People who did the work can talk about it fluidly. People who didn&apos;t,
              can&apos;t — and that&apos;s the signal.
            </p>
          </div>

          <div className="meet shot reveal">
            <div className="meet-head">
              <span className="av">SC</span>
              <div>
                <div className="t">Sarah Chen</div>
                <div className="s">Engineering Lead · Daily standup</div>
              </div>
              <span className="live"><span className="d" />Live · listening</span>
            </div>
            <div className="meet-body">
              <div className="stage">
                <div className="tile spk">
                  <span className="av big" style={{ background: "var(--sarah)" }}>SC</span>
                  <span className="role">Speaking</span>
                  <span className="wave"><i /><i /><i /><i /></span>
                  <span className="nm">Sarah</span>
                </div>
                <div className="tile"><span className="av big" style={{ background: "var(--marcus)" }}>MR</span><span className="nm">Marcus</span></div>
                <div className="tile"><span className="av big" style={{ background: "var(--priya)" }}>PR</span><span className="nm">Priya</span></div>
                <div className="tile"><span className="av big" style={{ background: "var(--blue)" }}>JO</span><span className="nm">You</span></div>
              </div>
              <div className="transcript">
                <div className="tr-h">Transcript</div>
                <div className="tr-body">
                  <div className="tl"><div className="tl-h">Sarah</div><div className="tl-b">Morning — walk me through T-03. What was actually failing on the auth guard?</div></div>
                  <div className="tl you"><div className="tl-h">You</div><div className="tl-b">Expired tokens were slipping through — the guard checked presence but never the exp claim.</div></div>
                  <div className="tl"><div className="tl-h">Sarah</div><div className="tl-b">Good catch. How are you proving it&apos;s fixed?</div></div>
                </div>
                <div className="tr-foot">
                  <div className="qps">
                    <span className="qp">I found the issue</span>
                    <span className="qp">I&apos;m ready to implement</span>
                    <span className="qp">I&apos;m blocked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* scorecard */}
      <section className="band">
        <div className="wrap">
          <div className="row flip">
            <div className="row-media reveal">
              <div className="shot score-shot">
                <div className="sc-hero">
                  <div className="score-ring">
                    <svg width="92" height="92">
                      <circle cx="46" cy="46" r="40" fill="none" stroke="var(--well)" strokeWidth="6" />
                      <circle cx="46" cy="46" r="40" fill="none" stroke="url(#tervlon-lg)" strokeWidth="6" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="48" />
                    </svg>
                    <div className="n"><b className="tnum">81</b><s>Evidence</s></div>
                  </div>
                  <div className="sc-narr">
                    Worked methodically: reproduced the auth bug before touching code,
                    explained the fix clearly in standup, and left the guard
                    better-tested than they found it.
                  </div>
                </div>
                <div className="sc-dims">
                  {[
                    ["Code correctness", 86],
                    ["Communication", 83],
                    ["Team readiness", 79],
                  ].map(([label, val]) => (
                    <div key={label as string}>
                      <div className="dim-h">
                        <span>{label}</span>
                        <span className="sc2">{val}</span>
                      </div>
                      <div className="dim-bar"><i style={{ width: `${val}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="sc-integ">
                  <svg className="ico" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M12 2 4 6v6c0 4 3 7 8 8 5-1 8-4 8-8V6z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>
                    <b>Integrity: clear.</b> Neutral evidence for a human to read — never
                    a verdict.
                  </span>
                </div>
              </div>
            </div>
            <div className="row-copy reveal">
              <span className="sec-eyebrow">The scorecard</span>
              <h3 style={{ marginTop: 14 }}>
                Not a number. <span className="serif">Evidence.</span>
              </h3>
              <p>
                The report leads with how someone worked — a narrative grounded in what
                they actually did, ticket by ticket and moment by moment. The score is
                there, quieter, underneath. A hiring manager reads it and knows how this
                person works on a team.
              </p>
              <div className="micro">
                <svg className="ico" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M12 2 4 6v6c0 4 3 7 8 8 5-1 8-4 8-8V6z" />
                </svg>
                Integrity is framed as trust, never accusation — there is no
                &quot;flagged&quot; state by design.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tracks */}
      <section className="band tight" id="tracks">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Tracks</span>
            <h2 className="sec-h">
              Pick the work that looks like <span className="serif">your job.</span>
            </h2>
            <p className="sec-lead">
              Every track is a real codebase with hidden tests and teammates who speak in
              role. Junior runs 3 tickets and one standup; Mid runs 5 and two.
            </p>
          </div>
          <div className="track-grid reveal">
            {[
              {
                name: "Backend", color: "var(--blue)",
                desc: "Node / TypeScript services — auth, ledgers, webhooks, idempotency. Where most of the hidden-test rigour lives.",
                sprints: [["E-Commerce API", "Mid"], ["Wallet Ledger", "Mid"], ["Campaign Analytics", "Junior"]],
              },
              {
                name: "Frontend", color: "var(--sarah)",
                desc: "React UIs over a live sandbox with a preview — forms, dashboards, the states people skip until they bite.",
                sprints: [["Analytics Dashboard", "Mid"], ["Checkout Form", "Junior"]],
              },
              {
                name: "Full-stack", color: "var(--marcus)",
                desc: "End to end — an API, a typed client, and a rollout that can't take the app down. The whole loop.",
                sprints: [["Feature Flags", "Mid"]],
              },
            ].map((t) => (
              <div className="track-card" key={t.name}>
                <div className="th"><span className="sq" style={{ background: t.color }} />{t.name}</div>
                <h4>{t.name} sprints</h4>
                <p>{t.desc}</p>
                <div className="sprints">
                  {t.sprints.map(([s, lvl]) => (
                    <div className="sp" key={s}>
                      <span className="sq" style={{ width: 6, height: 6, borderRadius: 2, background: t.color }} />
                      {s}
                      <span className="lvl">{lvl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* who it's for */}
      <section className="band tight">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Who it&apos;s for</span>
            <h2 className="sec-h">
              One runtime, three ways to <span className="serif">use it.</span>
            </h2>
          </div>
          <div className="trio reveal">
            <div className="who">
              <div className="wl">Developers</div>
              <h4>Practice that proves itself.</h4>
              <p>
                Run real sprints, then pin the verified scorecards to your profile.
                Evidence of how you work — more trusted than a line on a resume.
              </p>
            </div>
            <div className="who">
              <div className="wl">Hiring teams</div>
              <h4>A real-work signal.</h4>
              <p>
                See how a candidate actually works on a team before you spend interview
                hours — with an evidence timeline and a confidence band a human reads,
                not a black-box score.
              </p>
            </div>
            <div className="who">
              <div className="wl">Institutions</div>
              <h4>Cohort skill verification.</h4>
              <p>
                Verify what a cohort can really do and watch skills grow over time.
                Signals that help teaching — never a leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="band tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The team you&apos;ll meet</span>
            <h2 className="sec-h">
              They speak in <span className="serif">role.</span>
            </h2>
          </div>
          <div className="team reveal">
            {[
              ["SC", "var(--sarah)", "Sarah Chen", "Engineering Lead", "Runs the standups and holds the requirements. The one who pulls you in."],
              ["MR", "var(--marcus)", "Marcus", "Senior Engineer", "Debugs with you and pushes on the things that bite — SQL injection, shared errors."],
              ["PR", "var(--priya)", "Priya", "Peer Engineer", "Brings integration context and warns about the pitfalls she's already hit."],
              ["JM", "var(--james)", "James", "Reviewer", "Appears only at review. Reads your code and writes an honest, narrative critique."],
            ].map(([init, color, name, role, desc]) => (
              <div className="member" key={name as string}>
                <span className="av" style={{ background: color as string }}>{init}</span>
                <div>
                  <div className="mn">{name}</div>
                  <div className="mr">{role}</div>
                </div>
                <div className="md">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="band tight" id="pricing">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Pricing</span>
            <h2 className="sec-h">
              Simple credits. <span className="serif">One per sprint.</span>
            </h2>
            <p className="sec-lead">
              Runtime access is credit-based — a sprint and its scorecard cost one credit.
              Pricing is region-aware and set for you, never a tier you pick.
            </p>
          </div>
          <div className="price-grid reveal">
            {[
              { name: "Pay as you go", blurb: "One sprint + its scorecard", price: "$12", unit: "/ credit", credits: "1 credit" },
              { name: "Starter", blurb: "5 sprints a month", price: "$29", unit: "/ mo", credits: "5 credits / mo" },
              { name: "Pro", blurb: "15 sprints a month", price: "$59", unit: "/ mo", credits: "15 credits / mo", pop: true },
              { name: "Unlimited", blurb: "Run as many as you like", price: "$99", unit: "/ mo", credits: "Unlimited" },
            ].map((p) => (
              <div className={`price-card${p.pop ? " pop" : ""}`} key={p.name}>
                {p.pop && <div className="pop-tag">Most popular</div>}
                <div className="pn">{p.name}</div>
                <div className="pb">{p.blurb}</div>
                <div className="pp"><b>{p.price}</b><span>{p.unit}</span></div>
                <div className="pc">{p.credits}</div>
              </div>
            ))}
          </div>
          <p className="price-note">
            Indicative — final prices land at launch. Get notified and you&apos;ll be first to know.
          </p>
        </div>
      </section>

      {/* final cta */}
      <section className="final" id="join">
        <div className="wrap">
          <div className="final-card reveal">
            <div className="final-in">
              <h2>
                Open soon.
                <br />
                <span className="serif">Be on the team.</span>
              </h2>
              <p>
                We&apos;re putting the finishing touches on the first sprints. Drop your
                email and we&apos;ll send one note the day Tervlon opens.
              </p>
              <EmailCapture cta="Notify me" />
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer>
        <div className="wrap">
          <Logo size={22} />
          <span className="brand-name">Tervlon</span>
          <span className="fnote">A day on a good team, observed.</span>
          <div className="fright">
            <span>Coming 2026</span>
            <Link href="/app/catalog">Preview the app →</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
