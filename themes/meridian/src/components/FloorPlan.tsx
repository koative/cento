import { useState } from "react";
import type { Room } from "../content";

const U = 10; // SVG units per foot

const ft = (n: number) => `${n}′`;

/** Measured plan drawn from room rectangles, with a room schedule that highlights each room on hover or focus. */
export function FloorPlan({ rooms, title }: { rooms: Room[]; title: string }) {
  const [hot, setHot] = useState<number | null>(null);
  const width = Math.max(...rooms.map((r) => r.x + r.w)) * U;
  const height = Math.max(...rooms.map((r) => r.y + r.h)) * U;
  const pad = 24;

  return (
    <div className="plan">
      <svg
        viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
        role="img"
        aria-label={`${title}, measured floor plan`}
      >
        {rooms.map((r, i) => {
          const w = r.w * U;
          const h = r.h * U;
          const size = Math.max(9, Math.min(15, w / (r.name.length * 0.62)));
          return (
            <g
              key={r.name}
              data-hot={hot === i || undefined}
              className="plan-room"
            >
              <rect x={r.x * U} y={r.y * U} width={w} height={h} />
              <text
                x={r.x * U + w / 2}
                y={r.y * U + h / 2 - 2}
                textAnchor="middle"
                style={{ fontSize: size }}
              >
                {r.name}
              </text>
              <text
                x={r.x * U + w / 2}
                y={r.y * U + h / 2 + size}
                textAnchor="middle"
                className="plan-dim"
                style={{ fontSize: size * 0.85 }}
              >
                {ft(r.w)} × {ft(r.h)}
              </text>
            </g>
          );
        })}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          className="plan-outline"
        />
      </svg>
      <table className="schedule num">
        <caption className="visually-hidden">Room schedule</caption>
        <thead>
          <tr>
            <th scope="col">Room</th>
            <th scope="col">Size</th>
            <th scope="col">Area</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r, i) => (
            <tr
              key={r.name}
              tabIndex={0}
              data-hot={hot === i || undefined}
              onPointerEnter={() => setHot(i)}
              onPointerLeave={() => setHot(null)}
              onFocus={() => setHot(i)}
              onBlur={() => setHot(null)}
            >
              <th scope="row">{r.name}</th>
              <td>
                {ft(r.w)} × {ft(r.h)}
              </td>
              <td>{(r.w * r.h).toLocaleString("en-US")} sq ft</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
