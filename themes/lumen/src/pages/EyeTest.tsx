import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "../router";
import { exams, eyeTestCopy, stores } from "../content";
import { clinicDates, dateLabel, slots } from "../lib/hours";
import { money } from "../lib/cart";
import {
  clearError,
  Field,
  GroupError,
  validate,
  type Errors,
} from "../components/Field";

const messages = {
  store: { missing: "Choose the store you want to visit." },
  exam: { missing: "Choose the type of eye test." },
  date: { missing: "Pick a day for your appointment." },
  time: { missing: "Pick a time. Greyed-out times are already booked." },
  first: { missing: "Enter your first name." },
  last: { missing: "Enter your last name." },
  email: {
    missing: "Enter your email so we can send the confirmation.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  phone: {
    missing: "Enter a phone number in case we need to move your slot.",
    invalid: "Use at least 7 digits; spaces, brackets and + are fine.",
  },
  dob: {
    missing: "Enter your date of birth. Optometrists need it for your record.",
    invalid: "Date of birth can't be in the future.",
  },
  policy: {
    missing: "Tick the box to accept the 24-hour cancellation policy.",
  },
};

type Booking = {
  ref: string;
  store: string;
  exam: string;
  when: string;
  email: string;
};

export function EyeTest() {
  const initial =
    stores.find(
      (s) =>
        s.id ===
        new URLSearchParams(window.location.hash.split("?")[1]).get("store"),
    )?.id ?? "";
  const [storeId, setStoreId] = useState(initial);
  const [examId, setExamId] = useState(exams[0].id);
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const store = stores.find((s) => s.id === storeId);
  const exam = exams.find((e) => e.id === examId)!;
  const dates = store ? clinicDates(store, 10) : [];
  const date = dates.find((d) => d.toDateString() === dateKey);
  const times = store && date ? slots(store, date) : [];
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (booking) done.current?.focus();
  }, [booking]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length || !store || !date) return;
    const data = new FormData(form);
    setBusy(true);
    setTimeout(() => {
      setBooking({
        ref: "LX-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
        store: `Lumen ${store.name}, ${store.address}, ${store.city}`,
        exam: `${exam.name}, ${exam.minutes} minutes, ${exam.price ? money(exam.price) : "free"}`,
        when: `${dateLabel(date)} at ${time}`,
        email: String(data.get("email")),
      });
      setBusy(false);
    }, 900);
  }

  if (booking)
    return (
      <div className="page booking-page">
        <div className="confirmation" aria-live="polite">
          <Check size={28} aria-hidden="true" className="confirm-icon" />
          <h1 ref={done} tabIndex={-1}>
            You're booked in
          </h1>
          <p className="lede">
            A confirmation is on its way to {booking.email}. Reference{" "}
            {booking.ref}.
          </p>
          <dl className="summary-list">
            <div>
              <dt>Where</dt>
              <dd>{booking.store}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{booking.when}</dd>
            </div>
            <div>
              <dt>What</dt>
              <dd>{booking.exam}</dd>
            </div>
          </dl>
          <h2>Bring with you</h2>
          <ul className="ticks">
            {eyeTestCopy.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="actions">
            <Link to="/frames" className="btn">
              Browse frames before you come{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setBooking(null)}
            >
              Book another test
            </button>
          </div>
          <p className="demo-note">
            Demo only: no appointment was made and nothing was sent.
          </p>
        </div>
      </div>
    );

  return (
    <div className="page booking-page">
      <header className="page-head">
        <h1>{eyeTestCopy.title}</h1>
        <p className="lede">{eyeTestCopy.intro}</p>
      </header>

      <div className="booking">
        <form
          noValidate
          onSubmit={submit}
          onChange={clearError(setErrors)}
          className="booking-form"
          aria-busy={busy}
        >
          <fieldset className="form-step">
            <legend>Store and test</legend>
            <div className="field">
              <label htmlFor="f-store">Store</label>
              <select
                id="f-store"
                name="store"
                required
                value={storeId}
                aria-invalid={errors.store ? true : undefined}
                aria-describedby={errors.store ? "f-store-error" : undefined}
                onChange={(e) => {
                  setStoreId(e.target.value);
                  setDateKey("");
                  setTime("");
                }}
              >
                <option value="">Choose a store</option>
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}, {s.city}
                  </option>
                ))}
              </select>
              <GroupError id="f-store-error" error={errors.store} />
            </div>
            <div
              className="choice-list"
              role="radiogroup"
              aria-label="Type of eye test"
            >
              {exams.map((x) => (
                <label key={x.id} className="choice">
                  <input
                    type="radio"
                    name="exam"
                    value={x.id}
                    required
                    checked={examId === x.id}
                    onChange={() => setExamId(x.id)}
                  />
                  <span>
                    <strong>
                      {x.name} · {x.minutes} min
                    </strong>
                    <small>{x.note}</small>
                  </span>
                  <span className="choice-price">
                    {x.price ? money(x.price) : "Free"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset
            className="form-step"
            aria-describedby={
              errors.date || errors.time ? "f-when-error" : undefined
            }
          >
            <legend>Day and time</legend>
            {!store && (
              <p className="field-hint">
                Choose a store first to see its free times.
              </p>
            )}
            {store && (
              <>
                <div className="date-grid" role="radiogroup" aria-label="Day">
                  {dates.map((d) => (
                    <label key={d.toDateString()} className="date-chip">
                      <input
                        type="radio"
                        name="date"
                        required
                        value={d.toDateString()}
                        checked={dateKey === d.toDateString()}
                        onChange={() => {
                          setDateKey(d.toDateString());
                          setTime("");
                        }}
                      />
                      <span>
                        <small>
                          {d.toLocaleDateString("en-US", { weekday: "short" })}
                        </small>
                        <strong>{d.getDate()}</strong>
                        <small>
                          {d.toLocaleDateString("en-US", { month: "short" })}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
                {date ? (
                  <div
                    className="time-grid"
                    role="radiogroup"
                    aria-label={`Times on ${dateLabel(date)}`}
                  >
                    {times.map((t) => (
                      <label key={t.time} className="time-chip">
                        <input
                          type="radio"
                          name="time"
                          required
                          value={t.time}
                          disabled={t.taken}
                          checked={time === t.time}
                          onChange={() => setTime(t.time)}
                        />
                        <span>{t.time}</span>
                        {t.taken && (
                          <span className="visually-hidden"> (booked)</span>
                        )}
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="field-hint">Pick a day to see the times.</p>
                )}
              </>
            )}
            <GroupError id="f-when-error" error={errors.date ?? errors.time} />
          </fieldset>

          <fieldset className="form-step">
            <legend>Your details</legend>
            <div className="field-grid">
              <Field
                label="First name"
                name="first"
                required
                autoComplete="given-name"
                error={errors.first}
              />
              <Field
                label="Last name"
                name="last"
                required
                autoComplete="family-name"
                error={errors.last}
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
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[+0-9 \(\)\-]{7,}"
                error={errors.phone}
              />
              <Field
                label="Date of birth"
                name="dob"
                type="date"
                required
                max={today}
                error={errors.dob}
              />
              <div className="field">
                <label htmlFor="f-wear">You currently wear</label>
                <select id="f-wear" name="wear" defaultValue="glasses">
                  <option value="none">Nothing yet</option>
                  <option value="glasses">Glasses</option>
                  <option value="contacts">Contact lenses</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-notes">
                Anything the optometrist should know? (optional)
              </label>
              <textarea
                id="f-notes"
                name="notes"
                rows={3}
                placeholder="Headaches after screen work, a recent eye injury, a family history of glaucoma…"
              />
            </div>
            <label className="check">
              <input
                type="checkbox"
                name="policy"
                required
                aria-describedby={errors.policy ? "f-policy-error" : undefined}
                aria-invalid={errors.policy ? true : undefined}
              />
              <span>
                I can give 24 hours' notice if I need to cancel or move this
                appointment.
              </span>
            </label>
            <GroupError id="f-policy-error" error={errors.policy} />
          </fieldset>

          <button type="submit" className="btn btn-wide" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Booking…
              </>
            ) : (
              "Book eye test"
            )}
          </button>
          <p className="demo-note">
            This is a demo: nothing is sent or booked.
          </p>
        </form>

        <aside className="booking-summary" aria-label="Your appointment">
          <h2>Your appointment</h2>
          <dl className="summary-list">
            <div>
              <dt>Store</dt>
              <dd>
                {store ? `${store.name}, ${store.city}` : "Not chosen yet"}
              </dd>
            </div>
            <div>
              <dt>Test</dt>
              <dd>
                {exam.name}, {exam.minutes} min
              </dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {date
                  ? `${dateLabel(date)}${time ? ` at ${time}` : ", time not chosen"}`
                  : "Not chosen yet"}
              </dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>
                {exam.price ? `${money(exam.price)}, paid in store` : "Free"}
              </dd>
            </div>
          </dl>
          {store && (
            <p className="field-hint">
              With {store.optometrists.join(" or ")}. {store.address}.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
