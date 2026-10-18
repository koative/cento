import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  circuits,
  classes,
  days,
  events,
  home,
  hours,
  images,
  plans,
  prices,
  problems,
  squads,
  walls,
} from "../content";
import { money, openStatus, shortDate, toDate } from "../lib/format";
import { upcomingSessions } from "../lib/schedule";
import { Tag } from "../components/Tag";
import { WallView } from "../components/WallView";

const DAY = 86_400_000;

export function Home() {
  const status = openStatus();
  const rotation = [...walls].sort((a, b) =>
    b.setDate.localeCompare(a.setDate),
  );
  const newest = rotation[0];
  const next = [...walls].sort((a, b) =>
    a.nextReset.localeCompare(b.nextReset),
  )[0];
  const newestProblems = problems.filter((p) => p.wall === newest.id);
  const sessions = upcomingSessions(7).slice(0, 6);
  const nextEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const today = new Date();

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lead">{home.lead}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-tape">
              Book a day pass <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/routes" className="btn btn-line">
              See what's on the walls
            </Link>
          </div>
          <dl className="hero-facts">
            <div>
              <dt>Today</dt>
              <dd data-open={status.open ? "" : undefined}>{status.label}</dd>
            </div>
            <div>
              <dt>Day pass</dt>
              <dd>
                {money(prices.dayAdult)} · shoes {money(prices.shoes)}
              </dd>
            </div>
            <div>
              <dt>Find us</dt>
              <dd>{brand.street}</dd>
            </div>
          </dl>
        </div>
        <figure className="hero-photo">
          <img
            src={images.hero}
            alt="A climber pulling onto grey and green volumes on a bouldering wall"
            width={960}
            height={640}
          />
          <figcaption>
            <Link to="/routes" className="fresh-tag">
              <span>Fresh set</span>
              <strong>{newest.name}</strong>
              <span>
                Reset {shortDate(newest.setDate)} · {newestProblems.length}{" "}
                problems
              </span>
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="rotation wrap" aria-labelledby="rotation-title">
        <div className="section-head">
          <h2 id="rotation-title">The reset rotation</h2>
          <p>
            One wall stripped and reset every Tuesday. Next up:{" "}
            <strong>{next.name}</strong> on {shortDate(next.nextReset)}.
          </p>
        </div>
        <ol className="rotation-list">
          {rotation.map((w) => {
            const age = Math.max(
              0,
              Math.min(
                1,
                (today.getTime() - toDate(w.setDate).getTime()) / (42 * DAY),
              ),
            );
            return (
              <li key={w.id} data-next={w.id === next.id ? "" : undefined}>
                <span className="rot-name">{w.name}</span>
                <span className="rot-angle">{w.angle}</span>
                <span className="rot-bar" aria-hidden="true">
                  <span style={{ width: `${Math.round((1 - age) * 100)}%` }} />
                </span>
                <span className="rot-dates">
                  Set {shortDate(w.setDate)} · next {shortDate(w.nextReset)}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="band-dark" aria-labelledby="circuits-title">
        <div className="wrap read-wall">
          <div>
            <h2 id="circuits-title">The colour tells you the grade.</h2>
            <p className="lead-sm">
              Every wall carries the same six circuits. Start on yellow, move up
              when three in a row feel easy.
            </p>
            <ul className="circuit-key">
              {circuits.map((c) => (
                <li key={c.id}>
                  <Tag circuit={c.id}>{c.label}</Tag>
                  <span className="ck-range">{c.range}</span>
                  <span className="ck-note">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="read-wall-figure">
            <WallView
              wall={newest}
              problems={newestProblems}
              className="on-dark"
            />
            <figcaption>
              {newest.name} as set on {shortDate(newest.setDate)}.{" "}
              <Link to="/routes">
                Open the route map <ArrowRight aria-hidden="true" />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="first-visit wrap" aria-labelledby="first-title">
        <img
          src={images.whiteWall}
          alt="A climber moving between blue holds on a white wall"
          width={960}
          height={640}
          loading="lazy"
        />
        <div>
          <h2 id="first-title">{home.firstVisit.title}</h2>
          <ol className="steps">
            {home.firstVisit.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/classes/first-moves" className="btn btn-line">
            Book First Moves · {money(classes[0].price)}
          </Link>
        </div>
      </section>

      <section className="this-week wrap" aria-labelledby="week-title">
        <div className="section-head">
          <h2 id="week-title">Classes this week</h2>
          <Link to="/classes" className="more">
            Full timetable <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="session-list">
          {sessions.map((s) => (
            <li key={s.item.id + s.date + s.time}>
              <span className="sl-when">
                <strong>{days[toDate(s.date).getDay()].slice(0, 3)}</strong>{" "}
                {s.time}
              </span>
              <Link to={`/classes/${s.item.id}`} className="sl-name">
                {s.item.name}
              </Link>
              <span className="sl-level">{s.item.level}</span>
              <span className="sl-dur">{s.item.duration}</span>
              <span className="num">{money(s.item.price)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="quote-band" aria-label="From a member">
        <img
          src={images.volumes}
          alt=""
          width={771}
          height={1024}
          loading="lazy"
        />
        <blockquote className="wrap">
          <p>“{home.quote.text}”</p>
          <footer>{home.quote.who}</footer>
        </blockquote>
      </section>

      <section className="home-plans wrap" aria-labelledby="plans-title">
        <div className="section-head">
          <h2 id="plans-title">Memberships</h2>
          <p>
            No joining fee. Freeze for up to three months a year. Cancel with a
            month's notice.
          </p>
        </div>
        <ul className="plan-strip">
          {plans.map((p) => (
            <li key={p.id} data-featured={p.featured ? "" : undefined}>
              <h3>{p.name}</h3>
              <p className="plan-price">
                <span className="num">{money(p.monthly)}</span>/month
              </p>
              <p>{p.who}</p>
            </li>
          ))}
        </ul>
        <Link to="/memberships" className="more">
          Compare memberships and day passes <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="home-youth" aria-labelledby="youth-title">
        <div className="wrap home-youth-grid">
          <img
            src={images.youth}
            alt="A child in a harness reaching for holds on a blue climbing wall"
            width={998}
            height={1500}
            loading="lazy"
          />
          <div>
            <h2 id="youth-title">The youth team</h2>
            <p className="lead-sm">
              Ninety young climbers across three squads, from Saturday-morning
              Mini Crushers to a competition team with a national finalist.
            </p>
            <ul className="squad-list">
              {squads.map((s) => (
                <li key={s.id}>
                  <strong>{s.name}</strong>
                  <span>Ages {s.ages}</span>
                  <span>{s.when}</span>
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link to="/youth" className="btn btn-ink">
                Meet the youth team
              </Link>
              <Link to="/classes/youth-taster" className="btn btn-line">
                Book a Youth Taster
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-events wrap" aria-labelledby="events-title">
        <div className="section-head">
          <h2 id="events-title">Coming up</h2>
          <Link to="/events" className="more">
            All events <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-list">
          {nextEvents.map((e) => (
            <li key={e.id}>
              <Link to={`/events/${e.id}`} className="event-row">
                <span className="ev-date">
                  <strong>{toDate(e.date).getDate()}</strong>
                  {toDate(e.date).toLocaleString("en-US", { month: "short" })}
                </span>
                <span className="ev-body">
                  <span className="ev-kind">{e.kind}</span>
                  <span className="ev-title">{e.title}</span>
                  <span className="ev-summary">{e.summary}</span>
                </span>
                <span className="ev-price num">{money(e.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-visit wrap" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">Find us on Foundry Street</h2>
          <p>
            {brand.street}, {brand.city}. Tram line 4 to Foundry Street, free
            parking behind the building, covered bike racks by the door.
          </p>
          <Link to="/visit" className="more">
            Getting here and your first visit <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <table className="hours-table">
          <caption className="sr-only">Opening hours</caption>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <tr key={d} data-today={d === today.getDay() ? "" : undefined}>
                <th scope="row">{days[d]}</th>
                <td className="num">
                  {hours[d][0]}–{hours[d][1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="close-band">
        <div className="wrap close-grid">
          <h2>{home.close.title}</h2>
          <p>{home.close.text}</p>
          <Link to="/book" className="btn btn-ink">
            Book a day pass <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
