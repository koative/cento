import { Link } from "../router";
import { guides } from "../content";
import { tripsBy } from "../lib/trips";

export function Guides() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Our guides</h1>
        <p className="lede">
          Eight lead guides, eight home valleys. Each one holds a recognised
          mountain leader qualification and current wilderness first aid, and
          each one only leads where they live.
        </p>
      </header>
      <section className="wrap section-tight" aria-label="Guides">
        <ul className="guide-list">
          {guides.map((g) => (
            <li key={g.slug}>
              <img
                src={g.image}
                alt=""
                loading="lazy"
                width={1600}
                height={1066}
              />
              <div>
                <h2>
                  <Link to={`/guides/${g.slug}`} className="stretched">
                    {g.name}
                  </Link>
                </h2>
                <p className="muted">
                  {g.base} • since {g.since}
                </p>
                <p>{g.specialty}</p>
                <p className="guide-leads">
                  Leads{" "}
                  {tripsBy(g.slug)
                    .map((t) => t.name)
                    .join(", ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="section quiet" aria-labelledby="join-title">
        <div className="wrap quiet-inner">
          <h2 id="join-title">How we choose guides</h2>
          <p className="lede">
            We don't hire guides to run our trips; we build trips around guides.
            Every route starts with someone who has walked it for a decade, a
            hut keeper they trust and a valley that wants walkers back.
          </p>
          <Link to="/about" className="btn btn-ghost">
            Read about safety and standards
          </Link>
        </div>
      </section>
    </>
  );
}
