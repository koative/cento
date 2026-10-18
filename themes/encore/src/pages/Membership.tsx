import { useRef, useState, type FormEvent } from "react";
import { Check, Minus } from "lucide-react";
import { benefitTable, images, membershipFaq, tiers } from "../content";
import { money, pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";

type Billing = "monthly" | "yearly";

export function Membership() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [tier, setTier] = useState("inner-circle");
  const [gift, setGift] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const form = useRef<HTMLFormElement>(null);

  const priceOf = (id: string) => {
    const t = tiers.find((x) => x.id === id)!;
    if (!t.yearly) return "Free";
    return billing === "yearly"
      ? `${money(t.yearly)} a year`
      : `${money(t.monthly)} a month`;
  };

  const join = (id: string) => {
    setTier(id);
    setDone("");
    form.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    form.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    const found = validate(f, {
      name: "Enter the member's full name, as it should appear on their card.",
      email:
        "Enter an email like you@example.com for the membership card and booking alerts.",
      age: "Encore 30 is for ages 16 to 29 — enter your age, or choose Friend instead.",
      recipient:
        "Enter the recipient's email, so we can send them their welcome letter.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    const t = tiers.find((x) => x.id === tier)!;
    setDone(
      `Welcome to ${t.name}, ${String(data.get("name")).split(" ")[0]}. ${gift ? "We'll email the gift letter to " + data.get("recipient") + "." : "Your card and first priority-booking date are on their way to " + data.get("email") + "."}`,
    );
    f.reset();
    setGift(false);
  };

  return (
    <>
      <section className="page-head page-head-split">
        <div className="wrap split">
          <div>
            <h1 className="display">Membership</h1>
            <p className="lede">
              Members book before anyone else, pay less for every seat, and keep
              new plays on Lantern Street. Under 30? It's free.
            </p>
          </div>
          <img
            src={images.aisle.src}
            alt={images.aisle.alt}
            width={images.aisle.w}
            height={images.aisle.h}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="tiers-head">
            <h2>Choose a tier</h2>
            <div className="seg" role="group" aria-label="Billing">
              {(["monthly", "yearly"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  aria-pressed={billing === b}
                  onClick={() => setBilling(b)}
                >
                  {b === "monthly" ? "Monthly" : "Yearly · 2 months free"}
                </button>
              ))}
            </div>
          </div>
          <div className="tiers">
            {tiers.map((t) => (
              <article
                key={t.id}
                className="tier"
                data-featured={t.id === "inner-circle" ? "" : undefined}
              >
                <h3>{t.name}</h3>
                <p className="tier-price num">{priceOf(t.id)}</p>
                <p className="tier-line">{t.line}</p>
                <ul>
                  {t.benefits.map((b) => (
                    <li key={b}>
                      <Check aria-hidden="true" /> {b}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={
                    t.id === "inner-circle" ? "btn btn-red" : "btn btn-line"
                  }
                  onClick={() => join(t.id)}
                >
                  Join as {t.name}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <h2>Every benefit, side by side</h2>
          <div className="table-scroll">
            <table className="data-table compare">
              <thead>
                <tr>
                  <th scope="col">Benefit</th>
                  {tiers.map((t) => (
                    <th scope="col" key={t.id}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benefitTable.map((row) => (
                  <tr key={row.benefit}>
                    <th scope="row">{row.benefit}</th>
                    {row.values.map((v, i) => (
                      <td key={i}>
                        {v === true ? (
                          <Check aria-label="Included" />
                        ) : v === false ? (
                          <Minus aria-label="Not included" />
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-top">
          <form
            ref={form}
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form"
            aria-busy={busy}
          >
            <h2>Join today</h2>
            <Field label="Tier" name="tier">
              <select value={tier} onChange={(e) => setTier(e.target.value)}>
                {tiers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {priceOf(t.id)}
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
              placeholder="you@example.com"
              error={errors.email}
            />
            {tier === "encore-30" && (
              <Field
                label="Age"
                name="age"
                type="number"
                required
                min={16}
                max={29}
                inputMode="numeric"
                hint="Encore 30 is for ages 16–29. Bring ID to your first show."
                error={errors.age}
              />
            )}
            <div className="field check">
              <label>
                <input
                  type="checkbox"
                  checked={gift}
                  onChange={(e) => setGift(e.target.checked)}
                />{" "}
                This membership is a gift
              </label>
            </div>
            {gift && (
              <Field
                label="Recipient's email"
                name="recipient"
                type="email"
                required
                placeholder="them@example.com"
                error={errors.recipient}
              />
            )}
            <button type="submit" className="btn btn-red" disabled={busy}>
              {busy ? "Joining…" : "Become a member"}
            </button>
            <p className="quiet">Demo only: nothing is sent or charged.</p>
            <p className="form-done" aria-live="polite">
              {done}
            </p>
          </form>
          <div className="faq">
            <h2>Questions</h2>
            {membershipFaq.map((f) => (
              <details key={f.q} className="disclosure">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
