import { useState, type FormEvent } from "react";
import { Accessibility, CalendarDays, MapPin, Ticket } from "lucide-react";
import { Link } from "../router";
import { campaigns, events, type LanternEvent } from "../content";
import { formatDate } from "../lib/format";
import { rsvps } from "../lib/giving";
import {
  clearError,
  Field,
  SelectField,
  validate,
  type Errors,
} from "../components/Field";
import { CampaignCard } from "../components/CampaignCard";
import { EventList, placesLeft } from "../components/EventList";

export function Event({ event }: { event: LanternEvent }) {
  const held = rsvps.use();
  const left = placesLeft(event, held);
  const mine = held[event.id] ?? 0;
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    name: string;
    places: number;
    waitlist: boolean;
  } | null>(null);
  const campaign = campaigns.find((c) => c.slug === event.campaign);
  const others = events.filter((e) => e.id !== event.id).slice(0, 3);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "rsvp-name": {
        missing: "Add your name so we can tick you off at the door.",
      },
      "rsvp-email": {
        missing: "Add an email; directions and any changes go there.",
        invalid:
          "That email is missing something. Check the @ and the part after it.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    const places = Number(data.get("rsvp-places"));
    const waitlist = left === 0;
    setBusy(true);
    window.setTimeout(() => {
      if (!waitlist)
        rsvps.set({
          ...rsvps.get(),
          [event.id]: mine + Math.min(places, left),
        });
      setDone({
        name: String(data.get("rsvp-name")).trim().split(" ")[0],
        places,
        waitlist,
      });
      setBusy(false);
    }, 700);
  }

  return (
    <>
      <header className="event-head wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/events">Events</Link> /{" "}
          <span aria-current="page">{event.title}</span>
        </nav>
        <h1>{event.title}</h1>
        <p className="lead">{event.summary}</p>
        <ul className="event-facts">
          <li>
            <CalendarDays size={20} aria-hidden="true" />
            <span>
              {formatDate(event.date, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              <br />
              {event.time}
            </span>
          </li>
          <li>
            <MapPin size={20} aria-hidden="true" />
            <span>
              {event.place}
              <br />
              {event.address}
            </span>
          </li>
          <li>
            <Ticket size={20} aria-hidden="true" />
            <span>
              {event.cost}
              <br />
              {left
                ? `${left.toLocaleString("en-US")} of ${event.capacity.toLocaleString("en-US")} places left`
                : "Full, waiting list open"}
            </span>
          </li>
        </ul>
      </header>

      <div className="wrap event-grid">
        <div className="event-body">
          <section className="prose">
            <h2>What happens</h2>
            {event.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
          <section>
            <h2>On the day</h2>
            <ol className="schedule">
              {event.schedule.map((s) => (
                <li key={s.time}>
                  <time>{s.time}</time> {s.what}
                </li>
              ))}
            </ol>
          </section>
          <section className="two-lists">
            <div>
              <h2>Bring</h2>
              <ul className="ticks">
                {event.bring.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Access</h2>
              <p className="access">
                <Accessibility size={20} aria-hidden="true" /> {event.access}
              </p>
            </div>
          </section>
        </div>

        <aside className="rsvp" aria-labelledby="rsvp-heading">
          <h2 id="rsvp-heading">
            {left ? "Save a place" : "Join the waiting list"}
          </h2>
          <div aria-live="polite">
            {done ? (
              <div className="note-success">
                <p>
                  <strong>
                    {done.waitlist
                      ? `You're on the waiting list, ${done.name}.`
                      : `See you there, ${done.name}. ${done.places === 1 ? "One place is" : `${done.places} places are`} held.`}
                  </strong>
                </p>
                <p>
                  Directions and a reminder go out two days before. Nothing was
                  actually sent: this is a demo.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setDone(null)}
                >
                  Book for someone else
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onInput={clearError(setErrors)}
                aria-busy={busy}
              >
                {mine > 0 && (
                  <p className="quiet">
                    You already hold{" "}
                    {mine === 1 ? "one place" : `${mine} places`} for this
                    event.
                  </p>
                )}
                <Field
                  label="Your name"
                  name="rsvp-name"
                  autoComplete="name"
                  required
                  error={errors["rsvp-name"]}
                />
                <Field
                  label="Email"
                  name="rsvp-email"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors["rsvp-email"]}
                />
                <SelectField label="Places" name="rsvp-places" defaultValue="1">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} disabled={left > 0 && n > left}>
                      {n}
                    </option>
                  ))}
                </SelectField>
                <button type="submit" className="btn btn-flame" disabled={busy}>
                  {busy
                    ? "Holding your place…"
                    : left
                      ? "Save my place"
                      : "Add me to the list"}
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>

      {campaign && (
        <section className="section wrap">
          <h2>This event raises money for</h2>
          <div className="card-grid card-grid-single">
            <CampaignCard campaign={campaign} />
          </div>
        </section>
      )}

      <section className="section wrap">
        <h2>Other events</h2>
        <EventList items={others} />
      </section>
    </>
  );
}
