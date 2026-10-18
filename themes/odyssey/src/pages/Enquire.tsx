import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { Link } from "../router";
import { brand, destinationBySlug, journeyBySlug, planners } from "../content";
import { hashParam, money, summarise, usePlan, setPlan } from "../lib/plan";

type Errors = Partial<Record<string, string>>;

const lengths = [
  "About a week",
  "10 to 14 nights",
  "Two weeks or more",
  "Not sure yet",
];
const budgets = [
  "Under $4,000",
  "$4,000 to $7,000",
  "$7,000 to $10,000",
  "Over $10,000",
];
const contacts = ["Email", "Phone call", "Video call"];

function initialWhere() {
  const d = destinationBySlug(hashParam("destination") ?? "");
  if (d) return d.name;
  return journeyBySlug(hashParam("journey") ?? "")?.name ?? "";
}

export function Enquire() {
  const plan = usePlan();
  const sum = summarise(plan);
  const hasRoute = sum.stops.length > 0;
  const assigned =
    (
      sum.stops[0]?.d ??
      destinationBySlug(hashParam("destination") ?? "") ??
      destinationBySlug(
        journeyBySlug(hashParam("journey") ?? "")?.stops[0].slug ?? "",
      )
    )?.planner ?? planners[0].name;
  const [errors, setErrors] = useState<Errors>({});
  const [contact, setContact] = useState("Email");
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [sent, setSent] = useState({
    ref: "",
    name: "",
    email: "",
    planner: "",
  });
  const thisMonth = new Date().toISOString().slice(0, 7);

  function validate(f: HTMLFormElement): Errors {
    const v = (n: string) =>
      (f.elements.namedItem(n) as HTMLInputElement).value.trim();
    const el = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
    const e: Errors = {};
    if (!v("name"))
      e.name = "Tell us your name so the planner knows who to write to.";
    if (!v("email"))
      e.email = "Enter an email address; it is where your first draft will go.";
    else if (!el("email").validity.valid)
      e.email =
        "That email looks incomplete. Check it has an @ and a domain, like name@example.com.";
    if (contact === "Phone call" && !v("phone"))
      e.phone = "Add a phone number, or choose email or video instead.";
    else if (v("phone") && !/^[+()\d\s.-]{7,}$/.test(v("phone")))
      e.phone =
        "Use digits, spaces and an optional + only, e.g. +1 555 014 2290.";
    if (!hasRoute && !v("where"))
      e.where =
        "Name at least one place, or sketch a route in the planner and attach it.";
    if (!v("when")) e.when = "Choose a rough month; it can change later.";
    else if (v("when") < thisMonth)
      e.when = "That month has passed. Choose this month or later.";
    const adults = Number(v("adults"));
    if (!Number.isInteger(adults) || adults < 1 || adults > 12)
      e.adults = "Enter between 1 and 12 adults. Larger groups, call us.";
    if (!v("budget"))
      e.budget = "Pick a budget band so we draft at the right level.";
    if (!el("consent").checked)
      e.consent =
        "Tick to confirm you understand this is an enquiry, not a booking.";
    return e;
  }

  function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = ev.currentTarget;
    const e = validate(f);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      (f.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const data = new FormData(f);
    setState("sending");
    window.setTimeout(() => {
      setSent({
        ref: `ODY-${Math.floor(1000 + Math.random() * 9000)}`,
        name: String(data.get("name")).split(" ")[0],
        email: String(data.get("email")),
        planner: assigned,
      });
      setState("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  }

  const err = (n: string) =>
    errors[n] ? (
      <p id={`${n}-error`} className="field-error">
        {errors[n]}
      </p>
    ) : null;
  const aria = (n: string) => ({
    "aria-invalid": errors[n] ? true : undefined,
    "aria-describedby": errors[n] ? `${n}-error` : undefined,
    onInput: () => errors[n] && setErrors((e) => ({ ...e, [n]: undefined })),
  });

  return (
    <>
      <header className="page-head wrap">
        <h1>Start an enquiry</h1>
        <p className="lede">
          Tell us where, when and who. The planner for that region reads every
          enquiry personally and replies within one working day, usually to
          suggest a call.
        </p>
      </header>

      <div className="wrap enquire-grid">
        <div aria-live="polite" className="enquire-main">
          {state === "sent" ? (
            <div className="success" tabIndex={-1} ref={(n) => n?.focus()}>
              <Check className="success-mark" aria-hidden="true" />
              <h2>
                Thank you, {sent.name}. Your enquiry is with {sent.planner}.
              </h2>
              <p>
                Reference <strong className="num">{sent.ref}</strong>. A reply
                will come to {sent.email} within one working day, and from the
                same person who will plan the whole trip.
              </p>
              <ol className="next-steps">
                <li>
                  We read your notes and check availability for the month you
                  chose.
                </li>
                <li>We suggest a 30-minute call to talk it through.</li>
                <li>
                  Within five working days of that call, your first route
                  arrives.
                </li>
              </ol>
              <div className="actions">
                <Link to="/journal" className="btn btn-line">
                  Read the journal meanwhile
                </Link>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={() => {
                    setState("idle");
                    setErrors({});
                    setNotes("");
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form
              className="enquire-form"
              onSubmit={submit}
              noValidate
              aria-busy={state === "sending"}
            >
              {Object.keys(errors).some((k) => errors[k]) && (
                <p className="form-alert" role="alert">
                  A few details need attention before we can send this. Each is
                  marked below.
                </p>
              )}

              <fieldset>
                <legend>About you</legend>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      {...aria("name")}
                    />
                    {err("name")}
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      {...aria("email")}
                    />
                    {err("email")}
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="phone">
                      Phone{" "}
                      <span className="optional">
                        {contact === "Phone call"
                          ? "required for a call"
                          : "optional"}
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      {...aria("phone")}
                    />
                    {err("phone")}
                  </div>
                  <fieldset className="field radios">
                    <legend>Best way to reach you</legend>
                    {contacts.map((c) => (
                      <label key={c}>
                        <input
                          type="radio"
                          name="contact"
                          value={c}
                          checked={contact === c}
                          onChange={() => setContact(c)}
                        />
                        {c}
                      </label>
                    ))}
                  </fieldset>
                </div>
              </fieldset>

              <fieldset>
                <legend>The trip</legend>
                {hasRoute && (
                  <div className="attached">
                    <p>
                      <strong>Your route is attached:</strong>{" "}
                      {sum.stops
                        .map((s) => `${s.d.name} (${s.nights}n)`)
                        .join(" → ")}
                      , {sum.days} days, estimate {money(sum.perPerson)} per
                      person.
                    </p>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setPlan((p) => ({ ...p, stops: [] }))}
                      aria-label="Detach and clear the route"
                    >
                      <X aria-hidden="true" />
                    </button>
                  </div>
                )}
                <div className="field">
                  <label htmlFor="where">
                    Where would you like to go?{" "}
                    {hasRoute && (
                      <span className="optional">
                        optional, your route is attached
                      </span>
                    )}
                  </label>
                  <input
                    id="where"
                    name="where"
                    defaultValue={initialWhere()}
                    placeholder="e.g. Kyoto, then somewhere with a beach"
                    {...aria("where")}
                  />
                  {err("where")}
                  {!hasRoute && (
                    <p className="hint">
                      Prefer to sketch it?{" "}
                      <Link to="/planner">Draft a route in the planner</Link>{" "}
                      and it will be attached here.
                    </p>
                  )}
                </div>
                <div className="field-row field-row--3">
                  <div className="field">
                    <label htmlFor="when">Roughly when</label>
                    <input
                      id="when"
                      name="when"
                      type="month"
                      min={thisMonth}
                      defaultValue={
                        hasRoute && plan.start ? plan.start.slice(0, 7) : ""
                      }
                      {...aria("when")}
                    />
                    {err("when")}
                  </div>
                  <div className="field">
                    <label htmlFor="length">How long</label>
                    <select id="length" name="length" defaultValue={lengths[3]}>
                      {lengths.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="adults">Adults</label>
                    <input
                      id="adults"
                      name="adults"
                      type="number"
                      min={1}
                      max={12}
                      defaultValue={hasRoute ? plan.travellers : 2}
                      inputMode="numeric"
                      {...aria("adults")}
                    />
                    {err("adults")}
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="children">Children under 16</label>
                    <input
                      id="children"
                      name="children"
                      type="number"
                      min={0}
                      max={8}
                      defaultValue={0}
                      inputMode="numeric"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="budget">
                      Budget per person, excluding flights
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      {...aria("budget")}
                    >
                      <option value="" disabled>
                        Choose a band
                      </option>
                      {budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                    {err("budget")}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="notes">
                    Anything we should know{" "}
                    <span className="optional">optional</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    maxLength={1000}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="The last trip you loved, the one you didn't, a birthday, a bad knee, a fear of small planes…"
                    aria-describedby="notes-count"
                  />
                  <p id="notes-count" className="hint num">
                    {notes.length} / 1000
                  </p>
                </div>
              </fieldset>

              <div className="field consent">
                <label>
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    {...aria("consent")}
                  />
                  <span>
                    I understand this is an enquiry, not a booking, and nothing
                    is charged until I confirm a route.
                  </span>
                </label>
                {err("consent")}
              </div>

              <button
                type="submit"
                className="btn btn-accent btn-wide"
                disabled={state === "sending"}
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="spin" aria-hidden="true" /> Sending to a
                    planner…
                  </>
                ) : (
                  <>
                    Send enquiry <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="fine">
                This is a demo: nothing is sent or stored beyond this page.
              </p>
            </form>
          )}
        </div>

        <aside className="enquire-aside">
          <h2 className="h3">Rather talk?</h2>
          <p>
            <a href={brand.phoneHref} className="big-link">
              {brand.phone}
            </a>
          </p>
          <dl className="hours">
            {brand.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
          <p>
            Or write to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
          <p className="fine">
            Already travelling with us? Use the 24-hour number in your dossier:{" "}
            {brand.emergency}.
          </p>
        </aside>
      </div>
    </>
  );
}
