import { useState, type FormEvent } from "react";
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { Link } from "../router";
import { events, locations, type CommonsEvent } from "../content";
import { clock, longDate, money, pause, validate } from "../lib";
import { Field, useErrors } from "../components/Field";
import { EventRow } from "../components/EventRow";

export function EventPage({ event: ev }: { event: CommonsEvent }) {
  const place = locations.find((l) => l.id === ev.locationId)!;
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ name: string; seats: number } | null>(
    null,
  );
  const left = ev.capacity - ev.taken - (done?.seats ?? 0);
  const related = events
    .filter(
      (e) =>
        e.id !== ev.id &&
        (e.kind === ev.kind || e.locationId === ev.locationId),
    )
    .slice(0, 3);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const seats = Number(data.get("seats"));
    const found = validate(
      form,
      {
        name: "Add your name so it's on the list at the door.",
        email: "Enter an email like you@example.com for the reminder.",
      },
      seats > left
        ? { seats: `Only ${left} places are left. Choose ${left} or fewer.` }
        : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    await pause(700);
    setSending(false);
    setDone({ name: String(data.get("name")).split(" ")[0], seats });
  };

  return (
    <>
      <header className="page-head wrap event-head">
        <p className="crumbs">
          <Link to="/events">Events</Link> / {ev.kind}
        </p>
        <h1>{ev.title}</h1>
        <p className="lede">{ev.summary}</p>
      </header>

      <section className="wrap event-layout">
        <div className="event-body">
          <img
            className="event-image"
            src={ev.image.src}
            alt={ev.image.alt}
            width={ev.image.w}
            height={ev.image.h}
          />
          <div className="prose">
            {ev.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h2>Running order</h2>
          <ol className="schedule">
            {ev.schedule.map(([t, what]) => (
              <li key={t}>
                <time>{t}</time>
                <span>{what}</span>
              </li>
            ))}
          </ol>
          <p className="host">
            Hosted by <strong>{ev.host.name}</strong>, {ev.host.role}.
          </p>
        </div>

        <aside className="event-aside">
          <div className="sign ticket">
            <h2 className="sr-only">Details</h2>
            <ul className="ticket-facts">
              <li>
                <CalendarDays aria-hidden="true" />
                {longDate(ev.date)}
              </li>
              <li>
                <Clock aria-hidden="true" />
                {clock(ev.start)} – {clock(ev.end)}
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <Link to={`/locations/${place.id}`}>{place.name}</Link>,{" "}
                {place.address}
              </li>
              <li>
                <Ticket aria-hidden="true" />
                {ev.price
                  ? `Members free · guests ${money(ev.price)}`
                  : "Free for everyone"}
              </li>
            </ul>
            <p className="ticket-left" aria-live="polite">
              <strong>{left}</strong> of {ev.capacity} places left
            </p>
          </div>

          <div className="rsvp" aria-live="polite">
            {done ? (
              <div className="confirm-card">
                <h2>You're on the list, {done.name}</h2>
                <p>
                  {done.seats === 1 ? "One place" : `${done.seats} places`} held
                  for {longDate(ev.date)}. A reminder goes out the day before
                  {ev.price
                    ? `; guests pay ${money(ev.price)} at the door`
                    : ""}
                  .
                </p>
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={() => setDone(null)}
                >
                  Change my RSVP
                </button>
              </div>
            ) : (
              <form
                className="form"
                noValidate
                onSubmit={submit}
                onChange={onChange}
              >
                <h2>Save me a place</h2>
                <Field
                  label="Name"
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
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <Field
                  label="Places"
                  name="seats"
                  error={errors.seats}
                  hint="Up to four, guests included"
                >
                  <select defaultValue="1">
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
                <button
                  type="submit"
                  className="btn btn-accent btn-block"
                  disabled={sending || left <= 0}
                >
                  {left <= 0
                    ? "Fully booked"
                    : sending
                      ? "Saving your place…"
                      : "RSVP"}
                </button>
                <p className="quiet-note">
                  Demo only: nothing is sent anywhere.
                </p>
              </form>
            )}
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="wrap section" aria-labelledby="related-title">
          <h2 id="related-title">You might also like</h2>
          <ul className="event-list">
            {related.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
