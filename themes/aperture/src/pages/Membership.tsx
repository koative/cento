import { useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { membership, tiers } from "../content";
import { Field, useErrors } from "../components/Field";
import { Faq } from "../components/Listing";
import { pause, validate } from "../lib/forms";
import { money } from "../lib/programme";

export function Membership() {
  const [yearly, setYearly] = useState(true);
  const [tier, setTier] = useState("regular");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const formRef = useRef<HTMLElement>(null);
  const chosen = tiers.find((t) => t.id === tier)!;

  const pick = (id: string) => {
    setTier(id);
    setDone("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(
      () => document.getElementById("f-name")?.focus({ preventScroll: true }),
      400,
    );
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add your name as it should appear on your card.",
      email: "Enter an email like you@example.com for your member number.",
      postcode: "Add a postcode so we can post your card and programme.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    const name = String(new FormData(form).get("name")).split(" ")[0];
    setDone(
      `Welcome, ${name}. Your member number is AP${20000 + Math.floor(Math.random() * 9000)}; it works online and at the box office from today.`,
    );
    form.reset();
  };

  return (
    <div className="wrap page-pad">
      <header className="page-head">
        <h1>Membership</h1>
        <p className="lede">{membership.intro}</p>
      </header>

      <div className="seg billing" role="group" aria-label="Billing">
        <button
          type="button"
          aria-pressed={!yearly}
          onClick={() => setYearly(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={yearly}
          onClick={() => setYearly(true)}
        >
          Yearly, two months free
        </button>
      </div>

      <ul className="tiers">
        {tiers.map((t) => (
          <li
            key={t.id}
            className="tier"
            data-featured={t.id === "regular" ? "" : undefined}
          >
            <h2>{t.name}</h2>
            <p className="tier-pitch">{t.pitch}</p>
            <p className="tier-price">
              <strong className="tnum">
                {money(yearly ? t.yearly : t.monthly)}
              </strong>
              <span>{yearly ? "a year" : "a month"}</span>
            </p>
            <ul className="perks">
              {t.perks.map((p) => (
                <li key={p}>
                  <Check aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={
                t.id === "regular"
                  ? "btn btn-red btn-block"
                  : "btn btn-ink btn-block"
              }
              onClick={() => pick(t.id)}
            >
              Join as {t.name}
            </button>
          </li>
        ))}
      </ul>
      <p className="under26">{membership.under26}</p>

      <section
        className="join split-form"
        ref={formRef}
        aria-labelledby="join-h"
      >
        <div>
          <h2 id="join-h">{membership.title}</h2>
          <p>
            {chosen.name} membership,{" "}
            {money(yearly ? chosen.yearly : chosen.monthly)}{" "}
            {yearly ? "a year" : "a month"}. Change your mind about the tier
            below; you can upgrade at any time and only pay the difference.
          </p>
        </div>
        <form
          noValidate
          onSubmit={submit}
          onChange={onChange}
          className="form-grid"
          aria-busy={busy}
        >
          <Field label="Tier" name="tier" className="span-2">
            <select value={tier} onChange={(e) => setTier(e.target.value)}>
              {tiers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}: {money(yearly ? t.yearly : t.monthly)}{" "}
                  {yearly ? "a year" : "a month"}
                </option>
              ))}
            </select>
          </Field>
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
          <Field
            label="Postcode"
            name="postcode"
            required
            autoComplete="postal-code"
            error={errors.postcode}
          />
          <div className="field check">
            <label>
              <input type="checkbox" name="under26" /> I am under 26 (free
              Friend membership)
            </label>
          </div>
          <div className="actions span-2">
            <button type="submit" className="btn btn-red" disabled={busy}>
              {busy ? "Joining…" : `Join as ${chosen.name}`}
            </button>
          </div>
          <p className="form-done span-2" aria-live="polite">
            {done}
          </p>
          <p className="quiet span-2">
            Demo only: no payment is taken and nothing is sent.
          </p>
        </form>
      </section>

      <section className="faq-section" aria-labelledby="mfaq-h">
        <h2 id="mfaq-h">Membership questions</h2>
        <Faq items={membership.faq} />
      </section>
    </div>
  );
}
