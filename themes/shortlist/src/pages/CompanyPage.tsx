import { companies, jobs, type Company } from "../content";
import { Link } from "../router";
import { k } from "../lib/format";
import { JobRow } from "../components/JobRow";
import { CompanyMark } from "../components/Marks";

export function CompanyPage({ company }: { company: Company }) {
  const open = jobs.filter((j) => j.company === company.slug);
  const others = companies.filter((c) => c.slug !== company.slug).slice(0, 3);
  const pays = open.flatMap((j) => j.salary);

  return (
    <div className="page company-page">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/companies">Companies</Link>
          <span aria-hidden="true">/</span>
          <span>{company.industry}</span>
        </nav>
      </div>

      <header className="wrap company-hero">
        <div className="company-hero-copy">
          <CompanyMark company={company} size={56} />
          <h1>{company.name}</h1>
          <p className="lede">{company.tagline}</p>
          <dl className="facts facts-row">
            <div>
              <dt>Industry</dt>
              <dd>{company.industry}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{company.size}</dd>
            </div>
            <div>
              <dt>Founded</dt>
              <dd className="num">{company.founded}</dd>
            </div>
            <div>
              <dt>Replies within</dt>
              <dd className="num">{company.replyDays} working days</dd>
            </div>
          </dl>
        </div>
        <img
          className="company-hero-img"
          src={company.image}
          alt={company.imageAlt}
          width={1600}
          height={1066}
        />
      </header>

      <div className="wrap company-body">
        <section aria-labelledby="about-h" className="company-about">
          <h2 id="about-h">About the place</h2>
          {company.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <figure className="pull">
            <blockquote>
              <p>{company.quote.text}</p>
            </blockquote>
            <figcaption>
              <strong>{company.quote.by}</strong> · {company.quote.role}
            </figcaption>
          </figure>
        </section>
        <aside className="company-side">
          <section aria-labelledby="perks-h">
            <h2 id="perks-h">What comes with the job</h2>
            <ul className="ticks">
              {company.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="where-h">
            <h2 id="where-h">Where they work</h2>
            <ul className="plain-list">
              {company.offices.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section className="wrap section" aria-labelledby="open-h">
        <div className="section-head">
          <h2 id="open-h" className="section-title">
            {open.length} open {open.length === 1 ? "role" : "roles"}
          </h2>
          {pays.length > 0 && (
            <p className="fine">
              Advertised base pay from {k(Math.min(...pays))} to{" "}
              {k(Math.max(...pays))}
            </p>
          )}
        </div>
        <div className="listing-stack">
          {open.map((j) => (
            <JobRow key={j.id} job={j} />
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="others-h">
        <h2 id="others-h" className="section-title">
          Other employers on Shortlist
        </h2>
        <ul className="other-companies">
          {others.map((c) => (
            <li key={c.slug}>
              <CompanyMark company={c} size={32} />
              <Link to={`/companies/${c.slug}`}>{c.name}</Link>
              <span>{c.industry}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
