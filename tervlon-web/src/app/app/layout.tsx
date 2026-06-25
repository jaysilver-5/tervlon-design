"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { SvgDefs } from "@/components/SvgDefs";

const NAV: { sec: string; items: { href: string; label: string }[] }[] = [
  {
    sec: "Develop",
    items: [
      { href: "/app", label: "Home" },
      { href: "/app/catalog", label: "Catalog" },
      { href: "/sprint/ecommerce-api-sprint", label: "Workspace" },
      { href: "/app/profile", label: "Profile" },
      { href: "/app/billing", label: "Billing" },
    ],
  },
  {
    sec: "Hire",
    items: [
      { href: "/app/company", label: "Dashboard" },
      { href: "/app/company/review-board", label: "Review board" },
      { href: "/app/company/assessments", label: "Assessments" },
    ],
  },
  {
    sec: "Teach",
    items: [
      { href: "/app/institution", label: "Institution" },
      { href: "/app/institution/cohort", label: "Cohort" },
    ],
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/app" || href === "/app/company" || href === "/app/institution"
      ? pathname === href
      : pathname.startsWith(href);
  return (
    <div className="app">
      <SvgDefs />
      <aside className="rail">
        <Link className="brand" href="/">
          <Logo size={26} />
          <span className="brand-name">Tervlon</span>
        </Link>
        {NAV.map((group) => (
          <div key={group.sec}>
            <div className="nav-sec">{group.sec}</div>
            {group.items.map((n) => (
              <Link key={n.href} href={n.href} className={`nav-item${isActive(n.href) ? " on" : ""}`}>
                {n.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="rail-foot">
          Preview · running on mock data.
          <br />
          Set <span className="mono">DATA_SOURCE=live</span> to integrate.
        </div>
      </aside>
      <div className="main">
        <div className="topbar">
          <Link href="/" className="muted" style={{ fontSize: 13 }}>
            ← Back to landing
          </Link>
          <span className="credits">
            <b>8</b> credits
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
