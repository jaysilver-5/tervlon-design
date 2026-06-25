export type Band = "clear" | "review_suggested" | "review_recommended";

export const BANDS: Record<Band, { t: string; c: string; bg: string }> = {
  clear: { t: "Clear", c: "var(--ok)", bg: "var(--ok-tint)" },
  review_suggested: { t: "Review suggested", c: "var(--warn)", bg: "var(--warn-tint)" },
  review_recommended: { t: "Review rec.", c: "var(--err)", bg: "var(--err-tint)" },
};

export const DEV = {
  name: "Joshua",
  fullName: "Joshua Okonkwo",
  headline: "Backend engineer — auth, APIs & data integrity",
  location: "Lagos, NG · remote",
  visibility: "Public",
  availability: "Open to work",
  continueWork: { title: "E-Commerce API Sprint", track: "Backend", level: "Mid", ticket: "T-03 · Auth middleware", pct: 46, done: 2, total: 5, mins: 38, team: ["sarah", "marcus", "priya"] as const },
  trajectory: [
    { track: "Backend", level: "Mid", verified: 3, spark: [72, 78, 84, 87], last: 87 },
    { track: "Frontend", level: "Junior", verified: 1, spark: [76, 79], last: 79 },
    { track: "Full-stack", level: "—", verified: 0, spark: [] as number[], last: null as number | null },
  ],
  featured: [
    { title: "E-Commerce API Sprint", track: "Backend", date: "May 2026", score: 87, band: "clear" as Band },
    { title: "Webhook Reliability Sprint", track: "Backend", date: "Apr 2026", score: 84, band: "clear" as Band },
  ],
  history: [
    { title: "E-Commerce API Sprint", track: "Backend", date: "May 12", score: 87, band: "clear" as Band },
    { title: "Checkout Form Sprint", track: "Frontend", date: "Apr 28", score: 79, band: "clear" as Band },
    { title: "Webhook Reliability Sprint", track: "Backend", date: "Apr 9", score: 84, band: "review_suggested" as Band },
    { title: "Campaign Analytics Sprint", track: "Backend", date: "Mar 30", score: 81, band: "clear" as Band },
  ],
  stats: { attempts: 5, completed: 3, reports: 3 },
};

export const REPORT = {
  score: 88,
  scenario: "E-Commerce API Sprint",
  level: "Mid",
  track: "Backend",
  duration: "1h 02m",
  status: "Final",
  narrative:
    "Joshua works like someone who has shipped auth before. He reached for a reusable guard without being told, reasoned out loud about the expired-vs-tampered distinction in standup, and used the references to confirm jsonwebtoken's error types rather than guess. Communication was concrete and unhurried. The one growth edge: he validated the happy path first and only branched the expired case after a nudge.",
  dims: [
    { k: "Code correctness", short: "Code", v: 90, w: 30 },
    { k: "Implementation quality", short: "Impl.", v: 86, w: 25 },
    { k: "Communication", short: "Comms", v: 88, w: 20 },
    { k: "Team readiness", short: "Team", v: 84, w: 15 },
    { k: "Integrity confidence", short: "Integrity", v: 92, w: 10 },
  ],
  recommendations: [
    "Branch the error cases alongside the happy path — the expired-token handling only landed after Marcus nudged.",
    "Keep narrating trade-offs out loud in standup; your verbal reasoning was a clear strength to lean on.",
    "Reach for shared error types earlier (Marcus's AppError) so responses stay consistent across routes.",
  ],
  evidence: [
    { tag: "T-03", ex: "<b>Reached for reuse unprompted</b> — built a router-agnostic guard, the exact shape T-04 needed." },
    { tag: "Standup", ex: "<b>Explained the expired-token branch clearly</b> before implementing it — comprehension led the code." },
    { tag: "Refs", ex: "Consulted <b>4 references</b>, confirming jsonwebtoken v9 error types instead of guessing." },
    { tag: "Review", ex: "James: <b>“Clean separation. I'd merge this.”</b> Two minor naming notes." },
  ],
  integrity: {
    band: "clear" as Band,
    confidence: 92,
    timeline: [
      { kind: "context", t: "Pasted a 28-char snippet on T-03", note: "well within normal editing — not flagged", when: "9:31" },
      { kind: "context", t: "Opened 4 references", note: "reading docs is expected engineering", when: "9:35" },
      { kind: "signal", t: "Explained the expired-token branch in standup", note: "code and explanation matched — strong comprehension signal", when: "9:48" },
      { kind: "context", t: "Two short focus-blur windows (~20s)", note: "neutral; no long absences", when: "9:52" },
    ],
  },
  hiringNote:
    "Use this as one input among several. It evidences how the candidate works on real tickets — it does not rank them against a bar you haven't set.",
  meta: { candidate: "Joshua Okonkwo", attempt: "att_7c41…9e", session: "sess_3a9f…c21", when: "Jun 24, 2026", duration: "1h 02m" },
  provenance: "sha256:af31…be90 · evidence hash over 214 source events",
};
