import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Link } from "../router";
import { searchPage } from "../content";
import { search, type Kind } from "../lib/search";

const KINDS: (Kind | "All")[] = ["All", "Guide", "API", "Changelog"];

function Mark({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  return (
    <>
      {text
        .split(re)
        .map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}
    </>
  );
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<Kind | "All">("All");
  const input = useRef<HTMLInputElement>(null);
  const hits = search(query, kind);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  useEffect(() => input.current?.focus(), []);

  return (
    <div className="wrap page search-page">
      <header className="page-head">
        <h1>{searchPage.h1}</h1>
      </header>
      <form
        role="search"
        className="search-box"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search-input" className="sr-only">
          Search guides, API reference and changelog
        </label>
        <SearchIcon size={20} aria-hidden />
        <input
          id="search-input"
          ref={input}
          type="search"
          placeholder="webhook signature, retry, cron…"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div role="group" aria-label="Limit results to" className="chips">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            {k === "All" ? "Everything" : k === "Guide" ? "Guides" : k}
          </button>
        ))}
      </div>

      <p className="result-count" role="status">
        {terms.length
          ? `${hits.length} ${hits.length === 1 ? "result" : "results"} for “${query.trim()}”`
          : ""}
      </p>

      {!terms.length && (
        <div className="suggest">
          <p>Popular searches</p>
          <ul>
            {searchPage.suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="chip-btn"
                  onClick={() => setQuery(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {terms.length > 0 && hits.length === 0 && (
        <div className="empty">
          <p>
            Nothing matches “{query.trim()}”
            {kind !== "All" && ` in ${kind === "Guide" ? "guides" : kind}`}.
            Check the spelling, try a shorter word, or{" "}
            <Link to="/support">ask the team</Link>.
          </p>
          {kind !== "All" && (
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setKind("All")}
            >
              Search everything instead
            </button>
          )}
        </div>
      )}

      <ol className="hits">
        {hits.map((h) => (
          <li key={h.title + h.to}>
            <Link to={h.to}>
              <span className="hit-kind">{h.kind}</span>
              <span className="hit-title">
                <Mark text={h.title} terms={terms} />
              </span>
              <span className="hit-meta">{h.meta}</span>
              <span className="hit-snippet">
                <Mark text={h.snippet} terms={terms} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
