import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, navigate } from "../router";
import {
  directory,
  dropIn,
  events,
  home,
  images,
  locations,
  plans,
  rooms,
  stories,
} from "../content";
import { money } from "../lib";
import { FloorPlan } from "../components/FloorPlan";
import { RoomBoard } from "../components/RoomBoard";
import { EventRow } from "../components/EventRow";
import { DeskStatus } from "../components/DeskStatus";

const mill = locations[0];
const zones = mill.plan.spaces.filter((s) => s.note);

export function Home() {
  const [zone, setZone] = useState(zones[0].id);
  const active = zones.find((z) => z.id === zone) ?? zones[0];
  const now = new Date();
  const story = stories[0];

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/tour" className="btn btn-accent">
              Book a tour, first day free <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/memberships" className="btn btn-quiet">
              See memberships
            </Link>
          </div>
        </div>
        <figure className="hero-media">
          <img
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.w}
            height={images.hero.h}
          />
          <figcaption>
            Mill Yard, the Workshop floor, a Tuesday afternoon
          </figcaption>
        </figure>
        <aside className="sign today" aria-labelledby="today-title">
          <h2 id="today-title">Today at Commons</h2>
          <ul>
            {locations.map((l) => (
              <li key={l.id}>
                <Link to={`/locations/${l.id}`}>
                  <strong>{l.name}</strong>
                  <DeskStatus hours={l.staffed} />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="statement wrap">
        <h2>
          {home.statement.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <em>{home.statementEnd}</em>
        </h2>
        <p>{home.statementText}</p>
      </section>

      <section className="zones band" aria-labelledby="zones-title">
        <div className="wrap zones-grid">
          <div className="zones-copy">
            <h2 id="zones-title">Choose your kind of day</h2>
            <p>
              Mill Yard's ground floor, as it is drawn on the plan by the front
              door. Pick a corner to see what it's for.
            </p>
            <div
              className="zone-list"
              role="tablist"
              aria-label="Mill Yard ground floor"
            >
              {zones.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  role="tab"
                  id={`zone-${z.id}`}
                  aria-selected={z.id === zone}
                  aria-controls="zone-panel"
                  onClick={() => setZone(z.id)}
                >
                  <span
                    className="swatch"
                    data-kind={z.kind}
                    data-i={zones.indexOf(z)}
                    aria-hidden="true"
                  />
                  {z.label}
                </button>
              ))}
            </div>
            <p
              className="zone-note"
              id="zone-panel"
              role="tabpanel"
              aria-labelledby={`zone-${active.id}`}
              aria-live="polite"
            >
              {active.note}
            </p>
          </div>
          <div className="zones-plan">
            <FloorPlan
              plan={mill.plan}
              label={`Mill Yard ground floor plan with ${active.label} highlighted`}
              selected={zone}
              onSelect={(id) => zones.some((z) => z.id === id) && setZone(id)}
            />
            <p className="plan-caption">
              <span>{mill.plan.floor} · Mill Yard</span>
              <span>Illustrative, not to scale</span>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="plans-title">
        <div className="section-head">
          <h2 id="plans-title">Memberships that bend with the week</h2>
          <Link to="/memberships" className="text-link">
            Compare every plan <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="plan-rows">
          {plans.map((p) => (
            <li key={p.id} data-featured={p.featured ? "" : undefined}>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <p className="plan-price">
                <strong>
                  {p.from ? "from " : ""}
                  {money(p.monthly)}
                </strong>
                <span>{p.unit}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="drop-in">
          Just visiting?{" "}
          {dropIn.map((d, i) => (
            <span key={d.name}>
              {d.name}{" "}
              <strong>
                {d.perHour ? `from ${money(d.price)}/h` : money(d.price)}
              </strong>
              {i < dropIn.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <section className="wrap section" aria-labelledby="houses-title">
        <div className="section-head">
          <h2 id="houses-title">Four houses, one key card</h2>
          <Link to="/locations" className="text-link">
            All locations <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="houses">
          {locations.map((l) => (
            <li key={l.id} className="house">
              <img
                src={l.image.src}
                alt={l.image.alt}
                width={l.image.w}
                height={l.image.h}
                loading="lazy"
              />
              <div>
                <h3>
                  <Link to={`/locations/${l.id}`}>{l.name}</Link>
                </h3>
                <p>{l.short}</p>
                <p className="house-meta">
                  {l.neighbourhood} · {l.desks} desks
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="board-band" aria-labelledby="board-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="board-title">Rooms by the half hour</h2>
              <p>
                Today's board at Mill Yard. Pick a free slot and finish booking
                on the next screen. No membership needed.
              </p>
            </div>
            <Link to="/rooms" className="text-link">
              All ten rooms <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <RoomBoard
            rooms={rooms.filter((r) => r.locationId === mill.id)}
            date={now}
            headcount={1}
            pick={null}
            mine={[]}
            cutoff={now.getHours() + (now.getMinutes() >= 30 ? 1 : 0.5)}
            onPick={(room, start) =>
              navigate(`/rooms?room=${room}&start=${start}`)
            }
          />
          <p className="board-legend">
            <span data-state="free">Free</span>
            <span data-state="busy">Booked</span>
            <span data-state="past">Passed</span>
          </p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="events-title">
        <div className="section-head">
          <h2 id="events-title">On the calendar</h2>
          <Link to="/events" className="text-link">
            Full calendar <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-list">
          {events.slice(0, 4).map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </ul>
      </section>

      <section className="directory-band" aria-labelledby="dir-title">
        <div className="wrap directory-grid">
          <div className="sign directory">
            <h2 id="dir-title">Who's in the building</h2>
            <table>
              <thead>
                <tr>
                  <th scope="col">Member</th>
                  <th scope="col">Trade</th>
                  <th scope="col">Find them</th>
                </tr>
              </thead>
              <tbody>
                {directory.slice(0, 8).map((m) => (
                  <tr key={m.name}>
                    <th scope="row">{m.name}</th>
                    <td>{m.trade}</td>
                    <td>{m.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure className="quote">
            <blockquote>
              <p>{story.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{story.name}</strong>
              {story.business} · {story.plan}
            </figcaption>
            <Link to="/community" className="text-link">
              Meet the community <ArrowRight aria-hidden="true" />
            </Link>
          </figure>
        </div>
      </section>

      <section className="wrap section day" aria-labelledby="day-title">
        <h2 id="day-title">A day at Commons</h2>
        <ol className="day-line">
          {home.day.map((d) => (
            <li key={d.time}>
              <time>{d.time}</time>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="close wrap" aria-labelledby="close-title">
        <img
          src={images.lounge.src}
          alt={images.lounge.alt}
          width={images.lounge.w}
          height={images.lounge.h}
          loading="lazy"
        />
        <div>
          <h2 id="close-title">Come by for a coffee</h2>
          <p>
            Twenty minutes with a host, then the rest of the day on us. Any
            house, any weekday.
          </p>
          <Link to="/tour" className="btn btn-accent">
            Book a tour <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
