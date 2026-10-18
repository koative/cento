import { useId, useState } from "react";
import type { Piece } from "../content";
import { inches, throughDoor } from "../lib/fit";

type Box = { x: number; y: number; w: number; h: number };

/** A rect drawn as a unit square under a transform, so size changes animate in CSS. */
function MovingRect({ box, className }: { box: Box; className: string }) {
  return (
    <rect
      className={className}
      width="1"
      height="1"
      vectorEffect="non-scaling-stroke"
      style={{
        transform: `translate(${box.x}px, ${box.y}px) scale(${box.w}, ${box.h})`,
      }}
    />
  );
}

const FLOOR = 292;
const clamp = (raw: string, lo: number, hi: number) => {
  const n = parseFloat(raw);
  return Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));
};

export function FitCheck({
  piece,
  title = "Will it fit?",
}: {
  piece: Piece;
  title?: string;
}) {
  const id = useId();
  const [door, setDoor] = useState({ w: "32", h: "80" });
  const [wall, setWall] = useState("96");
  const dw = clamp(door.w, 18, 72);
  const dh = clamp(door.h, 60, 108);
  const ww = clamp(wall, 24, 240);
  const { w, d, h } = piece.dims;

  const result = throughDoor(
    piece.dims,
    { w: dw, h: dh },
    piece.splits?.largest,
  );
  const shown = result ? result.way : { across: d, tall: h };
  const s = Math.min(
    240 / Math.max(dh, h, shown.tall),
    250 / Math.max(ww, w),
    220 / Math.max(dw, shown.across),
  );
  const leftover = (ww - w) / 2;

  const doorBox: Box = {
    x: 160 - (dw * s) / 2,
    y: FLOOR - dh * s,
    w: dw * s,
    h: dh * s,
  };
  const crossBox: Box = {
    x: 160 - (shown.across * s) / 2,
    y: FLOOR - shown.tall * s,
    w: shown.across * s,
    h: shown.tall * s,
  };
  const wallStart = 480 - (ww * s) / 2;
  const frontBox: Box = {
    x: 480 - (w * s) / 2,
    y: FLOOR - h * s,
    w: w * s,
    h: h * s,
  };

  const spare =
    result &&
    (result.spare < 1
      ? "under an inch to spare — take the door off its hinges first"
      : `${inches(result.spare)} to spare`);
  const doorVerdict = !result
    ? `Too big for a ${inches(dw)} × ${inches(dh)} opening, even in parts. Call us — some legs and tops can come off.`
    : result.parts
      ? `Fits in parts — the ${piece.splits?.note}. The largest part goes through ${result.way.label}, with ${spare}.`
      : `Goes through ${result.way.label}, with ${spare}.`;
  const wallVerdict =
    leftover >= 0
      ? `On your wall it leaves ${inches(leftover)} either side.`
      : `It is ${inches(-leftover * 2)} wider than that wall.`;

  const number = (
    label: string,
    value: string,
    set: (v: string) => void,
    min: number,
    max: number,
  ) => (
    <div className="fit-input">
      <label htmlFor={id + label.replaceAll(" ", "-")}>{label}</label>
      <span className="fit-input-box">
        <input
          id={id + label.replaceAll(" ", "-")}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={0.5}
          value={value}
          onChange={(e) => set(e.currentTarget.value)}
        />
        <span aria-hidden="true">in</span>
      </span>
    </div>
  );

  return (
    <section className="fit" aria-labelledby={id + "h"}>
      <div className="fit-copy">
        <h2 id={id + "h"}>{title}</h2>
        <p>
          Measure the narrowest doorway on the way in and the wall it will stand
          against. The drawing is to scale: this piece is {inches(w)} wide,{" "}
          {inches(d)} deep and {inches(h)} high
          {piece.splits
            ? `, and it comes apart — the ${piece.splits.note}`
            : ""}
          .
        </p>
        <div className="fit-inputs">
          {number(
            "Doorway width",
            door.w,
            (n) => setDoor({ ...door, w: n }),
            18,
            72,
          )}
          {number(
            "Doorway height",
            door.h,
            (n) => setDoor({ ...door, h: n }),
            60,
            108,
          )}
          {number("Wall width", wall, setWall, 24, 240)}
        </div>
        <div
          className="fit-verdict"
          aria-live="polite"
          data-ok={result ? "" : undefined}
        >
          <p>{doorVerdict}</p>
          <p>{wallVerdict}</p>
        </div>
      </div>
      <svg
        className="fit-drawing"
        viewBox="0 0 640 330"
        role="img"
        aria-label={`Scale drawing. ${doorVerdict} ${wallVerdict}`}
      >
        <line className="fit-floor" x1="16" x2="624" y1={FLOOR} y2={FLOOR} />
        <MovingRect className="fit-door" box={doorBox} />
        <MovingRect
          className={result ? "fit-piece" : "fit-piece fit-piece-bad"}
          box={crossBox}
        />
        <text
          className="fit-label"
          x="160"
          y={Math.max(14, doorBox.y - 10)}
          textAnchor="middle"
        >
          doorway {inches(dw)} × {inches(dh)}
        </text>
        <text
          className="fit-caption"
          x="160"
          y={FLOOR + 26}
          textAnchor="middle"
        >
          {result ? result.way.label : "upright"}
        </text>

        <line
          className="fit-wall"
          x1={wallStart}
          x2={wallStart + ww * s}
          y1={FLOOR - 1}
          y2={FLOOR - 1}
        />
        <line
          className="fit-wall-end"
          x1={wallStart}
          x2={wallStart}
          y1={FLOOR}
          y2={FLOOR - 250}
        />
        <line
          className="fit-wall-end"
          x1={wallStart + ww * s}
          x2={wallStart + ww * s}
          y1={FLOOR}
          y2={FLOOR - 250}
        />
        <MovingRect
          className={leftover >= 0 ? "fit-piece" : "fit-piece fit-piece-bad"}
          box={frontBox}
        />
        <text
          className="fit-label"
          x="480"
          y={Math.max(14, frontBox.y - 10)}
          textAnchor="middle"
        >
          {inches(w)} × {inches(h)}
        </text>
        <text
          className="fit-caption"
          x="480"
          y={FLOOR + 26}
          textAnchor="middle"
        >
          wall {inches(ww)}
        </text>
      </svg>
    </section>
  );
}
