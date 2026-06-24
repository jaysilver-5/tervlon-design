# Tervlon — Design

Two artifacts live here:

- **`redesign.html` — the current design direction (start here).** A light-to-mid theme
  keyed to the logo's blue gradient, with a reimagined, rail-driven layout. Home + catalog;
  its CTAs open the workspace. Built fresh (not a restyle) and growing in batches.
- **`workspace.html` — the redesigned sprint room.** The full-bleed lived-in workspace
  (board · editor · terminal/checks · team-dock) in the same light language, with the
  backend's real mechanics modelled: action-gated buttons, async checks (queued → result),
  review unlocked only after checks pass, and a tiered activity feed.
- **`index.html` — the earlier full prototype.** A complete, backend-faithful React
  prototype covering every screen/flow on bundled fixtures. Kept as the reference for
  *behaviour* (the exact API surface, events, and gating) while the redesign re-imagines
  the *look and layout* screen by screen.

Both are **not wired** to a live server — they run on fixtures shaped exactly like the
backend's responses, so the design can be lifted into the real client without inventing
features the API can't serve (see "Backed by the backend").

---

## Current direction — "Tervlon Light / Sky-to-Ocean" (Redesign, Batch 4)

Keyed to the logo: a vertical **sky-blue → ocean-blue** gradient
(`#54C5EA → #2E8BCE → #155FA0`, sampled from the mark and exposed as tunable `--b1/--b2/--b3`
tokens). The brief: professional and polished, **light-to-mid tone (never dark)**, the blue
gradient as the primary theme, the layout **reimagined rather than restyled**, with subtle
spark/shimmer for flair.

What's in Batch 4 (`redesign.html`):

- **A new design system** — light cool-white canvas (`#EEF4FA`), white cards, a deep-navy
  ink ramp (not black), the gradient reserved for primary actions / hero / the one thing
  that should pull the eye. Status, teammate-identity, elevation, radius and motion tokens
  all defined up top and tunable.
- **Shimmer & spark primitives** — a gradient `shimmer-text`, a hover light-`sweep` on
  buttons/cards, and twinkling `spark` dots in the hero and on the flagship sprint.
- **A reimagined shell** — a calm left rail (logo + grouped nav + account) and a glassy,
  blurred sticky top bar with search + credit wallet, replacing the old top-tab dashboard.
- **Home** — a gradient "your team is already moving" hero with a floating glass resume
  card, a signal/stats strip, and a recommended-sprints rail.
- **Catalog** — sprint "trading cards" with a gradient spine, track/level chips, level dots,
  stacked teammate avatars, and a track filter — driven from the catalog data, never
  hardcoded into layout.

> The blue is tunable from the tokens up top if it doesn't harmonise perfectly.

### Redesign roadmap (in this language, by batch)

- **Batch 4 — Design system + shell + Home + Catalog.** ✓
- **Craft pass** — discipline over decoration; gradient reserved, editorial structure. ✓
- **Batch 5 — The workspace** (`workspace.html`): board / editor / terminal+checks / team
  dock, grounded in the backend contract. ✓
- **Batch 6 — The Sarah standup**, the headline moment, on its own accent.
- **Batch 7 — The evidence-backed scorecard** (candidate + reviewer views).
- **Batch 8 — Auth / onboarding / billing** and company/institution surfaces.

When the redesign covers the full spine, it replaces `index.html` as the primary client.

---

## The earlier prototype (`index.html`)

Open `index.html` to walk the whole product on fixtures: auth → dashboard → scenario
catalog → runtime workspace → Sarah standup → James review → scorecard.

---

## `index.html` theme — "Amber on Warm Graphite" (prototype Batches 1–3)

> Historical: this is the theme of the earlier prototype. The **current** direction is the
> light blue redesign described above; this section documents `index.html` only.

The original baseline read as **blue-green / teal** (cyan `#41d9ff` primary, teal-charcoal
surfaces, mint accents). In the prototype that became a calm, warm, near-black working
environment with a single golden accent reserved for the things that should pull the eye.

This honours **Part 16 of the Frontend Engineering doc** (the workspace must not read as
teal/cyan/blue-green) and the **notification loudness grammar** (active = a warm attention
colour; the interrupting standup gets its own distinct accent).

### The decisions

| Role | Colour | Why |
|---|---|---|
| **Foundation** | warm graphite ramp `#0e0d0b → #34301f` | Neutral, slightly warm, never tinted. 80% of a session lives here, so it stays quiet. |
| **Primary / "active"** | amber `#f2a93b` (hover `#f8c271`) | The one eye-pull: primary actions, the active ticket, "running/active" glows. Maps to the grammar's *active = warm attention*. |
| **Standup / interrupting** | violet `#b3a4ff` (Sarah) | The emotional centre gets the one deliberate, distinct accent — kept separate from the amber action colour so the standup never blurs into ordinary "active" toasts. |
| **Success** | green `#5ad19b` | Off-mint, clear of the teal family. |
| **Warning** | gold `#f5c24b` | Distinct from primary amber. |
| **Error** | red `#ff6b7a` | Warm, non-teal. |

### Teammate identity — all clear of the teal/cyan family

- **Sarah** (lead / standup) — lavender `#b3a4ff`
- **Marcus** (senior dev) — sage green `#6fbf73` *(was mint-teal)*
- **Priya** (peer) — coral `#f0876b`
- **James** (reviewer) — slate `#7c8bb0` *(was cyan)*
- **You** (candidate) — amber `#f2a93b`, so the candidate reads as the primary identity

### Editor & terminal

The code editor and terminal are part of the workspace, so they were de-tealed too: syntax
**strings** are warm sage, **types** a soft lavender, **numbers** coral, **keywords** amber;
the terminal path is a slate periwinkle. No cyan anywhere in the working surface.

### The logo

The constellation/node mark keeps its form but is re-gradiented from the old blue
(`#7FD6F8 → #5BC8F5`) to a warm **amber → orange** (`#F8C46E → #F0883C`). The gradient is a
single `<linearGradient id="tvg">` and is easy to retune if the brand mark changes.

### How it's built (easy to retune)

Almost everything flows through CSS custom properties in the `:root` block near the top of
the `<style>` tag (`--b/--s/--r/--p/--a/--e` surfaces, `--t…--tg` text, `--cy/--pri` amber
brand, `--sarah/--marcus/--priya/--james` identity). Change a token, and the change
propagates. A handful of literal colours (logo gradient, the avatar `rgb` map, syntax
tokens, on-amber ink) live inline and are documented above.

---

## Backed by the backend

The design only exposes what the API supports, read directly from the backend source:

- **Action-driven gates** — buttons reflect `enabled`/`disabledReason` rather than guessing.
- **Five runtime layouts** — `workspace · standup_incoming · standup_meeting · review_waiting · retrospective_ready`, switched off `contract.layoutPriority`.
- **Notification grammar** — events render strictly by tier (`ambient · informational · active · interrupting`); only `STANDUP_INCOMING` interrupts.
- **The standup** — incoming countdown ring → meeting → turns → wrap, the product's headline moment.
- **James review** — narrative first, score second and quieter.
- **References / support / integrity** — framed as trust and support, never accusation.
- **Credit-based access & Paddle billing** — no hardcoded dollar gates.

---

## Roadmap

The active roadmap is the **Redesign roadmap** near the top of this file. The amber prototype
(`index.html`) is complete through its Batches 1–3 and now serves as the behaviour reference
while the light-blue redesign re-imagines each surface. Each batch is a self-contained commit
on this branch.
