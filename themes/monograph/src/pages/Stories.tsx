import { useState } from "react";
import { Search } from "lucide-react";
import { articles, pageCopy, sections, type Article } from "../content";
import { byIssueThenPage, contributorOf, wordCount } from "../lib/magazine";
import { StoryItem } from "../components/StoryItem";

const sorts = {
  newest: { label: "Newest issue first", fn: byIssueThenPage },
  longest: {
    label: "Longest read first",
    fn: (a, b) => wordCount(b) - wordCount(a),
  },
  shortest: {
    label: "Shortest read first",
    fn: (a, b) => wordCount(a) - wordCount(b),
  },
} satisfies Record<
  string,
  { label: string; fn: (a: Article, b: Article) => number }
>;

export function Stories() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("all");
  const [sort, setSort] = useState<keyof typeof sorts>("newest");

  const q = query.trim().toLowerCase();
  const shown = articles
    .filter((a) => section === "all" || a.section === section)
    .filter(
      (a) =>
        !q ||
        [a.title, a.standfirst, contributorOf(a.author).name]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort(sorts[sort].fn);

  return (
    <div className="page wrap stories">
      <header className="page-head">
        <h1>Stories</h1>
        <p className="lead">{pageCopy.stories}</p>
      </header>

      <div className="filters">
        <div className="field search-field">
          <label htmlFor="story-search">Search titles and writers</label>
          <div className="search-input">
            <Search size={18} aria-hidden="true" />
            <input
              id="story-search"
              type="search"
              value={query}
              placeholder="Salt, ferry, Elena Moss…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <fieldset className="chips">
          <legend>Section</legend>
          {[{ slug: "all", name: "All" }, ...sections].map((s) => (
            <label key={s.slug}>
              <input
                type="radio"
                name="section"
                value={s.slug}
                checked={section === s.slug}
                onChange={() => setSection(s.slug)}
              />
              <span>{s.name}</span>
            </label>
          ))}
        </fieldset>
        <div className="field">
          <label htmlFor="story-sort">Order</label>
          <select
            id="story-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-count" role="status">
        {shown.length} {shown.length === 1 ? "story" : "stories"}
      </p>

      {shown.length ? (
        <div className="story-list">
          {shown.map((a) => (
            <StoryItem key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>
            Nothing online matches “{query}”
            {section !== "all" ? " in this section" : ""}.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQuery("");
              setSection("all");
            }}
          >
            Clear search and section
          </button>
        </div>
      )}
    </div>
  );
}
