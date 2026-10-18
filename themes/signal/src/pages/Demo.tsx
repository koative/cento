import { Link } from "../router";
import { brand, demo } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const FREE_MAIL = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "proton.me",
];

export default function Demo() {
  const form = useForm(
    {
      name: "",
      email: "",
      company: "",
      size: "",
      volume: "",
      question: "",
      consent: "",
    },
    (v) => ({
      name: v.name.trim()
        ? undefined
        : "Tell us your name so the specialist knows who to greet.",
      email: !v.email.trim()
        ? "Enter your work email; that is where the invite goes."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : FREE_MAIL.includes(v.email.split("@")[1]?.toLowerCase())
            ? "Use your work email so we can match you with the right specialist."
            : undefined,
      company: v.company.trim() ? undefined : "Add your company name.",
      size: v.size ? undefined : "Pick the closest team size.",
      volume: v.volume ? undefined : "Pick a volume, or choose “Not sure yet”.",
      question:
        v.question.trim().length >= 20
          ? undefined
          : "Describe the question in a sentence or two (20 characters or more).",
      consent: v.consent
        ? undefined
        : "Tick the box so we may email you about this demo.",
    }),
  );
  const done = form.status === "done";

  return (
    <>
      <header className="page-head wrap">
        <h1>{demo.heading}</h1>
        <p className="lede">{demo.intro}</p>
      </header>

      <section className="wrap section-tight form-layout">
        <div className="panel form-panel">
          {!done && (
            <form onSubmit={form.submit} noValidate aria-label="Book a demo">
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
                  options={demo.teamSizes}
                  required
                />
                <Field
                  form={form}
                  name="volume"
                  label="Monthly events"
                  options={demo.volumes}
                  required
                />
              </div>
              <Field
                form={form}
                name="question"
                label="What do you want to answer?"
                hint="For example: why do Android users abandon checkout more than iOS users?"
                multiline
                required
              />
              <Field
                form={form}
                name="consent"
                type="checkbox"
                label="Email me about this demo. Nothing else, no newsletter."
              />
              <button
                className="btn btn-primary btn-lg"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Booking…" : "Request a demo"}
              </button>
            </form>
          )}
          <div role="status" className={done ? "form-done" : undefined}>
            {done ? (
              <>
                <h2>Request received, {form.values.name.split(" ")[0]}.</h2>
                <p>{demo.success}</p>
                <div className="actions">
                  <Link to="/app" className="btn btn-primary">
                    Explore the demo workspace meanwhile
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={form.reset}
                  >
                    Book another
                  </button>
                </div>
              </>
            ) : (
              <p className="quiet-note">{demo.note}</p>
            )}
          </div>
        </div>

        <aside className="form-aside">
          <h2>{demo.expectTitle}</h2>
          <ul className="ticks">
            {demo.expect.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <h2>{demo.writeTitle}</h2>
          <p>
            <a href={`mailto:${brand.sales}`}>{brand.sales}</a>
            <br />
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <br />
            {demo.hours}
          </p>
        </aside>
      </section>
    </>
  );
}
