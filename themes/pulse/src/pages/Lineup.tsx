import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import {
  artists,
  days,
  images,
  stages,
  type DayId,
  type StageId,
} from "../content";
import { minutes } from "../lib/schedule";
import { Waveform } from "../components/Waveform";

type Sort = "poster" | "az" | "time";
const dayOrder: DayId[] = ["fri", "sat", "sun"];

export function Lineup() {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState<DayId | "all">("all");
  const [stage, setStage] = useState<StageId | "all">("all");
  const [sort, setSort] = useState<Sort>("poster");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = artists.filter(
      (a) =>
        (day === "all" || a.day === day) &&
        (stage === "all" || a.stage === stage) &&
        (!q ||
          [a.name, a.genre, a.origin, ...a.moods].some((s) =>
            s.toLowerCase().includes(q),
          )),
    );
    const when = (a: (typeof artists)[number]) =>
      dayOrder.indexOf(a.day) * 10000 + minutes(a.start);
    return list.sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : sort === "time"
          ? when(a) - when(b)
          : a.billing - b.billing || when(a) - when(b),
    );
  }, [query, day, stage, sort]);

  const reset = () => {
    setQuery("");
    setDay("all");
    setStage("all");
  };

  return (
    <>
      <header className="page-head page-head-photo">
        <img
          src={images.dj}
          alt="A hand adjusting a DJ controller lit violet and red"
          width="1600"
          height="1066"
        />
        <div className="wrap">
          <h1>Lineup</h1>
          <p>
            Thirty acts across four stages, from a grand piano in the Glasshouse
            to a breakfast set in the Turbine. Every set time is final.
          </p>
        </div>
      </header>

      <section className="wrap section-tight" aria-label="Filter the lineup">
        <div className="filters">
          <div className="search">
            <label htmlFor="q">Search artists, genres, cities</label>
            <div className="search-box">
              <Search aria-hidden="true" />
              <input
                id="q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “acid” or “Berlin”"
              />
            </div>
          </div>
          <fieldset className="chips">
            <legend>Day</legend>
            {(["all", ...dayOrder] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={day === d}
                onClick={() => setDay(d)}
              >
                {d === "all" ? "All days" : days.find((x) => x.id === d)!.label}
              </button>
            ))}
          </fieldset>
          <div className="select">
            <label htmlFor="stage">Stage</label>
            <select
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value as StageId | "all")}
            >
              <option value="all">All stages</option>
              {stages.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select">
            <label htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="poster">Poster order</option>
              <option value="time">Set time</option>
              <option value="az">A — Z</option>
            </select>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length === artists.length
            ? `All ${artists.length} artists`
            : `${shown.length} of ${artists.length} artists`}
        </p>

        {shown.length ? (
          <ul className="artist-list">
            {shown.map((a) => (
              <li key={a.slug} data-stage={a.stage} data-billing={a.billing}>
                <Link to={`/lineup/${a.slug}`}>
                  <Waveform seed={a.slug} bars={28} />
                  <span className="artist-name">{a.name}</span>
                  <span className="artist-meta">
                    {a.genre} · {a.origin} · {a.format}
                  </span>
                  <span className="artist-when">
                    <span className="stage-tag">
                      {stages.find((s) => s.id === a.stage)!.name}
                    </span>
                    {days.find((d) => d.id === a.day)!.label} · {a.start}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>Nobody matches that yet. Try a broader search or another day.</p>
            <button type="button" className="btn btn-line" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
