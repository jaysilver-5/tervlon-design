# Tervlon — Product Design Guide & Execution Priority

A working review of `index.html` (the design preview) against the Frontend Engineering
Document, the reference PDF, and a direct read of the NestJS backend source. It answers four
things you asked: should the codebase be decentralised, what the tier fix is, how pricing /
tiering actually works, and the execution priority order to take this from "good UI" to a
buildable platform.

---

## 1. Should we decentralise (modularise) the codebase?

**Short answer: yes — but deliberately, and not yet as one big-bang rewrite.**

Today the entire client is a single `index.html` (~2,300 lines: CSS, an icon set, all mock
data, every view, the router, and all interactions inline) plus a 17k-line
`legacy-prototype.html`. That was the right call for a *design preview* — one file opens in any
browser, nothing to install, every screen reachable. It is the wrong shape the moment an
engineer wires it to the live backend, for three concrete reasons:

- **State is global and implicit.** `S`, `BILLING`, `INSTITUTION`, `PEOPLE` are module-level
  singletons. The real app needs server state (TanStack Query) separated from runtime-local UI
  state (Zustand) — the engineering doc calls this out explicitly. You cannot grow that out of
  one `<script>` without it becoming unmaintainable.
- **The contract-driven core wants real modules.** The backend is *action-driven*: the
  frontend-contract endpoint returns, per action, `{ method, url, enabled, disabledReason }`,
  and the top-level layout is switched off `contract.layoutPriority`. That demands a
  `runAction()` helper, a contract store, an SSE client with reconnect/catch-up, and a
  tier-based notification renderer — each a unit you test in isolation. These are exactly the
  pieces that should be "decentralised" first.
- **The five layout states + fixtures pattern.** The doc tells you to storybook the five
  `layoutPriority` layouts against `GET /runtime/sessions/frontend-contract/fixtures` *before
  touching a live session*. That is impossible in one inline file; it is trivial with
  components.

**Recommended target shape** (Next.js App Router, per the doc):

```
/lib
  api/client.ts          # fetch wrapper: bearer inject, 401→refresh→retry once
  api/runAction.ts       # the single gate for every mutating call
  sse/stream.ts          # fetch-based SSE reader (NOT native EventSource), catch-up, last-id
  contract/store.ts      # frontend-contract → layoutPriority routing brain
  events/tiers.ts        # ambient/info/active/interrupting/internal render rules
/features
  auth, catalog, attempt, runtime (workspace, board, editor, terminal),
  standup, review, references, support, integrity, report,
  billing, company, institution, admin
/app/(routes)            # thin route shells that compose features
```

**What to keep central, not decentralise:** the design tokens (the `:root` blue ramp, the
no-teal rule, the teammate identity colours) belong in *one* theme file. The product's calm
feel depends on a single source of truth for colour/tier mapping — fragmenting that is how a
design system rots. So: decentralise the *logic and views*, centralise the *design language*.

**Migration path (low-risk):** keep `index.html` as the frozen visual target. Stand up the
Next.js shell, port view-by-view in the build order below, and diff each ported screen against
the preview. Don't rewrite the prototype in place.

---

## 2. The tier fix (done in this change)

**You were right — and it was a real bug, not just cosmetic.** The Plans & credits screen
rendered the four region pricing tiers (`TIER_1`–`TIER_4`) as **clickable buttons** that the
user could toggle to change their own price — and "Tier 4 · subsidised" multiplied the price by
**0.35**. Anyone could click their way to a 65%-off checkout.

That contradicts the backend. `PricingRegionTier` is a **geographic / purchasing-power** tier
carried on the `BillingAccount` (`billing.service.ts`), resolved server-side:

- `defaultOwnerRegionTier()` always returns `TIER_1`.
- An admin sets the account's `regionTier` via `upsertBillingAccount`; it is **never** a user
  input on the buy flow.
- `quotePlan(slug, regionTier)` falls back to `TIER_1` if no exact-tier price exists.
- On checkout, `regionTier` rides in Paddle `customData` purely so the webhook attributes the
  grant — it is not a discount the buyer dials in.

**What changed in `index.html`:**

- Replaced the four `data-region` toggle buttons with a single **read-only badge**:
  *"Regional pricing: Tier 1 · NA / EU · set automatically from your account."*
- Removed the click handler that wrote `S.region` from user input.
- `S.region` is now read-only state seeded from the account (defaults to `TIER_1`), documented
  inline as server-resolved.

The price still reflects the resolved region — it's just no longer something the user picks.
This matches the hard rule in the doc: *runtime access is credit-based; never hardcode a dollar
gate*, and pricing is editable catalog data, not a user-facing lever.

---

## 3. Pricing & tiering — what the backend actually does

There are **two independent axes** the UI was conflating. Keep them separate:

### Axis A — Plans (the product the user buys)
`BillingPlan` rows: `persona` (developer/company/institution), `productType`, `includedCredits`,
`unlimitedCredits`, `creditType`, `billingInterval`. The four cards in the preview (PAYG /
Starter / Pro / Unlimited) are plans. **This is the only axis a user chooses.**

### Axis B — Region tier (how that plan is priced where the buyer is)
`PricingRegionTier` (`TIER_1`–`TIER_4` + `CUSTOM`) lives on `BillingPlanPrice` and on the
`BillingAccount`. It exists so the same plan can cost less in lower-income regions
(purchasing-power pricing). **The user never selects this** — it is derived from the account /
region and can fall back to `TIER_1`.

### How access is actually gated — credits, not dollars
This is the important design truth and the preview gets it right elsewhere:

- A plan grants **credits** (or flips a wallet to `unlimited`). One sprint attempt **reserves**
  then **consumes** one credit (`reserveAttemptCreditTx` → `consumeAttemptReservation`).
- Runtime never checks a price. It checks the **wallet**. Prices can change freely without
  touching the runtime — the backend says this in three places (`flexibilityNote`,
  `pricingNote`, the price-revision changelog).
- `creditType` is segmented: `developer_sprint`, `hiring_evaluation`, `institution_simulation`.
  A company's credits can't be spent as a developer's.
- Checkout is processor-agnostic glue (Paddle today); the backend never holds a card. If a
  price row has no `paddlePriceId`, checkout returns `configured: false` and the UI must show a
  "billing not configured" state (the preview already does).

**Pricing discussion / recommendation:** because pricing is intentionally mutable (every price
row carries a `revision` + `changeLog`), treat the four plan cards and their numbers as seed
data, not product decisions. The one thing to lock down in the UI is the separation above:
**plan = user choice; region tier = system-resolved; access = credits.** The tier fix in §2
enforces exactly that boundary.

---

## 4. UI adjustments needed (checked against the references)

Beyond the tier fix, these are where the preview drifts from the Frontend Engineering Document.
Ordered roughly by how load-bearing they are:

1. **Layout must be driven by `contract.layoutPriority`, not local routing.** The preview fakes
   the standup with a 30s timer. The real screen switches between `workspace /
   standup_incoming / standup_meeting / review_waiting / retrospective_ready` off the contract.
   Build the five layouts against the **fixtures** endpoint first.
2. **Every mutating button must read `action.enabled` + show `disabledReason`.** Right now gating
   is hand-coded per view. It needs to route through one `runAction()` helper so the backend
   stays the source of truth (e.g. "editor read-only while a standup has the floor").
3. **Notification loudness is the backend's call.** The activity tiers are styled, but the rule
   *"only `STANDUP_INCOMING` interrupts; unknown types are `internal`"* must be enforced in a
   single tier renderer, not per-toast. The pairing toast is correctly `active` — keep that.
4. **Editor needs real version reconciliation.** Autosave debounce, save-on-blur, save-before-
   checks, reconcile to the returned `file.version`, and reflect lock state on a 400. The
   preview's editor is presentational.
5. **Checks are async.** UI should show `QUEUED` immediately, then flip to pass/fail when
   `TEST_COMPLETED` arrives over SSE — the preview simulates this but it must be wired to events.
6. **Standup is the headline — give it the most polish.** Incoming ring with
   `meetingRules.countdownSeconds`, one delay ("Need 30s — a delay, not a dismissal"), meeting
   layer that **preserves editor buffers and cursor**, transcript from `activeStandup.exchanges`,
   `ui`-driven `canReply`/`canWrap`/`quickPrompts`, and reconnect that keeps the meeting open.
7. **Integrity is trust, never accusation, on the candidate side.** Confirm no red "flagged"
   state ever appears candidate-side; the confidence band + evidence timeline appear **only** on
   the company/institution report. The preview's company report does this — keep it firewalled.
8. **Scores after James, never the climax.** Narrative review first, number second and quieter.
   The preview's scorecard ordering is correct; preserve it when wired.
9. **No-teal constraint.** The current "Sky-to-Ocean" blue ramp is borderline against the doc's
   *"workspace must not read as blue-green/teal."* Blue (not cyan/teal) is acceptable as a
   reserved accent, but audit the **workspace** surface specifically: its base must read neutral,
   with the violet reserved for the standup. Verify the "running/active" colour is warm, not cyan.
10. **`ticket.brief`** — the one safe backend addition the README already flags: an optional
    markdown `brief` on the scenario ticket, surfaced via `SoftwareTicketRun.scenarioSnapshot`.
    The Task panel renders it today by assembling title + DoD + files; it upgrades automatically
    when the field lands.

---

## 5. Execution priority order

This is the build/decision order. P0 = blocks everything; P3 = after MVP. It folds the
engineering doc's 20-step build order into product priorities and front-loads the fixes above.

### P0 — Foundations (nothing works without these)
1. **Decentralise the shell**: Next.js + TS, fetch wrapper (bearer, 401→refresh→retry), TanStack
   Query + Zustand split, central theme tokens. (§1)
2. **`runAction()` + contract store**: layout switches off `contract.layoutPriority`; every
   mutation gated on `action.enabled` / `disabledReason`. (§4.1–4.2)
3. **SSE client**: fetch-based reader (not native `EventSource`), reconnect →
   catch-up-then-refetch-contract → repaint, tier-based notification renderer. (§4.3)
4. **Lock the pricing model in UI**: plan = user choice, region tier = system-resolved (the §2
   fix), access = credits. ✅ tier fix already applied.

### P1 — Developer MVP spine (the demoable arc)
5. Auth + session bootstrap (`/auth/me`, silent refresh).
6. Catalog → create attempt → start session → route to `/app/runtime/:sessionId`.
7. Engine state: board + file tree + editor (read-only first), then **file write with version
   reconciliation + write gating**. (§4.4)
8. **Run checks** async: `QUEUED` → SSE `TEST_COMPLETED` → state refetch. (§4.5)
9. **James review**: request → started → completed; narrative before score. (§4.8)
10. **Sarah standup, text-first** — the make-or-break surface. Incoming ring → meeting (buffers
    preserved) → turns → wrap → reconnect. (§4.6)
11. Report views: candidate (narrative-first), then attempt history. (§4.8)

### P2 — Make the room feel real + close the loops
12. Reference panel + support funnel (self-serve → pairing → human; no guilt copy).
13. Sandbox + terminal + live preview (frontend/full-stack tracks; `waitForReady:false` poll).
14. Teammate chat + `codeContext` "ask about this block" + pairing offers.
15. Billing / Paddle checkout + wallet polling after webhook. (region badge read-only — done)
16. Developer dashboard + sprint history + featured reports.

### P3 — Second persona + trust surfaces + scale
17. Company: assessment create → invite (token shown once) → review board → **company report**
    with integrity confidence band + evidence timeline. (§4.7)
18. Integrity signal emission (context signals only) + reviewer-side evidence timeline.
19. Sarah **voice** layer (additive over the working text standup; clean fallback to text).
20. Institution surfaces (cohorts/analytics — signals, not a leaderboard), then admin/ops.

### Cross-cutting (every phase)
- No-teal audit on the workspace surface specifically. (§4.9)
- Integrity stays invisible/trust-framed candidate-side; band + evidence only on
  company/institution reports. (§4.7)
- Responsive / empty-state / a11y pass before each persona ships.

---

## 6. Backend availability — verified

Every screen and action in the priority list maps to a real, present endpoint. I read the
controllers directly; Appendix A of the engineering doc matches the source.

| UI surface | Backend route(s) | Present |
|---|---|---|
| Auth / session restore | `/auth/*`, `GET /auth/me` | ✅ |
| Catalog | `GET /platform/catalog/scenarios` | ✅ |
| Attempt → start | `POST /platform/attempts`, `POST /runtime/sessions/start` | ✅ |
| Routing brain | `GET /runtime/sessions/:id/frontend-contract` (+ `/fixtures`, `/schema`) | ✅ |
| Board/editor/checks/review | `/engines/software-sprint/sessions/:id/{state,files/write,checks/run,review/request}` | ✅ |
| SSE + catch-up | `/runtime/events/session/:id/stream` + `/catch-up` | ✅ |
| Standup | `/runtime/standups/sessions/:id/{current,delay,join}`, `/:standupId/{turns,silent,wrap}` | ✅ |
| Voice | `/runtime/voice/sessions/:id/realtime-token` (+ transcript/tool-calls/complete) | ✅ |
| References + support | `/runtime/reference/sessions/:id/{references,search,support…}` | ✅ |
| Integrity | `/runtime/integrity/sessions/:id/signals`, `/attempts/:id/summary` | ✅ |
| Reports | `/runtime/reports/sessions/:id/generate`, `/:reportId/views/{candidate,company}` | ✅ |
| Billing | `/platform/billing/{plans,plans/:slug/quote,checkout,owners/*/wallets…}` | ✅ |
| Companies | `/platform/companies/*` (assessments, invites, review-board) | ✅ |
| Developers | `/platform/developers/:userId/{dashboard,profile,sprint-history,featured-reports}` | ✅ |
| Institutions | `/platform/institutions/:id/{dashboard,cohorts/:cohortId}` | ✅ |
| Admin / ops | `/platform/operations/*`, `/runtime/{director,runner,model-router,quality}/*` | ✅ |

**One gap, already flagged:** there is no long-form per-ticket `brief` field. The Task panel
assembles one from existing fields today; the safe addition is optional `ticket.brief`
(markdown) via `SoftwareTicketRun.scenarioSnapshot`. Nothing else in the priority list is
blocked by a missing backend capability.
