import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { issueTypes, map, stages, type Report, type WardId } from "../content";

type Point = { x: number; y: number };

type Props = {
  label: string;
  pin?: Point | null;
  /** Makes the map a pin picker: click/tap, or arrow keys when focused. */
  onPick?: (p: Point) => void;
  reports?: Report[];
  ward?: WardId | null;
  showWards?: boolean;
  className?: string;
};

const LAND = { minX: 20, maxX: 940, minY: 20, maxY: 500 };
const clamp = (p: Point) => ({
  x: Math.round(Math.min(LAND.maxX, Math.max(LAND.minX, p.x))),
  y: Math.round(Math.min(LAND.maxY, Math.max(LAND.minY, p.y))),
});

const wardRects: Record<WardId, [number, number, number, number]> = {
  1: [0, 0, map.wardSplit.x, map.wardSplit.y],
  2: [map.wardSplit.x, 0, map.width - map.wardSplit.x, map.wardSplit.y],
  3: [0, map.wardSplit.y, map.wardSplit.x, map.height - map.wardSplit.y],
  4: [
    map.wardSplit.x,
    map.wardSplit.y,
    map.width - map.wardSplit.x,
    map.height - map.wardSplit.y,
  ],
};

export function CityMap({
  label,
  pin,
  onPick,
  reports = [],
  ward,
  showWards,
  className = "",
}: Props) {
  const svg = useRef<SVGSVGElement>(null);

  function pick(e: PointerEvent<SVGSVGElement>) {
    const el = svg.current;
    const ctm = el?.getScreenCTM();
    if (!onPick || !el || !ctm) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    onPick(clamp(p));
  }

  function nudge(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 48 : 12;
    const d = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }[e.key];
    if (!onPick || !d) return;
    e.preventDefault();
    const from = pin ?? { x: map.width / 2, y: map.wardSplit.y };
    onPick(clamp({ x: from.x + d[0], y: from.y + d[1] }));
  }

  const blocksX = [0, ...map.avenues.map((a) => a.x), map.width];
  const blocksY = [0, ...map.streets.map((s) => s.y), 520];

  return (
    <div
      className={"city-map " + className}
      data-picker={onPick ? "" : undefined}
      {...(onPick
        ? {
            tabIndex: 0,
            role: "group",
            "aria-label": label,
            "aria-describedby": "map-keys",
            onKeyDown: nudge,
          }
        : { role: "img", "aria-label": label })}
    >
      <svg
        ref={svg}
        viewBox={`0 0 ${map.width} ${map.height}`}
        onPointerDown={onPick ? pick : undefined}
        aria-hidden="true"
      >
        <rect width={map.width} height={map.height} className="map-land" />
        {blocksY
          .slice(0, -1)
          .map((y, j) =>
            blocksX
              .slice(0, -1)
              .map((x, i) => (
                <rect
                  key={`${i}-${j}`}
                  x={x + 9}
                  y={y + 9}
                  width={blocksX[i + 1] - x - 18}
                  height={blocksY[j + 1] - y - 18}
                  rx="3"
                  className="map-block"
                />
              )),
          )}
        <rect
          x={map.park.x}
          y={map.park.y}
          width={map.park.w}
          height={map.park.h}
          rx="3"
          className="map-park"
        />
        <path
          d="M0 528 C 190 500, 380 566, 560 532 S 860 498, 960 522 L960 600 L0 600Z"
          className="map-river"
        />
        {map.streets.map((s) => (
          <line
            key={s.name}
            x1="0"
            x2={map.width}
            y1={s.y}
            y2={s.y}
            className="map-street"
          />
        ))}
        {map.avenues.map((a) => (
          <line
            key={a.name}
            x1={a.x}
            x2={a.x}
            y1="0"
            y2="512"
            className="map-street"
          />
        ))}
        {showWards &&
          ([1, 2, 3, 4] as WardId[]).map((w) => {
            const [x, y, wd, h] = wardRects[w];
            return (
              <g
                key={w}
                className="map-ward"
                data-on={ward === w ? "" : undefined}
              >
                <rect x={x} y={y} width={wd} height={Math.min(h, 520 - y)} />
                <text
                  x={x + wd / 2}
                  y={y + Math.min(h, 520 - y) / 2 + 12}
                  textAnchor="middle"
                >
                  Ward {w}
                </text>
              </g>
            );
          })}
        {showWards && (
          <path
            d={`M${map.wardSplit.x} 0 V520 M0 ${map.wardSplit.y} H${map.width}`}
            className="map-boundary"
          />
        )}
        {map.streets.map((s) => (
          <text key={s.name} x="16" y={s.y - 8} className="map-label">
            {s.name}
          </text>
        ))}
        {map.avenues.map((a) => (
          <text key={a.name} x={a.x + 8} y="22" className="map-label">
            {a.name}
          </text>
        ))}
        <text
          x={map.park.x + map.park.w / 2}
          y={map.park.y + map.park.h / 2 + 5}
          textAnchor="middle"
          className="map-label map-label-park"
        >
          {map.park.name}
        </text>
        <text x="760" y="572" className="map-label map-label-river">
          {map.river}
        </text>
        {map.landmarks.map((l) => (
          <g key={l.name} className="map-landmark">
            <rect x={l.x - 7} y={l.y - 7} width="14" height="14" rx="2" />
            <text x={l.x + 12} y={l.y + 5}>
              {l.name}
            </text>
          </g>
        ))}
        {reports.map((r) => (
          <circle
            key={r.ref}
            cx={r.x}
            cy={r.y}
            r="9"
            className="map-report"
            data-stage={r.stage === stages.length - 1 ? "fixed" : "open"}
          >
            <title>
              {r.ref}: {issueTypes.find((t) => t.id === r.type)?.label},{" "}
              {stages[r.stage]}
            </title>
          </circle>
        ))}
        {pin && (
          <g
            transform={`translate(${pin.x} ${pin.y})`}
            className="map-pin"
            key={`${pin.x}-${pin.y}`}
          >
            <circle r="22" className="map-pin-ring" />
            <g className="map-pin-drop">
              <path d="M0 0 C -4 -10, -16 -20, -16 -32 A16 16 0 1 1 16 -32 C 16 -20, 4 -10, 0 0Z" />
              <circle cy="-32" r="6" />
            </g>
          </g>
        )}
      </svg>
      {onPick && (
        <p className="map-keys" id="map-keys">
          Tap the map to place the pin. With a keyboard, focus the map and use
          the arrow keys (Shift for bigger steps).
        </p>
      )}
    </div>
  );
}
