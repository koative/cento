import { useState } from "react";
import { Accessibility, Bike, Car, TramFront } from "lucide-react";
import {
  brand,
  images,
  roomById,
  rooms,
  sessions,
  venue,
  type RoomId,
} from "../content";
import { money } from "../lib/forms";

/** Floor plan rectangles in a 800 × 460 drawing; "city" has no footprint. */
const plan: Partial<
  Record<RoomId, { x: number; y: number; w: number; h: number }>
> = {
  main: { x: 40, y: 40, w: 440, h: 260 },
  glass: { x: 500, y: 40, w: 260, h: 160 },
  foyer: { x: 500, y: 210, w: 260, h: 90 },
  "loft-a": { x: 40, y: 320, w: 210, h: 100 },
  "loft-b": { x: 270, y: 320, w: 210, h: 100 },
  courtyard: { x: 500, y: 320, w: 260, h: 100 },
};

const travelIcons = [TramFront, Bike, Car];

export function Venue() {
  const [room, setRoom] = useState<RoomId>("main");
  const r = roomById[room];
  const count = sessions.filter((s) => s.room === room && s.track).length;

  return (
    <div className="page">
      <div className="wrap">
        <header className="page-head">
          <h1>Venue & travel</h1>
          <p className="lede">{venue.intro}</p>
        </header>
      </div>

      <figure className="wrap wide-photo">
        <img
          src={images.venue.src}
          alt={images.venue.alt}
          width={images.venue.w}
          height={images.venue.h}
        />
        <figcaption>{brand.address}</figcaption>
      </figure>

      <section className="wrap section">
        <h2 className="h-section">Find your way around</h2>
        <div className="floorplan">
          <svg
            viewBox="0 0 800 460"
            className="plan-svg"
            aria-hidden="true"
            focusable="false"
          >
            {Object.entries(plan).map(([id, b]) => (
              <g
                key={id}
                className="plan-room"
                data-on={id === room ? "" : undefined}
                data-open={id === "courtyard" ? "" : undefined}
                onClick={() => setRoom(id as RoomId)}
              >
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" />
                <text x={b.x + 14} y={b.y + 28}>
                  {roomById[id as RoomId].name}
                </text>
              </g>
            ))}
            {Array.from({ length: 14 }, (_, i) => (
              <path
                key={i}
                d={`M${52 + i * 30} 40 v-14 a10 10 0 0 1 20 0 v14`}
                className="plan-window"
              />
            ))}
            {[150, 190].map((y) => (
              <line
                key={y}
                x1="60"
                x2="460"
                y1={y + 60}
                y2={y + 60}
                className="plan-rail"
              />
            ))}
            <path d="M790 255 H768 M776 247 l-8 8 8 8" className="plan-entry" />
            <text x="760" y="450" textAnchor="end" className="plan-note">
              Entrance, Remisestraat
            </text>
            <text x="40" y="450" className="plan-note">
              Lofts are on the mezzanine, lift from the foyer
            </text>
          </svg>

          <div className="room-pick">
            <div className="room-list" role="group" aria-label="Rooms">
              {rooms.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={x.id === room}
                  onClick={() => setRoom(x.id)}
                >
                  {x.name}
                </button>
              ))}
            </div>
            <div className="room-detail" aria-live="polite">
              <h3>{r.name}</h3>
              <p className="room-cap">
                {r.capacity}
                {count > 0 && ` · ${count} sessions`}
              </p>
              <p>{r.text}</p>
              <p className="room-access">
                <Accessibility aria-hidden="true" />
                {r.access}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section split">
        <h2>The building</h2>
        <div className="prose">
          {venue.history.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="h-section">Getting there</h2>
        <div className="travel">
          {venue.travel.map((t, i) => {
            const Icon = travelIcons[i];
            return (
              <div key={t.title}>
                <Icon aria-hidden="true" />
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="h-section">Where to stay</h2>
        <ul className="hotels">
          {venue.hotels.map((h) => (
            <li key={h.name}>
              <h3>{h.name}</h3>
              <p className="hotel-walk">{h.walk}</p>
              <p>{h.text}</p>
              <p className="hotel-rate">
                From {money(h.rate)} a night with code <code>{h.code}</code>
              </p>
            </li>
          ))}
        </ul>
        <p className="quiet-line">
          Partner rates hold until 1 April 2027. Mention the code when you book
          directly with the hotel.
        </p>
      </section>

      <section className="wrap section split">
        <h2>Access</h2>
        <div>
          <ul className="access-list">
            {venue.access.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p>
            Questions about access? Lotte answers them all:{" "}
            <a href="mailto:access@prism.example">access@prism.example</a> or{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
