import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { bookBySlug, events, fromPrice, type ShopEvent } from "../content";
import { Link } from "../router";
import { dateLong, money } from "../lib/format";
import { BookCover } from "../components/BookCover";
import { Field, validate, type Errors } from "../components/Field";
import { EventRow } from "./Events";

const messages = {
  name: { missing: "Enter the name we should put on the list at the door." },
  email: {
    missing: "Enter your email so we can send a reminder the day before.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
};

export function EventPage({ event }: { event: ShopEvent }) {
  const book = event.book ? bookBySlug(event.book) : undefined;
  const left = event.seats - event.taken;
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [held, setHeld] = useState<{
    name: string;
    seats: number;
    ref: string;
  } | null>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const others = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  useEffect(() => {
    if (held) done.current?.focus();
  }, [held]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, messages);
    setErrors(next);
    if (Object.keys(next).length) return;
    const data = new FormData(form);
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setHeld({
        name: String(data.get("name")),
        seats: Number(data.get("seats")),
        ref:
          "IX-" +
          event.date.slice(5).replace("-", "") +
          "-" +
          Math.floor(100 + Math.random() * 900),
      });
    }, 700);
  }

  return (
    <div className="page event-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/events">Events</Link> <span aria-hidden="true">/</span>{" "}
        <span>{event.type}</span>
      </nav>

      <div className="event-layout">
        <article className="event-article">
          <h1>{event.title}</h1>
          <dl className="event-facts">
            <div>
              <dt>When</dt>
              <dd>
                {dateLong(event.date)}, {event.start}–{event.end}
              </dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{event.room}, 14 Quarry Lane</dd>
            </div>
            <div>
              <dt>Hosted by</dt>
              <dd>{event.host}</dd>
            </div>
            <div>
              <dt>Tickets</dt>
              <dd>
                {event.price
                  ? `${money(event.price)}, paid at the door`
                  : "Free, reservation recommended"}
              </dd>
            </div>
          </dl>
          <p className="lede">{event.summary}</p>
          {event.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}

          {book && (
            <Link to={`/books/${book.slug}`} className="event-book">
              <BookCover book={book} />
              <span>
                <strong>{book.title}</strong>
                {book.author} · from {money(fromPrice(book))}
                <span className="text-link">
                  See the book <ArrowRight size={16} aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}
        </article>

        <aside className="reserve" aria-labelledby="reserve-title">
          {held ? (
            <div className="reserve-done" aria-live="polite">
              <Check size={28} aria-hidden="true" />
              <h2 id="reserve-title" tabIndex={-1} ref={done}>
                {held.seats === 1
                  ? "Your chair is"
                  : `${held.seats} chairs are`}{" "}
                held
              </h2>
              <p>
                {held.name}, you're on the list at the door for{" "}
                {dateLong(event.date)} at {event.start}. Your reference is{" "}
                <strong>{held.ref}</strong>.
              </p>
              <button
                type="button"
                className="text-btn"
                onClick={() => setHeld(null)}
              >
                Reserve for someone else
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 id="reserve-title">Reserve a chair</h2>
              <p className="seats-left">
                <strong>{left}</strong> of {event.seats} chairs left
              </p>
              <Field
                label="Your name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <div className="field">
                <label htmlFor="f-seats">Chairs</label>
                <select id="f-seats" name="seats" defaultValue="1">
                  {Array.from({ length: Math.min(4, left) }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-wide" type="submit" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                    Holding your chair…
                  </>
                ) : (
                  "Hold my chair"
                )}
              </button>
              <p className="quiet">
                This is a demo: nothing is sent and no seats are really held.
              </p>
            </form>
          )}
        </aside>
      </div>

      <section className="band">
        <div className="band-head">
          <h2>Also coming up</h2>
          <Link to="/events" className="text-link">
            All events <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="event-list">
          {others.map((e) => (
            <EventRow key={e.slug} event={e} />
          ))}
        </ol>
      </section>
    </div>
  );
}
