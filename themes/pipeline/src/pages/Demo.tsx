import { Check } from "lucide-react";
import { Link } from "../router";
import { demo } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const initial = {
  name: "",
  email: "",
  company: "",
  size: "",
  tool: "",
  notes: "",
  consent: "",
};

export default function Demo() {
  const form = useForm(initial, (v) => ({
    name: v.name.trim()
      ? undefined
      : "Enter your name so we know who to ask for.",
    email: !v.email.trim()
      ? "Enter a work email so we can send the calendar invite."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete. Check it has a name, an @ and a domain."
        : /@(gmail|yahoo|hotmail|outlook)\./i.test(v.email)
          ? "Use your work email; we set up the demo workspace on your company domain."
          : undefined,
    company: v.company.trim() ? undefined : "Enter your company name.",
    size: v.size
      ? undefined
      : "Choose your team size so we bring the right plan.",
    consent: v.consent
      ? undefined
      : "Tick the box so we can email you about this demo.",
  }));

  return (
    <div className="wrap demo-layout">
      <header className="demo-intro">
        <h1>{demo.h1}</h1>
        <p className="lede">{demo.lede}</p>
        <ul className="ticks">
          {demo.points.map((p) => (
            <li key={p}>
              <Check size={18} aria-hidden /> {p}
            </li>
          ))}
        </ul>
      </header>

      <section className="sheet form-sheet" aria-labelledby="h-form">
        {form.status === "done" ? (
          <div className="form-done" role="status">
            <span className="stamp stamp-won">Booked</span>
            <h2 id="h-form" tabIndex={-1} ref={(el) => el?.focus()}>
              Thanks, {form.values.name.split(" ")[0]}. We'll be in touch today.
            </h2>
            <p>
              A calendar link is on its way to{" "}
              <strong>{form.values.email}</strong>. If you can, reply with a
              spreadsheet export of your open deals and we'll run the demo on
              them.
            </p>
            <div className="cta-row">
              <Link to="/app" className="btn btn-primary">
                Explore the demo board meanwhile
              </Link>
              <button className="btn btn-quiet" onClick={form.reset}>
                Book another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={form.submit} noValidate>
            <h2 id="h-form">Request a time</h2>
            <div className="field-row">
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
                label="Work email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="field-row">
              <Field
                form={form}
                name="company"
                label="Company"
                autoComplete="organization"
                required
              />
              <Field
                form={form}
                name="size"
                label="Sales team size"
                options={demo.sizes}
                required
              />
            </div>
            <Field
              form={form}
              name="tool"
              label="What you use today (optional)"
              options={demo.tools}
            />
            <Field
              form={form}
              name="notes"
              label="What should the demo cover? (optional)"
              multiline
              placeholder="e.g. Forecasting across two regions, migrating from spreadsheets"
            />
            <Field
              form={form}
              name="consent"
              label="Email me about this demo. Nothing else."
              type="checkbox"
            />
            <button
              className="btn btn-primary btn-lg"
              disabled={form.status === "sending"}
              aria-busy={form.status === "sending"}
            >
              {form.status === "sending" ? "Booking…" : "Request a demo"}
            </button>
            <p className="quiet-note">Demo form: nothing is sent anywhere.</p>
            <p className="sr-only" role="status">
              {form.status === "sending" ? "Booking your demo" : ""}
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
