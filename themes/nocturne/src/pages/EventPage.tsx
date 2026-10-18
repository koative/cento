import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import { events, type BarEvent } from "../content";
import { dateParts, longDate, money } from "../lib/format";
import { pause, reference, validate } from "../lib/forms";
import { EventRow } from "../components/Cards";
import { Field, useErrors } from "../components/Field";

export function EventPage({ event }: { event: BarEvent }) {
  const left = event.capacity - event.taken;
  const soldOut = left === 0;
  const d = dateParts(event.date);
  const others = events.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/events" className="text-link">
          <ArrowLeft aria-hidden="true" /> All events
        </Link>
      </div>

      <article className="wrap event-page">
        <header className="event-hero">
          <div className="event-hero-text">
            <h1>{event.title}</h1>
            <p className="lede">{event.summary}</p>
            <dl className="event-facts">
              <div>
                <dt>When</dt>
                <dd>
                  {longDate(event.date)}, {event.start}–{event.end}
                </dd>
              </div>
              <div>
                <dt>Doors</dt>
                <dd>{event.doors}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{event.kind}</dd>
              </div>
              <div>
                <dt>With</dt>
                <dd>{event.host}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>
                  {money(event.price)}
                  {event.price > 0 ? " per person" : ""}. {event.includes}
                </dd>
              </div>
            </dl>
          </div>
          <figure className="event-hero-media">
            <img
              src={event.image.src}
              alt={event.image.alt}
              width={event.image.w}
              height={event.image.h}
            />
            <figcaption className="event-stamp" aria-hidden="true">
              <span>{d.weekday}</span>
              <strong>{d.day}</strong>
              <span>{d.month}</span>
            </figcaption>
          </figure>
        </header>

        <div className="event-body">
          <div className="prose">
            {event.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <h2>Running order</h2>
            <ol className="programme">
              {event.programme.map((p) => (
                <li key={p.time + p.item}>
                  <time>{p.time}</time>
                  <span>{p.item}</span>
                </li>
              ))}
            </ol>
          </div>
          <Rsvp event={event} left={left} soldOut={soldOut} />
        </div>
      </article>

      <section className="section section-rule">
        <div className="wrap">
          <h2 className="h-sub">Also coming up</h2>
          <ul className="event-list">
            {others.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Rsvp({
  event,
  left,
  soldOut,
}: {
  event: BarEvent;
  left: number;
  soldOut: boolean;
}) {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    name: string;
    places: number;
  } | null>(null);
  const max = Math.min(soldOut ? 4 : left, 6);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add the name the places should be under.",
      email:
        "Enter an email like you@example.com so we can send your confirmation.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    await pause();
    setBusy(false);
    setDone({
      ref: reference(),
      name: String(data.get("name")).split(" ")[0],
      places: Number(data.get("places")),
    });
  };

  return (
    <aside className="rsvp" aria-labelledby="rsvp-title">
      <h2 id="rsvp-title">
        {soldOut
          ? "Join the waiting list"
          : event.price
            ? "Reserve places"
            : "Save a seat"}
      </h2>
      <p className="muted">
        {soldOut
          ? "Every seat is taken. Leave your name and we'll write the moment one comes free."
          : `${left} of ${event.capacity} places left. ${event.price ? "Pay at the bar on the night." : "Free, but seats are limited."}`}
      </p>
      <div aria-live="polite">
        {done ? (
          <div className="success">
            <Check aria-hidden="true" />
            <p>
              <strong>
                {soldOut ? "You're on the list" : "You're in"}, {done.name}.
              </strong>{" "}
              {soldOut
                ? `We'll email you if ${done.places === 1 ? "a place" : `${done.places} places`} come free for ${longDate(event.date)}.`
                : `${done.places} ${done.places === 1 ? "place" : "places"} held for ${longDate(event.date)}, doors at ${event.doors}.`}{" "}
              Reference {done.ref}.
            </p>
            <button
              type="button"
              className="link-button"
              onClick={() => setDone(null)}
            >
              Make another reservation
            </button>
          </div>
        ) : null}
      </div>
      {!done && (
        <form
          noValidate
          onSubmit={submit}
          onChange={onChange}
          className="form-stack"
          aria-busy={busy}
        >
          <Field label="Places" name="places">
            <select defaultValue="2">
              {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "place" : "places"}
                  {event.price ? `, ${money(event.price * n)}` : ""}
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
            className="btn btn-brass btn-block"
            disabled={busy}
          >
            {busy
              ? "Holding your places…"
              : soldOut
                ? "Add me to the list"
                : "Reserve"}
          </button>
          <p className="form-note">Demo only: nothing is sent or charged.</p>
        </form>
      )}
    </aside>
  );
}
