import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { Logo } from "../components/Logo";

export default function SignIn() {
  const form = useForm(
    { email: "", password: "" },
    (v) => ({
      email: !v.email.trim()
        ? "Enter your work email."
        : !EMAIL.test(v.email)
          ? "Check the email: it needs an @ and a domain."
          : undefined,
      password:
        v.password.length >= 8
          ? undefined
          : "Passwords are at least 8 characters.",
    }),
    () => window.setTimeout(() => navigate("/app"), 700),
  );

  return (
    <section className="signin">
      <div className="signin-card">
        <Logo />
        <h1>{signin.h1}</h1>
        <p className="muted">{signin.lead}</p>
        <form onSubmit={form.submit} noValidate className="stack">
          <Field
            form={form}
            name="email"
            label="Work email"
            type="email"
            autoComplete="username"
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
            className="btn btn-primary btn-block"
            disabled={form.status !== "idle"}
          >
            {form.status === "sending"
              ? "Signing in…"
              : form.status === "done"
                ? "Opening workspace…"
                : "Sign in"}
          </button>
        </form>
        <p aria-live="polite" className="small">
          {form.status === "done"
            ? "Signed in to the sample workspace. Opening shipments…"
            : ""}
        </p>
        <p className="small muted">
          Demo only: credentials are checked for shape, never sent.{" "}
          <Link to="/app">Skip to the demo</Link>
        </p>
        <p className="small">
          New to Relay? <Link to="/quote">Get a rate</Link> and create an
          account when you book.
        </p>
      </div>
    </section>
  );
}
