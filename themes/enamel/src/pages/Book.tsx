import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import {
  brand,
  categories,
  dentists,
  footerNote,
  treatments,
} from "../content";
import {
  clock,
  dayLabel,
  pause,
  priceRange,
  validate,
  type Errors,
} from "../lib/format";
import { daysAhead, slotsFor, type Slot } from "../lib/slots";
import { Field, useErrors } from "../components/Field";
import {
  AppointmentCard,
  type Appointment,
} from "../components/AppointmentCard";

const messages = {
  treatment: "Choose a treatment — pick “Check-up & clean” if you're not sure.",
  first: "Add your first name as it appears on your insurance card.",
  last: "Add your last name.",
  email:
    "Enter an email like you@example.com — we send the confirmation there.",
  phone:
    "Enter a phone number with at least 10 digits, like 555 014 2280, for the reminder text.",
  dob: "Enter your date of birth so we can find or create your record.",
  status: "Tell us whether you've been to Enamel before.",
  consent: "Tick to confirm you've read the 24-hour cancellation policy.",
};

/** ?t=treatment&d=dentist&teeth=16,26 from the hash, for links from treatment pages and the tooth map. */
function preset() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const d = dentists.find((x) => x.slug === params.get("d"));
  const t =
    treatments.find((x) => x.slug === params.get("t")) ??
    (d ? treatments.find((x) => x.dentists.includes(d.slug)) : undefined);
  const teeth = params.get("teeth");
  return {
    treatment: t?.slug ?? "",
    dentist: d?.slug ?? "any",
    note: teeth
      ? `Marked on the tooth chart: ${teeth.split(",").join(", ")}`
      : "",
  };
}

export function Book() {
  const [initial] = useState(preset);
  const [treatment, setTreatment] = useState(initial.treatment);
  const [dentist, setDentist] = useState(initial.dentist);
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Appointment | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const heading = useRef<HTMLHeadingElement>(null);

  const t = treatments.find((x) => x.slug === treatment);
  const calendar = useMemo(() => daysAhead(14), []);
  const free = useMemo(() => {
    const who = t ? (dentist === "any" ? t.dentists : [dentist]) : [];
    return calendar.map((d) => (t ? slotsFor(d, who, t.minutes) : []));
  }, [calendar, t, dentist]);
  const firstOpen = free.findIndex((s) => s.length);
  const day =
    dayIndex !== null && free[dayIndex]?.length ? dayIndex : firstOpen;
  const chosenDentist = dentists.find((x) => x.slug === slot?.dentist);

  useEffect(() => {
    if (done) heading.current?.focus();
  }, [done]);

  const pickTreatment = (slug: string) => {
    setTreatment(slug);
    const next = treatments.find((x) => x.slug === slug);
    if (next && dentist !== "any" && !next.dentists.includes(dentist))
      setDentist("any");
    setSlot(null);
    setErrors(({ treatment: _, ...rest }) => rest);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    if (t && !slot)
      extra.time =
        "Choose a day and a free time above — greyed-out days are fully booked or closed.";
    const phone = String(data.get("phone") ?? "");
    if (phone && phone.replace(/\D/g, "").length < 10)
      extra.phone = messages.phone;
    const dob = String(data.get("dob") ?? "");
    if (dob && new Date(dob) > new Date())
      extra.dob =
        "That date is in the future — check the year of your date of birth.";
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) {
      if (found.time && Object.keys(found)[0] === "time")
        document.getElementById("time-h")?.focus();
      return;
    }

    setSending(true);
    await pause();
    setDone({
      name: `${data.get("first")} ${data.get("last")}`,
      treatment: t!.name,
      dentist: chosenDentist!.name,
      date: dayLabel(calendar[day], {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      time: clock(slot!.time),
      reference: `EN-${String(Math.floor(10000 + Math.random() * 89999))}`,
    });
    setSending(false);
  };

  if (done) {
    return (
      <div className="page book-page">
        <section className="wrap booked" aria-live="polite">
          <div>
            <h1 ref={heading} tabIndex={-1}>
              You're booked in, {done.name.split(" ")[0]}.
            </h1>
            <p className="lede">
              {done.treatment} with {done.dentist} on {done.date} at {done.time}
              . A confirmation would now be on its way to your inbox, with a
              reminder text two days before.
            </p>
            <ul className="ticks">
              <li>
                Arrive ten minutes early; the entrance is on the Larch Street
                side.
              </li>
              <li>
                Need to move it? Call {brand.phone} — 24 hours' notice keeps it
                free of charge.
              </li>
              <li>
                New here? Your health form takes five minutes at the desk.
              </li>
            </ul>
            <div className="hero-actions">
              <Link to="/new-patients" className="btn btn-primary">
                What to expect
              </Link>
              <Link to="/visit" className="btn btn-ghost">
                Getting here
              </Link>
            </div>
            <p className="quiet">{footerNote}</p>
          </div>
          <AppointmentCard a={done} />
        </section>
      </div>
    );
  }

  return (
    <div className="page book-page">
      <header className="page-head wrap">
        <h1>Book an appointment</h1>
        <p className="lede">
          Choose what you need, who you'd like to see and a time that's really
          free. In pain right now? Choose “Emergency appointment” — same-day
          slots show first.
        </p>
      </header>

      <div className="wrap book-grid">
        <form
          className="book-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
          aria-busy={sending}
        >
          <fieldset className="step">
            <legend>
              <span className="step-n">1</span> Treatment
            </legend>
            <Field
              label="What would you like to book?"
              name="treatment"
              error={errors.treatment}
            >
              <select
                required
                value={treatment}
                onChange={(e) => pickTreatment(e.target.value)}
              >
                <option value="" disabled>
                  Choose a treatment
                </option>
                {categories.map((c) => (
                  <optgroup key={c} label={c}>
                    {treatments
                      .filter((x) => x.category === c)
                      .map((x) => (
                        <option key={x.slug} value={x.slug}>
                          {x.name} — {priceRange(x)}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </Field>
            {t && (
              <p className="step-note">
                {t.minutes} minutes · {t.visits} · {priceRange(t)} {t.unit}.{" "}
                <Link to={`/treatments/${t.slug}`}>About this treatment</Link>
              </p>
            )}
          </fieldset>

          <fieldset className="step" disabled={!t}>
            <legend>
              <span className="step-n">2</span> Dentist
            </legend>
            {!t && (
              <p className="step-note">
                Choose a treatment first to see who does it.
              </p>
            )}
            {t && (
              <div className="choice-grid">
                {["any", ...t.dentists].map((slug) => {
                  const d = dentists.find((x) => x.slug === slug);
                  return (
                    <label
                      key={slug}
                      className="choice"
                      data-on={dentist === slug ? "" : undefined}
                    >
                      <input
                        type="radio"
                        name="dentist"
                        value={slug}
                        checked={dentist === slug}
                        onChange={() => (setDentist(slug), setSlot(null))}
                      />
                      <strong>{d ? d.name : "First available"}</strong>
                      <small>
                        {d ? d.role : "Earliest time with anyone who does this"}
                      </small>
                    </label>
                  );
                })}
              </div>
            )}
          </fieldset>

          <fieldset
            className="step"
            disabled={!t}
            aria-describedby={errors.time ? "time-err" : undefined}
          >
            <legend>
              <span className="step-n">3</span> Day and time
            </legend>
            {t ? (
              <>
                <div className="days" role="radiogroup" aria-label="Day">
                  {calendar.map((d, i) => (
                    <label
                      key={i}
                      className="day"
                      data-on={i === day ? "" : undefined}
                      data-none={free[i].length ? undefined : ""}
                    >
                      <input
                        type="radio"
                        name="day"
                        checked={i === day}
                        disabled={!free[i].length}
                        onChange={() => (setDayIndex(i), setSlot(null))}
                      />
                      <span className="day-w">
                        {dayLabel(d, { weekday: "short" })}
                      </span>
                      <span className="day-d tnum">{d.getDate()}</span>
                      <span className="day-m">
                        {free[i].length ? `${free[i].length} free` : "Full"}
                      </span>
                    </label>
                  ))}
                </div>
                <h3 id="time-h" tabIndex={-1} className="times-h">
                  {day >= 0
                    ? `Free on ${dayLabel(calendar[day], { weekday: "long", month: "long", day: "numeric" })}`
                    : "No free times in the next two weeks — call the desk."}
                </h3>
                <div
                  className="times"
                  role="radiogroup"
                  aria-labelledby="time-h"
                >
                  {day >= 0 &&
                    free[day].map((s) => (
                      <label
                        key={s.time}
                        className="time"
                        data-on={
                          slot?.time === s.time && slot.dentist === s.dentist
                            ? ""
                            : undefined
                        }
                      >
                        <input
                          type="radio"
                          name="time"
                          value={s.time}
                          checked={slot?.time === s.time}
                          onChange={() => (
                            setSlot(s),
                            setErrors(({ time: _, ...rest }) => rest)
                          )}
                        />
                        <span className="tnum">{clock(s.time)}</span>
                        {dentist === "any" && (
                          <small>
                            {dentists
                              .find((x) => x.slug === s.dentist)
                              ?.name.replace("Dr. ", "")}
                          </small>
                        )}
                      </label>
                    ))}
                </div>
                {errors.time && (
                  <p className="field-error" id="time-err">
                    {errors.time}
                  </p>
                )}
              </>
            ) : (
              <p className="step-note">
                Free times appear once you've chosen a treatment.
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">4</span> Your details
            </legend>
            <div className="form-cols">
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
                label="Mobile"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                hint="For a reminder text two days before."
                error={errors.phone}
              />
              <Field
                label="Date of birth"
                name="dob"
                type="date"
                required
                autoComplete="bday"
                error={errors.dob}
              />
              <fieldset
                className="radio-row"
                aria-describedby={errors.status ? "f-status-err" : undefined}
              >
                <legend>Been to Enamel before?</legend>
                <label>
                  <input type="radio" name="status" value="new" required /> No,
                  I'm new
                </label>
                <label>
                  <input type="radio" name="status" value="returning" /> Yes
                </label>
                {errors.status && (
                  <p className="field-error" id="f-status-err">
                    {errors.status}
                  </p>
                )}
              </fieldset>
              <Field
                label="Anything we should know?"
                name="notes"
                hint="Optional — nerves, access needs, which tooth hurts."
                className="span-2"
              >
                <textarea rows={4} defaultValue={initial.note} />
              </Field>
            </div>
            <div
              className="consent"
              data-invalid={errors.consent ? "" : undefined}
            >
              <label>
                <input
                  type="checkbox"
                  name="consent"
                  required
                  aria-describedby={
                    errors.consent ? "f-consent-err" : undefined
                  }
                  aria-invalid={errors.consent ? true : undefined}
                />
                I've read the cancellation policy: 24 hours' notice, or a $40
                fee after the first late cancellation.
              </label>
              {errors.consent && (
                <p className="field-error" id="f-consent-err">
                  {errors.consent}
                </p>
              )}
            </div>
          </fieldset>

          <div className="submit-row">
            <button className="btn btn-primary btn-lg" disabled={sending}>
              {sending ? "Booking…" : "Confirm appointment"}
            </button>
            <p className="quiet">{footerNote}</p>
          </div>
        </form>

        <aside className="book-aside" aria-label="Your appointment so far">
          <AppointmentCard
            a={{
              name: "—",
              treatment: t?.name ?? "Choose a treatment",
              dentist:
                chosenDentist?.name ??
                (dentist === "any"
                  ? "First available"
                  : (dentists.find((x) => x.slug === dentist)?.name ?? "—")),
              date:
                slot && day >= 0
                  ? dayLabel(calendar[day], {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Choose a day",
              time: slot ? clock(slot.time) : "—",
            }}
          />
          <p className="quiet">
            Prefer the phone?{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>,
            weekdays from 7:45.
          </p>
        </aside>
      </div>
    </div>
  );
}
