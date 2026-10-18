import { useRef, useState, type FormEvent } from "react";
import { CalendarPlus, Phone } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  callPrep,
  callTimes,
  callTopics,
  revenueBands,
  structures,
} from "../content";
import { downloadIcs, startOfDay } from "../lib/deadlines";
import { fmt } from "../lib/format";
import { pause, validate } from "../lib/forms";
import { Field, useErrors } from "../components/Field";

/** The next eight weekdays, starting tomorrow. */
function callDays(today = new Date()) {
  const days: Date[] = [];
  for (let d = startOfDay(today); days.length < 8;) {
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    if (d.getDay() % 6 !== 0) days.push(d);
  }
  return days;
}

/** "13:30" → "1:30 pm" */
function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** ponytail: fake availability so the picker has gaps; swap for a real calendar feed. */
const taken = (day: Date, i: number) => (day.getDate() * 7 + i * 3) % 5 === 0;

const messages = {
  time: "Choose a time — greyed-out slots are already booked.",
  topic: "Tell us what the call is about so the right person joins.",
  structure: "Choose how the business is set up, or “Not sure yet”.",
  name: "Add your name so we know who to ask for.",
  business: "Add the business name — a working name is fine.",
  email: "Enter an email like name@business.com for the video link.",
  phone: "Use digits, spaces or dashes, e.g. 555 014 2290 — or leave it blank.",
};

type Booked = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  when: Date;
};

export function Book() {
  const days = callDays();
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [booked, setBooked] = useState<Booked | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const done = useRef<HTMLDivElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    const data = new FormData(form);
    const [h, m] = (time ?? "9:00").split(":").map(Number);
    const d = days[day];
    setBooked({
      name: String(data.get("name")),
      email: String(data.get("email")),
      phone: String(data.get("phone") ?? ""),
      topic: String(data.get("topic")),
      when: new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m),
    });
    setState("idle");
    requestAnimationFrame(() => done.current?.focus());
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Book a call</h1>
        <p className="lede">
          Twenty minutes with someone who does this every day. You'll leave
          knowing which package fits, what it costs and when we could start.
        </p>
      </header>

      <div className="wrap book-grid">
        <aside className="book-aside" aria-label="What to expect">
          <ol className="prep">
            {callPrep.map((p) => (
              <li key={p.title}>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
          <p className="book-phone">
            Rather talk now?{" "}
            <a href={brand.phoneHref}>
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
            <br />
            {brand.hours}
          </p>
        </aside>

        <div className="book-main">
          <p className="sr-only" aria-live="polite">
            {booked ? `Call booked for ${fmt.long.format(booked.when)}.` : ""}
          </p>
          {booked ? (
            <div className="booked" ref={done} tabIndex={-1}>
              <h2>You're booked, {booked.name.split(" ")[0]}.</h2>
              <p className="booked-when">
                {fmt.long.format(booked.when)} at{" "}
                {clock(`${booked.when.getHours()}:${booked.when.getMinutes()}`)}{" "}
                Central
              </p>
              <p>
                A video link is on its way to <strong>{booked.email}</strong>
                {booked.phone
                  ? ` — and we'll ring ${booked.phone} if the video drops`
                  : ""}
                . Topic: {booked.topic.toLowerCase()}.
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    downloadIcs("tally-call.ics", [
                      {
                        uid: `call-${booked.when.getTime()}`,
                        start: booked.when,
                        end: new Date(booked.when.getTime() + 20 * 60_000),
                        allDay: false,
                        title: `Call with ${brand.name}`,
                        description: `20-minute discovery call about: ${booked.topic}. ${brand.phone}`,
                      },
                    ])
                  }
                >
                  <CalendarPlus aria-hidden="true" /> Add to my calendar
                </button>
                <Link to="/resources" className="btn btn-ghost">
                  Read while you wait
                </Link>
              </div>
              <p className="fine">Demo only: nothing was sent or stored.</p>
            </div>
          ) : (
            <form
              className="book-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <fieldset className="slot-set">
                <legend>Pick a day</legend>
                <div className="slot-days">
                  {days.map((d, i) => (
                    <label key={d.toDateString()} className="slot">
                      <input
                        type="radio"
                        name="day"
                        required
                        checked={day === i}
                        onChange={() => {
                          setDay(i);
                          if (time && taken(d, callTimes.indexOf(time)))
                            setTime(null);
                        }}
                      />
                      <span>
                        <small>{fmt.weekday.format(d)}</small>
                        {fmt.short.format(d)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset
                className="slot-set"
                data-invalid={errors.time ? "" : undefined}
                aria-describedby={errors.time ? "time-err" : undefined}
              >
                <legend>Pick a time (Central)</legend>
                <div className="slot-times">
                  {callTimes.map((t, i) => {
                    const busy = taken(days[day], i);
                    return (
                      <label
                        key={t}
                        className="slot"
                        data-busy={busy ? "" : undefined}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          required
                          disabled={busy}
                          checked={time === t}
                          onChange={() => setTime(t)}
                        />
                        <span>
                          {clock(t)}
                          {busy && <small>Booked</small>}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.time && (
                  <p className="field-error" id="time-err">
                    {errors.time}
                  </p>
                )}
              </fieldset>

              <div className="form-row">
                <Field
                  label="What's the call about?"
                  name="topic"
                  error={errors.topic}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    {callTopics.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="How is the business set up?"
                  name="structure"
                  error={errors.structure}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    {structures.map((s) => (
                      <option key={s.id}>{s.label}</option>
                    ))}
                    <option>Not sure yet</option>
                  </select>
                </Field>
              </div>

              <fieldset className="chips is-form">
                <legend>Yearly revenue (optional)</legend>
                {revenueBands.map((r) => (
                  <label key={r}>
                    <input type="radio" name="revenue" value={r} />
                    <span>{r}</span>
                  </label>
                ))}
              </fieldset>

              <div className="form-row">
                <Field
                  label="Your name"
                  name="name"
                  autoComplete="name"
                  required
                  error={errors.name}
                />
                <Field
                  label="Business name"
                  name="business"
                  autoComplete="organization"
                  required
                  error={errors.business}
                />
              </div>
              <div className="form-row">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  pattern={String.raw`[0-9 +\(\)\-]{7,20}`}
                  error={errors.phone}
                />
              </div>
              <Field
                label="Anything we should know? (optional)"
                name="notes"
                hint="Software you use, how far behind the books are, a deadline you're worried about."
                error={errors.notes}
              >
                <textarea rows={4} maxLength={600} />
              </Field>

              <div className="form-submit">
                <button
                  className="btn btn-primary"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "Booking your call…" : "Book my call"}
                </button>
                <p className="fine">Demo form — nothing is sent anywhere.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
