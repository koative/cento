import { Link } from "../router";
import { crafts, talent, type Craft } from "../content";
import { money } from "../lib/util";
import { TalentRow } from "../components/Talent";

export function CraftPage({ craft }: { craft: Craft }) {
  const members = talent.filter((t) => t.craft === craft.slug);
  const rates = members.map((m) => m.rate);
  const others = crafts.filter((c) => c.slug !== craft.slug);

  return (
    <>
      <nav className="crumbs wrap" aria-label="Breadcrumb">
        <Link to="/crafts">Crafts</Link> /{" "}
        <span aria-current="page">{craft.name}</span>
      </nav>

      <section className="page-head wrap craft-head">
        <div>
          <h1>{craft.name}</h1>
          <p className="lede">{craft.description}</p>
        </div>
        <dl className="craft-stats">
          <div>
            <dt>Median day rate</dt>
            <dd className="num">{money(craft.median)}</dd>
          </div>
          <div>
            <dt>Range in this demo</dt>
            <dd className="num">
              {money(Math.min(...rates))}–{money(Math.max(...rates))}
            </dd>
          </div>
          <div>
            <dt>How it is usually booked</dt>
            <dd className="small">{craft.brief}</dd>
          </div>
        </dl>
      </section>

      <section className="section wrap craft-body">
        <div>
          <h2>Commissioned often</h2>
          <ul className="checks">
            {craft.commissions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Skills members list</h2>
          <ul className="tags">
            {craft.skills.map((s) => (
              <li key={s}>
                <Link to={`/talent?q=${encodeURIComponent(s)}`}>{s}</Link>
              </li>
            ))}
          </ul>
          <Link to={`/post?craft=${craft.slug}`} className="btn btn-seal">
            Post a {craft.name.toLowerCase()} project
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="members-h">
        <div className="section-head">
          <h2 id="members-h">Members in {craft.name.toLowerCase()}</h2>
          <Link to={`/talent?craft=${craft.slug}`} className="more">
            Filter the full register
          </Link>
        </div>
        <div className="t-rows">
          {members.map((t) => (
            <TalentRow key={t.id} t={t} />
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="other-h">
        <h2 id="other-h">Other crafts</h2>
        <ul className="craft-links">
          {others.map((c) => (
            <li key={c.slug}>
              <Link to={`/crafts/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
