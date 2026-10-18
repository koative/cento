import { useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Link } from "../router";
import { brand, vehicles } from "../content";
import { described, focusOnMount, useFormFlow, type Rules } from "../lib/form";
import { day, money, num, useNow } from "../lib/format";
import { price, useQuote } from "../lib/quote";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Brazil",
  "India",
  "Other",
];

export function Reserve() {
  const q = useQuote();
  const now = useNow(60000);
  const p = price(q, now);
  const [kind, setKind] = useState<"rideshare" | "dedicated">(
    p.problem ? "dedicated" : "rideshare",
  );
  const [ref, setRef] = useState("");

  const rules: Rules = {
    org: { message: "Enter your organisation's name." },
    name: {
      message:
        "Enter your full name so your mission manager knows who to call.",
    },
    email: {
      message: "Enter a work email like name@company.com.",
      test: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
    },
    phone: {
      message:
        "Use digits, spaces and an optional leading +, e.g. +1 555 0100.",
      test: (v) => v === "" || /^\+?[\d\s()-]{7,}$/.test(v),
    },
    country: {
      message: "Choose the country your spacecraft operator is registered in.",
    },
    spacecraft: {
      message: "Name the spacecraft, even if it is a working title.",
    },
    readiness: { message: "Tell us where the spacecraft is in its build." },
    propulsion: { message: "Choose yes or no for onboard propulsion." },
    ...(kind === "dedicated"
      ? {
          target: {
            message:
              "Describe the orbit and the earliest date you could launch (at least 20 characters).",
            test: (v: string) => v.length >= 20,
          },
        }
      : {}),
    consent: {
      message:
        "Confirm you understand this is a reservation request, not a contract.",
    },
  };
  const form = useFormFlow(rules, 1400);
  const e = form.errors;
  const onInput = (ev: FormEvent<HTMLFormElement>) =>
    form.clear((ev.target as HTMLInputElement).name);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Reserve a launch</h1>
          <p className="lede">
            Hold a rideshare slot from your quote, or ask for a dedicated
            Kestrel. A mission manager replies within one working day with the
            payload user's guide and a draft launch services agreement.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap reserve-grid">
          <div aria-live="polite">
            {form.status === "done" ? (
              <div className="success">
                <CircleCheck aria-hidden="true" size={40} />
                <h2 tabIndex={-1} ref={focusOnMount}>
                  Request received.
                </h2>
                <p className="tnum">
                  Reference <strong>{ref}</strong>
                </p>
                <p>
                  {kind === "rideshare" && p.flight
                    ? `We have pencilled ${num(p.mass)} kg onto ${p.flight.name} for 10 working days while we review your spacecraft.`
                    : "Our Kestrel team will check the manifest for a matching window and send options within one working day."}
                </p>
                <ol className="next-steps">
                  <li>
                    Your mission manager emails the payload user's guide and an
                    interface questionnaire.
                  </li>
                  <li>
                    A 45-minute technical call to confirm envelope, mass
                    properties and separation.
                  </li>
                  <li>
                    You sign the launch services agreement and pay the 10%
                    deposit to confirm.
                  </li>
                </ol>
                <p className="fine">
                  This is a demo: nothing was sent and no slot was actually
                  held.
                </p>
                <div className="actions">
                  <Link to="/manifest" className="btn btn-dark">
                    Back to the manifest
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost-dark"
                    onClick={form.reset}
                  >
                    Make another request
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                className="form"
                onInput={onInput}
                onSubmit={(ev) =>
                  form.submit(ev, () =>
                    setRef(
                      `ORB-${kind === "rideshare" ? "RS" : "DL"}-${String(Date.now()).slice(-5)}`,
                    ),
                  )
                }
              >
                <fieldset>
                  <legend>Request</legend>
                  <div className="segmented">
                    <label>
                      <input
                        type="radio"
                        name="kind"
                        checked={kind === "rideshare"}
                        onChange={() => setKind("rideshare")}
                      />
                      <span>Rideshare slot</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="kind"
                        checked={kind === "dedicated"}
                        onChange={() => setKind("dedicated")}
                      />
                      <span>Dedicated Kestrel</span>
                    </label>
                  </div>
                  {kind === "dedicated" && (
                    <div className="field">
                      <label htmlFor="target">
                        Target orbit and earliest launch date
                      </label>
                      <textarea
                        rows={3}
                        required
                        minLength={20}
                        {...described("target", e.target, true)}
                      />
                      <p className="hint" id="target-hint">
                        For example: SSO 600 km, 13:30 ascending node, from May
                        2027.
                      </p>
                      {e.target && (
                        <p className="field-error" id="target-error">
                          {e.target}
                        </p>
                      )}
                    </div>
                  )}
                </fieldset>

                <fieldset>
                  <legend>You</legend>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="org">Organisation</label>
                      <input
                        required
                        autoComplete="organization"
                        {...described("org", e.org)}
                      />
                      {e.org && (
                        <p className="field-error" id="org-error">
                          {e.org}
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <label htmlFor="name">Full name</label>
                      <input
                        required
                        autoComplete="name"
                        {...described("name", e.name)}
                      />
                      {e.name && (
                        <p className="field-error" id="name-error">
                          {e.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="email">Work email</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        {...described("email", e.email)}
                      />
                      {e.email && (
                        <p className="field-error" id="email-error">
                          {e.email}
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <label htmlFor="phone">
                        Phone <span className="optional">optional</span>
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        {...described("phone", e.phone)}
                      />
                      {e.phone && (
                        <p className="field-error" id="phone-error">
                          {e.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="country">
                      Operator's country of registration
                    </label>
                    <select
                      required
                      defaultValue=""
                      {...described("country", e.country)}
                    >
                      <option value="" disabled>
                        Choose a country
                      </option>
                      {countries.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    {e.country && (
                      <p className="field-error" id="country-error">
                        {e.country}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Spacecraft</legend>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="spacecraft">Spacecraft name</label>
                      <input
                        required
                        {...described("spacecraft", e.spacecraft)}
                      />
                      {e.spacecraft && (
                        <p className="field-error" id="spacecraft-error">
                          {e.spacecraft}
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <label htmlFor="readiness">Build status</label>
                      <select
                        required
                        defaultValue=""
                        {...described("readiness", e.readiness)}
                      >
                        <option value="" disabled>
                          Choose one
                        </option>
                        <option>Design phase</option>
                        <option>Engineering model in test</option>
                        <option>Flight model in integration</option>
                        <option>Flight model complete</option>
                      </select>
                      {e.readiness && (
                        <p className="field-error" id="readiness-error">
                          {e.readiness}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className="field"
                    role="radiogroup"
                    aria-labelledby="propulsion-label"
                    aria-describedby={
                      e.propulsion ? "propulsion-error" : undefined
                    }
                  >
                    <p id="propulsion-label" className="label">
                      Onboard propulsion or pressure vessels?
                    </p>
                    <div className="segmented">
                      <label>
                        <input type="radio" name="propulsion" value="yes" />
                        <span>Yes</span>
                      </label>
                      <label>
                        <input type="radio" name="propulsion" value="no" />
                        <span>No</span>
                      </label>
                    </div>
                    {e.propulsion && (
                      <p className="field-error" id="propulsion-error">
                        {e.propulsion}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="notes">
                      Anything we should know{" "}
                      <span className="optional">optional</span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={800}
                      {...described("notes")}
                    />
                  </div>
                </fieldset>

                <div className="field">
                  <label className="check-inline">
                    <input
                      type="checkbox"
                      required
                      {...described("consent", e.consent)}
                    />
                    I understand this is a reservation request, not a contract,
                    and that {brand.name} will contact me about it.
                  </label>
                  {e.consent && (
                    <p className="field-error" id="consent-error">
                      {e.consent}
                    </p>
                  )}
                </div>

                <button
                  className="btn btn-primary"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending"
                    ? "Sending request…"
                    : "Send reservation request"}
                </button>
                <p className="fine">Demo form: nothing leaves your browser.</p>
              </form>
            )}
          </div>

          <aside className="reserve-summary" aria-labelledby="summary-title">
            <h2 id="summary-title">
              {kind === "rideshare" ? "Your quote" : "Dedicated Kestrel"}
            </h2>
            {kind === "rideshare" ? (
              <>
                <dl className="spec-list tnum">
                  <div>
                    <dt>Payload</dt>
                    <dd>
                      {q.kind === "cubesat"
                        ? `${q.units}U cubesat`
                        : `${num(q.mass)} kg microsatellite`}
                    </dd>
                  </div>
                  <div>
                    <dt>Orbit</dt>
                    <dd>
                      {p.orbit.custom
                        ? `SSO ${num(q.altitude)} km via Wayfarer`
                        : p.orbit.detail}
                    </dd>
                  </div>
                  <div>
                    <dt>Flight</dt>
                    <dd>
                      {p.flight
                        ? `${p.flight.name}, NET ${day(p.flight.date)}`
                        : "No open flight"}
                    </dd>
                  </div>
                  <div>
                    <dt>Deposit at signature</dt>
                    <dd>{money(p.schedule[0].amount)}</dd>
                  </div>
                </dl>
                <p className="summary-total tnum">
                  <span>Fixed price</span>
                  <strong>{money(p.total)}</strong>
                </p>
                {p.problem && <p className="quote-problem">{p.problem}</p>}
              </>
            ) : (
              <p>
                Kestrel flies one customer to an exact orbit for{" "}
                {vehicles[0].price}. Lead time is about five months from
                contract to launch.
              </p>
            )}
            <Link to="/rideshare" className="text-link">
              Edit in the calculator <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
