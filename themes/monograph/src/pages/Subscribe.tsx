import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  currentIssue,
  issues,
  nextIssue,
  plans,
  singleIssue,
  subscribeFaq,
  pageCopy,
  type PlanId,
} from "../content";
import { money } from "../lib/magazine";
import {
  Field,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const inStock = issues.filter((i) => i.stock !== "Sold out");
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Australia",
  "New Zealand",
  "Elsewhere",
];

function fromHash() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const plan = q.get("plan");
  const issue = Number(q.get("issue"));
  return {
    plan: (["print", "digital", "gift", "single"].includes(plan ?? "")
      ? plan
      : null) as PlanId | null,
    issue: inStock.some((i) => i.no === issue) ? issue : null,
  };
}

const messages: Messages = {
  name: {
    missing: "Add your name so we can address the parcel and the receipt.",
  },
  email: {
    missing: "Add an email address for your receipt.",
    invalid:
      "Check the email address: it needs an @ and a domain, e.g. name@example.com.",
  },
  recipient: { missing: "Add the name of the person receiving the gift." },
  address: { missing: "Add a street address for the post." },
  city: { missing: "Add the town or city." },
  postcode: {
    missing: "Add a postcode or ZIP code.",
    invalid:
      "That postcode looks too short or has symbols in it. Use letters, numbers and spaces.",
  },
};

type Order = {
  plan: string;
  detail: string;
  total: number;
  name: string;
  email: string;
  ships: boolean;
};

export function Subscribe() {
  const initial = fromHash();
  const [plan, setPlan] = useState<PlanId>(
    initial.plan ?? (initial.issue ? "single" : "print"),
  );
  const [term, setTerm] = useState<1 | 2>(1);
  const [issueNo, setIssueNo] = useState(initial.issue ?? currentIssue.no);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  // Footer and issue links can change ?plan= while this page stays mounted.
  useEffect(() => {
    const sync = () => {
      const next = fromHash();
      setOrder(null);
      if (next.plan) setPlan(next.plan);
      if (next.issue) setIssueNo(next.issue);
    };
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  const chosen = plans.find((p) => p.id === plan);
  const single = issues.find((i) => i.no === issueNo)!;
  const ships = chosen ? chosen.ships : true;
  const price = chosen ? chosen.price[term] : single.price;
  const postage = chosen ? 0 : singleIssue.postage;
  const total = price + postage;
  const detail = chosen
    ? `${term === 1 ? "1 year, 4 issues" : "2 years, 8 issues"}`
    : `No. ${single.no}, ${single.word}`;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setOrder({
        plan: chosen ? chosen.name : "Single issue",
        detail,
        total,
        name: String(data.get("name")),
        email: String(data.get("email")),
        ships,
      });
    }, 900);
  }

  if (order) {
    return (
      <div className="page wrap subscribe-done">
        <div className="done-card" role="status">
          <h1 ref={done} tabIndex={-1}>
            Thank you, {order.name.split(" ")[0]}.
          </h1>
          <p className="lead">
            {order.plan}, {order.detail}: {money(order.total)}. A receipt would
            go to {order.email}
            {order.ships
              ? ", and the first copy would leave the print room within three working days."
              : "."}
          </p>
          <p className="quiet">
            This is a demo: nothing was charged, sent or stored.
          </p>
          <div className="actions">
            <Link to={`/issues/${currentIssue.no}`} className="btn">
              Start with No. {currentIssue.no}{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setOrder(null)}
            >
              Place another order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page wrap subscribe">
      <header className="page-head">
        <h1>Subscribe</h1>
        <p className="lead">{pageCopy.subscribe}</p>
      </header>

      <form className="subscribe-form" noValidate onSubmit={submit}>
        <div className="subscribe-main">
          <fieldset className="term">
            <legend>Length</legend>
            {([1, 2] as const).map((t) => (
              <label key={t}>
                <input
                  type="radio"
                  name="term"
                  checked={term === t}
                  onChange={() => setTerm(t)}
                  disabled={!chosen}
                />
                <span>
                  {t === 1 ? "1 year · 4 issues" : "2 years · 8 issues"}
                  {t === 2 && chosen && (
                    <small>
                      save {money(chosen.price[1] * 2 - chosen.price[2])}
                    </small>
                  )}
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className="plans">
            <legend>What you would like</legend>
            {plans.map((p) => (
              <label key={p.id} className="plan">
                <input
                  type="radio"
                  name="plan"
                  value={p.id}
                  checked={plan === p.id}
                  onChange={() => setPlan(p.id)}
                />
                <span className="plan-body">
                  <span className="plan-name">{p.name}</span>
                  <span className="plan-price">
                    {money(p.price[term])}
                    <small>{term === 1 ? "a year" : "for two years"}</small>
                  </span>
                  <span className="plan-blurb">{p.blurb}</span>
                  <span className="plan-perks">
                    {p.perks.map((perk) => (
                      <span key={perk}>
                        <Check size={14} aria-hidden="true" /> {perk}
                      </span>
                    ))}
                  </span>
                </span>
              </label>
            ))}
            <label className="plan plan-single">
              <input
                type="radio"
                name="plan"
                value="single"
                checked={plan === "single"}
                onChange={() => setPlan("single")}
              />
              <span className="plan-body">
                <span className="plan-name">A single issue</span>
                <span className="plan-price">
                  {money(single.price)}
                  <small>+ {money(singleIssue.postage)} post</small>
                </span>
                <span className="plan-blurb">
                  One printed copy of an issue still in stock.
                </span>
              </span>
            </label>
          </fieldset>

          <fieldset className="details">
            <legend>Your details</legend>
            <div className="field-row">
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
            {plan === "gift" && (
              <div className="field-row">
                <Field
                  label="Recipient’s name"
                  name="recipient"
                  required
                  error={errors.recipient}
                />
                <Field
                  label="Message for the letterpress card (optional)"
                  name="message"
                  multiline
                  maxLength={160}
                  hint="Up to 160 characters, set by hand."
                />
              </div>
            )}
            {plan === "single" && (
              <Field
                label="Issue"
                name="issue"
                value={String(issueNo)}
                onChange={(e) => setIssueNo(Number(e.target.value))}
                options={inStock.map((i) => ({
                  value: String(i.no),
                  label: `No. ${i.no}, ${i.word} (${i.stock.toLowerCase()})`,
                }))}
              />
            )}
            {plan !== "single" && (
              <Field
                label="Start with"
                name="start"
                options={[
                  {
                    value: String(currentIssue.no),
                    label: `No. ${currentIssue.no}, ${currentIssue.word} (out now)`,
                  },
                  {
                    value: String(nextIssue.no),
                    label: `No. ${nextIssue.no}, ${nextIssue.word} (ships ${nextIssue.ships})`,
                  },
                ]}
              />
            )}
          </fieldset>

          {ships && (
            <fieldset className="details">
              <legend>
                {plan === "gift" ? "Where to post the gift" : "Postal address"}
              </legend>
              <Field
                label="Street address"
                name="address"
                required
                autoComplete="street-address"
                error={errors.address}
              />
              <div className="field-row field-row-3">
                <Field
                  label="Town or city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  error={errors.city}
                />
                <Field
                  label="Postcode / ZIP"
                  name="postcode"
                  required
                  autoComplete="postal-code"
                  pattern="[A-Za-z0-9 \-]{3,10}"
                  error={errors.postcode}
                />
                <Field
                  label="Country"
                  name="country"
                  autoComplete="country-name"
                  options={countries.map((c) => ({ value: c, label: c }))}
                />
              </div>
            </fieldset>
          )}
        </div>

        <aside className="summary" aria-label="Order summary">
          <h2>Your order</h2>
          <dl>
            <div>
              <dt>{chosen ? chosen.name : "Single issue"}</dt>
              <dd>{money(price)}</dd>
            </div>
            <div>
              <dt>{detail}</dt>
              <dd>{chosen ? `${money(price / (term * 4))} an issue` : ""}</dd>
            </div>
            <div>
              <dt>Postage</dt>
              <dd>
                {postage
                  ? money(postage)
                  : ships
                    ? "Included"
                    : "None, it’s digital"}
              </dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <button type="submit" className="btn btn-block" disabled={sending}>
            {sending ? "Placing order…" : `Place order, ${money(total)}`}
          </button>
          <p className="quiet">
            Demo checkout: nothing is charged or sent anywhere.
          </p>
          <p className="summary-help">
            Questions?{" "}
            <a href={"mailto:" + brand.subscriptionsEmail}>
              {brand.subscriptionsEmail}
            </a>
          </p>
        </aside>
      </form>

      <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="rule-title">
          Before you subscribe
        </h2>
        {subscribeFaq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
