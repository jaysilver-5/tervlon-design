import type { BillingPlan, Wallet } from "../lib/types";

export const mockPlans: BillingPlan[] = [
  {
    slug: "payg-mid",
    name: "Pay as you go",
    blurb: "One sprint + its scorecard",
    kind: "PAYG",
    amount: { display: "$12", cents: 1200, currency: "USD" },
    credits: 1,
    features: ["1 sprint credit", "Full evidence report", "Pin to your profile"],
    configured: true,
  },
  {
    slug: "starter",
    name: "Starter",
    blurb: "5 sprints / month",
    kind: "sub",
    amount: { display: "$29", cents: 2900, currency: "USD" },
    credits: 5,
    period: "mo",
    features: ["5 credits monthly", "All tracks & levels", "Verified scorecards"],
    configured: true,
  },
  {
    slug: "pro",
    name: "Pro",
    blurb: "15 sprints / month",
    kind: "sub",
    amount: { display: "$59", cents: 5900, currency: "USD" },
    credits: 15,
    period: "mo",
    features: ["15 credits monthly", "Priority runners", "Profile analytics"],
    popular: true,
    configured: true,
  },
  {
    slug: "unlimited",
    name: "Unlimited",
    blurb: "Unlimited sprints",
    kind: "sub",
    amount: { display: "$99", cents: 9900, currency: "USD" },
    credits: null,
    period: "mo",
    features: ["Unlimited credits", "Everything in Pro", "Early-access scenarios"],
    configured: false,
  },
];

export const mockWallet: Wallet = {
  creditType: "developer_sprint",
  balance: 8,
  reserved: 0,
  unlimited: false,
  available: 8,
  availabilityLabel: "8 available",
};
