import { useState } from "react";
import { Search } from "lucide-react";
import { essays, partnerBySlug, type Essay } from "../content";
import { EssayRow } from "../components/EssayRow";

const topics: (Essay["topic"] | "All")[] = [
  "All",
  "Founders",
  "Markets",
  "Letters",
];

export function Writing() {
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = essays.filter(
    (e) =>
      (topic === "All" || e.topic === topic) &&
      (!q ||
        `${e.title} ${e.dek} ${partnerBySlug(e.author)?.name}`
          .toLowerCase()
          .includes(q)),
  );

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>Writing</h1>
        <p className="lede">
          Notes from the partnership on the markets we invest in and the
          decisions founders face. We publish when we have something to say,
          which is roughly once a quarter.
        </p>
      </header>

      <div className="filters" role="search">
        <div className="search">
          <Search aria-hidden="true" />
          <label htmlFor="writing-q" className="sr-only">
            Search writing
          </label>
          <input
            id="writing-q"
            type="search"
            placeholder="Search titles and authors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chips" role="group" aria-label="Topic">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
            >
              {t === "All" ? "Everything" : t}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "essay" : "essays"}
      </p>

      {shown.length ? (
        <div className="essay-list">
          {shown.map((e) => (
            <EssayRow key={e.slug} essay={e} level="h2" />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>
            Nothing matches that yet. Try another word, or read the latest
            letter instead.
          </p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setTopic("All");
              setQuery("");
            }}
          >
            Show everything
          </button>
        </div>
      )}
    </div>
  );
}
