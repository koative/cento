import { KeyRound } from "lucide-react";
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
          ? "That email looks incomplete."
          : undefined,
      password: v.password ? undefined : "Enter your password.",
    }),
    () => navigate("/app"),
  );

  return (
    <div className="wrap page auth-page auth-narrow">
      <div className="auth-card">
        <h1>{signin.heading}</h1>
        <form noValidate onSubmit={form.submit} className="stack-form">
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
            className="btn btn-signal btn-lg"
            disabled={form.status === "sending"}
          >
            {form.status === "sending" ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        <button
          type="button"
          className="btn btn-quiet btn-lg wide"
          onClick={() => navigate("/app")}
        >
          <KeyRound size={17} aria-hidden /> Continue with SAML SSO
        </button>
        <p className="muted small">
          Demo only — any valid email and password opens the dashboard with
          sample data. New here? <Link to="/signup">Create a workspace</Link>
        </p>
      </div>
    </div>
  );
}
