import { useState } from "react";
import { quality } from "../content";

/** Balloon position and the feature its leader points at, in drawing units. */
const balloons: Record<number, { at: [number, number]; to: [number, number] }> =
  {
    1: { at: [292, 284], to: [262, 266] },
    2: { at: [40, 58], to: [40, 85] },
    3: { at: [306, 52], to: [239, 121] },
    4: { at: [372, 108], to: [220, 140] },
    5: { at: [100, 176], to: [100, 215] },
    6: { at: [408, 232], to: [340, 245] },
    7: { at: [148, 52], to: [201, 121] },
  };

export function FirstArticle() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="fai">
      <svg
        className="fai-drawing"
        viewBox="0 0 440 300"
        role="img"
        aria-label="Ballooned drawing of a pillow-block bracket with seven inspected characteristics"
      >
        <path className="edge" d="M70,245 H370 V215 H290 V85 H150 V215 H70 Z" />
        <circle className="edge" cx="220" cy="140" r="27.5" />
        <line className="cl" x1="220" y1="98" x2="220" y2="182" />
        <line className="cl" x1="178" y1="140" x2="262" y2="140" />
        {[92, 108, 332, 348].map((x) => (
          <line key={x} className="hidden" x1={x} y1="215" x2={x} y2="245" />
        ))}
        <g className="dim">
          <line className="ext" x1="70" y1="249" x2="70" y2="272" />
          <line className="ext" x1="370" y1="249" x2="370" y2="272" />
          <line x1="70" y1="266" x2="370" y2="266" />
          <text x="220" y="261" textAnchor="middle">
            120.00
          </text>
          <line className="ext" x1="66" y1="85" x2="30" y2="85" />
          <line className="ext" x1="66" y1="245" x2="30" y2="245" />
          <line x1="40" y1="85" x2="40" y2="245" />
          <text
            x="34"
            y="165"
            textAnchor="middle"
            transform="rotate(-90 34 165)"
          >
            64.00
          </text>
        </g>
        {quality.fai.map((row) => {
          const b = balloons[row.n];
          return (
            <g
              key={row.n}
              className="balloon"
              data-active={active === row.n ? "" : undefined}
            >
              <line x1={b.at[0]} y1={b.at[1]} x2={b.to[0]} y2={b.to[1]} />
              <circle cx={b.at[0]} cy={b.at[1]} r="12" />
              <text x={b.at[0]} y={b.at[1] + 4} textAnchor="middle">
                {row.n}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="First-article inspection results"
      >
        <table className="data fai-table" onMouseLeave={() => setActive(null)}>
          <caption>AS9102 Form 3 · Part FG-PB-2207 rev C · Serial 0001</caption>
          <thead>
            <tr>
              <th scope="col">Char.</th>
              <th scope="col">Characteristic</th>
              <th scope="col">Nominal</th>
              <th scope="col">Tolerance</th>
              <th scope="col">Measured</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {quality.fai.map((row) => (
              <tr
                key={row.n}
                data-active={active === row.n ? "" : undefined}
                onMouseEnter={() => setActive(row.n)}
              >
                <td>
                  <button
                    type="button"
                    className="balloon-btn"
                    aria-pressed={active === row.n}
                    aria-label={`Show characteristic ${row.n} on the drawing`}
                    onFocus={() => setActive(row.n)}
                    onClick={() => setActive(row.n)}
                  >
                    {row.n}
                  </button>
                </td>
                <th scope="row">{row.char}</th>
                <td>{row.nominal}</td>
                <td>{row.tol}</td>
                <td>{row.actual}</td>
                <td className="pass">Accept</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
