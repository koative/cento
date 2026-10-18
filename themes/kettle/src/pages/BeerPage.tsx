import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { beers, families, images, type Beer, type Family } from "../content";
import { beerColor, money } from "../lib/util";
import { Glass } from "../components/Art";
import { BeerTile } from "../components/Tiles";

const photoFor: Record<
  Family,
  { src: string; alt: string; w: number; h: number }
> = {
  crisp: {
    src: images.cellar,
    alt: "Horizontal steel lagering tanks with handwritten batch tags",
    w: 1800,
    h: 1350,
  },
  hoppy: {
    src: images.hopBines,
    alt: "Hop bines heavy with green cones against the sky",
    w: 1400,
    h: 933,
  },
  farmhouse: {
    src: images.flightWindow,
    alt: "Four tasting glasses of pale, amber and purple beer on a window ledge",
    w: 1400,
    h: 1050,
  },
  sour: {
    src: images.flightWindow,
    alt: "Four tasting glasses of pale, amber and purple beer on a window ledge",
    w: 1400,
    h: 1050,
  },
  dark: {
    src: images.porter,
    alt: "A pint of near-black porter with a tan head on a coaster",
    w: 500,
    h: 667,
  },
};

export function BeerPage({ beer }: { beer: Beer }) {
  const family = families.find((f) => f.id === beer.family)!;
  const related = [...beers]
    .filter((b) => b.slug !== beer.slug)
    .sort(
      (a, b) =>
        Number(b.family === beer.family) - Number(a.family === beer.family) ||
        Math.abs(a.abv - beer.abv) - Math.abs(b.abv - beer.abv),
    )
    .slice(0, 4);
  const photo = photoFor[beer.family];

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/beers" className="link-back">
          <ArrowLeft aria-hidden="true" /> All beers
        </Link>
      </div>

      <section
        className="wrap beer-hero"
        style={
          { "--beer": beerColor(beer), "--label": beer.label } as CSSProperties
        }
      >
        <div className="beer-hero-glass">
          <Glass
            shape={beer.glass}
            color={beerColor(beer)}
            id="hero"
            label={`${beer.name} in its glass`}
            className="glass glass-hero"
          />
        </div>
        <div className="beer-hero-copy">
          <h1>{beer.name}</h1>
          <p className="beer-hero-style">
            {beer.style} · {family.label} · {beer.availability}
          </p>
          <p className="lede">{beer.short}</p>
          <dl className="spec-strip">
            <div>
              <dt>ABV</dt>
              <dd className="tnum">{beer.abv.toFixed(1)}%</dd>
            </div>
            <div>
              <dt>Bitterness</dt>
              <dd className="tnum">{beer.ibu} IBU</dd>
            </div>
            <div>
              <dt>Colour</dt>
              <dd className="tnum">
                <span
                  className="swatch"
                  style={{ background: beerColor(beer) }}
                  aria-hidden="true"
                />
                {beer.srm} SRM
              </dd>
            </div>
            <div>
              <dt>Gravity</dt>
              <dd className="tnum">
                {beer.og.toFixed(3)} → {beer.fg.toFixed(3)}
              </dd>
            </div>
          </dl>

          <div className="where">
            <div
              className="where-item"
              data-on={beer.tap !== null ? "" : undefined}
            >
              <h2>At the bar</h2>
              <p>
                {beer.tap !== null
                  ? `Tap ${beer.tap} · ${beer.pour.size} ${money(beer.pour.price)} · 5 oz taster in any flight`
                  : beer.back}
              </p>
            </div>
            <div className="where-item">
              <h2>To take home</h2>
              {beer.shopId ? (
                <p>
                  <Link to={`/shop/${beer.shopId}`}>
                    {beer.family === "dark" && beer.abv > 10
                      ? "Pre-order bottles for pickup"
                      : "Buy 4-packs for pickup"}
                  </Link>
                </p>
              ) : (
                <p>Taproom only. Growler fills while it lasts.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section brew-sheet-section"
        aria-labelledby="sheet-title"
      >
        <div className="wrap brew-sheet">
          <div className="brew-sheet-story">
            <h2 id="sheet-title">The brew sheet</h2>
            <p>{beer.story}</p>
            <figure className="beer-photo">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={photo.w}
                height={photo.h}
              />
            </figure>
          </div>

          <div className="brew-sheet-data">
            <h3>Grain bill</h3>
            <ul className="grain-bill">
              {beer.malts.map((m) => (
                <li key={m.name}>
                  <span className="grain-name">{m.name}</span>
                  <span className="grain-pct tnum">{m.pct}%</span>
                  <span className="grain-bar" aria-hidden="true">
                    <span style={{ width: `${m.pct}%` }} />
                  </span>
                </li>
              ))}
            </ul>

            <h3>Hops</h3>
            <table className="sheet-table">
              <thead>
                <tr>
                  <th scope="col">Variety</th>
                  <th scope="col">Addition</th>
                </tr>
              </thead>
              <tbody>
                {beer.hops.map((h) => (
                  <tr key={h.name + h.use}>
                    <th scope="row">{h.name}</th>
                    <td>{h.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Fermentation</h3>
            <dl className="sheet-dl">
              <div>
                <dt>Yeast</dt>
                <dd>{beer.yeast}</dd>
              </div>
              <div>
                <dt>Schedule</dt>
                <dd>{beer.ferment}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-notes" aria-labelledby="notes-title">
        <div className="wrap notes">
          <h2 id="notes-title">In the glass</h2>
          <dl className="notes-list">
            <div>
              <dt>Aroma</dt>
              <dd>{beer.notes.aroma}</dd>
            </div>
            <div>
              <dt>Palate</dt>
              <dd>{beer.notes.palate}</dd>
            </div>
            <div>
              <dt>Finish</dt>
              <dd>{beer.notes.finish}</dd>
            </div>
            <div>
              <dt>Eat it with</dt>
              <dd>{beer.pairing.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="related-title">If you like {beer.name}</h2>
            <Link to="/taproom">Put it in a flight</Link>
          </div>
          <div className="beer-shelf beer-shelf-short">
            {related.map((b) => (
              <BeerTile key={b.slug} beer={b} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
