"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon, icon } from "@/components/icons";
import { usePlans } from "@/features/billing/usePlans";
import { mockWallet } from "@/mocks/billing";

const LEDGER = [
  { t: "Sprint started · E-Commerce API", d: "−1", when: "May 12", neg: true },
  { t: "Starter subscription grant", d: "+5", when: "May 1", neg: false },
  { t: "Refund · runner failure", d: "+1", when: "Apr 28", neg: false },
  { t: "Pay-as-you-go top-up", d: "+3", when: "Apr 9", neg: false },
];

export default function BillingPage() {
  const { data: plans } = usePlans();
  const [credits, setCredits] = useState(mockWallet.balance);

  return (
    <section className="page fade" style={{ maxWidth: 1160 }}>
      <div className="crumb">
        <Link className="c-link" href="/app">Home</Link>
        <Icon path='<path d="m9 6 6 6-6 6"/>' size={13} sw={2} />
        <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>Plans &amp; credits</span>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: "1fr 320px", alignItems: "start" }}>
        <div>
          <div className="greet" style={{ marginBottom: 14 }}>
            <div>
              <h1 className="display" style={{ fontSize: 26 }}>Plans &amp; credits</h1>
              <p className="lead" style={{ marginTop: 6 }}>Runtime access is credit-based — a sprint consumes one credit. Pricing is region-aware; the processor is Paddle.</p>
            </div>
          </div>

          {/* Region tier is resolved server-side from the billing account — never a user-picked toggle. */}
          <div className="region-row">
            <span className="rg-auto">
              <Icon path='<path d="M12 4 4 8v5c0 4 3.2 6.5 8 8 4.8-1.5 8-4 8-8V8z"/>' size={13} sw={1.9} />
              Regional pricing: <b>Tier 1 · NA / EU</b> · set automatically from your account
            </span>
          </div>

          <div className="plan-grid">
            {(plans ?? []).map((p) => (
              <div className={`plan ${p.popular ? "pop" : ""}`} key={p.slug}>
                {p.popular && <div className="plan-pop">Most popular</div>}
                <div className="plan-n">{p.name}</div>
                <div className="plan-blurb">{p.blurb}</div>
                <div className="plan-price">
                  <b>{p.amount.display}</b>
                  <span>{p.kind === "PAYG" ? "/ credit" : `/ ${p.period}`}</span>
                </div>
                <div className="plan-credits">{p.credits == null ? "Unlimited credits" : `${p.credits} credit${p.credits > 1 ? "s" : ""}${p.kind === "sub" ? " / mo" : ""}`}</div>
                <div className="plan-feats">
                  {p.features.map((f) => (
                    <div key={f}><Icon path={icon.check} size={13} sw={2.6} style={{ color: "var(--ok)" }} /> {f}</div>
                  ))}
                </div>
                <button
                  className={`btn ${p.popular ? "btn-pri" : "btn-ghost"}`} style={{ width: "100%" }}
                  disabled={!p.configured}
                  onClick={() => p.credits != null && setCredits((c) => c + p.credits!)}
                >
                  {p.kind === "PAYG" ? "Buy 1 credit" : "Subscribe"}
                </button>
                {!p.configured && <div className="plan-unconf">Paddle price not configured</div>}
              </div>
            ))}
          </div>
          <div className="footer" style={{ marginTop: 30 }}>
            <span>Prices and Paddle ids are editable catalog data — changing them never touches the runtime.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="wallet-card">
            <div className="wc-k">Your wallet</div>
            <div className="wc-v"><b className="tnum">{credits}</b> credits</div>
            <div className="wc-s">Each credit runs one sprint and its scorecard.</div>
            <button className="btn btn-pri btn-sm" style={{ width: "100%", marginTop: 6 }} onClick={() => setCredits((c) => c + 1)}>Top up</button>
          </div>
          <div className="pnl">
            <div className="pnl-h"><div className="t">Recent ledger</div></div>
            <div style={{ padding: "6px 16px 12px" }}>
              {LEDGER.map((l, i) => (
                <div className="led" key={i}>
                  <div style={{ flex: 1, minWidth: 0 }}><div className="led-t">{l.t}</div><div className="led-w">{l.when}</div></div>
                  <div className={`led-d ${l.neg ? "neg" : "pos"}`}>{l.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
