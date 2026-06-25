"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Icon, icon } from "@/components/icons";
import { PERSONAS, PERSONA_ORDER, type Persona } from "@/lib/personas";

const ROLE_ICON: Record<Persona, keyof typeof icon> = { developer: "dev", company: "bldg", institution: "cap" };
const ROLE_SUB: Record<Persona, string> = {
  developer: "Practice & get verified",
  company: "Assess & hire candidates",
  institution: "Verify cohort skills",
};

/**
 * The front door — sign in / create account. The role chooser IS the onboarding:
 * role is set here (account-level), then drives which app a user lands in. In live
 * mode this calls /auth/login|register and reads user.role for routing.
 */
export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"in" | "up">("in");
  const [role, setRole] = useState<Persona>("developer");

  function go() {
    // design preview: no real auth — route to the chosen role's home
    router.push(PERSONAS[role].home);
  }

  return (
    <div className="auth fade">
      <div className="auth-brand">
        <div className="auth-logo"><Logo size={30} /><span style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-.03em", color: "#fff" }}>Tervlon</span></div>
        <div className="auth-pitch">
          <h2 className="serif">A day on a good team,<br />observed — not a quiz.</h2>
          <p>Join a software team mid-sprint, write real code in a real sandbox, get pulled into a standup, and walk away with an evidence-backed scorecard.</p>
          <div style={{ marginTop: 24 }}>
            {["Real tickets, hidden-test graded", "An AI lead who probes your understanding", "A verified credential, not a take-home"].map((t) => (
              <div className="auth-b" key={t}><Icon path={icon.check} size={14} sw={2.6} style={{ color: "#fff" }} /><span>{t}</span></div>
            ))}
          </div>
        </div>
        <div className="auth-foot">Trusted signal for developers, companies &amp; institutions.</div>
      </div>

      <div className="auth-pane">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={`at${tab === "in" ? " on" : ""}`} onClick={() => setTab("in")}>Sign in</button>
            <button className={`at${tab === "up" ? " on" : ""}`} onClick={() => setTab("up")}>Create account</button>
          </div>

          <label className="fld-l">{tab === "up" ? "I'm joining as" : "Continue as"}</label>
          <div className="auth-role">
            {PERSONA_ORDER.map((id) => (
              <div key={id} className={`role-opt${role === id ? " on" : ""}`} onClick={() => setRole(id)}>
                <Icon path={icon[ROLE_ICON[id]]} size={16} sw={1.9} />
                <div><div className="ro-t">{PERSONAS[id].label}</div><div className="ro-s">{ROLE_SUB[id]}</div></div>
              </div>
            ))}
          </div>

          <label className="fld-l">Work email</label>
          <input className="fld" placeholder="you@email.com" />
          <label className="fld-l" style={{ marginTop: 13 }}>Password</label>
          <input className="fld" type="password" placeholder="••••••••" />

          <button className="btn btn-pri" onClick={go} style={{ width: "100%", marginTop: 18, padding: 11 }}>
            {tab === "up" ? "Create account" : "Continue"} <Icon path={icon.arrow} size={15} sw={2.1} />
          </button>
          <div className="auth-or"><span>or</span></div>
          <button className="btn btn-ghost" onClick={go} style={{ width: "100%" }}>Continue with Google</button>
          <div className="auth-note">JWT access + refresh; this is a design preview — no real auth. Your role determines which app you land in.</div>
        </div>
      </div>
    </div>
  );
}
