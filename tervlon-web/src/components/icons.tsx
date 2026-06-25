/** Icon paths ported from the canonical design. Stroke icons on a 24×24 grid. */
export const icon = {
  home: '<path d="M4 11.5 12 5l8 6.5"/><path d="M6 10v9h12v-9"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h4"/>',
  chat: '<path d="M20 14a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  pulse: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  arrow: '<path d="M5 12h13M12 6l6 6-6 6"/>',
  play: '<path d="M6 4l13 8-13 8z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/>',
  send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  minus: '<path d="M5 12h14"/>',
  expand:
    '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
} as const;

export function Icon({
  path,
  size = 18,
  sw = 1.85,
  className = "ico",
  style,
}: {
  path: string;
  size?: number;
  sw?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeWidth={sw}
      style={{ width: size, height: size, ...style }}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
