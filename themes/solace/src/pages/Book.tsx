import { useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "../router";
import { brand, clinicians, locations, services } from "../content";
import { AppointmentCard } from "../components/AppointmentCard";
import { Field } from "../components/Field";
import {
  clinicianBy,
  fmtDay,
  fmtTime,
  fromIso,
  iso,
  locationBy,
  serviceBy,
  slotsFor,
  upcomingDays,
  type Slot,
} from "../lib/schedule";

const slotKey = (s: Slot) => `${s.date}|${s.time}|${s.clinician}|${s.location}`;
const PERIODS: [string, number, number][] = [
  ["Morning", 0, 12 * 60],
  ["Afternoon", 12 * 60, 17 * 60],
  ["Evening", 17 * 60, 24 * 60],
];

type Errors = Partial<
  Record<
    | "service"
    | "slot"
    | "first"
    | "last"
    | "dob"
    | "phone"
    | "email"
    | "status"
    | "policy",
    string
  >
>;
const ORDER: (keyof Errors)[] = [
  "service",
  "slot",
  "first",
  "last",
  "dob",
  "phone",
  "email",
  "status",
  "policy",
];

export function Book() {
  const [query] = useState(
    () => new URLSearchParams(window.location.hash.split("?")[1] ?? ""),
  );
  const [serviceSlug, setServiceSlug] = useState(() =>
    serviceBy(query.get("service") ?? "") ? query.get("service")! : "",
  );
  const [locationSlug, setLocationSlug] = useState(() =>
    locationBy(query.get("location") ?? "") ? query.get("location")! : "",
  );
  const [clinicianSlug, setClinicianSlug] = useState(() =>
    clinicianBy(query.get("clinician") ?? "") ? query.get("clinician")! : "",
  );
  const [date, setDate] = useState("");
  const [picked, setPicked] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [reference, setReference] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const service = serviceBy(serviceSlug);
  const eligible = clinicians.filter(
    (c) =>
      (!service || service.clinicians.includes(c.slug)) &&
      (!locationSlug || locationSlug in c.schedule),
  );
  const days = useMemo(() => {
    if (!service) return [];
    const opts = {
      location: locationSlug || undefined,
      clinician: clinicianSlug || undefined,
    };
    return upcomingDays(service.bookAhead ?? 12).map((d) => ({
      date: d,
      slots: slotsFor(service, d, opts),
    }));
  }, [service, locationSlug, clinicianSlug]);
  const daySlots = days.find((d) => iso(d.date) === date)?.slots ?? [];
  const slot = daySlots.find((s) => slotKey(s) === picked);
  const shownClinician = clinicianBy(slot?.clinician ?? clinicianSlug);
  const shownLocation = locationBy(slot?.location ?? locationSlug);

  function chooseService(slug: string) {
    setServiceSlug(slug);
    const next = serviceBy(slug)!;
    if (clinicianSlug && !next.clinicians.includes(clinicianSlug))
      setClinicianSlug("");
    if (locationSlug && !next.locations.includes(locationSlug))
      setLocationSlug("");
    setPicked("");
  }

  function chooseLocation(slug: string) {
    setLocationSlug(slug);
    if (
      slug &&
      clinicianSlug &&
      !(slug in (clinicianBy(clinicianSlug)?.schedule ?? {}))
    )
      setClinicianSlug("");
    setPicked("");
  }

  function check(): Errors {
    const f = form.current!;
    const el = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
    const e: Errors = {};
    if (!service) e.service = "Choose what the visit is for.";
    if (!slot)
      e.slot = date
        ? "Choose one of the open times for this day."
        : "Choose a day, then one of its open times.";
    if (el("first").validity.valueMissing)
      e.first = "Enter the patient’s first name.";
    if (el("last").validity.valueMissing)
      e.last = "Enter the patient’s last name.";
    const dob = el("dob");
    if (dob.validity.valueMissing || dob.validity.badInput)
      e.dob = "Enter the patient’s date of birth.";
    else if (dob.value > iso(new Date()))
      e.dob = "Date of birth can’t be in the future — check the year.";
    else if (dob.value < "1900-01-01")
      e.dob = "Check the year — it should be after 1900.";
    const phone = el("phone");
    if (phone.validity.valueMissing)
      e.phone = "Enter a phone number so we can text a reminder.";
    else if (phone.value.replace(/\D/g, "").length < 10)
      e.phone = "Use at least 10 digits, like +1 555 014 2010.";
    const email = el("email");
    if (email.validity.valueMissing)
      e.email = "Enter an email address for the visit summary.";
    else if (!email.validity.valid)
      e.email = "That email looks incomplete — use the form name@example.com.";
    if (!(f.elements.namedItem("status") as RadioNodeList).value)
      e.status =
        "Tell us whether the patient is already registered with Solace.";
    if (!el("policy").checked)
      e.policy = "Tick to confirm you’ve read the cancellation policy.";
    return e;
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = check();
    setErrors(found);
    setTried(true);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(`book-${first}`)?.focus();
      return;
    }
    setState("sending");
    window.setTimeout(() => {
      setReference(
        `SOL-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      );
      setState("done");
      document
        .getElementById("book-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1200);
  }

  function reset() {
    setState("idle");
    setReference("");
    setPicked("");
    setDate("");
    setFirst("");
    setLast("");
    setTried(false);
    setErrors({});
  }

  const err = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": `book-${k}-error`,
  });

  return (
    <div className="book">
      <header className="page-head book-head">
        <h1>Book a visit</h1>
        <p className="lede">
          Choose the kind of visit, then a clinic, a clinician and a time. The
          appointment card fills in as you go. For anything urgent today, call{" "}
          <a href={brand.phoneHref}>{brand.phone}</a> from 7:30 am.
        </p>
      </header>

      <div className="book-grid">
        <div className="book-main" id="book-result">
          {state === "done" && slot && service ? (
            <div className="book-done">
              <Check size={28} aria-hidden="true" />
              <h2>You’re booked in, {first.trim()}.</h2>
              <p>
                {service.name} with {shownClinician?.name} at{" "}
                {shownLocation?.name}, {fmtDay(fromIso(slot.date))} at{" "}
                {fmtTime(slot.time)}. Your reference is{" "}
                <strong>{reference}</strong>.
              </p>
              <p>
                A reminder text would normally follow the day before. Bring{" "}
                {service.bring[0].toLowerCase()}, and arrive ten minutes early.
              </p>
              <div className="row">
                <button type="button" className="btn" onClick={reset}>
                  Book another visit
                </button>
                <Link to="/patients" className="btn btn-quiet">
                  Before your visit
                </Link>
              </div>
            </div>
          ) : (
            <form
              ref={form}
              className="book-form"
              onSubmit={submit}
              onChange={() => tried && setErrors(check())}
              noValidate
            >
              <fieldset className="step">
                <legend>
                  <span className="step-n">1</span> What is the visit for?
                </legend>
                <div className="choice-list">
                  {services.map((s, i) => (
                    <label key={s.slug} className="choice">
                      <input
                        type="radio"
                        name="service"
                        value={s.slug}
                        id={i === 0 ? "book-service" : undefined}
                        checked={serviceSlug === s.slug}
                        onChange={() => chooseService(s.slug)}
                      />
                      <span className="choice-name">{s.name}</span>
                      <span className="choice-meta">
                        {s.minutes} min · {s.ages}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="error" id="book-service-error">
                  {errors.service}
                </p>
              </fieldset>

              <fieldset className="step">
                <legend>
                  <span className="step-n">2</span> Where, and with whom?
                </legend>
                <div className="seg" role="radiogroup" aria-label="Clinic">
                  {[{ slug: "", name: "Any clinic" }, ...locations].map((l) => {
                    const offered =
                      !l.slug || !service || service.locations.includes(l.slug);
                    return (
                      <label
                        key={l.slug}
                        className="seg-item"
                        data-disabled={offered ? undefined : ""}
                      >
                        <input
                          type="radio"
                          name="location"
                          value={l.slug}
                          disabled={!offered}
                          checked={locationSlug === l.slug}
                          onChange={() => chooseLocation(l.slug)}
                        />
                        {l.name}
                      </label>
                    );
                  })}
                </div>
                <div className="field">
                  <label htmlFor="book-clinician">Clinician</label>
                  <select
                    id="book-clinician"
                    value={clinicianSlug}
                    onChange={(e) => {
                      setClinicianSlug(e.target.value);
                      setPicked("");
                    }}
                  >
                    <option value="">First available</option>
                    {eligible.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} — {c.role}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <fieldset className="step">
                <legend>
                  <span className="step-n">3</span> Day and time
                </legend>
                {!service ? (
                  <p className="muted">
                    Choose the kind of visit first — open times depend on its
                    length and who offers it.
                  </p>
                ) : (
                  <>
                    <div
                      className="days"
                      role="radiogroup"
                      aria-label="Day"
                      id="book-slot"
                      tabIndex={-1}
                    >
                      {days.map(({ date: d, slots }) => {
                        const value = iso(d);
                        return (
                          <label
                            key={value}
                            className="day"
                            data-disabled={slots.length ? undefined : ""}
                          >
                            <input
                              type="radio"
                              name="day"
                              value={value}
                              disabled={!slots.length}
                              checked={date === value}
                              onChange={() => {
                                setDate(value);
                                setPicked("");
                              }}
                            />
                            <span className="day-name">
                              {d.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </span>
                            <span className="day-num">{d.getDate()}</span>
                            <span className="day-open">
                              {slots.length ? `${slots.length} open` : "Full"}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {date && (
                      <div className="times">
                        {PERIODS.map(([label, from, to]) => {
                          const list = daySlots.filter(
                            (s) => s.time >= from && s.time < to,
                          );
                          if (!list.length) return null;
                          return (
                            <div
                              key={label}
                              className="times-group"
                              role="radiogroup"
                              aria-label={`${label} times`}
                            >
                              <p className="times-label">{label}</p>
                              <div className="times-grid">
                                {list.map((s) => (
                                  <label key={slotKey(s)} className="time">
                                    <input
                                      type="radio"
                                      name="time"
                                      value={slotKey(s)}
                                      checked={picked === slotKey(s)}
                                      onChange={() => setPicked(slotKey(s))}
                                    />
                                    <span className="time-t">
                                      {fmtTime(s.time)}
                                    </span>
                                    <span className="time-who">
                                      {clinicianBy(s.clinician)?.short}
                                      {!locationSlug &&
                                        `, ${locationBy(s.location)?.name}`}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
                <p className="error" id="book-slot-error">
                  {errors.slot}
                </p>
              </fieldset>

              <fieldset className="step">
                <legend>
                  <span className="step-n">4</span> About the patient
                </legend>
                <div className="field-pair">
                  <Field
                    id="book-first"
                    label="First name"
                    error={errors.first}
                  >
                    <input
                      id="book-first"
                      name="first"
                      required
                      autoComplete="given-name"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      {...err("first")}
                    />
                  </Field>
                  <Field id="book-last" label="Last name" error={errors.last}>
                    <input
                      id="book-last"
                      name="last"
                      required
                      autoComplete="family-name"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                      {...err("last")}
                    />
                  </Field>
                </div>
                <div className="field-pair">
                  <Field id="book-dob" label="Date of birth" error={errors.dob}>
                    <input
                      id="book-dob"
                      name="dob"
                      type="date"
                      required
                      min="1900-01-01"
                      max={iso(new Date())}
                      {...err("dob")}
                    />
                  </Field>
                  <Field
                    id="book-phone"
                    label="Mobile phone"
                    hint="For a reminder text the day before."
                    error={errors.phone}
                  >
                    <input
                      id="book-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      {...err("phone")}
                    />
                  </Field>
                </div>
                <Field
                  id="book-email"
                  label="Email"
                  hint="We send a short written summary after every visit."
                  error={errors.email}
                >
                  <input
                    id="book-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    {...err("email")}
                  />
                </Field>
                <div
                  className="field"
                  data-invalid={errors.status ? "" : undefined}
                >
                  <p className="field-label" id="book-status-label">
                    Is the patient registered with Solace?
                  </p>
                  <div
                    className="seg"
                    role="radiogroup"
                    aria-labelledby="book-status-label"
                    aria-describedby="book-status-error"
                  >
                    <label className="seg-item">
                      <input
                        type="radio"
                        name="status"
                        value="registered"
                        id="book-status"
                        required
                      />
                      Yes, already a patient
                    </label>
                    <label className="seg-item">
                      <input type="radio" name="status" value="new" required />
                      No, this is our first visit
                    </label>
                  </div>
                  <p className="error" id="book-status-error">
                    {errors.status}
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="book-notes">
                    Anything the clinician should know? (optional)
                  </label>
                  <textarea
                    id="book-notes"
                    name="notes"
                    rows={3}
                    maxLength={400}
                    placeholder="A few words is plenty — for example, “cough for ten days, worse at night”."
                  />
                </div>
                <div
                  className="field"
                  data-invalid={errors.policy ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="policy"
                      id="book-policy"
                      required
                      {...err("policy")}
                    />
                    <span>
                      I’ve read the{" "}
                      <Link to="/patients">cancellation policy</Link>: please
                      give 24 hours’ notice if you can’t come.
                    </span>
                  </label>
                  <p className="error" id="book-policy-error">
                    {errors.policy}
                  </p>
                </div>
              </fieldset>

              <div className="book-submit">
                <button
                  type="submit"
                  className="btn btn-large"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? (
                    <>
                      <LoaderCircle
                        size={20}
                        className="spin"
                        aria-hidden="true"
                      />{" "}
                      Booking…
                    </>
                  ) : (
                    <>
                      Confirm appointment{" "}
                      <ArrowRight size={20} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="muted">
                  This is a demo: nothing is sent, stored or booked.
                </p>
              </div>
            </form>
          )}
          <p className="visually-hidden" aria-live="polite">
            {state === "sending"
              ? "Booking your appointment…"
              : state === "done"
                ? `Appointment confirmed. Reference ${reference}.`
                : ""}
          </p>
        </div>

        <aside className="book-aside">
          <AppointmentCard
            service={service}
            clinician={shownClinician}
            location={shownLocation}
            slot={slot}
            patient={`${first} ${last}`}
            reference={state === "done" ? reference : undefined}
          />
        </aside>
      </div>
    </div>
  );
}
