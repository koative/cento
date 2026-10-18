import type { Colour, FaceShape, Frame } from "../content";
import { FrameArt } from "./FrameArt";

/* Geometric face outlines in a 240 × 300 box, eye line at y = 128. */
const outlines: Record<FaceShape, string> = {
  oval: "M38 150a82 120 0 1 0 164 0a82 120 0 1 0-164 0Z",
  round: "M26 154a94 106 0 1 0 188 0a94 106 0 1 0-188 0Z",
  square:
    "M38 66Q38 34 72 32H168Q202 34 202 66V210L178 254Q120 274 62 254L38 210Z",
  heart:
    "M28 100Q28 30 120 30Q212 30 212 100Q208 178 162 234Q138 266 120 270Q102 266 78 234Q32 178 28 100Z",
  diamond:
    "M120 26Q168 28 182 80Q212 140 196 182Q172 248 120 272Q68 248 44 182Q28 140 58 80Q72 28 120 26Z",
  oblong:
    "M52 82Q52 20 120 20Q188 20 188 82V214Q188 282 120 284Q52 282 52 214Z",
};

type Props = {
  face: FaceShape;
  frame?: Frame;
  colour?: Colour;
  label: string;
  className?: string;
};

export function FaceOutline({ face, frame, colour, label, className }: Props) {
  return (
    <svg
      viewBox="0 0 240 300"
      role="img"
      aria-label={label}
      className={className}
    >
      <path className="face-guide" d="M120 6V294M10 128H230" />
      <path className="face-line" d={outlines[face]} />
      {frame && colour && (
        <g className="face-frame" key={frame.id + colour.code}>
          <FrameArt
            frame={frame}
            colour={colour}
            x="22"
            y="89"
            width="196"
            height="80"
          />
        </g>
      )}
    </svg>
  );
}
