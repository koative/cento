import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import { Link } from "../router";
import { camps, coaches, type Camp } from "../content";
import { CampCard } from "../components/CampCard";
import { longDate, money } from "../lib/util";

export function CampPage({ camp }: { camp: Camp }) {
  const open = camp.departures.filter((d) => d.spots > 0);
  const [date, setDate] = useState(open[0]?.date ?? "");
  const leaders = coaches.filter((c) => camp.coaches.includes(c.id));
  const related = camps
    .filter(
      (c) =>
        c.id !== camp.id &&
        (c.level === camp.level || c.region === camp.region),
    )
    .slice(0, 3);
  const facts = [
    ["Level", `${camp.level}. ${camp.levelNote}`],
    ["Length", camp.length],
    ["Where", camp.place],
    ["Group", `Up to ${camp.groupSize} surfers`],
  ];

  return (
    <>
      <section className="camp-hero">
        <img
          src={camp.image.src}
          alt={camp.image.alt}
          width={camp.image.w}
          height={camp.image.h}
          style={{ objectPosition: camp.image.pos }}
        />
        <div className="wrap camp-hero-inner">
          <Link to="/camps" className="back">
            <ArrowLeft aria-hidden="true" size={16} /> All camps
          </Link>
          <h1>{camp.name}</h1>
          <p className="lede">{camp.summary}</p>
        </div>
      </section>

      <div className="wrap camp-layout">
        <div className="camp-main">
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="h-about">
            <h2 id="h-about">The week</h2>
            <p>{camp.intro}</p>
            <ul className="ticks">
              {camp.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="h-days">
            <h2 id="h-days">Day by day</h2>
            <ol className="itinerary">
              {camp.days.map((d, n) => (
                <li key={d.title}>
                  <span className="it-day num" aria-hidden="true">
                    {n + 1}
                  </span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="quiet">
              The order of sessions moves with the tide and swell; coaches
              confirm each day's plan at breakfast.
            </p>
          </section>

          <section className="inc-grid" aria-label="What's included">
            <div>
              <h2>Included</h2>
              <ul className="inc">
                {camp.included.map((x) => (
                  <li key={x}>
                    <Check aria-hidden="true" size={18} /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Not included</h2>
              <ul className="inc inc-no">
                {camp.excluded.map((x) => (
                  <li key={x}>
                    <Minus aria-hidden="true" size={18} /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="h-stay">
            <h2 id="h-stay">Where you stay: {camp.stay.name}</h2>
            <p>{camp.stay.text}</p>
            <div className="gallery">
              {camp.gallery.map((g) => (
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                  style={{ objectPosition: g.pos }}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="h-leads">
            <h2 id="h-leads">
              {leaders.length > 1 ? "Your coaches" : "Your coach"}
            </h2>
            <ul className="leaders">
              {leaders.map((c) => (
                <li key={c.id}>
                  <img
                    src={c.image.src}
                    alt=""
                    width={c.image.w}
                    height={c.image.h}
                    loading="lazy"
                    style={{ objectPosition: c.image.pos }}
                  />
                  <div>
                    <h3>
                      <Link to={`/coaches/${c.id}`}>{c.name}</Link>
                    </h3>
                    <p>{c.short}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="reserve" aria-labelledby="h-reserve">
          <h2 id="h-reserve">Dates</h2>
          <p className="reserve-price">
            <span className="num">{money(camp.price)}</span> per person
          </p>
          {open.length ? (
            <fieldset className="dates">
              <legend className="sr-only">Choose a departure</legend>
              {camp.departures.map((d) => (
                <label key={d.date} data-full={d.spots ? undefined : ""}>
                  <input
                    type="radio"
                    name="departure"
                    value={d.date}
                    disabled={!d.spots}
                    checked={d.date === date}
                    onChange={() => setDate(d.date)}
                  />
                  <span className="num">{longDate(d.date)}</span>
                  <small>
                    {d.spots
                      ? `${d.spots} ${d.spots === 1 ? "place" : "places"} left`
                      : "Full"}
                  </small>
                </label>
              ))}
            </fieldset>
          ) : null}
          {open.length ? (
            <Link
              to={`/book?camp=${camp.id}&date=${date}`}
              className="btn btn-ink"
            >
              Reserve a place <ArrowRight aria-hidden="true" size={18} />
            </Link>
          ) : (
            <p>All departures are full. Email us to join the waitlist.</p>
          )}
          <p className="quiet">
            30% deposit to hold your place, refundable until 60 days before
            departure.
          </p>
        </aside>
      </div>

      {related.length ? (
        <section className="section related" aria-labelledby="h-related">
          <div className="wrap">
            <h2 id="h-related">You might also like</h2>
            <div className="camp-grid">
              {related.map((c) => (
                <CampCard key={c.id} camp={c} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
