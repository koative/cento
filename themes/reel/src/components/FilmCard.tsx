import { Link } from "../router";
import type { Film } from "../content";

export function FilmCard({
  film,
  logline = true,
  heading: H = "h3",
}: {
  film: Film;
  logline?: boolean;
  heading?: "h2" | "h3";
}) {
  return (
    <article className="film-card">
      <Link to={`/films/${film.slug}`} className="film-card-link">
        <span className="film-card-frame">
          <img
            src={film.still.src}
            alt={film.still.alt}
            width={film.still.w}
            height={film.still.h}
            loading="lazy"
          />
        </span>
        <H className="film-card-title">{film.title}</H>
      </Link>
      <p className="film-card-meta">
        {film.status !== "Released" && (
          <span className="status">{film.status}</span>
        )}
        {film.form} · {film.year} · {film.runtime} min · {film.subject}
      </p>
      {logline && <p className="film-card-logline">{film.logline}</p>}
    </article>
  );
}
