import { useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, gear, trips } from "../content";
import {
  dateRange,
  eur,
  findTrip,
  fullDate,
  nextDeparture,
  query,
  spotsLabel,
} from "../lib/trips";
import {
  Field,
  focusFirst,
  useErrors,
  validate,
  type Errors,
} from "../components/Field";
import { Blaze } from "../components/Marks";

const messages: Errors = {
  trip: "Choose the trip you'd like to book.",
  departure: "Choose a departure date.",
  travellers: "Enter between 1 and 6 travellers.",
  name: "Enter the lead traveller's full name.",
  email:
    "Enter an email like name@example.com so we can send your confirmation.",
  phone: "Enter a phone number with country code, for example +44 7700 900123.",
  experience:
    "Tell us how much you walk, so your guide can plan the group's pace.",
  emergencyName:
    "Enter someone we can call in an emergency who isn't on the trip.",
  emergencyPhone: "Enter your emergency contact's number, with country code.",
  terms: "Please accept the booking conditions to continue.",
};

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function Book() {
  const q = query();
  const first = findTrip(q.get("trip"));
  const [slug, setSlug] = useState(first?.slug ?? "");
  const trip = findTrip(slug);
  const queryDep = first?.departures.find(
    (d) => d.id === q.get("dep") && d.spots > 0,
  );
  const [depId, setDepId] = useState(
    queryDep?.id ?? (first ? (nextDeparture(first)?.id ?? "") : ""),
  );
  const [travellers, setTravellers] = useState(1);
  const [room, setRoom] = useState<"shared" | "private">("shared");
  const [hire, setHire] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [ref, setRef] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const dep = trip?.departures.find((d) => d.id === depId);
  const hireable = trip
    ? gear.filter((g) => g.hire && g.kits.includes(trip.kit))
    : [];
  const hireTotal =
    hireable
      .filter((g) => hire.includes(g.id))
      .reduce((s, g) => s + (g.hire ?? 0), 0) * travellers;
  const supplement =
    trip && room === "private" && trip.single ? trip.single * travellers : 0;
  const base = trip ? trip.price * travellers : 0;
  const total = base + supplement + hireTotal;
  const deposit = Math.round(total * 0.25);
  const balanceDue = dep
    ? new Date(new Date(dep.start + "T12:00:00").getTime() - 56 * 864e5)
    : null;

  const chooseTrip = (s: string) => {
    setSlug(s);
    const t = findTrip(s);
    setDepId(t ? (nextDeparture(t)?.id ?? "") : "");
    setRoom("shared");
    setHire([]);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    if (dep && travellers > dep.spots)
      found.travellers = `Only ${dep.spots} ${dep.spots === 1 ? "place is" : "places are"} left on this date. Reduce travellers or pick another date.`;
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirst(form, found);
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setRef(
        `TRN-${slug.slice(0, 2).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`,
      );
      setStatus("done");
      requestAnimationFrame(() => doneHeading.current?.focus());
    }, 1300);
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Book a trip</h1>
        <p className="lede">
          Pick a departure and tell us who's coming. We hold your places for 48
          hours while the planning desk checks the details, then ask for the 25%
          deposit.
        </p>
      </header>

      <div className="wrap book">
        <div aria-live="polite" className="book-main">
          {status === "done" && trip && dep ? (
            <div className="confirm">
              <h2 ref={doneHeading} tabIndex={-1}>
                Request received: {ref}
              </h2>
              <p className="lede">
                {travellers} {travellers === 1 ? "place" : "places"} on{" "}
                {trip.name}, {dateRange(dep.start, trip.days.length)}, are held
                for 48 hours.
              </p>
              <ol className="steps">
                <li>
                  Within one working day, Lea or Priya emails to confirm the
                  details and answer any questions.
                </li>
                <li>
                  You pay the deposit of {eur(deposit)} by card or bank transfer
                  to secure the places.
                </li>
                <li>
                  Eight weeks before departure we send the full trip notes, kit
                  check and the balance reminder.
                </li>
              </ol>
              <p className="fine">
                This is a demonstration: nothing was sent, held or charged.
              </p>
              <div className="actions">
                <Link to={`/gear?kit=${trip.kit}`} className="btn btn-primary">
                  Start your packing list
                </Link>
                <Link to={`/trips/${trip.slug}`} className="btn btn-ghost">
                  Back to the trip
                </Link>
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="book-form"
              aria-busy={status === "sending"}
            >
              <fieldset>
                <legend>Your trip</legend>
                <Field label="Trip" name="trip" error={errors.trip}>
                  <select
                    required
                    value={slug}
                    onChange={(e) => chooseTrip(e.target.value)}
                  >
                    <option value="">Choose a trip</option>
                    {trips.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name} • {t.region} • {t.days.length} days
                      </option>
                    ))}
                  </select>
                </Field>

                {trip && (
                  <fieldset
                    className="dep-pick"
                    data-invalid={errors.departure ? "" : undefined}
                    aria-describedby={errors.departure ? "dep-err" : undefined}
                  >
                    <legend>Departure</legend>
                    <div>
                      {trip.departures.map((d) => (
                        <label
                          key={d.id}
                          data-full={d.spots === 0 ? "" : undefined}
                        >
                          <input
                            type="radio"
                            name="departure"
                            value={d.id}
                            required
                            disabled={d.spots === 0}
                            checked={depId === d.id}
                            onChange={() => setDepId(d.id)}
                          />
                          <span>
                            <strong>
                              {dateRange(d.start, trip.days.length)}
                            </strong>
                            <small>{spotsLabel(d.spots)}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.departure && (
                      <p className="field-error" id="dep-err">
                        {errors.departure}
                      </p>
                    )}
                  </fieldset>
                )}

                <div className="field-row">
                  <Field
                    label="Travellers"
                    name="travellers"
                    type="number"
                    min={1}
                    max={6}
                    required
                    inputMode="numeric"
                    value={travellers}
                    onChange={(e) =>
                      setTravellers(
                        Math.max(0, Math.round(Number(e.target.value))),
                      )
                    }
                    hint="Up to 6 per booking"
                    error={errors.travellers}
                  />
                  {trip && (
                    <fieldset className="room-pick">
                      <legend>Room</legend>
                      <label>
                        <input
                          type="radio"
                          name="room"
                          checked={room === "shared"}
                          onChange={() => setRoom("shared")}
                        />
                        <span>Shared twin or dorm</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="room"
                          disabled={trip.single === null}
                          checked={room === "private"}
                          onChange={() => setRoom("private")}
                        />
                        <span>
                          {trip.single === null
                            ? "Private room (not available)"
                            : `Private room +${eur(trip.single)}`}
                        </span>
                      </label>
                    </fieldset>
                  )}
                </div>

                {hireable.length > 0 && (
                  <fieldset className="hire-pick">
                    <legend>Hire gear (optional, per traveller)</legend>
                    {hireable.map((g) => (
                      <label key={g.id}>
                        <input
                          type="checkbox"
                          checked={hire.includes(g.id)}
                          onChange={() =>
                            setHire((h) =>
                              h.includes(g.id)
                                ? h.filter((x) => x !== g.id)
                                : [...h, g.id],
                            )
                          }
                        />
                        <span>{g.name}</span>
                        <span className="num">{eur(g.hire ?? 0)}</span>
                      </label>
                    ))}
                  </fieldset>
                )}
              </fieldset>

              <fieldset>
                <legend>Lead traveller</legend>
                <Field
                  label="Full name"
                  name="name"
                  required
                  autoComplete="name"
                  minLength={2}
                  error={errors.name}
                />
                <div className="field-row">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    error={errors.email}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="\+?[\d \-\(\)]{7,20}"
                    error={errors.phone}
                  />
                </div>
                <Field
                  label="How much do you walk?"
                  name="experience"
                  error={errors.experience}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose the closest
                    </option>
                    <option>A long walk most weekends</option>
                    <option>
                      Several multi-day treks in the last three years
                    </option>
                    <option>Regular mountain days with big climbs</option>
                    <option>This would be my first multi-day trek</option>
                  </select>
                </Field>
              </fieldset>

              <fieldset>
                <legend>Emergency contact</legend>
                <div className="field-row">
                  <Field
                    label="Name"
                    name="emergencyName"
                    required
                    autoComplete="off"
                    error={errors.emergencyName}
                  />
                  <Field
                    label="Phone"
                    name="emergencyPhone"
                    type="tel"
                    required
                    autoComplete="off"
                    pattern="\+?[\d \-\(\)]{7,20}"
                    error={errors.emergencyPhone}
                  />
                </div>
                <Field
                  label="Anything we should know?"
                  name="notes"
                  hint="Dietary needs, allergies, medical conditions, train times."
                  className="field-wide"
                >
                  <textarea rows={4} />
                </Field>
              </fieldset>

              <div
                className="field check"
                data-invalid={errors.terms ? "" : undefined}
              >
                <label>
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    aria-invalid={errors.terms ? true : undefined}
                    aria-describedby={errors.terms ? "terms-err" : undefined}
                  />
                  <span>
                    I've read the{" "}
                    <Link to="/faq">
                      booking conditions and cancellation policy
                    </Link>{" "}
                    and have travel insurance that covers mountain rescue.
                  </span>
                </label>
                {errors.terms && (
                  <p className="field-error" id="terms-err">
                    {errors.terms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Sending request…"
                  : "Request these places"}
              </button>
              <p className="fine">
                Demo form: nothing is sent or charged. Questions first?{" "}
                {brand.phone}
              </p>
            </form>
          )}
        </div>

        <aside className="summary" aria-label="Booking summary">
          {trip ? (
            <>
              <img src={trip.image} alt="" width={1600} height={1066} />
              <h2>{trip.name}</h2>
              <p className="muted">
                {trip.region}, {trip.country}
              </p>
              <Blaze grade={trip.grade} />
              <dl className="sum-lines">
                <div>
                  <dt>Dates</dt>
                  <dd>
                    {dep
                      ? dateRange(dep.start, trip.days.length)
                      : "Choose a date"}
                  </dd>
                </div>
                <div>
                  <dt>
                    {travellers} × {eur(trip.price)}
                  </dt>
                  <dd className="num">{eur(base)}</dd>
                </div>
                {supplement > 0 && (
                  <div>
                    <dt>Private room</dt>
                    <dd className="num">{eur(supplement)}</dd>
                  </div>
                )}
                {hireTotal > 0 && (
                  <div>
                    <dt>Gear hire</dt>
                    <dd className="num">{eur(hireTotal)}</dd>
                  </div>
                )}
                <div className="sum-total">
                  <dt>Total</dt>
                  <dd className="num">{eur(total)}</dd>
                </div>
                <div>
                  <dt>Deposit today (25%)</dt>
                  <dd className="num">{eur(deposit)}</dd>
                </div>
                {balanceDue && (
                  <div>
                    <dt>Balance due by</dt>
                    <dd>{fullDate(iso(balanceDue))}</dd>
                  </div>
                )}
              </dl>
              <ul className="ticks sum-includes">
                {trip.included.slice(0, 3).map((x) => (
                  <li key={x}>
                    <Check aria-hidden="true" /> {x}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2>No trip chosen yet</h2>
              <p>
                Pick a trip to see dates, places and the price. Not sure which?
                The <Link to="/route-finder">route finder</Link> takes two
                minutes.
              </p>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
