import { locations } from "../content";

const W = 640;
const H = 420;

/** Authored street plan of Alder Bay with the three clinics as pressable pins. */
export function ClinicMap({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="map">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Street map of Alder Bay showing the Harbourside, Northfield and Linden Street clinics"
      >
        <rect width={W} height={H} className="map-land" />
        <rect
          x="300"
          y="168"
          width="104"
          height="70"
          rx="10"
          className="map-park"
        />
        <rect
          x="530"
          y="36"
          width="84"
          height="64"
          rx="10"
          className="map-park"
        />
        <path
          className="map-water"
          d="M0 236 C60 230 112 256 150 296 C186 334 196 372 246 396 C274 410 300 420 320 420 L0 420 Z"
        />
        <path
          className="map-river"
          d="M84 0 C100 56 62 112 98 164 C126 204 118 230 132 268"
        />
        <g className="map-road">
          <path d="M0 120 H640" />
          <path d="M150 204 H640" />
          <path d="M240 330 H640" />
          <path d="M262 0 V420" />
          <path d="M384 0 V420" />
          <path d="M470 0 V420" />
          <path d="M580 0 V420" />
        </g>
        <g className="map-road map-road-main">
          <path d="M150 268 C220 262 262 250 300 230 L470 120 H640" />
          <path d="M0 92 C120 92 300 86 438 92" />
          <path d="M470 300 H640" />
        </g>
        <text x="40" y="360" className="map-label map-label-water">
          Alder Bay
        </text>
        <text
          x="300"
          y="258"
          className="map-label"
          transform="rotate(-33 300 258)"
        >
          Harbour Row
        </text>
        <text x="150" y="84" className="map-label">
          Orchard Avenue
        </text>
        <text x="548" y="340" className="map-label">
          Linden Street
        </text>
        <text x="312" y="207" className="map-label map-label-park">
          Commons Park
        </text>
      </svg>
      {locations.map((l) => (
        <button
          key={l.slug}
          type="button"
          className="map-pin"
          style={{
            left: `${(l.pin[0] / W) * 100}%`,
            top: `${(l.pin[1] / H) * 100}%`,
          }}
          aria-pressed={selected === l.slug}
          onClick={() => onSelect(l.slug)}
        >
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <rect x="10" y="3" width="8" height="22" rx="2" />
            <rect x="3" y="10" width="22" height="8" rx="2" />
          </svg>
          <span>{l.name}</span>
        </button>
      ))}
    </div>
  );
}
