import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { coasts, places, villas, type Place } from "../content";
import { VillaCard } from "../components/VillaCard";
import { mapDistance } from "../components/IslandMap";

export function PlacePage({ place }: { place: Place }) {
  const closest = [...villas]
    .sort(
      (a, b) => mapDistance(a.map, place.map) - mapDistance(b.map, place.map),
    )
    .slice(0, 3);
  const more = places
    .filter(
      (p) =>
        p.slug !== place.slug &&
        (p.kind === place.kind || p.coast === place.coast),
    )
    .slice(0, 3);

  return (
    <article className="page place-page">
      <header className="wrap place-head">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/guide">Island guide</Link>
          <span aria-hidden="true">/</span>
          <span>{place.kind}</span>
        </nav>
        <h1>{place.name}</h1>
        <p className="lede">{place.lede}</p>
      </header>

      <figure className="wrap place-photo">
        <img
          src={place.image}
          alt={place.alt}
          width={1280}
          height={854}
          fetchPriority="high"
        />
        <figcaption>
          {place.name}, {coasts[place.coast].label.toLowerCase()}
        </figcaption>
      </figure>

      <div className="wrap place-body">
        <div className="prose">
          {place.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <aside className="tip" aria-label="Our tip">
            <h2>Our tip</h2>
            <p>{place.tip}</p>
          </aside>
        </div>
        <dl className="place-facts">
          {place.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="wrap section" aria-labelledby="h-closest">
        <div className="section-head">
          <h2 id="h-closest">Houses closest to {place.name}</h2>
          <Link to="/villas" className="text-link">
            All villas <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="villa-row villa-row-3">
          {closest.map((v) => (
            <VillaCard key={v.slug} villa={v} />
          ))}
        </div>
      </section>

      {more.length > 0 && (
        <section className="wrap section" aria-labelledby="h-more">
          <h2 id="h-more">More from the guide</h2>
          <ul className="more-places">
            {more.map((p) => (
              <li key={p.slug}>
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  width={1280}
                  height={854}
                />
                <Link to={`/guide/${p.slug}`}>{p.name}</Link>
                <span>{p.lede}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
