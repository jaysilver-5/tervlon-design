import { TRACK_COLOR } from "@/lib/people";

export function initials(name: string): string {
  return name.split(" ").map((x) => x[0]).join("");
}

const CHIP: Record<string, string> = {
  Completed: "chip-ok",
  "In sprint": "chip-blue",
  Invited: "chip-soft",
  Active: "chip-ok",
  Draft: "chip-soft",
  "Not started": "chip-soft",
};

export function StatusChip({ status }: { status: string }) {
  return <span className={`chip ${CHIP[status] ?? "chip-soft"}`}>{status}</span>;
}

/** Square initials avatar keyed to a track colour (used in pipeline/cohort rows). */
export function PersonSquare({ name, track, size = 30 }: { name: string; track: string; size?: number }) {
  return (
    <span className="av" style={{ background: TRACK_COLOR[track], width: size, height: size, fontSize: Math.round(size * 0.38) }}>
      {initials(name)}
    </span>
  );
}
