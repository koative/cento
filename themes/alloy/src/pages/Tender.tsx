import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { sectors, tender } from "../content";
import { Field } from "../components/Field";
import { dateLabel, money } from "../lib/format";
import { pause, reference, useErrors, validate } from "../lib/forms";

type Mode = "tender" | "estimate";
type Sent = { ref: string; mode: Mode; project: string; detail: string };

const isoIn = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

export function Tender() {
  const [mode, setMode] = useState<Mode>("tender");
  const [rateId, setRateId] = useState(tender.rates[0].id);
  const [area, setArea] = useState("");
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [sent, setSent] = useState<Sent | null>(null);
  const { errors, setErrors, onChange } = useErrors();

  const minReturn = isoIn(10);
  const rate = tender.rates.find((r) => r.id === rateId)!;
  const sqft = Number(area);
  const estimate =
    sqft >= 2000 && sqft <= 2_000_000
      ? {
          low: sqft * rate.low,
          high: sqft * rate.high,
          weeks: Math.round(14 + (sqft / 10_000) * rate.weeksPer10k),
        }
      : null;

  const messages: Record<string, string> = {
    name: "Enter your name so the pre-construction lead knows who to call.",
    company: "Enter your company or organisation.",
    email: "Enter an email like name@company.com so we can reply.",
    phone:
      "Enter a phone number with at least 10 digits, like +1 555 010 2030.",
    project: "Give the project a name, even a working title.",
    location: "Enter the site address or at least the town.",
    procurement: "Choose a procurement route, or pick “Not decided yet”.",
    band: "Choose the estimated contract value.",
    returnDate: `Choose a tender return date on or after ${dateLabel(minReturn)}. We need ten days to price properly.`,
    docs: "Enter a full link starting with https://, or leave it empty.",
    type: "Choose the closest building type.",
    area: "Enter the gross floor area in square feet, between 2,000 and 2,000,000.",
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setState("sending");
    await pause();
    setSent({
      ref: reference("T"),
      mode,
      project: String(data.get("project")),
      detail:
        mode === "tender"
          ? `${data.get("procurement")}, ${data.get("band")}, returning ${dateLabel(String(data.get("returnDate")))}`
          : `${rate.label}, ${sqft.toLocaleString("en-US")} sq ft, indicative ${money(estimate!.low)} – ${money(estimate!.high)}`,
    });
    setState("idle");
    setArea("");
  }

  return (
    <div className="wrap tender-layout">
      <div className="tender-intro">
        <h1>{tender.title}</h1>
        <p className="lede">{tender.intro}</p>
        <dl className="contact-list">
          {tender.contacts.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>
                <a href={c.href}>{c.value}</a>
              </dd>
            </div>
          ))}
        </dl>
        <h2>What happens next</h2>
        <ol className="next-list">
          {tender.after.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      </div>

      <section className="form-card" aria-labelledby="tender-form-h">
        <h2 id="tender-form-h" className="sr-only">
          Tender or quote request
        </h2>
        <div aria-live="polite">
          {sent && (
            <div className="success">
              <Check aria-hidden="true" size={28} />
              <h3>
                {sent.mode === "tender"
                  ? "Tender invitation logged"
                  : "Estimate request logged"}
              </h3>
              <p>
                Reference <strong className="num">{sent.ref}</strong> for{" "}
                <strong>{sent.project}</strong>: {sent.detail}.
              </p>
              <p>A pre-construction lead will call within two working days.</p>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => setSent(null)}
              >
                Send another request
              </button>
            </div>
          )}
        </div>

        {!sent && (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form"
          >
            <fieldset className="mode">
              <legend>I want to</legend>
              <div className="segmented">
                {(
                  [
                    ["tender", "Invite Alloy to tender"],
                    ["estimate", "Get a budget estimate"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="mode"
                      value={value}
                      checked={mode === value}
                      onChange={() => {
                        setMode(value);
                        setErrors({});
                      }}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-grid">
              <Field
                label="Your name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="Company"
                name="company"
                autoComplete="organization"
                required
                error={errors.company}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="\+?[0-9 .\-]{10,}"
                error={errors.phone}
              />
              <Field
                label="Project name"
                name="project"
                required
                error={errors.project}
              />
              <Field
                label="Site location"
                name="location"
                required
                error={errors.location}
              />
            </div>

            {mode === "tender" ? (
              <div className="form-grid">
                <Field
                  label="Procurement route"
                  name="procurement"
                  error={errors.procurement}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a route
                    </option>
                    {tender.procurement.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Estimated contract value"
                  name="band"
                  error={errors.band}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a band
                    </option>
                    {tender.valueBands.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Tender return date"
                  name="returnDate"
                  type="date"
                  min={minReturn}
                  required
                  error={errors.returnDate}
                />
                <Field
                  label="Link to tender documents (optional)"
                  name="docs"
                  type="url"
                  placeholder="https://"
                  hint="A shared folder or portal link."
                  error={errors.docs}
                />
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <Field label="Building type" name="type" error={errors.type}>
                    <select
                      required
                      value={rateId}
                      onChange={(e) => setRateId(e.target.value)}
                    >
                      {tender.rates.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Gross floor area (sq ft)"
                    name="area"
                    type="number"
                    inputMode="numeric"
                    min={2000}
                    max={2_000_000}
                    step={1}
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    error={errors.area}
                  />
                  <Field label="Sector" name="sector">
                    <select defaultValue={sectors[0]}>
                      {sectors.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Target start (optional)"
                    name="start"
                    type="month"
                  />
                </div>
                <div className="estimate" aria-live="polite">
                  {estimate ? (
                    <>
                      <p className="estimate-figure num">
                        {money(estimate.low)} – {money(estimate.high)}
                      </p>
                      <p>
                        About{" "}
                        <strong className="num">{estimate.weeks} weeks</strong>{" "}
                        on site at ${rate.low}–${rate.high} per sq ft.
                      </p>
                    </>
                  ) : (
                    <p>
                      Enter a floor area to see an indicative cost range and
                      programme length.
                    </p>
                  )}
                  <p className="quiet">
                    Indicative 2026 Calloway Valley rates before site
                    conditions, design or market changes.
                  </p>
                </div>
              </>
            )}

            <Field
              label="Anything else we should know (optional)"
              name="message"
            >
              <textarea rows={4} maxLength={1200} />
            </Field>

            <button
              type="submit"
              className="btn btn-signal btn-block"
              disabled={state === "sending"}
            >
              {state === "sending"
                ? "Logging your request…"
                : mode === "tender"
                  ? "Send tender invitation"
                  : "Request budget estimate"}
            </button>
            <p className="quiet">
              Demo form: nothing is sent; your request stays in this browser
              tab.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
