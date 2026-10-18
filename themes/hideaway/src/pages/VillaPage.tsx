import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  coasts,
  places,
  seasons,
  villas,
  type Season,
  type Villa,
} from "../content";
import { lowestRate, money } from "../lib/stay";
import { AvailabilityCalendar } from "../components/AvailabilityCalendar";
import { IslandMap, mapDistance } from "../components/IslandMap";
import { VillaCard } from "../components/VillaCard";

const SEASON_MONTHS: Record<Season, string> = {
  low: "November – March",
  mid: "April, May, October",
  high: "June, September",
  peak: "July, August",
};

export function VillaPage({ villa }: { villa: Villa }) {
  const [lead, ...rest] = villa.photos;
  const nearby = [...places]
    .sort(
      (a, b) => mapDistance(a.map, villa.map) - mapDistance(b.map, villa.map),
    )
    .slice(0, 3);
  const related = villas
    .filter((v) => v.slug !== villa.slug)
    .sort(
      (a, b) =>
        Number(b.coast === villa.coast) - Number(a.coast === villa.coast) ||
        Math.abs(a.sleeps - villa.sleeps) - Math.abs(b.sleeps - villa.sleeps),
    )
    .slice(0, 3);

  return (
    <article className="page villa-page">
      <header className="wrap villa-head">
        <div>
          <nav aria-label="Breadcrumb" className="crumbs">
            <Link to="/villas">Villas</Link>
            <span aria-hidden="true">/</span>
            <span>{coasts[villa.coast].label}</span>
          </nav>
          <h1 className="plaque plaque-large">{villa.name}</h1>
          <p className="villa-place">{villa.place}</p>
          <p className="lede">{villa.summary}</p>
        </div>
        <dl className="villa-facts">
          <div>
            <dt>Sleeps</dt>
            <dd>{villa.sleeps}</dd>
          </div>
          <div>
            <dt>Bedrooms</dt>
            <dd>{villa.bedrooms}</dd>
          </div>
          <div>
            <dt>Bathrooms</dt>
            <dd>{villa.bathrooms}</dd>
          </div>
          <div>
            <dt>Nightly</dt>
            <dd>from {money(lowestRate(villa))}</dd>
          </div>
        </dl>
      </header>

      <div className="wrap gallery">
        <figure className="gallery-lead arch">
          <img
            src={lead.src}
            alt={lead.alt}
            width={1280}
            height={853}
            fetchPriority="high"
          />
          <figcaption>{lead.caption}</figcaption>
        </figure>
        {rest.map((p) => (
          <figure key={p.caption}>
            <img
              src={p.src}
              alt={p.alt}
              width={1280}
              height={853}
              loading="lazy"
            />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      <section className="wrap villa-story" aria-labelledby="h-story">
        <div className="villa-story-text">
          <h2 id="h-story">The house</h2>
          {villa.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside className="villa-aside">
          <h3>Pool</h3>
          <p>{villa.pool ?? "No pool. The sea is the pool here."}</p>
          <h3>How far</h3>
          <dl className="distances">
            {villa.distances.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="wrap villa-rooms" aria-labelledby="h-rooms">
        <div>
          <h2 id="h-rooms">Bedrooms</h2>
          <table className="rooms-table">
            <thead>
              <tr>
                <th scope="col">Room</th>
                <th scope="col">Beds</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {villa.rooms.map((r) => (
                <tr key={r.name}>
                  <th scope="row">{r.name}</th>
                  <td>{r.beds}</td>
                  <td>{r.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>In the house</h2>
          <ul className="amenities">
            {villa.amenities.map((a) => (
              <li key={a}>
                <Check aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="availability-band" aria-labelledby="h-avail">
        <div className="wrap">
          <h2 id="h-avail">Availability and prices</h2>
          <p className="measure">
            Choose an arrival and a departure. Booked nights are struck through;
            prices are per house, per night, before cleaning and tourist tax.
          </p>
          <AvailabilityCalendar villa={villa} />
          <table className="rates-table">
            <caption>Rates at {villa.name} through the year</caption>
            <thead>
              <tr>
                <th scope="col">Season</th>
                <th scope="col">Months</th>
                <th scope="col">Per night</th>
                <th scope="col">Stay</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(seasons) as Season[]).map((s) => (
                <tr key={s}>
                  <th scope="row">{seasons[s].label}</th>
                  <td>{SEASON_MONTHS[s]}</td>
                  <td className="num">{money(villa.rates[s])}</td>
                  <td>{seasons[s].note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">
            Final clean {money(villa.cleaning)}. Security deposit{" "}
            {money(villa.securityDeposit)}, pre-authorised and released after
            you leave.
          </p>
        </div>
      </section>

      <section className="wrap house-book" aria-labelledby="h-book">
        <h2 id="h-book">From the house book</h2>
        <p className="measure">
          Every house has a book on the kitchen table, written by the team and
          added to by guests. A few pages from this one.
        </p>
        <div className="house-book-pages">
          {villa.houseBook.map((n) => (
            <section key={n.title}>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="wrap villa-where" aria-labelledby="h-where">
        <div>
          <h2 id="h-where">Around {villa.name}</h2>
          <p className="measure">{coasts[villa.coast].text}</p>
          <ul className="nearby">
            {nearby.map((p) => (
              <li key={p.slug}>
                <Link to={`/guide/${p.slug}`}>{p.name}</Link>
                <span>{p.lede}</span>
              </li>
            ))}
          </ul>
        </div>
        <IslandMap
          label={`Map of ${brand.island} showing ${villa.name} and nearby places`}
          active={villa.slug}
          pins={[
            {
              id: villa.slug,
              to: `/villas/${villa.slug}`,
              label: villa.name,
              detail: "this house",
              ...villa.map,
            },
            ...nearby.map((p) => ({
              id: p.slug,
              to: `/guide/${p.slug}`,
              label: p.name,
              detail: p.kind,
              kind: "place" as const,
              ...p.map,
            })),
          ]}
        />
      </section>

      <section className="wrap section" aria-labelledby="h-related">
        <div className="section-head">
          <h2 id="h-related">You might also like</h2>
          <Link to="/villas" className="text-link">
            All villas <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="villa-row villa-row-3">
          {related.map((v) => (
            <VillaCard key={v.slug} villa={v} />
          ))}
        </div>
      </section>
    </article>
  );
}
