import { roads, stations } from "../content";
import { routeMiles } from "../lib/booking";

type Props = {
  /** Highlighted station(s): the selected one, or pickup and return. */
  active?: string[];
  /** Draw the trip between the first two active stations. */
  route?: boolean;
  /** Pins link to their station page. */
  links?: boolean;
  onPick?: (id: string) => void;
  label: string;
};

const COAST =
  "M0 0 L150 0 C158 50 168 110 182 150 C192 180 176 200 156 226 C134 254 104 290 94 322 C88 342 82 372 76 400 L0 400 Z";
const CONTOURS = [
  "M440 40 C480 10 560 14 590 50 C610 90 600 170 560 196 C510 222 440 200 420 150 C404 108 410 64 440 40 Z",
  "M462 62 C492 40 548 44 568 72 C584 100 576 150 548 168 C512 186 462 170 450 136 C440 108 442 80 462 62 Z",
  "M486 84 C506 70 536 72 548 92 C558 112 550 138 530 146 C506 156 480 146 474 124 C468 108 472 94 486 84 Z",
];

export function RegionMap({ active = [], route, links, onPick, label }: Props) {
  const [a, b] = active;
  const from = stations.find((s) => s.id === a);
  const to = stations.find((s) => s.id === b);
  const showRoute = route && from && to && from.id !== to.id;

  return (
    <svg
      className="region-map"
      viewBox="0 0 600 400"
      role="group"
      aria-label={label}
    >
      <path className="map-sea" d={COAST} />
      {CONTOURS.map((d) => (
        <path key={d} className="map-contour" d={d} />
      ))}
      <text className="map-area" x="40" y="120">
        Salt Sea
      </text>
      <text className="map-area" x="470" y="230">
        High Passes
      </text>

      {roads.map((r) => (
        <g key={r.id}>
          <path className="map-road-casing" d={r.d} />
          <path className="map-road" d={r.d} />
        </g>
      ))}
      {roads.map((r) => (
        <g
          key={r.id}
          className="map-shield"
          transform={`translate(${r.at[0]} ${r.at[1]})`}
          aria-hidden="true"
        >
          <rect
            x={r.label.length > 1 ? -13 : -10}
            y="-9"
            width={r.label.length > 1 ? 26 : 20}
            height="18"
            rx="4"
          />
          <text y="4.5" textAnchor="middle">
            {r.label}
          </text>
        </g>
      ))}

      {showRoute && (
        <g className="map-route">
          <line x1={from.map.x} y1={from.map.y} x2={to.map.x} y2={to.map.y} />
          <text
            x={(from.map.x + to.map.x) / 2 + 10}
            y={(from.map.y + to.map.y) / 2 - 8}
          >
            {routeMiles(from.id, to.id)} mi by road
          </text>
        </g>
      )}

      {stations.map((s) => {
        const on = active.includes(s.id);
        const pin = (
          <>
            <circle className="map-dot" cx={s.map.x} cy={s.map.y} r="5" />
            <line
              className="map-stalk"
              x1={s.map.x}
              x2={s.map.x}
              y1={s.map.y - 5}
              y2={s.map.y - 14}
            />
            <rect
              className="map-sign"
              x={s.map.x - 22}
              y={s.map.y - 34}
              width="44"
              height="20"
              rx="4"
            />
            <text
              className="map-code"
              x={s.map.x}
              y={s.map.y - 19.5}
              textAnchor="middle"
            >
              {s.code}
            </text>
          </>
        );
        const common = { className: "map-pin", "data-on": on ? "" : undefined };
        if (links)
          return (
            <a
              key={s.id}
              {...common}
              href={`#/locations/${s.id}`}
              aria-label={`${s.name} station`}
            >
              {pin}
            </a>
          );
        if (onPick)
          return (
            <g
              key={s.id}
              {...common}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={s.name}
              onClick={() => onPick(s.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPick(s.id);
                }
              }}
            >
              {pin}
            </g>
          );
        return (
          <g key={s.id} {...common} aria-label={s.name}>
            {pin}
          </g>
        );
      })}

      <g
        className="map-scale"
        transform="translate(470 370)"
        aria-hidden="true"
      >
        <line x1="0" x2="80" y1="0" y2="0" />
        <line x1="0" x2="0" y1="-4" y2="4" />
        <line x1="80" x2="80" y1="-4" y2="4" />
        <text x="40" y="-8" textAnchor="middle">
          20 mi
        </text>
      </g>
    </svg>
  );
}
