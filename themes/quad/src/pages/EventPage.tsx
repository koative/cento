import { useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { Link } from "../router";
import { events, type UniEvent } from "../content";
import { dateParts, longDate } from "../lib/format";
import { pause, useErrors, validate } from "../lib/forms";
import { Field } from "../components/Field";
import { EventRow } from "../components/EventRow";
import { Photo } from "../components/Photo";

export function EventPage({ e }: { e: UniEvent }) {
  const d = dateParts(e.date);
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [booked, setBooked] = useState<{ name: string; seats: number } | null>(
    null,
  );
  const left = e.capacity - e.booked - (booked?.seats ?? 0);
  const more = events
    .filter((o) => o.id !== e.id && o.type === e.type)
    .concat(events.filter((o) => o.id !== e.id && o.type !== e.type))
    .slice(0, 3);

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const found = validate(form, {
      name: "Enter your name so we can print your badge.",
      email:
        "Enter an email address like name@example.com for your confirmation.",
      seats: "Choose how many places you need (1 to 4).",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    await pause();
    setBusy(false);
    setBooked({
      name: String(data.get("name")),
      seats: Number(data.get("seats")),
    });
  };

  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/events">Events</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{e.title}</span>
        </nav>
      </div>

      <header className="wrap event-head">
        <time className="ev-date ev-date-lg" dateTime={e.date}>
          <span className="ev-day">{d.day}</span>
          <span className="ev-month">
            {d.month} {d.year}
          </span>
        </time>
        <div>
          <h1>{e.title}</h1>
          <p className="ev-type">
            {e.type} · {e.price ? "Ticketed" : "Free"} · open to the public
          </p>
          <p className="lead">{e.summary}</p>
        </div>
      </header>

      <div className="wrap event-grid">
        <div className="event-body">
          <Photo img={e.image} eager />
          {e.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {e.schedule && (
            <>
              <h2>On the day</h2>
              <table className="data-table schedule">
                <tbody>
                  {e.schedule.map((s) => (
                    <tr key={s.time}>
                      <th scope="row" className="num">
                        {s.time}
                      </th>
                      <td>{s.item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <aside className="event-side" aria-labelledby="reg-h">
          <dl className="event-facts">
            <div>
              <dt>When</dt>
              <dd>
                {longDate(e.date)}, {e.time}
              </dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{e.venue}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{e.price ? `£${e.price} · students free` : "Free"}</dd>
            </div>
            <div>
              <dt>Places left</dt>
              <dd className="num">{left.toLocaleString("en-GB")}</dd>
            </div>
          </dl>

          <h2 id="reg-h">Reserve a place</h2>
          <div aria-live="polite">
            {booked && (
              <div className="success success-sm">
                <CircleCheck aria-hidden="true" />
                <p>
                  <strong>You're booked, {booked.name}.</strong>{" "}
                  {booked.seats === 1
                    ? "One place is"
                    : `${booked.seats} places are`}{" "}
                  held for {longDate(e.date)}. Bring this page or your
                  confirmation email to the door.
                </p>
              </div>
            )}
          </div>
          {!booked && (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="reg-form"
            >
              <Field
                label="Full name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Field label="Places" name="seats" error={errors.seats}>
                <select required defaultValue="1">
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busy}
                aria-busy={busy}
              >
                {busy
                  ? "Reserving…"
                  : e.price
                    ? `Reserve · £${e.price} each on the door`
                    : "Reserve free places"}
              </button>
              <p className="small">
                Demo booking: nothing is sent and no payment is taken.
              </p>
            </form>
          )}
        </aside>
      </div>

      <section className="section wrap" aria-labelledby="more-h">
        <h2 id="more-h">More on campus</h2>
        <ul className="ev-list">
          {more.map((o) => (
            <EventRow key={o.id} e={o} />
          ))}
        </ul>
      </section>
    </>
  );
}
