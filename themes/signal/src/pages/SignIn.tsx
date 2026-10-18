import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

export default function SignIn() {
  const [show, setShow] = useState(false);
  const [sso, setSso] = useState(false);
  const form = useForm(
    { email: "", password: "" },
    (v) => ({
      email: !v.email.trim()
        ? "Enter the email you signed up with."
        : !EMAIL.test(v.email)
          ? "That email is missing an @ or a domain."
          : undefined,
      password:
        v.password.length >= 8
          ? undefined
          : "Passwords are at least 8 characters.",
    }),
    () => navigate("/app"),
  );

  return (
    <section className="wrap signin">
      <div className="panel signin-panel">
        <h1>{signin.heading}</h1>
        <form onSubmit={form.submit} noValidate aria-label="Sign in">
          <Field
            form={form}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
          />
          <div className="password">
            <Field
              form={form}
              name="password"
              label="Password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="reveal"
              aria-pressed={show}
              onClick={() => setShow((s) => !s)}
            >
              {show ? (
                <EyeOff size={16} aria-hidden />
              ) : (
                <Eye size={16} aria-hidden />
              )}
              <span className="visually-hidden">Show password</span>
            </button>
          </div>
          <button
            className="btn btn-primary btn-lg btn-block"
            disabled={form.status !== "idle"}
          >
            {form.status === "idle" ? "Sign in" : "Opening your workspace…"}
          </button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-block"
          onClick={() => setSso(true)}
        >
          <KeyRound size={16} aria-hidden /> Continue with SSO
        </button>
        <p className="quiet-note" role="status">
          {sso
            ? "Single sign-on is set up per company on Scale plans, so it is switched off in this demo."
            : signin.note}
        </p>
        <p className="signin-alt">
          New to Signal? <Link to="/pricing">Start free</Link> or{" "}
          <Link to="/demo">book a demo</Link>.
        </p>
      </div>
    </section>
  );
}
