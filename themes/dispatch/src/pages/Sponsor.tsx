import { useEffect, useRef, useState, type FormEvent } from "react";
import { brand, sponsor } from "../content";
import {
  EMAIL_MSG,
  dayMonth,
  emailTypo,
  money,
  pause,
  validate,
} from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { Postmark, stampFor } from "../components/Postmark";

export function Sponsor() {
  const { errors, setErrors, onChange } = useErrors();
  const [placementId, setPlacementId] = useState(sponsor.placements[0].id);
  const [slots, setSlots] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const placement = sponsor.placements.find((p) => p.id === placementId)!;
  const bundle = slots.length >= sponsor.bundleFrom;
  const subtotal = placement.price * slots.length;
  const total = bundle ? subtotal * (1 - sponsor.bundleDiscount) : subtotal;

  const toggleSlot = (date: string) => {
    setSlots((s) =>
      s.includes(date) ? s.filter((d) => d !== date) : [...s, date].sort(),
    );
    setErrors(({ slots: _, ...rest }) => rest);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email"));
    const typo = emailTypo(email);
    const extra: Record<string, string> = {};
    if (!slots.length)
      extra.slots = "Pick at least one open Sunday so I can check it for you.";
    if (typo) extra.email = typo;
    const found = validate(
      form,
      {
        name: "Tell me who to reply to.",
        company:
          "Add the name of the company or project you’d like to promote.",
        email: EMAIL_MSG,
        website: "Enter the full web address, starting with https://",
        message:
          "Write at least 30 characters about what you make and who it’s for.",
      },
      extra,
    );
    setErrors(found);
    if (found.slots && Object.keys(found)[0] === "slots")
      form
        .querySelector<HTMLInputElement>("input[name=slots]:not(:disabled)")
        ?.focus();
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setDone(
      `Thanks — I’ve pencilled ${slots.length === 1 ? "that Sunday" : `those ${slots.length} Sundays`} in for 48 hours and will reply to ${email} by Tuesday with a proposed note.`,
    );
  };

  return (
    <div className="page sponsor">
      <header className="wrap page-head">
        <h1>{sponsor.title}</h1>
        <p className="lede">{sponsor.lede}</p>
      </header>

      <section
        className="wrap section sponsor-facts"
        aria-labelledby="audience-title"
      >
        <h2 id="audience-title" className="section-title">
          Who reads Dispatch
        </h2>
        <dl className="spec">
          {sponsor.audience.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section" aria-labelledby="rules-title">
        <div className="sponsor-rules">
          <h2 id="rules-title">The rules I keep</h2>
          <ul>
            {sponsor.policy.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="past">
            <span>Recent sponsors:</span> {sponsor.past.join(" · ")}
          </p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="book-title">
        <h2 id="book-title" className="section-title">
          Book a slot
        </h2>
        <div className="flow-status" aria-live="polite">
          {done && (
            <div className="flow-done" ref={doneRef} tabIndex={-1}>
              <Postmark
                className="done-stamp"
                {...stampFor(
                  new Date().toLocaleDateString("en-CA"),
                  "Received",
                )}
              />
              <h3>Request received</h3>
              <p>{done}</p>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => {
                  setDone("");
                  setSlots([]);
                }}
              >
                Start another request
              </button>
            </div>
          )}
        </div>
        {!done && (
          <form
            className="book"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <div className="book-main">
              <fieldset className="placements">
                <legend>Placement</legend>
                {sponsor.placements.map((p) => (
                  <label
                    key={p.id}
                    className="placement"
                    data-selected={p.id === placementId ? "" : undefined}
                  >
                    <input
                      type="radio"
                      name="placement"
                      value={p.id}
                      checked={p.id === placementId}
                      onChange={() => setPlacementId(p.id)}
                    />
                    <span className="placement-name">{p.name}</span>
                    <span className="placement-price">
                      {money(p.price)} / issue
                    </span>
                    <span className="placement-text">{p.text}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset
                className="slots"
                data-invalid={errors.slots ? "" : undefined}
                aria-describedby={errors.slots ? "slots-err" : "slots-hint"}
              >
                <legend>Sundays</legend>
                <p className="field-hint" id="slots-hint">
                  Book {sponsor.bundleFrom} or more and save{" "}
                  {sponsor.bundleDiscount * 100}%.
                </p>
                <div className="slot-grid">
                  {sponsor.slots.map((s) => (
                    <label
                      key={s.date}
                      className="slot"
                      data-booked={s.booked ? "" : undefined}
                    >
                      <input
                        type="checkbox"
                        name="slots"
                        value={s.date}
                        disabled={s.booked}
                        checked={slots.includes(s.date)}
                        onChange={() => toggleSlot(s.date)}
                      />
                      <span className="slot-date">{dayMonth(s.date)}</span>
                      <span className="slot-state">
                        {s.booked
                          ? "Booked"
                          : slots.includes(s.date)
                            ? "Selected"
                            : "Open"}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.slots && (
                  <p className="field-error" id="slots-err">
                    {errors.slots}
                  </p>
                )}
              </fieldset>

              <div className="book-fields">
                <Field
                  label="Your name"
                  name="name"
                  required
                  autoComplete="name"
                  error={errors.name}
                />
                <Field
                  label="Company or project"
                  name="company"
                  required
                  autoComplete="organization"
                  error={errors.company}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  error={errors.email}
                />
                <Field
                  label="Website"
                  name="website"
                  type="url"
                  autoComplete="url"
                  placeholder="https://"
                  hint="Optional"
                  error={errors.website}
                />
                <Field
                  className="field-wide"
                  label="What should readers know?"
                  name="message"
                  error={errors.message}
                  hint="What you make, who it’s for, and anything you’d like the note to mention."
                >
                  <textarea required minLength={30} rows={5} />
                </Field>
              </div>
            </div>

            <aside className="book-summary" aria-label="Booking summary">
              <h3>Your booking</h3>
              <dl>
                <div>
                  <dt>Placement</dt>
                  <dd>{placement.name}</dd>
                </div>
                <div>
                  <dt>Sundays</dt>
                  <dd>
                    {slots.length ? slots.map(dayMonth).join(", ") : "None yet"}
                  </dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd className="num">{money(subtotal)}</dd>
                </div>
                {bundle && (
                  <div>
                    <dt>Bundle saving</dt>
                    <dd className="num">−{money(subtotal - total)}</dd>
                  </div>
                )}
                <div className="book-total">
                  <dt>Total</dt>
                  <dd className="num" aria-live="polite">
                    {money(total)}
                  </dd>
                </div>
              </dl>
              <button
                className="btn btn-solid btn-wide"
                type="submit"
                disabled={busy}
              >
                {busy ? "Sending request…" : "Request these dates"}
              </button>
              <p className="quiet">
                Demo form: nothing is sent or invoiced. Prefer email?{" "}
                <a href={`mailto:${brand.sponsorEmail}`}>
                  {brand.sponsorEmail}
                </a>
              </p>
            </aside>
          </form>
        )}
      </section>
    </div>
  );
}
