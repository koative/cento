import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  companies,
  domains,
  essays,
  home,
  partners,
  process,
} from "../content";
import { Tombstone } from "../components/Tombstone";
import { Ledger } from "../components/Ledger";
import { RoundModeller } from "../components/RoundModeller";
import { EssayRow } from "../components/EssayRow";

/* The four most recent financings, newest first. */
const record = companies
  .map((c) => ({ c, r: c.rounds.at(-1)! }))
  .sort((a, b) => b.r.date.localeCompare(a.r.date))
  .slice(0, 4);

export function Home() {
  const [lead, ...more] = essays;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/pitch" className="btn btn-ink">
              Pitch us
            </Link>
            <Link to="/portfolio" className="btn btn-line">
              See the portfolio
            </Link>
          </div>
        </div>
        <div className="hero-record">
          <h2 className="sr-only">Recent financings</h2>
          <p className="record-note">{home.recordNote}</p>
          <div className="record-grid">
            {record.map(({ c, r }) => (
              <Tombstone key={c.slug} company={c} round={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Four parts of the economy, one kind of founder.</h2>
          <Link to="/thesis" className="text-link">
            Read the thesis <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="domain-rows">
          {domains.map((d) => {
            const backed = companies.filter((c) => c.domain === d.id);
            return (
              <li key={d.id} className="domain-row">
                <img
                  src={backed[0].image}
                  alt=""
                  width={320}
                  height={240}
                  loading="lazy"
                />
                <div>
                  <h3>{d.name}</h3>
                  <p className="domain-line">{d.line}</p>
                </div>
                <p className="domain-body">{d.body}</p>
                <p className="domain-backed">
                  <span>Backed:</span>{" "}
                  {backed.map((c, i) => (
                    <span key={c.slug}>
                      {i > 0 && ", "}
                      <Link to={`/portfolio/${c.slug}`}>{c.name}</Link>
                    </span>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>The portfolio, as a ledger.</h2>
          <Link to="/portfolio" className="text-link">
            Every company <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <Ledger
          companies={companies}
          caption="Cohort portfolio companies, newest class first"
        />
      </section>

      <section className="testimonial wrap-narrow">
        <figure>
          <blockquote>
            <p>{home.testimonial.text}</p>
          </blockquote>
          <figcaption>
            {home.testimonial.by}, <span>{home.testimonial.role}</span>
          </figcaption>
        </figure>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Ten days from deck to decision.</h2>
          <Link to="/founders" className="text-link">
            How we invest <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ol className="timeline">
          {process.map((p) => (
            <li key={p.day}>
              <p className="timeline-day">{p.day}</p>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <h2>Model your round before you take the meeting.</h2>
            <p className="section-sub">
              Move the numbers and watch the cap table. This is the same
              arithmetic a partner will walk through with you on the first call.
            </p>
          </div>
          <RoundModeller />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>The partnership.</h2>
          <Link to="/team" className="text-link">
            Meet the team <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="roster">
          {partners.map((p) => (
            <li key={p.slug}>
              <Link to={`/team/${p.slug}`} className="roster-name">
                {p.name}
              </Link>
              <p className="roster-role">
                {p.role} · {p.based}
              </p>
              <p className="roster-before">{p.before}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Writing.</h2>
          <Link to="/writing" className="text-link">
            All essays <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="writing-split">
          <div className="writing-lead">
            <EssayRow essay={lead} />
          </div>
          <div className="writing-more">
            {more.slice(0, 3).map((e) => (
              <EssayRow key={e.slug} essay={e} />
            ))}
          </div>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeBody}</p>
          <div className="actions">
            <Link to="/pitch" className="btn btn-paper">
              Send the deck
            </Link>
            <a href={`mailto:${brand.pitchEmail}`} className="close-mail">
              {brand.pitchEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
