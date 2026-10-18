import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { camps, lessonTimes, lessons } from "../content";
import { Field, useErrors } from "../components/Field";
import {
  hashQuery,
  isoDate,
  longDate,
  money,
  pause,
  validate,
} from "../lib/util";

type Kind = "lesson" | "camp";
type Done = {
  ref: string;
  title: string;
  when: string;
  surfers: number;
  total: number;
  due: number;
  email: string;
};

const messages = {
  lessonDate: "Choose a lesson day between today and three months from now.",
  departure: "Choose one of the open departure dates.",
  name: "Enter the lead surfer's full name.",
  email: "Enter an email address like you@example.com for your confirmation.",
  phone:
    "Enter a mobile number with at least 7 digits; we text the confirmed lesson time.",
  swim: "Tick to confirm everyone can swim 50 m. It's a safety requirement for every lesson and camp.",
};

export function Book() {
  const q = useRef(hashQuery()).current;
  const today = new Date();
  const min = isoDate(today);
  const max = isoDate(
    new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()),
  );

  const [kind, setKind] = useState<Kind>(q.camp ? "camp" : "lesson");
  const [lessonId, setLessonId] = useState(
    lessons.some((l) => l.id === q.lesson) ? q.lesson : lessons[0].id,
  );
  const [lessonDate, setLessonDate] = useState(
    q.date && !q.camp && q.date >= min && q.date <= max ? q.date : "",
  );
  const [time, setTime] = useState(
    lessonTimes.includes(q.time) ? q.time : "09:00",
  );
  const [campId, setCampId] = useState(
    camps.some((c) => c.id === q.camp) ? q.camp : camps[0].id,
  );
  const camp = camps.find((c) => c.id === campId) ?? camps[0];
  const [departure, setDeparture] = useState(
    camp.departures.find((d) => d.date === q.date && d.spots)?.date ?? "",
  );
  const [surfers, setSurfers] = useState(1);
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [done, setDone] = useState<Done | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const lesson = lessons.find((l) => l.id === lessonId) ?? lessons[0];
  const seat = camp.departures.find((d) => d.date === departure);
  const maxSurfers =
    kind === "lesson"
      ? lesson.id === "private"
        ? 3
        : 6
      : Math.max(1, Math.min(6, seat?.spots ?? 6));
  const count = Math.min(surfers, maxSurfers);
  const total =
    kind === "lesson"
      ? lesson.id === "private"
        ? lesson.price + 60 * (count - 1)
        : lesson.price * count
      : camp.price * count;
  const due = kind === "camp" ? Math.round(total * 0.3) : total;

  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

  function pickCamp(id: string) {
    setCampId(id);
    setDeparture("");
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    const data = new FormData(form);
    setDone({
      ref: `DR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      title: kind === "lesson" ? lesson.name : camp.name,
      when:
        kind === "lesson"
          ? `${longDate(lessonDate)}, around ${time}`
          : `Departing ${longDate(departure)}`,
      surfers: count,
      total,
      due,
      email: String(data.get("email")),
    });
    setState("idle");
  }

  if (done) {
    return (
      <section className="wrap book-done" aria-live="polite">
        <Check className="done-mark" aria-hidden="true" size={40} />
        <h1 ref={doneHeading} tabIndex={-1}>
          You're booked in. See you on the sand.
        </h1>
        <p className="lede">
          Reference <strong className="num">{done.ref}</strong>. A confirmation
          would go to {done.email}.
        </p>
        <dl className="summary-list">
          <div>
            <dt>Booking</dt>
            <dd>{done.title}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{done.when}</dd>
          </div>
          <div>
            <dt>Surfers</dt>
            <dd className="num">{done.surfers}</dd>
          </div>
          <div>
            <dt>
              {done.due === done.total
                ? "Total, paid at the hut"
                : "Deposit due now"}
            </dt>
            <dd className="num">{money(done.due)}</dd>
          </div>
        </dl>
        <p>
          {kind === "lesson"
            ? "We'll text the confirmed start time by 7 pm the evening before, once we've read the forecast. Arrive 20 minutes early to get into your wetsuit."
            : "Your camp pack with the kit list, travel notes and a room form arrives within a day. The balance is due 60 days before departure."}
        </p>
        <div className="actions">
          <button
            type="button"
            className="btn btn-ink"
            onClick={() => setDone(null)}
          >
            Make another booking
          </button>
          <Link to="/forecast" className="btn btn-line">
            Check the surf report
          </Link>
        </div>
        <p className="quiet">
          Demo booking: nothing was sent, charged or stored.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Book a lesson or camp</h1>
          <p className="lede">
            Pick a session and a preferred time. Lessons are paid at the hut;
            camps need a 30% deposit. Free cancellation up to 24 hours before
            any lesson.
          </p>
        </div>
      </section>

      <div className="wrap book-layout">
        <form
          className="book-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
        >
          <fieldset className="pills big-pills">
            <legend>What are you booking?</legend>
            {(["lesson", "camp"] as const).map((k) => (
              <label key={k}>
                <input
                  type="radio"
                  name="kind"
                  value={k}
                  checked={kind === k}
                  onChange={() => setKind(k)}
                />
                <span>{k === "lesson" ? "A lesson" : "A surf camp"}</span>
              </label>
            ))}
          </fieldset>

          {kind === "lesson" ? (
            <fieldset className="form-group">
              <legend>Lesson</legend>
              <Field label="Lesson" name="lesson">
                <select
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                >
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} — {l.who.toLowerCase()} ({money(l.price)})
                    </option>
                  ))}
                </select>
              </Field>
              <div className="field-row">
                <Field
                  label="Day"
                  name="lessonDate"
                  type="date"
                  required
                  min={min}
                  max={max}
                  value={lessonDate}
                  onChange={(e) => setLessonDate(e.target.value)}
                  error={errors.lessonDate}
                />
                <Field
                  label="Preferred start"
                  name="time"
                  hint="Final time texted the evening before."
                >
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {lessonTimes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </fieldset>
          ) : (
            <fieldset className="form-group">
              <legend>Camp</legend>
              <Field label="Camp" name="camp">
                <select
                  value={campId}
                  onChange={(e) => pickCamp(e.target.value)}
                >
                  {camps.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.place} ({money(c.price)})
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Departure"
                name="departure"
                error={errors.departure}
              >
                <select
                  value={departure}
                  required
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="">Choose a date</option>
                  {camp.departures.map((d) => (
                    <option key={d.date} value={d.date} disabled={!d.spots}>
                      {longDate(d.date)} —{" "}
                      {d.spots
                        ? `${d.spots} ${d.spots === 1 ? "place" : "places"} left`
                        : "full"}
                    </option>
                  ))}
                </select>
              </Field>
            </fieldset>
          )}

          <fieldset className="form-group">
            <legend>Who's surfing</legend>
            <div className="field-row">
              <Field
                label="Number of surfers"
                name="surfers"
                hint={
                  kind === "lesson" && lesson.id === "groms"
                    ? "Children aged 7 to 13."
                    : `Up to ${maxSurfers} on this booking.`
                }
              >
                <select
                  value={count}
                  onChange={(e) => setSurfers(Number(e.target.value))}
                >
                  {Array.from({ length: maxSurfers }, (_, n) => (
                    <option key={n} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Experience" name="experience">
                <select defaultValue="never">
                  <option value="never">Never surfed</option>
                  <option value="few">A few lessons</option>
                  <option value="green">Riding green waves</option>
                  <option value="turning">Turning and trimming</option>
                </select>
              </Field>
            </div>
            <div className="field-row">
              <Field
                label="Lead surfer's full name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Wetsuit size"
                name="wetsuit"
                hint="For the lead surfer; others at the hut."
              >
                <select defaultValue="M">
                  {[
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL",
                    "Kids 8",
                    "Kids 10",
                    "Kids 12",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="field-row">
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
                label="Mobile"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[\d\s+\-\(\)]{7,}"
                placeholder="+1 555 010 0000"
                error={errors.phone}
              />
            </div>
            <Field
              label="Anything we should know?"
              name="notes"
              hint="Injuries, nerves, a coach you'd like, dietary needs for camps."
            >
              <textarea rows={3} />
            </Field>
          </fieldset>

          <div className="check" data-invalid={errors.swim ? "" : undefined}>
            <input
              id="f-swim"
              type="checkbox"
              name="swim"
              required
              aria-invalid={errors.swim ? true : undefined}
              aria-describedby={errors.swim ? "f-swim-err" : undefined}
            />
            <label htmlFor="f-swim">
              Everyone on this booking can swim 50 m and is comfortable in water
              out of their depth.
            </label>
            {errors.swim && (
              <p className="field-error" id="f-swim-err">
                {errors.swim}
              </p>
            )}
          </div>

          <button className="btn btn-ink btn-lg" disabled={state === "sending"}>
            {state === "sending"
              ? "Booking…"
              : kind === "lesson"
                ? `Book for ${money(total)}`
                : `Reserve and pay ${money(due)} deposit`}
            {state === "sending" ? null : (
              <ArrowRight aria-hidden="true" size={18} />
            )}
          </button>
          <p className="quiet">
            Demo form: nothing is sent, charged or stored.
          </p>
        </form>

        <aside className="book-summary" aria-labelledby="h-summary">
          <h2 id="h-summary">Your booking</h2>
          <dl className="summary-list">
            <div>
              <dt>{kind === "lesson" ? "Lesson" : "Camp"}</dt>
              <dd>{kind === "lesson" ? lesson.name : camp.name}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {kind === "lesson"
                  ? lessonDate
                    ? `${longDate(lessonDate)}, ${time}`
                    : "Choose a day"
                  : departure
                    ? longDate(departure)
                    : "Choose a departure"}
              </dd>
            </div>
            <div>
              <dt>Surfers</dt>
              <dd className="num">{count}</dd>
            </div>
            <div>
              <dt>Includes</dt>
              <dd>
                {kind === "lesson"
                  ? `${lesson.duration}, board, wetsuit, shower`
                  : camp.length}
              </dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd className="num">{money(total)}</dd>
            </div>
            {kind === "camp" ? (
              <div>
                <dt>Deposit today</dt>
                <dd className="num">{money(due)}</dd>
              </div>
            ) : null}
          </dl>
          <p className="quiet">
            {kind === "lesson"
              ? "Pay at the hut on the day, card or cash."
              : "Balance due 60 days before departure."}
          </p>
        </aside>
      </div>
    </>
  );
}
