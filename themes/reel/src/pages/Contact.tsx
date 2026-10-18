import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { brand, contact, films } from "../content";
import {
  filmBySlug,
  fullDate,
  hashParam,
  pause,
  validate,
  type Errors,
} from "../lib/format";
import { Field, useErrors } from "../components/Field";

const NOTICE_DAYS = 14;
const isoDay = (d: Date) => d.toISOString().slice(0, 10);

export function Contact() {
  const [type, setType] = useState(() => {
    const asked = hashParam("type");
    return contact.types.some((t) => t.id === asked) ? asked! : "commission";
  });
  const [film] = useState(() => {
    const asked = hashParam("film");
    return asked && filmBySlug(asked) ? asked : "";
  });
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{
    name: string;
    email: string;
    summary: string;
  } | null>(null);
  const sentPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) sentPanel.current?.focus();
  }, [sent]);

  const earliest = new Date();
  earliest.setDate(earliest.getDate() + NOTICE_DAYS);
  const screening = type === "screening";
  const showFilm = screening || type === "press";
  const showBudget = type === "commission" || type === "coproduction";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    const date = String(data.get("date") ?? "");
    if (screening && date && date < isoDay(earliest)) {
      extra.date = `Screenings need ${NOTICE_DAYS} days' notice for posters and the screening copy — pick ${fullDate(isoDay(earliest))} or later.`;
    }
    const found = validate(
      form,
      {
        name: "Tell us your name so the reply is addressed to someone.",
        email:
          "Enter an email address like you@example.com — that's where the reply goes.",
        film: "Choose which film you'd like to show or write about.",
        date: "Pick a date for the screening, even a provisional one.",
        seats: "Enter roughly how many seats, between 10 and 2,000.",
        budget: "Choose a budget range, or 'Not decided yet'.",
        message:
          "Write at least 40 characters — a few lines about the film, the audience or the idea.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    await pause();
    const label = contact.types.find((t) => t.id === type)?.label ?? "";
    const chosen = filmBySlug(String(data.get("film") ?? ""));
    setSent({
      name: String(data.get("name")),
      email: String(data.get("email")),
      summary: [label, chosen?.title, date && fullDate(date)]
        .filter(Boolean)
        .join(" · "),
    });
    setSending(false);
  };

  return (
    <>
      <header className="wrap page-head">
        <h1 className="h-display">{contact.title}</h1>
        <p className="lede">{contact.intro}</p>
      </header>

      <div className="wrap contact-grid">
        <section aria-label="Enquiry form">
          <div aria-live="polite">
            {sent && (
              <div className="sent" ref={sentPanel} tabIndex={-1}>
                <Check aria-hidden="true" />
                <h2 className="h-section">
                  Thanks, {sent.name.split(" ")[0]}.
                </h2>
                <p>
                  {contact.success} We'll write to <strong>{sent.email}</strong>{" "}
                  about: {sent.summary}.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSent(null)}
                >
                  Send another enquiry
                </button>
              </div>
            )}
          </div>

          {!sent && (
            <form
              className="enquiry"
              noValidate
              onSubmit={submit}
              onChange={onChange}
              aria-busy={sending}
            >
              <fieldset className="types">
                <legend>What is it about?</legend>
                {contact.types.map((t) => (
                  <label key={t.id} className="type">
                    <input
                      type="radio"
                      name="type"
                      value={t.id}
                      checked={type === t.id}
                      onChange={() => setType(t.id)}
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </fieldset>

              <div className="form-row">
                <Field
                  label="Your name"
                  name="name"
                  required
                  autoComplete="name"
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
              </div>
              <Field
                label="Organisation"
                name="org"
                hint="Optional — a festival, school, broadcaster, society…"
                autoComplete="organization"
              />

              {showFilm && (
                <Field label="Film" name="film" error={errors.film}>
                  <select required defaultValue={film}>
                    <option value="" disabled>
                      Choose a film
                    </option>
                    {films
                      .filter((f) => !screening || f.status === "Released")
                      .map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.title} ({f.year})
                        </option>
                      ))}
                  </select>
                </Field>
              )}

              {screening && (
                <div className="form-row">
                  <Field
                    label="Proposed date"
                    name="date"
                    type="date"
                    required
                    min={isoDay(earliest)}
                    hint={`At least ${NOTICE_DAYS} days from today`}
                    error={errors.date}
                  />
                  <Field
                    label="Seats"
                    name="seats"
                    type="number"
                    inputMode="numeric"
                    min={10}
                    max={2000}
                    required
                    hint="Roughly is fine"
                    error={errors.seats}
                  />
                </div>
              )}

              {showBudget && (
                <Field label="Budget range" name="budget" error={errors.budget}>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a range
                    </option>
                    {contact.budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              )}

              <Field
                label="Message"
                name="message"
                error={errors.message}
                hint="The film, the audience, the timing — whatever you know so far."
              >
                <textarea rows={6} required minLength={40} />
              </Field>

              <div className="form-foot">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send enquiry"}
                </button>
                <p className="quiet">
                  This is a demo: nothing is sent anywhere.
                </p>
              </div>
            </form>
          )}
        </section>

        <aside className="contact-side" aria-label="Direct contacts">
          <dl>
            <div>
              <dt>General & commissions</dt>
              <dd>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </dd>
            </div>
            <div>
              <dt>Screenings & licences</dt>
              <dd>
                <a href={`mailto:${brand.distributionEmail}`}>
                  {brand.distributionEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt>Press & festivals</dt>
              <dd>
                <a href={`mailto:${brand.pressEmail}`}>{brand.pressEmail}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>
                {brand.address.join(", ")}
                <br />
                {brand.hours}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
