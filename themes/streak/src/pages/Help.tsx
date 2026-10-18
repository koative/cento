import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { helpArticles, helpPage } from "../content";
import { Faq, PageHead } from "../components/Parts";

export default function Help() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const q = query.trim().toLowerCase();
  const shown = helpArticles.filter(
    (a) =>
      (!category || a.category === category) &&
      (!q ||
        `${a.title} ${a.summary} ${a.body.join(" ")} ${a.steps?.join(" ") ?? ""}`
          .toLowerCase()
          .includes(q)),
  );

  return (
    <div className="page">
      <PageHead title={helpPage.hero.title} lede={helpPage.hero.lede}>
        <label className="search search-big">
          <Search size={22} aria-hidden="true" />
          <span className="sr-only">Search help articles</span>
          <input
            type="search"
            placeholder="Try “grace day” or “new phone”"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </PageHead>

      <section className="help-layout wrap" aria-label="Help articles">
        <nav className="help-cats" aria-label="Help categories">
          <button
            type="button"
            aria-pressed={!category}
            onClick={() => setCategory("")}
          >
            All topics <small>{helpArticles.length}</small>
          </button>
          {helpPage.categories.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-pressed={category === c.name}
              onClick={() => setCategory(c.name)}
            >
              {c.name}{" "}
              <small>
                {helpArticles.filter((a) => a.category === c.name).length}
              </small>
            </button>
          ))}
        </nav>
        <div>
          <p className="result-count" role="status">
            {q
              ? `${shown.length} ${shown.length === 1 ? "article" : "articles"} matching “${query.trim()}”${category ? ` in ${category}` : ""}`
              : category
                ? helpPage.categories.find((c) => c.name === category)?.text
                : `${shown.length} articles`}
          </p>
          {shown.length ? (
            <ul className="help-list">
              {shown.map((a) => (
                <li key={a.slug}>
                  <Link to={`/help/${a.slug}`}>
                    <span>
                      <strong>{a.title}</strong>
                      {a.summary}
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>
                Nothing in the help centre matches that. Support can answer it
                directly.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Contact support
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="help-faq wrap" aria-labelledby="hfaq-title">
        <h2 id="hfaq-title">Quick answers</h2>
        <Faq items={helpPage.faq} />
      </section>

      <section className="help-contact wrap" aria-labelledby="hc-title">
        <h2 id="hc-title">Still stuck?</h2>
        <p>
          Support is answered by the people who build Streak, within one working
          day.
        </p>
        <Link to="/contact" className="btn btn-primary">
          Write to support
        </Link>
      </section>
    </div>
  );
}
