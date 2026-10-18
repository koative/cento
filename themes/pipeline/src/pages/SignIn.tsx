import { ArrowRight } from "lucide-react";
import { Link, navigate } from "../router";
import { signin } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

export default function SignIn() {
  const form = useForm(
    { email: "", password: "" },
    (v) => ({
      email: !v.email.trim()
        ? "Enter the email your admin invited."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : undefined,
      password: !v.password
        ? "Enter your password."
        : v.password.length < 10
          ? "Passwords are at least 10 characters. Check for a typo."
          : undefined,
    }),
    () => navigate("/app"),
  );

  return (
    <div className="wrap signin">
      <section
        className="sheet form-sheet signin-card"
        aria-labelledby="h-signin"
      >
        <h1 id="h-signin">{signin.h1}</h1>
        <p>{signin.lede}</p>
        <form onSubmit={form.submit} noValidate>
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
            minLength={10}
          />
          <button
            className="btn btn-primary btn-lg"
            disabled={form.status === "sending"}
            aria-busy={form.status === "sending"}
          >
            {form.status === "sending" ? "Signing in…" : "Sign in"}
          </button>
          <p className="sr-only" role="status">
            {form.status === "sending" ? "Signing in" : ""}
          </p>
        </form>
        <p className="quiet-note">
          Demo screen: any valid email and a 10-character password open the demo
          workspace.
        </p>
        <Link to="/app" className="text-link">
          Skip and open the demo workspace <ArrowRight size={16} aria-hidden />
        </Link>
      </section>
    </div>
  );
}
