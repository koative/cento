import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import { brand, workshops, type Workshop } from "../content";
import { money } from "../lib/cart";
import { Field, validate, type Errors } from "../components/Field";
import { Qty } from "../components/Qty";

type Booked = {
  ref: string;
  session: string;
  places: number;
  name: string;
  email: string;
};

export function WorkshopPage({ workshop: w }: { workshop: Workshop }) {
  const open = w.sessions.filter((s) => s.left > 0);
  const [sessionId, setSessionId] = useState("");
  const [places, setPlaces] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState<Booked | null>(null);

  const session = w.sessions.find((s) => s.id === sessionId);
  const others = workshops.filter((x) => x.id !== w.id).slice(0, 3);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, {
      session: {
        missing: "Choose a date: tap one of the open sessions above.",
      },
      name: {
        missing: "Tell us your name so we can put it on the class list.",
      },
      email: {
        missing: "Enter an email so we can send your confirmation.",
        invalid:
          "Check the email: it needs an @ and a domain, like ana@example.com.",
      },
      phone: {
        missing: "",
        invalid:
          "Use digits only, with an optional + and spaces, like +1 555 0100 200.",
      },
      experience: {
        missing: "Pick your experience so we can set up the right wheel.",
      },
      terms: { missing: "Tick the box to accept the cancellation policy." },
    });
    setErrors(next);
    if (Object.keys(next).length || !session) return;
    const data = new FormData(form);
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setBooked({
        ref: "KW-" + String(Math.floor(1000 + Math.random() * 9000)),
        session: `${session.label}, ${session.time}`,
        places,
        name: String(data.get("name")),
        email: String(data.get("email")),
      });
    }, 900);
  }

  const maxPlaces = Math.min(session?.left ?? 4, 4);

  return (
    <div className="page workshop">
      <Link to="/workshops" className="text-link back">
        <ArrowLeft size={16} aria-hidden="true" /> All workshops
      </Link>
      <div className="workshop-hero">
        <div>
          <h1>{w.name}</h1>
          <p className="lead">{w.short}</p>
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
              <dt>Group</dt>
              <dd>Up to {w.size}</dd>
            </div>
            <div>
              <dt>Teacher</dt>
              <dd>{w.teacher}</dd>
            </div>
          </dl>
        </div>
        <img
          src={w.photo.src}
          alt={w.photo.alt}
          width={w.photo.w}
          height={w.photo.h}
        />
      </div>

      <div className="workshop-body">
        <div className="workshop-detail">
          <p className="intro">{w.intro}</p>
          <h2>What you will make</h2>
          <ul className="ticks">
            {w.make.map((m) => (
              <li key={m}>
                <Check size={16} aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
          <h2>Included</h2>
          <ul className="ticks">
            {w.includes.map((m) => (
              <li key={m}>
                <Check size={16} aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
          <p className="muted">
            Questions about access, gift bookings or groups larger than four?
            Write to <a href={`mailto:${brand.email}`}>{brand.email}</a> or call{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>.
          </p>
        </div>

        <section className="booking" aria-labelledby="book-title">
          <h2 id="book-title">Book a place</h2>
          <p className="booking-price">
            {money(w.price)} <span>{w.unit}</span>
          </p>
          {booked ? (
            <div className="success" role="status">
              <Check size={28} aria-hidden="true" />
              <h3>You are booked in, {booked.name.split(" ")[0]}</h3>
              <p>
                {w.name}, {booked.session}. {booked.places}{" "}
                {booked.places === 1 ? "place" : "places"}, reference{" "}
                <strong>{booked.ref}</strong>. A confirmation is on its way to{" "}
                {booked.email}.
              </p>
              <p className="muted">
                Arrive ten minutes early and wear clothes you do not mind
                getting muddy.
              </p>
              <Link to="/workshops" className="btn btn-ghost">
                See other workshops
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <fieldset
                className="option"
                aria-describedby={
                  errors.session ? "f-session-error" : undefined
                }
              >
                <legend>Date</legend>
                <div className="session-picker">
                  {w.sessions.map((s) => (
                    <label key={s.id} data-full={s.left === 0 || undefined}>
                      <input
                        type="radio"
                        name="session"
                        value={s.id}
                        required
                        disabled={s.left === 0}
                        checked={sessionId === s.id}
                        onChange={() => {
                          setSessionId(s.id);
                          setPlaces((n) => Math.min(n, s.left, 4));
                        }}
                      />
                      <span>
                        <strong>{s.label}</strong>
                        {s.time}
                        <em>
                          {s.left
                            ? `${s.left} ${s.left === 1 ? "place" : "places"} left`
                            : "Fully booked"}
                        </em>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.session && (
                  <p className="field-error" id="f-session-error">
                    {errors.session}
                  </p>
                )}
                {open.length === 0 && (
                  <p className="muted">
                    Every date is full. Write to us to join the waiting list.
                  </p>
                )}
              </fieldset>

              <div className="option places">
                <span aria-hidden="true">
                  {w.unit === "per pair" ? "Pairs" : "Places"}
                </span>
                <Qty
                  value={places}
                  onChange={setPlaces}
                  label={w.unit === "per pair" ? "Pairs" : "Places"}
                  max={maxPlaces}
                />
                <span className="places-total">{money(w.price * places)}</span>
              </div>

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
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[+]?[0-9 ]{7,}"
                hint="Only used if a class has to move."
                error={errors.phone}
              />
              <Field
                label="Clay experience"
                name="experience"
                error={errors.experience}
              >
                <select
                  id="f-experience"
                  name="experience"
                  required
                  defaultValue=""
                  aria-invalid={errors.experience ? true : undefined}
                  aria-describedby={
                    errors.experience ? "f-experience-error" : undefined
                  }
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Never touched clay</option>
                  <option>A class or two</option>
                  <option>I throw regularly</option>
                </select>
              </Field>
              <div className="field">
                <label htmlFor="f-needs">
                  Access needs or notes (optional)
                </label>
                <textarea id="f-needs" name="needs" rows={3} />
              </div>
              <div
                className="field"
                data-invalid={errors.terms ? "" : undefined}
              >
                <label className="check">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    aria-describedby={
                      errors.terms ? "f-terms-error" : undefined
                    }
                  />
                  I accept the cancellation policy: full refund up to seven days
                  before.
                </label>
                {errors.terms && (
                  <p className="field-error" id="f-terms-error">
                    {errors.terms}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-wide"
                disabled={sending || open.length === 0}
              >
                {sending
                  ? "Booking…"
                  : `Book ${places} ${places === 1 ? "place" : "places"} · ${money(w.price * places)}`}
              </button>
              <p className="quiet-line">
                This is a demo: nothing is sent and no payment is taken.
              </p>
            </form>
          )}
        </section>
      </div>

      <section className="section" aria-labelledby="other-title">
        <h2 id="other-title">Other workshops</h2>
        <ul className="other-workshops">
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/workshops/${o.id}`}>
                <img
                  src={o.photo.src}
                  alt={o.photo.alt}
                  width={o.photo.w}
                  height={o.photo.h}
                  loading="lazy"
                />
                <strong>{o.name}</strong>
                <span>
                  {o.length} · {money(o.price)} {o.unit}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
