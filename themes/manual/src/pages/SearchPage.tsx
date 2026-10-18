import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { categories, flows, home, threads } from "../content";
import { categoryOf, codeOf, search, terms } from "../lib/manual";
import { Highlight } from "../components/Inline";

const fromHash = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("q") ?? "";

export function SearchPage() {
  const [q, setQ] = useState(fromHash);
  const [chapter, setChapter] = useState("all");
  const ts = terms(q);
  const results = search(q);
  const shown =
    chapter === "all"
      ? results
      : results.filter((r) => r.article.category === chapter);
  const matches = (s: string) =>
    ts.length > 0 && ts.every((t) => s.toLowerCase().includes(t));
  const flowHits = flows.filter((f) => matches(`${f.title} ${f.summary}`));
  const threadHits = threads
    .filter((t) => matches(`${t.title} ${t.body.join(" ")}`))
    .slice(0, 4);

  const update = (value: string) => {
    setQ(value);
    setChapter("all");
    // Keep the query in the address bar without triggering a route change.
    history.replaceState(
      null,
      "",
      `#/search${value ? `?q=${encodeURIComponent(value)}` : ""}`,
    );
  };

  const submit = (e: FormEvent) => e.preventDefault();

  return (
    <div className="wrap narrow-wide search-page">
      <header className="page-head">
        <h1>Search the manual</h1>
      </header>
      <form
        role="search"
        className="searchbox searchbox-large"
        onSubmit={submit}
      >
        <label htmlFor="search-q" className="sr-only">
          Search articles, troubleshooters and the community
        </label>
        <div className="searchbox-field">
          <Search aria-hidden="true" className="searchbox-icon" />
          <input
            id="search-q"
            data-search-input
            type="search"
            value={q}
            onChange={(e) => update(e.target.value)}
            placeholder="What's going on?"
            autoComplete="off"
          />
        </div>
      </form>

      {ts.length === 0 ? (
        <section className="search-empty" aria-labelledby="try">
          <h2 id="try">Try one of these</h2>
          <p className="popular">
            {home.popularSearches.map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                onClick={() => update(s)}
              >
                {s}
              </button>
            ))}
          </p>
          <p className="muted">
            Or browse the <Link to="/categories">contents</Link> chapter by
            chapter.
          </p>
        </section>
      ) : (
        <>
          <div
            className="filter-row"
            role="group"
            aria-label="Filter by chapter"
          >
            <button
              type="button"
              className="chip"
              aria-pressed={chapter === "all"}
              onClick={() => setChapter("all")}
            >
              All <span className="count">{results.length}</span>
            </button>
            {categories.map((c) => {
              const n = results.filter(
                (r) => r.article.category === c.slug,
              ).length;
              return (
                <button
                  key={c.slug}
                  type="button"
                  className="chip"
                  aria-pressed={chapter === c.slug}
                  disabled={!n}
                  onClick={() => setChapter(c.slug)}
                >
                  {c.title} <span className="count">{n}</span>
                </button>
              );
            })}
          </div>
          <p className="result-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "article" : "articles"} for “
            {q.trim()}”
          </p>

          <ol className="results">
            {shown.map((r) => (
              <li key={r.article.slug}>
                <p className="result-path">
                  <span className="code">{codeOf(r.article)}</span>{" "}
                  {categoryOf(r.article.category)?.title}
                </p>
                <h2>
                  <Link to={`/articles/${r.article.slug}`}>
                    <Highlight text={r.article.title} terms={ts} />
                  </Link>
                </h2>
                <p>
                  <Highlight text={r.snippet} terms={ts} />
                </p>
              </li>
            ))}
          </ol>

          {shown.length === 0 && (
            <div className="empty">
              <h2>No article covers “{q.trim()}” yet</h2>
              <p>
                Try fewer or plainer words, the name of a button, or what you
                see on the screen. If it's urgent, skip ahead:
              </p>
              <p className="empty-actions">
                <Link to="/troubleshoot" className="btn btn-ink">
                  Use a troubleshooter
                </Link>
                <Link to="/contact" className="btn btn-quiet">
                  Contact support
                </Link>
              </p>
            </div>
          )}

          {(flowHits.length > 0 || threadHits.length > 0) && (
            <div className="also">
              {flowHits.length > 0 && (
                <section aria-labelledby="also-flows">
                  <h2 id="also-flows">Troubleshooters</h2>
                  <ul>
                    {flowHits.map((f) => (
                      <li key={f.id}>
                        <Link to={`/troubleshoot/${f.id}`}>{f.title}</Link>
                        <span className="muted"> · {f.summary}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {threadHits.length > 0 && (
                <section aria-labelledby="also-threads">
                  <h2 id="also-threads">In the community</h2>
                  <ul>
                    {threadHits.map((t) => (
                      <li key={t.id}>
                        <Link to={`/community/${t.id}`}>{t.title}</Link>
                        <span className="muted">
                          {" "}
                          · {t.replies.length}{" "}
                          {t.replies.length === 1 ? "reply" : "replies"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
