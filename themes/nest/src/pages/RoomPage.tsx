import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import { days, rooms, team, type Room } from "../content";
import { Peg } from "../components/Peg";
import { TourCta } from "../components/TourCta";
import { clock, money, setDraft } from "../lib/fees";
import { ampm } from "../lib/time";

export function RoomPage({ room }: { room: Room }) {
  const i = rooms.indexOf(room);
  const prev = rooms[i - 1];
  const next = rooms[i + 1];
  const lead = team.find((p) => p.id === room.leadId)!;
  const day = days.find((d) => d.id === room.dayId)!;

  const fees = () => {
    const longest = room.sessions[room.sessions.length - 1].id;
    setDraft({
      roomId: room.id,
      pattern: [longest, longest, longest, null, null],
    });
    navigate("/fees");
  };

  return (
    <article style={{ "--room": room.color } as CSSProperties}>
      <section className="room-hero">
        <div className="wrap room-hero-grid">
          <div>
            <Link to="/rooms" className="back-link">
              <ArrowLeft aria-hidden="true" /> All rooms
            </Link>
            <p className="room-ages">
              <span className="dot" aria-hidden="true" /> {room.ages}
            </p>
            <h1>{room.name}</h1>
            <p className="lede">{room.summary}</p>
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={fees}>
                Work out {room.name} fees <ArrowRight aria-hidden="true" />
              </button>
              <Link to="/tour" className="btn btn-ghost">
                Book a tour
              </Link>
            </div>
          </div>
          <figure className="room-hero-photo">
            <img
              src={room.image.src}
              alt={room.image.alt}
              width={room.image.w}
              height={room.image.h}
            />
          </figure>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <dl className="room-facts">
            <div>
              <dt>Ages</dt>
              <dd>{room.ages}</dd>
            </div>
            <div>
              <dt>Ratio</dt>
              <dd>{room.ratio}</dd>
            </div>
            <div>
              <dt>Places</dt>
              <dd className="num">{room.places}</dd>
            </div>
            {room.sessions.map((s) => (
              <div key={s.id}>
                <dt>
                  {s.label}{" "}
                  <small>
                    {s.spans
                      .map(([a, b]) => `${clock(a)}–${clock(b)}`)
                      .join(" + ")}
                  </small>
                </dt>
                <dd className="num">{money(s.price)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap room-body">
          <div className="prose">
            {room.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2>What we're working on</h2>
            <dl className="principle-list principle-list-sm">
              {room.focus.map((f) => (
                <div key={f.title}>
                  <dt>{f.title}</dt>
                  <dd>{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="room-side">
            <div className="lead-card">
              <Peg
                symbol={lead.symbol}
                color={lead.color}
                name={lead.name}
                size="lg"
              />
              <div>
                <h2>{lead.name}</h2>
                <p className="quiet">
                  {lead.role}, at Nest since {lead.since}
                </p>
                <p>{lead.bio}</p>
                <Link to="/team" className="text-link">
                  Meet the team <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="bring">
              <h2>Bring on day one</h2>
              <ul className="ticks">
                {room.bring.map((b) => (
                  <li key={b}>
                    <Check aria-hidden="true" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-oat">
        <div className="wrap split">
          <div className="split-head">
            <h2>A week in {room.name}</h2>
            <p>
              The rhythm changes with the seasons and the children; this is this
              term's.
            </p>
          </div>
          <table className="week-table">
            <caption className="sr-only">Weekly rhythm in {room.name}</caption>
            <tbody>
              {room.week.map((w) => (
                <tr key={w.day}>
                  <th scope="row">{w.day}</th>
                  <td>{w.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="wrap day-peek">
          <h2>The shape of the day</h2>
          <ol>
            {day.moments.slice(0, 6).map((m) => (
              <li key={m.time}>
                <span className="num">{ampm(m.time)}</span> {m.title}
              </li>
            ))}
          </ol>
          <Link to="/day" className="text-link">
            Every hour of a day in {day.rooms} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <nav className="wrap room-pager" aria-label="More rooms">
        {prev ? (
          <Link
            to={`/rooms/${prev.id}`}
            style={{ "--room": prev.color } as CSSProperties}
          >
            <small>Younger</small>
            <span>
              <ArrowLeft aria-hidden="true" /> {prev.name} ·{" "}
              {prev.ages.split(" · ")[0]}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/rooms/${next.id}`}
            className="next"
            style={{ "--room": next.color } as CSSProperties}
          >
            <small>Moving up to</small>
            <span>
              {next.name} · {next.ages.split(" · ")[0]}{" "}
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        )}
      </nav>
      <TourCta title={`Visit ${room.name} on a normal day.`} />
    </article>
  );
}
