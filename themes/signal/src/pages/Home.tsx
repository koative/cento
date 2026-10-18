import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { bookingFunnel, cohorts, events, home, stories } from "../content";
import { QueryComposer } from "../components/QueryComposer";
import { CodeBlock } from "../components/CodeBlock";
import { CohortGrid, FunnelChart } from "../components/Charts";
import { compact, Delta, EventName } from "../components/format";

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.heroTitle}</h1>
          <div>
            <p className="lede">{home.heroText}</p>
            <div className="actions">
              <Link to="/signin" className="btn btn-primary btn-lg">
                Start free
              </Link>
              <Link to="/app" className="btn btn-ghost btn-lg">
                Open the demo workspace
              </Link>
            </div>
            <p className="quiet-note">{home.heroNote}</p>
          </div>
        </div>
        <QueryComposer />
      </section>

      <section className="band-dark">
        <div className="wrap install">
          <div>
            <h2>{home.install.title}</h2>
            <p>{home.install.text}</p>
            <dl className="facts">
              {home.install.facts.map((f) => (
                <div key={f.term}>
                  <dt>{f.term}</dt>
                  <dd>{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <CodeBlock code={home.install.code} label="app.ts" />
        </div>
      </section>

      <section className="wrap section split split-wide-right">
        <div>
          <h2>{home.funnel.title}</h2>
          <p>{home.funnel.text}</p>
          <ul className="ticks">
            {home.funnel.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <div className="panel-head">
            <h3>{home.funnelPanel.title}</h3>
            <span className="panel-meta">{home.funnelPanel.meta}</span>
          </div>
          <FunnelChart
            steps={bookingFunnel}
            label="Booking funnel: 288,904 searches to 41,506 confirmed bookings"
          />
        </div>
      </section>

      <section className="wrap section retention">
        <div className="section-head">
          <h2>{home.retention.title}</h2>
          <p>{home.retention.text}</p>
        </div>
        <CohortGrid cohorts={cohorts} />
      </section>

      <section className="wrap section split">
        <div>
          <h2>{home.catalog.title}</h2>
          <p>{home.catalog.text}</p>
          <Link to="/app/events" className="text-link">
            {home.catalogLink} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div
          className="table-scroll"
          role="region"
          aria-label="Event catalog excerpt"
          tabIndex={0}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Owner</th>
                <th scope="col" className="r">
                  30 days
                </th>
                <th scope="col" className="r">
                  Change
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(3, 10).map((e) => (
                <tr key={e.id}>
                  <td>
                    <EventName id={e.id} />
                  </td>
                  <td>{e.owner}</td>
                  <td className="r num">{compact.format(e.volume)}</td>
                  <td className="r">
                    <Delta value={e.change} />
                  </td>
                  <td>
                    <span className="status" data-status={e.status}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="quote-band">
        <figure className="wrap big-quote">
          <blockquote>
            <p>“{home.quote.text}”</p>
          </blockquote>
          <figcaption>
            <span>
              <strong>{home.quote.name}</strong> {home.quote.role}
            </span>
            <Link to={`/customers/${home.quote.story}`} className="text-link">
              {home.quoteLink} <ArrowRight size={16} aria-hidden />
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="wrap section split">
        <div>
          <h2>{home.privacy.title}</h2>
          <p>{home.privacy.text}</p>
        </div>
        <dl className="rule-list">
          {home.privacy.points.map((p) => (
            <div key={p.term}>
              <dt>{p.term}</dt>
              <dd>{p.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section stack-strip">
        <h2>{home.stackTitle}</h2>
        <ul className="sdk-list">
          {home.sdks.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <Link to="/docs" className="text-link">
          {home.stackLink} <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="wrap section">
        <div className="section-head row">
          <h2>{home.storiesTitle}</h2>
          <Link to="/customers" className="text-link">
            {home.storiesLink} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="story-rows">
          {stories.slice(0, 4).map((s) => (
            <li key={s.slug}>
              <Link to={`/customers/${s.slug}`}>
                <span className="story-company">{s.company}</span>
                <span className="story-headline">{s.headline}</span>
                <span className="story-industry">{s.industry}</span>
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section price-teaser">
        <h2>{home.priceTitle}</h2>
        <p>{home.priceText}</p>
        <Link to="/pricing" className="btn btn-ghost">
          Compare plans
        </Link>
      </section>

      <section className="close-band">
        <div className="wrap close">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-lg">
              Open the demo workspace
            </Link>
            <Link to="/demo" className="btn btn-ghost-light btn-lg">
              Book a guided demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
