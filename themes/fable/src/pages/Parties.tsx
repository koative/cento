import { useState, type FormEvent } from "react";
import { Cake, Check, Send } from "lucide-react";
import { brand, packages, partyAddOns } from "../content";
import { isoLocal, longDate, money, parseIso } from "../lib/format";
import {
  pause,
  reference,
  useErrors,
  validate,
  type Errors,
} from "../lib/forms";
import { Field } from "../components/Field";

export function Parties() {
  const { errors, setErrors, onChange } = useErrors();
  const [pkgId, setPkgId] = useState(packages[1].id);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [guests, setGuests] = useState(12);
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [sent, setSent] = useState<{
    ref: string;
    child: string;
    date: string;
    pkg: string;
  } | null>(null);
  const pkg = packages.find((p) => p.id === pkgId)!;
  const earliest = isoLocal(new Date(Date.now() + 7 * 864e5));
  const addOnTotal = partyAddOns
    .filter((a) => addOns.includes(a.label))
    .reduce((s, a) => s + (a.perGuest ? a.price * guests : a.price), 0);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const date = String(data.get("date"));
    const extra: Errors = {};
    if (guests > pkg.maxGuests) {
      const bigger = packages.find((p) => p.maxGuests >= guests);
      extra.guests = `${pkg.name} hosts up to ${pkg.maxGuests} children.${bigger ? ` Choose ${bigger.name} for ${guests}.` : ""}`;
    }
    if (date && date >= earliest) {
      const day = parseIso(date).getDay();
      if (pkg.id === "night" ? day !== 5 && day !== 6 : day !== 0 && day !== 6)
        extra.date =
          pkg.id === "night"
            ? "Night at the Museum runs on Friday and Saturday evenings."
            : "Daytime parties run on Saturdays and Sundays.";
    }
    const found = validate(
      form,
      {
        parent: "Add your name so our party host knows who to call.",
        email: "Add an email like name@example.com for the confirmation.",
        child: "Add the birthday child’s first name.",
        age: "Add the age they are turning, between 1 and 12.",
        date: `Pick a date on or after ${longDate(earliest)}: parties need a week’s notice.`,
        guests: "Enter the number of children coming, at least 4.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(1000);
    setSent({
      ref: reference("PTY"),
      child: String(data.get("child")),
      date,
      pkg: pkg.name,
    });
    setState("idle");
  }

  return (
    <>
      <section className="page-hero wrap party-hero">
        <h1>Birthday parties</h1>
        <p className="lede">
          A private gallery hour, a host who runs the games and the clean-up,
          and a party room with your name on the door.
        </p>
      </section>

      <section className="section-tight wrap" aria-labelledby="pkg-title">
        <h2 id="pkg-title" className="sr-only">
          Packages
        </h2>
        <div className="packages">
          {packages.map((p) => (
            <article
              key={p.id}
              className="package"
              data-picked={p.id === pkgId ? "" : undefined}
            >
              <img
                src={p.image}
                alt={p.alt}
                width={1280}
                height={854}
                loading="lazy"
              />
              <div className="package-body">
                <h3>{p.name}</h3>
                <p className="package-price">
                  <strong className="tnum">{money(p.price)}</strong> up to{" "}
                  {p.maxGuests} children
                </p>
                <p className="package-meta">
                  {p.ages} · {p.length}
                </p>
                <ul className="ticks">
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section wrap enquiry"
        aria-labelledby="party-form-title"
      >
        <div className="enquiry-intro">
          <h2 id="party-form-title">Ask for a date</h2>
          <p>
            Send us the details and a party host will call within two days to
            confirm and take a $100 deposit. Weekends book up about six weeks
            ahead.
          </p>
          <h3>Add-ons</h3>
          <ul className="addons-list">
            {partyAddOns.map((a) => (
              <li key={a.label}>
                {a.label}{" "}
                <span className="tnum">
                  {money(a.price)}
                  {a.perGuest ? " each" : ""}
                </span>
              </li>
            ))}
          </ul>
          <p>
            Questions first?{" "}
            <a href={`mailto:${brand.email}?subject=Party%20question`}>
              {brand.email}
            </a>
          </p>
        </div>
        <div aria-live="polite">
          {sent ? (
            <div className="form-done">
              <Check aria-hidden="true" />
              <h3>Party request sent for {sent.child}</h3>
              <p>
                {sent.pkg} on {longDate(sent.date)}. Reference{" "}
                <strong className="tnum">{sent.ref}</strong>. A host will call
                to confirm. This is a demo: nothing was sent or charged.
              </p>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => setSent(null)}
              >
                Plan another party
              </button>
            </div>
          ) : (
            <form
              className="form-card"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <fieldset className="pkg-pick">
                <legend>Package</legend>
                {packages.map((p) => (
                  <label key={p.id} className="radio-card">
                    <input
                      type="radio"
                      name="package"
                      value={p.id}
                      checked={pkgId === p.id}
                      onChange={() => setPkgId(p.id)}
                    />
                    <span>
                      <strong>{p.name}</strong>
                      <small className="tnum">
                        {money(p.price)} · up to {p.maxGuests}
                      </small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <div className="field-grid">
                <Field
                  label="Your name"
                  name="parent"
                  required
                  autoComplete="name"
                  error={errors.parent}
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
                  label="Birthday child’s first name"
                  name="child"
                  required
                  error={errors.child}
                />
                <Field
                  label="Turning"
                  name="age"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={12}
                  required
                  error={errors.age}
                />
                <Field
                  label="Party date"
                  name="date"
                  type="date"
                  min={earliest}
                  required
                  error={errors.date}
                  hint={
                    pkg.id === "night"
                      ? "Friday or Saturday evening"
                      : "Saturday or Sunday"
                  }
                />
                <Field
                  label="Children coming"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={4}
                  max={30}
                  required
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  error={errors.guests}
                  hint={`${pkg.name}: up to ${pkg.maxGuests}`}
                />
              </div>
              <fieldset className="addons">
                <legend>Add-ons</legend>
                {partyAddOns.map((a) => (
                  <label key={a.label} className="check-line">
                    <input
                      type="checkbox"
                      checked={addOns.includes(a.label)}
                      onChange={() =>
                        setAddOns((cur) =>
                          cur.includes(a.label)
                            ? cur.filter((x) => x !== a.label)
                            : [...cur, a.label],
                        )
                      }
                    />
                    <span>{a.label}</span>
                  </label>
                ))}
              </fieldset>
              <p className="estimate" aria-live="polite">
                <Cake aria-hidden="true" /> Estimated total{" "}
                <strong className="tnum">
                  {money(pkg.price + addOnTotal)}
                </strong>
              </p>
              <button
                className="btn btn-coral btn-lg"
                disabled={state === "sending"}
              >
                <Send aria-hidden="true" />{" "}
                {state === "sending" ? "Sending…" : "Send party request"}
              </button>
              <p className="quiet-note">Demo form: nothing is sent anywhere.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
