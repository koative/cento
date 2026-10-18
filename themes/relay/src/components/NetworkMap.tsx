import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { hubs, lanes, type Mode } from "../content";
import { MAP, along, point, polyline, project } from "../lib/geo";

type Props = {
  modes?: Mode[];
  route?: string[];
  /** Share of the route travelled, 0 … 1; the marker eases to it. */
  share?: number;
  selected?: string;
  onSelect?: (code: string) => void;
  labels?: "all" | "route";
  label: string;
  className?: string;
};

/* Labels default to the right of a hub; coastal hubs read better facing the sea, Rotterdam sits above to clear Felixstowe. */
const placement: Record<string, "left" | "top"> = {
  RTM: "top",
  ANR: "left",
  FXT: "left",
  LEH: "left",
  MAD: "left",
};

const ALL: Mode[] = ["road", "rail", "sea", "air"];

function curve(a: [number, number], b: [number, number], bend: number) {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return `M${a[0]},${a[1]} Q${mx - dy * bend},${my + dx * bend} ${b[0]},${b[1]}`;
}

/** Rail runs parallel to road, offset along the normal so both stay readable on shared corridors. */
function offset(a: [number, number], b: [number, number], d: number) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = (-(b[1] - a[1]) / len) * d;
  const ny = ((b[0] - a[0]) / len) * d;
  return `M${a[0] + nx},${a[1] + ny} L${b[0] + nx},${b[1] + ny}`;
}

function useEased(target: number, key: string) {
  const [value, setValue] = useState(0);
  const from = useRef(0);
  const lastKey = useRef(key);
  useEffect(() => {
    if (lastKey.current !== key) {
      from.current = 0;
      lastKey.current = key;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const begin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      const eased = 1 - Math.pow(2, -10 * t);
      const v = begin + (target - begin) * (t === 1 ? 1 : eased);
      from.current = v;
      setValue(v);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, key]);
  return value;
}

export function NetworkMap({
  modes = ALL,
  route,
  share = 0,
  selected,
  onSelect,
  labels = "all",
  label,
  className,
}: Props) {
  const routeKey = route?.join("-") ?? "";
  const t = useEased(route ? share : 0, routeKey);
  const onRoute = new Set(route ?? []);
  const marker = route ? along(route, t) : null;

  // Travelled part: every hub already passed plus the marker itself.
  const travelled: string[] = [];
  if (route && marker) {
    const pts = route.map(point);
    const segs = pts
      .slice(1)
      .map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = segs.reduce((a, b) => a + b, 0);
    let run = 0;
    travelled.push(`${pts[0][0]},${pts[0][1]}`);
    for (let i = 0; i < segs.length; i++) {
      run += segs[i];
      if (run / total <= t) travelled.push(`${pts[i + 1][0]},${pts[i + 1][1]}`);
      else break;
    }
    travelled.push(`${marker[0]},${marker[1]}`);
  }

  const key = (e: KeyboardEvent, code: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(code);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${MAP.w} ${MAP.h}`}
      className={`network-map labels-${labels} ${className ?? ""}`}
      role={onSelect ? "group" : "img"}
      aria-label={label}
    >
      <g className="graticule" aria-hidden="true">
        {[0, 5, 10, 15, 20].map((lon) => {
          const [x] = project(50, lon);
          return (
            <g key={lon}>
              <line x1={x} x2={x} y1={MAP.pad / 2} y2={MAP.h - MAP.pad / 2} />
              <text x={x + 4} y={MAP.h - 10}>
                {lon < 0 ? `${-lon}°W` : `${lon}°E`}
              </text>
            </g>
          );
        })}
        {[40, 45, 50, 55].map((lat) => {
          const [, y] = project(lat, 0);
          return (
            <g key={lat}>
              <line x1={MAP.pad / 2} x2={MAP.w - MAP.pad / 2} y1={y} y2={y} />
              <text x={MAP.w - 12} y={y - 5} textAnchor="end">
                {lat}°N
              </text>
            </g>
          );
        })}
      </g>

      <g className="lanes" aria-hidden="true">
        {lanes
          .filter((l) => modes.includes(l.mode))
          .map((l) => {
            const a = point(l.from);
            const b = point(l.to);
            const d =
              l.mode === "rail"
                ? offset(a, b, 4)
                : l.mode === "sea"
                  ? curve(a, b, 0.18)
                  : l.mode === "air"
                    ? curve(a, b, -0.22)
                    : `M${a[0]},${a[1]} L${b[0]},${b[1]}`;
            return (
              <path
                key={`${l.mode}-${l.from}-${l.to}`}
                d={d}
                className={`lane lane-${l.mode}`}
              />
            );
          })}
      </g>

      {route && (
        <g className="route" aria-hidden="true">
          <polyline
            key={`plan-${routeKey}`}
            points={polyline(route)}
            className="route-plan"
            pathLength={1}
          />
          <polyline points={travelled.join(" ")} className="route-done" />
        </g>
      )}

      <g className="hubs">
        {hubs.map((h) => {
          const [x, y] = project(h.lat, h.lon);
          const isOn = onRoute.has(h.code);
          const showLabel = labels === "all" || isOn;
          const place = placement[h.code];
          const size = h.kind === "Gateway" ? 12 : 9;
          const body = (
            <>
              <rect
                x={x - size / 2}
                y={y - size / 2}
                width={size}
                height={size}
                className="hub-dot"
              />
              {showLabel && (
                <text
                  x={place === "left" ? x - 10 : place === "top" ? x : x + 10}
                  y={place === "top" ? y - 11 : y + 4}
                  textAnchor={
                    place === "left"
                      ? "end"
                      : place === "top"
                        ? "middle"
                        : "start"
                  }
                  className="hub-label"
                >
                  {h.city}
                </text>
              )}
            </>
          );
          const cls = `hub ${isOn ? "is-route" : ""} ${selected === h.code ? "is-selected" : ""}`;
          return onSelect ? (
            <g
              key={h.code}
              className={`${cls} is-button`}
              role="button"
              tabIndex={0}
              aria-pressed={selected === h.code}
              aria-label={`${h.city} ${h.kind.toLowerCase()}`}
              onClick={() => onSelect(h.code)}
              onKeyDown={(e) => key(e, h.code)}
            >
              <circle cx={x} cy={y} r={16} className="hub-hit" />
              {body}
            </g>
          ) : (
            <g key={h.code} className={cls} aria-hidden="true">
              {body}
            </g>
          );
        })}
      </g>

      {marker && (
        <g
          className="marker"
          transform={`translate(${marker[0]},${marker[1]})`}
          aria-hidden="true"
        >
          <circle r="14" className="marker-pulse" />
          <rect x="-8" y="-8" width="16" height="16" className="marker-body" />
          <path
            d="M-3.5 -4 L1 0 L-3.5 4 M1 -4 L5.5 0 L1 4"
            className="marker-glyph"
          />
        </g>
      )}
    </svg>
  );
}
