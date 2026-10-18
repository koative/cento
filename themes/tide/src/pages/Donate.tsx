import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  donateFaq,
  giving,
  images,
  programmes,
  type Frequency,
} from "../content";
import { Field } from "../components/Field";
import { money } from "../lib/format";

const STEPS = ["Your gift", "Your details", "Payment"] as const;
type Data = Record<string, string>;
type Errors = Record<string, string>;

const luhn = (digits: string) =>
  [...digits].reverse().reduce((sum, ch, i) => {
    const d = Number(ch) * (i % 2 ? 2 : 1);
    return sum + (d > 9 ? d - 9 : d);
  }, 0) %
    10 ===
  0;

function validate(
  step: number,
  freq: Frequency,
  giftAid: boolean,
  d: Data,
  amount: number,
): Errors {
  const e: Errors = {};
  const v = (k: string) => (d[k] ?? "").trim();
  if (step === 0) {
    if (!amount)
      e.other = "Choose an amount, or enter your own of at least £2.";
    else if (amount < 2)
      e.other = "The smallest gift we can process is £2. Enter £2 or more.";
    else if (amount > 10000)
      e.other =
        "For gifts over £10,000 please call us, so we can say thank you properly.";
  }
  if (step === 1) {
    if (!v("first")) e.first = "Enter your first name.";
    if (!v("last")) e.last = "Enter your last name.";
    if (!v("email")) e.email = "Enter your email for the receipt.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")))
      e.email =
        "That email looks incomplete. Check for an @ and a domain, like name@example.com.";
    if (giftAid) {
      if (!v("address"))
        e.address = "Gift Aid needs your home address. Enter the first line.";
      if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(v("postcode")))
        e.postcode = "Enter a UK postcode, like MR4 2TD.";
    }
  }
  if (step === 2) {
    if (freq === "monthly") {
      if (!v("holder")) e.holder = "Enter the name on the bank account.";
      if (!/^\d{2}-?\d{2}-?\d{2}$/.test(v("sort")))
        e.sort = "A sort code is six digits, like 12-34-56.";
      if (!/^\d{8}$/.test(v("account")))
        e.account = "An account number is eight digits, with no spaces.";
      if (d.authorise !== "yes")
        e.authorise =
          "Tick to confirm you can authorise Direct Debits on this account.";
    } else {
      const num = v("card").replace(/\s/g, "");
      if (!v("cardname"))
        e.cardname = "Enter the name as it appears on the card.";
      if (!/^\d{13,19}$/.test(num) || !luhn(num))
        e.card =
          "Check the card number: 13 to 19 digits. For this demo, 4242 4242 4242 4242 works.";
      const m = /^(\d{2}) ?\/ ?(\d{2})$/.exec(v("expiry"));
      const now = new Date();
      if (!m || Number(m[1]) < 1 || Number(m[1]) > 12)
        e.expiry = "Enter the expiry as MM/YY, like 08/29.";
      else if (
        2000 + Number(m[2]) < now.getFullYear() ||
        (2000 + Number(m[2]) === now.getFullYear() &&
          Number(m[1]) < now.getMonth() + 1)
      )
        e.expiry =
          "This card has expired. Use a card with a future expiry date.";
      if (!/^\d{3,4}$/.test(v("cvc")))
        e.cvc =
          "The security code is the 3 or 4 digits on the back of the card.";
    }
  }
  return e;
}

export function Donate() {
  const [freq, setFreq] = useState<Frequency>("monthly");
  const [preset, setPreset] = useState<number | null>(giving.monthly[1].amount);
  const [giftAid, setGiftAid] = useState(true);
  const [data, setData] = useState<Data>({ fund: "where-needed" });
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const amount = preset ?? Number(data.other || 0);
  const tier = [...giving[freq]].reverse().find((g) => amount >= g.amount);
  const fund = programmes.find((p) => p.slug === data.fund);

  const set = (k: string, value: string) => {
    setData((d) => ({ ...d, [k]: value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };
  const bind = (k: string) => ({
    id: `d-${k}`,
    name: k,
    value: data[k] ?? "",
    onChange: (e: { target: { value: string } }) => set(k, e.target.value),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": `d-${k}-msg`,
  });

  const switchFreq = (f: Frequency) => {
    setFreq(f);
    setPreset(giving[f][1].amount);
    set("other", "");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(step, freq, giftAid, data, amount);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`#d-${first}`)?.focus();
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>("legend")
          ?.scrollIntoView({ block: "nearest" }),
      );
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setRef(`TD-${Math.floor(100000 + Math.random() * 900000)}`);
      window.scrollTo({ top: 0 });
    }, 1100);
  };

  const live = (
    <p className="sr-only" aria-live="polite">
      {ref
        ? `Donation complete. Thank you, ${data.first}. Reference ${ref}.`
        : ""}
    </p>
  );

  if (ref) {
    return (
      <>
        {live}
        <section className="wrap thanks">
          <Check aria-hidden="true" className="thanks-mark" />
          <h1>Thank you, {data.first}.</h1>
          <p className="lede">
            {money(amount)} {freq === "monthly" ? "a month" : ""}{" "}
            {giftAid
              ? `becomes ${money(amount * 1.25)} with Gift Aid, and `
              : ""}
            {tier ? tier.does : "goes straight to work on the shore"}
            {fund ? `, on ${fund.name}` : ""}.
          </p>
          <dl className="spec spec-wide">
            <div>
              <dt>Reference</dt>
              <dd className="num">{ref}</dd>
            </div>
            <div>
              <dt>Receipt</dt>
              <dd>Would go to {data.email}</dd>
            </div>
            <div>
              <dt>{freq === "monthly" ? "First collection" : "Payment"}</dt>
              <dd>
                {freq === "monthly"
                  ? "On the 1st of next month, by Direct Debit"
                  : "Card"}
              </dd>
            </div>
          </dl>
          <p className="quiet">
            This is a demo: nothing was charged and no details left your
            browser.
          </p>
          <div className="actions">
            <Link to="/volunteer" className="btn btn-sea">
              Come to a clean
            </Link>
            <Link to="/impact" className="btn btn-ghost">
              See where gifts went last year
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {live}
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Donate</h1>
          <p className="lede">
            Monthly gifts book the boats, buy the seed and keep Shore School
            free. One-off gifts go where the tide table says they are needed
            most.
          </p>
        </div>
        <img
          src={images.bucketBrigade.src}
          alt={images.bucketBrigade.alt}
          width={images.bucketBrigade.w}
          height={images.bucketBrigade.h}
          className="head-img"
        />
      </header>

      <section className="wrap donate-layout">
        <form
          ref={form}
          className="donate-form"
          noValidate
          onSubmit={submit}
          aria-busy={sending}
        >
          <ol className="stepper" aria-label="Donation steps">
            {STEPS.map((s, i) => (
              <li
                key={s}
                aria-current={i === step ? "step" : undefined}
                data-done={i < step ? "" : undefined}
              >
                <span className="num">{i + 1}</span> {s}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <fieldset>
              <legend>Your gift</legend>
              <div
                className="segmented"
                role="radiogroup"
                aria-label="How often"
              >
                {(["monthly", "once"] as const).map((f) => (
                  <label key={f}>
                    <input
                      type="radio"
                      name="freq"
                      checked={freq === f}
                      onChange={() => switchFreq(f)}
                    />
                    <span>{f === "monthly" ? "Monthly" : "One-off"}</span>
                  </label>
                ))}
              </div>
              <div className="amounts" role="radiogroup" aria-label="Amount">
                {giving[freq].map((g) => (
                  <label key={g.amount} className="amount">
                    <input
                      type="radio"
                      name="amount"
                      checked={preset === g.amount}
                      onChange={() => {
                        setPreset(g.amount);
                        set("other", "");
                      }}
                    />
                    <span className="num">{money(g.amount)}</span>
                  </label>
                ))}
              </div>
              <Field
                id="d-other"
                label="Or your own amount (£)"
                error={errors.other}
              >
                <input
                  {...bind("other")}
                  inputMode="decimal"
                  placeholder="e.g. 18"
                  onChange={(e) => {
                    setPreset(null);
                    set("other", e.target.value.replace(/[^\d.]/g, ""));
                  }}
                />
              </Field>
              <p className="does" aria-live="polite">
                {amount >= 2
                  ? `${money(amount)}${freq === "monthly" ? " a month" : ""} ${tier ? tier.does : "helps keep a beach stocked with kit"}.`
                  : "Choose an amount to see what it does."}
              </p>
              <Field id="d-fund" label="Where should it go?">
                <select {...bind("fund")}>
                  <option value="where-needed">
                    Wherever it's needed most
                  </option>
                  {programmes.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="check giftaid">
                <input
                  type="checkbox"
                  checked={giftAid}
                  onChange={(e) => setGiftAid(e.target.checked)}
                />
                <span>
                  <strong>
                    Add Gift Aid:{" "}
                    {amount >= 2
                      ? `${money(amount)} becomes ${money(amount * 1.25)}`
                      : "+25% at no cost to you"}
                    .
                  </strong>{" "}
                  I am a UK taxpayer and understand that if I pay less tax than
                  the Gift Aid claimed on all my donations in the year, I must
                  pay the difference.
                </span>
              </label>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend>Your details</legend>
              <div className="field-row">
                <Field id="d-first" label="First name" error={errors.first}>
                  <input
                    {...bind("first")}
                    autoComplete="given-name"
                    required
                  />
                </Field>
                <Field id="d-last" label="Last name" error={errors.last}>
                  <input
                    {...bind("last")}
                    autoComplete="family-name"
                    required
                  />
                </Field>
              </div>
              <Field
                id="d-email"
                label="Email"
                error={errors.email}
                hint="For your receipt. We won't add you to anything else."
              >
                <input
                  {...bind("email")}
                  type="email"
                  autoComplete="email"
                  required
                />
              </Field>
              {giftAid && (
                <div className="field-row field-row-wide">
                  <Field
                    id="d-address"
                    label="Home address, first line"
                    error={errors.address}
                    hint="Needed for Gift Aid"
                  >
                    <input
                      {...bind("address")}
                      autoComplete="address-line1"
                      required
                    />
                  </Field>
                  <Field
                    id="d-postcode"
                    label="Postcode"
                    error={errors.postcode}
                  >
                    <input
                      {...bind("postcode")}
                      autoComplete="postal-code"
                      required
                    />
                  </Field>
                </div>
              )}
              <Field
                id="d-message"
                label="Message (optional)"
                hint="Giving in memory of someone? Tell us their name."
              >
                <textarea {...bind("message")} rows={3} />
              </Field>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend>
                {freq === "monthly" ? "Direct Debit" : "Card payment"}
              </legend>
              {freq === "monthly" ? (
                <>
                  <Field
                    id="d-holder"
                    label="Account holder name"
                    error={errors.holder}
                  >
                    <input {...bind("holder")} autoComplete="name" required />
                  </Field>
                  <div className="field-row">
                    <Field id="d-sort" label="Sort code" error={errors.sort}>
                      <input
                        {...bind("sort")}
                        inputMode="numeric"
                        placeholder="12-34-56"
                        required
                      />
                    </Field>
                    <Field
                      id="d-account"
                      label="Account number"
                      error={errors.account}
                    >
                      <input
                        {...bind("account")}
                        inputMode="numeric"
                        maxLength={8}
                        required
                      />
                    </Field>
                  </div>
                  <div
                    className="check-field"
                    data-invalid={errors.authorise ? "" : undefined}
                  >
                    <label className="check">
                      <input
                        type="checkbox"
                        id="d-authorise"
                        checked={data.authorise === "yes"}
                        onChange={(e) =>
                          set("authorise", e.target.checked ? "yes" : "")
                        }
                        aria-invalid={errors.authorise ? true : undefined}
                        aria-describedby="d-authorise-msg"
                      />
                      <span>
                        I am the account holder and the only person needed to
                        authorise Direct Debits on this account.
                      </span>
                    </label>
                    {errors.authorise && (
                      <p id="d-authorise-msg" className="field-error">
                        {errors.authorise}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Field
                    id="d-cardname"
                    label="Name on card"
                    error={errors.cardname}
                  >
                    <input
                      {...bind("cardname")}
                      autoComplete="cc-name"
                      required
                    />
                  </Field>
                  <Field id="d-card" label="Card number" error={errors.card}>
                    <input
                      {...bind("card")}
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      required
                    />
                  </Field>
                  <div className="field-row">
                    <Field
                      id="d-expiry"
                      label="Expiry (MM/YY)"
                      error={errors.expiry}
                    >
                      <input
                        {...bind("expiry")}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="08/29"
                        required
                      />
                    </Field>
                    <Field id="d-cvc" label="Security code" error={errors.cvc}>
                      <input
                        {...bind("cvc")}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        required
                      />
                    </Field>
                  </div>
                </>
              )}
            </fieldset>
          )}

          <div className="form-nav">
            {step > 0 && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setStep(step - 1)}
                disabled={sending}
              >
                <ArrowLeft aria-hidden="true" /> Back
              </button>
            )}
            <button type="submit" className="btn btn-buoy" disabled={sending}>
              {sending
                ? "Processing…"
                : step < 2
                  ? "Continue"
                  : `Give ${money(amount)}${freq === "monthly" ? " a month" : ""}`}
            </button>
          </div>
          <p className="quiet">
            Demo form: nothing is charged and nothing is sent anywhere.
          </p>
        </form>

        <aside className="gift-summary" aria-label="Your gift">
          <h2>Your gift</h2>
          <p className="gift-amount num">
            {amount >= 2 ? money(amount) : "£—"}
            <span>{freq === "monthly" ? " a month" : " once"}</span>
          </p>
          {giftAid && amount >= 2 && (
            <p className="num">{money(amount * 1.25)} with Gift Aid</p>
          )}
          <p>{fund ? `For ${fund.name}` : "Wherever it's needed most"}</p>
          <hr />
          <p className="quiet">
            Questions? Call {brand.phone} or email{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </aside>
      </section>

      <section className="wrap section faq">
        <h2>Questions about giving</h2>
        {donateFaq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
