import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  days,
  passes,
  sessions,
  speakerBySlug,
  tickets,
  type PassId,
} from "../content";
import { money, pause, useErrors, validate } from "../lib/forms";
import { usePlan } from "../lib/plan";
import { Field } from "../components/Field";

const workshops = sessions.filter((s) => s.seats);

function fromHash() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const pass = passes.find((p) => p.id === q.get("pass"))?.id ?? "full";
  const qty = Math.min(Math.max(Number(q.get("qty")) || 1, 1), 40);
  return { pass, qty };
}

type Order = {
  ref: string;
  pass: string;
  qty: number;
  total: number;
  email: string;
  workshop?: string;
};

export function Register() {
  const initial = fromHash();
  const plan = usePlan();
  const [pass, setPass] = useState<PassId>(initial.pass);
  const [qty, setQty] = useState(initial.qty);
  const [invoice, setInvoice] = useState(false);
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const doneHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => doneHeading.current?.focus(), [order]);

  // Arriving from another pass link while already on this page: pick up the new choice.
  useEffect(() => {
    const sync = () => {
      const next = fromHash();
      setPass(next.pass);
      setQty(next.qty);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const chosen = passes.find((p) => p.id === pass)!;
  const team = qty >= tickets.teamSize;
  const each = Math.round(
    chosen.earlyPrice * (team ? 1 - tickets.teamDiscount : 1),
  );
  const total = each * qty;
  const plannedWorkshop = workshops.find((w) => plan.includes(w.id))?.id ?? "";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    if (pass === "student" && qty > 1)
      extra.qty =
        "Student passes are one per person. Set the quantity to 1, or book colleagues on a Conference pass.";
    const found = validate(
      form,
      {
        qty: "Choose between 1 and 40 passes. For larger groups, write to us.",
        day: "Pick Thursday or Friday for your day pass.",
        workshop: "Pick the workshop or walk you want a seat in.",
        name: "Enter the name to print on the badge.",
        email: "Enter an email like you@studio.com — your tickets go there.",
        company:
          "Add the company name for the invoice, or untick the invoice box.",
        conduct: "Please agree to the code of conduct to continue.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    const data = new FormData(form);
    const workshop = workshops.find(
      (w) => w.id === data.get("workshop"),
    )?.title;
    setOrder({
      ref: `PR27-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      pass: chosen.name,
      qty,
      total,
      email: String(data.get("email")),
      workshop,
    });
    setBusy(false);
    window.scrollTo({ top: 0 });
  };

  if (order) {
    return (
      <div className="wrap page register-done" aria-live="polite">
        <Check className="done-mark" aria-hidden="true" />
        <h1 ref={doneHeading} tabIndex={-1}>
          You're coming to Prism
        </h1>
        <p className="lede">
          {order.qty} × {order.pass} reserved for {money(order.total)}. We've
          sent the tickets and a VAT invoice to {order.email}.
        </p>
        <dl className="receipt">
          <div>
            <dt>Reference</dt>
            <dd>{order.ref}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{brand.dates}, doors 08:30</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{brand.address}</dd>
          </div>
          {order.workshop && (
            <div>
              <dt>Workshop</dt>
              <dd>{order.workshop}</dd>
            </div>
          )}
        </dl>
        <div className="actions">
          <Link to="/agenda" className="btn btn-ink">
            Build your agenda
          </Link>
          <Link to="/venue" className="btn btn-line">
            Plan your trip
          </Link>
        </div>
        <p className="quiet-line">
          This is a demo: no order was placed, nothing was charged and no email
          was sent.
        </p>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Register</h1>
        <p className="lede">
          Choose a pass, tell us who's coming, and you're in. Takes two minutes;
          we'll email the tickets and an invoice.
        </p>
      </header>

      <form
        className="register"
        noValidate
        onSubmit={submit}
        onChange={onChange}
        aria-busy={busy}
      >
        <div className="register-fields">
          <fieldset className="pass-pick">
            <legend>Pass</legend>
            {passes.map((p) => (
              <label
                key={p.id}
                className="pass-option"
                data-checked={pass === p.id ? "" : undefined}
              >
                <input
                  type="radio"
                  name="pass"
                  value={p.id}
                  checked={pass === p.id}
                  onChange={() => setPass(p.id)}
                />
                <span className="po-name">{p.name}</span>
                <span className="po-text">{p.text}</span>
                <span className="po-price">{money(p.earlyPrice)}</span>
              </label>
            ))}
          </fieldset>

          <div className="field-row">
            <Field
              label="Number of passes"
              name="qty"
              type="number"
              min={1}
              max={40}
              required
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              hint={`${tickets.teamSize} or more save ${tickets.teamDiscount * 100}%`}
              error={errors.qty}
            />
            {pass === "day" && (
              <Field label="Which day" name="day" error={errors.day}>
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose a day
                  </option>
                  {days.slice(1).map((d) => (
                    <option key={d.iso} value={d.iso}>
                      {d.label} {d.date}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </div>

          {pass === "full" && (
            <Field
              label="Workshop or walk"
              name="workshop"
              hint={
                plannedWorkshop
                  ? "Pre-selected from your agenda."
                  : "Wednesday 12 May. Seats are held for 48 hours after you register."
              }
              error={errors.workshop}
            >
              <select required defaultValue={plannedWorkshop}>
                <option value="" disabled>
                  Choose one
                </option>
                {workshops.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.start} · {w.title} —{" "}
                    {w.speakers.map((s) => speakerBySlug[s].name).join(" & ")}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <fieldset className="group">
            <legend>{qty > 1 ? "Lead attendee" : "Attendee"}</legend>
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
                placeholder="you@studio.com"
                error={errors.email}
              />
            </div>
            <div className="field-row">
              <Field label="Role" name="role">
                <select defaultValue="Designer">
                  {[
                    "Designer",
                    "Design engineer",
                    "Researcher",
                    "Studio lead or founder",
                    "Student",
                    "Something else",
                  ].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field label="Lunch" name="diet">
                <select defaultValue="Vegetarian">
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Gluten-free",
                    "Other — we'll email you",
                  ].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field
              label="Access needs (optional)"
              name="access"
              hint="Wheelchair space, captions seat, quiet room key, companion pass — anything that helps."
            >
              <textarea rows={3} />
            </Field>
            {qty > 1 && (
              <p className="field-hint">
                We'll email you a link to add the other {qty - 1} names before
                the event.
              </p>
            )}
          </fieldset>

          <fieldset className="group">
            <legend>Invoice</legend>
            <label className="check">
              <input
                type="checkbox"
                checked={invoice}
                onChange={(e) => setInvoice(e.target.checked)}
              />
              Invoice a company
            </label>
            {invoice && (
              <div className="field-row">
                <Field
                  label="Company"
                  name="company"
                  required
                  autoComplete="organization"
                  error={errors.company}
                />
                <Field
                  label="VAT number (optional)"
                  name="vat"
                  placeholder="NL123456789B01"
                />
              </div>
            )}
          </fieldset>

          <div className="field" data-invalid={errors.conduct ? "" : undefined}>
            <label className="check">
              <input
                type="checkbox"
                name="conduct"
                required
                aria-invalid={errors.conduct ? true : undefined}
                aria-describedby={errors.conduct ? "f-conduct-err" : undefined}
              />
              <span>
                I've read the <Link to="/about">code of conduct</Link> and agree
                to it.
              </span>
            </label>
            {errors.conduct && (
              <p className="field-error" id="f-conduct-err">
                {errors.conduct}
              </p>
            )}
          </div>
        </div>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Summary</h2>
          <dl>
            <div>
              <dt>
                {qty} × {chosen.name}
              </dt>
              <dd>{money(chosen.earlyPrice * qty)}</dd>
            </div>
            {team && (
              <div>
                <dt>Team saving, {tickets.teamDiscount * 100}%</dt>
                <dd>−{money(chosen.earlyPrice * qty - total)}</dd>
              </div>
            )}
            <div className="summary-total">
              <dt>Total incl. VAT</dt>
              <dd aria-live="polite">{money(total)}</dd>
            </div>
          </dl>
          <p className="summary-note">
            Early-bird price until {tickets.earlyBirdEnds}. Free transfers until
            5 May.
          </p>
          <button
            type="submit"
            className="btn btn-ink btn-block"
            disabled={busy}
          >
            {busy ? "Reserving your passes…" : `Register · ${money(total)}`}
          </button>
          <p className="quiet-line">Demo form: nothing is sent or charged.</p>
        </aside>
      </form>
    </div>
  );
}
