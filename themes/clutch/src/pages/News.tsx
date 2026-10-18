import { useState } from "react";
import { Link } from "../router";
import { articles, type Article } from "../content";
import { byDate, longDate } from "../lib/format";

const categories = [...new Set(articles.map((a) => a.category))];
const sorted = [...articles].sort(byDate).reverse();

export function News() {
  const [cat, setCat] = useState<Article["category"] | "All">("All");
  const list = sorted.filter((a) => cat === "All" || a.category === cat);
  const [lead, ...rest] = list;

  return (
    <>
      <header className="page-head wrap">
        <h1>News</h1>
        <p className="lede">
          Match reports, roster moves and club news, written by the people who
          were in the room.
        </p>
        <div className="segmented" role="group" aria-label="Filter by category">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <section className="wrap news-page" aria-live="polite">
        {lead && (
          <Link to={`/news/${lead.slug}`} className="news-lead news-lead-wide">
            <img
              src={lead.image}
              alt={lead.imageAlt}
              width={1800}
              height={1200}
              className="cut"
            />
            <span className="news-text">
              <span className="news-cat">
                {lead.category} · {longDate(lead.date)}
              </span>
              <strong>{lead.title}</strong>
              <span>{lead.dek}</span>
            </span>
          </Link>
        )}
        <ul className="news-grid">
          {rest.map((a) => (
            <li key={a.slug}>
              <Link to={`/news/${a.slug}`}>
                <img
                  src={a.image}
                  alt=""
                  width={1800}
                  height={1200}
                  loading="lazy"
                />
                <span className="news-cat">
                  {a.category} · {longDate(a.date)}
                </span>
                <strong>{a.title}</strong>
                <span>{a.dek}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
