import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  days,
  editions,
  home,
  images,
  partners,
  passes,
  sessions,
  speakerBySlug,
  speakers,
  tickets,
  type Session,
} from "../content";
import { money } from "../lib/forms";
import { Spectrum } from "../components/Spectrum";
import { Portrait, SpeakerCard } from "../components/SpeakerCard";

const thursday = sessions.filter((s) => s.day === 1 && s.end !== "22:30");
const slots = [...new Set(thursday.map((s) => s.start))];
const workshops = sessions.filter((s) => s.seats);

function Cell({ s }: { s?: Session }) {
  if (!s) return <td />;
  return (
    <td data-track={s.track ?? undefined}>
      <span className="tt-title">{s.title}</span>
      {s.speakers.length > 0 && (
        <span className="tt-who">
          {s.speakers.map((slug) => speakerBySlug[slug].name).join(" & ")}
        </span>
      )}
    </td>
  );
}

export function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>
            <span className="hero-word">Prism</span>
            <span className="hero-sub">
              Design conference · {brand.dates} · {brand.venue}, {brand.city}
            </span>
          </h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/tickets" className="btn btn-ink">
              Tickets from{" "}
              {money(passes.find((p) => p.id === "student")!.earlyPrice)}
            </Link>
            <Link to="/agenda" className="btn btn-line">
              Build your agenda
            </Link>
          </div>
        </div>
        <Spectrum />
        <ul className="hero-faces" aria-label="Some of this year's speakers">
          {speakers.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link to={`/speakers/${s.slug}`}>
                <Portrait speaker={s} eager />
                <span>{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="theme-band">
        <div className="wrap theme-grid">
          <h2>{home.themeTitle}</h2>
          <div className="prose">
            {home.themeText.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
        <figure className="wrap wide-photo">
          <img
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.w}
            height={images.hero.h}
            loading="lazy"
          />
          <figcaption>
            Main stage, Prism 2026. This year the screen sits under fourteen
            arched windows.
          </figcaption>
        </figure>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Speakers</h2>
          <Link to="/speakers" className="more">
            All {speakers.length} speakers <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="speaker-grid">
          {speakers.slice(0, 8).map((s) => (
            <SpeakerCard key={s.slug} speaker={s} />
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Thursday at a glance</h2>
          <Link to="/agenda" className="more">
            Plan all three days <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="table-scroll">
          <table className="timetable">
            <caption className="sr-only">
              {days[1].label} {days[1].date}: sessions by time and room
            </caption>
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Main Hall</th>
                <th scope="col">Glass Room</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((start) => {
                const at = thursday.filter((s) => s.start === start);
                const shared = at.find((s) => !s.track || at.length === 1);
                return (
                  <tr key={start}>
                    <th scope="row">{start}</th>
                    {shared ? (
                      <td
                        colSpan={2}
                        data-track={shared.track ?? undefined}
                        data-shared={shared.track ? undefined : ""}
                      >
                        <span className="tt-title">{shared.title}</span>
                        {shared.speakers.length > 0 && (
                          <span className="tt-who">
                            {shared.speakers
                              .map((slug) => speakerBySlug[slug].name)
                              .join(" & ")}
                          </span>
                        )}
                      </td>
                    ) : (
                      <>
                        <Cell s={at.find((s) => s.room === "main")} />
                        <Cell s={at.find((s) => s.room === "glass")} />
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="workshop-band">
        <div className="wrap workshop-grid">
          <div>
            <h2>Wednesday is for making</h2>
            <p className="lede">
              Eight workshops and walks, three hours each, thirty people at
              most. One seat is included with the Full Spectrum pass.
            </p>
            <img
              src={images.workshop.src}
              alt={images.workshop.alt}
              width={images.workshop.w}
              height={images.workshop.h}
              loading="lazy"
            />
          </div>
          <ol className="workshop-list">
            {workshops.map((w) => (
              <li key={w.id} data-track={w.track ?? undefined}>
                <span className="wl-time">{w.start}</span>
                <span className="wl-title">{w.title}</span>
                <span className="wl-who">
                  {w.speakers
                    .map((slug) => speakerBySlug[slug].name)
                    .join(" & ")}{" "}
                  · {w.seats} seats
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Passes</h2>
          <p className="section-note">
            Early-bird prices until {tickets.earlyBirdEnds}
          </p>
        </div>
        <div className="pass-row">
          {passes.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to="/tickets"
              className="pass-line"
              data-featured={p.featured ? "" : undefined}
            >
              <span className="pass-name">{p.name}</span>
              <span className="pass-text">{p.text}</span>
              <span className="pass-price">
                {money(p.earlyPrice)} <s>{money(p.price)}</s>
              </span>
            </Link>
          ))}
        </div>
        <p className="quiet-line">
          Student {money(passes.find((p) => p.id === "student")!.earlyPrice)} ·
          Online {money(passes.find((p) => p.id === "online")!.price)} · Teams
          of {tickets.teamSize} or more save {tickets.teamDiscount * 100}%.
        </p>
      </section>

      <section className="venue-band">
        <img
          src={images.venue.src}
          alt={images.venue.alt}
          width={images.venue.w}
          height={images.venue.h}
          loading="lazy"
        />
        <div className="wrap venue-copy">
          <h2>A tram depot full of light</h2>
          <p>
            Lichthal was built in 1911 to repair Rotterdam's trams. Fourteen
            arched windows, rails still in the floor, fourteen minutes from
            Centraal by tram 20.
          </p>
          <Link to="/venue" className="btn btn-paper">
            Venue, travel & hotels
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Five years of Prism</h2>
          <Link to="/editions" className="more">
            Past editions <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ol className="edition-strip">
          {editions.map((e) => (
            <li key={e.year}>
              <Link to={`/editions/${e.year}`}>
                <img
                  src={e.image.src}
                  alt=""
                  width={e.image.w}
                  height={e.image.h}
                  loading="lazy"
                />
                <span className="es-year">{e.year}</span>
                <span className="es-title">{e.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section partners-strip">
        <h2>Made possible by</h2>
        <ul>
          {partners.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
        <Link to="/sponsors" className="more">
          Partner with Prism 2027 <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/register" className="btn btn-paper">
              Register now
            </Link>
            <Link to="/agenda" className="btn btn-line-paper">
              Build your agenda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
