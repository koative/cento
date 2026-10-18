import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { Logo } from "../components/Marks";

export default function SignIn() {
  const form = useForm({ email: "", password: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter the email you signed up with."
      : !EMAIL.test(v.email)
        ? "Check the email: it needs an @ and a domain."
        : undefined,
    password:
      v.password.length < 8
        ? "Passwords are at least 8 characters."
        : undefined,
  }));

  return (
    <section className="auth wrap">
      <div className="auth-card">
        <Logo />
        <h1>{signin.heading}</h1>
        <p>{signin.lede}</p>
        <div aria-live="polite">
          {form.status === "done" ? (
            <div className="form-done">
              <h2>Signed in as {form.values.email}</h2>
              <p>
                This is a demo, so there is no real account. Your workspace is
                the sample one.
              </p>
              <button
                type="button"
                className="btn btn-plum"
                onClick={() => navigate("/app")}
              >
                Continue to the workspace
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={form.submit} className="form">
              <Field
                form={form}
                name="email"
                label="Work email"
                type="email"
                autoComplete="email"
                required
              />
              <Field
                form={form}
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
              />
              <button
                className="btn btn-plum btn-block"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Signing in…" : "Sign in"}
              </button>
              <p className="quiet-note">UI only: nothing is checked or sent.</p>
            </form>
          )}
        </div>
        <p className="auth-alt">
          No account? <Link to="/app">Open the demo workspace</Link> or{" "}
          <Link to="/pricing">start free</Link>.
        </p>
      </div>
    </section>
  );
}
