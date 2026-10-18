import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { crafts, signup } from "../content";
import { pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";

type Role = "hire" | "work";

function strength(pw: string) {
  const score = [
    pw.length >= 10,
    pw.length >= 14,
    /[A-Z]/.test(pw) && /[a-z]/.test(pw),
    /\d/.test(pw),
    /[^A-Za-z0-9]/.test(pw),
  ].filter(Boolean).length;
  return score <= 1 ? "Weak" : score <= 3 ? "Fair" : "Strong";
}

export function SignUp() {
  const [role, setRole] = useState<Role>("hire");
  const [pw, setPw] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ name: string; role: Role } | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add your full name; it appears on contracts and invoices.",
      email: "Enter an email like you@company.com.",
      password: "Use at least 10 characters. A short sentence works well.",
      craft: "Choose the craft you want to be reviewed in.",
      portfolio: "Add a link to your portfolio starting with https://",
      terms: "Tick the box to accept the member terms and the charter.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    setDone({
      name: String(new FormData(form).get("name")).split(" ")[0],
      role,
    });
  };

  return (
    <section className="wrap auth">
      <div className="auth-intro">
        <h1>{signup.title}</h1>
        <p className="lede">{signup.lede}</p>
        <ul className="checks">
          {signup[role].map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="muted">
          Already on the register? <Link to="/signin">Sign in</Link>
        </p>
      </div>

      <div className="auth-panel" aria-live="polite">
        {done ? (
          <div className="auth-done">
            <h2 ref={doneRef} tabIndex={-1}>
              Welcome, {done.name}.
            </h2>
            {done.role === "hire" ? (
              <p>
                Your client account is ready. Post your first project or start a
                bench.
              </p>
            ) : (
              <p>
                Your application is started. Next, ask two members to vouch for
                you; a reviewer from your craft will be in touch within a week.
              </p>
            )}
            <div className="close-actions">
              <Link
                to={done.role === "hire" ? "/post" : "/how-it-works"}
                className="btn btn-seal"
              >
                {done.role === "hire" ? "Post a project" : "How reviews work"}
              </Link>
            </div>
            <p className="quiet">
              Demo only: no account was created and nothing was sent.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <div
              className="segmented segmented-wide"
              role="radiogroup"
              aria-label="I want to"
            >
              <label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "hire"}
                  onChange={() => setRole("hire")}
                />
                <span>Hire members</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  checked={role === "work"}
                  onChange={() => setRole("work")}
                />
                <span>Apply as a freelancer</span>
              </label>
            </div>
            <Field
              label="Full name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
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
              autoComplete="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              hint={
                pw ? `Strength: ${strength(pw)}` : "At least 10 characters."
              }
              error={errors.password}
            />
            {role === "work" && (
              <>
                <Field label="Your craft" name="craft" error={errors.craft}>
                  <select required defaultValue="">
                    <option value="">Choose a craft…</option>
                    {crafts.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Portfolio link"
                  name="portfolio"
                  type="url"
                  required
                  placeholder="https://"
                  error={errors.portfolio}
                />
              </>
            )}
            <div className="field" data-invalid={errors.terms ? "" : undefined}>
              <label className="check">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  aria-invalid={errors.terms ? true : undefined}
                  aria-describedby={errors.terms ? "f-terms-err" : undefined}
                />
                <span>
                  I accept the member terms and the{" "}
                  <Link to="/about">Guild charter</Link>.
                </span>
              </label>
              {errors.terms && (
                <p className="field-error" id="f-terms-err">
                  {errors.terms}
                </p>
              )}
            </div>
            <button
              className="btn btn-seal btn-lg btn-block"
              type="submit"
              disabled={busy}
            >
              {busy
                ? "Creating account…"
                : role === "hire"
                  ? "Create client account"
                  : "Start application"}
            </button>
            <p className="quiet">Demo form: nothing is sent anywhere.</p>
          </form>
        )}
      </div>
    </section>
  );
}
