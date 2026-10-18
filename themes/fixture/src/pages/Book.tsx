import { useEffect, useRef, useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { Link } from "../router";
import {
  booking,
  brand,
  services,
  tiers,
  trades,
  type Trade,
} from "../content";
import {
  areaForZip,
  clearEstimate,
  estimate,
  loadEstimate,
} from "../lib/estimate";
import { hashParam, money, validate } from "../lib/format";
import { visitDays } from "../lib/hours";
import { Field, useErrors } from "../components/Field";
import { Faq } from "../components/Faq";
import { WoField, WorkOrder } from "../components/WorkOrder";

const messages = {
  service: "Choose the job, or “Not sure” and we'll diagnose it.",
  details:
    "Tell us a little more — at least a sentence about what's happening.",
  day: "Pick a day for the visit.",
  window: "Pick an arrival window for that day.",
  street: "Enter the street address where the work is.",
  name: "Enter the name we should ask for at the door.",
  phone:
    "Enter a phone number with at least 10 digits so the technician can text you.",
  email: "Enter an email like name@example.com for the confirmation.",
  adult:
    "Confirm an adult will be home — we can't start without someone to approve the price.",
};

type Confirmation = {
  no: string;
  job: string;
  when: string;
  address: string;
  name: string;
  phone: string;
  range: string;
};

export function Book() {
  const [attached, setAttached] = useState(loadEstimate);
  const [days] = useState(() => visitDays(new Date(), 8));
  const [day, setDay] = useState("");
  const [win, setWin] = useState("");
  const [zipNote, setZipNote] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Confirmation | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const preset = hashParam("service") || attached?.slug || "";
  const quote = attached && estimate(attached);
  const windows = days.find((d) => d.iso === day)?.windows ?? [];

  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

  const checkZip = (input: HTMLInputElement) => {
    const zip = input.value.trim();
    const area = areaForZip(zip);
    const message = !/^\d{5}$/.test(zip)
      ? "Enter the 5-digit ZIP code for the address."
      : !area
        ? `We don't recognise ${zip}. Check the service areas page, or call the office.`
        : area.tier === "none"
          ? `${area.name} is outside our area — call ${brand.phone} and we'll refer you.`
          : "";
    input.setCustomValidity(message);
    setZipNote(
      area && area.tier !== "none"
        ? `${area.name} · ${tiers[area.tier].fee}`
        : "",
    );
    return message;
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const zipMessage = checkZip(
      form.elements.namedItem("zip") as HTMLInputElement,
    );
    const found = validate(form, { ...messages, zip: zipMessage });
    setErrors(found);
    if (Object.keys(found).length) return;

    const data = new FormData(form);
    const service = services.find((s) => s.slug === data.get("service"));
    const d = days.find((x) => x.iso === day)!;
    const w = d.windows.find((x) => x.id === win)!;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone({
        no: `FX-${24000 + Math.floor(Math.random() * 900)}`,
        job: service?.name ?? "Diagnosis visit",
        when: `${d.weekday} ${d.date}, ${w.label}`,
        address: `${data.get("street")}, ${data.get("zip")}`,
        name: String(data.get("name")),
        phone: String(data.get("phone")),
        range:
          quote && quote.service.slug === service?.slug
            ? `${money(quote.low)} – ${money(quote.high)}`
            : "Fixed price at the door",
      });
      clearEstimate();
    }, 1100);
  };

  const reset = () => {
    setDone(null);
    setAttached(null);
    setDay("");
    setWin("");
    setZipNote("");
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>{booking.title}</h1>
        <p className="lede">{booking.lede}</p>
      </section>

      <div className="wrap book-grid">
        <div className="book-main">
          <div aria-live="polite">
            {done && (
              <div className="confirmation">
                <h2 ref={doneHeading} tabIndex={-1}>
                  You're booked, {done.name.split(" ")[0]}.
                </h2>
                <WorkOrder
                  no={done.no}
                  title="Work order"
                  stamp="Booked"
                  className="wo-confirm"
                >
                  <div className="wo-fields">
                    <WoField label="Job" wide>
                      {done.job}
                    </WoField>
                    <WoField label="Arrival" wide>
                      {done.when}
                    </WoField>
                    <WoField label="Address" wide>
                      {done.address}
                    </WoField>
                    <WoField label="Contact">{done.name}</WoField>
                    <WoField label="Text to">{done.phone}</WoField>
                    <WoField label="Price" wide>
                      {done.range}
                    </WoField>
                  </div>
                </WorkOrder>
                <p>
                  The night before, we'll text {done.phone} with your
                  technician's name, photo and van number, then again when
                  they're 30 minutes out. To change the window, reply to that
                  text.
                </p>
                <div className="actions">
                  <Link to="/" className="btn btn-ink">
                    Back to home
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={reset}
                  >
                    Book another visit
                  </button>
                </div>
              </div>
            )}
          </div>
          {!done && (
            <form
              className="book-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              {attached && quote && (
                <div className="attached">
                  <p>
                    <b>Attached estimate</b> {quote.service.name},{" "}
                    {attached.qty}{" "}
                    {attached.qty === 1
                      ? quote.service.model.unit
                      : quote.service.model.units}{" "}
                    ·{" "}
                    <span className="num">
                      {money(quote.low)} – {money(quote.high)}
                    </span>
                  </p>
                  <div className="attached-actions">
                    <Link to="/estimate">Edit</Link>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        clearEstimate();
                        setAttached(null);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <fieldset>
                <legend>The job</legend>
                <Field
                  label="What needs doing?"
                  name="service"
                  error={errors.service}
                >
                  <select required defaultValue={preset}>
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {(Object.keys(trades) as Trade[]).map((t) => (
                      <optgroup key={t} label={trades[t].label}>
                        {services
                          .filter((s) => s.trade === t)
                          .map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                    <option value="diagnose">Not sure — diagnose it</option>
                  </select>
                </Field>
                <Field
                  label="What's happening?"
                  name="details"
                  error={errors.details}
                  hint="Where in the house, since when, and anything you've already tried."
                >
                  <textarea required minLength={15} rows={4} />
                </Field>
              </fieldset>

              <fieldset
                aria-describedby={
                  errors.day || errors.window ? "f-when-err" : undefined
                }
              >
                <legend>When</legend>
                <p className="group-label" id="day-label">
                  Day
                </p>
                <div
                  className="day-chips"
                  role="radiogroup"
                  aria-labelledby="day-label"
                >
                  {days.map((d) => (
                    <label key={d.iso} className="chip">
                      <input
                        type="radio"
                        name="day"
                        value={d.iso}
                        required
                        checked={day === d.iso}
                        onChange={() => {
                          setDay(d.iso);
                          if (!d.windows.some((w) => w.id === win && !w.full))
                            setWin("");
                        }}
                      />
                      <span>
                        <b>{d.weekday}</b> {d.date}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="group-label" id="win-label">
                  Arrival window
                </p>
                {day ? (
                  <div
                    className="window-chips"
                    role="radiogroup"
                    aria-labelledby="win-label"
                  >
                    {windows.map((w) => (
                      <label
                        key={w.id}
                        className="chip"
                        data-full={w.full ? "" : undefined}
                      >
                        <input
                          type="radio"
                          name="window"
                          value={w.id}
                          required
                          disabled={w.full}
                          checked={win === w.id}
                          onChange={() => setWin(w.id)}
                        />
                        <span>
                          {w.label}
                          {w.full && <small> · full</small>}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="field-hint">
                    Pick a day to see its open windows.
                  </p>
                )}
                {(errors.day || errors.window) && (
                  <p className="field-error" id="f-when-err">
                    {errors.day ?? errors.window}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend>Where</legend>
                <div className="field-row">
                  <Field
                    label="Street address"
                    name="street"
                    error={errors.street}
                    required
                    autoComplete="street-address"
                  />
                  <Field
                    label="ZIP code"
                    name="zip"
                    error={errors.zip}
                    hint={zipNote || undefined}
                    required
                    inputMode="numeric"
                    maxLength={5}
                    autoComplete="postal-code"
                    defaultValue={attached?.zip ?? ""}
                    onBlur={(e) =>
                      e.currentTarget.value && checkZip(e.currentTarget)
                    }
                    className="field-zip"
                  />
                </div>
                <Field
                  label="Access notes (optional)"
                  name="access"
                  hint="Gate code, parking, pets, where the shut-off is."
                />
              </fieldset>

              <fieldset>
                <legend>You</legend>
                <Field
                  label="Full name"
                  name="name"
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <div className="field-row">
                  <Field
                    label="Mobile phone"
                    name="phone"
                    type="tel"
                    error={errors.phone}
                    required
                    autoComplete="tel"
                    pattern="[\d\s\(\)+\-.]*\d[\d\s\(\)+\-.]*"
                    minLength={10}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                </div>
                <div
                  className="check"
                  data-invalid={errors.adult ? "" : undefined}
                >
                  <input
                    id="f-adult"
                    type="checkbox"
                    name="adult"
                    required
                    aria-invalid={errors.adult ? true : undefined}
                    aria-describedby={errors.adult ? "f-adult-err" : undefined}
                  />
                  <label htmlFor="f-adult">
                    An adult (18+) will be home to let the technician in and
                    approve the price.
                  </label>
                  {errors.adult && (
                    <p className="field-error" id="f-adult-err">
                      {errors.adult}
                    </p>
                  )}
                </div>
              </fieldset>

              {Object.keys(errors).length > 0 && (
                <p className="form-summary" role="alert">
                  {Object.keys(errors).length === 1
                    ? "One thing needs fixing"
                    : `${Object.keys(errors).length} things need fixing`}{" "}
                  before we can book — see the notes in red.
                </p>
              )}

              <div className="submit-row">
                <button
                  type="submit"
                  className="btn btn-live btn-lg"
                  disabled={sending}
                  aria-busy={sending}
                >
                  {sending ? "Booking…" : "Book the visit"}
                </button>
                <p className="fine">
                  Demo form — nothing is sent and no visit is booked.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="book-aside" aria-label="Before you book">
          <div className="aside-call">
            <p>Water or sparks right now?</p>
            <a href={brand.emergencyHref} className="sos-tel sos-tel-sm">
              <Phone aria-hidden="true" />
              {brand.emergency}
            </a>
            <p className="fine">
              Prefer to talk? The office is on{" "}
              <a href={brand.phoneHref}>{brand.phone}</a>, weekdays 7 am – 7 pm.
            </p>
          </div>
          <h2>Good to know</h2>
          <Faq items={booking.faq} />
        </aside>
      </div>
    </>
  );
}
