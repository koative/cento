import { useState } from "react";
import { places } from "../content";

/** An authored plan of the campus. Pick a building from the key (or the plan) to light it up. */
export function CampusMap() {
  const [active, setActive] = useState(places[0].id);
  const place = places.find((p) => p.id === active)!;
  const quad = places[0];

  return (
    <div className="campus-map">
      <svg
        viewBox="0 0 1000 640"
        role="img"
        aria-labelledby="map-title"
        className="map-svg"
      >
        <title id="map-title">
          Plan of the Quadwell campus. Selected: {place.name}
        </title>
        <rect width="1000" height="640" className="map-ground" />
        <rect x="610" y="24" width="370" height="150" className="map-park" />
        <text x="630" y="60" className="map-street">
          Ashgrove Park
        </text>
        <path
          d="M0 610C180 585 300 600 420 612S700 640 1000 590V640H0z"
          className="map-river"
        />
        <g className="map-roads">
          <path d="M0 200H1000" />
          <path d="M0 420H1000" />
          <path d="M350 0V600" />
          <path d="M800 0V600" />
          <path d="M610 200L610 420" />
        </g>
        <text x="20" y="190" className="map-street">
          Cloister Lane
        </text>
        <text x="20" y="410" className="map-street">
          Wharf Road
        </text>
        <text x="40" y="630" className="map-street map-water">
          River Harrow
        </text>
        {places.map((p, i) => (
          <g
            key={p.id}
            className="map-building"
            data-active={p.id === active ? "" : undefined}
            data-quad={p.id === quad.id ? "" : undefined}
            onClick={() => setActive(p.id)}
          >
            <rect x={p.x} y={p.y} width={p.w} height={p.h} />
            <circle cx={p.x + 18} cy={p.y + 18} r="13" />
            <text x={p.x + 18} y={p.y + 23}>
              {i + 1}
            </text>
          </g>
        ))}
        <g className="map-lawns" aria-hidden="true">
          {[0, 1].flatMap((r) =>
            [0, 1].map((c) => (
              <rect
                key={`${r}${c}`}
                x={quad.x + 34 + c * 92}
                y={quad.y + 30 + r * 66}
                width="76"
                height="52"
              />
            )),
          )}
        </g>
        <circle cx={quad.x + 118} cy={quad.y + 89} r="7" className="map-well" />
      </svg>

      <div className="map-key">
        <h3 className="sr-only">Map key</h3>
        <ol>
          {places.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={p.id === active}
                onClick={() => setActive(p.id)}
              >
                <span className="map-num">{i + 1}</span>
                {p.name}
              </button>
            </li>
          ))}
        </ol>
        <p className="map-detail" aria-live="polite">
          <strong>{place.name}.</strong> {place.text}
        </p>
      </div>
    </div>
  );
}
