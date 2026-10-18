import { Link, navigate } from "../router";
import { exhibitions, works, type Artist } from "../content";
import { dateRange } from "../lib/format";
import { shortlist } from "../lib/store";
import { WorkCard } from "../components/WorkCard";

export function ArtistPage({ artist }: { artist: Artist }) {
  const own = works.filter((w) => w.artist === artist.slug);
  const available = own.filter((w) => w.status === "available");
  const shows = exhibitions.filter((e) => e.artists.includes(artist.slug));

  const enquire = () => {
    shortlist.set([
      ...new Set([...shortlist.get(), ...available.map((w) => w.id)]),
    ]);
    navigate("/enquire");
  };

  return (
    <article className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/artists">Artists</Link>
      </nav>
      <header className="artist-head">
        <h1 className="display">{artist.name}</h1>
        <p className="artist-meta">
          {artist.born}. {artist.based}.
          <br />
          {artist.practice}.
        </p>
      </header>

      <div className="artist-intro">
        <blockquote>
          <p>“{artist.statement}”</p>
        </blockquote>
        <div className="prose">
          {artist.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {available.length > 0 && (
            <button type="button" className="btn" onClick={enquire}>
              Ask about {available.length} available{" "}
              {available.length === 1 ? "work" : "works"}
            </button>
          )}
        </div>
      </div>

      <section className="section" aria-labelledby="works-title">
        <div className="section-head">
          <h2 id="works-title">Works</h2>
          <p className="section-note">
            {available.length} of {own.length} available. Prices include framing
            where noted and exclude sales tax.
          </p>
        </div>
        <div className="work-grid">
          {own.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      </section>

      <div className="artist-columns">
        <section aria-labelledby="shows-title">
          <h2 id="shows-title">At Folio</h2>
          <ul className="line-list">
            {shows.map((e) => (
              <li key={e.slug}>
                <Link to={`/exhibitions/${e.slug}`}>{e.title}</Link>
                <span>{dateRange(e.opens, e.closes)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="cv-title">
          <h2 id="cv-title">Selected exhibitions</h2>
          <ul className="line-list">
            {artist.cv.map((c) => (
              <li key={c.year + c.title}>
                <span className="num">{c.year}</span>
                <span>
                  <cite>{c.title}</cite>, {c.venue}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
