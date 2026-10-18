import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import {
  afterHours,
  brand,
  emergency,
  home,
  hours,
  plans,
  services,
  vets,
} from "../content";
import { clock, money, openStatus, weekday } from "../lib/format";
import { CarePlanner } from "../components/CarePlanner";
import { ServiceList } from "../components/ServiceList";
import { Stamp } from "../components/Stamp";
import { VetCard } from "../components/VetCard";

export function Home() {
  const { hero, calm, notes, close } = home;
  const status = openStatus();
  const todayIdx = new Date().getDay();

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="lede">{hero.lede}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-primary btn-lg">
              Book a visit <ArrowRight aria-hidden="true" />
            </Link>
            <a href={brand.phoneHref} className="btn btn-ghost btn-lg">
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
          </div>
          <p className="hero-status" data-open={status.open ? "" : undefined}>
            <span className="status-dot" aria-hidden="true" /> {status.label} ·{" "}
            {brand.address[0]}
          </p>
          <ul className="hero-services" aria-label="Popular services">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-visual">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.w}
            height={hero.image.h}
            fetchPriority="high"
          />
          <div className="slip" aria-label="Example visit note">
            <p className="slip-head">Visit note</p>
            <p className="slip-pet">
              {hero.card.pet} <span>{hero.card.species}</span>
            </p>
            <p className="slip-note">{hero.card.note}</p>
            <p className="slip-sign">Seen by {hero.card.seen}</p>
            <Stamp label="Seen" tilt={-12} />
          </div>
        </div>
      </section>

      <section
        className="section wrap services-home"
        aria-labelledby="h-services"
      >
        <div className="section-head split">
          <h2 id="h-services">What we see people for</h2>
          <p>
            Prices are what you'll actually pay for a standard visit, before any
            medicines. Every procedure gets a written estimate first.
          </p>
        </div>
        <ServiceList items={services} />
        <Link to="/services" className="text-link">
          Browse services by species <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="calm" aria-labelledby="h-calm">
        <div className="wrap calm-grid">
          <img
            src={calm.image.src}
            alt={calm.image.alt}
            width={calm.image.w}
            height={calm.image.h}
            loading="lazy"
            className="calm-img"
          />
          <div className="calm-copy">
            <h2 id="h-calm">{calm.title}</h2>
            <p className="lede">{calm.body}</p>
            <dl className="calm-points">
              {calm.points.map((p) => (
                <div key={p.title}>
                  <dt>{p.title}</dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-planner">
        <div className="section-head split">
          <h2 id="h-planner">When is your pet next due?</h2>
          <p>
            The paper card we fill in at the desk, on your screen. Change the
            pet and the dates redraw; stamp what's been given.{" "}
            <Link to="/planner" className="text-link">
              More on schedules
            </Link>
          </p>
        </div>
        <CarePlanner headingLevel={3} />
      </section>

      <section className="section wrap" aria-labelledby="h-vets">
        <div className="section-head split">
          <h2 id="h-vets">Four vets, two nurses, six pets at home</h2>
          <p>
            Book the same vet each time, or whoever's free first. We've
            introduced everyone by the photo on their locker.
          </p>
        </div>
        <div className="vet-row">
          {vets.map((v) => (
            <VetCard key={v.slug} vet={v} />
          ))}
        </div>
        <Link to="/vets" className="text-link">
          Meet the team <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="emergency-band" aria-labelledby="h-emergency">
        <div className="wrap emergency-grid">
          <div>
            <h2 id="h-emergency">{emergency.title}</h2>
            <p>{afterHours.note}</p>
            <a href={brand.emergencyHref} className="btn btn-alarm btn-lg">
              <Phone aria-hidden="true" /> Call {brand.emergencyPhone}
            </a>
          </div>
          <div>
            <h3>Call straight away if your pet has</h3>
            <ul className="tick-list">
              {emergency.now.slice(0, 5).map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <Link to="/emergency" className="text-link">
              Full emergency guide and toxins list{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap plans-home" aria-labelledby="h-plans">
        <div className="section-head split">
          <h2 id="h-plans">Routine care, paid monthly</h2>
          <p>
            Health plans bundle exams, boosters and parasite prevention into one
            monthly payment — and every nurse visit is free.
          </p>
        </div>
        <div className="plan-strip">
          {plans.map((p) => (
            <Link
              key={p.id}
              to="/plans"
              className="plan-mini"
              data-featured={p.featured ? "" : undefined}
            >
              <span className="plan-mini-name">{p.name}</span>
              <span className="plan-mini-for">{p.forWho}</span>
              <span className="plan-mini-price">
                from <b>{money(Math.round(p.base * 0.85))}</b>/mo
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="notes" aria-labelledby="h-notes">
        <div className="wrap">
          <h2 id="h-notes">From the waiting room</h2>
          <div className="notes-grid">
            {notes.map((n) => (
              <figure key={n.name}>
                <blockquote>
                  <p>{n.quote}</p>
                </blockquote>
                <figcaption>
                  {n.name} <span>with {n.pet}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap visit-home" aria-labelledby="h-visit">
        <div>
          <h2 id="h-visit">Find us on Alder Street</h2>
          <address className="visit-address">
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>
            Free parking behind the clinic, off Birch Lane. Cats use the side
            door; dogs, the front.
          </p>
          <Link to="/visit" className="text-link">
            Getting here & new clients <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <table className="hours-table">
          <caption>Opening hours</caption>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <tr key={d} aria-current={d === todayIdx ? "date" : undefined}>
                <th scope="row">{weekday[d]}</th>
                <td>
                  {hours[d]
                    ? `${clock(hours[d]!.open)} – ${clock(hours[d]!.close)}`
                    : "Closed — emergency line open"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="closer" aria-labelledby="h-close">
        <img
          src={close.image.src}
          alt={close.image.alt}
          width={close.image.w}
          height={close.image.h}
          loading="lazy"
        />
        <div className="closer-panel">
          <h2 id="h-close">{close.title}</h2>
          <p>{close.body}</p>
          <Link to="/book" className="btn btn-primary btn-lg">
            Book a visit <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
