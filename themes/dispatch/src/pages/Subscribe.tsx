import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { subscribe, tiers, type Tier, type TierId } from "../content";
import {
  EMAIL_MSG,
  emailTypo,
  money,
  nextSunday,
  pause,
  validate,
} from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { DeliveryCalendar } from "../components/DeliveryCalendar";
import { Postmark, stampFor } from "../components/Postmark";

type Billing = "monthly" | "yearly";

const priceLine = (t: Tier, billing: Billing) =>
  t.monthly === 0
    ? "$0, forever"
    : billing === "monthly"
      ? `${money(t.monthly)} / month`
      : `${money(t.yearly)} / year`;

export function Subscribe() {
  const [tierId, setTierId] = useState<TierId>("reader");
  const [billing, setBilling] = useState<Billing>("yearly");
  const tier = tiers.find((t) => t.id === tierId)!;
  const formRef = useRef<HTMLElement>(null);

  const choose = (id: TierId) => {
    setTierId(id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page subscribe">
      <header className="wrap page-head">
        <h1>{subscribe.title}</h1>
        <p className="lede">{subscribe.lede}</p>
      </header>

      <section className="wrap" aria-labelledby="plans-title">
        <div className="plans-head">
          <h2 id="plans-title" className="section-title">
            Plans
          </h2>
          <div
            className="billing"
            role="radiogroup"
            aria-label="Billing period"
          >
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
              >
                {b === "monthly" ? "Monthly" : "Yearly"}
                {b === "yearly" && (
                  <span className="billing-save">2 months free</span>
                )}
              </button>
            ))}
          </div>
        </div>
        <ul className="plans">
          {tiers.map((t) => (
            <li
              key={t.id}
              className="plan"
              data-selected={t.id === tierId ? "" : undefined}
            >
              <h3>{t.name}</h3>
              <p className="plan-price">
                {t.monthly === 0
                  ? "$0"
                  : money(billing === "monthly" ? t.monthly : t.yearly)}
                <span>
                  {t.monthly === 0
                    ? "forever"
                    : billing === "monthly"
                      ? "a month"
                      : "a year"}
                </span>
              </p>
              <p className="plan-line">{t.line}</p>
              <ul className="plan-perks">
                {t.perks.map((p) => (
                  <li key={p}>
                    <Check aria-hidden="true" size={16} strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={t.id === tierId ? "btn btn-solid" : "btn btn-line"}
                aria-pressed={t.id === tierId}
                onClick={() => choose(t.id)}
              >
                {t.id === tierId ? `${t.name} selected` : `Choose ${t.name}`}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="cal-title">
        <div className="section-head stacked">
          <h2 id="cal-title">{subscribe.calendarTitle}</h2>
          <p>{subscribe.calendarText}</p>
        </div>
        <div className="tier-tabs" role="radiogroup" aria-label="Preview plan">
          {tiers.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={t.id === tierId}
              onClick={() => setTierId(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <DeliveryCalendar tier={tier} />
      </section>

      <section
        className="wrap section signup-section"
        aria-labelledby="form-title"
        ref={formRef}
      >
        <SubscribeFlow
          tier={tier}
          billing={billing}
          onTier={setTierId}
          onBilling={setBilling}
        />
      </section>

      <section className="wrap-narrow section" aria-labelledby="faq-title">
        <h2 id="faq-title" className="section-title">
          Questions
        </h2>
        <div className="faq">
          {subscribe.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

type FlowProps = {
  tier: Tier;
  billing: Billing;
  onTier: (t: TierId) => void;
  onBilling: (b: Billing) => void;
};

function SubscribeFlow({ tier, billing, onTier, onBilling }: FlowProps) {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const paid = tier.monthly > 0;
  const doneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email"));
    const typo = emailTypo(email);
    const found = validate(
      form,
      {
        email: EMAIL_MSG,
        consent:
          "Tick the box to confirm you’re happy to receive the checkout email.",
      },
      typo ? { email: typo } : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(1100);
    setBusy(false);
    const name = String(data.get("name") || "").trim();
    setDone(
      paid
        ? `Thank you${name ? ", " + name : ""}. A secure checkout link for ${tier.name} (${priceLine(tier, billing)}) is on its way to ${email}. Your first Field Note follows on Wednesday.`
        : `Welcome${name ? ", " + name : ""}. The next Sunday Letter reaches ${email} on ${nextSunday()} at 7:00.`,
    );
  };

  return (
    <>
      <div className="flow-status" aria-live="polite">
        {done && (
          <div className="flow-done" ref={doneRef} tabIndex={-1}>
            <Postmark
              className="done-stamp"
              {...stampFor(new Date().toLocaleDateString("en-CA"), "Received")}
            />
            <h2 id="form-title">You’re on the list</h2>
            <p>{done}</p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => setDone("")}
            >
              Subscribe another address
            </button>
          </div>
        )}
      </div>
      {!done && (
        <div className="flow">
          <div className="flow-intro">
            <h2 id="form-title">Subscribe</h2>
            <p>
              {tier.name} · {priceLine(tier, billing)}
            </p>
            <ol className="flow-steps">
              {subscribe.next.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="quiet">
              This is a demo form: nothing is sent and no one is charged. Paid
              plans would continue to a hosted checkout.
            </p>
          </div>
          <form
            className="flow-form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <Field
              label="Email address"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
            />
            <Field
              label="First name"
              name="name"
              autoComplete="given-name"
              hint="Optional — so the welcome letter can say hello properly."
            />
            <fieldset className="choice">
              <legend>Plan</legend>
              {tiers.map((t) => (
                <label key={t.id}>
                  <input
                    type="radio"
                    name="tier"
                    value={t.id}
                    checked={t.id === tier.id}
                    onChange={() => onTier(t.id)}
                  />
                  <span>
                    {t.name}{" "}
                    <span className="choice-sub">{priceLine(t, billing)}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            {paid && (
              <>
                <fieldset className="choice">
                  <legend>Billing</legend>
                  {(["monthly", "yearly"] as Billing[]).map((b) => (
                    <label key={b}>
                      <input
                        type="radio"
                        name="billing"
                        value={b}
                        checked={billing === b}
                        onChange={() => onBilling(b)}
                      />
                      <span>
                        {b === "monthly" ? "Monthly" : "Yearly"}{" "}
                        <span className="choice-sub">{priceLine(tier, b)}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <div
                  className="check"
                  data-invalid={errors.consent ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "consent-err" : undefined
                      }
                    />
                    Email me a secure checkout link for {tier.name}. Cancel any
                    time from any email.
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="consent-err">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </>
            )}
            <button
              className="btn btn-solid btn-wide"
              type="submit"
              disabled={busy}
            >
              {busy
                ? "Subscribing…"
                : paid
                  ? `Continue with ${tier.name}`
                  : "Subscribe free"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
