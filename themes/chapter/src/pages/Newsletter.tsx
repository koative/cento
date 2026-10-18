import { useState, type FormEvent } from "react";
import { newsletter, shows } from "../content";
import { date, emailOk } from "../lib/format";
import {
  Field,
  focusFirstError,
  useErrors,
  type Errors,
} from "../components/Field";

function nextSunday() {
  const d = new Date();
  d.setDate(d.getDate() + (7 - d.getDay() || 7));
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function Newsletter() {
  const { errors, setErrors, onChange } = useErrors();
  const [lists, setLists] = useState<string[]>(["margin"]);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [sentTo, setSentTo] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const next: Errors = {};
    if (!email.trim())
      next.email = "Enter your email address so we know where to send it.";
    else if (!emailOk(email))
      next.email =
        "That address is missing something — use the form name@example.com.";
    if (!lists.length) next.lists = "Choose at least one letter to receive.";
    if (lists.includes("episodes") && !data.getAll("shows").length)
      next.shows =
        "Pick at least one show for new-episode notes, or untick “New episodes”.";
    setErrors(next);
    if (Object.keys(next).length) return focusFirstError(form, next);
    setState("sending");
    setSentTo(email.trim());
    window.setTimeout(() => setState("done"), 900);
  };

  const toggle = (id: string) => {
    setLists((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
    setErrors(({ lists: _, ...rest }) => rest);
  };

  return (
    <>
      <section className="wrap page-head">
        <h1>{newsletter.title}</h1>
        <p className="lede">{newsletter.intro}</p>
      </section>

      <section className="wrap news-grid">
        <div className="news-form-wrap">
          {state === "done" ? (
            <div className="success" role="status">
              <h2>You are on the list.</h2>
              <p>
                The next Margin goes to <strong>{sentTo}</strong> on{" "}
                {nextSunday()}. If it is not there by lunchtime, check the
                folder where newsletters go to be forgotten.
              </p>
            </div>
          ) : (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
              aria-describedby="news-note"
            >
              <h2>Subscribe</h2>
              <Field
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Field
                label="First name"
                name="name"
                autoComplete="given-name"
                hint="Optional. We use it in the greeting, nowhere else."
              />

              <fieldset
                className="checks"
                aria-describedby={errors.lists ? "lists-err" : undefined}
                data-invalid={errors.lists ? "" : undefined}
              >
                <legend>What would you like?</legend>
                {newsletter.lists.map((l, i) => (
                  <label key={l.id} className="check">
                    <input
                      type="checkbox"
                      name={i === 0 ? "lists" : `lists-${l.id}`}
                      checked={lists.includes(l.id)}
                      onChange={() => toggle(l.id)}
                    />
                    <span>
                      <strong>{l.name}</strong>
                      <span>{l.detail}</span>
                    </span>
                  </label>
                ))}
                {errors.lists && (
                  <p className="field-error" id="lists-err">
                    {errors.lists}
                  </p>
                )}
              </fieldset>

              {lists.includes("episodes") && (
                <fieldset
                  className="checks checks-inline"
                  aria-describedby={errors.shows ? "shows-err" : undefined}
                  data-invalid={errors.shows ? "" : undefined}
                >
                  <legend>New episodes from</legend>
                  {shows.map((s) => (
                    <label key={s.slug} className="check">
                      <input
                        type="checkbox"
                        name="shows"
                        value={s.slug}
                        onChange={() =>
                          setErrors(({ shows: _, ...rest }) => rest)
                        }
                      />
                      <span>{s.title}</span>
                    </label>
                  ))}
                  {errors.shows && (
                    <p className="field-error" id="shows-err">
                      {errors.shows}
                    </p>
                  )}
                </fieldset>
              )}

              <button
                type="submit"
                className="btn btn-ink"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Adding you…" : "Subscribe"}
              </button>
              <p className="quiet" id="news-note">
                {newsletter.promise} This is a demo: nothing is sent anywhere.
              </p>
            </form>
          )}
          <p className="sr-only" aria-live="polite">
            {state === "sending" ? "Subscribing…" : ""}
          </p>
        </div>

        <article
          className="letter letter-full"
          aria-label={`Sample: issue ${newsletter.sample.issue}`}
        >
          <p className="letter-head">
            {newsletter.name} · No. {newsletter.sample.issue} ·{" "}
            {newsletter.sample.date}
          </p>
          <p>{newsletter.sample.greeting}</p>
          {newsletter.sample.body.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <p className="letter-sign">— {newsletter.sample.signoff}</p>
        </article>
      </section>

      <figure className="wrap news-photo">
        <img
          src={newsletter.image.src}
          alt={newsletter.image.alt}
          loading="lazy"
          width={1600}
          height={953}
        />
        <figcaption>{newsletter.image.caption}</figcaption>
      </figure>

      <section className="wrap" aria-labelledby="archive-h">
        <h2 id="archive-h">Recent issues</h2>
        <ol className="issues">
          {newsletter.archive.map((i) => (
            <li key={i.issue}>
              <span className="issue-no">No. {i.issue}</span>
              <div>
                <h3>{i.title}</h3>
                <p>{i.excerpt}</p>
              </div>
              <time dateTime={i.date}>{date(i.date)}</time>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
