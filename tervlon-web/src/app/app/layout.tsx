"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { SvgDefs } from "@/components/SvgDefs";
import { Icon, icon } from "@/components/icons";
import { PERSONAS, PERSONA_ORDER, personaFromPath } from "@/lib/personas";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [acctOpen, setAcctOpen] = useState(false);

  // Role is account-level. The rail shows ONE persona's nav, derived from where
  // you are; the account menu switches it (in live, this comes from /auth/me).
  const persona = personaFromPath(pathname);
  const P = PERSONAS[persona];

  const isActive = (href: string) =>
    href === P.home ? pathname === href : pathname.startsWith(href);

  return (
    <div className="app">
      <SvgDefs />
      <aside className="rail">
        <Link className="brand" href={P.home}>
          <Logo size={26} />
          <span className="brand-name">Tervlon</span>
        </Link>

        <div className="nav-sec" style={{ paddingTop: 4 }}>{P.sec}</div>
        {P.nav.map((n) => (
          <Link key={n.label} href={n.href} className={`nav-item${isActive(n.href) ? " on" : ""}`}>
            <Icon path={icon[n.icon]} size={17} sw={1.85} />
            {n.label}
            {n.badge && <span className="nav-badge">{n.badge}</span>}
            {n.live && <span className="nav-live" title="A sprint is running" />}
          </Link>
        ))}

        <div className="rail-acct" style={{ marginTop: "auto", position: "relative" }}>
          {acctOpen && (
            <div className="acct-menu">
              <div className="am-h">Switch view <span className="am-demo">demo</span></div>
              {PERSONA_ORDER.map((id) => {
                const C = PERSONAS[id];
                return (
                  <div
                    key={id}
                    className={`am-opt${id === persona ? " on" : ""}`}
                    onClick={() => { setAcctOpen(false); router.push(C.home); }}
                  >
                    <span className="am-ic" style={{ background: C.avColor }}><Icon path={icon[C.icon]} size={14} sw={2} style={{ color: "#fff" }} /></span>
                    <div style={{ flex: 1, minWidth: 0 }}><div className="amo-t">{C.label}</div><div className="amo-s">{C.desc}</div></div>
                    {id === persona && <Icon path={icon.check} size={14} sw={2.6} style={{ color: "var(--blue)" }} />}
                  </div>
                );
              })}
              <div className="am-tip">Your role is set at sign-up; switch it from here or your profile — not the nav.</div>
              <div className="am-sep" />
              {persona === "developer" && (
                <>
                  <Link className="am-link" href="/app/profile" onClick={() => setAcctOpen(false)}><Icon path={icon.dev} size={15} sw={1.9} /> Profile</Link>
                  <Link className="am-link" href="/app/billing" onClick={() => setAcctOpen(false)}><Icon path={icon.wallet} size={15} sw={1.9} /> Plans &amp; credits</Link>
                </>
              )}
              <Link className="am-link" href="/auth" onClick={() => setAcctOpen(false)}><Icon path={icon.signout} size={15} sw={1.9} /> Sign out</Link>
            </div>
          )}
          <div className="acct-toggle" onClick={() => setAcctOpen((o) => !o)} title="Account">
            <span className="av" style={{ background: P.avColor, width: 30, height: 30, fontSize: 11 }}>{P.avInit}</span>
            <div className="who"><div className="nm">{P.who}</div><div className="ro">{P.role}</div></div>
            <Icon path={icon.swap} size={14} sw={2} style={{ color: "var(--faint)" }} />
          </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <Link href="/" className="muted" style={{ fontSize: 13 }}>← Back to landing</Link>
          {persona === "developer" && (
            <Link href="/app/billing" className="credits" style={{ marginLeft: "auto" }}>
              <Icon path={icon.wallet} size={16} sw={1.9} style={{ color: "var(--blue)" }} /> <b>8</b> credits
            </Link>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
