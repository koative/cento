import { useMemo, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, programmes, trial } from "../content";
import {
  bookableDays,
  clock,
  isoDay,
  longDate,
  shortDate,
  slotsFor,
} from "../lib/format";
import { pause, validate, type Errors } from "../lib/forms";
import { programmeBySlug, teachersFor } from "../lib/school";
import { Field, useErrors } from "../components/Field";

const messages = {
  programme: "Choose what you'd like to try.",
  who: "Tell us whether the lessons are for you or for a child.",
  student: "Add the learner's first name so the teacher knows who to expect.",
  age: "Enter the learner's age as a number between 3 and 99.",
  experience:
    "Pick the closest description — 'none yet' is the most common answer.",
  day: "Choose a day for the trial.",
  slot: "Pick one of the open times on that day, or choose another day.",
  guardian: "Add your name as the parent or guardian.",
  email: "Enter an email like you@example.com so we can confirm the time.",
  phone:
    "Use digits, spaces and + only, e.g. +1 555 014 2760 — or leave it empty.",
};

type Booking = {
  programme: string;
  teacher: string;
  room: string;
  when: string;
  student: string;
  email: string;
};

export function Trial() {
  useRoute();
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const days = useMemo(() => bookableDays(10), []);
  const [programme, setProgramme] = useState(
    programmeBySlug(params.get("programme") ?? "")?.slug ?? "",
  );
  const [teacher, setTeacher] = useState(params.get("teacher") ?? "any");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [who, setWho] = useState("");
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState<Booking | null>(null);
  const { errors, setErrors, onChange } = useErrors();

  const prog = programmeBySlug(programme);
  const staff = prog ? teachersFor(prog.slug) : [];
  const chosenStaff =
    teacher === "any" ? staff : staff.filter((t) => t.slug === teacher);
  const date = days.find((d) => isoDay(d) === day);
  const slots = date ? slotsFor(date, chosenStaff) : [];
  const picked = slots.find((s) => `${s.time}|${s.teacher.slug}` === slot);

  const clear = (...names: string[]) =>
    setErrors((e) =>
      Object.fromEntries(Object.entries(e).filter(([k]) => !names.includes(k))),
    );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    const age = Number(data.get("age"));
    if (prog && age >= 3 && age <= 99) {
      if (age < prog.minAge) {
        extra.age = `${prog.name} starts at ${prog.minAge}. For a ${age}-year-old, Music Garden or piano may suit better — or ask us in the notes.`;
      } else if (prog.maxAge && age > prog.maxAge) {
        extra.age = `${prog.name} is for ages ${prog.ages}. For a ${age}-year-old, try piano, violin or Musicianship instead.`;
      }
    }
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length || !prog || !picked || !date) return;
    setSending(true);
    await pause();
    setSending(false);
    setBooked({
      programme: prog.name,
      teacher: picked.teacher.name,
      room: picked.teacher.room,
      when: `${longDate(date)} at ${clock(picked.time)}`,
      student: String(data.get("student")),
      email: String(data.get("email")),
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (booked) {
    return (
      <div className="page trial wrap">
        <section className="booked" role="status" aria-live="polite">
          <Check className="booked-mark" aria-hidden="true" />
          <h1>{booked.student} is booked in.</h1>
          <p className="lede">
            {booked.programme} with {booked.teacher}, {booked.when}, in{" "}
            {booked.room}. A confirmation would go to {booked.email}.
          </p>
          <ul className="plain-list">
            <li>
              Arrive five minutes early and ask at the front desk on Alder
              Street.
            </li>
            <li>No need to bring an instrument — we'll have one ready.</li>
            <li>
              Can't make it? Call {brand.phone} and we'll find another time.
            </li>
          </ul>
          <p className="fine">
            This is a demo: nothing was sent and no lesson was booked.
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setBooked(null);
                setDay("");
                setSlot("");
              }}
            >
              Book another trial
            </button>
            <Link to="/practice" className="btn btn-primary">
              Warm up in the practice room
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page trial">
      <header className="page-head wrap">
        <h1>{trial.title}</h1>
        <p className="lede">{trial.lede}</p>
      </header>

      <div className="wrap trial-grid">
        <form
          className="trial-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
          aria-describedby="trial-note"
        >
          <fieldset className="form-section">
            <legend>The lesson</legend>
            <div className="field-pair">
              <Field
                label="Programme"
                name="programme"
                error={errors.programme}
              >
                <select
                  required
                  value={programme}
                  onChange={(e) => {
                    setProgramme(e.target.value);
                    setTeacher("any");
                    setSlot("");
                  }}
                >
                  <option value="">Choose a programme</option>
                  {programmes.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({p.ages})
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Teacher" name="teacher">
                <select
                  value={teacher}
                  disabled={!prog}
                  onChange={(e) => {
                    setTeacher(e.target.value);
                    setSlot("");
                  }}
                >
                  <option value="any">Any teacher</option>
                  {staff.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div
              className="choice-group"
              data-invalid={errors.day ? "" : undefined}
            >
              <p className="choice-label" id="day-label">
                Day
              </p>
              <div
                className="day-chips"
                role="radiogroup"
                aria-labelledby="day-label"
                aria-describedby={errors.day ? "day-err" : undefined}
              >
                {days.map((d) => (
                  <label key={isoDay(d)} className="chip-radio">
                    <input
                      type="radio"
                      name="day"
                      value={isoDay(d)}
                      required
                      checked={day === isoDay(d)}
                      onChange={() => {
                        setDay(isoDay(d));
                        setSlot("");
                        clear("day", "slot");
                      }}
                    />
                    <span>{shortDate(d)}</span>
                  </label>
                ))}
              </div>
              {errors.day && (
                <p className="field-error" id="day-err">
                  {errors.day}
                </p>
              )}
            </div>

            <div
              className="choice-group"
              data-invalid={errors.slot ? "" : undefined}
            >
              <p className="choice-label" id="slot-label">
                Time
              </p>
              {!prog || !date ? (
                <p className="choice-empty">
                  {!prog
                    ? "Choose a programme to see open times."
                    : "Choose a day to see open times."}
                </p>
              ) : slots.length ? (
                <div
                  className="slot-list"
                  role="radiogroup"
                  aria-labelledby="slot-label"
                  aria-describedby={errors.slot ? "slot-err" : undefined}
                >
                  {slots.map((s) => {
                    const v = `${s.time}|${s.teacher.slug}`;
                    return (
                      <label key={v} className="slot-radio">
                        <input
                          type="radio"
                          name="slot"
                          value={v}
                          required
                          checked={slot === v}
                          onChange={() => {
                            setSlot(v);
                            clear("slot");
                          }}
                        />
                        <span className="slot-time">{clock(s.time)}</span>
                        <span className="slot-who">{s.teacher.name}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <p className="choice-empty">
                  {chosenStaff.length === 1
                    ? `${chosenStaff[0].name} doesn't teach`
                    : "No open trial times"}{" "}
                  on {date.toLocaleDateString("en-US", { weekday: "long" })}.
                  Try another day{teacher !== "any" ? " or any teacher" : ""}.
                </p>
              )}
              {errors.slot && (
                <p className="field-error" id="slot-err">
                  {errors.slot}
                </p>
              )}
              {prog && date && !slots.length && (
                <input
                  type="radio"
                  name="slot"
                  value=""
                  required
                  hidden
                  aria-hidden="true"
                  tabIndex={-1}
                />
              )}
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Who's learning</legend>
            <div
              className="choice-group"
              data-invalid={errors.who ? "" : undefined}
            >
              <p className="choice-label" id="who-label">
                The lessons are for
              </p>
              <div
                className="seg-radios"
                role="radiogroup"
                aria-labelledby="who-label"
              >
                {[
                  ["me", "Me"],
                  ["child", "My child"],
                ].map(([v, l]) => (
                  <label key={v} className="chip-radio">
                    <input
                      type="radio"
                      name="who"
                      value={v}
                      required
                      checked={who === v}
                      onChange={() => setWho(v)}
                    />
                    <span>{l}</span>
                  </label>
                ))}
              </div>
              {errors.who && <p className="field-error">{errors.who}</p>}
            </div>
            <div className="field-pair">
              <Field
                label="Learner's first name"
                name="student"
                required
                autoComplete={who === "me" ? "given-name" : "off"}
                error={errors.student}
              />
              <Field
                label="Age"
                name="age"
                type="number"
                inputMode="numeric"
                min={3}
                max={99}
                required
                error={errors.age}
              />
            </div>
            <div
              className="choice-group"
              data-invalid={errors.experience ? "" : undefined}
            >
              <p className="choice-label" id="exp-label">
                Experience on this instrument
              </p>
              <div
                className="seg-radios"
                role="radiogroup"
                aria-labelledby="exp-label"
              >
                {["None yet", "A little", "A few years"].map((v) => (
                  <label key={v} className="chip-radio">
                    <input type="radio" name="experience" value={v} required />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
              {errors.experience && (
                <p className="field-error">{errors.experience}</p>
              )}
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>How we reach you</legend>
            {who === "child" && (
              <Field
                label="Your name (parent or guardian)"
                name="guardian"
                required
                autoComplete="name"
                error={errors.guardian}
              />
            )}
            <div className="field-pair">
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email}
              />
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[\d \+\-\(\)]{7,}"
                error={errors.phone}
              />
            </div>
            <Field
              label="Anything the teacher should know? (optional)"
              name="notes"
              hint="A piece you love, an old injury, a nervous seven-year-old — all useful."
            >
              <textarea rows={4} maxLength={500} />
            </Field>
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={sending}
          >
            {sending ? <Loader2 className="spin" aria-hidden="true" /> : null}
            {sending ? "Booking…" : "Book the trial lesson"}
          </button>
          <p className="fine" id="trial-note">
            Demo form: nothing is sent anywhere.
          </p>
          <p className="sr-only" aria-live="polite">
            {sending ? "Booking your trial lesson" : ""}
          </p>
        </form>

        <aside className="trial-summary" aria-label="Your trial so far">
          <h2>Your trial</h2>
          <dl>
            <div>
              <dt>Programme</dt>
              <dd>{prog?.name ?? "Not chosen yet"}</dd>
            </div>
            <div>
              <dt>Teacher</dt>
              <dd>
                {picked?.teacher.name ??
                  (teacher !== "any"
                    ? staff.find((t) => t.slug === teacher)?.name
                    : undefined) ??
                  "Any"}
              </dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {picked && date
                  ? `${shortDate(date)}, ${clock(picked.time)}`
                  : date
                    ? shortDate(date)
                    : "Not chosen yet"}
              </dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>
                {picked
                  ? `${picked.teacher.room}, ${brand.address[0]}`
                  : brand.address[0]}
              </dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>30 minutes</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>Free</dd>
            </div>
          </dl>
          <ul className="promise-list">
            {trial.promises.map((p) => (
              <li key={p}>
                <Check aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
