import { ArrowDown, ArrowUp, Play } from "lucide-react";
import { episodes, shows } from "../content";
import { Link } from "../router";
import { minutes } from "../lib/format";
import { episodeById, player, usePlayer } from "../lib/player";
import { EpisodeRow } from "../components/EpisodeRow";
import { Cover } from "../components/Cover";

export function ListeningList() {
  const { queue, progress } = usePlayer();
  const list = queue.map((id) => episodeById(id)!);
  const total = list.reduce(
    (n, e) => n + e.duration - Math.min(progress[e.id] ?? 0, e.duration),
    0,
  );
  const unfinished = episodes.filter(
    (e) =>
      (progress[e.id] ?? 0) > 0 &&
      progress[e.id] < e.duration &&
      !queue.includes(e.id),
  );

  return (
    <>
      <section className="wrap page-head">
        <h1>Your listening list</h1>
        <p className="lede">
          Episodes saved for later, in the order you want them. When one
          finishes, the next starts by itself. The list stays on this device.
        </p>
      </section>

      <section className="wrap" aria-label="Saved episodes">
        {list.length ? (
          <>
            <div className="list-bar">
              <p aria-live="polite">
                {list.length} {list.length === 1 ? "episode" : "episodes"} ·
                about {minutes(total)} of listening
              </p>
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-ink"
                  onClick={player.playQueue}
                >
                  <Play aria-hidden="true" /> Play the list
                </button>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={player.clearQueue}
                >
                  Clear the list
                </button>
              </div>
            </div>
            <ol className="ep-list ep-list-numbered">
              {list.map((e, i) => (
                <EpisodeRow
                  key={e.id}
                  ep={e}
                  level={2}
                  extra={
                    <>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Move ${e.title} up`}
                        disabled={i === 0}
                        onClick={() => player.move(e.id, -1)}
                      >
                        <ArrowUp aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Move ${e.title} down`}
                        disabled={i === list.length - 1}
                        onClick={() => player.move(e.id, 1)}
                      >
                        <ArrowDown aria-hidden="true" />
                      </button>
                    </>
                  }
                />
              ))}
            </ol>
          </>
        ) : (
          <div className="empty empty-list">
            <h2>Nothing saved yet.</h2>
            <p>
              Use “Listen later” on any episode to keep it here. A few places to
              start:
            </p>
            <ul className="starter">
              {shows.slice(0, 3).map((s) => {
                const ep = episodes.find((e) => e.show === s.slug)!;
                return (
                  <li key={s.slug}>
                    <Cover show={s} />
                    <div>
                      <Link to={`/episodes/${ep.id}`}>{ep.title}</Link>
                      <span>
                        {s.title} · {minutes(ep.duration)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-line"
                      onClick={() => player.toggleQueued(ep.id)}
                    >
                      Save
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {unfinished.length > 0 && (
        <section className="wrap" aria-labelledby="resume-h">
          <h2 id="resume-h">Pick up where you left off</h2>
          <ul className="ep-list">
            {unfinished.map((e) => (
              <EpisodeRow key={e.id} ep={e} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
