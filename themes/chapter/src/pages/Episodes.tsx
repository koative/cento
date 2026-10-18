import { useState } from "react";
import { Search } from "lucide-react";
import { episodes, shows, type Episode } from "../content";
import { EpisodeRow } from "../components/EpisodeRow";

const lengths = {
  any: { label: "Any length", test: () => true },
  short: {
    label: "Under 40 minutes",
    test: (e: Episode) => e.duration < 40 * 60,
  },
  mid: {
    label: "40 to 50 minutes",
    test: (e: Episode) => e.duration >= 40 * 60 && e.duration <= 50 * 60,
  },
  long: {
    label: "Over 50 minutes",
    test: (e: Episode) => e.duration > 50 * 60,
  },
};
const sorts = {
  newest: {
    label: "Newest first",
    fn: (a: Episode, b: Episode) => b.date.localeCompare(a.date),
  },
  oldest: {
    label: "Oldest first",
    fn: (a: Episode, b: Episode) => a.date.localeCompare(b.date),
  },
  shortest: {
    label: "Shortest first",
    fn: (a: Episode, b: Episode) => a.duration - b.duration,
  },
  longest: {
    label: "Longest first",
    fn: (a: Episode, b: Episode) => b.duration - a.duration,
  },
};

export function Episodes() {
  const [q, setQ] = useState("");
  const [show, setShow] = useState("all");
  const [length, setLength] = useState<keyof typeof lengths>("any");
  const [sort, setSort] = useState<keyof typeof sorts>("newest");

  const needle = q.trim().toLowerCase();
  const list = episodes
    .filter((e) => show === "all" || e.show === show)
    .filter(lengths[length].test)
    .filter(
      (e) =>
        !needle ||
        [
          e.title,
          e.summary,
          ...e.guests.map((g) => `${g.name} ${g.role}`),
          ...e.chapters.map((c) => c.title),
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
    )
    .sort(sorts[sort].fn);

  const reset = () => {
    setQ("");
    setShow("all");
    setLength("any");
  };

  return (
    <>
      <section className="wrap page-head">
        <h1>Every episode</h1>
        <p className="lede">
          The newest from all six shows. Search titles, guests and chapter names
          — if someone told you about “the bit with the moth trap”, this is
          where you find it.
        </p>
      </section>

      <section className="wrap" aria-label="Episode archive">
        <div className="filters filters-grid">
          <label className="search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search episodes</span>
            <input
              type="search"
              placeholder="Title, guest or chapter"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <label className="select">
            <span>Show</span>
            <select value={show} onChange={(e) => setShow(e.target.value)}>
              <option value="all">All shows</option>
              {shows.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          <label className="select">
            <span>Length</span>
            <select
              value={length}
              onChange={(e) =>
                setLength(e.target.value as keyof typeof lengths)
              }
            >
              {Object.entries(lengths).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length === episodes.length
            ? `All ${episodes.length} episodes`
            : `${list.length} of ${episodes.length} episodes`}
        </p>
        {list.length ? (
          <ul className="ep-list">
            {list.map((e) => (
              <EpisodeRow key={e.id} ep={e} level={2} />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              Nothing matches those filters. Try a guest's surname, or widen the
              length.
            </p>
            <button type="button" className="btn btn-line" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
