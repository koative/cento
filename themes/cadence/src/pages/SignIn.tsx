import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { signin } from "../content";
import { EMAIL, Field, focusOnMount, useForm } from "../components/form";
import { Logo } from "../components/Logo";

export default function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const form = useForm({ name: "", email: "", password: "" }, (v) => ({
    name:
      mode === "up" && !v.name.trim()
        ? "Enter your name for your workspace profile."
        : undefined,
    email: !v.email.trim()
      ? "Enter the email you use for Cadence."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete. Check it has a name, an @ and a domain."
        : undefined,
    password: !v.password
      ? "Enter your password."
      : mode === "up" && v.password.length < 10
        ? `Use at least 10 characters. This one has ${v.password.length}.`
        : undefined,
  }));

  return (
    <section className="wrap auth">
      <div className="auth-card">
        <Logo />
        <h1>{mode === "in" ? signin.heading : signin.headingUp}</h1>
        <div
          className="segmented-buttons"
          role="group"
          aria-label="Choose form"
        >
          <button
            type="button"
            aria-pressed={mode === "in"}
            onClick={() => (setMode("in"), form.reset())}
          >
            Sign in
          </button>
          <button
            type="button"
            aria-pressed={mode === "up"}
            onClick={() => (setMode("up"), form.reset())}
          >
            Start free
          </button>
        </div>
        {form.status === "done" ? (
          <div className="form-done" role="status" aria-live="polite">
            <h2 tabIndex={-1} ref={focusOnMount}>
              {mode === "in"
                ? "You are signed in."
                : "Your workspace is ready."}
            </h2>
            <p>
              This is a demo, so we will take you to North Studio's workspace,
              already full of candidates.
            </p>
            <Link to="/app" className="btn btn-primary">
              Go to the workspace <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        ) : (
          <form onSubmit={form.submit} noValidate>
            {mode === "up" && (
              <Field
                form={form}
                name="name"
                label="Your name"
                autoComplete="name"
                required
              />
            )}
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
              autoComplete={mode === "in" ? "current-password" : "new-password"}
              hint={mode === "up" ? "At least 10 characters." : undefined}
              required
            />
            <button
              className="btn btn-primary btn-lg"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? "Checking…"
                : mode === "in"
                  ? "Sign in"
                  : "Create workspace"}
            </button>
            <p className="quiet-note" role="status">
              Demo form: no account is created and nothing is sent.
            </p>
          </form>
        )}
        <p className="auth-alt">
          Just looking? <Link to="/app">Open the demo workspace</Link> without
          an account.
        </p>
      </div>
    </section>
  );
}
