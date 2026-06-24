"use client";
import { useState } from "react";
import Link from "next/link";
import { useScenarios } from "@/features/catalog/useScenarios";
import type { Track } from "@/lib/types";

const TRACK_COLOR: Record<Track, string> = {
  Backend: "var(--blue)",
  Frontend: "var(--priya)",
  "Full-stack": "var(--marcus)",
};
const TRACKS: (Track | "All")[] = ["All", "Backend", "Frontend", "Full-stack"];

export default function CatalogPage() {
  const { data, isLoading } = useScenarios();
  const [track, setTrack] = useState<Track | "All">("All");
  const list = (data ?? []).filter((s) => track === "All" || s.track === track);

  return (
    <div className="page">
      <h1 className="page-h">Pick a sprint. Join a team mid-flight.</h1>
      <p className="page-lead">
        Every sprint is a real codebase with hidden tests, curated references, and
        teammates who speak in role. Driven from the catalog endpoint — never hardcoded.
      </p>

      <div className="tabs">
        {TRACKS.map((t) => (
          <button
            key={t}
            className={`tab${t === track ? " on" : ""}`}
            onClick={() => setTrack(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="skel">Loading scenarios…</p>
      ) : (
        <div className="grid">
          {list.map((s) => (
            <Link key={s.slug} href="/app/runtime/demo" className="sprint">
              <div className="sprint-head">
                <span className="track">
                  <span className="sq" style={{ background: TRACK_COLOR[s.track] }} />
                  {s.track}
                </span>
                {s.flagship ? (
                  <span className="flag">Flagship</span>
                ) : (
                  <span className="lvl">
                    {[1, 2, 3].map((i) => (
                      <i key={i} className={i <= s.level ? "on" : ""} />
                    ))}
                  </span>
                )}
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="sprint-foot">
                <span>{s.level === 1 ? "Junior" : "Mid"}</span>
                <span className="sep" />
                <span>{s.tickets} tickets</span>
                <span className="sep" />
                <span>~{s.estimatedMinutes}m</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
