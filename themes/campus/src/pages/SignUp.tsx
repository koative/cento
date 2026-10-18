import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { courses, pricing, signup } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const initial = {
  name: "",
  email: "",
  password: "",
  plan: "membership",
  billing: "yearly",
  course: "",
  terms: "",
};

export default function SignUp() {
  const success = useRef<HTMLDivElement>(null);
  const form = useForm(initial, (v) => ({
    name:
      v.name.trim().length < 2
        ? "Enter your name as you'd like instructors to see it."
        : undefined,
    email: !v.email.trim()
      ? "Enter your email address — it's how you sign in."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete — check for an @ and a domain, like sam@example.com."
        : undefined,
    password:
      v.password.length < 10
        ? `Use at least 10 characters — ${10 - v.password.length} more to go.`
        : !/\d/.test(v.password)
          ? "Add at least one number to your password."
          : undefined,
    course:
      v.plan === "course" && !v.course
        ? "Pick the course you want to own."
        : undefined,
    terms:
      v.terms !== "yes"
        ? "Tick the box to accept the learner terms before continuing."
        : undefined,
  }));
  const plan = pricing.plans.find((p) => p.id === form.values.plan)!;
  const recurring = plan.id !== "course";
  const price =
    plan.id === "course"
      ? (courses.find((c) => c.title === form.values.course)?.price ??
        plan.monthly)
      : form.values.billing === "yearly"
        ? plan.yearly
        : plan.monthly;

  useEffect(() => {
    if (form.status === "done") success.current?.focus();
  }, [form.status]);

  return (
    <div className="wrap page auth">
      <div className="auth-intro">
        <h1>{signup.heading}</h1>
        <p className="lede">{signup.text}</p>
        <ul className="ticks">
          {signup.perks.map((p) => (
            <li key={p}>
              <Check size={18} aria-hidden /> {p}
            </li>
          ))}
        </ul>
        <p className="muted">
          Already learning with us? <Link to="/signin">Sign in</Link>
        </p>
      </div>

      <div className="auth-panel">
        <p className="sr-only" aria-live="polite">
          {form.status === "done"
            ? `Account created. ${signup.successTitle}`
            : ""}
        </p>
        {form.status === "done" ? (
          <div className="success" ref={success} tabIndex={-1}>
            <h2>{signup.successTitle}</h2>
            <p>
              Welcome, {form.values.name.trim().split(" ")[0]}. We've set up
              your workspace on the <strong>{plan.name}</strong> plan
              {recurring
                ? ` (${form.values.billing})`
                : ` for ${form.values.course}`}
              . A confirmation would go to {form.values.email}.
            </p>
            <div className="actions">
              <Link to="/learn" className="btn btn-primary">
                Go to your desk <ArrowRight size={18} aria-hidden />
              </Link>
              <Link to="/courses" className="btn btn-quiet">
                Browse courses
              </Link>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={form.submit} className="form">
            <h2 className="form-title">Your details</h2>
            <Field
              form={form}
              name="name"
              label="Full name"
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
              hint="At least 10 characters, including a number."
              required
            />

            <fieldset className="choice-group">
              <legend>Plan</legend>
              {pricing.plans.map((p) => (
                <label key={p.id} className="choice">
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={form.values.plan === p.id}
                    onChange={() => form.set("plan", p.id)}
                  />
                  <span className="choice-body">
                    <span className="choice-title">{p.name}</span>
                    <span className="choice-text">{p.blurb}</span>
                  </span>
                </label>
              ))}
            </fieldset>

            {recurring ? (
              <fieldset className="billing">
                <legend>Billing</legend>
                <div className="segmented">
                  {(["monthly", "yearly"] as const).map((b) => (
                    <label key={b}>
                      <input
                        type="radio"
                        name="billing"
                        value={b}
                        checked={form.values.billing === b}
                        onChange={() => form.set("billing", b)}
                      />
                      <span>{b === "monthly" ? "Monthly" : "Yearly"}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <Field
                form={form}
                name="course"
                label="Course"
                options={courses.map((c) => c.title)}
                required
              />
            )}

            <p className="order-line num">
              {plan.id === "teams"
                ? `$${price} per seat, per month${form.values.billing === "yearly" ? ", billed yearly" : ""}`
                : recurring
                  ? `$${price} a month${form.values.billing === "yearly" ? `, $${price * 12} billed yearly` : ""}`
                  : `$${price} once`}{" "}
              · first 14 days refundable
            </p>

            <Field
              form={form}
              name="terms"
              label="I accept the learner terms and the community guidelines."
              type="checkbox"
            />

            <button
              className="btn btn-primary btn-block btn-lg"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? "Creating your account…"
                : "Create account"}
            </button>
            <p className="form-quiet">
              This is a demo: nothing is sent, stored on a server or charged.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
