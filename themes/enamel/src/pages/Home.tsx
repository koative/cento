import { ArrowRight, CalendarClock } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  categories,
  comfortMenu,
  days,
  dentists,
  firstVisit,
  hours,
  images,
  notes,
  plan,
  treatments,
  visit,
} from "../content";
import {
  dayLabel,
  hoursLabel,
  money,
  openStatus,
  priceRange,
} from "../lib/format";
import { nextFree } from "../lib/slots";
import { ToothMap } from "../components/ToothMap";
import { ClinicMap } from "../components/ClinicMap";
import { AppointmentCard } from "../components/AppointmentCard";

const featured = ["check-up", "white-fillings", "whitening", "emergency"];

export function Home() {
  const checkup = treatments[0];
  const slot = nextFree(checkup.dentists, checkup.minutes);
  const slotDentist = dentists.find((d) => d.slug === slot?.dentist);
  const status = openStatus(hours);

  return (
    <div className="page home">
      <section className="hero wrap" aria-labelledby="hero-h">
        <div className="hero-text">
          <h1 id="hero-h">
            Careful dentistry, priced before we pick up a drill.
          </h1>
          <p className="lede">
            A six-chair clinic on Halden Street for check-ups, fillings, root
            canals, implants and straighter smiles. You see the x-ray, then the
            price, then you decide.
          </p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary btn-lg">
              Book online <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/prices" className="btn btn-ghost btn-lg">
              See every price
            </Link>
          </div>
          {slot && (
            <p className="next-slot">
              <CalendarClock aria-hidden="true" />
              <span>
                Next free check-up:{" "}
                <strong>
                  {dayLabel(slot.day, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                  , {slot.label}
                </strong>{" "}
                with {slotDentist?.name}
              </span>
            </p>
          )}
        </div>
        <figure className="hero-figure">
          <img
            src={images.surgery}
            alt="Treatment room two at Enamel: a reclined chair under a soft overhead lamp"
            width={960}
            height={640}
          />
          <figcaption>Room two, where most first visits happen.</figcaption>
        </figure>
        <ul className="price-strip" aria-label="Popular treatments and prices">
          {featured.map((slug) => {
            const t = treatments.find((x) => x.slug === slug)!;
            return (
              <li key={slug}>
                <Link to={`/treatments/${slug}`}>
                  <span className="ps-name">{t.name}</span>
                  <span className="ps-price tnum">
                    {t.priceTo ? "from " : ""}
                    {money(t.price)}
                  </span>
                  <span className="ps-meta">
                    {t.minutes} min · {t.visits}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="band band-gum" aria-labelledby="map-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="map-h">Show us where it hurts.</h2>
            <p>
              Mark teeth on the same chart your dentist uses and we'll match
              them to a treatment and a rough price — before you've picked up
              the phone.
            </p>
          </div>
          <ToothMap />
        </div>
      </section>

      <section className="wrap index-section" aria-labelledby="idx-h">
        <div className="section-head split">
          <h2 id="idx-h">Everything we do, and what it costs.</h2>
          <Link to="/treatments" className="link-arrow">
            All {treatments.length} treatments <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="treat-index">
          {categories.map((c) => (
            <div key={c} className="ti-group">
              <h3>{c}</h3>
              <ul>
                {treatments
                  .filter((t) => t.category === c)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link to={`/treatments/${t.slug}`}>
                        <span>{t.name}</span>
                        <span className="tnum">{priceRange(t)}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="statement" aria-labelledby="st-h">
        <div className="wrap statement-grid">
          <h2 id="st-h">
            Nothing happens in the chair that wasn't explained at the desk.
          </h2>
          <div className="statement-body">
            <p>
              Every room has a screen on the ceiling. Your x-rays and photos go
              up as soon as they're taken, so you see the crack, the shadow or
              the healthy tooth for yourself.
            </p>
            <p>
              Then you get a printed plan, ranked by urgency, with a price
              beside every line. If anything changes once we've started, we stop
              and ask.
            </p>
            <Link to="/about" className="link-arrow">
              How the clinic works <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <img
            className="statement-img"
            src={images.panoramic}
            alt="A panoramic x-ray showing every tooth and root in both jaws"
            width={1500}
            height={863}
            loading="lazy"
          />
        </div>
      </section>

      <section className="wrap team-section" aria-labelledby="team-h">
        <div className="section-head split">
          <h2 id="team-h">Five dentists and a hygienist who don't rush.</h2>
          <Link to="/dentists" className="link-arrow">
            Meet the team <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="team-rows">
          {dentists.map((d) => (
            <li key={d.slug}>
              <Link to={`/dentists/${d.slug}`}>
                <span className="tr-name">{d.name}</span>
                <span className="tr-role">{d.role}</span>
                <span className="tr-days">
                  {d.days.map((n) => days[n].slice(0, 3)).join(" · ")}
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="comfort" aria-labelledby="cf-h">
        <div className="wrap comfort-grid">
          <img
            src={images.redChair}
            alt="A red dental chair in a sunlit room"
            width={960}
            height={638}
            loading="lazy"
          />
          <div>
            <h2 id="cf-h">Nervous? Ask for the comfort menu.</h2>
            <p className="lede">
              Around a third of our new patients haven't seen a dentist in five
              years. Nobody gets told off.
            </p>
            <dl className="comfort-list">
              {comfortMenu.slice(0, 4).map((c) => (
                <div key={c.title}>
                  <dt>{c.title}</dt>
                  <dd>{c.body}</dd>
                </div>
              ))}
            </dl>
            <Link to="/new-patients" className="link-arrow">
              Everything for new patients <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap first-visit" aria-labelledby="fv-h">
        <h2 id="fv-h">Your first visit, minute by minute.</h2>
        <ol className="timeline">
          {firstVisit.map((s) => (
            <li key={s.title}>
              <span className="tl-at tnum">{s.at}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band-ink plan-teaser" aria-labelledby="pl-h">
        <div className="wrap plan-grid">
          <div>
            <h2 id="pl-h">
              The {plan.name}: check-ups, cleans and 15% off, for{" "}
              {money(plan.monthly)} a month.
            </h2>
            <Link to="/prices" className="btn btn-light">
              Compare plan and pay-as-you-go prices
            </Link>
          </div>
          <ul className="ticks">
            {plan.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap voices" aria-labelledby="vo-h">
        <h2 id="vo-h" className="sr-only">
          Patient notes
        </h2>
        {notes.map((n, i) => (
          <figure
            key={n.name}
            className={i === 0 ? "voice voice-lead" : "voice"}
          >
            <blockquote>
              <p>{n.quote}</p>
            </blockquote>
            <figcaption>
              {n.name} · {n.context}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="wrap visit-teaser" aria-labelledby="vi-h">
        <div>
          <h2 id="vi-h">Second floor, old post office, Halden Street.</h2>
          <p className="status-line" data-open={status.open ? "" : undefined}>
            {status.label}
          </p>
          <dl className="hours-list">
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <div
                key={d}
                data-today={new Date().getDay() === d ? "" : undefined}
              >
                <dt>{days[d]}</dt>
                <dd className="tnum">{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
          <p>{visit.lede}</p>
          <Link to="/visit" className="link-arrow">
            Getting here & access <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ClinicMap />
      </section>

      <section className="closing" aria-labelledby="cl-h">
        <div className="wrap closing-grid">
          <div>
            <h2 id="cl-h">Booking takes about two minutes.</h2>
            <p className="lede">
              Pick a treatment, a dentist and a time that's actually free.
              Prefer to talk? Call {brand.phone} — the desk answers from 7:45.
            </p>
            <Link to="/book" className="btn btn-primary btn-lg">
              Find a time <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {slot && (
            <AppointmentCard
              sample
              a={{
                name: "You",
                treatment: checkup.name,
                dentist: slotDentist?.name ?? "",
                date: dayLabel(slot.day, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }),
                time: slot.label,
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
