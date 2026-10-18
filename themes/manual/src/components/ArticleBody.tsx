import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { Block, Tone } from "../content";
import { slugify } from "../lib/manual";
import { FigureArt } from "./Figures";
import { Inline } from "./Inline";

const tones: Record<Tone, { label: string; Icon: typeof Info }> = {
  note: { label: "Note", Icon: Info },
  tip: { label: "Tip", Icon: Lightbulb },
  caution: { label: "Caution", Icon: TriangleAlert },
};

export function ArticleBody({ body }: { body: Block[] }) {
  let figure = 0;
  return (
    <div className="prose">
      {body.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h":
            return (
              <h2 key={i} id={slugify(b.text)} tabIndex={-1}>
                {b.text}
              </h2>
            );
          case "steps":
            return (
              <ol key={i} className="steps">
                {b.items.map((s) => (
                  <li key={s}>
                    <Inline text={s} />
                  </li>
                ))}
              </ol>
            );
          case "list":
            return (
              <ul key={i}>
                {b.items.map((s) => (
                  <li key={s}>
                    <Inline text={s} />
                  </li>
                ))}
              </ul>
            );
          case "callout": {
            const { label, Icon } = tones[b.tone];
            return (
              <aside
                key={i}
                className="callout"
                data-tone={b.tone}
                aria-label={label}
              >
                <Icon aria-hidden="true" />
                <p>
                  <strong>{label}.</strong> <Inline text={b.text} />
                </p>
              </aside>
            );
          }
          case "figure":
            figure++;
            return (
              <figure key={i} className="figure">
                <FigureArt figure={b.figure} />
                <figcaption>
                  <span className="code">Fig. {figure}</span> {b.caption}
                </figcaption>
              </figure>
            );
          case "table":
            return (
              <div
                key={i}
                className="table-wrap"
                tabIndex={0}
                role="region"
                aria-label={`Table: ${b.head.join(", ")}`}
              >
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row">
                              <Inline text={c} />
                            </th>
                          ) : (
                            <td key={j}>
                              <Inline text={c} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
