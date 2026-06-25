# Tervlon — improvement roadmap (app + backend)

Working notes for "ways to make it better." Grouped by surface; each item tagged
**[done]**, **[quick]** (small, high-value), or **[bigger]** (needs a decision). Use this
as the menu — tell me which to pull next.

---

## 0. The end-to-end flow (what "a full app" means)

The spine now connects click-through:

**Landing** → **/auth** (sign in / pick role = onboarding) → **persona home** →
**catalog** → open a sprint → **/sprint/:id** (workspace) → Run checks → **review** →
**standup** (incoming nudge → meeting → wrap) → **Generate report** → **/app/scorecard**.

- **[done]** Generate report now navigates to the scorecard (the last broken link in the loop).
- **[quick]** Catalog "open sprint" → a short **attempt-create confirm** (scenario, credit cost,
  "Start") before the workspace, so starting a sprint feels deliberate and maps to the real
  `POST /platform/attempts` → `POST /runtime/sessions/start`.
- **[bigger]** A real **resume vs. start** state on the home card driven by an attempt's status.

*(If the flow you sketched differs — your message cut off at "the flow should be" — send it and
I'll reshape routing to match.)*

---

## 1. Developer experience

- **[quick] Empty / first-run states.** Home, scorecards, and profile assume data exists. Add the
  "you haven't run a sprint yet → pick one" state so a new developer isn't dropped into a
  populated dashboard that isn't theirs.
- **[quick] Make the workspace legible on entry.** A one-time "here's your ticket, run checks when
  ready" coach-mark (dismissible, honoring `copyRules.noInstructionalChrome`), and a clearer
  primary action — Run checks should pulse until first run.
- **[quick] Checks → review as one obvious arc.** Right now Run checks and Request review are two
  ghost/blue buttons. Make review visibly *unlock* (disabled → enabled with a satisfying state
  change) so cause/effect is felt.
- **[bigger] A real Monaco editor** in the workspace (typing, not a static buffer) with autosave +
  version reconciliation — the single biggest fidelity jump, and it's the actual integration path.
- **[bigger] Live preview pane** for frontend/full-stack sprints (the `:5173` iframe), driven by
  the sandbox dev-server events.
- **[quick] Profile = shareable credential.** A public `/u/[handle]` read-only profile (no rail),
  since "the credential" is the developer's reason to come back.

## 2. Institution dashboard & platform

- **[done] "Needs a nudge" panel** — surfaces learners not-started / mid-sprint as a *coaching*
  signal, reinforcing "never a leaderboard."
- **[quick] Cohort health at a glance.** Per-cohort completion + avg already show; add a thin
  "trend since last week" and a flag when a cohort stalls.
- **[quick] Skill-gap framing.** The coverage bars exist; label the weakest one explicitly ("Testing
  discipline is the cohort's thin spot") so it's an insight, not a chart.
- **[bigger] Cohort analytics page** (`/app/institution/analytics`): skill coverage over time,
  evidence distribution, and a "ready for the job" view per learner — the institution's core value.
- **[bigger] Bulk invite + roster import** (CSV) for cohorts — the realistic onboarding path.
- **[platform] Consistent shell affordances.** Search (⌘K), notifications, and the credits chip
  are developer-only today; give company/institution their own top-bar context (e.g., seats used).

## 3. Landing

- **[done] Hero reorganised** to the reference layout (centered eyebrow → two-line headline →
  subhead → email → "or talk to the team" → three-audience line) with a **wide workspace mockup**
  below.
- **[done] Standup nudge** restyled to the reference (host + italic quote + amber "Join now" +
  "Need 30s" + countdown ring), used both in the landing mockup and the live workspace.
- **[quick] Animate the mockup** subtly on scroll (the nudge "arriving") — the one motion moment.
- **[quick] OG / share-card meta** for when the link gets posted.

## 4. Backend (to make integration smooth + the product better)

- **[quick] `ticket.brief` field.** The one safe addition already flagged — an optional markdown
  brief on the scenario ticket via `SoftwareTicketRun.scenarioSnapshot`. The Task panel renders it
  today; it upgrades automatically when the field lands.
- **[quick] Waitlist endpoint.** `POST /platform/waitlist { email, role? }` so the landing capture
  is real (currently a design-preview confirm).
- **[bigger] A public profile read model.** `GET /platform/developers/:handle/public` returning only
  the featured, verified scorecards — powers the shareable credential without exposing the dashboard.
- **[bigger] Institution analytics read model.** Aggregate cohort skill-coverage + completion trend
  server-side (`GET /platform/institutions/:id/analytics`) so the dashboard isn't computing it
  client-side.
- **[platform] First-class waitlist/onboarding role on the user** so `/auth/me` returns the role
  that drives routing (the client already keys persona off this).
- **[platform] SSE contract for the standup nudge loudness** — confirm `STANDUP_INCOMING` always
  carries `countdownSeconds` + `host` so the nudge renders without a second fetch.

---

## Suggested next pull

1. Attempt-create confirm + resume/start states (closes the flow believably).
2. Empty/first-run states across developer surfaces.
3. Institution analytics page.
4. Monaco editor in the workspace (the big fidelity + integration win).

Tell me the order — or send the flow you had in mind and I'll start there.
