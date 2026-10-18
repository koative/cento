import { useId } from "react";
import { circuits, type Problem, type Wall } from "../content";
import { holdShapes, holdsFor, lineThrough, WALL_H, WALL_W } from "../lib/wall";

type Props = {
  wall: Wall;
  problems: Problem[];
  selected?: Problem;
  /** Highlighted hold on the selected problem. */
  step?: number;
  onSelect?: (id: string) => void;
  className?: string;
};

const color = (p: Problem) => circuits.find((c) => c.id === p.circuit)!;

/** Elevation of one wall: plywood panels, T-nut grid, volumes and every problem's holds. */
export function WallView({
  wall,
  problems,
  selected,
  step,
  onSelect,
  className = "",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const face = `face-${uid}`;
  const nuts = `nuts-${uid}`;
  const label = selected
    ? `${wall.name}, ${wall.angle}. ${selected.name}, ${color(selected).label} ${selected.grade}, highlighted among ${problems.length} problems.`
    : `${wall.name}, ${wall.angle}, showing ${problems.length} problems.`;

  return (
    <svg
      className={`wall-view ${className}`}
      viewBox={`0 0 ${WALL_W} ${WALL_H}`}
      role="img"
      aria-label={label}
      data-has-selection={selected ? "" : undefined}
    >
      <defs>
        <clipPath id={face}>
          <path d={wall.outline} />
        </clipPath>
        <pattern id={nuts} width="25" height="25" patternUnits="userSpaceOnUse">
          <circle cx="12.5" cy="12.5" r="1.7" className="wall-nut" />
        </pattern>
      </defs>
      <g clipPath={`url(#${face})`}>
        <path d={wall.outline} className="wall-face" />
        <rect width={WALL_W} height={WALL_H} fill={`url(#${nuts})`} />
        {[160, 320, 480, 640].map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1="0"
            y2={WALL_H}
            className="wall-seam"
          />
        ))}
        <line x1="0" x2={WALL_W} y1="230" y2="230" className="wall-seam" />
        {wall.volumes.map((v) => (
          <polygon key={v} points={v} className="wall-volume" />
        ))}
        <rect y="392" width={WALL_W} height="28" className="wall-kick" />
      </g>
      <path d={wall.outline} className="wall-edge" />

      {[...problems]
        .sort(
          (a, b) =>
            Number(a.id === selected?.id) - Number(b.id === selected?.id),
        )
        .map((p) => {
          const c = color(p);
          const holds = holdsFor(p, wall.top);
          const on = selected?.id === p.id;
          return (
            <g
              key={p.id}
              className="problem"
              data-on={on ? "" : undefined}
              onClick={onSelect && (() => onSelect(p.id))}
            >
              {on && (
                <path
                  key={`line-${p.id}`}
                  d={lineThrough(holds)}
                  pathLength={1}
                  className="problem-line"
                />
              )}
              {holds.map((h, i) => (
                <path
                  key={i}
                  d={holdShapes[h.shape]}
                  transform={`translate(${h.x.toFixed(1)} ${h.y.toFixed(1)}) rotate(${h.rot}) scale(${h.scale.toFixed(2)})`}
                  fill={c.color}
                  className="hold"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
              {on && (
                <>
                  <g
                    transform={`translate(${holds[0].x.toFixed(1)} ${(holds[0].y + 22).toFixed(1)})`}
                    className="tape"
                  >
                    <rect
                      x="-20"
                      y="-9"
                      width="40"
                      height="18"
                      rx="2"
                      fill={c.color}
                    />
                    <text y="4.5" textAnchor="middle" fill={c.on}>
                      {p.grade}
                    </text>
                  </g>
                  <g
                    transform={`translate(${holds[holds.length - 1].x.toFixed(1)} ${(holds[holds.length - 1].y - 24).toFixed(1)})`}
                    className="tape"
                  >
                    <rect
                      x="-18"
                      y="-9"
                      width="36"
                      height="18"
                      rx="2"
                      fill={c.color}
                    />
                    <text y="4.5" textAnchor="middle" fill={c.on}>
                      TOP
                    </text>
                  </g>
                  {step !== undefined && holds[step] && (
                    <circle
                      key={step}
                      cx={holds[step].x}
                      cy={holds[step].y}
                      r="22"
                      className="step-ring"
                    />
                  )}
                </>
              )}
            </g>
          );
        })}
    </svg>
  );
}
