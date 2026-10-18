import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { brand, donate } from "../content";
import { money, pause, reference, validate, type Errors } from "../lib/util";
import { Field, FieldError, useErrors } from "../components/Field";

const messages: Record<string, string> = {
  dname: "Tell us your name so we can thank you properly.",
  demail: "Enter an email like name@example.com for your tax receipt.",
};

export function Donate() {
  const [monthly, setMonthly] = useState(true);
  const [preset, setPreset] = useState<number | "other">(35);
  const [other, setOther] = useState("");
  const [fund, setFund] = useState(donate.funds[0].value);
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [thanks, setThanks] = useState({ name: "", ref: "" });

  const amount = preset === "other" ? Number(other) || 0 : preset;
  const impact =
    [...donate.impact].reverse().find((i) => amount >= i.min) ??
    donate.impact[0];
  const fundLabel = donate.funds.find((f) => f.value === fund)?.label ?? "";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const extra: Errors =
      preset === "other" && !(amount >= 5)
        ? {
            other:
              "Enter an amount of $5 or more — card fees eat anything smaller.",
          }
        : {};
    const found = validate(e.currentTarget, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    const name = String(new FormData(e.currentTarget).get("dname")).split(
      " ",
    )[0];
    setState("sending");
    await pause(1100);
    setThanks({ name, ref: reference("GIFT") });
    setState("done");
  }

  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>Donate to Kindred</h1>
        <p className="lede">{donate.intro}</p>
      </header>

      <div className="wrap donate-grid">
        {state === "done" ? (
          <div className="success" role="status">
            <span className="success-mark" aria-hidden="true">
              <Check />
            </span>
            <h2>Thank you, {thanks.name}.</h2>
            <p className="lede">
              Your {money(amount)} {monthly ? "monthly gift" : "gift"} to{" "}
              {fundLabel.toLowerCase()} {impact.text}.
            </p>
            <p>
              Reference {thanks.ref}. A receipt for your taxes is on its way.{" "}
              {monthly &&
                "You can change or stop a monthly gift any time by replying to it."}
            </p>
            <p className="demo-note">
              This is a demo — no payment was taken and nothing was sent.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form form-card donate-form"
            aria-busy={state === "sending"}
          >
            <fieldset className="seg">
              <legend className="sr-only">How often</legend>
              {[
                { v: true, label: "Monthly" },
                { v: false, label: "One-off" },
              ].map((o) => (
                <label key={o.label}>
                  <input
                    type="radio"
                    name="freq"
                    checked={monthly === o.v}
                    onChange={() => setMonthly(o.v)}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="amounts">
              <legend>Amount</legend>
              <div className="amount-grid">
                {donate.amounts.map((a) => (
                  <label key={a}>
                    <input
                      type="radio"
                      name="amount"
                      checked={preset === a}
                      onChange={() => setPreset(a)}
                    />
                    <span className="num">{money(a)}</span>
                  </label>
                ))}
                <label>
                  <input
                    type="radio"
                    name="amount"
                    checked={preset === "other"}
                    onChange={() => setPreset("other")}
                  />
                  <span>Other</span>
                </label>
              </div>
              {preset === "other" && (
                <div
                  className="field other-amount"
                  data-invalid={errors.other ? "" : undefined}
                >
                  <label htmlFor="f-other">Your amount (USD)</label>
                  <div className="input-icon input-prefix">
                    <span aria-hidden="true">$</span>
                    <input
                      id="f-other"
                      name="other"
                      type="number"
                      min={5}
                      inputMode="decimal"
                      value={other}
                      onChange={(e) => {
                        setOther(e.target.value);
                        if (errors.other && Number(e.target.value) >= 5)
                          setErrors(({ other: _, ...rest }) => rest);
                      }}
                      aria-invalid={errors.other ? true : undefined}
                      aria-describedby={
                        errors.other ? "f-other-err" : undefined
                      }
                    />
                  </div>
                  <FieldError id="f-other-err" error={errors.other} />
                </div>
              )}
            </fieldset>

            <p className="impact-line" aria-live="polite">
              {amount > 0 ? (
                <>
                  <strong className="num">
                    {money(amount)}
                    {monthly ? " a month" : ""}
                  </strong>{" "}
                  {impact.text}.
                </>
              ) : (
                "Enter an amount to see what it covers."
              )}
            </p>

            <Field label="Put it towards" name="fund">
              <select value={fund} onChange={(e) => setFund(e.target.value)}>
                {donate.funds.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </Field>
            <div className="form-row">
              <Field
                label="Your name"
                name="dname"
                required
                autoComplete="name"
                error={errors.dname}
              />
              <Field
                label="Email"
                name="demail"
                type="email"
                required
                autoComplete="email"
                error={errors.demail}
              />
            </div>
            <Field
              label="In memory or honour of (optional)"
              name="tribute"
              hint="We'll add their name to the wall in reception"
            />
            <button
              className="btn btn-primary btn-wide"
              disabled={state === "sending"}
            >
              {state === "sending" ? (
                <>
                  <LoaderCircle className="spin" aria-hidden="true" />{" "}
                  Processing…
                </>
              ) : (
                `Give ${money(amount)}${monthly ? " monthly" : ""}`
              )}
            </button>
            <p className="demo-note">
              Demo: on a live site this hands off to a payment provider. Nothing
              is charged or sent here.
            </p>
          </form>
        )}

        <aside className="donate-aside">
          <section aria-labelledby="split-h">
            <h2 id="split-h" className="mini-h">
              Where each dollar went last year
            </h2>
            <div className="split" aria-hidden="true">
              {donate.split.map((s) => (
                <span
                  key={s.label}
                  data-tone={s.tone}
                  style={{ flexGrow: s.pct }}
                />
              ))}
            </div>
            <ul className="split-legend">
              {donate.split.map((s) => (
                <li key={s.label} data-tone={s.tone}>
                  <span className="num">{s.pct}%</span> {s.label}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="wish-h">
            <h2 id="wish-h" className="mini-h">
              The wishlist
            </h2>
            <p>Drop supplies at reception any day we're open.</p>
            <ul className="ticks">
              {donate.wishlist.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="sponsor-h">
            <h2 id="sponsor-h" className="mini-h">
              Sponsor a kennel
            </h2>
            <p>{donate.sponsor}</p>
            <p>
              <a href={`mailto:${brand.email}?subject=Kennel%20sponsorship`}>
                Ask about sponsorship
              </a>
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
