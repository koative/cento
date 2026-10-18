import { useState } from "react";
import { ArrowRight, Mail, Phone, Search } from "lucide-react";
import { Link } from "../router";
import {
  articles,
  brand,
  helpCategories,
  helpPage,
  type HelpCategory,
} from "../content";
import { hashParam } from "../lib/quote";

export function Help() {
  const [query, setQuery] = useState(hashParam("q") ?? "");
  const [category, setCategory] = useState<HelpCategory | "all">("all");
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = articles.filter(
    (a) =>
      (category === "all" || a.category === category) &&
      words.every((w) =>
        `${a.title} ${a.summary} ${a.body.map((b) => b.text).join(" ")}`
          .toLowerCase()
          .includes(w),
      ),
  );

  return (
    <>
      <section className="wrap page-head help-head">
        <h1>{helpPage.title}</h1>
        <p className="lede">{helpPage.text}</p>
        <div className="search search-large" role="search">
          <label htmlFor="help-q" className="sr-only">
            Search help articles
          </label>
          <Search aria-hidden="true" size={20} />
          <input
            id="help-q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: deductible, moving, missed payment…"
          />
        </div>
      </section>

      <section className="wrap help-body" aria-label="Help articles">
        <div className="chips" role="group" aria-label="Filter by topic">
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            All topics
          </button>
          {helpCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length
            ? `${shown.length} ${shown.length === 1 ? "article" : "articles"}`
            : "No articles match"}
          {query && ` for “${query}”`}
        </p>
        {shown.length ? (
          <ul className="article-list">
            {shown.map((a) => (
              <li key={a.slug}>
                <Link to={`/help/${a.slug}`}>
                  <span className="article-cat">
                    {helpCategories.find((c) => c.id === a.category)!.label}
                  </span>
                  <span className="article-title">{a.title}</span>
                  <span className="article-sum">{a.summary}</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              Try a shorter word, or clear the topic filter. Or ask a person:
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      <section className="wrap faq help-faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Asked every day</h2>
        <div className="disclosures">
          {helpPage.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="band contact-band" aria-labelledby="contact-h">
        <div className="wrap contact-grid">
          <h2 id="contact-h">Talk to the policy desk</h2>
          <p>{brand.hours}</p>
          <p className="contact-links">
            <a href={brand.phoneHref}>
              <Phone aria-hidden="true" size={18} /> {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`}>
              <Mail aria-hidden="true" size={18} /> {brand.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
