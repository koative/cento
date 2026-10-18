import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { paceGroups, photos, rideRules, rides } from "../content";
import { Field, FieldError, validate, type Errors } from "../components/Field";
import { Profile } from "../components/Profile";

const messages = {
  "club-name": { missing: "Enter your name so the ride leader can say hello." },
  "club-email": {
    missing: "Enter your email for route changes and cancellations.",
    invalid: "Check the email — it needs an @ and a domain.",
  },
  pace: {
    missing:
      "Choose the pace group you'd like to start with. You can always move.",
  },
  first: { missing: "Pick the ride you're planning to come to first." },
  rules: { missing: "Tick to confirm you've read the ride rules above." },
};

export function Rides() {
  const [surface, setSurface] = useState("All");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [joined, setJoined] = useState<{ name: string; ride: string } | null>(
    null,
  );
  const done = useRef<HTMLHeadingElement>(null);
  const shown = rides.filter((r) => surface === "All" || r.surface === surface);

  useEffect(() => {
    if (joined) done.current?.focus();
  }, [joined]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    const ride = rides.find((r) => r.id === data.get("first"))!;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setJoined({
        name: String(data.get("club-name")).split(" ")[0],
        ride: `${ride.name}, ${ride.day} ${ride.time}`,
      });
    }, 800);
  }

  return (
    <div className="page">
      <header className="page-head page-head-media">
        <div>
          <h1>Rides club</h1>
          <p className="lead">
            Five group rides a week, all leaving from the shop or the station.
            Free to join, no club kit required, and on the social rides nobody
            gets dropped.
          </p>
        </div>
        <img
          src={photos.rideHills}
          alt="A lone rider climbing a quiet road through grassy hills at dusk"
          width={1400}
          height={930}
        />
      </header>

      <section className="section">
        <div className="section-head">
          <h2>Every week</h2>
          <div className="chips" role="group" aria-label="Surface">
            {["All", "Road", "Gravel", "Path"].map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                aria-pressed={surface === s}
                onClick={() => setSurface(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <ol className="ride-list" aria-live="polite">
          {shown.map((r) => (
            <li key={r.id} className="ride">
              <div className="ride-when">
                <span className="ride-day">{r.day}</span>
                <span className="num">{r.time}</span>
              </div>
              <div className="ride-body">
                <h3>{r.name}</h3>
                <p>{r.note}</p>
                <p className="ride-meta">
                  <span className="num">{r.distance} km</span>
                  <span className="num">{r.climb} m climbing</span>
                  <span>{r.pace}</span>
                  <span>{r.surface}</span>
                  <span>From {r.start}</span>
                </p>
              </div>
              <Profile ride={r} />
            </li>
          ))}
        </ol>
      </section>

      <section className="section pace">
        <h2>Pick your pace</h2>
        <dl className="pace-groups">
          {paceGroups.map((p) => (
            <div key={p.id}>
              <dt>
                {p.name} <span className="num">{p.speed}</span>
              </dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="photo-pair">
        <img
          src={photos.rideForest}
          alt="A rider descending a curving road through dark pine forest"
          width={1400}
          height={788}
          loading="lazy"
        />
        <img
          src={photos.rideBars}
          alt="Hands on a drop handlebar, riding into a low sun on an empty road"
          width={1400}
          height={933}
          loading="lazy"
        />
      </section>

      <section className="section join">
        <div>
          <h2>Ride rules</h2>
          <ul className="rules">
            {rideRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Join the club</h2>
          {joined ? (
            <div className="ticket" role="status" aria-live="polite">
              <h3 ref={done} tabIndex={-1}>
                Welcome to the club, {joined.name}
              </h3>
              <p>
                We've pencilled you in for the <strong>{joined.ride}</strong>.
                Look for the rider in the orange gilet — that's the back marker,
                and they'll introduce you.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setJoined(null)}
              >
                Sign up someone else
              </button>
            </div>
          ) : (
            <form className="form" noValidate onSubmit={submit}>
              <div className="field-pair">
                <Field
                  label="Name"
                  name="club-name"
                  required
                  autoComplete="name"
                  error={errors["club-name"]}
                />
                <Field
                  label="Email"
                  name="club-email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors["club-email"]}
                />
              </div>
              <fieldset
                aria-describedby={errors.pace ? "f-pace-error" : undefined}
              >
                <legend>Starting pace group</legend>
                <div className="time-row">
                  {paceGroups.map((p) => (
                    <label key={p.id} className="size size-wide">
                      <input type="radio" name="pace" value={p.id} required />
                      <span>{p.name}</span>
                    </label>
                  ))}
                </div>
                <FieldError id="f-pace" error={errors.pace} />
              </fieldset>
              <div className="field">
                <label htmlFor="f-first">First ride</label>
                <select
                  id="f-first"
                  name="first"
                  required
                  defaultValue=""
                  aria-invalid={errors.first ? true : undefined}
                  aria-describedby={errors.first ? "f-first-error" : undefined}
                >
                  <option value="" disabled>
                    Choose a ride
                  </option>
                  {rides.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.day} {r.time} — {r.name}
                    </option>
                  ))}
                </select>
                <FieldError id="f-first" error={errors.first} />
              </div>
              <div>
                <label className="check">
                  <input
                    type="checkbox"
                    name="rules"
                    required
                    aria-describedby={
                      errors.rules ? "f-rules-error" : undefined
                    }
                  />
                  <span>
                    I've read the ride rules and I'll bring a spare tube.
                  </span>
                </label>
                <FieldError id="f-rules" error={errors.rules} />
              </div>
              <button type="submit" className="btn btn-wide" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                    Signing you up…
                  </>
                ) : (
                  "Join the rides club"
                )}
              </button>
              <p className="muted small">
                Demo form — nothing is sent anywhere.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
