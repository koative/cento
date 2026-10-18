import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing, signup } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const paydays = [
  "1st and 15th",
  "Every other Friday",
  "Once a month",
  "It varies",
];

export default function SignUp() {
  const wanted = new URLSearchParams(window.location.hash.split("?")[1]).get(
    "plan",
  );
  const form = useForm(
    {
      name: "",
      email: "",
      password: "",
      plan: pricing.plans.some((p) => p.id === wanted) ? wanted! : "free",
      payday: "",
      terms: "",
    },
    (v) => ({
      name: v.name.trim() ? undefined : "Tell us what to call you.",
      email: !v.email.trim()
        ? "Enter your email; it is how you sign in."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check the @ and the domain."
          : undefined,
      password:
        v.password.length < 10
          ? `Use at least 10 characters (${10 - v.password.length} more).`
          : !/\d/.test(v.password)
            ? "Add at least one number to the password."
            : undefined,
      payday: v.payday
        ? undefined
        : "Choose when you usually get paid, so Ledger can remind you on the day.",
      terms: v.terms
        ? undefined
        : "Tick the box to accept the terms before we create the account.",
    }),
  );
  const plan = pricing.plans.find((p) => p.id === form.values.plan)!;

  return (
    <div className="wrap auth">
      <div className="auth-copy">
        <h1>{signup.heading}</h1>
        <p className="lede">{signup.lede}</p>
        <ul className="tick-list">
          {signup.perks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="auth-panel">
        <div role="status" aria-live="polite">
          {form.status === "done" && (
            <div className="form-done">
              <Check size={28} aria-hidden />
              <h2>
                Welcome to Ledger, {form.values.name.trim().split(" ")[0]}.
              </h2>
              <p>
                Your {plan.name} account is ready. We sent a confirmation link
                to <strong>{form.values.email}</strong>. Your first payday
                reminder is set for “{form.values.payday.toLowerCase()}”.
              </p>
              <Link to="/app" className="btn btn-primary">
                Open the demo workspace
              </Link>
            </div>
          )}
        </div>
        {form.status !== "done" && (
          <form onSubmit={form.submit} noValidate>
            <Field
              form={form}
              name="name"
              label="Your name"
              autoComplete="name"
              required
            />
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
              autoComplete="new-password"
              hint="10 or more characters, including a number."
              required
              minLength={10}
            />
            <fieldset className="plan-pick">
              <legend>Plan</legend>
              {pricing.plans.map((p) => (
                <label key={p.id}>
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={form.values.plan === p.id}
                    onChange={() => form.set("plan", p.id)}
                  />
                  <span>
                    <strong>{p.name}</strong>
                    <small className="num">
                      {p.monthly
                        ? `$${p.monthly}/month or $${p.yearly}/year`
                        : "No card needed"}
                    </small>
                  </span>
                </label>
              ))}
            </fieldset>
            <Field
              form={form}
              name="payday"
              label="When do you usually get paid?"
              options={paydays}
              required
            />
            <Field
              form={form}
              name="terms"
              type="checkbox"
              label="I accept the terms of service and the privacy notice."
              required
            />
            <button
              className="btn btn-primary btn-block"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? "Creating your account…"
                : plan.monthly
                  ? `Start ${plan.name} — 30 days free`
                  : "Create free account"}
            </button>
            <p className="quiet-note">
              Demo form: nothing is sent anywhere and no account is created.
            </p>
            <p className="auth-switch">
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
