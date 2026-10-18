import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "../router";
import { events, styleBySlug, type StudioEvent } from "../content";
import { dateParts, pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { EventRows } from "../components/Lists";

export function EventPage({ event: e }: { event: StudioEvent }) {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const start = dateParts(e.date);
  const when = start.date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const end = e.endDate
    ? dateParts(e.endDate).date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const found = validate(form, {
      rsvpName: "Add the name the spots should be under.",
      rsvpEmail: "Enter an email like you@example.com for your tickets.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    await pause();
    setBusy(false);
    const n = Number(data.get("rsvpCount"));
    setDone(
      `${n} spot${n === 1 ? "" : "s"} held for ${data.get("rsvpName")} at ${e.title}. Pay at the door; tickets are in ${data.get("rsvpEmail")}.`,
    );
    form.reset();
  };

  return (
    <>
      <section className="event-hero">
        <img
          src={e.image.src}
          alt={e.image.alt}
          width={e.image.w}
          height={e.image.h}
          style={{ objectPosition: e.image.pos }}
        />
        <div className="wrap event-hero-text">
          <nav aria-label="Breadcrumb" className="crumb">
            <Link to="/events">Events</Link> / {e.kind}
          </nav>
          <h1>{e.title}</h1>
          <p className="lede">{e.summary}</p>
        </div>
      </section>

      <dl className="wrap facts">
        <div>
          <dt>When</dt>
          <dd>
            {when}
            {end && ` – ${end}`}
          </dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{e.time}</dd>
        </div>
        <div>
          <dt>Tickets</dt>
          <dd>{e.price}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd className="num">{e.capacity} people</dd>
        </div>
      </dl>

      <div className="section wrap event-body">
        <div className="prose">
          <h2>About the night</h2>
          {e.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>Bring</h3>
          <p>{e.bring}</p>
          <h3>Styles you'll see</h3>
          <p className="tag-links">
            {e.styles.map((s) => (
              <Link key={s} to={`/styles/${s}`}>
                {styleBySlug(s)?.name}
              </Link>
            ))}
          </p>
        </div>
        <div>
          <h2>Running order</h2>
          <ol className="run">
            {e.runOfNight.map((r) => (
              <li key={r.time}>
                <time>{r.time}</time> {r.what}
              </li>
            ))}
          </ol>

          <form
            className="rsvp"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <h2>Hold a spot</h2>
            <Field
              label="Name"
              name="rsvpName"
              required
              minLength={2}
              autoComplete="name"
              error={errors.rsvpName}
            />
            <Field
              label="Email"
              name="rsvpEmail"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.rsvpEmail}
            />
            <Field label="How many" name="rsvpCount" error={errors.rsvpCount}>
              <select defaultValue="1">
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
            </Field>
            <button type="submit" className="btn btn-ink" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="spin" size={18} aria-hidden="true" />{" "}
                  Holding…
                </>
              ) : (
                "Hold my spot"
              )}
            </button>
            <p className="form-done" aria-live="polite">
              {done}
            </p>
            <p className="quiet">Demo only — nothing is sent or charged.</p>
          </form>
        </div>
      </div>

      <section className="section wrap" aria-labelledby="more-events">
        <h2 id="more-events">Also coming up</h2>
        <EventRows list={events.filter((x) => x.slug !== e.slug).slice(0, 3)} />
      </section>
    </>
  );
}
