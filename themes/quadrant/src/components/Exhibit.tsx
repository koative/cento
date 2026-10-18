import type { ExhibitData } from "../content";

/** A board-paper exhibit: numbered title, horizontal bars with the one that matters in accent, source line. */
export function Exhibit({ data, n }: { data: ExhibitData; n: number }) {
  const max = Math.max(...data.bars.map((b) => b.value));
  return (
    <figure className="exhibit">
      <figcaption>
        <span className="exhibit-n">Exhibit {n}</span>
        <span className="exhibit-title">{data.title}</span>
      </figcaption>
      <ul className="bars">
        {data.bars.map((b, i) => (
          <li key={b.label} data-focus={b.focus ? "" : undefined}>
            <span className="bar-label">{b.label}</span>
            <span className="bar-track" aria-hidden="true">
              <span
                className="bar"
                style={{
                  width: `${(b.value / max) * 100}%`,
                  animationDelay: `${i * 70}ms`,
                }}
              />
            </span>
            <span className="bar-value num">
              {b.value}
              {data.unit}
            </span>
          </li>
        ))}
      </ul>
      <p className="exhibit-source">Source: {data.source}</p>
    </figure>
  );
}
