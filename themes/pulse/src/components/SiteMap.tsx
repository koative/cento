import { useState } from "react";
import { days, places, stages } from "../content";
import { Link } from "../router";

const tents = Array.from({ length: 30 }, (_, i) => ({
  x: 40 + (i % 5) * 32,
  y: 228 + Math.floor(i / 5) * 40,
}));

/** The site plan, drawn to scale-ish. Markers are real buttons laid over the drawing. */
export function SiteMap() {
  const [active, setActive] = useState(places[0].id);
  const place = places.find((p) => p.id === active)!;
  const stage = stages.find((s) => s.id === place.stage);

  return (
    <div className="sitemap">
      <div className="sitemap-canvas">
        <svg
          viewBox="0 0 1000 640"
          role="img"
          aria-label="Site map of the Waterworks: river along the south edge, Open Air field on the bank, turbine hall and pump house in the middle, glasshouse to the east, campsite to the west."
        >
          <rect className="m-land" width="1000" height="640" />
          <path className="m-road" d="M0 40 H1000" />
          <text className="m-label m-road-label" x="760" y="30">
            UFERWEG
          </text>
          <path
            className="m-river"
            d="M0 560 C160 520 300 600 470 570 S760 520 1000 560 V640 H0 Z"
          />
          <text className="m-label m-river-label" x="560" y="612">
            SPREE
          </text>
          <path
            className="m-walk"
            d="M470 70 V300 M470 160 H860 V200 M470 300 L360 405 M470 300 H610 M610 300 L720 330 M110 160 H470 M360 405 L130 300"
          />
          <rect className="m-zone" x="24" y="200" width="180" height="270" />
          {tents.map((t, i) => (
            <path
              key={i}
              className="m-tent"
              d={`M${t.x} ${t.y + 14} l10 -16 l10 16 z`}
            />
          ))}
          <path className="m-field" d="M250 350 L450 335 L480 500 L255 515 Z" />
          <path
            className="m-stage-shape"
            d="M320 465 L400 465 L390 495 L330 495 Z"
          />
          <rect
            className="m-building"
            x="540"
            y="200"
            width="160"
            height="90"
          />
          <path className="m-building-line" d="M540 230 H700 M540 260 H700" />
          <rect className="m-building" x="690" y="300" width="70" height="60" />
          <rect className="m-glass" x="800" y="130" width="110" height="80" />
          <path
            className="m-building-line"
            d="M822 130 V210 M844 130 V210 M866 130 V210 M888 130 V210 M800 170 H910"
          />
          <rect className="m-building" x="430" y="285" width="90" height="36" />
          <rect className="m-building" x="520" y="140" width="44" height="40" />
          <text className="m-label" x="44" y="500">
            CAMPING
          </text>
          <text className="m-label" x="262" y="545">
            RIVER FIELD
          </text>
        </svg>
        {places.map((p) => (
          <button
            key={p.id}
            type="button"
            className="pin"
            data-kind={p.kind}
            data-stage={p.stage}
            aria-pressed={p.id === active}
            style={{ left: `${p.x / 10}%`, top: `${p.y / 6.4}%` }}
            onClick={() => setActive(p.id)}
          >
            <span className="pin-dot" aria-hidden="true" />
            <span className="pin-name">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="sitemap-info" aria-live="polite" data-stage={place.stage}>
        <h3>{place.name}</h3>
        <p className="sitemap-kind">{place.kind}</p>
        <p>{place.text}</p>
        {stage && (
          <>
            <dl className="sitemap-hours">
              {days.map((d) => (
                <div key={d.id}>
                  <dt>{d.label}</dt>
                  <dd>{stage.hours[d.id] ?? "Closed"}</dd>
                </div>
              ))}
            </dl>
            <Link to="/timetable" className="text-link">
              Plan your {stage.name} sets
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
