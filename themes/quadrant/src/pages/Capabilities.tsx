import { ArrowRight } from "lucide-react";
import { capabilities, capabilitiesPage, images } from "../content";
import { personById } from "../lib/format";
import { Link } from "../router";

export function Capabilities() {
  return (
    <>
      <header className="page-head wrap page-head-photo">
        <div>
          <h1 className="display">{capabilitiesPage.title}</h1>
          <p className="lede">{capabilitiesPage.lede}</p>
        </div>
        <figure className="photo">
          <img
            src={images.whiteboard}
            alt="A consultant sketching on a whiteboard in a glass-walled meeting room."
            width={960}
            height={640}
          />
        </figure>
      </header>

      <section className="wrap section-tight" aria-label="All capabilities">
        <ul className="cap-rows">
          {capabilities.map((c) => (
            <li key={c.slug}>
              <h2 className="cap-name">
                <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
              </h2>
              <div className="cap-body">
                <p className="cap-title">{c.title}</p>
                <p>{c.short}</p>
                <ul className="cap-qs">
                  {c.questions.slice(0, 2).map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="cap-side">
                <dl className="cap-facts">
                  <div>
                    <dt>Typical length</dt>
                    <dd>{c.duration}</dd>
                  </div>
                  <div>
                    <dt>Led by</dt>
                    <dd>{personById(c.lead)?.name}</dd>
                  </div>
                </dl>
                <Link to={`/capabilities/${c.slug}`} className="link-arrow">
                  How we work on it <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section fees">
        <h2 className="h2">{capabilitiesPage.feesTitle}</h2>
        <ul className="ruled-list">
          {capabilitiesPage.fees.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <Link to="/contact" className="btn btn-primary">
          Ask for a proposal
        </Link>
      </section>
    </>
  );
}
