import { X } from "lucide-react";
import { Link } from "../router";
import { about, brand, workById } from "../content";
import { price } from "../lib/format";
import { isEmail, useForm } from "../lib/form";
import { shortlist, toggleShortlist } from "../lib/store";
import { Field } from "../components/Field";
import { WorkPlate } from "../components/WorkCard";

const topics = [
  "Buying a work",
  "A private viewing",
  "A group visit",
  "Press and images",
  "Something else",
];

export function Enquire() {
  const saved = shortlist
    .use()
    .map(workById)
    .filter((w) => w !== undefined);
  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);

  const f = useForm(
    "enquire",
    {
      topic: saved.length ? topics[0] : "",
      name: "",
      email: "",
      phone: "",
      date: "",
      message: "",
      consent: "",
    },
    (v) => ({
      topic: !v.topic ? "Choose what your enquiry is about." : undefined,
      name:
        v.name.trim().length < 2
          ? "Enter your name so we know who to reply to."
          : undefined,
      email: !v.email.trim()
        ? "Enter your email address."
        : !isEmail(v.email)
          ? "Check the email: it needs an @ and a domain, like name@example.com."
          : undefined,
      phone:
        v.phone.trim() && v.phone.replace(/\D/g, "").length < 7
          ? "Check the phone number, or leave it empty."
          : undefined,
      date:
        v.date && v.date < tomorrow
          ? "Choose a date from tomorrow onwards."
          : v.date && new Date(v.date + "T12:00").getDay() === 1
            ? "We are closed on Mondays. Choose another day."
            : undefined,
      message:
        !saved.length && v.message.trim().length < 10
          ? "Tell us a little more: at least 10 characters."
          : undefined,
      consent: !v.consent
        ? "Tick the box so we can store your details to reply."
        : undefined,
    }),
  );

  return (
    <div className="page">
      <header className="page-head">
        <h1 className="display">Enquire</h1>
        <p className="lede">
          Ask about a work, book a private viewing or bring a group.{" "}
          {about.team[1].name} or another director replies within one working
          day.
        </p>
      </header>

      <div className="enquire">
        <aside className="enquire-list" aria-labelledby="list-title">
          <h2 id="list-title">Your list</h2>
          {saved.length === 0 ? (
            <p>
              No works saved yet. Save works in the{" "}
              <Link to="/viewing-room">viewing room</Link> and they will appear
              here, or just write to us below.
            </p>
          ) : (
            <ul>
              {saved.map((w) => (
                <li key={w.id} className="list-item">
                  <Link
                    to={`/viewing-room/${w.id}`}
                    className="list-thumb"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <WorkPlate work={w} />
                  </Link>
                  <div>
                    <Link to={`/viewing-room/${w.id}`}>
                      <cite>{w.title}</cite>, {w.year}
                    </Link>
                    <p className="quiet">{price(w)}</p>
                  </div>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => toggleShortlist(w.id)}
                    aria-label={`Remove ${w.title} from your list`}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <dl className="contact-lines">
            <div>
              <dt>Sales</dt>
              <dd>
                <a href={"mailto:" + brand.salesEmail}>{brand.salesEmail}</a>
              </dd>
            </div>
            <div>
              <dt>Press</dt>
              <dd>
                <a href={"mailto:" + brand.pressEmail}>{brand.pressEmail}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </dd>
            </div>
          </dl>
        </aside>

        <div className="enquire-form">
          <div aria-live="polite">
            {f.status === "done" && (
              <div className="success-panel">
                <h2>Thank you, {f.values.name.trim().split(" ")[0]}</h2>
                <p>
                  We have your enquiry about{" "}
                  {saved.length
                    ? `${saved.length} ${saved.length === 1 ? "work" : "works"}`
                    : f.values.topic.toLowerCase()}
                  {f.values.date
                    ? ` and will confirm a viewing for ${new Date(f.values.date + "T12:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`
                    : ""}
                  . A reply will reach {f.values.email} within one working day.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={f.reset}
                >
                  Send another enquiry
                </button>
              </div>
            )}
          </div>

          {f.status !== "done" && (
            <form noValidate onSubmit={(e) => f.submit(e)}>
              <Field
                id={f.id("topic")}
                label="What is it about?"
                error={f.errors.topic}
              >
                <select required {...f.bind("topic")}>
                  <option value="">Choose one</option>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <div className="field-row">
                <Field id={f.id("name")} label="Name" error={f.errors.name}>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    {...f.bind("name")}
                  />
                </Field>
                <Field id={f.id("email")} label="Email" error={f.errors.email}>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    {...f.bind("email")}
                  />
                </Field>
              </div>
              <div className="field-row">
                <Field
                  id={f.id("phone")}
                  label="Phone (optional)"
                  error={f.errors.phone}
                >
                  <input type="tel" autoComplete="tel" {...f.bind("phone")} />
                </Field>
                <Field
                  id={f.id("date")}
                  label="Preferred viewing date (optional)"
                  error={f.errors.date}
                  hint="Tuesday to Sunday"
                >
                  <input type="date" min={tomorrow} {...f.bind("date")} />
                </Field>
              </div>
              <Field
                id={f.id("message")}
                label={
                  saved.length
                    ? "Anything we should know? (optional)"
                    : "Your message"
                }
                error={f.errors.message}
              >
                <textarea
                  rows={5}
                  required={!saved.length}
                  {...f.bind("message")}
                />
              </Field>
              <div
                className="field check"
                data-invalid={f.errors.consent ? "" : undefined}
              >
                <label>
                  <input
                    type="checkbox"
                    id={f.id("consent")}
                    checked={f.values.consent === "yes"}
                    onChange={(e) =>
                      f.set("consent", e.target.checked ? "yes" : "")
                    }
                    aria-invalid={f.errors.consent ? true : undefined}
                    aria-describedby={
                      f.errors.consent ? f.id("consent") + "-error" : undefined
                    }
                  />
                  <span>
                    Folio may keep my details to answer this enquiry. We never
                    share them.
                  </span>
                </label>
                {f.errors.consent && (
                  <p className="error" id={f.id("consent") + "-error"}>
                    {f.errors.consent}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-wide"
                disabled={f.status === "sending"}
              >
                {f.status === "sending"
                  ? "Sending…"
                  : saved.length
                    ? `Send enquiry about ${saved.length} ${saved.length === 1 ? "work" : "works"}`
                    : "Send enquiry"}
              </button>
              <p className="quiet">Demo form: nothing is sent anywhere.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
