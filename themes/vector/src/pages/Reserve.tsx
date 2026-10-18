import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, studios } from "../content";
import { Elevation } from "../components/Elevation";
import { Field, focusFirst, useErrors, validate } from "../components/Field";
import { describe, useSavedBuild } from "../lib/build";
import { money } from "../lib/calc";

type Done = { number: string; name: string; email: string; studio: string };

const messages = {
  first: "Enter your first name.",
  last: "Enter your last name.",
  email: "Enter an email address like name@example.com.",
  phone: "Enter a phone number with at least 10 digits.",
  zip: "Enter a 5-digit US ZIP code.",
  studio: "Choose the studio where you'll collect the car.",
  terms: "Tick the box to confirm you've read the reservation terms.",
};

export function Reserve() {
  const saved = useSavedBuild();
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  if (!saved && !done) {
    return (
      <header className="page-head sheet">
        <div className="wrap">
          <h1>Reserve a Vector</h1>
          <p className="lede">
            There is no build saved in this browser yet. Configure a car first
            and it will be waiting here.
          </p>
          <div className="actions">
            <Link to="/configure" className="btn btn-primary">
              Open the configurator
            </Link>
            <Link to="/models" className="btn btn-ghost">
              Compare models
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const digits = String(data.get("phone") ?? "").replace(/\D/g, "");
    const found = validate(
      form,
      messages,
      digits && digits.length < 10 ? { phone: messages.phone } : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return focusFirst(form, found);
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDone({
        number: `VEC-${Math.floor(100000 + Math.random() * 900000)}`,
        name: String(data.get("first")),
        email: String(data.get("email")),
        studio: studios.find((s) => s.id === data.get("studio"))?.name ?? "",
      });
    }, 900);
  };

  const d = saved ? describe(saved) : null;

  return (
    <>
      <header className="page-head sheet compact">
        <div className="wrap">
          <h1>
            {done ? "Reservation confirmed" : `Reserve your ${d?.model.name}`}
          </h1>
          <p className="lede">
            {done
              ? "Your build is held at today's price. Here is what happens next."
              : `A ${money(brand.deposit)} deposit holds this build and its price. It is fully refundable until your car is assigned a VIN.`}
          </p>
        </div>
      </header>

      <div className="wrap reserve">
        <div className="reserve-main" aria-live="polite">
          {done ? (
            <div className="confirmation">
              <p className="confirm-number">
                <Check aria-hidden="true" /> Reservation{" "}
                <strong className="num">{done.number}</strong>
              </p>
              <p>
                Thanks, {done.name}. We've sent the details to {done.email}.
                Your product specialist at {done.studio} will call within two
                working days to confirm delivery timing and trade-in, if you
                have one.
              </p>
              <ol className="steps">
                <li>We confirm your build and delivery window by phone.</li>
                <li>
                  Your car is assigned a VIN — the deposit becomes
                  non-refundable from here.
                </li>
                <li>
                  Two weeks before delivery we send financing and registration
                  papers.
                </li>
                <li>
                  You collect at {done.studio}, or we deliver within 40 miles of
                  the studio.
                </li>
              </ol>
              <div className="actions">
                <Link to="/charging" className="btn btn-primary">
                  Plan home charging
                </Link>
                <Link to="/owners" className="btn btn-ghost">
                  What ownership looks like
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <div className="form-row">
                <Field
                  label="First name"
                  name="first"
                  required
                  autoComplete="given-name"
                  error={errors.first}
                />
                <Field
                  label="Last name"
                  name="last"
                  required
                  autoComplete="family-name"
                  error={errors.last}
                />
              </div>
              <div className="form-row">
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
              </div>
              <div className="form-row">
                <Field
                  label="ZIP code"
                  name="zip"
                  required
                  inputMode="numeric"
                  pattern="\d{5}"
                  maxLength={5}
                  autoComplete="postal-code"
                  hint="Used to check incentives in your state."
                  error={errors.zip}
                />
                <Field label="Collect from" name="studio" error={errors.studio}>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a studio
                    </option>
                    {studios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.city} — {s.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div
                className="field check-field"
                data-invalid={errors.terms ? "" : undefined}
              >
                <label className="check">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    aria-invalid={errors.terms ? true : undefined}
                    aria-describedby={errors.terms ? "f-terms-err" : undefined}
                  />
                  I understand the deposit is refundable until a VIN is
                  assigned, and that the final price may change only if I change
                  the build.
                </label>
                {errors.terms && (
                  <p className="field-error" id="f-terms-err">
                    {errors.terms}
                  </p>
                )}
              </div>
              <button
                className="btn btn-signal"
                type="submit"
                disabled={busy}
                aria-busy={busy}
              >
                {busy
                  ? "Holding your build…"
                  : `Reserve for ${money(brand.deposit)}`}
              </button>
              <p className="fine">
                Demo only: nothing is sent and no card is charged.
              </p>
            </form>
          )}
        </div>

        {d && (
          <aside className="reserve-build" aria-label="Your build">
            <Elevation
              profile={d.model.profile}
              paint={d.paint.hex}
              wheel={d.wheel.id}
              label={`${d.model.name} in ${d.paint.name}`}
            />
            <h2>
              {d.model.name} {d.trim.name}
            </h2>
            <table className="spec-table">
              <tbody>
                {d.lines.map((l) => (
                  <tr key={l.label}>
                    <th scope="row">{l.label}</th>
                    <td className="num">{money(l.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td className="num">{money(d.total)}</td>
                </tr>
                <tr>
                  <th scope="row">Due today</th>
                  <td className="num">{money(brand.deposit)}</td>
                </tr>
              </tfoot>
            </table>
            {!done && (
              <Link to={`/configure/${d.model.slug}`} className="text-link">
                Change this build
              </Link>
            )}
          </aside>
        )}
      </div>
    </>
  );
}
