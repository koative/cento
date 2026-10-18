import type { ReactNode } from "react";
import { shows, type Episode } from "../content";
import { Link } from "../router";
import { date, minutes } from "../lib/format";
import { usePlayer } from "../lib/player";
import { Cover } from "./Cover";
import { PlayButton, QueueButton } from "./Controls";

/** One line of an episode list: cover, show and number, title, guest, length or progress, actions. */
export function EpisodeRow({
  ep,
  level = 3,
  extra,
}: {
  ep: Episode;
  level?: 2 | 3;
  extra?: ReactNode;
}) {
  const show = shows.find((s) => s.slug === ep.show)!;
  const at = usePlayer().progress[ep.id] ?? 0;
  const H = `h${level}` as const;
  const length =
    at >= ep.duration
      ? "Played"
      : at > 0
        ? `${minutes(ep.duration - at)} left`
        : minutes(ep.duration);
  return (
    <li className="ep-row">
      <Link
        to={`/shows/${show.slug}`}
        className="ep-cover"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Cover show={show} />
      </Link>
      <div className="ep-main">
        <p className="ep-meta">
          <Link to={`/shows/${show.slug}`}>{show.title}</Link>
          <span>
            S{ep.season} · E{ep.number}
          </span>
          <time dateTime={ep.date}>{date(ep.date)}</time>
        </p>
        <H className="ep-title">
          <Link to={`/episodes/${ep.id}`}>{ep.title}</Link>
        </H>
        <p className="ep-guest">
          with{" "}
          {ep.guests
            .map((g) => `${g.name}, ${g.role.toLowerCase()}`)
            .join(" and ")}
        </p>
      </div>
      <p className="ep-length" data-progress={at > 0 ? "" : undefined}>
        {at > 0 && at < ep.duration && (
          <span className="ep-bar" aria-hidden="true">
            <span style={{ width: `${(at / ep.duration) * 100}%` }} />
          </span>
        )}
        {length}
      </p>
      <div className="ep-actions">
        {extra}
        <QueueButton ep={ep} />
        <PlayButton ep={ep} />
      </div>
    </li>
  );
}
