import type { CSSProperties } from "react";
import type { CaseStudy } from "../content";

/** Square-root scale: a 0.2% purchase step stays visible next to 100% of visitors, and 81 vs 100 still reads as a gap. */
const scale = (v: number, max: number) => Math.max(0.02, Math.sqrt(v / max));

export function Funnel({ stages }: { stages: CaseStudy["funnel"] }) {
  const max = Math.max(...stages.flatMap((s) => [s.before, s.after]));
  return (
    <figure className="funnel">
      <table>
        <caption className="sr-only">
          Funnel before and after, indexed to 100 at the first stage
        </caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((s) => (
            <tr key={s.stage}>
              <th scope="row">{s.stage}</th>
              <td>
                <span
                  className="funnel-bar"
                  style={{ "--w": scale(s.before, max) } as CSSProperties}
                />
                <span className="funnel-num">{s.before}</span>
              </td>
              <td data-after="">
                <span
                  className="funnel-bar"
                  style={{ "--w": scale(s.after, max) } as CSSProperties}
                />
                <span className="funnel-num">{s.after}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption>
        Indexed to 100 at the first stage. Bars on a square-root scale so the
        small steps stay visible.
      </figcaption>
    </figure>
  );
}
