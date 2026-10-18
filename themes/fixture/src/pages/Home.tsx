import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import {
  areas,
  brand,
  emergency,
  home,
  rateCard,
  rates,
  reviews,
  services,
  trades,
  type Trade,
} from "../content";
import { fromPrice } from "../lib/estimate";
import { money } from "../lib/format";
import { nextOpening, officeOpen } from "../lib/hours";
import { AreaMap } from "../components/AreaMap";
import { EstimateLines, WorkOrder } from "../components/WorkOrder";
import { TradeTag } from "../components/TradeTag";

export function Home() {
  const now = new Date();

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/estimate" className="btn btn-live btn-lg">
              Get an instant estimate
            </Link>
            <Link to="/book" className="btn btn-ink btn-lg">
              Book a visit
            </Link>
          </div>
          <dl className="dispatch">
            <div>
              <dt>Next open window</dt>
              <dd>{nextOpening(now)}</dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>
                {officeOpen(now) ? (
                  <>
                    Open now · <a href={brand.phoneHref}>{brand.phone}</a>
                  </>
                ) : (
                  <>
                    Closed · emergencies{" "}
                    <a href={brand.emergencyHref}>{brand.emergency}</a>
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className="hero-photos">
          <figure>
            <img
              src={home.heroImage}
              alt={home.heroAlt}
              width={1096}
              height={894}
            />
            <figcaption>
              <TradeTag trade="plumbing" />
            </figcaption>
          </figure>
          <figure>
            <img
              src={home.heroImage2}
              alt={home.heroAlt2}
              width={960}
              height={1443}
            />
            <figcaption>
              <TradeTag trade="electrical" />
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="trades wrap" aria-labelledby="trades-h">
        <div className="section-head">
          <h2 id="trades-h">What we fix</h2>
          <Link to="/services" className="text-link">
            All ten services <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="trade-cols">
          {(Object.keys(trades) as Trade[]).map((t) => (
            <div key={t} className="trade-col" data-trade={t}>
              <h3>{trades[t].label}</h3>
              <p>{trades[t].blurb}</p>
              <ul className="job-list">
                {services
                  .filter((s) => s.trade === t)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="job-row">
                        <span className="job-name">{s.name}</span>
                        <span className="job-from">
                          from {money(fromPrice(s))}
                        </span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="teaser band" aria-labelledby="teaser-h">
        <div className="wrap teaser-grid">
          <div className="teaser-copy">
            <h2 id="teaser-h">Know the number before we knock.</h2>
            <p>
              Pick the job, how many, how old the house is and how soon you need
              us. The instant estimate writes the work order line by line, with
              the same rates our technicians carry on their tablets.
            </p>
            <Link to="/estimate" className="btn btn-ink">
              Open the instant estimate
            </Link>
          </div>
          <figure className="teaser-sheet">
            <WorkOrder no="E-20417" title="Estimate">
              <EstimateLines input={home.estimateSample.input} />
            </WorkOrder>
            <figcaption>
              A sample ticket: {home.estimateSample.job.toLowerCase()},{" "}
              {home.estimateSample.where}.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="visit wrap" aria-labelledby="visit-h">
        <h2 id="visit-h">How a visit runs</h2>
        <ol className="timeline">
          {home.visit.map((v) => (
            <li key={v.when}>
              <span className="tl-when">{v.when}</span>
              <p>{v.what}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sos band" aria-labelledby="sos-h">
        <div className="wrap sos-grid">
          <div>
            <h2 id="sos-h">Water coming through the ceiling?</h2>
            <p>{emergency.lede}</p>
          </div>
          <div className="sos-call">
            <a href={brand.emergencyHref} className="sos-tel">
              <Phone aria-hidden="true" />
              {brand.emergency}
            </a>
            <Link to="/emergency" className="text-link">
              Shut-off steps while you wait <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rates wrap" aria-labelledby="rates-h">
        <div className="section-head">
          <h2 id="rates-h">The rate card</h2>
          <p>
            Every estimate on this site uses these numbers. So does every
            technician at your door.
          </p>
        </div>
        <table className="rate-table">
          <caption className="sr-only">Standard rates</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">When it applies</th>
            </tr>
          </thead>
          <tbody>
            {rateCard.map((r) => (
              <tr key={r.item}>
                <th scope="row">{r.item}</th>
                <td>{r.price}</td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="reviews wrap" aria-labelledby="reviews-h">
        <h2 id="reviews-h">From the job sheets</h2>
        <div className="review-grid">
          {reviews.map((r, i) => {
            const service = services.find((s) => s.slug === r.service);
            return (
              <figure
                key={r.name}
                className={i === 0 ? "review review-lead" : "review"}
              >
                <blockquote>
                  <p>{r.quote}</p>
                </blockquote>
                <figcaption>
                  {r.name}, {r.area}
                  {service && (
                    <>
                      {" · "}
                      <Link to={`/services/${service.slug}`}>
                        {service.name}
                      </Link>
                    </>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className="areas-teaser" aria-labelledby="areas-h">
        <div className="wrap areas-teaser-grid">
          <div>
            <h2 id="areas-h">Ten neighbourhoods, one depot.</h2>
            <p>
              Every van leaves from Foundry Lane in Old Mill. The four core
              neighbourhoods have no trip fee; the six past the ring road add{" "}
              {money(rates.outerZone)}.
            </p>
            <ul className="area-chips">
              {areas
                .filter((a) => a.tier !== "none")
                .map((a) => (
                  <li key={a.slug} data-tier={a.tier}>
                    {a.name}
                  </li>
                ))}
            </ul>
            <Link to="/areas" className="btn btn-ink">
              Check your ZIP
            </Link>
          </div>
          <AreaMap />
        </div>
      </section>

      <section className="promises wrap" aria-labelledby="promises-h">
        <h2 id="promises-h">What we promise at the door</h2>
        <ul className="promise-list">
          {home.promises.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
        <ul className="licence-row">
          {brand.licences.map((l) => (
            <li key={l.label}>
              {l.label} <b>{l.value}</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="close band" aria-labelledby="close-h">
        <div className="wrap close-grid">
          <h2 id="close-h">Tell us what's wrong. We'll bring the right van.</h2>
          <div className="actions">
            <Link to="/book" className="btn btn-ink btn-lg">
              Book a visit
            </Link>
            <a href={brand.phoneHref} className="btn btn-ghost btn-lg">
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
          </div>
          <p className="close-hours">
            {brand.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
          </p>
        </div>
      </section>
    </>
  );
}
