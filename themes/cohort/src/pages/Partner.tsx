import { Mail } from "lucide-react";
import { Link } from "../router";
import {
  companies,
  domainById,
  essays,
  partners,
  type Partner as PartnerT,
} from "../content";
import { Tombstone } from "../components/Tombstone";
import { EssayRow } from "../components/EssayRow";

export function Partner({ partner: p }: { partner: PartnerT }) {
  const boards = companies.filter((c) => c.partner === p.slug);
  const writing = essays.filter((e) => e.author === p.slug);
  const first = p.name.split(" ")[0];
  const others = partners.filter((o) => o.slug !== p.slug);

  return (
    <article className="page">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/team">Team</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.name}</span>
        </nav>
      </div>
      <header className="wrap partner-head rule-bottom">
        <div>
          <h1>{p.name}</h1>
          <p className="lede">
            {p.role}, {p.based}. At Cohort since {p.joined}.
          </p>
        </div>
        <dl className="facts facts-tight">
          <div>
            <dt>Focus</dt>
            <dd>{p.focus.map((f) => domainById(f).name).join(", ")}</dd>
          </div>
          <div>
            <dt>Before Cohort</dt>
            <dd>{p.before}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${p.email}`}>{p.email}</a>
            </dd>
          </div>
        </dl>
      </header>

      <div className="wrap partner-body">
        <div className="prose">
          {p.bio.map((b) => (
            <p key={b.slice(0, 24)}>{b}</p>
          ))}
        </div>
        <aside className="pitch-me">
          <h2>How to pitch {first}</h2>
          <p>{p.pitchMe}</p>
          <Link to={`/pitch?partner=${p.slug}`} className="btn btn-ink">
            <Mail aria-hidden="true" /> Pitch {first}
          </Link>
        </aside>
      </div>

      {boards.length > 0 && (
        <section className="section wrap">
          <h2 className="section-title">Companies {first} works with</h2>
          <div className="tomb-grid">
            {boards.map((c) => (
              <Tombstone key={c.slug} company={c} />
            ))}
          </div>
        </section>
      )}

      {writing.length > 0 && (
        <section className="section wrap">
          <h2 className="section-title">Writing by {first}</h2>
          <div className="essay-list">
            {writing.map((e) => (
              <EssayRow key={e.slug} essay={e} />
            ))}
          </div>
        </section>
      )}

      <section className="section wrap">
        <h2 className="section-title">The rest of the partnership</h2>
        <ul className="roster">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/team/${o.slug}`} className="roster-name">
                {o.name}
              </Link>
              <p className="roster-role">
                {o.role} · {o.based}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
