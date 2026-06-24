# Tervlon — Design

A **design preview** of the Tervlon client: the full product as a single, navigable app,
grounded in what the NestJS backend actually supports — but **not wired up**. Every screen,
state, and interaction is a faithful visual target an engineer can build and integrate
against later. Open `index.html` in any modern browser.

> Tervlon is a *living sprint simulation*: a candidate joins a software team that's already
> mid-sprint, picks up real tickets, codes in a real sandbox, gets pulled into a **standup**
> with an AI lead, requests a **review**, and walks away with an **evidence-backed
> scorecard**. "A day on a good team, observed — not a quiz."

---

## Files

- **`index.html` — the app.** One SPA with a tiny hash router. Every rail item and every
  tab routes to a real view; nothing is a dead click. Views: **Home · Catalog · Workspace ·
  Standup · Scorecard**.
- **`legacy-prototype.html`** — the earlier full React prototype (dark theme). Kept purely
  as a **behaviour reference** — it documents the exact API surface, events, and gating the
  design is built against. Not the current look.

---

## The design language — "Sky-to-Ocean" (light)

Keyed to the logo's blue gradient (`#54C5EA → #2E8BCE → #155FA0`, in tunable `--b1/--b2/--b3`
tokens). The discipline that keeps it premium rather than template-y:

- **Light-to-mid, never dark.** A cool near-white canvas, white cards, a deep-navy ink ramp.
- **Gradient is reserved** — the logo, the single "continue sprint" card, the score ring, a
  whisper of hover accent. The primary button is ink; blue is a quiet accent.
- **Hairline structure** over heavy shadow; deliberate type (Inter, optical sizing, tabular
  numerals); one accent for the one thing that should pull the eye.
- **One identity colour per teammate**, all clear of the cyan/teal family. The **standup**
  owns a distinct **violet** (Sarah) so the headline moment never blurs into ordinary UI.

Everything flows from the `:root` tokens — the blue is tunable in one place.

---

## What each view shows (and how it maps to the backend)

**Home** — "your team is already moving." A resume card, an editorial signal/stats strip,
recommended sprints. Routes into the workspace.

**Catalog** — sprint "cards" with track/level, teammate stacks, a track filter. Driven from
catalog data, never hardcoded into layout.

**Workspace** — the lived-in sprint room. Reworked from the earlier version so you always
know what you're doing:
- **Left = a persistent Task panel** (the explicit brief): ticket id/title, a plain-language
  brief, a **Definition-of-done checklist** that flips to ✓ as checks pass, files to touch,
  and the current teammate hint. *(Backend: ticket `title`, `acceptanceCriteria[]`,
  `initialFiles[]`, teammate moments. See "A note to the backend" below.)*
- **Center = editor + an IDE-grade terminal.** A real integrated terminal — prompt, command
  echo, streamed output, exit status, history (`npm test/install/dev`, `ls`, `git status`,
  `help`, `clear`) — with **Terminal / Problems / Output** tabs. Not an input box.
- **Right dock = real tabs:** Board (`in_progress / to_do / in_review / done`), Team channel,
  References (ticket-scoped), Activity (rendered by **loudness tier**).
- **Backend truths, not faked:** checks are **async** (Run checks → *queued* → result, then
  review unlocks); review/report buttons are **gated with their reason**; only an
  **active-tier** pairing toast is louder than ambient — a standup is the sole interrupt.

**Standup** — the headline. An interrupting incoming ring (host + ticket context, "Need 30s
— a delay, not a dismissal"), then a meeting: speaker tiles, live transcript, one-tap
quick-prompts, on the violet accent. Wrap → scorecard.

**Scorecard** — narrative first, the number second and quieter: an evidence-score ring, a
serif summary of *how the person worked*, per-moment evidence, weighted dimensions, and a
trust-framed integrity band with caveats.

### Try the full arc
Home → **Open workspace** → **Run checks** (watch it queue, pass, and unlock review) →
**Request review** (James's narrative) → the **standup** pulls you in → **wrap** → the
**scorecard**.

---

## A note to the backend (design informing build)

Per-ticket, the backend has `title`, `acceptanceCriteria[]`, `estimateMinutes`,
`initialFiles[]` and the hidden `verification` suite — enough to make a ticket explicit by
*assembling* title + definition-of-done + files + linked references + teammate hint (which is
what the Task panel does). There is **no long-form per-ticket "brief" field** today. The one
small, safe addition worth making before build: an optional **`ticket.brief` (markdown)** in
the scenario config, surfaced via `SoftwareTicketRun.scenarioSnapshot`. The Task panel already
renders a brief and will upgrade automatically when that field lands.

---

## Status & next

Built and committed in steps on this branch. Done: the central SPA + all five views with the
reworked workspace, the IDE terminal, working dock tabs, and the standup→review→scorecard arc.

Next polish passes: deepen the **review** surface (inline diff comments), the **company /
reviewer** scorecard view (integrity evidence timeline), and **billing / onboarding**.

*Caveat: verified by static parse + a Node render-harness over every view (the sandbox blocks
a headless-browser download, so no screenshots here). Open `index.html` to see it live.*
