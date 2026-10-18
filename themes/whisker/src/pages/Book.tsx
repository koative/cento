import { useMemo, useRef, useState, type FormEvent } from "react";
import { CalendarDays, Phone, RotateCcw, TriangleAlert } from "lucide-react";
import { Link } from "../router";
import { appointmentTypes, brand, hours, vets, type Day } from "../content";
import {
  clock,
  hhmmOf,
  longDate,
  minutesOf,
  money,
  shortDate,
} from "../lib/format";
import { load } from "../lib/store";
import { Field, type Errors } from "../components/Field";
import { PLANNER_KEY, type PlannerPet } from "../components/CarePlanner";
import { Stamp } from "../components/Stamp";

type Form = {
  petName: string;
  species: string;
  firstVisit: boolean;
  reason: string;
  notes: string;
  vet: string;
  date: string;
  time: string;
  owner: string;
  email: string;
  phone: string;
  sms: boolean;
  consent: boolean;
};

const speciesOptions = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
  { id: "rabbit", label: "Rabbit" },
  { id: "small", label: "Guinea pig or rat" },
];
const dayCode: Day[] = ["Mon", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // index 0 (Sunday) is never offered
const bookable = vets.filter((v) => v.bookable);
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** The next 12 days the clinic is open, starting tomorrow. */
function openDays() {
  const out: Date[] = [];
  const now = new Date();
  for (let i = 1; out.length < 12 && i < 21; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    if (hours[d.getDay()]) out.push(d);
  }
  return out;
}

/** Demo availability: a stable pseudo-random third of slots is already taken. */
function taken(date: string, vet: string, time: string) {
  let h = 0;
  for (const c of date + vet + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % (vet === "any" ? 5 : 3) === 0;
}

function slotsFor(date: Date, minutes: number) {
  const h = hours[date.getDay()];
  if (!h) return [];
  const out: string[] = [];
  for (let m = minutesOf(h.open); m + minutes <= minutesOf(h.close); m += 20)
    out.push(hhmmOf(m));
  return out;
}

function validate(f: Form): Errors {
  const e: Errors = {};
  if (!f.petName.trim()) e.petName = "Tell us your pet's name.";
  if (!f.species) e.species = "Choose the kind of pet you're bringing.";
  if (!f.reason)
    e.reason = "Choose what the visit is for so we book the right length.";
  if (!f.date) e.date = "Pick a day for the visit.";
  else if (!f.time)
    e.time = "Pick a time. Slots with a line through them are taken.";
  if (f.owner.trim().split(/\s+/).length < 2)
    e.owner = "Add your first and last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "Enter an email like name@example.com.";
  if (f.phone.replace(/\D/g, "").length < 7)
    e.phone = "Enter a phone number we can text, e.g. +1 555 0123.";
  if (!f.consent)
    e.consent = "Tick the box so we can confirm the booking with you.";
  return e;
}

const order = [
  "petName",
  "species",
  "reason",
  "date",
  "time",
  "owner",
  "email",
  "phone",
  "consent",
];

export function Book() {
  const initial = useMemo<Form>(() => {
    const params = new URLSearchParams(
      window.location.hash.split("?")[1] ?? "",
    );
    const pet = load<PlannerPet | null>(PLANNER_KEY, null);
    const reason = params.get("reason") ?? "";
    const vet = params.get("vet") ?? "";
    return {
      petName: pet?.name ?? "",
      species: pet?.species ?? "",
      firstVisit: false,
      reason: appointmentTypes.some((a) => a.id === reason) ? reason : "",
      notes: "",
      vet: bookable.some((v) => v.slug === vet) ? vet : "any",
      date: "",
      time: "",
      owner: "",
      email: "",
      phone: "",
      sms: true,
      consent: false,
    };
  }, []);
  const [form, setForm] = useState<Form>(initial);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const days = useMemo(openDays, []);
  const type = appointmentTypes.find((a) => a.id === form.reason);
  const vet = bookable.find((v) => v.slug === form.vet);
  const dayOk = (d: Date) => !vet || vet.days.includes(dayCode[d.getDay()]);
  const chosenDay = days.find((d) => iso(d) === form.date);
  const slots = chosenDay ? slotsFor(chosenDay, type?.minutes ?? 20) : [];

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "vet" && next.date) {
        const d = days.find((x) => iso(x) === next.date);
        const v = bookable.find((x) => x.slug === value);
        if (d && v && !v.days.includes(dayCode[d.getDay()])) next.date = "";
      }
      if (next.time && (key === "vet" || key === "date" || key === "reason")) {
        const d = days.find((x) => iso(x) === next.date);
        const minutes =
          appointmentTypes.find((a) => a.id === next.reason)?.minutes ?? 20;
        if (
          !d ||
          taken(next.date, next.vet, next.time) ||
          !slotsFor(d, minutes).includes(next.time)
        )
          next.time = "";
      }
      return next;
    });
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = order.find((k) => found[k]);
    if (first) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]:not([disabled])`)
        ?.focus();
      return;
    }
    setState("sending");
    window.setTimeout(() => {
      setState("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 900);
  };

  const reset = () => {
    setForm({
      ...initial,
      petName: "",
      species: "",
      owner: form.owner,
      email: form.email,
      phone: form.phone,
      consent: form.consent,
    });
    setErrors({});
    setState("idle");
  };

  const err = (k: string) =>
    errors[k] && (
      <p className="field-error" id={`f-${k}-err`}>
        {errors[k]}
      </p>
    );

  const summary = (
    <dl className="appt-fields">
      <div>
        <dt>Patient</dt>
        <dd>
          {form.petName.trim() || "—"}
          {form.species && (
            <span>
              {" "}
              · {speciesOptions.find((s) => s.id === form.species)?.label}
            </span>
          )}
        </dd>
      </div>
      <div>
        <dt>Visit</dt>
        <dd>
          {type ? `${type.name}` : "—"}
          {type && (
            <span>
              {" "}
              · {type.minutes} min · {money(type.price)}
            </span>
          )}
        </dd>
      </div>
      <div>
        <dt>With</dt>
        <dd>{vet ? vet.name : "First available vet"}</dd>
      </div>
      <div>
        <dt>When</dt>
        <dd>
          {chosenDay
            ? `${longDate(chosenDay)}${form.time ? ` · ${clock(form.time)}` : ""}`
            : "—"}
        </dd>
      </div>
    </dl>
  );

  return (
    <>
      <section className="page-head wrap">
        <h1>Book a visit</h1>
        <p className="lede">
          Choose a reason, a vet and a time. We'll confirm by text within
          working hours and send a reminder the day before.
        </p>
      </section>

      <section className="section wrap book-grid">
        <div className="book-main">
          <aside className="urgent-note">
            <TriangleAlert aria-hidden="true" />
            <p>
              <b>Is it an emergency?</b> Don't book online — call{" "}
              <a href={brand.emergencyHref}>{brand.emergencyPhone}</a> now. See{" "}
              <Link to="/emergency">what counts</Link>.
            </p>
          </aside>

          <div aria-live="polite">
            {state === "done" && (
              <div className="booked" ref={doneRef} tabIndex={-1}>
                <Stamp label="Booked" tilt={-9} />
                <h2>See you soon, {form.petName.trim()}.</h2>
                <p>
                  {type?.name} on <b>{chosenDay && longDate(chosenDay)}</b> at{" "}
                  <b>{clock(form.time)}</b> with{" "}
                  {vet ? vet.name : "the first available vet"}. A confirmation
                  is on its way to {form.email.trim()}
                  {form.sms ? " and by text" : ""}.
                </p>
                <p className="fine">
                  Please arrive five minutes early
                  {form.firstVisit
                    ? " — and bring any old vaccine records"
                    : ""}
                  . Need to change it? Call {brand.phone}.
                </p>
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={reset}
                  >
                    <RotateCcw aria-hidden="true" /> Book another pet
                  </button>
                  <Link to="/visit" className="text-link">
                    How to find us
                  </Link>
                </div>
              </div>
            )}
          </div>

          {state !== "done" && (
            <form
              ref={formRef}
              className="book-form"
              noValidate
              onSubmit={onSubmit}
            >
              <fieldset className="book-step">
                <legend>Your pet</legend>
                <div className="grid-2">
                  <Field
                    label="Pet's name"
                    name="petName"
                    error={errors.petName}
                    value={form.petName}
                    autoComplete="off"
                    maxLength={30}
                    required
                    onChange={(e) => set("petName", e.target.value)}
                  />
                  <div
                    className="field"
                    data-invalid={errors.species ? "" : undefined}
                  >
                    <span className="label" id="species-label">
                      Kind of pet
                    </span>
                    <div
                      className="seg seg-wrap"
                      role="radiogroup"
                      aria-labelledby="species-label"
                      aria-describedby={
                        errors.species ? "f-species-err" : undefined
                      }
                    >
                      {speciesOptions.map((s) => (
                        <label key={s.id} className="seg-option">
                          <input
                            type="radio"
                            name="species"
                            value={s.id}
                            checked={form.species === s.id}
                            onChange={() => set("species", s.id)}
                          />
                          <span>{s.label}</span>
                        </label>
                      ))}
                    </div>
                    {err("species")}
                  </div>
                </div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={form.firstVisit}
                    onChange={(e) => set("firstVisit", e.target.checked)}
                  />
                  <span>This is our first visit to Whisker</span>
                </label>
              </fieldset>

              <fieldset className="book-step">
                <legend>The visit</legend>
                <Field
                  label="What's it for?"
                  name="reason"
                  error={errors.reason}
                >
                  <select
                    value={form.reason}
                    required
                    onChange={(e) => set("reason", e.target.value)}
                  >
                    <option value="">Choose a reason…</option>
                    {appointmentTypes.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} — {a.minutes} min, {money(a.price)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Anything we should know?"
                  name="notes"
                  hint="Symptoms, how long it's been going on, or how your pet handles visits. Optional."
                >
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </Field>
              </fieldset>

              <fieldset className="book-step">
                <legend>Vet and time</legend>
                <div className="field">
                  <span className="label" id="vet-label">
                    Who would you like to see?
                  </span>
                  <div
                    className="vet-pick"
                    role="radiogroup"
                    aria-labelledby="vet-label"
                  >
                    <label className="vet-option">
                      <input
                        type="radio"
                        name="vet"
                        value="any"
                        checked={form.vet === "any"}
                        onChange={() => set("vet", "any")}
                      />
                      <span>
                        <b>First available</b>
                        <small>Most choice of times</small>
                      </span>
                    </label>
                    {bookable.map((v) => (
                      <label key={v.slug} className="vet-option">
                        <input
                          type="radio"
                          name="vet"
                          value={v.slug}
                          checked={form.vet === v.slug}
                          onChange={() => set("vet", v.slug)}
                        />
                        <img
                          src={v.pet.image.src}
                          alt=""
                          width={40}
                          height={40}
                        />
                        <span>
                          <b>{v.name}</b>
                          <small>{v.days.join(" · ")}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div
                  className="field"
                  data-invalid={errors.date ? "" : undefined}
                >
                  <span className="label" id="date-label">
                    Day
                  </span>
                  <div
                    className="day-pick"
                    role="radiogroup"
                    aria-labelledby="date-label"
                    aria-describedby={errors.date ? "f-date-err" : undefined}
                  >
                    {days.map((d) => {
                      const ok = dayOk(d);
                      return (
                        <label
                          key={iso(d)}
                          className="day-option"
                          data-off={ok ? undefined : ""}
                        >
                          <input
                            type="radio"
                            name="date"
                            value={iso(d)}
                            checked={form.date === iso(d)}
                            disabled={!ok}
                            onChange={() => set("date", iso(d))}
                          />
                          <span>
                            <small>
                              {d.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </small>
                            <b>{d.getDate()}</b>
                            <small>
                              {d.toLocaleDateString("en-US", {
                                month: "short",
                              })}
                            </small>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {vet && (
                    <p className="field-hint">
                      Greyed-out days are when {vet.short} isn't in clinic.
                    </p>
                  )}
                  {err("date")}
                </div>

                <div
                  className="field"
                  data-invalid={errors.time ? "" : undefined}
                >
                  <span className="label" id="time-label">
                    Time{" "}
                    {chosenDay && (
                      <span className="label-sub">
                        · {shortDate(chosenDay)}
                      </span>
                    )}
                  </span>
                  {chosenDay ? (
                    <div
                      className="time-pick"
                      role="radiogroup"
                      aria-labelledby="time-label"
                      aria-describedby={errors.time ? "f-time-err" : undefined}
                    >
                      {slots.map((t) => {
                        const gone = taken(form.date, form.vet, t);
                        return (
                          <label
                            key={t}
                            className="time-option"
                            data-taken={gone ? "" : undefined}
                          >
                            <input
                              type="radio"
                              name="time"
                              value={t}
                              checked={form.time === t}
                              disabled={gone}
                              onChange={() => set("time", t)}
                            />
                            <span>
                              {clock(t)}
                              {gone && (
                                <span className="sr-only"> (taken)</span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="field-hint">
                      <CalendarDays aria-hidden="true" /> Pick a day to see free
                      times.
                    </p>
                  )}
                  {err("time")}
                </div>
              </fieldset>

              <fieldset className="book-step">
                <legend>You</legend>
                <div className="grid-2">
                  <Field
                    label="Full name"
                    name="owner"
                    error={errors.owner}
                    value={form.owner}
                    autoComplete="name"
                    required
                    onChange={(e) => set("owner", e.target.value)}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    error={errors.email}
                    value={form.email}
                    autoComplete="email"
                    required
                    onChange={(e) => set("email", e.target.value)}
                  />
                  <Field
                    label="Mobile phone"
                    name="phone"
                    type="tel"
                    error={errors.phone}
                    value={form.phone}
                    autoComplete="tel"
                    placeholder="+1 555 0123"
                    required
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={form.sms}
                    onChange={(e) => set("sms", e.target.checked)}
                  />
                  <span>Text me a reminder the day before</span>
                </label>
                <div
                  className="field"
                  data-invalid={errors.consent ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "f-consent-err" : undefined
                      }
                      onChange={(e) => set("consent", e.target.checked)}
                    />
                    <span>
                      I'm happy for Whisker to contact me about this booking and
                      my pet's records.
                    </span>
                  </label>
                  {err("consent")}
                </div>
              </fieldset>

              <div className="submit-row">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "Booking…" : "Confirm booking"}
                </button>
                <p className="fine">
                  This is a demo: nothing is sent or stored beyond this page.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="appt-card" aria-label="Your appointment so far">
          <p className="record-clinic">Appointment card</p>
          {summary}
          <p className="appt-foot">
            <Phone aria-hidden="true" /> Questions?{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
        </aside>
      </section>
    </>
  );
}
