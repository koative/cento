import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "../router";
import {
  ageCutoff,
  brand,
  clubToday,
  feeNotes,
  joinFaq,
  plans,
  season,
} from "../content";
import {
  ageOn,
  fmtDate,
  money,
  teamOf,
  teamsFor,
  type Preference,
} from "../lib/club";
import {
  Field,
  emailOk,
  focusFirstError,
  useErrors,
  type Errors,
} from "../components/Field";
import { PageHead } from "../components/Bits";

type Billing = "season" | "monthly";
type Sent = {
  first: string;
  teamName: string;
  price: string;
  session?: string;
  email: string;
};

const prefs: { id: Preference; label: string }[] = [
  { id: "any", label: "No preference" },
  { id: "women", label: "Women & girls" },
  { id: "men", label: "Men & boys" },
];

const fromHash = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("team") ??
  "";

export function Join() {
  const [billing, setBilling] = useState<Billing>("season");
  const [dob, setDob] = useState("");
  const [pref, setPref] = useState<Preference>(() => {
    const who = teamOf(fromHash())?.who;
    return who === "Women" || who === "Girls"
      ? "women"
      : who === "Men" || who === "Boys"
        ? "men"
        : "any";
  });
  const [team, setTeam] = useState(fromHash);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [sent, setSent] = useState<Sent | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const age = dob ? ageOn(dob, ageCutoff) : null;
  const fits = age === null ? [] : teamsFor(age, pref);
  const chosen = teamOf(team);
  const plan = plans.find((p) => p.id === (chosen?.plan ?? "social"))!;
  const minor = age !== null && age < 18;
  const priceText =
    billing === "season"
      ? `${money(plan.season)} for the season`
      : `${money(plan.monthly)} a month, September to June`;

  const validate = (form: HTMLFormElement): Errors => {
    const v = (name: string) =>
      (
        form.elements.namedItem(name) as HTMLInputElement | null
      )?.value.trim() ?? "";
    const e: Errors = {};
    const name = v("name");
    if (!name) e.name = "Enter the player's full name.";
    else if (!name.includes(" "))
      e.name = "Add a surname too, so the league can register them.";
    if (!dob)
      e.dob = "Enter the player's date of birth; age groups depend on it.";
    else if (dob >= clubToday)
      e.dob = "That date is in the future. Check the year.";
    else if (age !== null && age < 4)
      e.dob =
        "Mini Kickers starts at 4. Come back once they're 4 by 31 August.";
    if (age !== null && !team)
      e.team = fits.length
        ? "Choose a team, or 'Supporter' if you're not playing."
        : "Choose 'Waiting list' or 'Supporter' to continue.";
    else if (
      age !== null &&
      team !== "supporter" &&
      team !== "waiting" &&
      !fits.some((t) => t.slug === team)
    )
      e.team = `The ${chosen?.short ?? "team"} is for ages ${chosen?.ages}. Pick one of the teams listed for this age.`;
    if (minor && !v("guardian"))
      e.guardian = "Players under 18 need a parent or guardian's name.";
    const email = v("email");
    if (!email) e.email = "Enter an email address for training updates.";
    else if (!emailOk(email))
      e.email =
        "That email address looks incomplete. Check the part after the @.";
    if (v("phone").replace(/\D/g, "").length < 10)
      e.phone = "Enter a phone number with its area code, like 01632 960412.";
    if (!(form.elements.namedItem("conduct") as HTMLInputElement).checked)
      e.conduct = "Tick to agree to the code of conduct before sending.";
    return e;
  };

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstError(form, e);
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    window.setTimeout(() => {
      const first = String(data.get("name")).trim().split(" ")[0];
      const s = chosen?.training[0];
      setSent({
        first,
        teamName:
          chosen?.name ??
          (team === "waiting" ? "the waiting list" : "Supporter membership"),
        price: priceText,
        session:
          s && `${fmtDate(nextDate(s.day), "full")}, ${s.start} on ${s.where}`,
        email: String(data.get("email")).trim(),
      });
      setStatus("idle");
      form.reset();
      setDob("");
      setTeam("");
    }, 900);
  };

  return (
    <>
      <PageHead
        title="Join the club"
        lede={`Membership for the ${season} season. Players, parents, supporters and anyone who'd like to help on a Saturday morning.`}
      />

      <section className="section-tight" aria-labelledby="fees-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="fees-title">Fees</h2>
            <fieldset className="segmented">
              <legend className="sr-only">Show prices</legend>
              {(["season", "monthly"] as Billing[]).map((b) => (
                <label key={b}>
                  <input
                    type="radio"
                    name="billing-view"
                    checked={billing === b}
                    onChange={() => setBilling(b)}
                  />
                  <span>{b === "season" ? "Per season" : "Monthly"}</span>
                </label>
              ))}
            </fieldset>
          </div>
          <ul className="fees">
            {plans.map((p) => (
              <li
                key={p.id}
                data-active={plan.id === p.id && chosen ? "" : undefined}
              >
                <div className="fee-name">
                  <h3>{p.name}</h3>
                  <p>{p.who}</p>
                </div>
                <p className="fee-price">
                  <b className="num">
                    {money(billing === "season" ? p.season : p.monthly)}
                  </b>
                  <span>
                    {billing === "season" ? "per season" : "a month × 10"}
                  </span>
                </p>
                <ul className="fee-includes">
                  {p.includes.map((i) => (
                    <li key={i}>
                      <Check aria-hidden="true" size={16} /> {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <ul className="fee-notes">
            {feeNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section paper-2" aria-labelledby="apply-title">
        <div className="wrap apply-grid">
          <div className="apply-intro">
            <h2 id="apply-title">Registration form</h2>
            <p>
              One form per player. We'll match you to a team by age on 31 August{" "}
              {ageCutoff.slice(0, 4)}, and the coach will get in touch within
              three days with a first session.
            </p>
            <p className="muted small">
              This is a demo: nothing you type is sent anywhere or stored.
            </p>
          </div>

          {sent ? (
            <div
              className="success"
              role="status"
              tabIndex={-1}
              ref={successRef}
            >
              <Check aria-hidden="true" size={32} />
              <h3>
                Welcome to {brand.name}, {sent.first}.
              </h3>
              <p>
                You're registered for {sent.teamName} ({sent.price}). A
                confirmation would go to {sent.email}; in this demo nothing has
                been sent.
              </p>
              {sent.session && (
                <p>
                  First session: <b>{sent.session}</b>. Bring water and shin
                  pads; spare boots live in the clubhouse.
                </p>
              )}
              <div className="actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSent(null)}
                >
                  Register another player
                </button>
                <Link to="/fixtures" className="text-link">
                  See this weekend's games{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="apply-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
              aria-busy={status === "sending"}
            >
              <fieldset>
                <legend>The player</legend>
                <Field
                  label="Full name"
                  name="name"
                  required
                  autoComplete="name"
                  error={errors.name}
                />
                <Field
                  label="Date of birth"
                  name="dob"
                  type="date"
                  required
                  max={clubToday}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  error={errors.dob}
                  hint={
                    age !== null && age >= 0
                      ? `Age on 31 August: ${age}`
                      : "Age groups go by age on 31 August."
                  }
                />
                <fieldset className="radios">
                  <legend>Who would they like to play with?</legend>
                  {prefs.map((p) => (
                    <label key={p.id}>
                      <input
                        type="radio"
                        name="pref"
                        value={p.id}
                        checked={pref === p.id}
                        onChange={() => setPref(p.id)}
                      />
                      {p.label}
                    </label>
                  ))}
                </fieldset>
              </fieldset>

              <fieldset
                className="radios team-pick"
                data-invalid={errors.team ? "" : undefined}
                aria-describedby={errors.team ? "team-err" : undefined}
              >
                <legend>Team</legend>
                {age === null ? (
                  <p className="muted">
                    {chosen
                      ? `Enter a date of birth to confirm the ${chosen.name} is the right age group.`
                      : "Enter a date of birth to see the teams that fit."}
                  </p>
                ) : fits.length === 0 ? (
                  <p className="muted">
                    No team for age {age}{" "}
                    {pref === "any" ? "" : "in that section "}yet. Join the
                    waiting list and we'll call when a place opens.
                  </p>
                ) : null}
                {fits.map((t) => (
                  <label key={t.slug} className="team-option">
                    <input
                      type="radio"
                      name="team"
                      value={t.slug}
                      checked={team === t.slug}
                      onChange={() => setTeam(t.slug)}
                    />
                    <span>
                      <b>{t.name}</b>
                      <small>
                        {t.training
                          .map((s) => `${s.day} ${s.start}`)
                          .join(", ")}{" "}
                        · {t.matchday.split(",")[0]}
                      </small>
                    </span>
                  </label>
                ))}
                {age !== null && fits.length === 0 && (
                  <label className="team-option">
                    <input
                      type="radio"
                      name="team"
                      value="waiting"
                      checked={team === "waiting"}
                      onChange={() => setTeam("waiting")}
                    />
                    <span>
                      <b>Waiting list</b>
                      <small>Free until a place opens</small>
                    </span>
                  </label>
                )}
                <label className="team-option">
                  <input
                    type="radio"
                    name="team"
                    value="supporter"
                    checked={team === "supporter"}
                    onChange={() => setTeam("supporter")}
                  />
                  <span>
                    <b>Supporter, not playing</b>
                    <small>
                      AGM vote, clubhouse discount, the Monday Sheet
                    </small>
                  </span>
                </label>
                {errors.team && (
                  <p className="field-error" id="team-err">
                    {errors.team}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend>Contact</legend>
                {minor && (
                  <Field
                    label="Parent or guardian's name"
                    name="guardian"
                    required
                    autoComplete="off"
                    error={errors.guardian}
                    hint="Needed for every player under 18. They'll be the coach's main contact."
                  />
                )}
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  error={errors.phone}
                  hint="Coaches text about cancellations, never anything else."
                />
                <Field label="Football so far" name="experience">
                  <select defaultValue="none">
                    <option value="none">Never played in a team</option>
                    <option value="school">Played at school</option>
                    <option value="club">Played for a club before</option>
                    <option value="current">
                      Registered with another club this season
                    </option>
                  </select>
                </Field>
                <Field
                  label="Anything the coach should know (optional)"
                  name="notes"
                  hint="Medical conditions, access needs, or 'half-term camp' if you're booking that."
                >
                  <textarea rows={3} />
                </Field>
              </fieldset>

              {team !== "waiting" && (
                <fieldset className="radios">
                  <legend>How would you like to pay?</legend>
                  {(["season", "monthly"] as Billing[]).map((b) => (
                    <label key={b}>
                      <input
                        type="radio"
                        name="billing"
                        value={b}
                        checked={billing === b}
                        onChange={() => setBilling(b)}
                      />
                      {b === "season"
                        ? `Once, ${money(plan.season)}`
                        : `Monthly, ${money(plan.monthly)} × 10`}
                    </label>
                  ))}
                </fieldset>
              )}

              <div className="checks">
                <div
                  className="field"
                  data-invalid={errors.conduct ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="conduct"
                      required
                      aria-invalid={errors.conduct ? true : undefined}
                      aria-describedby={
                        errors.conduct ? "f-conduct-err" : undefined
                      }
                    />
                    I agree to the club code of conduct for players and parents.
                  </label>
                  {errors.conduct && (
                    <p className="field-error" id="f-conduct-err">
                      {errors.conduct}
                    </p>
                  )}
                </div>
                <label className="check">
                  <input type="checkbox" name="photos" />
                  Photos of this player may appear on the club website and
                  socials.
                </label>
              </div>

              <div className="submit-row">
                <p className="summary num">
                  {chosen
                    ? `${chosen.name} · ${priceText}`
                    : team === "supporter"
                      ? `Supporter · ${priceText}`
                      : "Choose a team to see the fee."}
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle
                        className="spin"
                        aria-hidden="true"
                        size={18}
                      />{" "}
                      Sending…
                    </>
                  ) : (
                    <>
                      Send registration{" "}
                      <ArrowRight aria-hidden="true" size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title">Before you join</h2>
          <div className="faq">
            {joinFaq.map((f) => (
              <details key={f.q}>
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

/** The next calendar date (after the club's "today") that falls on a training weekday. */
function nextDate(day: string) {
  const order = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(clubToday + "T00:00:00Z");
  const ahead = (order.indexOf(day) - d.getUTCDay() + 7) % 7 || 7;
  d.setUTCDate(d.getUTCDate() + ahead);
  return d.toISOString().slice(0, 10);
}
