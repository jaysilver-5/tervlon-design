/** Shared SVG gradient defs referenced by score rings & sparklines (url(#lg)). */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="22%" y1="2%" x2="56%" y2="100%">
          <stop offset="0%" stopColor="#56c6eb" />
          <stop offset="52%" stopColor="#2e8bce" />
          <stop offset="100%" stopColor="#155fa0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
