import { useState, type FormEvent } from "react";
import { brand, hire, spaces } from "../content";
import { Field, useErrors } from "../components/Field";
import { pause, validate } from "../lib/forms";
import { money } from "../lib/programme";

export function Hire() {
  const [spaceId, setSpaceId] = useState(spaces[0].id);
  const [slot, setSlot] = useState(0);
  const [guests, setGuests] = useState(60);
  const [extras, setExtras] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const { errors, setErrors, onChange } = useErrors();

  const space = spaces.find((s) => s.id === spaceId)!;
  const rate = space.rates[slot] ?? space.rates[0];
  const catering = hire.catering
    .filter((c) => extras.includes(c.item))
    .reduce((sum, c) => sum + c.price * guests, 0);
  const estimate = rate.price + catering;
  const today = new Date().toISOString().slice(0, 10);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add a name so we know who to reply to.",
      email: "Enter an email like you@example.com for our reply.",
      date: "Pick a date from today onwards; we will confirm availability.",
      guests: `Enter a guest count between 1 and ${space.guests}, the most ${space.name} holds.`,
      kind: "Choose the kind of event so we can send the right pack.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    setDone(
      `Thank you. Marta in our events team will reply within two working days with availability for ${space.name} and a confirmed quote.`,
    );
    form.reset();
    setExtras([]);
  };

  return (
    <div className="page-pad">
      <header className="wrap page-head">
        <h1>{hire.title}</h1>
        <p className="lede">{hire.intro}</p>
      </header>

      <div className="wrap spaces">
        {spaces.map((s) => (
          <section
            className="space"
            key={s.id}
            aria-labelledby={`space-${s.id}`}
          >
            <img
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.w}
              height={s.image.h}
              loading="lazy"
            />
            <div className="space-text">
              <h2 id={`space-${s.id}`}>{s.name}</h2>
              <p className="space-cap">{s.capacity}</p>
              <p>{s.text}</p>
              <table className="rates">
                <caption className="sr-only">{s.name} hire rates</caption>
                <tbody>
                  {s.rates.map((r) => (
                    <tr key={r.slot}>
                      <th scope="row">{r.slot}</th>
                      <td className="tnum">{money(r.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <section className="wrap hire-uses" aria-labelledby="uses-h">
        <h2 id="uses-h">What people hire us for</h2>
        <dl>
          {hire.uses.map((u) => (
            <div key={u.title}>
              <dt>{u.title}</dt>
              <dd>{u.text}</dd>
            </div>
          ))}
        </dl>
        <div className="hire-includes">
          <h3>Every booking includes</h3>
          <ul>
            {hire.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap split-form enquiry" aria-labelledby="enquire-h">
        <div className="estimate" aria-live="polite">
          <h2 id="enquire-h">Plan and enquire</h2>
          <p>
            Choose a room and a slot for a working estimate. We confirm every
            quote by email; prices exclude VAT.
          </p>
          <dl className="estimate-lines">
            <div>
              <dt>
                {space.name}, {rate.slot}
              </dt>
              <dd className="tnum">{money(rate.price)}</dd>
            </div>
            {hire.catering
              .filter((c) => extras.includes(c.item))
              .map((c) => (
                <div key={c.item}>
                  <dt>
                    {c.item.split(",")[0]} × {guests}
                  </dt>
                  <dd className="tnum">{money(c.price * guests)}</dd>
                </div>
              ))}
            <div className="estimate-total">
              <dt>Estimate</dt>
              <dd className="tnum">{money(estimate)}</dd>
            </div>
          </dl>
          <p className="quiet">
            Or talk to us:{" "}
            <a href={`mailto:${brand.hireEmail}`}>{brand.hireEmail}</a>
          </p>
        </div>

        <form
          noValidate
          onSubmit={submit}
          onChange={onChange}
          className="form-grid"
          aria-busy={busy}
        >
          <Field label="Space" name="space">
            <select
              value={spaceId}
              onChange={(e) => {
                setSpaceId(e.target.value);
                setSlot(0);
              }}
            >
              {spaces.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.capacity})
                </option>
              ))}
            </select>
          </Field>
          <Field label="Slot" name="slot">
            <select
              value={slot}
              onChange={(e) => setSlot(Number(e.target.value))}
            >
              {space.rates.map((r, i) => (
                <option key={r.slot} value={i}>
                  {r.slot}: {money(r.price)}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={space.guests}
            required
            value={guests}
            onChange={(e) => setGuests(Math.max(0, Number(e.target.value)))}
            error={errors.guests}
          />
          <Field
            label="Date"
            name="date"
            type="date"
            min={today}
            required
            error={errors.date}
          />
          <Field
            label="Kind of event"
            name="kind"
            className="span-2"
            error={errors.kind}
          >
            <select required defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              <option>Premiere or cast screening</option>
              <option>Company screening or conference</option>
              <option>Birthday or private screening</option>
              <option>Party in the bar</option>
              <option>Something else</option>
            </select>
          </Field>
          <fieldset className="span-2 extras">
            <legend>Catering (optional)</legend>
            {hire.catering.map((c) => (
              <label key={c.item}>
                <input
                  type="checkbox"
                  checked={extras.includes(c.item)}
                  onChange={(e) =>
                    setExtras(
                      e.target.checked
                        ? [...extras, c.item]
                        : extras.filter((x) => x !== c.item),
                    )
                  }
                />
                {c.item} <span className="tnum">{money(c.price)}</span>
              </label>
            ))}
          </fieldset>
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
          <Field
            label="Tell us about it (optional)"
            name="message"
            className="span-2"
          >
            <textarea
              rows={4}
              placeholder="What you are screening, timings, anything we should know"
            />
          </Field>
          <div className="actions span-2">
            <button type="submit" className="btn btn-red" disabled={busy}>
              {busy ? "Sending…" : "Send enquiry"}
            </button>
          </div>
          <p className="form-done span-2" aria-live="polite">
            {done}
          </p>
          <p className="quiet span-2">
            Demo only: this form does not send anything.
          </p>
        </form>
      </section>
    </div>
  );
}
