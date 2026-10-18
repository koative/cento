import { useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { bookPage, brand, seasons, services, villas } from "../content";
import { daysBetween, fmtDay, isDay, today } from "../lib/dates";
import { pause, validate, type Errors } from "../lib/form";
import {
  checkStay,
  findVilla,
  money,
  quoteFor,
  seasonOf,
  setStay,
  useStay,
} from "../lib/stay";
import { Field, useErrors } from "../components/Field";

const extras = services.filter((s) => s.bookable);

type Confirmation = {
  ref: string;
  email: string;
  villa: string;
  arrival: string;
  departure: string;
  total: number;
  extras: string[];
};

export function Book() {
  const stay = useStay();
  const villa = findVilla(stay.villa);
  const { errors, setErrors, onChange } = useErrors();
  const [picked, setPicked] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Confirmation | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const datesOk =
    !!villa &&
    isDay(stay.arrival) &&
    isDay(stay.departure) &&
    !checkStay(villa, stay.arrival, stay.departure);
  const quote = datesOk
    ? quoteFor(villa, stay.arrival, stay.departure, stay.adults)
    : null;
  const clear = (...names: string[]) =>
    setErrors((e) =>
      Object.fromEntries(Object.entries(e).filter(([k]) => !names.includes(k))),
    );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Errors = {};
    if (villa) {
      if (stay.adults + stay.children > villa.sleeps)
        extra.adults = `${villa.name} sleeps ${villa.sleeps}. Choose fewer guests or a larger house.`;
      if (isDay(stay.arrival) && isDay(stay.departure)) {
        const problem = checkStay(villa, stay.arrival, stay.departure);
        if (problem)
          extra[
            problem.startsWith("Arrival") ||
            problem.includes("Saturday arrival")
              ? "arrival"
              : "departure"
          ] = problem;
      }
    }
    const found = validate(
      form,
      {
        villa: "Choose the house you would like to stay in.",
        arrival: "Choose the day you arrive, from today onwards.",
        departure: "Choose the day you leave.",
        name: "Enter the name of the lead guest, as on their passport or ID.",
        email:
          "Enter an email address like you@example.com; the confirmation goes there.",
        phone:
          "Enter a phone number with the country code, like +44 7700 900123.",
        country: "Tell us which country you are travelling from.",
        terms: "Tick to accept the booking terms before we hold the dates.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length || !villa || !quote) return;
    setSending(true);
    await pause(1200);
    const data = new FormData(form);
    setDone({
      ref: `HW-${String(Math.floor(1000 + Math.random() * 9000))}`,
      email: String(data.get("email")),
      villa: villa.name,
      arrival: stay.arrival,
      departure: stay.departure,
      total: quote.total,
      extras: extras.filter((s) => picked.includes(s.id)).map((s) => s.name),
    });
    setSending(false);
    requestAnimationFrame(() => doneRef.current?.focus());
  };

  if (done)
    return (
      <div
        className="page wrap confirm"
        ref={doneRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <h1>Your dates are held.</h1>
        <p className="lede">
          {done.villa},{" "}
          {fmtDay(done.arrival, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          to{" "}
          {fmtDay(done.departure, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          . We hold them for 48 hours while Marta confirms by email to{" "}
          {done.email}.
        </p>
        <dl className="confirm-facts">
          <div>
            <dt>Reference</dt>
            <dd>{done.ref}</dd>
          </div>
          <div>
            <dt>Nights</dt>
            <dd>{daysBetween(done.arrival, done.departure)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{money(done.total)}</dd>
          </div>
          <div>
            <dt>Extras</dt>
            <dd>{done.extras.length ? done.extras.join(", ") : "None yet"}</dd>
          </div>
        </dl>
        <p className="fine">
          This is a demo: nothing was sent and no card was charged.
        </p>
        <div className="actions">
          <Link to="/guide" className="btn btn-primary">
            Start planning the island
          </Link>
          <Link to="/villas" className="btn btn-quiet">
            Back to the villas
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{bookPage.title}</h1>
        <p className="lede">{bookPage.lede}</p>
      </header>

      <div className="wrap book-layout">
        <form
          className="form book-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
        >
          <fieldset>
            <legend>The house and the dates</legend>
            <Field label="House" name="villa" error={errors.villa}>
              <select
                required
                value={stay.villa}
                onChange={(e) => {
                  setStay({ villa: e.target.value });
                  clear("arrival", "departure", "adults");
                }}
              >
                <option value="">Choose a house</option>
                {villas.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name} · sleeps {v.sleeps}
                  </option>
                ))}
              </select>
            </Field>
            <div className="form-row">
              <Field
                label="Arrive"
                name="arrival"
                type="date"
                required
                min={today()}
                value={stay.arrival}
                onChange={(e) => {
                  setStay({ arrival: e.target.value });
                  clear("arrival", "departure");
                }}
                error={errors.arrival}
              />
              <Field
                label="Leave"
                name="departure"
                type="date"
                required
                min={stay.arrival || today()}
                value={stay.departure}
                onChange={(e) => {
                  setStay({ departure: e.target.value });
                  clear("arrival", "departure");
                }}
                error={errors.departure}
              />
            </div>
            {villa && isDay(stay.arrival) && (
              <p className="field-hint">
                {seasons[seasonOf(stay.arrival)].note} Free nights are on the{" "}
                <Link to={`/villas/${villa.slug}`}>{villa.name} calendar</Link>.
              </p>
            )}
            <div className="form-row">
              <Field label="Adults" name="adults" error={errors.adults}>
                <select
                  value={stay.adults}
                  onChange={(e) => {
                    setStay({ adults: Number(e.target.value) });
                    clear("adults");
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </Field>
              <Field label="Children under 16" name="children">
                <select
                  value={stay.children}
                  onChange={(e) => {
                    setStay({ children: Number(e.target.value) });
                    clear("adults");
                  }}
                >
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend>Extras from the concierge</legend>
            <p className="field-hint">
              Optional. Added to the final bill and confirmed with names and
              times before you arrive.
            </p>
            <ul className="extras">
              {extras.map((s) => (
                <li key={s.id}>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={picked.includes(s.id)}
                      onChange={() =>
                        setPicked((p) =>
                          p.includes(s.id)
                            ? p.filter((x) => x !== s.id)
                            : [...p, s.id],
                        )
                      }
                    />
                    <span>
                      <strong>{s.name}</strong> {money(s.price)} {s.unit}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <legend>Lead guest</legend>
            <div className="form-row">
              <Field
                label="Full name"
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
            <div className="form-row">
              <Field
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="\+?[0-9 \(\)\-]{7,}"
                placeholder="+44 7700 900123"
                error={errors.phone}
              />
              <Field
                label="Travelling from"
                name="country"
                required
                autoComplete="country-name"
                error={errors.country}
              />
            </div>
            <Field
              label="Expected arrival at the house"
              name="eta"
              hint="So someone is at the door when you get there."
            >
              <select defaultValue="afternoon">
                <option value="morning">
                  Before 12:00 (early check-in on request)
                </option>
                <option value="afternoon">16:00 – 19:00</option>
                <option value="evening">19:00 – 22:00</option>
                <option value="late">After 22:00 (late ferry or flight)</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </Field>
            <Field
              label="Anything we should know?"
              name="notes"
              hint="Allergies, a birthday, a cot, a dog."
            >
              <textarea rows={4} />
            </Field>
          </fieldset>

          <div className="field" data-invalid={errors.terms ? "" : undefined}>
            <label className="check">
              <input
                type="checkbox"
                name="terms"
                id="f-terms"
                required
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "f-terms-err" : undefined}
              />
              <span>
                I accept the booking terms: 30% now, the balance eight weeks
                before arrival, and the cancellation policy in{" "}
                <Link to="/good-to-know">Good to know</Link>.
              </span>
            </label>
            {errors.terms && (
              <p className="field-error" id="f-terms-err">
                {errors.terms}
              </p>
            )}
          </div>

          <p className="fine">
            Demo booking: nothing is sent to {brand.name} and no card is
            charged.
          </p>
          <button
            className="btn btn-primary btn-wide"
            type="submit"
            disabled={sending}
            aria-busy={sending}
          >
            {sending
              ? "Holding your dates…"
              : quote
                ? `Request booking · ${money(quote.deposit)} deposit`
                : "Request booking"}
          </button>
        </form>

        <aside className="book-summary" aria-label="Booking summary">
          {villa ? (
            <>
              <img src={villa.photos[0].src} alt="" width={1280} height={853} />
              <h2 className="plaque">{villa.name}</h2>
              <p className="summary-place">{villa.place}</p>
              {quote ? (
                <>
                  <p className="summary-dates">
                    {fmtDay(stay.arrival)} – {fmtDay(stay.departure)} ·{" "}
                    {quote.nights} nights · {stay.adults + stay.children} guests
                  </p>
                  <table className="quote-lines">
                    <tbody>
                      {quote.lines.map((l) => (
                        <tr key={l.season}>
                          <th scope="row">
                            {l.nights} × {money(l.rate)}{" "}
                            {seasons[l.season].label.toLowerCase()}
                          </th>
                          <td>{money(l.nights * l.rate)}</td>
                        </tr>
                      ))}
                      <tr>
                        <th scope="row">Final clean and linen</th>
                        <td>{money(quote.cleaning)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tourist tax</th>
                        <td>{money(quote.tax)}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="row">Total</th>
                        <td>{money(quote.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <p className="fine">
                    {money(quote.deposit)} now,{" "}
                    {money(quote.total - quote.deposit)} eight weeks before
                    arrival.
                    {picked.length > 0 &&
                      ` Plus ${picked.length} ${picked.length === 1 ? "extra" : "extras"}, billed at the end of your stay.`}
                  </p>
                </>
              ) : (
                <p className="fine">
                  Add dates that work for {villa.name} and the price appears
                  here.
                </p>
              )}
            </>
          ) : (
            <p className="fine">
              Choose a house to see the price, or{" "}
              <Link to="/villas">browse the villas</Link> first.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
