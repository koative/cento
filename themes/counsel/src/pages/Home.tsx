import { ArrowRight, Clock } from "lucide-react";
import { Link } from "../router";
import { areas, home, images, insights, people } from "../content";
import { LimitationClock } from "../components/LimitationClock";
import { PersonCard } from "../components/PersonCard";
import { InsightList } from "../components/InsightList";
import { Closing } from "../components/Closing";

export function Home() {
  const partners = people
    .filter((p) => p.role !== "Senior associate")
    .slice(0, 4);
  const [lead, ...quotes] = home.testimonials;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/enquiry" className="btn">
              Make an enquiry <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/fees" className="btn btn-ghost">
              See our fees
            </Link>
          </div>
          <p className="hero-promise">
            <Clock size={16} aria-hidden="true" />
            {home.promise}
          </p>
        </div>
        <nav className="hero-index" aria-labelledby="index-title">
          <h2 id="index-title">Practice areas</h2>
          <ol>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link to={`/practice/${a.slug}`}>
                  <span>{a.name}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <figure className="band">
        <img
          src={images.signing}
          alt="A client signing an agreement at a wooden desk"
          width={1800}
          height={1200}
        />
        <figcaption className="wrap">
          Every engagement begins with a letter that sets out scope, team and
          fee.
        </figcaption>
      </figure>

      <section className="section wrap audiences" aria-labelledby="who-title">
        <h2 id="who-title" className="section-title">
          Who we act for
        </h2>
        <div className="audience-cols">
          {home.audiences.map((au) => (
            <div key={au.id}>
              <h3>{au.heading}</h3>
              <p className="muted">{au.text}</p>
              <ul className="area-lines">
                {areas
                  .filter((a) => a.audience.includes(au.id))
                  .map((a) => (
                    <li key={a.slug}>
                      <Link to={`/practice/${a.slug}`}>{a.name}</Link>
                      <span>{a.short}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="work-title">
        <div className="split-head">
          <h2 id="work-title" className="section-title">
            Recent work
          </h2>
          <p className="muted">
            Described with our clients’ permission, and without their names.
          </p>
        </div>
        <table className="ledger">
          <thead>
            <tr>
              <th scope="col">Practice</th>
              <th scope="col">Matter</th>
            </tr>
          </thead>
          <tbody>
            {areas.slice(0, 6).map((a) => (
              <tr key={a.slug}>
                <th scope="row">
                  <Link to={`/practice/${a.slug}`}>{a.name}</Link>
                </th>
                <td>{a.matters[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="night" aria-labelledby="clock-title">
        <div className="wrap night-grid">
          <div>
            <h2 id="clock-title" className="section-title">
              How long do you have?
            </h2>
            <p>
              Most legal rights expire. The deadline is usually the first thing
              we check, and the thing clients most often learn about too late.
              Pick what happened and when, and see where the clock stands today.
            </p>
          </div>
          <LimitationClock />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="people-title">
        <div className="split-head">
          <h2 id="people-title" className="section-title">
            The lawyer who meets you does the work
          </h2>
          <Link to="/people" className="text-link">
            Find a lawyer <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="people-grid">
          {partners.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
      </section>

      <section className="voices" aria-labelledby="voices-title">
        <div className="wrap">
          <h2 id="voices-title" className="visually-hidden">
            What clients say
          </h2>
          <figure className="voice-lead">
            <blockquote>{lead.quote}</blockquote>
            <figcaption>{lead.who}</figcaption>
          </figure>
          <div className="voice-pair">
            {quotes.map((q) => (
              <figure key={q.who}>
                <blockquote>{q.quote}</blockquote>
                <figcaption>{q.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="process-title">
        <h2 id="process-title" className="section-title">
          From first call to engagement
        </h2>
        <ol className="steps">
          {home.process.map((s, i) => (
            <li key={s.title}>
              <span className="step-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" aria-labelledby="insights-title">
        <div className="split-head">
          <h2 id="insights-title" className="section-title">
            Insights
          </h2>
          <Link to="/insights" className="text-link">
            All insights <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <InsightList items={insights.slice(0, 3)} />
      </section>

      <Closing />
    </>
  );
}
