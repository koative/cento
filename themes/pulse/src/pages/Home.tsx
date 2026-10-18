import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  artists,
  brand,
  days,
  faqs,
  gettingThere,
  home,
  images,
  stages,
  tickets,
  type DayId,
} from "../content";
import { money } from "../lib/order";
import { Speaker } from "../components/Speaker";
import { TimetableGrid } from "../components/TimetableGrid";
import { DayTabs } from "../components/DayTabs";
import { SiteMap } from "../components/SiteMap";
import { PhaseBar } from "../components/PhaseBar";

const headliners = artists.filter((a) => a.billing === 1);

export function Home() {
  const [day, setDay] = useState<DayId>("sat");

  return (
    <>
      <section className="poster" aria-labelledby="home-title">
        <div className="wrap poster-inner">
          <h1 id="home-title" className="poster-head">
            Feel every
            <br />
            <span>frequency.</span>
          </h1>
          <p className="poster-when">
            {brand.dates}
            <br />
            {brand.place}
          </p>
          <Speaker />
          <div className="poster-bill">
            <ul aria-label="Headliners">
              {headliners.map((a) => (
                <li key={a.slug}>
                  <Link to={`/lineup/${a.slug}`}>{a.name}</Link>
                </li>
              ))}
            </ul>
            <p>
              + {artists.length - headliners.length} more across four stages
            </p>
          </div>
          <div className="poster-actions">
            <Link to="/tickets" className="btn btn-ink">
              Get tickets — from{" "}
              {money(Math.min(...tickets.map((t) => t.price)))}
            </Link>
            <Link to="/lineup" className="btn btn-line-ink">
              Full lineup
            </Link>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              {brand.edition} · {brand.dates} · Body in motion · Mind elsewhere
              · {brand.place} ·{" "}
            </span>
          ))}
        </div>
      </div>

      <section className="section wrap" aria-labelledby="bill-title">
        <div className="section-head">
          <h2 id="bill-title">Thirty acts. Three days.</h2>
          <p>{home.intro}</p>
        </div>
        <div className="bill">
          {days.map((d) => (
            <div key={d.id} className="bill-day">
              <h3>
                {d.long} <span>{d.hours}</span>
              </h3>
              <ul>
                {artists
                  .filter((a) => a.day === d.id)
                  .sort((a, b) => a.billing - b.billing)
                  .map((a) => (
                    <li key={a.slug} data-billing={a.billing}>
                      <Link to={`/lineup/${a.slug}`}>{a.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/lineup" className="text-link">
          Browse every artist <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="section tt-section" aria-labelledby="tt-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="tt-title">Build your weekend</h2>
            <p>
              Tap the sets you can't miss. Clashes light up with the walk time
              between stages, and your picks stay saved on this device.
            </p>
          </div>
          <DayTabs day={day} onChange={setDay} panel="home-tt" />
          <div id="home-tt" role="tabpanel" aria-labelledby={`tab-${day}`}>
            <TimetableGrid day={day} />
          </div>
          <Link to="/timetable" className="btn btn-acid">
            Open the timetable builder
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="stages-title">
        <div className="section-head">
          <h2 id="stages-title">Four rooms, four moods</h2>
        </div>
        <ul className="stage-rows">
          {stages.map((s) => (
            <li key={s.id} data-stage={s.id}>
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                width="640"
                height="420"
              />
              <div>
                <h3>{s.name}</h3>
                <p className="stage-character">{s.character}</p>
                <p>{s.text}</p>
                <p className="stage-meta">
                  Capacity {s.capacity} ·{" "}
                  {days
                    .map((d) => `${d.short} ${s.hours[d.id] ?? "closed"}`)
                    .join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <img
          src={images.lights}
          alt="Fists raised towards a wall of white and violet stage lights in a packed hall"
          loading="lazy"
          width="1600"
          height="1200"
        />
        <div className="wrap manifesto-text">
          <h2 id="manifesto-title">
            {home.manifesto[0]}
            <br />
            {home.manifesto[1]}
          </h2>
          <p>{home.manifestoText}</p>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="tix-title">
        <div>
          <h2 id="tix-title">Tier 2 is on sale</h2>
          <p>
            Prices rise when each tier sells out. Pay in full or in three
            monthly instalments, no fee.
          </p>
          <PhaseBar />
        </div>
        <ul className="price-list">
          {tickets.map((t) => (
            <li key={t.id}>
              <span>{t.name}</span>
              <span className="price-valid">{t.valid}</span>
              <strong>{money(t.price)}</strong>
            </li>
          ))}
          <li className="price-cta">
            <Link to="/tickets" className="btn btn-acid">
              Choose tickets
            </Link>
            <span>
              No booking fee. Tickets are personal and resellable at face value.
            </span>
          </li>
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="venue-title">
        <div className="section-head">
          <h2 id="venue-title">The Waterworks</h2>
          <p>
            A decommissioned 1893 waterworks on the Spree, eight minutes from
            the S-Bahn. Tap the map to find your way around.
          </p>
        </div>
        <SiteMap />
        <ul className="facts">
          {gettingThere.slice(0, 3).map((g) => (
            <li key={g.title}>
              <strong>{g.title}</strong> {g.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="section care" aria-labelledby="care-title">
        <div className="wrap care-inner">
          <img
            src={images.hands}
            alt="Hands raised into a single beam of white light in a dark hall"
            loading="lazy"
            width="1600"
            height="1066"
          />
          <div>
            <h2 id="care-title">Looked after, all weekend</h2>
            <dl>
              {home.care.map((c) => (
                <div key={c.title}>
                  <dt>{c.title}</dt>
                  <dd>{c.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="text-link">
              How we run Pulse <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap faq-teaser" aria-labelledby="faq-title">
        <h2 id="faq-title">Before you ask</h2>
        <div className="faq-list">
          {[faqs[0], faqs[4], faqs[7], faqs[10]].map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <Link to="/faq" className="text-link">
          All questions <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-inner">
          <h2 id="close-title">
            Three days.
            <br />
            No off switch.
          </h2>
          <div>
            <p>
              {brand.dates} · {brand.place}
            </p>
            <Link to="/tickets" className="btn btn-ink">
              Get your wristband
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
