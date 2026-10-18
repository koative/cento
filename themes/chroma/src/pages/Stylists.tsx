import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import {
  days,
  hours,
  levelOrder,
  levels,
  pageCopy,
  services,
  stylists,
  type Focus,
} from "../content";
import { money } from "../lib/plan";
import { StylistTile } from "../components/Tiles";

const filters: ("All" | Focus)[] = [
  "All",
  "Colour",
  "Cut",
  "Curls",
  "Occasion",
];
const week = [2, 3, 4, 5, 6, 0];

export function Stylists() {
  const [focus, setFocus] = useState<(typeof filters)[number]>("All");
  const shown = stylists.filter(
    (s) => focus === "All" || s.focus.includes(focus),
  );
  const example = services.find((s) => s.id === "signature-cut")!;

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{pageCopy.stylists.title}</h1>
        <p className="lede">{pageCopy.stylists.lede}</p>
      </header>

      <div className="wrap filters">
        <div className="chips" role="group" aria-label="Filter by specialism">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className="chip"
              aria-pressed={focus === f}
              onClick={() => setFocus(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "stylist" : "stylists"}
        </p>
      </div>

      <div className="wrap stylist-grid">
        {shown.map((s) => (
          <StylistTile key={s.id} stylist={s} />
        ))}
      </div>

      <section className="wrap levels-explained" aria-labelledby="levels-h">
        <h2 id="levels-h">What the levels mean</h2>
        <div className="level-cols">
          {levelOrder.map((l) => (
            <div key={l} className="level-col">
              <h3>{levels[l].label}</h3>
              <p>{levels[l].note}</p>
              <p className="level-eg">
                {example.name}:{" "}
                <strong className="num">{money(example.price[l])}</strong>
              </p>
              <p className="level-who">
                {stylists
                  .filter((s) => s.level === l)
                  .map((s) => s.name)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap rota" aria-labelledby="rota-h">
        <h2 id="rota-h">Who's in this week</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Stylist</th>
                {week.map((d) => (
                  <th key={d} scope="col">
                    <abbr title={days[d]}>{days[d].slice(0, 3)}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stylists.map((s) => (
                <tr key={s.id}>
                  <th scope="row">
                    <Link to={`/stylists/${s.id}`}>{s.name}</Link>
                  </th>
                  {week.map((d) => (
                    <td key={d}>
                      {hours[d] && s.days.includes(d) ? (
                        <>
                          <Check aria-hidden="true" size={18} />
                          <span className="sr-only">In</span>
                        </>
                      ) : (
                        <span className="off">
                          <span aria-hidden="true">–</span>
                          <span className="sr-only">Off</span>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted">Closed Mondays: the whole team is training.</p>
      </section>
    </div>
  );
}
