import { Fragment, type ReactNode } from "react";

/** The mini syntax tokeniser, ported from index.html renderLine(). */
const CLS = new Set(["k", "ty", "st", "nu", "fn", "cm", "pn"]);
const KW = [
  "import", "from", "export interface", "extends", "export const",
  "const", "if", "return", "try", "catch",
];

function withKeyword(seg: string, key: number): ReactNode {
  for (const kw of KW) {
    const m = seg.match(new RegExp("^(\\s*)(" + kw + ")\\b"));
    if (m) {
      return (
        <Fragment key={key}>
          {m[1]}
          <span className="k">{m[2]}</span>
          {seg.slice(m[0].length)}
        </Fragment>
      );
    }
  }
  return <Fragment key={key}>{seg}</Fragment>;
}

export function highlightLine(parts: string[]): ReactNode {
  if (!parts.length) return " ";
  if (parts[0] === "cm") return <span className="cm">{parts[1]}</span>;
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const seg = parts[i];
    if (CLS.has(seg)) {
      out.push(
        <span className={seg} key={i}>
          {parts[++i]}
        </span>,
      );
    } else {
      out.push(withKeyword(seg, i));
    }
  }
  return out;
}
