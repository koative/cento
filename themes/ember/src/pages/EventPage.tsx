import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { events, type Event } from "../content";
import { EventRow, priceLabel } from "../components/EventRow";
import { Field, useErrors } from "../components/Field";
import { Photo } from "../components/Photo";
import { pause, reference, validate } from "../lib/forms";
import { clock, longDate, money } from "../lib/time";

export function EventPage({ event }: { event: Event }) {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    seats: number;
    email: string;
  } | null>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const waitlist = event.left === 0;
  const others = events.filter((e) => e.id !== event.id).slice(0, 3);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add the name we should put on the list.",
      email: "Enter an email like you@example.com so we can confirm.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    await pause();
    setBusy(false);
    setDone({
      ref: reference("EVT"),
      seats: Number(data.get("seats")),
      email: String(data.get("email")),
    });
    requestAnimationFrame(() => doneRef.current?.focus());
  };

  return (
    <div className="event-page">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li aria-current="page">{event.title}</li>
          </ol>
        </nav>
      </div>

      <article className="wrap event-grid">
        <div className="event-copy">
          <h1>{event.title}</h1>
          <p className="lede">{event.summary}</p>
          <dl className="event-facts">
            <div>
              <dt>Date</dt>
              <dd>{longDate(event.date)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd className="num">
                {clock(event.start)} – {clock(event.end)}
              </dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{priceLabel(event)}</dd>
            </div>
            <div>
              <dt>Seats</dt>
              <dd>
                {waitlist
                  ? "Sold out — waiting list open"
                  : `${event.left} of ${event.seats} left`}
              </dd>
            </div>
          </dl>
          {event.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>How the evening runs</h2>
          <ol className="running">
            {event.running.map((r) => (
              <li key={r.time}>
                <span className="num">{r.time}</span>
                {r.what}
              </li>
            ))}
          </ol>
        </div>

        <div className="event-side">
          <Photo photo={event.photo} className="arch" eager />
          <div className="hold">
            <h2>{waitlist ? "Join the waiting list" : "Hold your seats"}</h2>
            {done ? (
              <div className="confirm confirm-small">
                <p ref={doneRef} tabIndex={-1} className="confirm-lead">
                  {waitlist
                    ? `You're on the list for ${done.seats} ${done.seats === 1 ? "seat" : "seats"}.`
                    : `${done.seats} ${done.seats === 1 ? "seat" : "seats"} held for 48 hours.`}
                </p>
                <p>
                  Reference <span className="num">{done.ref}</span>.{" "}
                  {waitlist
                    ? `We'll write to ${done.email} if seats open up.`
                    : `Pay at the door${event.price ? `: ${money(event.price * done.seats)}` : ""}.`}
                </p>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => setDone(null)}
                >
                  Change this request
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="hold-form"
              >
                <Field label="Seats" name="seats">
                  <select defaultValue="2">
                    {Array.from(
                      { length: Math.max(1, Math.min(6, event.left || 6)) },
                      (_, i) => i + 1,
                    ).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "seat" : "seats"}
                        {event.price ? ` · ${money(event.price * n)}` : ""}
                      </option>
                    ))}
                  </select>
                </Field>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={busy}
                  aria-busy={busy}
                >
                  {busy
                    ? "Holding…"
                    : waitlist
                      ? "Add me to the list"
                      : "Hold seats"}
                </button>
                <p className="fine">Demo form — nothing is sent or charged.</p>
              </form>
            )}
            <p className="sr-only" aria-live="polite">
              {busy
                ? "Sending your request…"
                : done
                  ? "Request confirmed."
                  : ""}
            </p>
          </div>
        </div>
      </article>

      <section className="wrap related" aria-labelledby="more-events">
        <div className="section-head">
          <h2 id="more-events" className="section-title">
            Also coming up
          </h2>
          <Link to="/events" className="text-link">
            All events <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-list">
          {others.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </ul>
      </section>
    </div>
  );
}
