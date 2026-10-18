import { useState } from "react";
import { Link } from "../router";
import { articles, destinationBySlug } from "../content";
import { longDate } from "../lib/plan";

export function Journal() {
  const authors = [...new Set(articles.map((a) => a.author))];
  const [author, setAuthor] = useState("");
  const list = articles.filter((a) => !author || a.author === author);
  const [lead, ...rest] = list;

  return (
    <>
      <header className="page-head wrap">
        <h1>Travel journal</h1>
        <p className="lede">
          Field notes from planners on the road: what changed, what we learnt,
          and what we would do differently.
        </p>
      </header>

      <section className="wrap filters" aria-label="Filter by planner">
        <fieldset className="seg">
          <legend>Written by</legend>
          {["", ...authors].map((a) => (
            <label key={a || "all"}>
              <input
                type="radio"
                name="author"
                checked={author === a}
                onChange={() => setAuthor(a)}
              />
              <span>{a || "Every planner"}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="wrap section-tight" aria-label="Articles">
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "entry" : "entries"}
        </p>
        {lead && (
          <article className="article-lead">
            <img src={lead.photo.src} alt="" />
            <div>
              <h2>
                <Link to={`/journal/${lead.slug}`} className="stretched">
                  {lead.title}
                </Link>
              </h2>
              <p>{lead.dek}</p>
              <p className="byline">
                {lead.author} ·{" "}
                <time dateTime={lead.date}>{longDate(lead.date)}</time> ·{" "}
                <span className="place">
                  {destinationBySlug(lead.destination)?.name}
                </span>{" "}
                · {lead.minutes} min read
              </p>
            </div>
          </article>
        )}
        <div className="article-grid">
          {rest.map((a) => (
            <article key={a.slug} className="article-card">
              <img src={a.photo.src} alt="" loading="lazy" />
              <h2 className="h3">
                <Link to={`/journal/${a.slug}`} className="stretched">
                  {a.title}
                </Link>
              </h2>
              <p>{a.dek}</p>
              <p className="byline">
                {a.author} · <time dateTime={a.date}>{longDate(a.date)}</time> ·{" "}
                {a.minutes} min
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
