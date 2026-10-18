import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "../router";
import { covers, type Cover } from "../content";
import { money } from "../lib/quote";

export function CoverPage({ cover }: { cover: Cover }) {
  const addOns = covers.filter((c) => cover.addOns.includes(c.slug));
  const related = covers
    .filter((c) => c.slug !== cover.slug && c.audience === cover.audience)
    .concat(addOns)
    .slice(0, 3);
  const quoteLink = cover.quotable ? `/quote?cover=${cover.slug}` : "/quote";

  return (
    <article>
      <section className="wrap cover-hero">
        <div>
          <p className="crumbs">
            <Link to="/cover">Cover</Link> <span aria-hidden="true">/</span>{" "}
            {cover.name}
          </p>
          <h1>{cover.name} insurance</h1>
          <p className="lede">{cover.intro}</p>
          <div className="cover-price">
            <p>
              <span>
                {cover.audience === "add-on" ? "Add-on from" : "From"}
              </span>
              <strong className="num">{money(cover.from)}</strong>
              <span>a month</span>
            </p>
            <Link to={quoteLink} className="btn btn-primary">
              {cover.quotable
                ? `Quote ${cover.name.toLowerCase()} cover`
                : "Add it to a quote"}{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
        <img src={cover.image} alt={cover.alt} width={1100} height={734} />
      </section>

      <section className="wrap wording" aria-labelledby="sched-h">
        <h2 id="sched-h">What the schedule says</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="sched-h"
        >
          <table className="wording-table">
            <thead>
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Cover</th>
                <th scope="col">Limit</th>
                <th scope="col">In plain English</th>
              </tr>
            </thead>
            <tbody>
              {cover.schedule.map((s) => (
                <tr key={s.title}>
                  <td>
                    <span className="code-chip">{s.code}</span>
                  </td>
                  <th scope="row">{s.title}</th>
                  <td className="num">{s.limit}</td>
                  <td>{s.plain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="wrap fit"
        aria-label="Who it suits and what it leaves out"
      >
        <div>
          <h2>Made for</h2>
          <ul className="ticks">
            {cover.who.map((w) => (
              <li key={w}>
                <Check aria-hidden="true" size={18} />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Not covered</h2>
          <ul className="ticks ticks-no">
            {cover.notCovered.map((w) => (
              <li key={w}>
                <X aria-hidden="true" size={18} />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band story-feature" aria-labelledby="story-h">
        <div className="wrap story-grid">
          <div>
            <h2 id="story-h">{cover.story.title}</h2>
            <p>{cover.story.body}</p>
          </div>
          <dl className="ledger">
            <div>
              <dt>Paid</dt>
              <dd className="num">{money(cover.story.paid)}</dd>
            </div>
            <div>
              <dt>From first call to payment</dt>
              <dd className="num">{cover.story.days} days</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions about {cover.name.toLowerCase()} cover</h2>
        <div className="disclosures">
          {cover.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="wrap related" aria-labelledby="rel-h">
          <h2 id="rel-h">Often held alongside</h2>
          <ul className="related-list">
            {related.map((c) => (
              <li key={c.slug}>
                <Link to={`/cover/${c.slug}`}>
                  <img
                    src={c.image}
                    alt=""
                    width={1100}
                    height={734}
                    loading="lazy"
                  />
                  <span className="related-name">{c.name}</span>
                  <span>{c.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        className="wrap close close-tight"
        aria-labelledby="cover-close-h"
      >
        <h2 id="cover-close-h">See your own price in four minutes.</h2>
        <Link to={quoteLink} className="btn btn-primary">
          Start the quote <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </article>
  );
}
