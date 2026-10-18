import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Gift, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import {
  checkoutCopy,
  deliveryDays,
  minMeals,
  type DeliveryDay,
} from "../content";
import {
  Field,
  Shell,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";
import {
  clearLines,
  findRecipe,
  giftLines,
  money,
  recipeLines,
  setPlan,
  totals,
  useBox,
} from "../lib/box";
import { deliveryDates, longDate, shortDate, useNow } from "../lib/week";

const states = [
  "Connecticut",
  "Maine",
  "Massachusetts",
  "New Hampshire",
  "New Jersey",
  "New York",
  "Rhode Island",
  "Vermont",
];

/** Luhn checksum, so a mistyped card number is caught before submit. */
function luhn(value: string) {
  const digits = value.replace(/\D/g, "");
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2) d = d * 2 > 9 ? d * 2 - 9 : d * 2;
    sum += d;
  }
  return digits.length >= 13 && sum % 10 === 0;
}

function notExpired(value: string) {
  const [mm, yy] = value.split("/").map(Number);
  const now = new Date();
  return (
    2000 + yy > now.getFullYear() ||
    (2000 + yy === now.getFullYear() && mm >= now.getMonth() + 1)
  );
}

const accountMessages: Messages = {
  email: {
    missing: "Enter your email; it becomes your Pantry login.",
    invalid: "Check the email, it needs an @ and a domain like example.com.",
  },
  password: {
    missing: "Choose a password to protect your account.",
    invalid: "Use at least 8 characters for your password.",
  },
  name: { missing: "Enter your full name for the account and delivery label." },
};
const deliveryMessages: Messages = {
  phone: {
    missing: "Enter a phone number so the driver can text you.",
    invalid: "Use a 10-digit US number, like 555 014 2290.",
  },
  street: {
    missing:
      "Enter the street address, including the house or building number.",
  },
  city: { missing: "Enter your town or city." },
  state: { missing: "Choose your state; we deliver to the eight listed." },
  zip: {
    missing: "Enter your 5-digit ZIP code.",
    invalid: "ZIP codes are 5 digits, like 02903.",
  },
};
const paymentMessages: Messages = {
  card: {
    missing: "Enter the card number.",
    invalid:
      "That card number doesn’t add up. Check the digits; try 4242 4242 4242 4242 for this demo.",
    check: luhn,
  },
  expiry: {
    missing: "Enter the expiry date as MM/YY.",
    invalid: "Use MM/YY with a month that hasn’t passed, like 08/29.",
    check: notExpired,
  },
  cvc: {
    missing: "Enter the 3- or 4-digit security code from the back of the card.",
    invalid: "The security code is 3 or 4 digits.",
  },
  terms: {
    missing: "Tick the box to confirm you understand the plan renews weekly.",
  },
};

type Order = {
  number: string;
  email: string;
  recipes: string[];
  gifts: number;
  total: number;
  delivery: string | null;
};

export function Checkout() {
  const box = useBox();
  const now = useNow();
  const dates = deliveryDates(now);
  const t = totals(box);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const hasRecipes = t.meals > 0;

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      ...accountMessages,
      ...(hasRecipes ? deliveryMessages : {}),
      ...paymentMessages,
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    setTimeout(() => {
      setOrder({
        number: "PAN-" + Math.floor(100000 + Math.random() * 899999),
        email,
        recipes: recipeLines(box).map(
          (l) =>
            (l.qty > 1 ? `${l.qty} × ` : "") +
            (findRecipe(l.slug)?.name ?? l.slug),
        ),
        gifts: giftLines(box).reduce((s, g) => s + g.qty, 0),
        total: t.total,
        delivery: hasRecipes ? longDate(dates[box.day]) : null,
      });
      clearLines();
      setBusy(false);
    }, 1000);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="confirmation" aria-live="polite">
          <span className="confirm-mark" aria-hidden="true">
            <Check size={30} />
          </span>
          <h1 ref={done} tabIndex={-1}>
            You’re in. Your first box is booked.
          </h1>
          <p className="lead">
            Order <b>{order.number}</b> is confirmed and a receipt is on its way
            to {order.email}.
            {order.delivery &&
              ` We’ll deliver on ${order.delivery}, between 8 am and 8 pm.`}
          </p>
          {order.recipes.length > 0 && (
            <>
              <h2>In your first box</h2>
              <ul className="confirm-list">
                {order.recipes.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {order.gifts > 0 && (
            <p>
              {order.gifts} gift {order.gifts === 1 ? "card is" : "cards are"}{" "}
              scheduled and will be emailed on the dates you chose.
            </p>
          )}
          <p className="confirm-total">
            Charged today <b className="num">{money(order.total)}</b>
          </p>
          <p className="muted">{checkoutCopy.note}</p>
          <div className="actions">
            <Link to="/menu" className="btn">
              Browse next week’s menu{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/how-it-works" className="btn btn-ghost">
              How skipping works
            </Link>
          </div>
        </div>
      </div>
    );

  if (!box.lines.length || (hasRecipes && t.meals < minMeals))
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1>Sign up & check out</h1>
        </header>
        <div className="empty">
          <h2>
            {box.lines.length
              ? `Boxes start at ${minMeals} recipes`
              : "Your box is empty"}
          </h2>
          <p>
            {box.lines.length
              ? "Add one more recipe and come back here."
              : "Build a box or add a gift card first, then check out here."}
          </p>
          <div className="actions">
            <Link to={box.lines.length ? "/menu" : "/plans"} className="btn">
              {box.lines.length ? "Add from the menu" : "Build your box"}
            </Link>
            <Link to="/gift-cards" className="btn btn-ghost">
              Buy a gift card
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>Sign up & check out</h1>
        <p className="lead">
          One form: your account, where the box goes, and how you pay. Takes
          about two minutes.
        </p>
      </header>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          aria-busy={busy}
        >
          <fieldset>
            <legend>Your account</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              hint="At least 8 characters."
              error={errors.password}
            />
            <Field
              label="Full name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
          </fieldset>

          {hasRecipes && (
            <fieldset>
              <legend>Delivery</legend>
              <Field
                label="Mobile phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                pattern="[\d\s\(\)\.\+\-]{10,16}"
                required
                hint="The driver texts 30 minutes before arriving."
                error={errors.phone}
              />
              <Field
                label="Street address"
                name="street"
                autoComplete="address-line1"
                required
                error={errors.street}
              />
              <Field
                label="Apartment, suite, buzzer (optional)"
                name="apt"
                autoComplete="address-line2"
              />
              <div className="field-row field-row-3">
                <Field
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  required
                  error={errors.city}
                />
                <Shell label="State" name="state" error={errors.state}>
                  {(a11y) => (
                    <select
                      {...a11y}
                      name="state"
                      required
                      defaultValue=""
                      autoComplete="address-level1"
                    >
                      <option value="" disabled>
                        Choose…
                      </option>
                      {states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  )}
                </Shell>
                <Field
                  label="ZIP"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="\d{5}"
                  required
                  error={errors.zip}
                />
              </div>
              <Shell
                label="Where should we leave it? (optional)"
                name="instructions"
                hint="Side porch, with the concierge, behind the planter…"
              >
                {(a11y) => (
                  <textarea
                    {...a11y}
                    name="instructions"
                    rows={2}
                    maxLength={200}
                  />
                )}
              </Shell>
              <fieldset className="choice-set">
                <legend>Delivery day</legend>
                <div className="day-row">
                  {deliveryDays.map((d) => (
                    <label key={d} className="choice choice-day">
                      <input
                        type="radio"
                        name="day"
                        checked={box.day === d}
                        onChange={() => setPlan({ day: d as DeliveryDay })}
                      />
                      <span className="choice-big">{d}</span>
                      <span className="choice-sub">
                        {shortDate(dates[d]).split(", ")[1]}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </fieldset>
          )}

          <fieldset>
            <legend>Payment</legend>
            <Field
              label="Card number"
              name="card"
              inputMode="numeric"
              autoComplete="cc-number"
              pattern="[\d ]{13,23}"
              required
              placeholder="1234 1234 1234 1234"
              error={errors.card}
            />
            <div className="field-row">
              <Field
                label="Expiry (MM/YY)"
                name="expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                pattern="(0[1-9]|1[0-2])/\d{2}"
                required
                placeholder="MM/YY"
                error={errors.expiry}
              />
              <Field
                label="Security code"
                name="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                pattern="\d{3,4}"
                required
                error={errors.cvc}
              />
            </div>
            <div className="check-field">
              <input
                id="f-terms"
                type="checkbox"
                name="terms"
                required
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "f-terms-error" : undefined}
              />
              <label htmlFor="f-terms">
                {hasRecipes
                  ? "I understand my plan renews every week at this size until I skip, pause or cancel before a Wednesday cutoff."
                  : "I understand gift cards are non-refundable once emailed."}
              </label>
              {errors.terms && (
                <p className="field-error" id="f-terms-error">
                  {errors.terms}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn btn-big btn-block"
            disabled={busy}
          >
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Booking your box…
              </>
            ) : (
              <>
                <Lock size={18} aria-hidden="true" /> Pay {money(t.total)} and
                sign up
              </>
            )}
          </button>
          <p className="muted small">{checkoutCopy.note}</p>
        </form>

        <aside className="summary" aria-labelledby="co-sum">
          <h2 id="co-sum">Your box</h2>
          <ul className="summary-lines">
            {recipeLines(box).map((l) => {
              const r = findRecipe(l.slug);
              return r ? (
                <li key={l.key}>
                  <img
                    src={r.image.src}
                    alt=""
                    width={r.image.w}
                    height={r.image.h}
                  />
                  <span>
                    {l.qty > 1 && `${l.qty} × `}
                    {r.name}
                  </span>
                </li>
              ) : null;
            })}
            {giftLines(box).map((g) => (
              <li key={g.key}>
                <span className="summary-gift" aria-hidden="true">
                  <Gift size={20} />
                </span>
                <span>
                  {g.qty > 1 && `${g.qty} × `}
                  {money(g.amount)} gift card for {g.to}
                </span>
              </li>
            ))}
          </ul>
          <dl className="price-list">
            {hasRecipes && (
              <>
                <div>
                  <dt>
                    {t.meals} recipes for {box.people}
                  </dt>
                  <dd className="num">{money(t.recipesTotal)}</dd>
                </div>
                <div>
                  <dt>Delivery {shortDate(dates[box.day])}</dt>
                  <dd className="num">
                    {t.delivery ? money(t.delivery) : "Free"}
                  </dd>
                </div>
              </>
            )}
            {t.giftsTotal > 0 && (
              <div>
                <dt>Gift cards</dt>
                <dd className="num">{money(t.giftsTotal)}</dd>
              </div>
            )}
            <div className="price-total">
              <dt>Due today</dt>
              <dd className="num">{money(t.total)}</dd>
            </div>
          </dl>
          <Link to="/box" className="text-link">
            Edit your box
          </Link>
        </aside>
      </div>
    </div>
  );
}
