import { CalendarClock } from "lucide-react";
import { Link } from "../router";
import { demo, home } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const PERSONAL = /@(gmail|yahoo|hotmail|outlook|icloud|proton)\./i;

export default function Demo() {
  const form = useForm(
    {
      name: "",
      email: "",
      company: "",
      size: "",
      provider: "",
      frameworks: "",
      notes: "",
    },
    (v) => ({
      name: !v.name.trim()
        ? "Enter your name so the engineer knows who to ask for."
        : undefined,
      email: !v.email.trim()
        ? "Enter your work email; the invite goes there."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : PERSONAL.test(v.email)
            ? "Use your work address so we can set up a sandbox for your company."
            : undefined,
      company:
        v.company.trim().length < 2 ? "Enter your company name." : undefined,
      size: !v.size
        ? "Choose a company size so we bring the right pricing."
        : undefined,
      provider: !v.provider ? "Choose an option, even “Not sure”." : undefined,
      notes:
        v.notes.length > 600
          ? `Keep it under 600 characters (now ${v.notes.length}).`
          : undefined,
    }),
  );
  const picked = form.values.frameworks
    ? form.values.frameworks.split("|")
    : [];

  return (
    <>
      <header className="page-head wrap">
        <h1>{demo.heading}</h1>
        <p className="lede">{demo.lede}</p>
      </header>

      <section className="wrap demo-grid">
        <div className="form-panel">
          {form.status === "done" ? (
            <div className="form-success-block" role="status">
              <CalendarClock size={28} aria-hidden />
              <h2>Request received, {form.values.name.split(" ")[0]}</h2>
              <p>
                A customer engineer would now reply to {form.values.email} with
                two times for a thirty-minute call and a sandbox invite for{" "}
                {form.values.company}. In this demo, nothing was sent.
              </p>
              <div className="actions">
                <Link to="/app" className="btn btn-primary">
                  Explore the demo workspace meanwhile
                </Link>
                <button className="btn btn-quiet" onClick={form.reset}>
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={form.submit} noValidate aria-label="Request a demo">
              <div className="field-row">
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
                  label="Company size"
                  options={demo.sizes}
                  required
                />
              </div>
              <Field
                form={form}
                name="provider"
                label="Where do your identities live?"
                options={demo.providers}
                required
              />
              <fieldset className="check-group inline">
                <legend>Frameworks you are audited against (optional)</legend>
                {demo.frameworks.map((f) => (
                  <label key={f}>
                    <input
                      type="checkbox"
                      checked={picked.includes(f)}
                      onChange={() =>
                        form.set(
                          "frameworks",
                          (picked.includes(f)
                            ? picked.filter((x) => x !== f)
                            : [...picked, f]
                          ).join("|"),
                        )
                      }
                    />
                    {f}
                  </label>
                ))}
              </fieldset>
              <Field
                form={form}
                name="notes"
                label="Anything we should prepare? (optional)"
                multiline
                hint="E.g. “Audit window opens Jan 15; 14 systems in scope.” Up to 600 characters."
              />
              <button
                className="btn btn-primary"
                disabled={form.status === "sending"}
              >
                {form.status === "sending"
                  ? "Sending request…"
                  : "Request a demo"}
              </button>
              <p className="quiet small">
                Demo form: nothing is sent anywhere.
              </p>
            </form>
          )}
        </div>

        <aside className="demo-aside" aria-labelledby="agenda-title">
          <h2 id="agenda-title">What the thirty minutes covers</h2>
          <ol className="agenda">
            {demo.agenda.map((a) => (
              <li key={a.time}>
                <span className="num">{a.time}</span>
                <p>{a.text}</p>
              </li>
            ))}
          </ol>
          <figure className="aside-quote">
            <blockquote>
              <p>{home.quote.text}</p>
            </blockquote>
            <figcaption>
              {home.quote.name}, {home.quote.role}
            </figcaption>
          </figure>
        </aside>
      </section>
    </>
  );
}
