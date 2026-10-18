import type { Location } from "../content";

/** Schematic map of Eastmere: the canal, the rail line, the docks and our four doors. */
export function CityMap({
  houses,
  active,
}: {
  houses: Location[];
  active?: string;
}) {
  return (
    <svg
      className="city-map"
      viewBox="0 0 640 420"
      role="img"
      aria-label={`Map of Eastmere showing ${houses.map((h) => h.name).join(", ")}`}
    >
      <path
        className="map-water"
        d="M0 250 C120 230 180 270 260 255 S400 300 460 340 L640 360 L640 420 L0 420 Z"
      />
      <path
        className="map-canal"
        d="M0 250 C120 230 180 270 260 255 S400 300 460 340"
      />
      <path
        className="map-rail"
        d="M0 150 L250 150 C330 150 360 120 420 120 L640 120"
      />
      <path
        className="map-road"
        d="M120 0 V420 M0 330 H640 M340 0 L380 420 M560 0 L520 420"
      />
      <text className="map-note" x="16" y="140">
        RAIL
      </text>
      <text className="map-note" x="20" y="285">
        CANAL
      </text>
      <text className="map-note" x="624" y="400" textAnchor="end">
        OLD DOCKS
      </text>
      {houses.map((h) => {
        const [x, y] = h.pin;
        const on = h.id === active;
        return (
          <g
            key={h.id}
            className="map-pin"
            data-on={on ? "" : undefined}
            transform={`translate(${x} ${y})`}
          >
            <rect x="-11" y="-11" width="22" height="22" rx="4" />
            <text
              x={x > 450 ? -18 : 18}
              y="5"
              textAnchor={x > 450 ? "end" : "start"}
            >
              {h.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
