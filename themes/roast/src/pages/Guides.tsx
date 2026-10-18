import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brew, guides } from "../content";

export function Guides() {
  return (
    <div className="page guides-page">
      <header className="page-head">
        <h1>{brew.title}</h1>
        <p className="lead">{brew.intro}</p>
      </header>

      <div className="table-wrap">
        <table className="data-table compare">
          <caption>Compare methods</caption>
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Time</th>
              <th scope="col">Ratio</th>
              <th scope="col">Grind</th>
              <th scope="col">Skill</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((g) => (
              <tr key={g.slug}>
                <th scope="row">
                  <Link to={"/brew/" + g.slug}>{g.name}</Link>
                </th>
                <td className="num">{g.time}</td>
                <td className="num">1:{g.ratio}</td>
                <td>{g.grind.split(",")[0]}</td>
                <td>{g.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="guide-list">
        {guides.map((g) => (
          <li key={g.slug}>
            <img
              src={g.image}
              alt={g.imageAlt}
              loading="lazy"
              width={1200}
              height={800}
            />
            <div>
              <h2>
                <Link to={"/brew/" + g.slug}>{g.name}</Link>
              </h2>
              <p className="muted">
                {g.method} · {g.dose} g coffee · {g.water}
              </p>
              <p>{g.intro}</p>
              <span className="text-link" aria-hidden="true">
                Open the guide <ArrowRight size={16} />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <section className="basics" aria-labelledby="h-basics">
        <h2 id="h-basics">{brew.basicsTitle}</h2>
        <dl>
          {brew.basics.map((b) => (
            <div key={b.title}>
              <dt>{b.title}</dt>
              <dd>{b.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
