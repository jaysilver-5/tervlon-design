import { PEOPLE, type PersonKey } from "@/lib/people";

export function Avatar({
  who,
  size = 28,
  className = "",
  off = false,
}: {
  who: PersonKey;
  size?: number;
  className?: string;
  off?: boolean;
}) {
  const p = PEOPLE[who];
  return (
    <span
      className={`av${className ? " " + className : ""}${off ? " off" : ""}`}
      title={p.name}
      style={{
        background: p.c,
        width: size,
        height: size,
        fontSize: Math.round(size * 0.36),
      }}
    >
      {p.i}
    </span>
  );
}
