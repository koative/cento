import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, pages, workshops } from "../content";
import { money, shortDate } from "../lib/format";

const sessions = workshops
  .flatMap((w) => w.sessions.map((s) => ({ ...s, workshop: w })))
  .sort((a, b) => a.date.localeCompare(b.date));

export function Workshops() {
  return (
    <div className="page workshops-page">
      <header className="page-head">
        <h1>{pages.workshops.title}</h1>
        <p className="lead">{pages.workshops.lead}</p>
      </header>

      <ul className="workshop-list">
        {workshops.map((w) => (
          <li key={w.id} className="workshop-row">
            <img
              src={w.image.src}
              alt={w.image.alt}
              width={w.image.w}
              height={w.image.h}
              loading="lazy"
            />
            <div>
              <h2>
                <Link to={`/workshops/${w.id}`}>{w.name}</Link>
              </h2>
              <p className="workshop-meta">
                Ages {w.ages} · {w.length} · {w.seats} seats ·{" "}
                <span className="num">{money(w.price)}</span>
              </p>
              <p>{w.summary}</p>
              <p className="workshop-takehome">
                <b>Take home:</b> {w.takeHome}
              </p>
              <p className="workshop-dates">
                {w.sessions.map((s) => (
                  <span
                    key={s.id}
                    className={s.left <= 3 ? "seats-low" : undefined}
                  >
                    {shortDate(s.date)}
                  </span>
                ))}
              </p>
              <Link to={`/workshops/${w.id}`} className="btn btn-small">
                Book a seat <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <section className="session-table" aria-labelledby="h-calendar">
        <h2 id="h-calendar">Every upcoming session</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Workshop</th>
                <th scope="col">Ages</th>
                <th scope="col">Seats left</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{shortDate(s.date)}</td>
                  <td className="num">{s.time}</td>
                  <td>
                    <Link to={`/workshops/${s.workshop.id}`}>
                      {s.workshop.name}
                    </Link>
                  </td>
                  <td className="num">{s.workshop.ages}</td>
                  <td className={"num" + (s.left <= 3 ? " seats-low" : "")}>
                    {s.left}
                  </td>
                  <td className="num">{money(s.workshop.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bench-parties" aria-labelledby="h-parties">
        <h2 id="h-parties">Birthday bench parties</h2>
        <p>
          Book the back room on a Sunday afternoon for up to twelve kids. Pick
          any workshop, we provide the materials, the hot chocolate and the
          clean-up; you bring the cake. From $280.
        </p>
        <a
          className="btn btn-ghost"
          href={`mailto:${brand.email}?subject=Bench%20party`}
        >
          Ask about a date
        </a>
      </section>
    </div>
  );
}
