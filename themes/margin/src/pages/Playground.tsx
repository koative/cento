import { playground } from "../content";
import { EasingLab } from "../components/EasingLab";
import { TypeScale } from "../components/TypeScale";
import { ContrastCheck } from "../components/ContrastCheck";

export function Playground() {
  const tools = [
    {
      id: "easing",
      ...playground.easing,
      note: "Keyboard: edit the four numbers. Pointer: drag the red handles.",
      node: <EasingLab />,
    },
    {
      id: "scale",
      ...playground.scale,
      note: "Sizes are shown uncapped, so the largest steps may crop on a phone.",
      node: <TypeScale />,
    },
    {
      id: "contrast",
      ...playground.contrast,
      note: "Defaults are Quarry's amber on its control-room board.",
      node: <ContrastCheck />,
    },
  ];

  return (
    <>
      <section className="sheet page-head">
        <p className="aside margin-note">
          Nothing here is saved or sent. Reload to reset.
        </p>
        <div className="col">
          <h1 className="display">{playground.title}</h1>
          <p className="lead">{playground.intro}</p>
        </div>
      </section>

      {tools.map((t) => (
        <section
          className="sheet tool-section"
          key={t.id}
          aria-labelledby={t.id}
        >
          <p className="aside margin-note">{t.note}</p>
          <div className="col">
            <h2 id={t.id}>{t.title}</h2>
            <p className="section-sub">{t.text}</p>
            {t.node}
          </div>
        </section>
      ))}

      <section className="sheet" aria-labelledby="log">
        <p className="aside margin-note">
          Older experiments, kept as a list so I remember what didn't work.
        </p>
        <div className="col">
          <h2 id="log">Sketch log</h2>
          <table className="index-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Experiment</th>
                <th scope="col">Medium</th>
                <th scope="col">What I learned</th>
              </tr>
            </thead>
            <tbody>
              {playground.log.map((l) => (
                <tr key={l.title}>
                  <td className="num">{l.date}</td>
                  <td>{l.title}</td>
                  <td>{l.medium}</td>
                  <td>{l.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
