import { ArrowRight, Search } from "lucide-react";
import { Link, navigate } from "../router";
import { areas, listings, type Area } from "../content";
import { agentOf, money } from "../lib/format";
import { defaultFilters, setFilters } from "../lib/store";
import { CityMap } from "../components/CityMap";
import { ListingCard } from "../components/ListingCard";

export function NeighborhoodPage({ area }: { area: Area }) {
  const homes = listings.filter((l) => l.area === area.slug);
  const agent = agentOf(area.agent);
  const others = areas.filter((a) => a.slug !== area.slug);

  return (
    <article className="guide">
      <header className="wrap guide-hero">
        <div>
          <Link to="/neighborhoods" className="text-link">
            Neighborhood guides
          </Link>
          <h1>{area.name}</h1>
          <p className="lede">{area.line}</p>
        </div>
        <img src={area.image} alt={area.imageAlt} />
      </header>

      <div className="wrap guide-body">
        <div className="guide-text">
          {area.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h2>Living here</h2>
          <dl className="guide-notes">
            <div>
              <dt>Character</dt>
              <dd>{area.character}</dd>
            </div>
            <div>
              <dt>Getting around</dt>
              <dd>{area.gettingAround}</dd>
            </div>
            <div>
              <dt>Schools</dt>
              <dd>{area.schools}</dd>
            </div>
          </dl>
          <h2>Where the neighbours go</h2>
          <ul className="places">
            {area.places.map((p) => (
              <li key={p.name}>
                <span className="place-kind">{p.kind}</span>
                <strong>{p.name}</strong>
                <span>{p.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="guide-aside" aria-label={`${area.name} in numbers`}>
          <h2>{area.name} this year</h2>
          <dl className="particulars num">
            <div>
              <dt>Median sale</dt>
              <dd>{money(area.medianSale)}</dd>
            </div>
            <div>
              <dt>Median rent</dt>
              <dd>{money(area.medianRent)} / mo</dd>
            </div>
            <div>
              <dt>Price per sq ft</dt>
              <dd>{money(area.pricePerSqft)}</dd>
            </div>
            <div>
              <dt>Typical home</dt>
              <dd>{area.typical}</dd>
            </div>
            <div>
              <dt>Commute</dt>
              <dd>{area.commute}</dd>
            </div>
          </dl>
          <div className="agent-mini">
            <img src={agent.photo} alt="" />
            <div>
              <p className="muted">Your agent here</p>
              <p className="agent-mini-name">
                <Link to={"/agents/" + agent.id}>{agent.name}</Link>
              </p>
              <a href={agent.phoneHref} className="num">
                {agent.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section className="wrap section">
        <div className="section-head">
          <h2>On the market in {area.name}</h2>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setFilters({
                ...defaultFilters,
                area: area.slug,
                mode: homes[0]?.mode ?? "buy",
              });
              navigate("/homes");
            }}
          >
            <Search size={16} aria-hidden="true" /> Search {area.name} on the
            map
          </button>
        </div>
        <div className="guide-market">
          <CityMap
            label={`Map of ${area.name} with homes on the market`}
            listings={homes}
            activeArea={area.slug}
          />
          {homes.length ? (
            <div className="card-grid card-grid-2">
              {homes.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          ) : (
            <p className="muted">
              Nothing on our books here this week. Join the Thursday list to
              hear first.
            </p>
          )}
        </div>
      </section>

      <nav
        className="wrap section other-guides"
        aria-label="Other neighborhood guides"
      >
        <h2>Other guides</h2>
        <ul>
          {others.map((a) => (
            <li key={a.slug}>
              <Link to={"/neighborhoods/" + a.slug}>
                {a.name} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
