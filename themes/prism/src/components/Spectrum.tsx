import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { sessions, tracks, type TrackId } from "../content";

/**
 * The home signature: one beam enters the prism and splits into the five tracks.
 * Each track row is a link into the agenda; hovering or focusing one lights its beam.
 */
export function Spectrum() {
  const [hot, setHot] = useState<TrackId | null>(null);
  return (
    <div className="spectrum" data-hot={hot ?? undefined}>
      <svg
        className="spectrum-art"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1="0"
          y1="290"
          x2="170"
          y2="262"
          className="beam-in"
          vectorEffect="non-scaling-stroke"
        />
        {tracks.map((t, i) => (
          <line
            key={t.id}
            x1="226"
            y1="258"
            x2="400"
            y2={50 + i * 100}
            className="beam"
            data-track={t.id}
            data-on={hot === t.id ? "" : undefined}
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
        <polygon
          points="196,130 286,370 106,370"
          className="prism-body"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ul className="spectrum-list">
        {tracks.map((t) => (
          <li key={t.id} data-track={t.id}>
            <Link
              to={`/agenda?track=${t.id}`}
              onPointerEnter={() => setHot(t.id)}
              onPointerLeave={() => setHot(null)}
              onFocus={() => setHot(t.id)}
              onBlur={() => setHot(null)}
            >
              <span className="spectrum-name">{t.name}</span>
              <span className="spectrum-count">
                {sessions.filter((s) => s.track === t.id).length} sessions
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
