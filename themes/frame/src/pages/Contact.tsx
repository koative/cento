import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, findFrame } from "../content";
import { marks } from "../lib/store";
import { MarksTray } from "../components/Viewer";
import {
  Field,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const kinds = [
  {
    id: "commission",
    label: "A commission",
    prompt: "Who is it for, where will it run, and when do you need it?",
  },
  {
    id: "licensing",
    label: "Licensing a series frame",
    prompt: "Which frames, for what use, and for how long?",
  },
  {
    id: "prints",
    label: "Prints or a studio visit",
    prompt: "Which print, what size, or which day you would like to visit.",
  },
  {
    id: "other",
    label: "Something else",
    prompt: "Tell me what you have in mind.",
  },
];

const budgets = [
  "Under $2,500",
  "$2,500 – $6,000",
  "$6,000 – $15,000",
  "Over $15,000",
  "Not sure yet",
];

const messages: Messages = {
  name: { missing: "Enter your name so I know who I am writing to." },
  email: {
    missing: "Enter an email address for my reply.",
    invalid: "That email looks incomplete — check it has an @ and a domain.",
  },
  message: {
    missing: "Write a few lines about the job or question.",
    invalid: "Add a little more detail — at least 20 characters.",
  },
};

export function Contact() {
  const wanted = new URLSearchParams(window.location.hash.split("?")[1]).get(
    "type",
  );
  const [kind, setKind] = useState(
    kinds.some((k) => k.id === wanted) ? wanted! : "commission",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState("");
  const marked = marks.use();
  const current = kinds.find((k) => k.id === kind)!;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.split(" ")[0];
    const attached = marked
      .map(findFrame)
      .filter((f) => f !== undefined).length;
    window.setTimeout(() => {
      setSending(false);
      setSent(
        `Thank you, ${name}. Your note about ${current.label.toLowerCase()}${attached ? `, with ${attached} marked ${attached === 1 ? "frame" : "frames"},` : ""} is with me. ${brand.reply}`,
      );
      form.reset();
    }, 900);
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>Contact the studio</h1>
        <p className="lede">
          Commissions, licensing, prints or a visit to the darkroom.{" "}
          {brand.reply}
        </p>
      </header>

      <div className="contact-layout">
        <section aria-labelledby="h-enquiry">
          <h2 id="h-enquiry" className="visually-hidden">
            Enquiry form
          </h2>
          {sent ? (
            <div className="confirmation" aria-live="polite">
              <p className="confirm-head">{sent}</p>
              <p className="quiet">
                This is a demonstration: nothing was sent anywhere.
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSent("")}
                >
                  Write another note
                </button>
                <Link to="/series" className="text-link">
                  Back to the series
                </Link>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="form">
              <fieldset className="kind span-2">
                <legend>What is it about?</legend>
                {kinds.map((k) => (
                  <label key={k.id} className="chip-radio">
                    <input
                      type="radio"
                      name="kind"
                      value={k.id}
                      checked={kind === k.id}
                      onChange={() => setKind(k.id)}
                    />
                    <span>{k.label}</span>
                  </label>
                ))}
              </fieldset>
              <Field label="Your name" name="name" error={errors.name}>
                {(p) => <input {...p} required autoComplete="name" />}
              </Field>
              <Field label="Email" name="email" error={errors.email}>
                {(p) => (
                  <input {...p} type="email" required autoComplete="email" />
                )}
              </Field>
              {kind === "commission" && (
                <>
                  <Field label="Publication or company (optional)" name="org">
                    {(p) => <input {...p} autoComplete="organization" />}
                  </Field>
                  <Field
                    label="Shoot dates (optional)"
                    name="dates"
                    hint="A window is fine, e.g. second week of March."
                  >
                    {(p) => <input {...p} />}
                  </Field>
                  <Field
                    label="Budget (optional)"
                    name="budget"
                    className="span-2"
                  >
                    {(p) => (
                      <select {...p} defaultValue="">
                        <option value="">Prefer not to say</option>
                        {budgets.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                </>
              )}
              <Field
                label="Your message"
                name="message"
                error={errors.message}
                hint={current.prompt}
                className="span-2"
              >
                {(p) => <textarea {...p} required minLength={20} rows={6} />}
              </Field>
              <div className="span-2 attached">
                <p className="attached-head">
                  Marked frames sent with this note
                </p>
                <MarksTray />
              </div>
              <p className="quiet span-2">
                Nothing is sent from this demo; the form only checks itself.
              </p>
              <button
                type="submit"
                className="btn btn-solid span-2"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send to Noor"}
              </button>
            </form>
          )}
        </section>

        <aside className="contact-aside" aria-label="Studio details">
          <div>
            <h2>Write or call</h2>
            <p>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <br />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </p>
          </div>
          <div>
            <h2>The studio</h2>
            <address>
              {brand.studio.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p>{brand.visits}</p>
          </div>
          <div>
            <h2>Availability</h2>
            <p>
              {brand.booking}. One day a fortnight stays open for editorial work
              on short notice.
            </p>
          </div>
          <div>
            <h2>Elsewhere</h2>
            <p>
              <a href={brand.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <br />
              <a href={brand.vimeo} target="_blank" rel="noreferrer">
                Vimeo
              </a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
