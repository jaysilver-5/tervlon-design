"use client";
import { Avatar } from "@/components/Avatar";
import { Icon, icon } from "@/components/icons";
import { REVIEW } from "@/mocks/workspace";

const SEV: Record<string, { bg: string; c: string; label: string }> = {
  praise: { bg: "var(--ok-tint)", c: "var(--ok)", label: "Praise" },
  nit: { bg: "var(--warn-tint)", c: "var(--warn)", label: "Nit" },
  suggestion: { bg: "var(--blue-tint)", c: "var(--blue-d)", label: "Suggestion" },
};

/** James's review surface — narrative first, score second and quieter. */
export function ReviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-layer" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="review-modal">
        <div className="rv-head">
          <Avatar who="james" size={34} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>James reviewed {REVIEW.ticket}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>James Okonkwo · Reviewer</div>
          </div>
          <span className="chip chip-ok">{REVIEW.verdict}</span>
          <button className="modal-x" onClick={onClose}><Icon path={icon.close} size={16} sw={2} /></button>
        </div>
        <div className="rv-body">
          <p className="rv-narr">{REVIEW.narrative}</p>
          <div className="rv-clab">Inline notes <span>· {REVIEW.comments.length}</span></div>
          {REVIEW.comments.map((c, i) => {
            const sev = SEV[c.sev] ?? SEV.suggestion;
            return (
              <div className="rvc" key={i}>
                <div className="rvc-h">
                  <span className="rvc-sev" style={{ background: sev.bg, color: sev.c }}>{sev.label}</span>
                  <span className="rvc-loc">{c.file}:{c.line}</span>
                </div>
                <div className="rvc-code">{c.code}</div>
                <div className="rvc-note" dangerouslySetInnerHTML={{ __html: c.note }} />
              </div>
            );
          })}
          <div className="rv-score">
            <span>Score</span>
            <b>{REVIEW.score}</b>
            <span className="rv-score-s">shown only after review · the narrative is the point</span>
          </div>
        </div>
        <div className="rv-foot">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
          <button className="btn btn-pri btn-sm" onClick={onClose}>
            <Icon path={icon.check} size={15} sw={2} /> Got it
          </button>
        </div>
      </div>
    </div>
  );
}
