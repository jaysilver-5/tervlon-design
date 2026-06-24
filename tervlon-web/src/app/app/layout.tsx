"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/app/catalog", label: "Catalog", sec: "Develop" },
  { href: "/app/runtime/demo", label: "Workspace", sec: "Develop" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="app">
      <aside className="rail">
        <Link className="brand" href="/">
          <Logo size={26} />
          <span className="brand-name">Tervlon</span>
        </Link>
        <div className="nav-sec">Develop</div>
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`nav-item${pathname.startsWith(n.href) ? " on" : ""}`}
          >
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
