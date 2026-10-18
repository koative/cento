import { useState, type FormEvent } from "react";
import { Copy } from "lucide-react";
import { press, quotes, shows } from "../content";
import { monthDay, pause, validate } from "../lib/format";
import { Photo } from "../components/Cards";
import { Field, useErrors } from "../components/Field";

const messages = {
  name: "Enter your name as it should appear on the guest list.",
  outlet: "Tell us which publication, station or channel you're with.",
  email: "Enter an email like you@example.com so we can confirm.",
  show: "Pick the show you'd like to cover.",
  role: "Choose whether you're reviewing, photographing or both.",
};

export function Press() {
  const [bio, setBio] = useState<"short" | "long">("short");
  const [copied, setCopied] = useState(false);
  const text = bio === "short" ? press.bioShort : press.bioLong.join("\n\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Press</h1>
        <p className="lede">{press.intro}</p>
      </header>

      <section className="wrap press-grid press-top" aria-labelledby="bio">
        <div>
          <div className="toolbar">
            <h2 id="bio" className="display-md">
              Biography
            </h2>
            <div
              className="segmented"
              role="group"
              aria-label="Biography length"
            >
              <button
                type="button"
                aria-pressed={bio === "short"}
                onClick={() => (setBio("short"), setCopied(false))}
              >
                Short
              </button>
              <button
                type="button"
                aria-pressed={bio === "long"}
                onClick={() => (setBio("long"), setCopied(false))}
              >
                Long
              </button>
            </div>
          </div>
          {text.split("\n\n").map((p) => (
            <p key={p.slice(0, 30)} className="prose">
              {p}
            </p>
          ))}
          <button type="button" className="btn btn-line" onClick={copy}>
            <Copy aria-hidden="true" /> {copied ? "Copied" : `Copy ${bio} bio`}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Biography copied to clipboard" : ""}
          </span>
        </div>
        <aside className="credits" aria-labelledby="facts">
          <h2 id="facts" className="box-head">
            Fact sheet
          </h2>
          <dl>
            {press.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="section band-ink" aria-labelledby="said">
        <div className="wrap">
          <h2 id="said" className="display-md">
            What they said
          </h2>
          <ul className="quote-list">
            {quotes.map((q) => (
              <li key={q.source}>
                <blockquote>
                  <p>{q.text}</p>
                  <footer>
                    {q.source} · on {q.on}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="photos">
        <h2 id="photos" className="display-md">
          Photos
        </h2>
        <p className="quiet">
          High-resolution files and the album artwork are sent on request;
          credit the photographer as listed.
        </p>
        <ul className="press-photos">
          {press.pressPhotos.map((p) => (
            <li key={p.src}>
              <Photo photo={p} />
              <span>Photo: {p.credit}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap press-grid" aria-labelledby="contacts">
        <div>
          <h2 id="contacts" className="display-md">
            Who to ask
          </h2>
          <dl className="contacts">
            {press.contacts.map((c) => (
              <div key={c.role}>
                <dt>{c.role}</dt>
                <dd>
                  {c.name}
                  <br />
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Accreditation />
      </section>
    </>
  );
}

function Accreditation() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const upcoming = shows.filter((s) => !s.setlist);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    setState("done");
  }

  return (
    <section className="buy-box" aria-labelledby="accr">
      <h2 id="accr" className="box-head">
        Request a guest-list spot
      </h2>
      {state === "done" ? (
        <p className="form-done" role="status">
          Request received. Fern will confirm your spot and photo pass by email
          at least 48 hours before doors.
        </p>
      ) : (
        <form
          noValidate
          onSubmit={submit}
          onChange={onChange}
          className="stack-form"
        >
          <Field
            label="Your name"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            error={errors.name}
          />
          <Field
            label="Outlet"
            name="outlet"
            required
            error={errors.outlet}
            hint="Publication, station, podcast or channel"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            error={errors.email}
          />
          <Field label="Show" name="show" error={errors.show}>
            <select required defaultValue="">
              <option value="" disabled>
                Choose a date
              </option>
              {upcoming.map((s) => (
                <option key={s.id} value={s.id}>
                  {monthDay(s.date)} — {s.city}, {s.venue}
                </option>
              ))}
            </select>
          </Field>
          <fieldset
            className="chips"
            aria-describedby={errors.role ? "f-role-err" : undefined}
          >
            <legend>Covering as</legend>
            {["Review", "Photography", "Both"].map((r) => (
              <label key={r} className="chip">
                <input type="radio" name="role" value={r} required />
                <span>{r}</span>
              </label>
            ))}
            {errors.role && (
              <p className="field-error" id="f-role-err">
                {errors.role}
              </p>
            )}
          </fieldset>
          <button className="btn btn-red" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send request"}
          </button>
          <p className="quiet">Demo form: nothing is sent anywhere.</p>
        </form>
      )}
    </section>
  );
}
