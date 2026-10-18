import { ArrowRight } from "lucide-react";
import { Link, navigate } from "../router";
import {
  lanes,
  modeLabel,
  services,
  type Service as ServiceT,
} from "../content";
import { NetworkMap } from "../components/NetworkMap";
import { Faq } from "../components/Faq";
import { draft } from "../lib/quote";
import { hub } from "../lib/geo";

export default function Service({ s }: { s: ServiceT }) {
  const modeLanes = lanes.filter((l) => l.mode === s.mode);
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  function quote() {
    if (s.quoteMode) draft.current = { ...draft.current, mode: s.quoteMode };
    navigate("/quote");
  }

  return (
    <>
      <section className="page-head service-head">
        <div className="wrap service-head-grid">
          <div>
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link to="/services">Services</Link>
              <span aria-hidden>/</span>
              <span>{s.name}</span>
            </nav>
            <h1>{s.name}</h1>
            <p className="lede">{s.lead}</p>
            <dl className="fact-row">
              <div>
                <dt>Transit</dt>
                <dd className="num">{s.transit}</dd>
              </div>
              <div>
                <dt>Unit</dt>
                <dd className="num">{s.unit}</dd>
              </div>
              <div>
                <dt>From</dt>
                <dd className="num">{s.from}</dd>
              </div>
            </dl>
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={quote}>
                Quote {s.name.toLowerCase()}{" "}
                <ArrowRight size={18} aria-hidden />
              </button>
              <Link to="/track" className="btn btn-ghost">
                Track a shipment
              </Link>
            </div>
          </div>
          <img
            src={s.image}
            alt={s.alt}
            className="service-photo"
            width={1200}
            height={900}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Specification</h2>
            <dl className="spec-table">
              {s.specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2>How it runs</h2>
            <ol className="steps">
              {s.steps.map((st) => (
                <li key={st.title}>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section-sunk">
        <div className="wrap three-col">
          <div>
            <h2 className="h3">Included</h2>
            <ul className="ticks">
              {s.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3">Suits</h2>
            <ul className="ticks">
              {s.suits.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3">Questions</h2>
            <Faq items={s.faqs} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-map">
          <div>
            <h2>{modeLabel[s.mode]} lanes</h2>
            <p className="muted">
              {modeLanes.length} scheduled {modeLabel[s.mode].toLowerCase()}{" "}
              lanes in the network. Cut-offs per hub are on the network page.
            </p>
            <ul className="lane-list">
              {modeLanes.map((l) => (
                <li key={l.from + l.to}>
                  <span className="num">
                    {l.from} — {l.to}
                  </span>
                  <span>
                    {hub(l.from).city} to {hub(l.to).city}
                  </span>
                  <span className="muted">{l.departures}</span>
                </li>
              ))}
            </ul>
            <Link to="/network" className="text-link">
              Hubs and cut-offs <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <NetworkMap
            modes={[s.mode]}
            labels="all"
            label={`Map of the ${modeLabel[s.mode].toLowerCase()} lanes in the Relay network`}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Other services</h2>
          <ul className="related">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={`/services/${r.slug}`}>
                  <img
                    src={r.image}
                    alt=""
                    width={480}
                    height={320}
                    loading="lazy"
                  />
                  <span className={`mode-tag mode-${r.mode}`}>
                    {modeLabel[r.mode]}
                  </span>
                  <strong>{r.name}</strong>
                  <span>{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
