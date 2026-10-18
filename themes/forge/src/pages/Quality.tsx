import { ArrowRight } from "lucide-react";
import { images, quality } from "../content";
import { Link } from "../router";
import { FirstArticle } from "../components/FirstArticle";

export function Quality() {
  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Quality</h1>
          <p className="lede">{quality.lede}</p>
        </div>
        <img
          src={images.cmm.src}
          alt={images.cmm.alt}
          width={images.cmm.w}
          height={images.cmm.h}
          className="head-img"
        />
      </header>

      <section className="wrap section" aria-labelledby="certs-title">
        <h2 id="certs-title">Certifications</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Certifications"
        >
          <table className="data">
            <thead>
              <tr>
                <th scope="col">Standard</th>
                <th scope="col">Scope</th>
                <th scope="col">Status</th>
                <th scope="col">Issued by</th>
              </tr>
            </thead>
            <tbody>
              {quality.certs.map((c) => (
                <tr key={c.code}>
                  <th scope="row">{c.code}</th>
                  <td>{c.scope}</td>
                  <td>{c.issued}</td>
                  <td>{c.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fineprint">
          Certificates are available on request from quality@forge.example.
          Registrars named here are fictional.
        </p>
      </section>

      <section className="band-paper" aria-labelledby="steps-title">
        <div className="wrap section">
          <h2 id="steps-title">
            Six checkpoints between your drawing and your dock
          </h2>
          <ol className="steps">
            {quality.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="fai-title">
        <div className="section-head">
          <h2 id="fai-title">Read a first-article report</h2>
          <p>
            Every characteristic on the print gets a balloon and a measured
            value. Select a row to find it on the drawing. This is the report
            you get with the first part of every new revision.
          </p>
        </div>
        <FirstArticle />
      </section>

      <section className="wrap section metrics" aria-labelledby="metrics-title">
        <div>
          <h2 id="metrics-title">Last twelve months</h2>
          <p>
            Published every quarter, including the quarters we would rather not.
            Figures to the end of September 2026.
          </p>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Quality metrics"
        >
          <table className="data">
            <thead>
              <tr>
                <th scope="col">Measure</th>
                <th scope="col">Result</th>
                <th scope="col">Definition</th>
              </tr>
            </thead>
            <tbody>
              {quality.metrics.map(([k, v, d]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="num">{v}</td>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band-dark" aria-labelledby="lab-title">
        <div className="wrap split">
          <img
            src={images.castings.src}
            alt={images.castings.alt}
            width={images.castings.w}
            height={images.castings.h}
            loading="lazy"
            className="split-img"
          />
          <div className="split-copy">
            <h2 id="lab-title">The inspection room</h2>
            <p>
              Held at 20 ± 0.5 °C, with parts soaked to temperature before they
              are measured. Gauges are calibrated on a published schedule
              against standards traceable to national institutes.
            </p>
            <dl className="spec-list spec-list-dark">
              {quality.equipment.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>× {v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/capabilities/metrology" className="btn btn-light">
              Measurement-only services <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
