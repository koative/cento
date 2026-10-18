import { useState, type FormEvent } from "react";
import { brand, images, testimonials, weddings } from "../content";
import {
  Field,
  Select,
  TextArea,
  validate,
  type Errors,
} from "../components/Field";
import { isoDate } from "../lib/delivery";

const LEAD_WEEKS = 8;

export function Weddings() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ name: string; date: string } | null>(null);
  const minDate = isoDate(new Date(Date.now() + LEAD_WEEKS * 7 * 86_400_000));

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    if (!data.getAll("services").length)
      extra.services =
        "Tick at least one kind of flowers so we know where to start.";
    const next = validate(
      form,
      {
        names: { missing: "Tell us your names, or the name of your event." },
        email: {
          missing: "Add an email so we can reply.",
          invalid:
            "That email looks incomplete. Check it has an @ and a domain.",
        },
        date: {
          missing: "Add your date, even if it's a rough one.",
          invalid: `We need at least ${LEAD_WEEKS} weeks for weddings and events. For sooner dates, call ${brand.phone}.`,
        },
        venue: {
          missing: "Add the venue, or the town if you haven't chosen one.",
        },
        guests: {
          missing: "Add a guest count; a rough number is fine.",
          invalid: "Guest numbers between 10 and 400, please. Bigger? Call us.",
        },
        budget: { missing: "Choose a budget range, or 'Not sure yet'." },
        message: {
          missing: "Tell us a little about the day.",
          invalid: "A sentence or two more, please (at least 20 characters).",
        },
      },
      extra,
    );
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent({
        name: String(data.get("names")),
        date: new Date(String(data.get("date")) + "T12:00").toLocaleDateString(
          "en-US",
          { month: "long", day: "numeric", year: "numeric" },
        ),
      });
    }, 900);
  }

  return (
    <>
      <header className="page-head page-head-split">
        <div>
          <h1>Weddings &amp; events</h1>
          <p className="lead">{weddings.intro}</p>
          <p>
            <a className="btn" href={"mailto:" + brand.weddingsEmail}>
              {brand.weddingsEmail}
            </a>
          </p>
        </div>
        <img
          src={images.jarTable.src}
          alt={images.jarTable.alt}
          width={images.jarTable.w}
          height={images.jarTable.h}
        />
      </header>

      <section className="section services" aria-labelledby="what">
        <h2 id="what">What we do</h2>
        <dl className="service-list">
          {weddings.services.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
              <dd className="service-from">{s.from}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section stories" aria-labelledby="recent">
        <h2 id="recent">Recent days</h2>
        <div className="story-grid">
          {weddings.stories.map((s) => (
            <figure key={s.couple}>
              <img
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.w}
                height={s.image.h}
                loading="lazy"
              />
              <figcaption>
                <strong>{s.couple}</strong>
                <span>
                  {s.venue}, {s.month}
                </span>
                {s.note}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="section surface-tissue timeline-section"
        aria-labelledby="how"
      >
        <div className="timeline-intro">
          <h2 id="how">From first call to last stem</h2>
          <blockquote>
            <p>“{testimonials[1].quote}”</p>
            <footer>{testimonials[1].name}</footer>
          </blockquote>
        </div>
        <ol className="timeline">
          {weddings.timeline.map((t) => (
            <li key={t.when}>
              <h3>{t.when}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section enquiry" aria-labelledby="enquire">
        <div className="enquiry-intro">
          <h2 id="enquire">Tell us about your day</h2>
          <p>
            We reply within two working days with honest thoughts, a rough
            budget check and a time for a first conversation.
          </p>
          <img
            src={images.morningRoom.src}
            alt={images.morningRoom.alt}
            width={images.morningRoom.w}
            height={images.morningRoom.h}
            loading="lazy"
          />
        </div>
        <div>
          <div aria-live="polite">
            {sent && (
              <div className="success">
                <h3>Thank you, {sent.name}.</h3>
                <p>
                  We have your enquiry for {sent.date}. Maren will reply from{" "}
                  {brand.weddingsEmail} within two working days. In this demo
                  nothing was actually sent.
                </p>
              </div>
            )}
          </div>
          {!sent && (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              aria-busy={sending}
            >
              <div className="form-grid">
                <Field
                  label="Your names"
                  name="names"
                  required
                  autoComplete="name"
                  error={errors.names}
                  placeholder="Imogen & Theo"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
                <Field
                  label="Date"
                  name="date"
                  type="date"
                  required
                  min={minDate}
                  error={errors.date}
                  hint={`At least ${LEAD_WEEKS} weeks from today.`}
                />
                <Field
                  label="Venue or town"
                  name="venue"
                  required
                  error={errors.venue}
                />
                <Field
                  label="Guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={400}
                  required
                  error={errors.guests}
                />
                <Select
                  label="Flower budget"
                  name="budget"
                  required
                  defaultValue=""
                  error={errors.budget}
                  className="span-2"
                >
                  <option value="" disabled>
                    Choose a range
                  </option>
                  {weddings.budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </Select>
              </div>
              <fieldset
                className="check-set"
                aria-describedby={
                  errors.services ? "services-error" : undefined
                }
              >
                <legend>What are you thinking of?</legend>
                <div className="pill-row">
                  {weddings.serviceOptions.map((o, i) => (
                    <label key={o} className="pill">
                      <input
                        type="checkbox"
                        name="services"
                        value={o}
                        id={i === 0 ? "f-services" : undefined}
                        aria-invalid={errors.services ? true : undefined}
                      />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
                {errors.services && (
                  <p className="field-error" id="services-error">
                    {errors.services}
                  </p>
                )}
              </fieldset>
              <TextArea
                label="About the day"
                name="message"
                rows={5}
                required
                minLength={20}
                error={errors.message}
                hint="Colours, the feeling you want, flowers you love or can't stand."
              />
              <button type="submit" className="btn" disabled={sending}>
                {sending ? "Sending…" : "Send enquiry"}
              </button>
              <p className="fine">This is a demo: nothing is sent or stored.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
