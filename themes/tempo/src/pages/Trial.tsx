import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  classes,
  instructorBySlug,
  styleBySlug,
  styles,
  trialFaq,
  trialPrice,
  type DanceClass,
} from "../content";
import {
  clock,
  longDate,
  nextDate,
  pause,
  queryParam,
  validate,
} from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { spotsLabel } from "../components/ClassItem";
import { Faq } from "../components/Lists";

type Booking = { name: string; email: string; c: DanceClass; date: Date };

const sessionsFor = (style: string) =>
  classes
    .filter((c) => c.style === style && c.level !== "Intermediate")
    .map((c) => ({ c, date: nextDate(c.day) }))
    .sort(
      (a, b) =>
        a.date.getTime() - b.date.getTime() ||
        a.c.start.localeCompare(b.c.start),
    );

const messages = {
  style: "Choose a style to try — any of them works for a first class.",
  session: "Pick a class. Only beginner and open-level classes are listed.",
  name: "Tell us your name so the desk can find your booking.",
  email: "Enter an email like you@example.com — your confirmation goes there.",
  phone:
    "Use digits, spaces or + only, e.g. +1 555 0100 200. Or leave it blank.",
  experience: "Choose the line that fits best. It just helps your teacher.",
  waiver:
    "Tick to confirm you've read the waiver — we can't let you on the floor without it.",
};

export function Trial() {
  const fromClass = classes.find((c) => c.id === queryParam("class"));
  const fromStyle = styleBySlug(queryParam("style"))?.slug;
  const [style, setStyle] = useState<string>(
    fromClass?.style ?? fromStyle ?? "",
  );
  const [session, setSession] = useState(
    fromClass && fromClass.level !== "Intermediate" ? fromClass.id : "",
  );
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);

  const sessions = style ? sessionsFor(style) : [];
  const chosen = sessions.find((s) => s.c.id === session);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length || !chosen) return;
    const data = new FormData(form);
    setBusy(true);
    await pause();
    setBusy(false);
    setDone({
      name: String(data.get("name")).split(" ")[0],
      email: String(data.get("email")),
      c: chosen.c,
      date: chosen.date,
    });
    window.scrollTo({ top: 0 });
  };

  if (done) {
    const teacher = instructorBySlug(done.c.teacher);
    return (
      <section className="wrap booked" aria-live="polite">
        <h1>You’re on the floor, {done.name}.</h1>
        <p className="lede">
          {done.c.title} with {teacher?.name}, {longDate(done.date)} at{" "}
          {clock(done.c.start)} in Studio {done.c.studio}. A confirmation and a
          map are on their way to {done.email}.
        </p>
        <dl className="facts facts-tight">
          <div>
            <dt>Arrive</dt>
            <dd>10 minutes early</dd>
          </div>
          <div>
            <dt>Wear</dt>
            <dd>{styleBySlug(done.c.style)?.wear}</dd>
          </div>
          <div>
            <dt>Pay</dt>
            <dd>${trialPrice} at the desk</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{brand.address[0]}</dd>
          </div>
        </dl>
        <div className="actions">
          <Link to={`/styles/${done.c.style}`} className="btn btn-ink">
            Read up on {styleBySlug(done.c.style)?.name}{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setDone(null)}
          >
            Book a friend in too
          </button>
        </div>
        <p className="quiet">
          This is a demo: nothing was sent, booked or charged.
        </p>
      </section>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Book a ${trialPrice} trial class.</h1>
        <p className="lede">
          Any beginner or open-level class, in any style. Pay at the desk on the
          day. If it's not for you, your second trial in another style is free.
        </p>
      </header>

      <div className="wrap trial-layout">
        <form
          className="trial-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
          aria-busy={busy}
        >
          <fieldset
            className="chips"
            aria-describedby={errors.style ? "f-style-err" : undefined}
            data-invalid={errors.style ? "" : undefined}
          >
            <legend>1. Pick a style</legend>
            {styles.map((s) => (
              <label key={s.slug} className="chip">
                <input
                  type="radio"
                  name="style"
                  value={s.slug}
                  required
                  checked={style === s.slug}
                  onChange={() => {
                    setStyle(s.slug);
                    setSession("");
                  }}
                />
                <span>{s.name}</span>
              </label>
            ))}
            {errors.style && (
              <p className="field-error" id="f-style-err">
                {errors.style}
              </p>
            )}
          </fieldset>

          <fieldset
            className="sessions"
            aria-describedby={errors.session ? "f-session-err" : undefined}
            data-invalid={errors.session ? "" : undefined}
          >
            <legend>2. Pick a class</legend>
            {!style && (
              <p className="muted">
                Choose a style above and the next seven days of
                beginner-friendly classes appear here.
              </p>
            )}
            {sessions.map(({ c, date }) => (
              <label
                key={c.id}
                className="session"
                data-full={c.spotsLeft === 0 ? "" : undefined}
              >
                <input
                  type="radio"
                  name="session"
                  value={c.id}
                  required
                  disabled={c.spotsLeft === 0}
                  checked={session === c.id}
                  onChange={() => setSession(c.id)}
                />
                <span className="session-when">
                  <b>
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </b>{" "}
                  {clock(c.start)}
                </span>
                <span className="session-what">
                  {c.title} · {instructorBySlug(c.teacher)?.name.split(" ")[0]}{" "}
                  · {c.level}
                </span>
                <span className="session-spots">{spotsLabel(c.spotsLeft)}</span>
              </label>
            ))}
            {errors.session && (
              <p className="field-error" id="f-session-err">
                {errors.session}
              </p>
            )}
          </fieldset>

          <fieldset className="details">
            <legend>3. About you</legend>
            <div className="field-row">
              <Field
                label="Name"
                name="name"
                required
                minLength={2}
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email}
              />
            </div>
            <div className="field-row">
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[0-9+ ()\-]{7,}"
                hint="Only for a text if a class is cancelled."
                error={errors.phone}
              />
              <Field
                label="Dance experience"
                name="experience"
                error={errors.experience}
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Never danced, not even at weddings</option>
                  <option>A little, a long time ago</option>
                  <option>I dance a different style</option>
                  <option>I've done this style before</option>
                </select>
              </Field>
            </div>
            <Field
              label="Anything your teacher should know? (optional)"
              name="notes"
              hint="Injuries, access needs, or just nerves. Up to 300 characters."
              error={errors.notes}
            >
              <textarea rows={3} maxLength={300} />
            </Field>
            <div
              className="check"
              data-invalid={errors.waiver ? "" : undefined}
            >
              <input
                type="checkbox"
                id="f-waiver"
                name="waiver"
                required
                aria-describedby={errors.waiver ? "f-waiver-err" : undefined}
                aria-invalid={errors.waiver ? true : undefined}
              />
              <label htmlFor="f-waiver">
                I'm fit to take part and I've read the studio waiver: dance at
                your own pace and stop if anything hurts.
              </label>
              {errors.waiver && (
                <p className="field-error" id="f-waiver-err">
                  {errors.waiver}
                </p>
              )}
            </div>
          </fieldset>

          <div className="form-submit">
            <button
              type="submit"
              className="btn btn-ink btn-lg"
              disabled={busy}
            >
              {busy ? (
                <>
                  <Loader2 className="spin" size={20} aria-hidden="true" />{" "}
                  Booking your spot…
                </>
              ) : (
                <>Book my ${trialPrice} trial</>
              )}
            </button>
            <p className="quiet">
              Demo only — nothing is sent anywhere and no card is needed.
            </p>
          </div>
        </form>

        <aside className="trial-aside" aria-labelledby="summary-title">
          <h2 id="summary-title">Your trial</h2>
          {chosen ? (
            <p className="trial-pick">
              <b>{chosen.c.title}</b>
              <br />
              {longDate(chosen.date)}, {clock(chosen.c.start)}
              <br />
              with {instructorBySlug(chosen.c.teacher)?.name} · Studio{" "}
              {chosen.c.studio}
            </p>
          ) : (
            <p className="muted">
              {style
                ? `Now pick a ${styleBySlug(style)?.name} class.`
                : "No class picked yet."}
            </p>
          )}
          <h3>Good to know</h3>
          <Faq items={trialFaq} />
        </aside>
      </div>
    </>
  );
}
