/** The node-graph mark in the Sky-to-Ocean gradient. The one coloured brand element. */
export function Logo({ size = 28 }: { size?: number }) {
  const id = "tervlon-lg";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="22%" y1="2%" x2="56%" y2="100%">
          <stop offset="0%" stopColor="#56c6eb" />
          <stop offset="52%" stopColor="#2e8bce" />
          <stop offset="100%" stopColor="#155fa0" />
        </linearGradient>
      </defs>
      <path d="M50 64 L31 31" stroke={`url(#${id})`} strokeWidth="9.5" strokeLinecap="round" />
      <path d="M50 64 L72 41" stroke={`url(#${id})`} strokeWidth="7.5" strokeLinecap="round" />
      <circle cx="30" cy="27" r="19" fill={`url(#${id})`} />
      <circle cx="74" cy="39" r="10.5" fill={`url(#${id})`} />
      <circle cx="50" cy="72" r="17" fill={`url(#${id})`} />
    </svg>
  );
}
