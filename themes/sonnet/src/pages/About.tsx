import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, glosses, hours, images } from "../content";
import { langStyle, PageHead } from "../components/Bits";
import { langOf } from "../lib/format";

/** Second-floor plan: [room, x, y, width, height]. Language rooms take their language's colour. */
const plan: [string, number, number, number, number][] = [
  ["Verlaine", 0, 0, 190, 130],
  ["Montale", 190, 0, 140, 130],
  ["Machado", 330, 0, 140, 130],
  ["Rilke", 470, 0, 130, 130],
  ["Pessoa", 0, 170, 140, 130],
  ["Bashō", 140, 170, 130, 130],
  ["Kitchen", 270, 170, 110, 130],
  ["Office", 380, 170, 110, 130],
  ["Lift & stairs", 490, 170, 110, 130],
];

export function About() {
  return (
    <div className="page about">
      <div className="wrap">
        <PageHead title={about.title} lead={about.lead} gloss={glosses.about} />
      </div>

      <section className="wrap story" aria-labelledby="story-h">
        <h2 id="story-h" className="vh">
          Our story
        </h2>
        <div className="story-text">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <figure className="story-photo">
          <img
            src={images.classroom.src}
            alt={images.classroom.alt}
            width={images.classroom.w}
            height={images.classroom.h}
          />
          <figcaption>A Thursday B1 group in Room Machado.</figcaption>
        </figure>
      </section>

      <section className="section principles-band" aria-labelledby="pr-h">
        <div className="wrap">
          <h2 id="pr-h">Four rules we have not broken since 2009</h2>
          <dl className="principles">
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section rooms" aria-labelledby="rooms-h">
        <div className="section-head">
          <h2 id="rooms-h">Six rooms named after poets</h2>
          <p>{brand.addressNote}</p>
        </div>
        <svg
          className="floorplan"
          viewBox="-2 -2 604 304"
          role="img"
          aria-label="Floor plan: four classrooms along the front, two classrooms, the kitchen, the office and the lift along the back, with a corridor between"
        >
          {plan.map(([name, x, y, w, h]) => {
            const room = about.rooms.find((r) => r.name === name);
            const color = room ? langOf(room.lang).color : undefined;
            return (
              <g
                key={name}
                className={room ? "fp-room" : "fp-service"}
                style={color ? { fill: color } : undefined}
              >
                <rect x={x} y={y} width={w} height={h} />
                <text x={x + 12} y={y + 28}>
                  {name}
                </text>
                {room && (
                  <text className="fp-lang" x={x + 12} y={y + 48}>
                    {langOf(room.lang).name}
                  </text>
                )}
              </g>
            );
          })}
          <text className="fp-corridor" x="300" y="155" textAnchor="middle">
            corridor · lending shelf
          </text>
        </svg>
        <dl className="room-list">
          {about.rooms.map((r) => (
            <div key={r.name} style={langStyle(langOf(r.lang).color)}>
              <dt>
                Room {r.name} <span>{langOf(r.lang).name}</span>
              </dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section visit" aria-labelledby="visit-h">
        <div>
          <h2 id="visit-h">Visit the school</h2>
          <p>
            {brand.address}. {brand.addressNote} The office is open whenever
            classes are running; come in for a chat and a look at the rooms
            before you decide.
          </p>
          <p>
            <a href={"mailto:" + brand.email}>{brand.email}</a> ·{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
          <div className="actions">
            <Link to="/teachers" className="btn btn-ghost">
              Meet the teachers
            </Link>
            <Link to="/enrol" className="btn">
              Enrol <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <dl className="ledger">
          {hours.map((h) => (
            <div key={h.days}>
              <dt>{h.days}</dt>
              <dd className="num">{h.time}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
