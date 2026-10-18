import { useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { brand, catering, images } from "../content";
import { money, pause, validate, type Errors } from "../lib";
import { Field, useErrors } from "../components/Field";

const DAY = 86_400_000;
const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Rough cost of each package for a headcount, and which one fits best. */
function estimate(guests: number) {
  const boxes = Math.ceil(guests / catering.boxFeeds);
  const boards = Math.ceil(guests / catering.boardFeeds);
  const truck =
    catering.truckBase +
    Math.max(0, guests - catering.truckGuests) * catering.truckExtraGuest;
  const best =
    guests >= catering.truckGuests
      ? "griddle-truck"
      : guests > 30
        ? "slider-board"
        : "smash-box";
  return {
    best,
    rows: [
      {
        id: "smash-box",
        label: `${boxes} Smash ${boxes === 1 ? "Box" : "Boxes"}`,
        cost: boxes * 149,
      },
      {
        id: "slider-board",
        label: `${boards} Slider ${boards === 1 ? "Board" : "Boards"}`,
        cost: boards * 96,
      },
      { id: "griddle-truck", label: "The Griddle Truck", cost: truck },
    ],
  };
}

const messages = {
  name: "Tell us who's organising so we know who to ask for.",
  email: "Enter an email like you@example.com so we can send the quote.",
  phone: "Add a phone number for the day itself.",
  date: "Choose a date at least two days from today.",
  guests: "Enter a headcount between 10 and 400.",
  venue: "Add the venue or a delivery address, even roughly.",
};

export function Catering() {
  const [guests, setGuests] = useState(40);
  const [pkg, setPkg] = useState("");
  const [guestsText, setGuestsText] = useState("40");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const formRef = useRef<HTMLFormElement>(null);
  const est = estimate(guests);
  const minDate = isoDate(new Date(Date.now() + 2 * DAY));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    const date = String(data.get("date") ?? "");
    if (
      data.get("package") === "griddle-truck" &&
      date &&
      new Date(date).getTime() < Date.now() + 21 * DAY
    ) {
      extra.date =
        "The Truck books about three weeks out. Pick a later date, or choose boxes or boards for this one.";
    }
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    await pause();
    setSending(false);
    setSent(String(data.get("name")));
    form.reset();
  };

  const choose = (id: string) => {
    setPkg(id);
    formRef.current?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <div className="page catering-page">
      <header className="page-head wrap cater-head">
        <div>
          <h1>Catering</h1>
          <p className="lede">{catering.intro}</p>
        </div>
        <img
          src={images.backyard.src}
          alt={images.backyard.alt}
          width={images.backyard.w}
          height={images.backyard.h}
        />
      </header>

      <section className="wrap packages" aria-labelledby="pk-h">
        <h2 id="pk-h">Three ways to feed a crowd</h2>
        <div className="package-list">
          {catering.packages.map((p) => (
            <article key={p.id} className="package">
              <div className="package-top">
                <h3>{p.name}</h3>
                <p className="package-price">
                  {p.unit === "from" ? "from " : ""}
                  {money(p.price).replace(".00", "")}
                  {p.unit !== "from" && <span> {p.unit}</span>}
                </p>
                <p className="package-feeds">{p.feeds}</p>
              </div>
              <p>{p.description}</p>
              <ul>
                {p.includes.map((i) => (
                  <li key={i}>
                    <Check aria-hidden="true" /> {i}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => choose(p.id)}
              >
                Ask about {p.name}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap estimator" aria-labelledby="est-h">
        <div>
          <h2 id="est-h">How many are you feeding?</h2>
          <label className="range">
            <span>
              Guests <output>{guests}</output>
            </span>
            <input
              type="range"
              min={10}
              max={400}
              step={5}
              value={guests}
              onChange={(e) => (
                setGuests(Number(e.target.value)),
                setGuestsText(e.target.value)
              )}
            />
          </label>
          <ul className="estimator-notes">
            {catering.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <table className="estimate" aria-live="polite">
          <caption>Estimate for {guests} guests, before tax</caption>
          <tbody>
            {est.rows.map((r) => (
              <tr key={r.id} data-best={est.best === r.id ? "" : undefined}>
                <th scope="row">
                  {r.label}
                  {est.best === r.id && <span className="best">Best fit</span>}
                </th>
                <td>{money(r.cost)}</td>
                <td>{money(r.cost / guests)} a head</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap enquiry" aria-labelledby="enq-h">
        <div className="enquiry-intro">
          <h2 id="enq-h">Tell us about the day</h2>
          <p>
            Luis or someone from the catering team replies within one working
            day with a quote and a couple of questions. Rather talk? Call{" "}
            {brand.phone} or email{" "}
            <a href={`mailto:${brand.cateringEmail}`}>{brand.cateringEmail}</a>.
          </p>
        </div>
        <form
          ref={formRef}
          className="enquiry-form form-cols"
          noValidate
          onSubmit={submit}
          onChange={onChange}
          aria-busy={sending}
        >
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
            label="Phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            error={errors.phone}
          />
          <Field
            label="Date"
            name="date"
            type="date"
            required
            min={minDate}
            error={errors.date}
          />
          <Field
            label="Guests"
            name="guests"
            type="number"
            required
            min={10}
            max={400}
            value={guestsText}
            onChange={(e) => {
              setGuestsText(e.target.value);
              const n = Number(e.target.value);
              if (n >= 10 && n <= 400) setGuests(n);
            }}
            error={errors.guests}
          />
          <Field label="Package" name="package">
            <select
              value={pkg || est.best}
              onChange={(e) => setPkg(e.target.value)}
            >
              {catering.packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Occasion" name="occasion">
            <select defaultValue={catering.occasions[0]}>
              {catering.occasions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field
            label="Venue or address"
            name="venue"
            required
            autoComplete="street-address"
            error={errors.venue}
          />
          <Field
            label="Anything else"
            name="notes"
            hint="Dietary needs, timings, parking for the Truck"
            className="span-2"
          >
            <textarea rows={4} />
          </Field>
          <div className="span-2 form-submit">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              disabled={sending}
            >
              {sending ? "Sending…" : "Send enquiry"}
            </button>
            <p className="quiet">Demo form: nothing is sent anywhere.</p>
          </div>
          <p className="form-success span-2" aria-live="polite">
            {sent &&
              `Thanks, ${sent}. We've got it and will reply within one working day with a quote.`}
          </p>
        </form>
      </section>
    </div>
  );
}
