import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  events,
  giving,
  programmes,
  sites,
  team,
  type Programme,
} from "../content";
import { EventList } from "../components/EventList";
import { Ledger } from "../components/Ledger";
import { money } from "../lib/format";

export function ProgrammePage({ programme: p }: { programme: Programme }) {
  const upcoming = events.filter((e) => e.programme === p.slug);
  const where = sites.filter((s) => p.sites.includes(s.id));
  const lead = team.find((t) => t.name === p.lead);
  const related = [
    ...programmes.filter((o) => o.slug !== p.slug && o.theme === p.theme),
    ...programmes.filter((o) => o.theme !== p.theme),
  ].slice(0, 3);
  const gift = giving.monthly[1];

  return (
    <>
      <header className="wrap detail-head">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/programmes">Programmes</Link>
          <span aria-hidden="true">/</span>
          <span>{p.theme}</span>
        </nav>
        <h1>{p.name}</h1>
        <p className="lede">{p.lede}</p>
      </header>

      <section className="wrap detail-hero">
        <img
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.w}
          height={p.image.h}
          className={p.image.h > p.image.w ? "is-plate" : undefined}
        />
        <dl className="spec">
          <div>
            <dt>Where</dt>
            <dd>{p.region}</dd>
          </div>
          <div>
            <dt>Running since</dt>
            <dd className="num">{p.since}</dd>
          </div>
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd className="num">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section prose-grid">
        <div className="prose">
          <h2>The work</h2>
          {p.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <figure className="pull">
          <blockquote>
            <p>{p.quote.text}</p>
          </blockquote>
          <figcaption>{p.quote.by}</figcaption>
        </figure>
      </section>

      <section className="wrap section-tight">
        <h2>How a season runs</h2>
        <ol className="steps">
          {p.steps.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section-tight gallery">
        {p.gallery.map((g) => (
          <figure key={g.src}>
            <img
              src={g.src}
              alt={g.alt}
              width={g.w}
              height={g.h}
              loading="lazy"
            />
          </figure>
        ))}
      </section>

      <section className="wrap section">
        <h2>Where we work</h2>
        <ul className="site-list">
          {where.map((s) => (
            <li key={s.id}>
              <strong>{s.name}</strong>
              <span className="num">{s.position}</span>
              <span>
                {s.coast} · spring range {s.range.toFixed(1)} m
              </span>
              <span>Meet: {s.meet}</span>
              <span>{s.access}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section-tight">
        <div className="section-head section-head-row">
          <h2>Upcoming dates</h2>
          <Link to="/volunteer" className="text-link">
            All volunteer events <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        {upcoming.length ? (
          <EventList items={upcoming} />
        ) : (
          <p className="empty">
            No public dates this season: {p.name} runs on booked visits and
            trained rotas. Email{" "}
            <a href={`mailto:${brand.volunteerEmail}`}>
              {brand.volunteerEmail}
            </a>{" "}
            to join the list for the next intake.
          </p>
        )}
      </section>

      <section className="section band-shallow">
        <div className="wrap support">
          <div>
            <h2>Support {p.name}</h2>
            <p>
              {money(gift.amount)} a month {gift.does}. Every gift is
              unrestricted, so it goes where the tide table says it is needed
              most.
            </p>
            <Link to="/donate" className="btn btn-buoy">
              Donate
            </Link>
          </div>
          {lead && (
            <div className="lead-card">
              <span className="initials" aria-hidden="true">
                {lead.name
                  .replace("Dr ", "")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <strong>{lead.name}</strong>
                <span>{lead.role}</span>
                <p>{lead.bio}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="wrap section">
        <h2>Related programmes</h2>
        <Ledger items={related} compact />
      </section>
    </>
  );
}
