import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand } from "../content";
import { pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";

export function SignIn() {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email: "Enter the email you joined with, like you@company.com.",
      password: "Enter your password; it has at least 10 characters.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(700);
    setBusy(false);
    setDone(String(new FormData(form).get("email")));
  };

  return (
    <section className="wrap auth auth-narrow">
      <div className="auth-intro">
        <h1>Sign in</h1>
        <p className="lede">
          Your bench, projects and messages are where you left them.
        </p>
        <p className="muted">
          New to Guild? <Link to="/signup">Create an account</Link>
        </p>
      </div>
      <div className="auth-panel" aria-live="polite">
        {done ? (
          <div className="auth-done">
            <h2 ref={doneRef} tabIndex={-1}>
              Signed in as {done}.
            </h2>
            <p>Pick up where you left off.</p>
            <div className="close-actions">
              <Link to="/bench" className="btn btn-seal">
                Open your bench
              </Link>
              <Link to="/talent" className="btn btn-line">
                Browse talent
              </Link>
            </div>
            <p className="quiet">
              Demo only: there is no real account behind this screen.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              error={errors.email}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              required
              minLength={10}
              autoComplete="current-password"
              error={errors.password}
            />
            <label className="check">
              <input type="checkbox" name="remember" defaultChecked /> Keep me
              signed in on this device
            </label>
            <button
              className="btn btn-ink btn-lg btn-block"
              type="submit"
              disabled={busy}
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <p className="quiet">
              Forgotten your password? Write to{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a> and the desk
              will reset it.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
