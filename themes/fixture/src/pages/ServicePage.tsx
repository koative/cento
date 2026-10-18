import { ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import { brand, services, trades, type Service } from "../content";
import { defaultInput, fromPrice, saveEstimate } from "../lib/estimate";
import { money } from "../lib/format";
import { Faq } from "../components/Faq";
import { TradeTag } from "../components/TradeTag";

export function ServicePage({ service: s }: { service: Service }) {
  const related = services.filter(
    (x) => x.trade === s.trade && x.slug !== s.slug,
  );

  const estimateThis = () => {
    saveEstimate(defaultInput(s.slug));
    navigate("/estimate");
  };

  return (
    <>
      <nav className="crumbs wrap" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to={`/services?trade=${s.trade}`}>
              {trades[s.trade].label}
            </Link>
          </li>
          <li aria-current="page">{s.name}</li>
        </ol>
      </nav>

      <section className="svc-hero wrap">
        <div className="svc-hero-copy">
          <TradeTag trade={s.trade} />
          <h1>{s.name}</h1>
          <p className="lede">{s.lede}</p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-live btn-lg"
              onClick={estimateThis}
            >
              Estimate this job
            </button>
            <Link to={`/book?service=${s.slug}`} className="btn btn-ink btn-lg">
              Book a visit
            </Link>
          </div>
        </div>
        <figure className="svc-hero-photo">
          <img src={s.image} alt={s.alt} width={1200} height={900} />
        </figure>
      </section>

      <section className="wrap svc-facts" aria-label="At a glance">
        <dl>
          <div>
            <dt>From</dt>
            <dd>{money(fromPrice(s))}</dd>
          </div>
          <div>
            <dt>Typical time</dt>
            <dd>{s.duration}</dd>
          </div>
          <div>
            <dt>Warranty</dt>
            <dd>{s.warranty}</dd>
          </div>
          <div>
            <dt>Who comes</dt>
            <dd>
              {s.trade === "plumbing"
                ? "Licensed plumber"
                : "Licensed electrician"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="wrap svc-body">
        <div>
          <h2>Book this when you notice</h2>
          <ul className="sign-list">
            {s.signs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>What the price covers</h2>
          <ul className="check-list">
            {s.includes.map((x) => (
              <li key={x}>
                <Check aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap svc-faq" aria-labelledby="svc-faq-h">
        <h2 id="svc-faq-h">Questions we get on this job</h2>
        <Faq items={s.faq} />
        <p className="svc-faq-more">
          Something else? Call the office on{" "}
          <a href={brand.phoneHref}>{brand.phone}</a> — a plumber or electrician
          answers, not a call centre.
        </p>
      </section>

      <section className="wrap related" aria-labelledby="related-h">
        <h2 id="related-h">More {trades[s.trade].label.toLowerCase()} work</h2>
        <ul className="related-list">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/services/${r.slug}`} className="related-row">
                <img
                  src={r.image}
                  alt=""
                  width={160}
                  height={120}
                  loading="lazy"
                />
                <span className="related-name">{r.name}</span>
                <span className="related-from">from {money(fromPrice(r))}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="close band" aria-labelledby="svc-close-h">
        <div className="wrap close-grid">
          <h2 id="svc-close-h">Get a number now, or get a van booked.</h2>
          <div className="actions">
            <button
              type="button"
              className="btn btn-ink btn-lg"
              onClick={estimateThis}
            >
              Estimate this job
            </button>
            <Link
              to={`/book?service=${s.slug}`}
              className="btn btn-ghost btn-lg"
            >
              Book a visit
            </Link>
          </div>
          <p className="close-hours">
            Water or sparks right now? Call{" "}
            <a href={brand.emergencyHref}>{brand.emergency}</a>, any hour.
          </p>
        </div>
      </section>
    </>
  );
}
