import type { Seat } from "../lib/house";

const W = 360;
const H = 220;
const pts = (p: number[][]) => p.map((q) => q.join(",")).join(" ");

/**
 * An approximate view of the stage from one seat: the proscenium shrinks with distance,
 * slides with the seat's position across the row, and the mezzanine looks down on more of the stage floor.
 */
export function SightLine({
  seat,
  label,
}: {
  seat: Seat | null;
  label: string;
}) {
  const depth = seat?.depth ?? 4;
  const across = seat?.across ?? 0;
  const up = seat?.elevated ?? false;
  const scale = 1 / (1 + depth * 0.11);
  const ow = 300 * scale;
  const oh = 170 * scale;
  const cx = W / 2 - across * 70 * scale;
  const cy = up ? 112 : 92;
  const [l, r, t, b] = [cx - ow / 2, cx + ow / 2, cy - oh / 2, cy + oh / 2];
  // Vanishing point: high seats look down on the floor, low seats barely see it.
  const vx = cx + across * ow * 0.3;
  const vy = up ? t + oh * 0.1 : b - oh * (0.16 + depth * 0.015);
  const back = (x: number, y: number) => [
    vx + (x - vx) * 0.62,
    vy + (y - vy) * 0.62,
  ];
  const [btl, btr, bbr, bbl] = [back(l, t), back(r, t), back(r, b), back(l, b)];
  const arch = t + oh * 0.14;
  const partialSide = seat?.zone === "partial" ? Math.sign(across) : 0;

  return (
    <svg
      className="sightline"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
    >
      <rect className="sl-house" width={W} height={H} />
      <g key={seat?.id ?? "default"} className="sl-scene">
        <polygon className="sl-wall" points={pts([[l, t], btl, bbl, [l, b]])} />
        <polygon className="sl-wall" points={pts([[r, t], btr, bbr, [r, b]])} />
        <polygon className="sl-back" points={pts([btl, btr, bbr, bbl])} />
        <polygon
          className="sl-floor"
          points={pts([[l, b], [r, b], bbr, bbl])}
        />
        <ellipse
          className="sl-spot"
          cx={(vx + cx) / 2}
          cy={(b + bbl[1]) / 2}
          rx={ow * 0.14}
          ry={Math.max(3, (b - bbl[1]) * 0.32)}
        />
        <polygon
          className="sl-drape"
          points={pts([
            [l, t],
            [l + ow * 0.1, t],
            [l + ow * 0.05, b],
            [l, b],
          ])}
        />
        <polygon
          className="sl-drape"
          points={pts([
            [r, t],
            [r - ow * 0.1, t],
            [r - ow * 0.05, b],
            [r, b],
          ])}
        />
        <path
          className="sl-frame"
          fillRule="evenodd"
          d={`M0 0H${W}V${H}H0Z M${l} ${b} V${arch} Q${cx} ${t - oh * 0.14} ${r} ${arch} V${b} Z`}
        />
        <path
          className="sl-arch"
          d={`M${l} ${b} V${arch} Q${cx} ${t - oh * 0.14} ${r} ${arch} V${b}`}
        />
        <rect
          className="sl-apron"
          x={l - 14 * scale}
          y={b}
          width={ow + 28 * scale}
          height={up ? 16 * scale : 5 * scale}
        />
        {partialSide !== 0 && (
          // The near side of the proscenium hides a slice of the stage from the outermost mezzanine seats.
          <g className="sl-block">
            <rect
              x={partialSide < 0 ? l - 16 * scale : r - ow * 0.24}
              y={t - oh * 0.3}
              width={ow * 0.24 + 16 * scale}
              height={oh * 1.3 + 20 * scale}
            />
            <line
              x1={partialSide < 0 ? l + ow * 0.24 : r - ow * 0.24}
              x2={partialSide < 0 ? l + ow * 0.24 : r - ow * 0.24}
              y1={t - oh * 0.3}
              y2={b + 20 * scale}
            />
          </g>
        )}
        {up ? (
          <g className="sl-rail">
            <rect x={0} y={194} width={W} height={26} />
            <line x1={0} x2={W} y1={194} y2={194} />
          </g>
        ) : (
          depth > 0 &&
          Array.from({ length: 7 }, (_, i) => (
            <circle
              key={i}
              className="sl-head"
              cx={i * 62 - 6 + ((across * 31) % 31)}
              cy={H + 6}
              r={24 + Math.max(0, 6 - depth)}
            />
          ))
        )}
      </g>
    </svg>
  );
}
