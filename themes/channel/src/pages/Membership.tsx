import { useRef, useState, type FormEvent } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { membershipFaq, tiers } from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { money } from "../lib/format";

const messages = {
  name: { missing: "Enter your name as you'd like it in the end credits." },
  email: {
    missing: "Enter an email for your welcome note and plans.",
    invalid: "That email needs an @ and a domain, e.g. you@example.com.",
  },
  handle: {
    missing: "",
    invalid:
      "Handles start with @ and use letters, numbers, dots or underscores.",
  },
  rules: { missing: "Tick the box to agree to the community rules." },
};

export function Membership() {
  const [yearly, setYearly] = useState(false);
  const [tierId, setTierId] = useState("night-shift");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [joined, setJoined] = useState<{ name: string; tier: string } | null>(
    null,
  );
  const formRef = useRef<HTMLDivElement>(null);
  const tier = tiers.find((t) => t.id === tierId)!;
  const price = (monthly: number) => (yearly ? monthly * 10 : monthly);
  const per = yearly ? "/yr" : "/mo";

  function choose(id: string) {
    setTierId(id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(
      () => document.getElementById("f-name")?.focus({ preventScroll: true }),
      400,
    );
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    setTimeout(() => {
      setJoined({ name, tier: tier.name });
      setBusy(false);
    }, 800);
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Pull up a stool</h1>
        <p className="lead">
          Memberships pay the editor, the rent and the steel, and they are why
          the channel can say no to sponsors that don't fit. In return you get
          every episode first, the plans, and a say in what gets built.
        </p>
      </header>

      <section className="wrap" aria-labelledby="h-tiers">
        <h2 id="h-tiers" className="visually-hidden">
          Membership tiers
        </h2>
        <div className="billing" role="radiogroup" aria-label="Billing period">
          <button
            type="button"
            role="radio"
            aria-checked={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly <span>2 months free</span>
          </button>
        </div>
        <div className="tiers">
          {tiers.map((t) => (
            <article
              key={t.id}
              className="tier"
              data-featured={t.featured || undefined}
              data-selected={t.id === tierId || undefined}
            >
              <h3>{t.name}</h3>
              <p className="tier-pitch">{t.pitch}</p>
              <p className="tier-price">
                {money(price(t.monthly))}
                <small>{per}</small>
              </p>
              <ul>
                {t.perks.map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={
                  "btn btn-wide " + (t.featured ? "btn-spark" : "btn-ghost")
                }
                onClick={() => choose(t.id)}
              >
                Choose {t.name}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap join" aria-labelledby="h-join">
        <div ref={formRef} className="join-inner">
          <div className="join-copy">
            <h2 id="h-join">Join the shop</h2>
            <p>
              You're joining <strong>{tier.name}</strong> at{" "}
              {money(price(tier.monthly))}
              {per}. Change tier or billing above at any time.
            </p>
            <p className="page-note">
              Demo form: nothing is sent and no card is needed.
            </p>
          </div>
          {joined ? (
            <div className="confirmation" aria-live="polite">
              <CheckCircle2 size={40} aria-hidden="true" />
              <h3>
                Welcome to {joined.tier}, {joined.name}.
              </h3>
              <p>
                Your welcome note with the first set of plans and the community
                link would arrive in a minute or two. See you at the bench on
                Thursday.
              </p>
            </div>
          ) : (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              aria-busy={busy}
            >
              <div className="field-row">
                <Field
                  label="Name for the credits"
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
              <Field
                label="Community handle (optional)"
                name="handle"
                pattern="@[A-Za-z0-9._]{2,24}"
                placeholder="@yourhandle"
                hint="Shown on your posts in the members' tab."
                error={errors.handle}
              />
              <fieldset className="options">
                <legend>Tier</legend>
                <div className="tier-picks">
                  {tiers.map((t) => (
                    <label key={t.id} className="tier-pick">
                      <input
                        type="radio"
                        name="tier"
                        checked={t.id === tierId}
                        onChange={() => setTierId(t.id)}
                      />
                      <span>
                        {t.name} <small>{money(price(t.monthly)) + per}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <div className="check-row">
                  <input
                    id="f-rules"
                    name="rules"
                    type="checkbox"
                    required
                    aria-invalid={errors.rules ? true : undefined}
                    aria-describedby={
                      errors.rules ? "f-rules-error" : undefined
                    }
                  />
                  <label htmlFor="f-rules">
                    I'll keep it kind and keep it safe in the members'
                    community.
                  </label>
                </div>
                {errors.rules && (
                  <p className="field-error" id="f-rules-error">
                    {errors.rules}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-spark btn-wide"
                disabled={busy}
              >
                {busy
                  ? "Joining…"
                  : `Join ${tier.name} · ${money(price(tier.monthly))}${per}`}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions members ask</h2>
        {membershipFaq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
