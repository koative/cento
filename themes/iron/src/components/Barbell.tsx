import { useId } from "react";
import { BAR, plateSet, platesPerSide } from "../lib";

const thickness: Record<number, number> = {
  55: 34,
  45: 30,
  35: 26,
  25: 22,
  10: 16,
  5: 12,
  2.5: 9,
};
const height = (lb: number) => (lb >= 10 ? 200 : lb === 5 ? 104 : 84);
const color = (lb: number) => plateSet.find((p) => p.lb === lb)!.color;

/** A loaded bar: the plates slide on from the sleeve ends when the load changes. */
export function Barbell({ weight }: { weight: number }) {
  const knurl = useId();
  const side = platesPerSide(weight);
  const sideLoad = side.reduce((a, b) => a + b, 0);

  // Collars end at x = 290 and 670; plates stack outwards from them with a 2px gap.
  let left = 290;
  let right = 670;
  const plates = side.map((lb, i) => {
    const w = thickness[lb];
    const h = height(lb);
    const l = { x: left - w, w, h, lb, i };
    const r = { x: right, w, h, lb, i };
    left -= w + 2;
    right += w + 2;
    return { l, r };
  });

  return (
    <figure className="barbell">
      <svg
        viewBox="0 0 960 240"
        role="img"
        aria-label={`${weight} lb: a ${BAR} lb bar${side.length ? ` with ${side.join(", ")} lb on each side` : ", no plates"}`}
      >
        <defs>
          <pattern
            id={knurl}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="5" height="5" fill="var(--steel)" />
            <rect
              width="2"
              height="5"
              fill="var(--steel-light)"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect
          x="20"
          y="109"
          width="270"
          height="22"
          rx="3"
          fill="var(--steel-light)"
        />
        <rect
          x="670"
          y="109"
          width="270"
          height="22"
          rx="3"
          fill="var(--steel-light)"
        />
        <rect x="300" y="114" width="360" height="12" fill="var(--steel)" />
        <rect x="380" y="114" width="200" height="12" fill={`url(#${knurl})`} />
        <rect
          x="290"
          y="100"
          width="12"
          height="40"
          rx="2"
          fill="var(--steel-light)"
        />
        <rect
          x="658"
          y="100"
          width="12"
          height="40"
          rx="2"
          fill="var(--steel-light)"
        />
        {plates.map(({ l, r }) => (
          <g
            key={`${l.i}-${l.lb}`}
            className="plate"
            style={{ ["--d" as string]: `${l.i * 45}ms` }}
          >
            <rect
              className="plate-l"
              x={l.x}
              y={120 - l.h / 2}
              width={l.w}
              height={l.h}
              rx="5"
              fill={color(l.lb)}
            />
            <rect
              className="plate-r"
              x={r.x}
              y={120 - r.h / 2}
              width={r.w}
              height={r.h}
              rx="5"
              fill={color(r.lb)}
            />
          </g>
        ))}
      </svg>
      <figcaption>
        <span className="barbell-total">{weight} lb</span>
        <span className="barbell-recipe">
          {BAR} lb bar
          {side.length ? (
            <>
              {` + ${sideLoad} lb a side `}
              <span className="barbell-plates">
                {side.map((lb, i) => (
                  <span
                    key={i}
                    className="plate-chip"
                    style={{ ["--c" as string]: color(lb) }}
                  >
                    {lb}
                  </span>
                ))}
              </span>
            </>
          ) : (
            " — empty bar"
          )}
        </span>
      </figcaption>
    </figure>
  );
}
