"use client";
import { useState, type FormEvent } from "react";

/**
 * Coming-soon capture. Design preview: confirms in place, not wired to a backend.
 * To make it live, POST `email` to a waitlist endpoint (or a form service) in onSubmit.
 */
export function EmailCapture({ cta = "Get early access" }: { cta?: string }) {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO(integration): await fetch("/api/waitlist", { method: "POST", body: ... })
    setDone(true);
  }

  if (done) {
    return (
      <div className="capture-ok">
        <span className="ok-ic">
          <svg className="ico" viewBox="0 0 24 24" strokeWidth={2.6}>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div>
          <div className="ok-t">You&apos;re on the list.</div>
          <div className="ok-s">We&apos;ll send one note when Tervlon opens.</div>
        </div>
      </div>
    );
  }

  return (
    <form className="capture" onSubmit={onSubmit}>
      <input
        className="fld"
        type="email"
        required
        placeholder="you@work.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-pri" type="submit">
        {cta}
      </button>
    </form>
  );
}
