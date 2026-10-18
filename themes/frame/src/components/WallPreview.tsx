import {
  framings,
  sizes,
  type Frame,
  type FramingId,
  type SizeId,
} from "../content";

/* Everything is drawn in inches: a 12½ ft wall, a standard 84 in sofa, the print centred at gallery height. */
const WALL = { w: 150, h: 100 };
const CENTRE_Y = WALL.h - 60;
const MAT = 3;
const MOULDING = 1.25;

export function WallPreview({
  frame,
  size,
  framing,
}: {
  frame: Frame;
  size: SizeId;
  framing: FramingId;
}) {
  const s = sizes.find((x) => x.id === size)!;
  const fr = framings.find((x) => x.id === framing)!;
  const portrait = frame.h > frame.w;
  const pw = portrait ? s.short : s.long;
  const ph = portrait ? s.long : s.short;
  const framed = framing !== "none";
  const border = framed ? MAT + MOULDING : 1;
  const ow = pw + border * 2;
  const oh = ph + border * 2;
  const x = (WALL.w - ow) / 2;
  const y = CENTRE_Y - oh / 2;

  return (
    <figure className="wall">
      <svg
        viewBox={`0 0 ${WALL.w} ${WALL.h}`}
        role="img"
        aria-label={`${s.long} by ${s.short} inch print${framed ? ` in ${fr.label.toLowerCase()} frame` : ""}, shown above an 84 inch sofa for scale`}
      >
        <rect className="wall-surface" width={WALL.w} height={WALL.h} />
        <line
          className="wall-floor"
          x1="0"
          x2={WALL.w}
          y1={WALL.h - 0.5}
          y2={WALL.h - 0.5}
        />
        {framed && <rect x={x} y={y} width={ow} height={oh} fill={fr.colour} />}
        <rect
          className="wall-mat"
          x={x + (framed ? MOULDING : 0)}
          y={y + (framed ? MOULDING : 0)}
          width={ow - (framed ? MOULDING * 2 : 0)}
          height={oh - (framed ? MOULDING * 2 : 0)}
        />
        <image
          href={frame.src}
          x={x + border}
          y={y + border}
          width={pw}
          height={ph}
          preserveAspectRatio="xMidYMid slice"
        />
        <g className="wall-sofa">
          <rect x="33" y="70" width="84" height="16" rx="2" />
          <rect x="30" y="80" width="90" height="14" rx="2" />
          <rect x="34" y="94" width="2.5" height="5.5" />
          <rect x="113.5" y="94" width="2.5" height="5.5" />
        </g>
        <g className="wall-dim">
          <line x1={x} x2={x + ow} y1={y - 3} y2={y - 3} />
          <line x1={x} x2={x} y1={y - 4.5} y2={y - 1.5} />
          <line x1={x + ow} x2={x + ow} y1={y - 4.5} y2={y - 1.5} />
          <text x={WALL.w / 2} y={y - 5}>
            {Math.round(ow)} in
          </text>
        </g>
      </svg>
      <figcaption>
        {framed
          ? `${Math.round(ow)} × ${Math.round(oh)} in framed`
          : `${pw} × ${ph} in print`}
        , shown on a 100 in wall above an 84 in sofa.
      </figcaption>
    </figure>
  );
}
