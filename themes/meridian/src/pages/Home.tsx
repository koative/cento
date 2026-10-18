import { useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, navigate } from "../router";
import {
  agents,
  areas,
  homePage,
  listings,
  recentSales,
  type AreaSlug,
  type Mode,
} from "../content";
import { areaOf, estimate, money, price } from "../lib/format";
import { defaultFilters, setFilters } from "../lib/store";
import { CityMap } from "../components/CityMap";
import { Facts, ListingCard } from "../components/ListingCard";

export function Home() {
  const featured = listings.find((l) => l.id === homePage.featured)!;
  const newest = listings
    .filter((l) => l.id !== featured.id)
    .sort((a, b) => b.listed.localeCompare(a.listed))
    .slice(0, 4);

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFilters({
      ...defaultFilters,
      mode: data.get("mode") as Mode,
      area: data.get("area") as AreaSlug | "all",
      beds: Number(data.get("beds")),
    });
    navigate("/homes");
  }

  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1>{homePage.title}</h1>
          <p className="lede">{homePage.intro}</p>
          <form
            className="hero-search"
            onSubmit={search}
            aria-label="Search homes"
          >
            <fieldset className="segmented">
              <legend className="visually-hidden">Looking to</legend>
              <label>
                <input type="radio" name="mode" value="buy" defaultChecked />{" "}
                <span>Buy</span>
              </label>
              <label>
                <input type="radio" name="mode" value="rent" />{" "}
                <span>Rent</span>
              </label>
            </fieldset>
            <div className="field">
              <label htmlFor="hs-area">Neighborhood</label>
              <select id="hs-area" name="area" defaultValue="all">
                <option value="all">Anywhere in the city</option>
                {areas.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="hs-beds">Bedrooms</label>
              <select id="hs-beds" name="beds" defaultValue="0">
                <option value="0">Any</option>
                <option value="2">2 or more</option>
                <option value="3">3 or more</option>
                <option value="4">4 or more</option>
              </select>
            </div>
            <button className="btn btn-accent" type="submit">
              <Search size={18} aria-hidden="true" /> Search homes
            </button>
          </form>
        </div>
        <figure className="hero-feature">
          <img src={featured.images[0].src} alt={featured.images[0].alt} />
          <figcaption>
            <span className="tag">{featured.status ?? "Featured"}</span>
            <Link to={"/homes/" + featured.id} className="hero-feature-link">
              {featured.address}, {areaOf(featured.area).name}
            </Link>
            <span className="hero-feature-price num">{price(featured)}</span>
            <Facts listing={featured} />
          </figcaption>
        </figure>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>New to the market</h2>
          <Link to="/homes" className="text-link">
            All {listings.length} homes{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="card-grid">
          {newest.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="map-band">
        <div className="wrap map-band-inner">
          <div className="map-band-text">
            <h2>Six neighborhoods, one river</h2>
            <p>
              Every home we sell sits on this map. Choose a neighborhood to
              search it, or a price to open the home.
            </p>
            <ul className="area-index">
              {areas.map((a) => {
                const n = listings.filter((l) => l.area === a.slug).length;
                return (
                  <li key={a.slug}>
                    <Link to={"/neighborhoods/" + a.slug}>{a.name}</Link>
                    <span className="num">
                      {n} {n === 1 ? "home" : "homes"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <CityMap
            label="Map of Port Ellery with homes on the market"
            listings={listings}
            onArea={(slug) => {
              setFilters({ ...defaultFilters, area: slug });
              navigate("/homes");
            }}
          />
        </div>
      </section>

      <QuickValuation />

      <section className="section wrap ledger">
        <div className="section-head">
          <h2>Sold lately</h2>
          <p className="muted">
            Achieved prices are recorded on completion and published every
            quarter.
          </p>
        </div>
        <div className="table-scroll">
          <table className="data-table num">
            <thead>
              <tr>
                <th scope="col">Address</th>
                <th scope="col">Neighborhood</th>
                <th scope="col">Asking</th>
                <th scope="col">Achieved</th>
                <th scope="col">Days on market</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((s) => {
                const diff = ((s.achieved - s.asking) / s.asking) * 100;
                return (
                  <tr key={s.address}>
                    <th scope="row">{s.address}</th>
                    <td>{areaOf(s.area).name}</td>
                    <td>{money(s.asking)}</td>
                    <td>
                      {money(s.achieved)}{" "}
                      <span className={diff >= 0 ? "delta up" : "delta down"}>
                        {(diff >= 0 ? "+" : "−") + Math.abs(diff).toFixed(1)}%
                      </span>
                    </td>
                    <td>{s.days}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap guides-teaser">
        <div className="section-head">
          <h2>Know the street before the house</h2>
          <Link to="/neighborhoods" className="text-link">
            All neighborhood guides <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="guides-grid">
          {areas.map((a, i) => (
            <article
              key={a.slug}
              className={"guide-tile" + (i === 0 ? " guide-tile-lead" : "")}
            >
              <img src={a.image} alt="" loading="lazy" />
              <div>
                <h3>
                  <Link to={"/neighborhoods/" + a.slug}>{a.name}</Link>
                </h3>
                <p>{a.line}</p>
                <p className="num muted">Median sale {money(a.medianSale)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap agents-strip">
        <div className="section-head">
          <h2>Six agents, all of them local</h2>
          <Link to="/agents" className="text-link">
            Meet the team <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul>
          {agents.map((a) => (
            <li key={a.id}>
              <img src={a.photo} alt="" loading="lazy" />
              <Link to={"/agents/" + a.id}>{a.name}</Link>
              <span>{a.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="quote wrap">
        <blockquote>
          <p>“{homePage.quote.text}”</p>
          <footer>
            {homePage.quote.by}, <span>{homePage.quote.where}</span>
          </footer>
        </blockquote>
      </section>

      <section className="close-band">
        <div className="wrap close-inner">
          <h2>Thinking of selling this winter?</h2>
          <p>
            Homes listed in January meet the buyers who spent December looking.
            Book a valuation now and we will have your particulars ready for the
            first Thursday list of the year.
          </p>
          <div className="btn-row">
            <Link to="/sell" className="btn btn-light">
              Book a valuation
            </Link>
            <Link to="/about" className="btn btn-ghost-light">
              Our fees
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function QuickValuation() {
  const [slug, setSlug] = useState<AreaSlug>("north-quarter");
  const [sqft, setSqft] = useState(1600);
  const valid = sqft >= 300 && sqft <= 10000;
  const range = estimate(areaOf(slug), valid ? sqft : 0);

  return (
    <section
      className="section wrap valuation-teaser"
      aria-labelledby="qv-title"
    >
      <div>
        <h2 id="qv-title">What would your home fetch?</h2>
        <p>
          A first figure from what homes like yours sold for this year. The real
          number comes from a visit: condition, light and the view move prices
          more than any spreadsheet.
        </p>
        <Link to="/sell" className="btn">
          Book a free valuation <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="qv-panel">
        <div className="field">
          <label htmlFor="qv-area">Neighborhood</label>
          <select
            id="qv-area"
            value={slug}
            onChange={(e) => setSlug(e.target.value as AreaSlug)}
          >
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="qv-sqft">Floor area (sq ft)</label>
          <input
            id="qv-sqft"
            type="number"
            inputMode="numeric"
            min={300}
            max={10000}
            step={10}
            value={sqft || ""}
            aria-invalid={!valid || undefined}
            aria-describedby="qv-out"
            onChange={(e) => setSqft(Number(e.target.value))}
          />
        </div>
        <output
          id="qv-out"
          htmlFor="qv-area qv-sqft"
          className="qv-out"
          aria-live="polite"
        >
          {valid ? (
            <>
              <span className="qv-range num">
                {money(range.low)} – {money(range.high)}
              </span>
              <span className="muted">
                Based on {money(areaOf(slug).pricePerSqft)} per sq ft in{" "}
                {areaOf(slug).name} this year.
              </span>
            </>
          ) : (
            <span className="field-error">
              Enter a floor area between 300 and 10,000 sq ft.
            </span>
          )}
        </output>
      </div>
    </section>
  );
}
