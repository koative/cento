import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { contacts, deals, history, owners, product } from "../content";
import { BoardPreview } from "../components/BoardPreview";
import { StageBars, WonChart } from "../components/Charts";
import { ForecastCall } from "../components/ForecastCall";
import { shortDate } from "../lib/format";

function ForecastSample() {
  const rep = owners[1];
  const [sheet, setSheet] = useState(() =>
    deals.filter((d) => d.owner === rep.id),
  );
  return (
    <ForecastCall
      name="product"
      deals={sheet}
      quota={rep.quota}
      onChange={(id, forecast) =>
        setSheet((s) => s.map((d) => (d.id === id ? { ...d, forecast } : d)))
      }
    />
  );
}

function Visual({ id }: { id: string }) {
  if (id === "board") return <BoardPreview />;
  if (id === "contacts")
    return (
      <div className="sheet table-sheet">
        <table className="data">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Company</th>
              <th scope="col">Last touch</th>
            </tr>
          </thead>
          <tbody>
            {contacts.slice(0, 6).map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.company}</td>
                <td className="num">{shortDate(c.activity[0].date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (id === "forecast") return <ForecastSample />;
  return (
    <div className="sheet chart-sheet">
      <p className="sheet-title">Won by month</p>
      <WonChart months={history} />
      <p className="sheet-title">Pipeline by stage today</p>
      <StageBars deals={deals} />
    </div>
  );
}

export default function Product() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{product.h1}</h1>
        <p className="lede">{product.lede}</p>
      </header>

      {product.sections.map((s, i) => (
        <section
          key={s.id}
          className={`wrap section split${i % 2 ? " split-flip" : ""}`}
          aria-labelledby={`h-${s.id}`}
        >
          <div className="split-copy">
            <h2 id={`h-${s.id}`}>{s.title}</h2>
            <p>{s.body}</p>
            <ul className="ticks">
              {s.points.map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </div>
          <Visual id={s.id} />
        </section>
      ))}

      <section className="wrap section" aria-labelledby="h-specs">
        <h2 id="h-specs">The details your RevOps lead will ask about</h2>
        <dl className="specs">
          {product.specs.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap close" aria-labelledby="h-close">
        <h2 id="h-close">Move a deal before you decide.</h2>
        <p>
          The demo workspace has twenty deals, twenty contacts and live reports.
          Nothing to install.
        </p>
        <div className="cta-row">
          <Link to="/app" className="btn btn-primary btn-lg">
            Open the demo board <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/pricing" className="btn btn-quiet btn-lg">
            See pricing
          </Link>
        </div>
      </section>
    </>
  );
}
