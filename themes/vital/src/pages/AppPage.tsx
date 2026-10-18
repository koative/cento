import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { app } from "../content";
import { pause, validate } from "../lib/care";
import { Phone } from "../components/Phone";
import { Field, useErrors } from "../components/Field";

export function AppPage() {
  const { errors, setErrors, onChange } = useErrors();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      mobile: "Enter a 10-digit mobile number, like 555 013 4284.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await pause(800);
    setStatus("done");
    form.reset();
  };

  return (
    <>
      <section className="page-head app-head">
        <div className="wrap app-head-grid">
          <div>
            <h1>{app.title}</h1>
            <p className="lede">{app.lede}</p>
            <div className="actions">
              <a
                className="btn btn-primary"
                href="https://apps.apple.com/"
                target="_blank"
                rel="noreferrer"
              >
                Download for iPhone
              </a>
              <a
                className="btn btn-quiet"
                href="https://play.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                Get it on Android
              </a>
            </div>
            <form
              className="sms-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
              aria-busy={status === "sending"}
            >
              <Field
                label="Text me a download link"
                name="mobile"
                type="tel"
                required
                pattern="[\d\s\(\)\+\-]{10,16}"
                autoComplete="tel"
                placeholder="555 013 4284"
                error={errors.mobile}
              />
              <button
                type="submit"
                className="btn btn-quiet"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send link"}
              </button>
            </form>
            <p className="news-done" aria-live="polite">
              {status === "done" &&
                "Link on its way — it expires in 24 hours. (Demo: no text is actually sent.)"}
            </p>
          </div>
          <div className="phones">
            <Phone screen="home" />
            <Phone screen="note" />
            <Phone screen="rx" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What lives in the app</h2>
          <dl className="feature-list">
            {app.features.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section band">
        <div className="wrap split">
          <div>
            <h2>No download? No problem.</h2>
            <p>
              Everything in the app works in a phone or laptop browser,
              including video visits. The check-in on this site is the same one
              the app uses.
            </p>
          </div>
          <div className="actions">
            <Link to="/check-in" className="btn btn-primary btn-lg">
              Check in from the browser
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
