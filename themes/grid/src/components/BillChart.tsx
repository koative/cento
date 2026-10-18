import { useId } from "react";
import { months } from "../content";
import { money } from "../lib/energy";

/** Twelve monthly bills before and after, as paired bars. */
export function BillChart({
  before,
  after,
}: {
  before: number[];
  after: number[];
}) {
  const id = useId();
  const top = Math.ceil(Math.max(...before) / 100) * 100;
  const Y = (v: number) => 170 - (v / top) * 150;
  const ticks = Array.from({ length: top / 100 + 1 }, (_, i) => i * 100);
  const totalBefore = before.reduce((a, b) => a + b, 0);
  const totalAfter = after.reduce((a, b) => a + b, 0);

  return (
    <figure className="bill-chart">
      <svg viewBox="0 0 520 196" role="img" aria-labelledby={`${id}-t`}>
        <title
          id={`${id}-t`}
        >{`Monthly bills: ${money(totalBefore)} a year before solar, ${money(totalAfter)} after`}</title>
        {ticks.map((t) => (
          <g key={t}>
            <line x1="40" x2="520" y1={Y(t)} y2={Y(t)} className="tick" />
            <text x="34" y={Y(t) + 4} textAnchor="end" className="axis">
              ${t}
            </text>
          </g>
        ))}
        {months.map((m, i) => {
          const x = 48 + i * 40;
          return (
            <g key={m}>
              <rect
                x={x}
                y={Y(before[i])}
                width="14"
                height={170 - Y(before[i])}
                className="bar-before"
              />
              <rect
                x={x + 16}
                y={Y(after[i])}
                width="14"
                height={170 - Y(after[i])}
                className="bar-after"
              />
              <text x={x + 15} y="190" textAnchor="middle" className="axis">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>
        <span className="key key-before">
          Before: {money(totalBefore)} a year
        </span>
        <span className="key key-after">After: {money(totalAfter)} a year</span>
      </figcaption>
    </figure>
  );
}
