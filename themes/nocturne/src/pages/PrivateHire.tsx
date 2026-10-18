import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { brand, hireFaq, hirePackages, hirePage, spaces } from "../content";
import { isoOf, longDate, money } from "../lib/format";
import { pause, reference, validate } from "../lib/forms";
import { Field, useErrors } from "../components/Field";

export function PrivateHire() {
  const { errors, setErrors, onChange } = useErrors();
  const [space, setSpace] = useState(spaces[0].id);
  const [pkg, setPkg] = useState(hirePackages[1].id);
  const [guests, setGuests] = useState(16);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    name: string;
    date: string;
  } | null>(null);

  const room = spaces.find((s) => s.id === space)!;
  const chosen = hirePackages.find((p) => p.id === pkg)!;
  const estimate = chosen.perHead * (Number.isFinite(guests) ? guests : 0);
  const today = new Date();
  const min = isoOf(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
  );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add your name so we know who to reply to.",
      email: "Enter an email like you@example.com for our proposal.",
      date: "Pick a date at least a week from today; we need time to prepare.",
      guests: `Enter a number of guests from 8 to ${room.maxGuests} for ${room.name.toLowerCase()}.`,
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setDone({
      ref: reference(),
      name: String(data.get("name")).split(" ")[0],
      date: String(data.get("date")),
    });
    form.parentElement?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Private hire</h1>
        <p className="lede">{hirePage.intro}</p>
      </header>

      <section className="wrap spaces" aria-label="Spaces">
        {spaces.map((s) => (
          <article key={s.id} className="space">
            <img
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.w}
              height={s.image.h}
              loading="lazy"
            />
            <div className="space-text">
              <h2>{s.name}</h2>
              <p>{s.text}</p>
              <dl className="space-facts">
                <div>
                  <dt>Capacity</dt>
                  <dd>{s.capacity}</dd>
                </div>
                <div>
                  <dt>Minimum spend</dt>
                  <dd>from {money(s.minSpend)}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </section>

      <section className="section section-walnut">
        <div className="wrap">
          <div className="section-head">
            <h2>{hirePage.packagesTitle}</h2>
            <p>{hirePage.packagesText}</p>
          </div>
          <ol className="packages">
            {hirePackages.map((p) => (
              <li
                key={p.id}
                className="package"
                data-chosen={p.id === pkg ? "" : undefined}
              >
                <h3>{p.name}</h3>
                <p className="package-price">
                  {money(p.perHead)} <span>per guest</span>
                </p>
                <p>{p.text}</p>
                <ul>
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn btn-ghost"
                  aria-pressed={p.id === pkg}
                  onClick={() => setPkg(p.id)}
                >
                  {p.id === pkg
                    ? "Chosen for your enquiry"
                    : `Choose ${p.name}`}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap enquiry" aria-labelledby="enquiry-title">
        <div className="enquiry-intro">
          <h2 id="enquiry-title">{hirePage.formTitle}</h2>
          <p className="lede">{hirePage.formText}</p>
          <div className="estimate" aria-live="polite">
            <p className="estimate-label">Rough estimate</p>
            <p className="estimate-total">{money(estimate)}</p>
            <p className="muted">
              {Number.isFinite(guests) ? guests : 0} guests × {chosen.name} at{" "}
              {money(chosen.perHead)}.{" "}
              {estimate < room.minSpend
                ? `Below the ${money(room.minSpend)} minimum for ${room.name.toLowerCase()}; the difference can go on the bar tab.`
                : `Covers the ${money(room.minSpend)} minimum for ${room.name.toLowerCase()}.`}
            </p>
          </div>
          <p className="muted">
            Prefer to talk?{" "}
            <a href={`mailto:${brand.hireEmail}`}>{brand.hireEmail}</a> or{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>.
          </p>
        </div>

        <div aria-live="polite">
          {done ? (
            <div className="confirm">
              <Check aria-hidden="true" className="confirm-icon" />
              <h3>Thank you, {done.name}.</h3>
              <p>
                Your enquiry for {longDate(done.date)} is with Freja. Expect a
                reply within two working days. Reference {done.ref}.
              </p>
              <p className="form-note">Demo only: nothing was sent.</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setDone(null)}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="form-stack"
              aria-busy={busy}
            >
              <div className="form-grid">
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
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <Field
                  label="Date"
                  name="date"
                  type="date"
                  required
                  min={min}
                  error={errors.date}
                />
                <Field
                  label="Guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  required
                  min={8}
                  max={room.maxGuests}
                  value={Number.isFinite(guests) ? guests : ""}
                  onChange={(e) => setGuests(e.target.valueAsNumber)}
                  error={errors.guests}
                />
                <Field label="Space" name="space">
                  <select
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                  >
                    {spaces.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}, up to {s.maxGuests}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Package" name="package">
                  <select value={pkg} onChange={(e) => setPkg(e.target.value)}>
                    {hirePackages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}, {money(p.perHead)} per guest
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field
                label="The occasion (optional)"
                name="message"
                hint="Who's coming, what you're celebrating, records you'd like to hear"
              >
                <textarea rows={4} maxLength={600} />
              </Field>
              <button
                type="submit"
                className="btn btn-brass btn-block"
                disabled={busy}
              >
                {busy ? "Sending your enquiry…" : "Send enquiry"}
              </button>
              <p className="form-note">Demo only: nothing is sent anywhere.</p>
            </form>
          )}
        </div>
      </section>

      <section
        className="section section-rule wrap faq"
        aria-labelledby="hire-faq"
      >
        <h2 id="hire-faq">Questions we get asked</h2>
        <div className="disclosures">
          {hireFaq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
