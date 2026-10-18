import { useState } from "react";
import { Search } from "lucide-react";
import { speakers, tracks, type TrackId } from "../content";
import { SpeakerCard } from "../components/SpeakerCard";

export function Speakers() {
  const [track, setTrack] = useState<TrackId | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"track" | "name">("track");

  const q = query.trim().toLowerCase();
  const order = tracks.map((t) => t.id);
  const shown = speakers
    .filter((s) => track === "all" || s.track === track)
    .filter(
      (s) =>
        !q ||
        [s.name, s.role, s.org, s.city, ...s.topics]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : order.indexOf(a.track) - order.indexOf(b.track),
    );

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Speakers</h1>
        <p className="lede">
          Twelve designers from type, interface, systems, space and practice.
          Every one of them is paid the same fee and asked the same thing: take
          one piece of work apart in front of the room.
        </p>
      </header>

      <div className="toolbar">
        <div className="filters" role="group" aria-label="Filter by track">
          <button
            type="button"
            className="filter"
            aria-pressed={track === "all"}
            onClick={() => setTrack("all")}
          >
            All tracks
          </button>
          {tracks.map((t) => (
            <button
              key={t.id}
              type="button"
              className="filter"
              data-track={t.id}
              aria-pressed={track === t.id}
              onClick={() => setTrack(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <label className="search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search speakers</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, studio, topic"
            />
          </label>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "track" | "name")}
            >
              <option value="track">By track</option>
              <option value="name">A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "speaker" : "speakers"}
      </p>

      {shown.length ? (
        <div className="speaker-grid">
          {shown.map((s, i) => (
            <SpeakerCard key={s.slug} speaker={s} eager={i < 4} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>Nobody matches “{query}” in that track.</p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setQuery("");
              setTrack("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      <p className="quiet-line">
        More speakers are announced in February. The programme letter tells you
        first.
      </p>
    </div>
  );
}
