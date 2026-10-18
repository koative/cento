import { brand, photos, store } from "../content";

/** Street plan of the block: authored geometry, not a real map. */
function StreetMap() {
  return (
    <svg
      className="street-map"
      viewBox="0 0 400 260"
      role="img"
      aria-label="Map: Drop is at 88 Hollis Street, two doors from Low Ledge Skate, one block from the Dockside boardwalk"
    >
      <rect width="400" height="260" className="map-ground" />
      <path className="map-water" d="M0 214 H400 V260 H0 Z" />
      <path className="map-road" d="M0 120 H400 M150 0 V214 M300 0 V214" />
      <path className="map-boardwalk" d="M0 204 H400" />
      <rect className="map-block" x="164" y="60" width="122" height="46" />
      <rect className="map-block" x="164" y="134" width="122" height="62" />
      <rect className="map-block" x="12" y="134" width="124" height="62" />
      <rect className="map-block" x="12" y="60" width="124" height="46" />
      <rect className="map-block" x="314" y="60" width="76" height="46" />
      <rect className="map-block" x="314" y="134" width="76" height="62" />
      <rect className="map-shop" x="206" y="88" width="26" height="18" />
      <rect className="map-ledge" x="248" y="88" width="20" height="18" />
      <text x="20" y="116">
        HOLLIS ST
      </text>
      <text x="156" y="30" transform="rotate(90 156 30)">
        ROOK LN
      </text>
      <text x="20" y="200">
        BOARDWALK
      </text>
      <text x="196" y="80" className="map-label">
        DROP
      </text>
      <text x="244" y="80" className="map-label-sub">
        LOW LEDGE
      </text>
    </svg>
  );
}

export function Store() {
  return (
    <div className="page store-page">
      <header className="page-head">
        <h1>{store.title}</h1>
        <p className="lead">{store.intro}</p>
      </header>

      <div className="store-intro">
        <figure className="store-photo">
          <img
            src={photos.alley.src}
            alt={photos.alley.alt}
            width={photos.alley.w}
            height={photos.alley.h}
          />
          <figcaption>Rook Lane, round the back of the shop.</figcaption>
        </figure>
        <div className="prose">
          {store.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <section className="section visit" aria-labelledby="h-visit">
        <div>
          <h2 id="h-visit">Visit</h2>
          <address className="visit-address">
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <dl className="hours">
            {store.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <StreetMap />
      </section>

      <section className="section line-rules" aria-labelledby="h-line">
        <h2 id="h-line">Drop day at the door</h2>
        <ul>
          {store.lineRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="h-crew">
        <h2 id="h-crew">The crew</h2>
        <ul className="crew">
          {store.crew.map((c) => (
            <li key={c.name}>
              <h3>{c.name}</h3>
              <p className="crew-role">{c.role}</p>
              <blockquote>{c.quote}</blockquote>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
