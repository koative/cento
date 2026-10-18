import { Link } from "../router";
import { artists, exhibitions, works } from "../content";
import { WorkPlate } from "../components/WorkCard";

export function Artists() {
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="display">Artists</h1>
        <p className="lede">
          Eight living artists, represented for the long run. We work with each
          of them on exhibitions, books and editions, and place their work with
          collectors and museums.
        </p>
      </header>

      <ul className="artist-grid">
        {artists.map((a) => {
          const work = works.find((w) => w.artist === a.slug)!;
          const showing = exhibitions.find(
            (e) => e.status !== "past" && e.artists.includes(a.slug),
          );
          return (
            <li key={a.slug} className="artist-card">
              <Link
                to={`/artists/${a.slug}`}
                className="artist-card-media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <WorkPlate work={work} />
              </Link>
              <h2>
                <Link to={`/artists/${a.slug}`}>{a.name}</Link>
              </h2>
              <p>{a.practice}</p>
              <p className="quiet">
                {a.born}. {a.based}.
              </p>
              {showing && (
                <p className="artist-showing">
                  {showing.status === "current"
                    ? "On view now: "
                    : "Coming up: "}
                  <Link to={`/exhibitions/${showing.slug}`}>
                    {showing.title}
                  </Link>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
