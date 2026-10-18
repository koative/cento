import { KeyRound } from "lucide-react";
import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { Logo } from "../components/Logo";

export default function SignIn() {
  const form = useForm(
    { email: "", password: "" },
    (v) => ({
      email: !v.email.trim()
        ? "Enter the email you use for Cipher."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : undefined,
      password:
        v.password.length < 8
          ? "Passwords are at least 8 characters. Check for a missing character."
          : undefined,
    }),
    () => window.setTimeout(() => navigate("/app"), 900),
  );

  return (
    <section className="auth wrap">
      <div className="auth-card">
        <Logo />
        <h1>{signin.heading}</h1>
        <p>{signin.lede}</p>
        {form.status === "done" ? (
          <p className="form-success" role="status">
            Signed in. Opening the Alder Logistics demo workspace…
          </p>
        ) : (
          <>
            <button
              className="btn btn-quiet sso"
              type="button"
              onClick={() => navigate("/app")}
            >
              <KeyRound size={16} aria-hidden /> Continue with single sign-on
            </button>
            <p className="divider">
              <span>or with a password</span>
            </p>
            <form onSubmit={form.submit} noValidate aria-label="Sign in">
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
                minLength={8}
              />
              <button
                className="btn btn-primary"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Signing in…" : "Sign in"}
              </button>
            </form>
            <p className="quiet small" role="status">
              Demo: any valid email and an 8-character password open the sample
              workspace. Nothing is checked or stored.
            </p>
          </>
        )}
        <p className="small">
          No account yet? <Link to="/demo">Request a demo</Link>
        </p>
      </div>
    </section>
  );
}
