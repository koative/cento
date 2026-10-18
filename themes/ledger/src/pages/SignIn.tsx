import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

export default function SignIn() {
  const form = useForm(
    { email: "", password: "" },
    (v) => ({
      email: !v.email.trim()
        ? "Enter the email you signed up with."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check the @ and the domain."
          : undefined,
      password:
        v.password.length < 10
          ? "Passwords on Ledger are at least 10 characters. Check for a typo."
          : undefined,
    }),
    () => navigate("/app"),
  );

  return (
    <div className="wrap auth auth-narrow">
      <div className="auth-panel">
        <h1>{signin.heading}</h1>
        <p className="lede">{signin.lede}</p>
        <form onSubmit={form.submit} noValidate>
          <Field
            form={form}
            name="email"
            label="Email"
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
            className="btn btn-primary btn-block"
            disabled={form.status === "sending"}
          >
            {form.status === "sending" ? "Signing in…" : "Sign in"}
          </button>
          <p className="quiet-note" role="status">
            {form.status === "sending"
              ? "Opening your workspace…"
              : "Demo form: nothing is sent anywhere."}
          </p>
        </form>
        <p className="auth-switch">
          New to Ledger? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
