import { ArrowRight, Plus } from "lucide-react";
import { Link } from "../router";
import { workshops, workshopsPage } from "../content";
import { money } from "../lib/cart";

const calendar = workshops
  .flatMap((w) => w.sessions.map((s) => ({ w, s })))
  .sort((a, b) => a.s.date.localeCompare(b.s.date));

export function Workshops() {
  return (
    <div className="page workshops">
      <header className="page-head">
        <h1>{workshopsPage.title}</h1>
        <p className="lead">{workshopsPage.intro}</p>
      </header>

      <ul className="workshop-list">
        {workshops.map((w, i) => {
          const next = w.sessions.find((s) => s.left > 0);
          return (
            <li key={w.id} className="workshop-row">
              <img
                src={w.photo.src}
                alt={w.photo.alt}
                width={w.photo.w}
                height={w.photo.h}
                loading={i > 1 ? "lazy" : undefined}
              />
              <div>
                <h2>
                  <Link to={`/workshops/${w.id}`}>{w.name}</Link>
                </h2>
                <p>{w.short}</p>
                <dl className="facts">
                  <div>
                    <dt>Length</dt>
                    <dd>{w.length}</dd>
                  </div>
                  <div>
                    <dt>Level</dt>
                    <dd>{w.level}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>
                      {money(w.price)} {w.unit}
                    </dd>
                  </div>
                  <div>
                    <dt>Next</dt>
                    <dd>
                      {next
                        ? `${next.label}, ${next.left} left`
                        : "Fully booked"}
                    </dd>
                  </div>
                </dl>
                <Link to={`/workshops/${w.id}`} className="text-link">
                  Dates and booking <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="section" aria-labelledby="cal-title">
        <h2 id="cal-title">Every date this season</h2>
        <div className="session-table-wrap">
          <table className="session-table session-table-full">
            <caption className="visually-hidden">
              All workshop sessions with places left
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Workshop</th>
                <th scope="col">Teacher</th>
                <th scope="col">Places</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map(({ w, s }) => (
                <tr key={s.id} data-full={s.left === 0 || undefined}>
                  <td>
                    {s.label}
                    <span>{s.time}</span>
                  </td>
                  <td>
                    <Link to={`/workshops/${w.id}`}>{w.name}</Link>
                  </td>
                  <td>{w.teacher}</td>
                  <td data-low={(s.left > 0 && s.left <= 3) || undefined}>
                    {s.left ? `${s.left} of ${w.size}` : "Full"}
                  </td>
                  <td>{money(w.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Before you come</h2>
        <div>
          {workshopsPage.faq.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
