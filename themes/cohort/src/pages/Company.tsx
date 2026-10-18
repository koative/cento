import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  companies,
  domainById,
  partnerBySlug,
  type Company as CompanyT,
} from "../content";
import { Tombstone } from "../components/Tombstone";
import { monthYear } from "../lib/format";

export function Company({ company: c }: { company: CompanyT }) {
  const partner = partnerBySlug(c.partner)!;
  const domain = domainById(c.domain);
  const first = c.rounds[0];
  const related = [
    ...companies.filter((o) => o.domain === c.domain && o.slug !== c.slug),
    ...companies.filter((o) => o.domain !== c.domain),
  ].slice(0, 4);

  return (
    <article className="page company">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/portfolio">Portfolio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{c.name}</span>
        </nav>
        <header className="company-head">
          <h1>{c.name}</h1>
          <p className="lede">{c.line}</p>
        </header>
        <dl className="facts">
          <div>
            <dt>Domain</dt>
            <dd>{domain.name}</dd>
          </div>
          <div>
            <dt>Class of</dt>
            <dd className="num">{c.classOf}</dd>
          </div>
          <div>
            <dt>Stage</dt>
            <dd>
              {c.status === "Acquired" ? `Acquired after ${c.stage}` : c.stage}
            </dd>
          </div>
          <div>
            <dt>Headquarters</dt>
            <dd>{c.hq}</dd>
          </div>
          <div>
            <dt>Founded</dt>
            <dd className="num">{c.founded}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd className="num">{c.people} people</dd>
          </div>
          <div>
            <dt>Founders</dt>
            <dd>{c.founders.join(", ")}</dd>
          </div>
          <div>
            <dt>Cohort partner</dt>
            <dd>
              <Link to={`/team/${partner.slug}`}>{partner.name}</Link>
            </dd>
          </div>
        </dl>
      </div>

      <figure className="company-photo wrap">
        <img src={c.image} alt={c.imageAlt} width={1600} height={1000} />
      </figure>

      <div className="wrap company-body">
        <div className="company-text">
          <h2>What {c.name} does</h2>
          {c.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {c.outcome && <p className="outcome">{c.outcome}</p>}

          <section className="memo" aria-labelledby="memo-title">
            <h2 id="memo-title">Why we invested</h2>
            <dl className="memo-head">
              <div>
                <dt>To</dt>
                <dd>The partnership</dd>
              </div>
              <div>
                <dt>From</dt>
                <dd>{partner.name}</dd>
              </div>
              <div>
                <dt>Re</dt>
                <dd>
                  {c.name}, {first.round.toLowerCase()} ·{" "}
                  {monthYear(first.date)}
                </dd>
              </div>
            </dl>
            <p>{c.memo}</p>
          </section>
        </div>

        <aside className="company-rounds" aria-label="Financing history">
          <h2>On the record</h2>
          {c.rounds
            .slice()
            .reverse()
            .map((r) => (
              <Tombstone key={r.round} company={c} round={r} linked={false} />
            ))}
        </aside>
      </div>

      <section className="testimonial wrap-narrow">
        <figure>
          <blockquote>
            <p>{c.quote.text}</p>
          </blockquote>
          <figcaption>{c.quote.by}</figcaption>
        </figure>
      </section>

      {c.gallery && (
        <figure className="company-photo wrap">
          <img
            src={c.gallery.src}
            alt={c.gallery.alt}
            width={1600}
            height={1000}
            loading="lazy"
          />
        </figure>
      )}

      <section className="section wrap">
        <div className="section-head">
          <h2>More from the portfolio</h2>
          <Link to="/portfolio" className="text-link">
            Full portfolio <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="tomb-grid">
          {related.map((o) => (
            <Tombstone key={o.slug} company={o} />
          ))}
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>Building in {domain.name.toLowerCase()}?</h2>
          <p>
            {partner.name.split(" ")[0]} reads every pitch in this part of the
            economy. {partner.pitchMe}
          </p>
          <div className="actions">
            <Link
              to={`/pitch?partner=${partner.slug}`}
              className="btn btn-paper"
            >
              Pitch {partner.name.split(" ")[0]}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
