import type { PersonKey } from "@/lib/people";

/**
 * Workspace fixtures, ported from index.html. In live mode these come from the
 * engine state (GET /engines/software-sprint/sessions/:id/state) + the frontend
 * contract. The shapes are intentionally close so the swap is data, not rewrite.
 */

export interface Criterion { t: string; done: boolean }

export const TICKET = {
  id: "T-03",
  title: "JWT bearer auth middleware",
  estimate: 35,
  brief:
    "The order routes in T-04 will sit behind auth. Build a <b>reusable bearer-token guard</b> the team can attach to any router. Reject bad tokens cleanly, and make an <b>expired</b> token say so distinctly — the client refreshes on that.",
  criteria: [
    { t: "401 on missing or malformed Authorization header", done: true },
    { t: "Verify with JWT_SECRET and attach userId to the request", done: true },
    { t: "Distinct response for expired vs. tampered tokens", done: false },
    { t: "Guard is reusable across routers (no route coupling)", done: false },
  ] as Criterion[],
  files: ["src/middleware/auth.guard.ts"],
  hint: {
    who: "marcus" as PersonKey,
    text:
      "jsonwebtoken v9 throws <code>TokenExpiredError</code> separately — branch it to a 401 with <code>TOKEN_EXPIRED</code>, split from the generic invalid-token case.",
  },
};

export const REFS = [
  { kind: "Doc", tagged: true, t: "Express middleware & the (req, res, next) contract", s: "When to call next(), and how to short-circuit with a 401 without falling through." },
  { kind: "API", tagged: true, t: "jsonwebtoken v9 — verify() error types", s: "TokenExpiredError vs JsonWebTokenError vs NotBeforeError — the distinct branches the checks look for." },
  { kind: "Snippet", tagged: false, t: "Reusable bearer-token extraction", s: "A typed AuthRequest and a guard you can attach to any router." },
  { kind: "Spec", tagged: false, t: "Auth error response shape", s: "{ error: 'TOKEN_EXPIRED' | 'INVALID_TOKEN' | 'NO_TOKEN' } — what clients branch on." },
];

export const CHAT = [
  { who: "sarah" as PersonKey, ti: "9:34", t: "Good progress on T-01 and T-02. For the middleware, make sure you handle token expiration — the checks look for that specific case." },
  { who: "marcus" as PersonKey, ti: "9:36", t: "Return <code>401</code> with <code>TOKEN_EXPIRED</code> in the body — split it from the generic invalid-token branch. Saves debugging later." },
];

export type Tier = "ambient" | "info" | "active";
export const ACTIVITY: { tier: Tier; who?: string; t: string; time: string }[] = [
  { tier: "active", who: "Marcus", t: "replied in the team channel", time: "just now" },
  { tier: "ambient", t: "Saved <span class='mono' style='font-size:11px'>auth.guard.ts</span>", time: "9:38" },
  { tier: "ambient", t: "Checks ran — 2 of 4 signals passing", time: "9:38" },
  { tier: "info", t: "Opened reference <span style='color:var(--ink)'>jsonwebtoken v9</span>", time: "9:35" },
  { tier: "ambient", t: "T-02 moved to Done", time: "9:21" },
  { tier: "ambient", t: "Sandbox ready · Postgres migrated", time: "9:05" },
];

export const STANDUP_SCRIPT: { who: PersonKey; t: string }[] = [
  { who: "sarah", t: "Morning. Quick standup before you go further — walk me through how the auth middleware is structured. Where does token extraction happen relative to the route logic?" },
  { who: "sarah", t: "That tracks. Now the part the tests care about: what does your code do when jwt.verify throws on an expired token?" },
  { who: "marcus", t: "yeah — jsonwebtoken v9 gives you three error types. splitting TokenExpiredError out now pays off later. solid catch." },
  { who: "sarah", t: "Good. Last thing — Priya's order routes go live after T-04. How will you attach the guard to protect those endpoints?" },
  { who: "sarah", t: "Clean. Good standup. Pick up T-04 when you're ready — Priya will ping you when the model's merged." },
];

export const QUICK_PROMPTS = [
  "I'm still understanding the task",
  "I found the likely issue",
  "I'm blocked",
  "I'm ready to implement",
];

export const REVIEW = {
  ticket: "T-03",
  score: 92,
  verdict: "Approve with nits",
  narrative:
    "Clean separation — the guard is reusable and the expired branch is handled distinctly. I'd merge this. Two small notes below; neither blocks.",
  comments: [
    { sev: "praise", file: "auth.guard.ts", line: 12, code: "if (!header || !header.startsWith('Bearer '))", note: "Short-circuiting before any verify work — clean." },
    { sev: "nit", file: "auth.guard.ts", line: 17, code: "const payload = jwt.verify(token, process.env.JWT_SECRET!)", note: "Name this `claims` — reads better at the call sites and matches our other guards." },
    { sev: "suggestion", file: "auth.guard.ts", line: 21, code: "// TODO: branch TokenExpiredError", note: "You did branch it — drop the stale TODO so the next reader isn't misled." },
  ],
};

/** The editor source for auth.guard.ts, as token-part arrays (see highlight()). */
export const CODE: string[][] = [
  ["import", " { Request, Response, NextFunction } ", "from", " 'express';"],
  ["import", " jwt ", "from", " 'jsonwebtoken';"],
  [],
  ["export interface", " AuthRequest ", "extends", " Request {"],
  ["  userId?: ", "ty", "string", ";"],
  ["}"],
  [],
  ["cm", "// T-03 — reusable JWT bearer auth. 401 on missing/bad header,"],
  ["cm", "// verify with JWT_SECRET, attach userId, distinct expired branch."],
  ["export const", " authGuard = (req: AuthRequest, res: Response, next: NextFunction) => {"],
  ["  const", " header = req.headers.authorization;"],
  ["  if", " (!header || !header.", "fn", "startsWith", "('Bearer ')) {"],
  ["    return", " res.", "fn", "status", "(", "nu", "401", ").json({ error: ", "st", "'NO_TOKEN'", " });"],
  ["  }"],
  ["  const", " token = header.", "fn", "slice", "(", "nu", "7", ");"],
  ["  try", " {"],
  ["    const", " payload = jwt.", "fn", "verify", "(token, process.env.JWT_SECRET!);"],
  ["    req.userId = (payload ", "k", "as", " any).userId;"],
  ["    return", " ", "fn", "next", "();"],
  ["  } ", "k", "catch", " (err) {"],
  ["    cm", "// TODO: branch TokenExpiredError -> distinct 401 TOKEN_EXPIRED"],
  ["    return", " res.", "fn", "status", "(", "nu", "401", ").json({ error: ", "st", "'INVALID_TOKEN'", " });"],
  ["  }"],
  ["};"],
];
