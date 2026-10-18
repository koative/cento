import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { days, events, locations, rooms, type Location } from "../content";
import { hoursLabel, money } from "../lib";
import { FloorPlan } from "../components/FloorPlan";
import { CityMap } from "../components/CityMap";
import { DeskStatus } from "../components/DeskStatus";
import { EventRow } from "../components/EventRow";

export function LocationPage({ location: l }: { location: Location }) {
  const here = rooms.filter((r) => r.locationId === l.id);
  const [spaceId, setSpaceId] = useState(l.plan.spaces[0].id);
  const space = l.plan.spaces.find((s) => s.id === spaceId) ?? l.plan.spaces[0];
  const room = here.find((r) => r.id === space.id);
  const upcoming = events.filter((e) => e.locationId === l.id);
  const others = locations.filter((o) => o.id !== l.id);
  const today = new Date().getDay();

  return (
    <>
      <header className="page-head wrap location-head">
        <p className="crumbs">
          <Link to="/locations">Locations</Link> / {l.name}
        </p>
        <h1>{l.name}</h1>
        <p className="location-where">
          {l.neighbourhood} · {l.address} · <DeskStatus hours={l.staffed} />
        </p>
        <p className="lede">{l.intro}</p>
        <div className="actions">
          <Link to="/tour" className="btn btn-accent">
            Book a tour of {l.name}
          </Link>
          <Link to={`/rooms?location=${l.id}`} className="btn btn-quiet">
            Book a room here
          </Link>
        </div>
      </header>

      <section className="wrap gallery" aria-label={`Photos of ${l.name}`}>
        <img
          className="gallery-main"
          src={l.image.src}
          alt={l.image.alt}
          width={l.image.w}
          height={l.image.h}
        />
        {l.gallery.map((g) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            width={g.w}
            height={g.h}
            loading="lazy"
          />
        ))}
      </section>

      <section className="zones band" aria-labelledby="plan-title">
        <div className="wrap zones-grid">
          <div className="zones-copy">
            <h2 id="plan-title">The {l.plan.floor.toLowerCase()}</h2>
            <div
              className="zone-list"
              role="tablist"
              aria-label={`${l.name} ${l.plan.floor}`}
            >
              {l.plan.spaces.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`space-${s.id}`}
                  aria-selected={s.id === spaceId}
                  aria-controls="space-panel"
                  onClick={() => setSpaceId(s.id)}
                >
                  <span
                    className="swatch"
                    data-kind={s.kind}
                    aria-hidden="true"
                  />
                  {s.label}
                </button>
              ))}
            </div>
            <div
              className="zone-note"
              id="space-panel"
              role="tabpanel"
              aria-labelledby={`space-${space.id}`}
              aria-live="polite"
            >
              {room ? (
                <>
                  <p>
                    <strong>
                      {room.name} · {room.capacity} seats · {money(room.rate)}/h
                    </strong>
                  </p>
                  <p>{room.blurb}</p>
                  <Link to={`/rooms?room=${room.id}`} className="text-link">
                    See {room.name} on the room board{" "}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <p>{space.note}</p>
              )}
            </div>
          </div>
          <div className="zones-plan">
            <FloorPlan
              plan={l.plan}
              label={`${l.name} ${l.plan.floor} plan with ${space.label} highlighted`}
              selected={spaceId}
              onSelect={setSpaceId}
            />
            <p className="plan-caption">
              <span>
                {l.plan.floor} · {l.name}
              </span>
              <span>Illustrative, not to scale</span>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section location-detail">
        <div className="prose">
          <h2>About the house</h2>
          {l.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="host">
            <strong>{l.host.name}</strong>, your host. {l.host.line}
          </p>
          <h3>What's here</h3>
          <ul className="amenities">
            {l.amenities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <aside className="sign visit" aria-labelledby="visit-title">
          <h2 id="visit-title">Front desk</h2>
          <table className="hours">
            <tbody>
              {days.map((d, i) => (
                <tr key={d} data-today={i === today ? "" : undefined}>
                  <th scope="row">{d}</th>
                  <td>{hoursLabel(l.staffed[i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="visit-access">{l.access}</p>
          <h3>Getting here</h3>
          <ul>
            {l.transit.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <CityMap houses={locations} active={l.id} />
        </aside>
      </section>

      <section className="wrap section" aria-labelledby="rooms-title">
        <div className="section-head">
          <h2 id="rooms-title">Meeting rooms at {l.name}</h2>
          <Link to={`/rooms?location=${l.id}`} className="text-link">
            Open the room board <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="room-rows">
          {here.map((r) => (
            <li key={r.id}>
              <h3>{r.name}</h3>
              <p>{r.blurb}</p>
              <p className="room-specs">
                {r.capacity} seats · {r.layout} · {r.features.join(", ")}
              </p>
              <p className="room-rate">
                <strong>{money(r.rate)}</strong>/h
                <Link to={`/rooms?room=${r.id}`} className="text-link">
                  Book {r.name}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {upcoming.length > 0 && (
        <section className="wrap section" aria-labelledby="here-events">
          <h2 id="here-events">Coming up at {l.name}</h2>
          <ul className="event-list">
            {upcoming.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </ul>
        </section>
      )}

      <section className="wrap section" aria-labelledby="others-title">
        <h2 id="others-title">The other houses</h2>
        <ul className="houses houses-three">
          {others.map((o) => (
            <li key={o.id} className="house">
              <img
                src={o.image.src}
                alt={o.image.alt}
                width={o.image.w}
                height={o.image.h}
                loading="lazy"
              />
              <div>
                <h3>
                  <Link to={`/locations/${o.id}`}>{o.name}</Link>
                </h3>
                <p>{o.short}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
