import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, images, locations, plans, tour } from "../content";
import { clock, isoDate, longDate, pause, validate } from "../lib";
import { Field, useErrors } from "../components/Field";

type Sent = { name: string; house: string; date: string; time: string };

export function Tour() {
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const confirm = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sent) confirm.current?.scrollIntoView({ block: "center" });
  }, [sent]);
  const now = new Date();
  const min = isoDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
  );
  const max = isoDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 60),
  );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const date = String(new FormData(form).get("date") ?? "");
    const day = date ? new Date(`${date}T12:00`).getDay() : -1;
    const found = validate(
      form,
      {
        name: "Add your name so your host knows who to look for.",
        email: "Enter an email like you@example.com for the confirmation.",
        phone:
          "Use digits, spaces and + only, like +1 555 0100 200, or leave it empty.",
        house: "Pick the house you'd like to see.",
        date: `Choose a weekday between ${longDate(min)} and ${longDate(max)}.`,
        time: "Pick one of the tour times.",
      },
      day === 0 || day === 6
        ? {
            date: "Tours run Monday to Friday. Pick a weekday, or come to a Friday Table instead.",
          }
        : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    const d = new FormData(form);
    setSending(true);
    await pause();
    setSending(false);
    setSent({
      name: String(d.get("name")).split(" ")[0],
      house: locations.find((l) => l.id === d.get("house"))?.name ?? "",
      date,
      time: String(d.get("time")),
    });
    form.reset();
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>{tour.title}</h1>
        <p className="lede">{tour.text}</p>
      </header>

      <section className="wrap tour-layout">
        <div className="tour-side">
          <img
            src={images.laptops.src}
            alt={images.laptops.alt}
            width={images.laptops.w}
            height={images.laptops.h}
          />
          <ul className="ticks">
            {tour.promises.map((p) => (
              <li key={p}>
                <Check aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p>
            Rather talk first? Call <a href={brand.phoneHref}>{brand.phone}</a>{" "}
            or write to{" "}
            <a href={`mailto:${brand.toursEmail}`}>{brand.toursEmail}</a>.
          </p>
        </div>

        <div className="tour-form-wrap">
          <div aria-live="polite" ref={confirm}>
            {sent && (
              <div className="confirm-card">
                <h2>
                  See you on {longDate(sent.date)}, {sent.name}
                </h2>
                <p>
                  Your tour of {sent.house} is pencilled in for{" "}
                  {clock(sent.time)}. Ask for your host at the front desk, and
                  bring a laptop if you'd like to stay for your free day.
                </p>
                <p>
                  <Link to="/memberships" className="text-link">
                    Read up on memberships before you come
                  </Link>
                </p>
              </div>
            )}
          </div>

          <form
            className="form tour-form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            hidden={!!sent}
          >
            <div className="form-row">
              <Field
                label="Name"
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
                placeholder="you@example.com"
                error={errors.email}
              />
            </div>
            <Field
              label="Phone"
              name="phone"
              type="tel"
              hint="Optional, in case the trains are late"
              pattern="[+0-9 ()-]{7,}"
              autoComplete="tel"
              error={errors.phone}
            />

            <fieldset
              className="choice"
              aria-describedby={errors.house ? "house-err" : undefined}
            >
              <legend>Which house?</legend>
              <div className="choice-grid">
                {locations.map((l) => (
                  <label key={l.id} className="choice-card">
                    <input type="radio" name="house" value={l.id} required />
                    <span>
                      <strong>{l.name}</strong>
                      {l.neighbourhood}
                    </span>
                  </label>
                ))}
              </div>
              {errors.house && (
                <p className="field-error" id="house-err">
                  {errors.house}
                </p>
              )}
            </fieldset>

            <div className="form-row">
              <Field
                label="Day"
                name="date"
                type="date"
                required
                min={min}
                max={max}
                hint="Monday to Friday"
                error={errors.date}
              />
              <fieldset
                className="choice"
                aria-describedby={errors.time ? "time-err" : undefined}
              >
                <legend>Time</legend>
                <div className="time-pills">
                  {tour.times.map((t) => (
                    <label key={t} className="pill">
                      <input type="radio" name="time" value={t} required />
                      <span>{clock(t)}</span>
                    </label>
                  ))}
                </div>
                {errors.time && (
                  <p className="field-error" id="time-err">
                    {errors.time}
                  </p>
                )}
              </fieldset>
            </div>

            <div className="form-row">
              <Field label="Team size" name="size">
                <select defaultValue={tour.sizes[0]}>
                  {tour.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Interested in" name="plan">
                <select defaultValue="Not sure yet">
                  <option>Not sure yet</option>
                  {plans.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                  <option>Meeting rooms only</option>
                </select>
              </Field>
            </div>
            <Field
              label="Anything we should know?"
              name="notes"
              hint="Optional: access needs, a dog, a deadline"
            >
              <textarea rows={3} maxLength={400} />
            </Field>
            <button
              type="submit"
              className="btn btn-accent btn-block"
              disabled={sending}
            >
              {sending ? "Finding you a host…" : "Book my tour"}
            </button>
            <p className="quiet-note">
              This is a demo: the form is checked in your browser and nothing is
              sent.
            </p>
          </form>
          {sent && (
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setSent(null)}
            >
              Book another tour
            </button>
          )}
        </div>
      </section>
    </>
  );
}
