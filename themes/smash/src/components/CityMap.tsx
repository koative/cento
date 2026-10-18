import { locations } from "../content";

const streets = [
  "M0 60 H600",
  "M0 168 L600 150",
  "M0 300 L600 330",
  "M90 0 L130 400",
  "M252 0 V400",
  "M418 0 L400 400",
  "M520 0 L560 400",
  "M0 230 L600 214",
];

/** A schematic of the town: the river, the main streets and a pin for every counter. */
export function CityMap({ active }: { active?: string }) {
  return (
    <svg
      className="city-map"
      viewBox="0 0 600 400"
      role="img"
      aria-label={`Map of our counters: ${locations.map((l) => l.name).join(", ")}`}
    >
      <rect width="600" height="400" fill="var(--map-land)" />
      <path
        d="M380 0 h90 v90 h-90z M30 330 h80 v50 h-80z"
        fill="var(--map-park)"
      />
      {streets.map((d) => (
        <path
          key={d}
          d={d}
          stroke="var(--map-street)"
          strokeWidth="9"
          fill="none"
        />
      ))}
      <path
        d="M-20 110 C120 130 180 250 300 262 S500 300 620 380"
        stroke="var(--map-water)"
        strokeWidth="38"
        fill="none"
      />
      <text
        x="470"
        y="318"
        className="map-river"
        transform="rotate(14 470 318)"
      >
        Willow River
      </text>
      {locations.map((l) => {
        const on = !active || active === l.id;
        const [x, y] = l.pin;
        return (
          <g
            key={l.id}
            className="map-pin"
            data-on={on ? "" : undefined}
            transform={`translate(${x} ${y})`}
          >
            <path d="M0 0 C-14 -16 -16 -24 -16 -30 A16 16 0 1 1 16 -30 C16 -24 14 -16 0 0 Z" />
            <circle cx="0" cy="-30" r="6" />
            <text x="22" y="-24">
              {l.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
