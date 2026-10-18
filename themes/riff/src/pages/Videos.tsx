import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { releases, videos, type VideoKind } from "../content";
import { Link } from "../router";
import { longDate } from "../lib/format";
import { Photo } from "../components/Cards";

const kinds: ("All" | VideoKind)[] = [
  "All",
  "Music video",
  "Live session",
  "Tour diary",
];

export function Videos() {
  const initial = new URLSearchParams(window.location.hash.split("?")[1]).get(
    "v",
  );
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [id, setId] = useState(
    videos.some((v) => v.id === initial) ? initial! : videos[0].id,
  );
  const list = videos.filter((v) => kind === "All" || v.kind === kind);
  const on = videos.find((v) => v.id === id)!;
  const release = releases.find((r) => r.slug === on.release);

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Videos</h1>
        <p className="lede">
          Music videos, one-take sessions from the basement, and the tour
          diaries Dario cuts in the back of the van.
        </p>
      </header>

      <section className="wrap screen" aria-label="Selected video">
        <a
          className="screen-frame"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Photo photo={on.photo} red eager />
          <span className="screen-play">
            <Play aria-hidden="true" />
            <span>Watch on YouTube</span>
          </span>
        </a>
        <div className="screen-info">
          <h2 className="display-md" aria-live="polite">
            {on.title}
          </h2>
          <p>{on.blurb}</p>
          <dl className="facts facts-tight">
            <div>
              <dt>Type</dt>
              <dd>{on.kind}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{on.length}</dd>
            </div>
            <div>
              <dt>Directed by</dt>
              <dd>{on.director}</dd>
            </div>
            <div>
              <dt>Filmed at</dt>
              <dd>{on.location}</dd>
            </div>
            <div>
              <dt>Premiered</dt>
              <dd>{longDate(on.date)}</dd>
            </div>
          </dl>
          {release && (
            <Link to={`/music/${release.slug}`} className="more-link">
              From {release.title} <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="all">
        <div className="toolbar">
          <h2 id="all" className="display-md">
            All videos
          </h2>
          <div className="segmented" role="group" aria-label="Video type">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <ul className="video-list">
          {list.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                className="video-tile"
                aria-pressed={v.id === id}
                onClick={() => {
                  setId(v.id);
                  window.scrollTo({
                    top: 0,
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "auto"
                      : "smooth",
                  });
                }}
              >
                <Photo photo={v.photo} />
                <span className="video-play" aria-hidden="true">
                  <Play />
                </span>
                <span className="video-caption">
                  <strong>{v.title}</strong>
                  <span>
                    {v.kind} · {v.length}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
