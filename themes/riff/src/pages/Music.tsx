import { useState } from "react";
import { releases, streaming, type ReleaseKind } from "../content";
import { Link } from "../router";
import { totalLength } from "../lib/format";
import { Cover } from "../components/Cover";

const kinds: ("All" | ReleaseKind)[] = ["All", "Album", "EP", "Single", "Live"];

export function Music() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [order, setOrder] = useState<"new" | "old">("new");
  const list = releases
    .filter((r) => kind === "All" || r.kind === kind)
    .sort((a, b) =>
      order === "new"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Discography</h1>
        <p className="lede">
          Six records since 2019. Every one of them was made in, or because of,
          the same basement.
        </p>
      </header>

      <section className="wrap" aria-label="Releases">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Release type">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k === "All" ? "All" : k === "Live" ? "Live" : `${k}s`}
              </button>
            ))}
          </div>
          <label className="select">
            <span>Sort</span>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "new" | "old")}
            >
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "release" : "releases"}
        </p>

        <ul className="disco">
          {list.map((r) => (
            <li key={r.slug}>
              <Link to={`/music/${r.slug}`} className="disco-item">
                <Cover release={r} />
                <span className="disco-body">
                  <span className="disco-kind">
                    {r.kind} · {r.date.slice(0, 4)}
                  </span>
                  <strong className="disco-title">{r.title}</strong>
                  <span className="disco-blurb">{r.blurb}</span>
                  <span className="disco-meta">
                    {r.tracks.length}{" "}
                    {r.tracks.length === 1 ? "track" : "tracks"} ·{" "}
                    {totalLength(r.tracks)} · {r.catalog}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap stream-band" aria-labelledby="stream">
        <h2 id="stream" className="display-md">
          Stream everything
        </h2>
        <ul className="stream-links">
          {streaming.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="quiet">
          Bandcamp pays us the most per sale. Buying a record at a show pays us
          the most of all.
        </p>
      </section>
    </>
  );
}
