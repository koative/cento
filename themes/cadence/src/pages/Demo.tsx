import { CalendarCheck } from "lucide-react";
import { demo } from "../content";
import { EMAIL, Field, focusOnMount, useForm } from "../components/form";
import { formatDate } from "../lib/format";

const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);

export default function Demo() {
  const form = useForm(
    {
      name: "",
      email: "",
      company: "",
      size: "",
      roles: "",
      date: "",
      message: "",
    },
    (v) => {
      const day = v.date ? new Date(v.date + "T12:00:00").getDay() : -1;
      return {
        name: v.name.trim()
          ? undefined
          : "Enter your name so the specialist knows who to greet.",
        email: !v.email.trim()
          ? "Enter your work email. We send the calendar invite there."
          : !EMAIL.test(v.email)
            ? "That email looks incomplete. Check it has a name, an @ and a domain."
            : undefined,
        company: v.company.trim() ? undefined : "Enter your company name.",
        size: v.size
          ? undefined
          : "Choose your team size so we can prepare the right example.",
        roles: v.roles
          ? undefined
          : "Choose roughly how many roles you hire for in a year.",
        date: !v.date
          ? "Pick a preferred day for the walkthrough."
          : v.date < tomorrow
            ? "Pick a day from tomorrow onwards."
            : day === 0 || day === 6
              ? "We run walkthroughs Monday to Friday. Pick a weekday."
              : undefined,
      };
    },
  );

  return (
    <section className="wrap page-hero form-page">
      <div className="form-intro">
        <h1>{demo.hero.title}</h1>
        <p className="lede">{demo.hero.lede}</p>
        <h2>{demo.agendaTitle}</h2>
        <ol className="agenda">
          {demo.agenda.map((a) => (
            <li key={a.time}>
              <span className="num">{a.time}</span>
              {a.text}
            </li>
          ))}
        </ol>
      </div>

      <div className="form-card">
        {form.status === "done" ? (
          <div className="form-done" role="status" aria-live="polite">
            <CalendarCheck size={28} aria-hidden />
            <h2 tabIndex={-1} ref={focusOnMount}>
              Walkthrough requested for {formatDate(form.values.date, true)}.
            </h2>
            <p>
              Thanks, {form.values.name.split(" ")[0]}. A product specialist
              will email {form.values.email} within one working day with two
              time slots for {form.values.company}.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={form.reset}
            >
              Request another walkthrough
            </button>
          </div>
        ) : (
          <form onSubmit={form.submit} noValidate>
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
            <Field
              form={form}
              name="company"
              label="Company"
              autoComplete="organization"
              required
            />
            <div className="field-row">
              <Field
                form={form}
                name="size"
                label="Team size"
                options={demo.sizes}
                required
              />
              <Field
                form={form}
                name="roles"
                label="Roles hired per year"
                options={demo.roles}
                required
              />
            </div>
            <Field
              form={form}
              name="date"
              label="Preferred day"
              type="date"
              min={tomorrow}
              hint="Monday to Friday, 8:00 to 17:00 Pacific."
              required
            />
            <Field
              form={form}
              name="message"
              label="Anything we should know? (optional)"
              multiline
              placeholder="The role you are hiring for next, the tool you use today…"
            />
            <button
              className="btn btn-primary btn-lg"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? "Sending request…"
                : "Request walkthrough"}
            </button>
            <p className="quiet-note" role="status">
              Demo form: nothing is sent anywhere.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
