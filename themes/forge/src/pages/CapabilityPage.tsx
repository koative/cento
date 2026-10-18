import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { capabilities, type Capability } from "../content";
import { Link } from "../router";
import { Envelope } from "../components/Envelope";

export function CapabilityPage({ cap }: { cap: Capability }) {
  const i = capabilities.indexOf(cap);
  const related = [1, 2].map(
    (n) => capabilities[(i + n) % capabilities.length],
  );
  const specs: [string, string][] = [
    ["Work envelope", cap.envelopeLabel],
    ["Tolerance", cap.tolerance],
    ["Surface finish", cap.finish],
    ["Batch size", cap.batch],
    ["Lead time", cap.lead],
  ];

  return (
    <>
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <Link to="/capabilities">
          <ArrowLeft aria-hidden="true" /> All capabilities
        </Link>
      </nav>

      <header className="wrap detail-head">
        <div>
          <h1>{cap.name}</h1>
          <p className="lede">{cap.intro}</p>
          <div className="actions">
            <Link to="/rfq" className="btn btn-primary">
              Request a quote <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/configurator" className="btn btn-ghost">
              Configure a part
            </Link>
          </div>
        </div>
        <img
          src={cap.image.src}
          alt={cap.image.alt}
          width={cap.image.w}
          height={cap.image.h}
          className="detail-img"
        />
      </header>

      <section className="wrap detail-specs" aria-labelledby="spec-title">
        <div>
          <h2 id="spec-title">Specification</h2>
          <dl className="spec-list">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div>
              <dt>Materials</dt>
              <dd>{cap.materials.join(", ")}</dd>
            </div>
          </dl>
        </div>
        <figure className="envelope-fig">
          <Envelope env={cap.envelope} label={cap.envelopeLabel} />
          <figcaption>
            Largest part, drawn to the real proportions of the envelope.
          </figcaption>
        </figure>
      </section>

      <section className="wrap section detail-body" aria-labelledby="why-title">
        <div>
          <h2 id="why-title">What it is good for</h2>
          <ul className="checks">
            {cap.strengths.map((s) => (
              <li key={s}>
                <Check aria-hidden="true" /> {s}
              </li>
            ))}
          </ul>
          <h3>Recently on this process</h3>
          <ul className="examples">
            {cap.examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="note">{cap.notes}</p>
        </div>
        <div>
          <h2>Machines</h2>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label={`${cap.name} machines`}
          >
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Qty</th>
                  <th scope="col">Machine</th>
                  <th scope="col">Specification</th>
                </tr>
              </thead>
              <tbody>
                {cap.machines.map((m) => (
                  <tr key={m.name}>
                    <td className="num">{m.count}</td>
                    <th scope="row">{m.name}</th>
                    <td>{m.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="related-title">
        <h2 id="related-title">Often paired with</h2>
        <ul className="related">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/capabilities/${r.slug}`}>
                <img
                  src={r.image.src}
                  alt=""
                  width={r.image.w}
                  height={r.image.h}
                  loading="lazy"
                />
                <span className="related-name">{r.name}</span>
                <span className="related-text">{r.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
