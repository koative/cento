import { useState, type FormEvent } from "react";
import {
  availabilityDays,
  availabilitySlots,
  brand,
  pagesCopy,
  roles,
  volunteerSteps,
} from "../content";
import {
  clearError,
  Field,
  SelectField,
  TextField,
  validate,
  type Errors,
} from "../components/Field";
import volunteersImg from "../assets/volunteers.jpg";

const neighbourhoods = [
  "Mill Street",
  "Riverside",
  "North Hill",
  "Orchard Row",
  "The Flats",
  "Outside Calder Bend",
];

export function Volunteer() {
  const copy = pagesCopy.volunteer;
  const [role, setRole] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ name: string; role: string } | null>(null);

  function toggle(slot: string) {
    setSlots((s) =>
      s.includes(slot) ? s.filter((x) => x !== slot) : [...s, slot],
    );
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found: Errors = {};
    if (!role)
      found.role =
        "Pick the role you'd like to try. You can change your mind on the phone.";
    if (!slots.length)
      found.slots = "Tick at least one time you could usually do.";
    Object.assign(
      found,
      validate(form, {
        "vol-name": {
          missing: "Add your name so Priya knows who she's calling.",
        },
        "vol-email": {
          missing: "Add an email address for the confirmation.",
          invalid:
            "That email is missing something. Check the @ and the part after it.",
        },
        "vol-phone": {
          missing: "Add a phone number; the first chat is a call.",
          invalid: "Use a phone number with at least 7 digits, like 555 0142.",
        },
        "vol-area": {
          missing: "Choose your neighbourhood so we can match you nearby.",
        },
      }),
    );
    setErrors(found);
    if (found.role || found.slots)
      document
        .getElementById(found.role ? "role-group" : "slot-group")
        ?.focus();
    if (Object.keys(found).length) return;
    setBusy(true);
    const name = String(new FormData(form).get("vol-name"))
      .trim()
      .split(" ")[0];
    window.setTimeout(() => {
      setBusy(false);
      setDone({ name, role: roles.find((r) => r.id === role)!.title });
    }, 900);
  }

  const chosenTimes = availabilityDays.flatMap((d) =>
    availabilitySlots
      .filter((s) => slots.includes(`${d} ${s}`))
      .map((s) => `${d} ${s.toLowerCase()}`),
  );

  return (
    <>
      <header className="page-head page-head-image wrap">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.text}</p>
        </div>
        <img
          src={volunteersImg}
          alt="Volunteers potting young plants at a community garden table."
          width={900}
          height={600}
        />
      </header>

      <section className="section wrap">
        <h2>How it works</h2>
        <ol className="steps-explained">
          {volunteerSteps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="section wrap volunteer-form-section"
        aria-labelledby="apply-heading"
      >
        <h2 id="apply-heading">Sign up to help</h2>
        <div className="donate-grid">
          <div aria-live="polite">
            {done ? (
              <div className="note-success big-success">
                <p>
                  <strong>
                    Thank you, {done.name}. You're down as a{" "}
                    {done.role.toLowerCase()}.
                  </strong>
                </p>
                <p>
                  Priya will ring within a week to find your first shift and
                  your buddy. Nothing was sent anywhere: this form is a demo.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setDone(null);
                    setRole("");
                    setSlots([]);
                  }}
                >
                  Sign someone else up
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onInput={clearError(setErrors)}
                aria-busy={busy}
                className="volunteer-form"
              >
                <fieldset
                  className="role-pick"
                  id="role-group"
                  tabIndex={-1}
                  aria-describedby={errors.role ? "role-error" : undefined}
                  data-invalid={errors.role ? "" : undefined}
                >
                  <legend>1. Choose a role</legend>
                  {errors.role && (
                    <p className="field-error" id="role-error">
                      {errors.role}
                    </p>
                  )}
                  {roles.map((r) => (
                    <label key={r.id} className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value={r.id}
                        checked={role === r.id}
                        onChange={() => setRole(r.id)}
                      />
                      <span className="role-option-body">
                        <strong>{r.title}</strong>
                        <span>{r.text}</span>
                        <span className="role-meta">
                          {r.where} · {r.when} · {r.commitment}
                        </span>
                        <span className="role-needs">{r.needs}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>

                <fieldset
                  id="slot-group"
                  tabIndex={-1}
                  aria-describedby={errors.slots ? "slot-error" : "slot-hint"}
                  data-invalid={errors.slots ? "" : undefined}
                >
                  <legend>2. When could you usually help?</legend>
                  <p className="field-hint" id="slot-hint">
                    {slots.length
                      ? `${slots.length} ${slots.length === 1 ? "time" : "times"} ticked.`
                      : "Tick every slot that usually works."}
                  </p>
                  <table className="availability">
                    <thead>
                      <tr>
                        <td />
                        {availabilitySlots.map((s) => (
                          <th key={s} scope="col">
                            {s}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {availabilityDays.map((d) => (
                        <tr key={d}>
                          <th scope="row">{d}</th>
                          {availabilitySlots.map((s) => {
                            const key = `${d} ${s}`;
                            return (
                              <td key={s}>
                                <label className="slot">
                                  <input
                                    type="checkbox"
                                    name="slots"
                                    value={key}
                                    checked={slots.includes(key)}
                                    onChange={() => toggle(key)}
                                    aria-label={key}
                                  />
                                </label>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {errors.slots && (
                    <p className="field-error" id="slot-error">
                      {errors.slots}
                    </p>
                  )}
                </fieldset>

                <fieldset>
                  <legend>3. About you</legend>
                  <div className="field-row">
                    <Field
                      label="Full name"
                      name="vol-name"
                      autoComplete="name"
                      required
                      error={errors["vol-name"]}
                    />
                    <SelectField
                      label="Neighbourhood"
                      name="vol-area"
                      required
                      defaultValue=""
                      error={errors["vol-area"]}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {neighbourhoods.map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </SelectField>
                  </div>
                  <div className="field-row">
                    <Field
                      label="Email"
                      name="vol-email"
                      type="email"
                      autoComplete="email"
                      required
                      error={errors["vol-email"]}
                    />
                    <Field
                      label="Phone"
                      name="vol-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern="\+?[0-9][0-9 ]{6,}"
                      error={errors["vol-phone"]}
                    />
                  </div>
                  <TextField
                    label="Anything we should know? (optional)"
                    name="vol-note"
                    hint="Languages you speak, access needs, a skill you'd like to use."
                  />
                </fieldset>

                <button type="submit" className="btn btn-flame" disabled={busy}>
                  {busy ? "Sending to Priya…" : "Send my sign-up"}
                </button>
                <p className="quiet">{copy.demoNote}</p>
              </form>
            )}
          </div>
          <aside className="donate-summary" aria-label="Your sign-up so far">
            <h2>Your sign-up</h2>
            <dl className="signup-lines">
              <dt>Role</dt>
              <dd>
                {roles.find((r) => r.id === role)?.title ?? "Not chosen yet"}
              </dd>
              <dt>Usual times</dt>
              <dd>{chosenTimes.join(", ") || "None ticked yet"}</dd>
            </dl>
            <p className="quiet">{copy.coordinator.note}</p>
            <p>
              <strong>{copy.coordinator.name}</strong>
              <br />
              <a href={"mailto:" + copy.coordinator.email}>
                {copy.coordinator.email}
              </a>
              <br />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
