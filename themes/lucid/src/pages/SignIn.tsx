import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

export default function SignIn({ mode }: { mode: "signin" | "signup" }) {
  const up = mode === "signup";
  const [show, setShow] = useState(false);
  const form = useForm(
    { name: "", email: "", password: "" },
    (v) => ({
      name:
        up && !v.name.trim()
          ? "Enter your name; it appears on your shared comments."
          : undefined,
      email: !v.email.trim()
        ? "Enter the email you use for Lucid."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : undefined,
      password: !v.password
        ? "Enter your password."
        : up && (v.password.length < 10 || !/\d/.test(v.password))
          ? "Use at least 10 characters, including a number."
          : undefined,
    }),
    () => window.setTimeout(() => navigate("/app"), 1100),
  );

  return (
    <div className="auth wrap">
      <section className="auth-panel">
        <h1>{up ? signin.signupHeading : signin.heading}</h1>
        <p className="lede">{up ? signin.signupLede : signin.lede}</p>
        {form.status === "done" ? (
          <p className="form-success" role="status">
            {up ? "Account ready." : "Signed in."} Opening the editor demo…
          </p>
        ) : (
          <form onSubmit={form.submit} noValidate className="auth-form">
            {up && (
              <Field
                form={form}
                name="name"
                label="Full name"
                autoComplete="name"
                required
              />
            )}
            <Field
              form={form}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
            />
            <div className="password-field">
              <Field
                form={form}
                name="password"
                label="Password"
                type={show ? "text" : "password"}
                autoComplete={up ? "new-password" : "current-password"}
                hint={
                  up ? "At least 10 characters, including a number." : undefined
                }
                required
              />
              <button
                type="button"
                className="icon-btn reveal"
                aria-pressed={show}
                aria-label={show ? "Hide password" : "Show password"}
                onClick={() => setShow((s) => !s)}
              >
                {show ? (
                  <EyeOff size={18} aria-hidden />
                ) : (
                  <Eye size={18} aria-hidden />
                )}
              </button>
            </div>
            <button
              className="btn btn-primary btn-large btn-block"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? up
                  ? "Creating your account…"
                  : "Signing in…"
                : up
                  ? "Create free account"
                  : "Sign in"}
            </button>
            <p className="sr-only" aria-live="polite">
              {form.status === "sending" ? "Working" : ""}
            </p>
          </form>
        )}
        <p className="auth-switch">
          {up ? "Already have an account? " : "New to Lucid? "}
          <Link to={up ? "/signin" : "/signup"}>
            {up ? "Sign in" : "Create a free account"}
          </Link>
        </p>
        <p className="quiet-note">{signin.note}</p>
      </section>
      <aside className="auth-aside" aria-label="From the copy desk">
        <blockquote>
          <p>{signin.quote}</p>
          <footer>{signin.quoteBy}</footer>
        </blockquote>
      </aside>
    </div>
  );
}
