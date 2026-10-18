import { destinations, type Destination } from "../content";

/* A navigator's plotting sheet: an equirectangular graticule cropped to the
   latitudes we travel in, every destination as a fix, the route as numbered
   arcs. Pure geometry, no coastline data. */
const E = 150,
  N = 72,
  S = -32,
  UNIT = 3,
  LEFT = -132;
const width = (E - LEFT) * UNIT;
const height = (N - S) * UNIT;
const x = (lon: number) => (lon - LEFT) * UNIT;
const y = (lat: number) => (N - lat) * UNIT;

function arc(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const len = Math.hypot(bx - ax, by - ay);
  // Bow every leg to the north, like a great circle on this projection.
  const bow = Math.min(len * 0.22, 60);
  return `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${mx.toFixed(1)} ${(my - bow).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
}

/** Legs longer than half the globe wrap off one edge and in from the other (across the Pacific). */
function legPaths(a: Destination, b: Destination) {
  const d = b.lon - a.lon;
  if (Math.abs(d) <= 180) return [arc(x(a.lon), y(a.lat), x(b.lon), y(b.lat))];
  const shift = d > 0 ? -360 : 360;
  return [
    arc(x(a.lon), y(a.lat), x(b.lon + shift), y(b.lat)),
    arc(x(a.lon - shift), y(a.lat), x(b.lon), y(b.lat)),
  ];
}

type Props = {
  route: Destination[];
  label: string;
  /** Planner mode: every fix becomes a toggle. */
  onToggle?: (d: Destination) => void;
  compact?: boolean;
};

export function RouteMap({ route, label, onToggle, compact }: Props) {
  const order = new Map(route.map((d, i) => [d.slug, i + 1]));
  const meridians = [];
  for (let lon = -120; lon <= E; lon += 15) meridians.push(lon);
  const parallels = [];
  for (let lat = -30; lat <= N; lat += 15) parallels.push(lat);
  const key = route.map((d) => d.slug).join(">");

  return (
    <figure className={`route-map${compact ? " route-map--compact" : ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <rect className="rm-sea" width={width} height={height} />
        <g className="rm-grid">
          {meridians.map((lon) => (
            <line
              key={lon}
              x1={x(lon)}
              x2={x(lon)}
              y1={0}
              y2={height}
              data-major={lon === 0 ? "" : undefined}
            />
          ))}
          {parallels.map((lat) => (
            <line
              key={lat}
              y1={y(lat)}
              y2={y(lat)}
              x1={0}
              x2={width}
              data-major={lat === 0 ? "" : undefined}
            />
          ))}
        </g>
        <g className="rm-ticks" aria-hidden="true">
          {parallels.map((lat) => (
            <text key={lat} x={6} y={y(lat) - 5}>
              {lat === 0 ? "0°" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`}
            </text>
          ))}
          {meridians
            .filter((lon) => lon % 30 === 0)
            .map((lon) => (
              <text key={lon} x={x(lon) + 5} y={height - 8}>
                {lon === 0 ? "0°" : `${Math.abs(lon)}°${lon > 0 ? "E" : "W"}`}
              </text>
            ))}
        </g>
        <g className="rm-route" key={key}>
          {route
            .slice(1)
            .map((d, i) =>
              legPaths(route[i], d).map((p, j) => (
                <path
                  key={`${d.slug}-${j}`}
                  d={p}
                  pathLength={1}
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              )),
            )}
        </g>
        {destinations.map((d) => {
          const n = order.get(d.slug);
          const cx = x(d.lon);
          const cy = y(d.lat);
          const anchor =
            d.chartAt === "left" || cx > width - 140
              ? "end"
              : d.chartAt === "below"
                ? "middle"
                : "start";
          const dx = anchor === "end" ? -16 : anchor === "start" ? 16 : 0;
          const dy = d.chartAt === "below" ? 30 : -8;
          const fix = (
            <>
              {n ? (
                <>
                  <circle className="rm-stop" cx={cx} cy={cy} r={11} />
                  <text className="rm-num" x={cx} y={cy + 4.5}>
                    {n}
                  </text>
                </>
              ) : (
                <circle className="rm-fix" cx={cx} cy={cy} r={5} />
              )}
              <text
                className={`rm-label${n ? " is-on" : ""}`}
                x={cx + dx}
                y={cy + dy}
                textAnchor={anchor}
              >
                {d.chart}
              </text>
            </>
          );
          if (!onToggle) return <g key={d.slug}>{fix}</g>;
          return (
            <g
              key={d.slug}
              className="rm-hit"
              role="button"
              tabIndex={0}
              aria-pressed={!!n}
              aria-label={`${d.name}, ${d.country}${n ? `, stop ${n}. Remove from route` : ". Add to route"}`}
              onClick={() => onToggle(d)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle(d);
                }
              }}
            >
              <circle className="rm-target" cx={cx} cy={cy} r={20} />
              {fix}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
