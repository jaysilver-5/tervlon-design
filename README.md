# Tervlon — Design

The Tervlon client design, built as a single, fully-explorable prototype (`index.html`)
that mirrors the live NestJS backend contract (fixtures included, no backend required).
Open `index.html` in any modern browser to walk the whole product: auth → dashboard →
scenario catalog → runtime workspace → Sarah standup → James review → scorecard.

The prototype is intentionally **not wired** to a live server — it runs on bundled
fixtures shaped exactly like the backend's responses. Every screen, action, and event is
modelled on what the backend actually supports (see "Backed by the backend" below), so the
design can be lifted into the real client without inventing features the API can't serve.

---

## Theme — "Amber on Warm Graphite" (Batch 1)

The previous baseline read as **blue-green / teal** (cyan `#41d9ff` primary, teal-charcoal
surfaces, mint accents). That is gone. The new system is a calm, warm, near-black working
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

## Batch roadmap

- **Batch 1 — Theme system + logo (this commit).** Kill the blue-green; establish "Amber on
  Warm Graphite" across all tokens, identity colours, editor/terminal, and the logo.
- **Batch 2 — Standup polish.** The emotional centre: incoming ring, "Sarah is listening"
  presence, transcript, wrap — production-grade, on the violet accent.
- **Batch 3 — Workspace polish.** Board, editor, terminal, references/support panels, ambient
  team presence ("dev server on :5173"), live preview affordance.
- **Batch 4 — Report / scorecard.** Narrative-first scorecard, radar, per-ticket evidence;
  reviewer-side integrity band & evidence timeline.
- **Batch 5 — Dashboard, catalog, auth, billing** shell polish and onboarding.

Each batch is a self-contained commit on this branch.
