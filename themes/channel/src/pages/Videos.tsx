import { useState } from "react";
import { Search } from "lucide-react";
import { series, videos, type Video } from "../content";
import { VideoCard } from "../components/VideoCard";

const sorts: Record<
  string,
  { label: string; fn: (a: Video, b: Video) => number }
> = {
  newest: {
    label: "Newest first",
    fn: (a, b) => b.published.localeCompare(a.published),
  },
  popular: { label: "Most viewed", fn: (a, b) => b.views - a.views },
  long: { label: "Longest", fn: (a, b) => b.duration - a.duration },
  short: { label: "Shortest", fn: (a, b) => a.duration - b.duration },
};
type SortKey = keyof typeof sorts;

export function Videos() {
  const [query, setQuery] = useState("");
  const [only, setOnly] = useState("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const q = query.trim().toLowerCase();
  const list = videos
    .filter((v) => only === "all" || v.series === only)
    .filter((v) => !q || (v.title + " " + v.summary).toLowerCase().includes(q))
    .sort(sorts[sort].fn);

  return (
    <>
      <header className="page-head wrap">
        <h1>Every build, every rescue</h1>
        <p className="lead">
          {videos.length} episodes and counting, from flooded-barn drill presses
          to ten-dollar shop furniture. A new one lands every Thursday at 6 pm
          ET.
        </p>
      </header>

      <section className="wrap" aria-label="Video library">
        <div className="toolbar">
          <div className="search">
            <Search size={18} aria-hidden="true" />
            <label htmlFor="video-search" className="visually-hidden">
              Search videos
            </label>
            <input
              id="video-search"
              type="search"
              placeholder="Search vise, trailer, flux core…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="chips" role="group" aria-label="Filter by series">
            <button
              type="button"
              aria-pressed={only === "all"}
              onClick={() => setOnly("all")}
            >
              All
            </button>
            {series.map((s) => (
              <button
                key={s.slug}
                type="button"
                data-tone={s.tone}
                aria-pressed={only === s.slug}
                onClick={() => setOnly(s.slug)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="sort">
            <label htmlFor="video-sort">Sort</label>
            <select
              id="video-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length === videos.length
            ? `Showing all ${list.length} videos`
            : `${list.length} of ${videos.length} videos`}
        </p>

        {list.length ? (
          <div className="video-grid video-grid-lib">
            {list.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Nothing on the bench for “{query}”</h2>
            <p>
              Try a machine or a material instead: vise, channel, mower, gas.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setOnly("all");
              }}
            >
              Clear search and filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
