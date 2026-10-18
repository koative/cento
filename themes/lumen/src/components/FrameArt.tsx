import { useId, type SVGProps } from "react";
import type { Colour, Frame, Shape } from "../content";

/*
 * Front view of a frame in a 320 × 130 box. Each shape defines the left lens (the wearer's right);
 * the other lens is the same path mirrored around x = 160. The lens box spans roughly x 36–146.
 */
const lenses: Record<Shape, { d: string; hinge: [number, number] }> = {
  round: { d: "M46 64a46 46 0 1 0 92 0a46 46 0 1 0-92 0Z", hinge: [47, 52] },
  oval: { d: "M38 64a54 37 0 1 0 108 0a54 37 0 1 0-108 0Z", hinge: [40, 54] },
  panto: {
    d: "M42 40Q44 24 92 24Q140 24 142 40C146 80 124 104 92 104C60 104 38 80 42 40Z",
    hinge: [42, 38],
  },
  square: {
    d: "M56 24H128Q144 24 144 40V86Q144 102 128 102H56Q40 102 40 86V40Q40 24 56 24Z",
    hinge: [40, 38],
  },
  rectangle: {
    d: "M50 32H134Q148 32 148 46V80Q148 96 132 96H52Q36 96 36 80V46Q36 32 50 32Z",
    hinge: [36, 44],
  },
  "cat-eye": {
    d: "M32 28Q62 22 122 28Q146 30 144 52Q140 96 98 100Q56 102 44 74Q36 52 32 28Z",
    hinge: [33, 32],
  },
  aviator: {
    d: "M38 30Q92 20 146 30Q149 62 122 90Q98 110 66 106Q34 100 35 60Q35 42 38 30Z",
    hinge: [38, 32],
  },
  hexagon: { d: "M60 24H124L146 64L124 104H60L38 64Z", hinge: [46, 48] },
  browline: {
    d: "M48 34H136Q146 34 146 46Q146 98 96 100Q42 100 38 50Q38 34 48 34Z",
    hinge: [38, 40],
  },
};

type Props = {
  frame: Frame;
  colour: Colour;
  /** Accessible name; omit to mark the drawing decorative. */
  label?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox">;

export function FrameArt({ frame, colour, label, ...svg }: Props) {
  const id = useId().replace(/:/g, "");
  const { d, hinge } = lenses[frame.shape];
  const metal = colour.finish === "metal";
  const rimWidth = metal
    ? 3.6
    : frame.shape === "browline"
      ? 2.4
      : frame.material === "Acetate" && frame.weight > 25
        ? 11
        : 8.5;
  const rim = colour.finish === "tortoise" ? `url(#t${id})` : colour.rim;
  const lensFill = colour.lens ?? "#ffffff";
  const lensOpacity = colour.lens ? 0.86 : 0.32;
  const mirror = "matrix(-1 0 0 1 320 0)";
  const wire = colour.wire ?? colour.rim;

  const half = (
    <>
      <path d={d} fill={lensFill} fillOpacity={lensOpacity} />
      {colour.lens && <path d={d} fill={`url(#g${id})`} />}
      <path
        className="frame-glint"
        d={`M${hinge[0] + 22} ${hinge[1] + 6}l26-14`}
      />
      <path
        d={d}
        fill="none"
        stroke={frame.shape === "browline" ? wire : rim}
        strokeOpacity={colour.finish === "clear" ? 0.62 : 1}
        strokeWidth={rimWidth}
        strokeLinejoin="round"
      />
      {frame.shape === "browline" && (
        <path
          d="M37 50Q36 30 52 30H134Q148 30 148 46"
          fill="none"
          stroke={rim}
          strokeWidth={13}
          strokeLinecap="round"
        />
      )}
      <path
        d={`M${hinge[0]} ${hinge[1]}H${hinge[0] - 26}`}
        stroke={rim}
        strokeOpacity={colour.finish === "clear" ? 0.7 : 1}
        strokeWidth={metal ? 4 : 9}
        strokeLinecap="round"
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 320 130"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...svg}
    >
      <defs>
        <pattern
          id={`t${id}`}
          width="26"
          height="22"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <rect width="26" height="22" fill={colour.rim} />
          <ellipse
            cx="7"
            cy="6"
            rx="6"
            ry="3.5"
            fill="#2e1709"
            fillOpacity="0.75"
          />
          <ellipse
            cx="19"
            cy="15"
            rx="5"
            ry="3"
            fill="#a8672c"
            fillOpacity="0.8"
          />
          <ellipse
            cx="22"
            cy="4"
            rx="2.5"
            ry="1.6"
            fill="#2e1709"
            fillOpacity="0.6"
          />
        </pattern>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {half}
      <g transform={mirror}>{half}</g>
      {frame.shape === "aviator" && (
        <path
          d="M138 32Q160 26 182 32"
          fill="none"
          stroke={rim}
          strokeWidth={3.2}
        />
      )}
      <path
        d={
          metal
            ? "M142 50Q160 38 178 50"
            : frame.shape === "browline"
              ? "M146 46Q160 36 174 46"
              : "M140 50Q160 34 180 50"
        }
        fill="none"
        stroke={frame.shape === "browline" ? wire : rim}
        strokeOpacity={colour.finish === "clear" ? 0.7 : 1}
        strokeWidth={metal ? 3.4 : frame.shape === "browline" ? 2.6 : rimWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
