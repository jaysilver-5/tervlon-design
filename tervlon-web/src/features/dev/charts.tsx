import { BANDS, type Band } from "@/mocks/dev";

/** Sparkline — skill evidence over time (ported from index.html spark()). */
export function Spark({ vals, w = 96, h = 28 }: { vals: number[]; w?: number; h?: number }) {
  if (!vals || vals.length < 2)
    return <span style={{ fontSize: 11, color: "var(--faint)" }}>building…</span>;
  const mx = Math.max(...vals), mn = Math.min(...vals), rng = mx - mn || 1;
  const y = (v: number) => h - 3 - ((v - mn) / rng) * (h - 6);
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${y(v)}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={y(vals[vals.length - 1])} r="2.6" fill="var(--blue)" />
    </svg>
  );
}

/** Score ring (used in cards/credentials). */
export function MiniRing({ score, size = 48 }: { score: number; size?: number }) {
  const r = size / 2 - 4;
  const C = 2 * Math.PI * r;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--well)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#lg)" strokeWidth="4" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)} />
      </svg>
      <div className="rn tnum" style={{ fontSize: size < 46 ? 13 : 14 }}>{score}</div>
    </div>
  );
}

export function BandPill({ band }: { band: Band | null }) {
  if (!band) return <span style={{ color: "var(--faint)", fontSize: 11.5 }}>—</span>;
  const b = BANDS[band];
  return (
    <span className="band-pill" style={{ background: b.bg, color: b.c }}>
      <span className="dot" style={{ background: b.c }} />
      {b.t}
    </span>
  );
}

/** Radar of weighted dimensions (ported from index.html radarSVG()). */
export function Radar({ dims, size = 248 }: { dims: { short: string; v: number }[]; size?: number }) {
  const cx = size / 2, cy = size / 2, R = size / 2 - 42, n = dims.length;
  const ang = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, rad: number): [number, number] => [cx + Math.cos(ang(i)) * rad, cy + Math.sin(ang(i)) * rad];
  const rings = [0.25, 0.5, 0.75, 1].map((f, k) => (
    <polygon key={k} points={dims.map((_, i) => pt(i, R * f).join(",")).join(" ")} fill="none" stroke="var(--line-2)" strokeWidth="1" />
  ));
  const axes = dims.map((_, i) => {
    const [x, y] = pt(i, R);
    return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line-2)" strokeWidth="1" />;
  });
  const dpts = dims.map((d, i) => pt(i, R * (d.v / 100)).join(",")).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="rdg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(46,139,206,.30)" />
          <stop offset="100%" stopColor="rgba(86,198,235,.12)" />
        </radialGradient>
      </defs>
      {rings}
      {axes}
      <polygon points={dpts} fill="url(#rdg)" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" />
      {dims.map((d, i) => {
        const [x, y] = pt(i, R * (d.v / 100));
        return <circle key={i} cx={x} cy={y} r="3.2" fill="var(--blue)" stroke="#fff" strokeWidth="1.5" />;
      })}
      {dims.map((d, i) => {
        const [x, y] = pt(i, R + 22);
        const a = Math.abs(x - cx) < 12 ? "middle" : x > cx ? "start" : "end";
        return (
          <text key={i} x={x} y={y} fontSize="10.5" fontWeight="500" fill="var(--muted)" textAnchor={a} dominantBaseline="middle">
            {d.short}
          </text>
        );
      })}
    </svg>
  );
}
