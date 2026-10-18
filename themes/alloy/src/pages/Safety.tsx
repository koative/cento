import { ChevronDown, Phone } from "lucide-react";
import { brand, images, safety } from "../content";

export function Safety() {
  const tel = `tel:${brand.safetyLine.replace(/\s/g, "")}`;
  return (
    <>
      <header className="page-head wrap">
        <h1>{safety.title}</h1>
        <p className="lede">{safety.intro}</p>
        <a href={tel} className="btn btn-signal">
          <Phone aria-hidden="true" size={18} /> 24-hour safety line{" "}
          {brand.safetyLine}
        </a>
      </header>

      <section className="wrap split-media">
        <img
          src={images.streetWorks.src}
          alt={images.streetWorks.alt}
          width={images.streetWorks.w}
          height={images.streetWorks.h}
        />
        <div>
          <h2>{safety.stopWork.title}</h2>
          <p>{safety.stopWork.body}</p>
        </div>
      </section>

      <section className="section wrap">
        <div className="row-head">
          <div>
            <h2>{safety.record.title}</h2>
            <p>{safety.record.note}</p>
          </div>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Safety record by year"
        >
          <table className="data-table num-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Hours worked</th>
                <th scope="col">Recordable incidents</th>
                <th scope="col">TRIR</th>
                <th scope="col">Lost-time incidents</th>
                <th scope="col">EMR</th>
              </tr>
            </thead>
            <tbody>
              {safety.record.rows.map((r) => (
                <tr key={r.year}>
                  <th scope="row">{r.year}</th>
                  <td>{r.hours}</td>
                  <td>{r.recordable}</td>
                  <td>{r.trir}</td>
                  <td>{r.lostTime}</td>
                  <td>{r.emr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band-dark">
        <div className="wrap section">
          <h2>{safety.rules.title}</h2>
          <ul className="rules">
            {safety.rules.items.map((r) => (
              <li key={r.name}>
                <h3>{r.name}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap split">
        <div className="split-head">
          <h2>{safety.programs.title}</h2>
        </div>
        <dl className="ruled-list">
          {safety.programs.items.map((p) => (
            <div key={p.name}>
              <dt>{p.name}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap split">
        <div className="split-head">
          <h2>Visitors, trades and neighbours</h2>
          <p>
            Something on one of our sites worries you? Call{" "}
            <a href={tel}>{brand.safetyLine}</a>, day or night.
          </p>
        </div>
        <div className="faq">
          {safety.faq.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <ChevronDown aria-hidden="true" size={20} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
