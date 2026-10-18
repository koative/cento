import type { CSSProperties } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import {
  articles,
  brand,
  homeFaq,
  industries,
  monthRhythm,
  packages,
  photos,
  services,
  stories,
} from "../content";
import { rulesFor, upcoming, useSavedProfile } from "../lib/deadlines";
import { dollars } from "../lib/format";
import {
  ArticleRow,
  CloseTape,
  DeadlineRows,
  Faq,
  Img,
  ServiceRow,
} from "../components/Bits";

export function Home() {
  const profile = useSavedProfile();
  const next = upcoming(rulesFor(profile)).slice(0, 3);
  const [lead, ...rest] = stories;
  const latest = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{brand.promise}</h1>
          <p className="lede">{brand.intro}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-primary">
              Book a 20-minute call
            </Link>
            <Link to="/pricing" className="btn btn-ghost">
              See packages from {dollars(packages[0].monthly)}/mo
            </Link>
          </div>
          <p className="hero-note">
            Flat monthly fees. Answers within one business day, from the person
            who keeps your books.
          </p>
        </div>
        <CloseTape />
      </section>

      <section className="band band-due" aria-labelledby="due-h">
        <div className="wrap due-grid">
          <div>
            <h2 id="due-h">
              {profile ? "Your next three deadlines" : "What's due next"}
            </h2>
            <p>
              {profile
                ? "From the calendar you built. Change your business details any time."
                : "Federal dates every small business should know. Tell the calendar how you're set up and it drops the ones that don't apply."}
            </p>
            <Link to="/calendar" className="text-link">
              {profile ? "Open your tax calendar" : "Build your tax calendar"}{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <DeadlineRows items={next} compact />
        </div>
      </section>

      <section className="wrap section" aria-labelledby="svc-h">
        <div className="section-head">
          <h2 id="svc-h">What we keep in order</h2>
          <p>
            Eight services, priced flat, run by the same small team every month.
          </p>
        </div>
        <ul className="ledger-list">
          {services.map((s) => (
            <ServiceRow key={s.slug} s={s} />
          ))}
        </ul>
      </section>

      <section className="band band-paper" aria-labelledby="month-h">
        <div className="wrap section">
          <div className="section-head">
            <h2 id="month-h">A month with {brand.name}</h2>
            <p>
              The same rhythm for every client, so you always know what's done
              and what's next.
            </p>
          </div>
          <div className="month-ruler">
            <div className="ruler-scale" aria-hidden="true">
              {Array.from({ length: 31 }, (_, i) => (
                <span
                  key={i}
                  data-major={(i + 1) % 5 === 0 || i === 0 ? "" : undefined}
                  data-mark={
                    monthRhythm.some((m) => m.day === i + 1) ? "" : undefined
                  }
                >
                  {(i + 1) % 5 === 0 || i === 0 ? i + 1 : ""}
                </span>
              ))}
            </div>
            <ol className="ruler-events">
              {monthRhythm.map((m) => (
                <li key={m.day} style={{ "--day": m.day } as CSSProperties}>
                  <span className="re-day">Day {m.day}</span>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="pk-h">
        <div className="section-head">
          <h2 id="pk-h">Three packages. No hourly meter.</h2>
          <p>
            Pick by how much happens in your accounts each month. Move up or
            down whenever the business changes.
          </p>
        </div>
        <div className="pk-strip">
          {packages.map((p) => (
            <Link
              key={p.id}
              to="/pricing"
              className="pk-mini"
              data-featured={p.featured ? "" : undefined}
            >
              <span className="pk-name">{p.name}</span>
              <span className="pk-price">
                {dollars(p.monthly)}
                <small>/mo</small>
              </span>
              <span className="pk-pitch">{p.pitch}</span>
            </Link>
          ))}
        </div>
        <Link to="/pricing" className="text-link">
          Compare everything in each package <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="band band-ink" aria-labelledby="st-h">
        <div className="wrap section">
          <h2 id="st-h" className="section-title">
            The owners whose books we keep
          </h2>
          <article className="story-lead">
            <Img photo={lead.photo} className="story-lead-img" />
            <div className="story-lead-copy">
              <blockquote>
                <p>“{lead.quote}”</p>
              </blockquote>
              <p className="story-who">
                <strong>{lead.owner}</strong>, {lead.business} — {lead.trade}
              </p>
              <p className="story-outcome">{lead.outcome}</p>
            </div>
          </article>
          <div className="story-pair">
            {rest.slice(0, 2).map((s) => (
              <article key={s.id} className="story-small">
                <Img photo={s.photo} />
                <blockquote>
                  <p>“{s.quote}”</p>
                </blockquote>
                <p className="story-who">
                  <strong>{s.owner}</strong>, {s.business}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section industries" aria-labelledby="ind-h">
        <div className="section-head">
          <h2 id="ind-h">Who we work with</h2>
          <p>
            Owner-run businesses from one to forty people. We know the quirks of
            your trade before you explain them.
          </p>
        </div>
        <dl className="ind-list">
          {industries.map((i) => (
            <div key={i.name}>
              <dt>{i.name}</dt>
              <dd>{i.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band band-paper" aria-labelledby="rs-h">
        <div className="wrap section">
          <div className="section-head row-head">
            <h2 id="rs-h">From the resource desk</h2>
            <Link to="/resources" className="text-link">
              All guides & checklists <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="article-list">
            {latest.map((a) => (
              <ArticleRow key={a.slug} a={a} />
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section faq-section" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions owners ask on the first call</h2>
        <Faq items={homeFaq} />
      </section>

      <section className="closer" aria-labelledby="close-h">
        <Img photo={photos.openSign} className="closer-img" />
        <div className="wrap closer-copy">
          <h2 id="close-h">
            Twenty minutes. Your books, not our sales script.
          </h2>
          <p>
            Tell us how you're set up today. You'll leave the call knowing which
            package fits and what it costs, in writing within two business days.
          </p>
          <div className="actions">
            <Link to="/book" className="btn btn-primary">
              Pick a time
            </Link>
            <a href={brand.phoneHref} className="btn btn-light">
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
