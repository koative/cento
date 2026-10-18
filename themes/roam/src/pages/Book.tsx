import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "../router";
import { bookingCopy, cars, coverage, extras, stations } from "../content";
import {
  findDeal,
  dealProblem,
  quote,
  rentalDays,
  resetDraft,
  setDraft,
  stationName,
  useDraft,
  type Draft,
} from "../lib/booking";
import { clock, money, plural, shortDate } from "../lib/format";
import { pause, validate } from "../lib/forms";
import { TripForm } from "../components/TripForm";
import { RegionMap } from "../components/RegionMap";
import { CarDrawing } from "../components/CarDrawing";
import { Field, useErrors } from "../components/Field";
import { Stepper } from "../components/Stepper";

const steps = ["Trip", "Car", "Extras", "Driver"];

type Confirmed = {
  ref: string;
  draft: Draft;
  total: number;
  name: string;
  email: string;
  fastLane: boolean;
};

export function Book() {
  const d = useDraft();
  const [done, setDone] = useState<Confirmed | null>(null);
  const step = !d.car && d.step > 2 ? 2 : Math.min(Math.max(d.step, 1), 4);
  const go = (n: number) => setDraft({ step: n });

  if (done) return <Confirmation done={done} />;

  return (
    <>
      <section className="page-head wrap">
        <h1>{bookingCopy.title}</h1>
        <p className="lede">{bookingCopy.intro}</p>
      </section>

      <div className="wrap book-grid">
        <div className="book-main">
          <ol className="progress" aria-label="Booking steps">
            {steps.map((s, i) => {
              const n = i + 1;
              const state = n < step ? "done" : n === step ? "current" : "todo";
              return (
                <li
                  key={s}
                  data-state={state}
                  aria-current={n === step ? "step" : undefined}
                >
                  {n < step ? (
                    <button type="button" onClick={() => go(n)}>
                      <Check aria-hidden="true" />
                      {s}
                      <span className="sr-only">, completed. Change</span>
                    </button>
                  ) : (
                    <span>
                      <span className="progress-no" aria-hidden="true">
                        {n}
                      </span>
                      {s}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          {step === 1 && <TripStep onNext={() => go(2)} />}
          {step === 2 && <CarStep onNext={() => go(3)} onBack={() => go(1)} />}
          {step === 3 && (
            <ExtrasStep onNext={() => go(4)} onBack={() => go(2)} />
          )}
          {step === 4 && <DriverStep onBack={() => go(3)} onDone={setDone} />}
        </div>

        <Summary />
      </div>
    </>
  );
}

/* ------------------------------------------------------------ steps */

function TripStep({ onNext }: { onNext: () => void }) {
  const d = useDraft();
  return (
    <section className="step" aria-labelledby="step-title">
      <h2 id="step-title">Where and when</h2>
      <div className="trip-step">
        <TripForm id="trip" submitLabel="Choose a car" onDone={onNext} />
        <RegionMap
          active={[d.pickup, d.dropoff]}
          route
          label={`Map: ${stationName(d.pickup)} to ${stationName(d.dropoff)}`}
        />
      </div>
    </section>
  );
}

function CarStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const d = useDraft();
  const days = rentalDays(d) || 1;
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const car = cars.find((c) => c.id === d.car);
    if (!car) return setError("Choose one of the groups above to carry on.");
    if (d.young && car.minAge > 21)
      return setError(
        `The ${car.name} needs a main driver aged ${car.minAge} or over. Choose another group, or change the driver's age in step 1.`,
      );
    setError("");
    onNext();
  };

  return (
    <form
      className="step"
      aria-labelledby="step-title"
      noValidate
      onSubmit={submit}
    >
      <h2 id="step-title">Choose a car</h2>
      <p className="step-intro">
        {plural(days, "day")} from {stationName(d.pickup)}, {shortDate(d.from)}{" "}
        to {shortDate(d.to)}.
      </p>
      <fieldset
        className="car-options"
        aria-describedby={error ? "car-err" : undefined}
      >
        <legend className="sr-only">Car group</legend>
        {cars.map((car) => {
          const blocked = d.young && car.minAge > 21;
          return (
            <label
              key={car.id}
              className="car-option"
              data-blocked={blocked ? "" : undefined}
            >
              <input
                type="radio"
                name="car"
                value={car.id}
                checked={d.car === car.id}
                onChange={() => {
                  setDraft({ car: car.id });
                  setError("");
                }}
              />
              <CarDrawing car={car} />
              <span className="car-option-text">
                <strong>{car.name}</strong>
                <span>
                  {car.className} · {car.seats} seats · {car.transmission}
                </span>
                {blocked && (
                  <span className="car-option-warn">
                    Main driver {car.minAge}+
                  </span>
                )}
              </span>
              <span className="car-option-price tnum">
                <strong>{money(car.rate * days)}</strong>
                <span>{money(car.rate)}/day</span>
              </span>
            </label>
          );
        })}
      </fieldset>
      {error && (
        <p className="field-error" id="car-err" role="alert">
          {error}
        </p>
      )}
      <StepNav onBack={onBack} next="Extras and cover" />
    </form>
  );
}

function ExtrasStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const d = useDraft();
  const car = cars.find((c) => c.id === d.car);
  const [code, setCode] = useState(d.code);
  const [codeError, setCodeError] = useState("");
  const [applied, setApplied] = useState(d.code ? `${d.code} applied.` : "");
  const days = rentalDays(d);

  const apply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setDraft({ code: "" });
      setApplied("");
      return setCodeError("");
    }
    const deal = findDeal(trimmed);
    if (!deal) {
      setApplied("");
      return setCodeError(
        `We don't recognise ${trimmed}. Codes are listed on the Deals page.`,
      );
    }
    const problem = dealProblem(deal, d, days, car);
    if (problem) {
      setApplied("");
      return setCodeError(problem);
    }
    setCodeError("");
    setDraft({ code: deal.code });
    setApplied(`${deal.code} applied: ${deal.title}.`);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim() && code.trim().toUpperCase() !== d.code) return apply();
    if (codeError) return;
    onNext();
  };

  const setQty = (id: string, n: number) =>
    setDraft({ extras: { ...d.extras, [id]: n } });

  return (
    <form
      className="step"
      aria-labelledby="step-title"
      noValidate
      onSubmit={submit}
    >
      <h2 id="step-title">Cover and extras</h2>

      <fieldset className="cover-options">
        <legend>Damage cover</legend>
        {coverage.map((c) => (
          <label key={c.id} className="cover-option">
            <input
              type="radio"
              name="coverage"
              value={c.id}
              checked={d.coverage === c.id}
              onChange={() => setDraft({ coverage: c.id })}
            />
            <span className="cover-name">
              <strong>{c.name}</strong>
              <span className="tnum">
                {c.perDay ? `+${money(c.perDay)}/day` : "Included"}
              </span>
            </span>
            <span className="cover-text">{c.summary}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="extra-options">
        <legend>Extras</legend>
        {extras
          .filter((x) => !x.only || (car && x.only.includes(car.id)))
          .map((x) => (
            <div key={x.id} className="extra-row">
              <Stepper
                label={x.name}
                detail={x.note}
                value={d.extras[x.id] ?? 0}
                max={x.max}
                onChange={(n) => setQty(x.id, n)}
              />
              <span className="extra-price tnum">
                {money(x.price)}/{x.per}
                {x.cap ? `, max ${money(x.cap)}` : ""}
              </span>
            </div>
          ))}
      </fieldset>

      <div className="field promo" data-invalid={codeError ? "" : undefined}>
        <label htmlFor="f-code">Deal code</label>
        <div className="promo-row">
          <input
            id="f-code"
            name="code"
            value={code}
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="e.g. WEEKLONG"
            aria-invalid={codeError ? true : undefined}
            aria-describedby={
              codeError ? "f-code-err" : applied ? "f-code-ok" : undefined
            }
            onChange={(e) => {
              setCode(e.target.value);
              setCodeError("");
            }}
          />
          <button type="button" className="btn btn-outline" onClick={apply}>
            Apply
          </button>
        </div>
        {codeError ? (
          <p className="field-error" id="f-code-err">
            {codeError}
          </p>
        ) : (
          <p className="field-ok" id="f-code-ok" aria-live="polite">
            {applied}
          </p>
        )}
      </div>

      <StepNav onBack={onBack} next="Driver details" />
    </form>
  );
}

function DriverStep({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: (c: Confirmed) => void;
}) {
  const d = useDraft();
  const q = quote(d);
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = String(new FormData(form).get("phone") ?? "");
    const found = validate(
      form,
      {
        first: "Enter the main driver's first name, as on their license.",
        last: "Enter the main driver's last name, as on their license.",
        email:
          "Enter an email like you@example.com; your booking number goes there.",
        phone:
          "Enter a phone number with at least 7 digits so we can text your bay.",
        license:
          "Enter the license number: 5 to 16 letters and digits, no spaces.",
        flight:
          "Flight numbers look like RM 214 or RM214: two letters, then 1–4 digits.",
        terms: "Tick to accept the rental terms before we can reserve the car.",
      },
      phone && phone.replace(/\D/g, "").length < 7
        ? {
            phone:
              "Enter a phone number with at least 7 digits so we can text your bay.",
          }
        : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(1100);
    const data = new FormData(form);
    onDone({
      ref: `RM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      draft: d,
      total: q.total,
      name: `${data.get("first")} ${data.get("last")}`,
      email: String(data.get("email")),
      fastLane: data.get("fastlane") === "on",
    });
    resetDraft();
    window.scrollTo({ top: 0 });
  };

  return (
    <form
      className="step"
      aria-labelledby="step-title"
      noValidate
      onSubmit={submit}
      onChange={onChange}
      aria-busy={busy}
    >
      <h2 id="step-title">Main driver</h2>
      <div className="form-grid">
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
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
        <Field
          label="Mobile"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          hint="We text your bay number on the day."
          error={errors.phone}
        />
        <Field
          label="License number"
          name="license"
          required
          pattern="[A-Za-z0-9]{5,16}"
          error={errors.license}
        />
        <Field label="License issued in" name="country" error={errors.country}>
          <select defaultValue="United States">
            {[
              "United States",
              "Canada",
              "Mexico",
              "United Kingdom",
              "European Union",
              "Australia",
              "Japan",
              "Other",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        {stations.find((s) => s.id === d.pickup)?.kind === "Airport" && (
          <Field
            label="Flight number (optional)"
            name="flight"
            pattern="[A-Za-z]{2}\s?[0-9]{1,4}"
            hint="We hold the car until two hours after you actually land."
            error={errors.flight}
            className="span-2"
          />
        )}
      </div>
      <label className="check">
        <input type="checkbox" name="fastlane" defaultChecked />
        <span>
          Fast Lane: print my key tag before I arrive and let me skip the
          counter
        </span>
      </label>
      <div className="check-field" data-invalid={errors.terms ? "" : undefined}>
        <label className="check">
          <input
            type="checkbox"
            name="terms"
            required
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "f-terms-err" : undefined}
          />
          <span>
            I accept the rental terms, including the{" "}
            {money(cars.find((c) => c.id === d.car)?.deposit ?? 0)} deposit hold
            at pickup.
          </span>
        </label>
        {errors.terms && (
          <p className="field-error" id="f-terms-err">
            {errors.terms}
          </p>
        )}
      </div>
      <StepNav
        onBack={onBack}
        next={busy ? "Reserving your car…" : `Reserve for ${money(q.total)}`}
        busy={busy}
      />
      <p className="muted">{bookingCopy.note}</p>
    </form>
  );
}

function StepNav({
  onBack,
  next,
  busy,
}: {
  onBack: () => void;
  next: string;
  busy?: boolean;
}) {
  return (
    <div className="step-nav">
      <button
        type="button"
        className="btn btn-ghost"
        onClick={onBack}
        disabled={busy}
      >
        <ArrowLeft aria-hidden="true" /> Back
      </button>
      <button type="submit" className="btn btn-sign" disabled={busy}>
        {busy ? <Loader2 className="spin" aria-hidden="true" /> : null}
        {next}
        {!busy && <ArrowRight aria-hidden="true" />}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------ summary */

function Summary() {
  const d = useDraft();
  const q = quote(d);
  const days = rentalDays(d);
  return (
    <aside className="agreement" aria-label="Your rental">
      <h2>Your rental</h2>
      <dl className="agreement-trip">
        <div>
          <dt>Pick up</dt>
          <dd>
            {stationName(d.pickup)}
            <span>
              {shortDate(d.from)}, {clock(d.fromTime)}
            </span>
          </dd>
        </div>
        <div>
          <dt>Return</dt>
          <dd>
            {stationName(d.dropoff)}
            <span>
              {shortDate(d.to)}, {clock(d.toTime)}
            </span>
          </dd>
        </div>
        <div>
          <dt>Length</dt>
          <dd>{days ? plural(days, "day") : "Check your dates"}</dd>
        </div>
      </dl>
      {q.car ? (
        <>
          <p className="key-tag">
            <span>{q.car.acriss}</span>
            {q.car.name}
          </p>
          <table className="agreement-lines tnum">
            <tbody>
              {q.lines.map((l) => (
                <tr key={l.label}>
                  <th scope="row">
                    {l.label}
                    {l.note && <small> · {l.note}</small>}
                  </th>
                  <td>
                    {l.amount < 0 ? `−${money(-l.amount)}` : money(l.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total, paid at return</th>
                <td aria-live="polite">{money(q.total)}</td>
              </tr>
            </tfoot>
          </table>
          {q.problem && d.code && (
            <p className="field-error">{q.problem} The code is not counted.</p>
          )}
        </>
      ) : (
        <p className="muted">
          Choose a car to see the full price, line by line.
        </p>
      )}
      <ul className="ticks ticks-small">
        {bookingCopy.included.map((i) => (
          <li key={i}>
            <Check aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ------------------------------------------------------------ confirmation */

function Confirmation({ done }: { done: Confirmed }) {
  const { draft: d } = done;
  const car = cars.find((c) => c.id === d.car)!;
  const station = stations.find((s) => s.id === d.pickup)!;
  return (
    <section className="wrap confirm" aria-labelledby="confirm-title">
      <div className="confirm-copy" aria-live="polite">
        <h1 id="confirm-title">You're booked, {done.name.split(" ")[0]}.</h1>
        <p className="lede">
          The {car.name} is reserved for {shortDate(d.from)}. Your booking
          number is on its way to {done.email}.
          {done.fastLane
            ? " We'll text your bay number the morning you arrive."
            : " Bring your license and card to the counter."}
        </p>
        <p className="muted">{bookingCopy.note}</p>
        <div className="confirm-actions">
          <Link to={`/locations/${station.id}`} className="btn btn-sign">
            How to find {station.short} <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>

      <article className="tag-card" aria-label="Your key tag">
        <span className="tag-hole" aria-hidden="true" />
        <p className="tag-ref tnum">{done.ref}</p>
        <p className="tag-bay">
          <span>Bay</span>
          {done.fastLane ? "Texted on the day" : "At the counter"}
        </p>
        <CarDrawing car={car} />
        <dl className="tag-lines">
          <div>
            <dt>Car</dt>
            <dd>
              {car.name} · {car.acriss}
            </dd>
          </div>
          <div>
            <dt>Pick up</dt>
            <dd>
              {station.code} · {shortDate(d.from)}, {clock(d.fromTime)}
            </dd>
          </div>
          <div>
            <dt>Return</dt>
            <dd>
              {stations.find((s) => s.id === d.dropoff)?.code} ·{" "}
              {shortDate(d.to)}, {clock(d.toTime)}
            </dd>
          </div>
          <div>
            <dt>Counter</dt>
            <dd>{station.counter}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd className="tnum">{money(done.total)}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
