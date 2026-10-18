import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  campaigns,
  causeLabel,
  events,
  featuredSlug,
  homeCopy,
  recentGrants,
  reports,
  roles,
} from "../content";
import { daysUntil, formatDate, money } from "../lib/format";
import { startGift } from "../lib/giving";
import { Pledge } from "../components/Board";
import { CampaignCard } from "../components/CampaignCard";
import { DollarSplit } from "../components/DollarSplit";
import { EventList } from "../components/EventList";
import gardenImg from "../assets/garden.jpg";
import walkImg from "../assets/lanterns-night.jpg";

export function Home() {
  const featured = campaigns.find((c) => c.slug === featuredSlug)!;
  const urgent = campaigns
    .filter((c) => c.slug !== featuredSlug && c.raised < c.goal)
    .sort((a, b) => daysUntil(a.closes) - daysUntil(b.closes))
    .slice(0, 3);
  const walk = events.find((e) => e.id === "lantern-walk")!;
  const latest = reports[0];

  return (
    <>
      <section className="hero wrap">
        <Pledge
          campaign={featured}
          intro={
            <>
              <h1>{homeCopy.heroTitle}</h1>
              <p className="hero-text">{homeCopy.heroText}</p>
              <p className="hero-board-note">
                On the board this month:{" "}
                <Link to={`/campaigns/${featured.slug}`}>{featured.title}</Link>
              </p>
            </>
          }
        />
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>{homeCopy.campaignsTitle}</h2>
          <p>{homeCopy.campaignsText}</p>
          <Link to="/campaigns" className="text-link">
            All campaigns <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="card-grid">
          {urgent.map((c) => (
            <CampaignCard key={c.slug} campaign={c} />
          ))}
        </div>
      </section>

      <section className="section split-section wrap">
        <div>
          <h2>{homeCopy.splitTitle}</h2>
          <p>
            In {latest.year} Lantern spent{" "}
            {money(latest.spend.reduce((s, x) => s + x.amount, 0))}.{" "}
            {homeCopy.splitText}
          </p>
          <Link to="/reports" className="text-link">
            Read the {latest.year} report{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <DollarSplit report={latest} />
      </section>

      <section className="section ledger-section">
        <div className="wrap">
          <div className="section-head">
            <h2>{homeCopy.ledgerTitle}</h2>
            <p>{homeCopy.ledgerText}</p>
          </div>
          <div className="table-scroll">
            <table className="ledger">
              <caption className="visually-hidden">
                Recent grants paid by Lantern
              </caption>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">To</th>
                  <th scope="col">For</th>
                  <th scope="col">Cause</th>
                  <th scope="col" className="num">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentGrants.map((g) => (
                  <tr key={g.date + g.to}>
                    <td className="nowrap">
                      {formatDate(g.date, { day: "numeric", month: "short" })}
                    </td>
                    <td>{g.to}</td>
                    <td>{g.what}</td>
                    <td className="nowrap">{causeLabel(g.cause)}</td>
                    <td className="num">{money(g.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="section quote-section wrap"
        aria-label="A neighbour's words"
      >
        <img
          src={gardenImg}
          alt="Gloved hands weeding young onions in a Riverside raised bed."
          width={900}
          height={600}
          loading="lazy"
        />
        <figure>
          <blockquote>
            <p>{homeCopy.quote.text}</p>
          </blockquote>
          <figcaption>
            {homeCopy.quote.who} ·{" "}
            <Link to="/campaigns/riverside-beds">
              Forty Raised Beds at Riverside
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="walk-band">
        <img src={walkImg} alt="" width={1800} height={1200} loading="lazy" />
        <div className="wrap walk-inner">
          <h2>
            The Lantern Walk
            <span>
              {formatDate(walk.date, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </h2>
          <p>
            {walk.summary} {homeCopy.walkText}
          </p>
          <ul className="walk-facts">
            {homeCopy.walkFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="btn-row">
            <Link to={`/events/${walk.id}`} className="btn btn-flame">
              Register to walk
            </Link>
            <Link
              to="/campaigns/lantern-walk-2026"
              className="btn btn-ghost-light"
            >
              Sponsor a walker
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap two-col">
        <div className="section-head">
          <h2>{homeCopy.waysTitle}</h2>
          <p>{homeCopy.waysText}</p>
          <Link to="/volunteer" className="btn">
            Find a role
          </Link>
        </div>
        <ul className="role-list">
          {roles.slice(0, 4).map((r) => (
            <li key={r.id}>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <p className="role-meta">
                {r.when} · {r.commitment}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Coming up</h2>
          <Link to="/events" className="text-link">
            Every event <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <EventList items={events.slice(0, 4)} />
      </section>

      <section className="section monthly wrap">
        <h2>{homeCopy.monthlyTitle}</h2>
        <p>{homeCopy.monthlyText}</p>
        <button
          type="button"
          className="btn"
          onClick={() => {
            startGift({ campaign: null, amount: 8, monthly: true });
          }}
        >
          Give $8 a month
        </button>
      </section>

      <section className="close wrap">
        <h2>{homeCopy.closeTitle}</h2>
        <p>{homeCopy.closeText}</p>
        <div className="btn-row">
          <Link to="/donate" className="btn btn-flame">
            Donate
          </Link>
          <Link to={`/events/${walk.id}`} className="btn btn-ghost">
            Walk on 14 November
          </Link>
        </div>
      </section>
    </>
  );
}
