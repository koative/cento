import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, packages, settings } from "../content";
import {
  Field,
  SelectField,
  TextField,
  validate,
  type Errors,
} from "../components/Field";
import { iso, longDate, parseDate, today, usePlan } from "../lib/plan";

const budgets = [
  "Under $40,000",
  "$40,000 to $70,000",
  "$70,000 to $110,000",
  "Over $110,000",
  "Not sure yet",
];
const seasons = [
  "Spring 2027",
  "Summer 2027",
  "Autumn 2027",
  "Winter 2027",
  "2028",
];

function budgetBand(n: number) {
  if (n < 40000) return budgets[0];
  if (n <= 70000) return budgets[1];
  if (n <= 110000) return budgets[2];
  return budgets[3];
}

type Sent = {
  names: string;
  email: string;
  when: string;
  guests: string;
  pkg: string;
};

export function Enquire() {
  const plan = usePlan();
  const [noDate, setNoDate] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const success = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sent) return;
    window.scrollTo({ top: 0 });
    success.current?.focus({ preventScroll: true });
  }, [sent]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement).value;

    const date = form.elements.namedItem("date") as HTMLInputElement | null;
    date?.setCustomValidity(
      date.value && parseDate(date.value) <= today() ? "past" : "",
    );
    const pkgId = (form.elements.namedItem("package") as RadioNodeList).value;
    const guests = form.elements.namedItem("guests") as HTMLInputElement;
    guests.setCustomValidity(
      pkgId === "elope" && Number(guests.value) > 20 ? "small" : "",
    );

    const found = validate(form, {
      names: { missing: "Tell us both your names, e.g. Alex & Jamie." },
      email: {
        missing: "Add an email so we can reply.",
        invalid: "That email needs an @ and a domain, like alex@example.com.",
      },
      phone: {
        missing: "",
        invalid: "Use digits, spaces, + or dashes only, e.g. +1 555 0100 200.",
      },
      date: {
        missing: "Pick a date, or tick “We have not chosen a date yet”.",
        invalid: "That date has passed. Choose a date after today.",
      },
      season: { missing: "Choose the season you are hoping for." },
      guests: {
        missing:
          "Give us a rough guest count; a range is fine to settle later.",
        invalid:
          pkgId === "elope" && Number(guests.value) > 20
            ? "The Small Vow covers up to 20 guests. Lower the count or choose another package."
            : "Enter a guest count between 2 and 400.",
      },
      message: {
        missing: "Tell us a little about the two of you.",
        invalid: "A few more words, please: at least 30 characters.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent({
        names: get("names"),
        email: get("email"),
        when: noDate ? get("season") : longDate(get("date")),
        guests: guests.value,
        pkg:
          packages.find((p) => p.id === pkgId)?.name ?? "We will suggest one",
      });
    }, 1100);
  }

  if (sent)
    return (
      <div className="page enquire-page">
        <div
          className="sent place-card"
          ref={success}
          tabIndex={-1}
          role="status"
          aria-live="polite"
        >
          <h1>Thank you, {sent.names}</h1>
          <p>
            Your enquiry for <strong>{sent.when}</strong>, about{" "}
            <span className="num">{sent.guests}</span> guests,{" "}
            {sent.pkg === "We will suggest one" ? (
              "with a package still to choose"
            ) : (
              <>for {sent.pkg}</>
            )}
            , is with us. Margot will reply to <strong>{sent.email}</strong>{" "}
            within two working days with availability and a first idea.
          </p>
          <p className="fine">
            This is a demo: nothing was sent and no one will email you.
          </p>
          <div className="actions">
            <Link to="/weddings" className="btn">
              Read wedding stories meanwhile
            </Link>
            <button
              type="button"
              className="text-btn"
              onClick={() => setSent(null)}
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="page enquire-page">
      <header className="page-head">
        <h1>Enquire about your date</h1>
        <p className="lede">
          Tell us what you know so far; gaps are expected. We reply within two
          working days with availability, a fee and one idea we cannot stop
          thinking about.
        </p>
      </header>

      <div className="enquire-layout">
        <form
          className="enquire-form"
          noValidate
          onSubmit={submit}
          aria-busy={busy}
        >
          <fieldset>
            <legend>The two of you</legend>
            <Field
              label="Your names"
              name="names"
              autoComplete="name"
              placeholder="Alex & Jamie"
              required
              error={errors.names}
            />
            <div className="field-row">
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[0-9 +()\-]{7,}"
                error={errors.phone}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>The wedding</legend>
            <div className="field-row">
              {noDate ? (
                <SelectField
                  label="Season"
                  name="season"
                  required
                  defaultValue=""
                  error={errors.season}
                >
                  <option value="" disabled>
                    Choose a season
                  </option>
                  {seasons.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </SelectField>
              ) : (
                <Field
                  label="Date"
                  name="date"
                  type="date"
                  min={iso(today())}
                  defaultValue={plan.date}
                  required
                  error={errors.date}
                  hint="Carried over from the planner; change it freely."
                />
              )}
              <Field
                label="Guests, roughly"
                name="guests"
                type="number"
                inputMode="numeric"
                min={2}
                max={400}
                defaultValue={plan.guests}
                required
                error={errors.guests}
              />
            </div>
            <label className="check">
              <input
                type="checkbox"
                checked={noDate}
                onChange={(e) => setNoDate(e.target.checked)}
              />
              We have not chosen a date yet
            </label>
            <div className="field-row">
              <SelectField
                label="Setting"
                name="setting"
                defaultValue="Not sure yet"
              >
                {settings.map((s) => (
                  <option key={s}>{s}</option>
                ))}
                <option>Not sure yet</option>
              </SelectField>
              <SelectField
                label="Total budget"
                name="budget"
                defaultValue={budgetBand(plan.budget)}
              >
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </SelectField>
            </div>
          </fieldset>

          <fieldset className="pkg-choice">
            <legend>Which package are you considering?</legend>
            {packages.map((p) => (
              <label key={p.id} className="radio">
                <input type="radio" name="package" value={p.id} />
                <span>
                  <strong>{p.name}</strong> {p.kind}
                </span>
              </label>
            ))}
            <label className="radio">
              <input type="radio" name="package" value="" defaultChecked />
              <span>
                <strong>Help us choose</strong> We will suggest one after we
                talk
              </span>
            </label>
          </fieldset>

          <TextField
            label="Tell us about the two of you"
            name="message"
            rows={6}
            minLength={30}
            required
            error={errors.message}
            hint="How you met, the place you keep imagining, the one thing that has to happen."
          />

          <div className="actions">
            <button className="btn" type="submit" disabled={busy}>
              {busy ? "Sending…" : "Send enquiry"}
            </button>
            <p className="fine">Demo form: nothing leaves this page.</p>
          </div>
        </form>

        <aside className="enquire-aside">
          <h2 className="h3">Or talk to us directly</h2>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
          <p>{brand.hours}.</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p className="fine">{brand.availability}</p>
          <p>
            Not sure of a date?{" "}
            <Link to="/planner">Try the countdown planner</Link> first; we will
            see your plan when you enquire.
          </p>
        </aside>
      </div>
    </div>
  );
}
