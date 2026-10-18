import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { events, programmes, sites, type TideEvent } from "../content";
import { TidePlanner } from "../components/TidePlanner";
import { EventList } from "../components/EventList";
import { Field } from "../components/Field";
import { longDate } from "../lib/format";
import { clock, workWindow } from "../lib/tide";
import { signUp, useSignups } from "../lib/signups";

type Errors = Partial<
  Record<"name" | "email" | "phone" | "age" | "safety", string>
>;

export function EventPage({ event: e }: { event: TideEvent }) {
  const site = sites.find((s) => s.id === e.site)!;
  const programme = programmes.find((p) => p.slug === e.programme)!;
  const win = workWindow({ site, highWater: e.highWater });
  const signups = useSignups();
  const mine = signups[e.id];
  const left = e.spots - e.taken - (mine ?? 0);
  const full = e.spots - e.taken <= 0;
  const others = events
    .filter((o) => o.id !== e.id && (o.site === e.site || o.kind === e.kind))
    .slice(0, 3);

  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [places, setPlaces] = useState(1);

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = ev.currentTarget;
    const el = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
    const next: Errors = {};
    const name = el("name").value.trim();
    if (name.length < 2)
      next.name =
        "Enter the name of the person booking, so the crew leader can tick you off.";
    if (!el("email").value)
      next.email = "Enter an email address for your joining instructions.";
    else if (!el("email").checkValidity())
      next.email =
        "That email looks incomplete. Check for an @ and a domain, like name@example.com.";
    if (el("phone").value && !el("phone").checkValidity())
      next.phone =
        "Use digits and spaces, with an optional + at the start: at least 7 characters.";
    if (!el("age").checked)
      next.age = `Confirm everyone is ${e.minAge} or over, with under-16s accompanied.`;
    if (!el("safety").checked)
      next.safety = "Tick to confirm you have read the safety briefing.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      el(first).focus();
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      signUp(e.id, places);
    }, 900);
  };

  const describe = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": `ev-${k}-msg`,
  });
  const clear = (k: keyof Errors) =>
    errors[k] && setErrors({ ...errors, [k]: undefined });

  return (
    <>
      <header className="wrap detail-head">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/volunteer">Volunteer</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/programmes/${programme.slug}`}>{programme.name}</Link>
        </nav>
        <h1>{e.title}</h1>
        <p className="event-meta num">
          <span>{longDate(e.date)}</span>
          <span>
            {clock(win.start)}–{clock(win.end)}
          </span>
          <span>{site.name}</span>
          <span>{e.kind}</span>
        </p>
        <p className="lede">{e.summary}</p>
      </header>

      <div className="wrap event-layout">
        <div className="event-body">
          <TidePlanner event={e} site={site} heading="The tide on the day" />

          <section className="section-tight prose">
            <h2>What we're doing</h2>
            <p>{e.detail}</p>
          </section>

          <section className="section-tight">
            <h2>Practical details</h2>
            <dl className="spec spec-wide">
              <div>
                <dt>Meet</dt>
                <dd>
                  {site.meet}, {clock(win.start - 0.25)} for the briefing
                </dd>
              </div>
              <div>
                <dt>Finish</dt>
                <dd>{clock(win.end)}, back at the meeting point</dd>
              </div>
              <div>
                <dt>Terrain and access</dt>
                <dd>{site.access}</dd>
              </div>
              <div>
                <dt>Minimum age</dt>
                <dd>{e.minAge}; under-16s with an adult</dd>
              </div>
              <div>
                <dt>Crew leader</dt>
                <dd>{e.leader}</dd>
              </div>
              <div>
                <dt>Bring</dt>
                <dd>
                  <ul className="bring">
                    {e.bring.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <aside className="booking" aria-labelledby="book-h">
          <p className="sr-only" aria-live="polite">
            {mine
              ? `Booked: ${mine} ${mine === 1 ? "place" : "places"} on ${e.title}.`
              : ""}
          </p>
          {mine ? (
            <div className="booking-done">
              <Check aria-hidden="true" />
              <h2 id="book-h">
                {full ? "You're on the waitlist" : "You're on the crew list"}
              </h2>
              <p>
                {mine} {mine === 1 ? "place" : "places"} for {longDate(e.date)},
                briefing at {clock(win.start - 0.25)}. Meeting point:{" "}
                {site.meet}. Joining instructions would arrive by email two days
                before; in this demo nothing is sent.
              </p>
              <Link to="/volunteer" className="btn btn-ghost">
                Find another tide
              </Link>
            </div>
          ) : (
            <>
              <h2 id="book-h">
                {full ? "Join the waitlist" : "Book your places"}
              </h2>
              <p
                className="booking-left"
                data-state={full ? "full" : left <= 4 ? "few" : undefined}
              >
                {full
                  ? "This tide is full. We'll email if places come free."
                  : `${left} of ${e.spots} places left`}
              </p>
              <form noValidate onSubmit={submit} aria-busy={sending}>
                <Field id="ev-name" label="Your name" error={errors.name}>
                  <input
                    id="ev-name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    onChange={() => clear("name")}
                    {...describe("name")}
                  />
                </Field>
                <Field id="ev-email" label="Email" error={errors.email}>
                  <input
                    id="ev-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={() => clear("email")}
                    {...describe("email")}
                  />
                </Field>
                <Field
                  id="ev-phone"
                  label="Mobile for the day (optional)"
                  error={errors.phone}
                  hint="Only used if the tide or weather changes plans."
                >
                  <input
                    id="ev-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    pattern="\+?[0-9 ]{7,}"
                    onChange={() => clear("phone")}
                    {...describe("phone")}
                  />
                </Field>
                <Field
                  id="ev-places"
                  label="Places"
                  hint={full ? "For the waitlist" : "Up to 6 per booking"}
                >
                  <select
                    id="ev-places"
                    value={places}
                    onChange={(ev) => setPlaces(Number(ev.target.value))}
                    aria-describedby="ev-places-msg"
                  >
                    {Array.from(
                      { length: Math.max(1, Math.min(6, full ? 6 : left)) },
                      (_, i) => i + 1,
                    ).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </Field>
                <div
                  className="check-field"
                  data-invalid={errors.age ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="age"
                      id="ev-age"
                      onChange={() => clear("age")}
                      {...describe("age")}
                    />
                    <span>
                      Everyone is {e.minAge} or over, and under-16s come with an
                      adult
                    </span>
                  </label>
                  {errors.age && (
                    <p id="ev-age-msg" className="field-error">
                      {errors.age}
                    </p>
                  )}
                </div>
                <div
                  className="check-field"
                  data-invalid={errors.safety ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="safety"
                      id="ev-safety"
                      onChange={() => clear("safety")}
                      {...describe("safety")}
                    />
                    <span>
                      I've read the safety briefing: stay with your crew, three
                      whistle blasts means everyone up the beach
                    </span>
                  </label>
                  {errors.safety && (
                    <p id="ev-safety-msg" className="field-error">
                      {errors.safety}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-sea btn-block"
                  disabled={sending}
                >
                  {sending
                    ? "Booking…"
                    : full
                      ? "Join the waitlist"
                      : `Book ${places} ${places === 1 ? "place" : "places"}`}
                </button>
                <p className="quiet">
                  Demo form: nothing is sent; your booking is kept in this
                  browser only.
                </p>
              </form>
            </>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="wrap section">
          <h2>Other tides you might like</h2>
          <EventList items={others} />
        </section>
      )}
    </>
  );
}
