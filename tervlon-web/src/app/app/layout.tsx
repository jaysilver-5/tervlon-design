"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { SvgDefs } from "@/components/SvgDefs";

const NAV = [
  { href: "/app", label: "Home" },
  { href: "/app/catalog", label: "Catalog" },
  { href: "/sprint/ecommerce-api-sprint", label: "Workspace" },
  { href: "/app/profile", label: "Profile" },
  { href: "/app/billing", label: "Billing" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);
  return (
    <div className="app">
      <SvgDefs />
      <aside className="rail">
        <Link className="brand" href="/">
          <Logo size={26} />
          <span className="brand-name">Tervlon</span>
        </Link>
        <div className="nav-sec">Develop</div>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={`nav-item${isActive(n.href) ? " on" : ""}`}>
            {n.label}
          </Link>
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
