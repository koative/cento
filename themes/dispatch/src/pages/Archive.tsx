import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { posts, topics, type TopicId } from "../content";
import { minutes } from "../lib/util";
import { PostRow } from "../components/PostRow";

type Sort = "newest" | "oldest" | "longest";
type Kind = "all" | "letter" | "field-note";

export function Archive() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [kind, setKind] = useState<Kind>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = posts.filter(
      (p) =>
        (topic === "all" || p.topic === topic) &&
        (kind === "all" || p.kind === kind) &&
        (!q ||
          `${p.title} ${p.dek} ${p.dateline} ${p.number}`
            .toLowerCase()
            .includes(q)),
    );
    if (sort === "oldest") return [...list].reverse();
    if (sort === "longest")
      return [...list].sort((a, b) => minutes(b) - minutes(a));
    return list;
  }, [query, topic, kind, sort]);

  // Year groups only make sense in date order; "longest" is one flat list.
  const groups =
    sort === "longest"
      ? [{ year: "", items: shown }]
      : shown.reduce<{ year: string; items: typeof shown }[]>((acc, p) => {
          const year = p.date.slice(0, 4);
          const last = acc[acc.length - 1];
          if (last?.year === year) last.items.push(p);
          else acc.push({ year, items: [p] });
          return acc;
        }, []);

  const reset = () => {
    setQuery("");
    setTopic("all");
    setKind("all");
  };

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>The archive</h1>
        <p className="lede">
          Every Sunday Letter and Field Note since March 2019. Search by
          subject, place or issue number, or narrow by topic.
        </p>
      </header>

      <div className="filters" role="search">
        <label className="search">
          <span className="visually-hidden">Search the archive</span>
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: cranes, sleeper, 339…"
          />
        </label>
        <div className="chips" role="group" aria-label="Topic">
          {[{ id: "all" as const, name: "All topics" }, ...topics].map((t) => (
            <button
              key={t.id}
              type="button"
              className="chip"
              aria-pressed={topic === t.id}
              onClick={() => setTopic(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label>
            Show
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as Kind)}
            >
              <option value="all">Letters & Field Notes</option>
              <option value="letter">Sunday Letters</option>
              <option value="field-note">Field Notes</option>
            </select>
          </label>
          <label>
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="longest">Longest read</option>
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "letter" : "letters"}
      </p>

      {shown.length === 0 ? (
        <div className="empty">
          <p>Nothing in the archive matches “{query}” with these filters.</p>
          <button type="button" className="btn btn-line" onClick={reset}>
            Clear search and filters
          </button>
        </div>
      ) : (
        groups.map((g) => (
          <section
            key={g.year || "all"}
            className="year-group"
            aria-label={g.year || "Longest first"}
          >
            {g.year && <h2 className="year-title">{g.year}</h2>}
            <ol className="post-list">
              {g.items.map((p) => (
                <PostRow
                  key={p.slug}
                  post={p}
                  showImage
                  heading={g.year ? "h3" : "h2"}
                />
              ))}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}
