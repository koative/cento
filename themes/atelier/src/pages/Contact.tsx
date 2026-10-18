import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  briefOptions,
  contactPage,
  services,
  type ServiceId,
} from "../content";
import { estimate, money, pause, validate } from "../lib";
import { Field, useErrors } from "../components/Field";

type Brief = {
  name: string;
  email: string;
  company: string;
  website: string;
  needs: ServiceId[];
  stage: string;
  budget: string;
  timing: string;
  message: string;
  source: string;
};

const empty: Brief = {
  name: "",
  email: "",
  company: "",
  website: "",
  needs: [],
  stage: "",
  budget: "",
  timing: "",
  message: "",
  source: "",
};

const messages = {
  name: "Tell us your name so we know who to reply to.",
  email: "Enter an email like you@company.com; it's where the reply goes.",
  company: "Add your company or project name, even a working title.",
  website: "Use a full address starting with https://, or leave it blank.",
  stage: "Pick the stage that's closest; “Not sure yet” is a fine answer.",
  budget: "Choose a budget range, or “Help us decide”.",
  timing: "Choose roughly when this needs to be out in the world.",
  message: "Write at least 40 characters: what you're making and why now.",
};

function Choice({
  name,
  value,
  checked,
  label,
  type = "radio",
  onChange,
  describedBy,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  type?: "radio" | "checkbox";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  describedBy?: string;
}) {
  return (
    <label className="choice">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={type === "radio"}
        aria-describedby={describedBy}
      />
      <span>{label}</span>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="sheet-row">
      <dt>{label}</dt>
      <dd key={value} className={value ? "ink-in" : "blank"}>
        {value || "Not answered yet"}
      </dd>
    </div>
  );
}

export function Contact() {
  const [brief, setBrief] = useState<Brief>(empty);
  const [ref] = useState(
    () => `AT-2610-${Math.floor(100 + Math.random() * 900)}`,
  );
  const { errors, setErrors, onChange } = useErrors();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "sent") success.current?.focus();
  }, [status]);

  const set = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBrief((b) => ({ ...b, [name]: value }));
  };
  const toggleNeed = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value as ServiceId;
    setBrief((b) => ({
      ...b,
      needs: e.target.checked
        ? [...b.needs, id]
        : b.needs.filter((n) => n !== id),
    }));
    if (e.target.checked && errors.needs)
      setErrors(({ needs: _, ...rest }) => rest);
  };

  const est = estimate(brief.needs);
  const budget = briefOptions.budget.find((b) => b.id === brief.budget);
  const tight = est && budget?.max != null && budget.max < est.floor;
  const needsLabel = brief.needs
    .map((n) => services.find((s) => s.id === n)!.short)
    .join(", ");
  const answered = [
    brief.name && brief.email,
    brief.company,
    brief.needs.length,
    brief.stage,
    brief.budget && brief.timing,
    brief.message.length >= 40,
  ].filter(Boolean).length;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(
      e.currentTarget,
      messages,
      brief.needs.length
        ? {}
        : { needs: "Pick at least one thing you need help with." },
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await pause(1100);
    setStatus("sent");
  };

  const restart = () => {
    setBrief(empty);
    setErrors({});
    setStatus("idle");
  };

  return (
    <>
      <section className="page-head wrap contact-head">
        <div>
          <h1>{contactPage.title}</h1>
          <p className="lede">{contactPage.intro}</p>
        </div>
        <dl className="contact-lines">
          <div>
            <dt>New projects</dt>
            <dd>
              <a href={`mailto:${brand.briefEmail}`}>{brand.briefEmail}</a>
            </dd>
          </div>
          <div>
            <dt>Studio</dt>
            <dd>
              <a href={brand.phoneHref}>{brand.phone}</a>
              <br />
              {brand.address.join(", ")}
            </dd>
          </div>
          <div>
            <dt>Not a project?</dt>
            <dd>
              Press and talks:{" "}
              <a href={`mailto:${brand.pressEmail}`}>{brand.pressEmail}</a>
              <br />
              Jobs: <Link to="/careers">see open roles</Link>
            </dd>
          </div>
        </dl>
      </section>

      <div className="wrap brief-grid">
        <div className="brief-main">
          <div aria-live="polite">
            {status === "sent" && (
              <div className="success success-big" ref={success} tabIndex={-1}>
                <Check aria-hidden="true" className="success-icon" />
                <h2>
                  Brief <span className="tabular nowrap">{ref}</span> is on the
                  wall.
                </h2>
                <p>
                  Thanks, {brief.name.split(" ")[0]}. Ana Ruiz reads every brief
                  and will reply to {brief.email} within two working days,
                  usually with three questions and a time for a first call.
                </p>
                <p className="fine">
                  This is a demo: nothing was sent or stored.
                </p>
                <div className="actions">
                  <Link to="/work" className="btn btn-ink">
                    Look at the work meanwhile
                  </Link>
                  <button
                    type="button"
                    className="btn btn-line"
                    onClick={restart}
                  >
                    Start another brief
                  </button>
                </div>
              </div>
            )}
          </div>

          {status !== "sent" && (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="form brief-form"
            >
              <fieldset>
                <legend>
                  <span className="step tabular">1</span> About you
                </legend>
                <div className="field-pair">
                  <Field
                    label="Your name"
                    name="name"
                    required
                    autoComplete="name"
                    value={brief.name}
                    onChange={set}
                    error={errors.name}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={brief.email}
                    onChange={set}
                    error={errors.email}
                  />
                </div>
                <div className="field-pair">
                  <Field
                    label="Company or project"
                    name="company"
                    required
                    autoComplete="organization"
                    value={brief.company}
                    onChange={set}
                    error={errors.company}
                  />
                  <Field
                    label="Website"
                    name="website"
                    type="url"
                    optional
                    placeholder="https://"
                    autoComplete="url"
                    value={brief.website}
                    onChange={set}
                    error={errors.website}
                  />
                </div>
              </fieldset>

              <fieldset
                aria-describedby={errors.needs ? "needs-err" : undefined}
                data-invalid={errors.needs ? "" : undefined}
              >
                <legend>
                  <span className="step tabular">2</span> What do you need?
                </legend>
                <p className="field-hint">
                  Pick everything that applies. Most projects need two or three.
                </p>
                <div className="choices choices-wide">
                  {services.map((s) => (
                    <label key={s.id} className="choice choice-service">
                      <input
                        id={`need-${s.id}`}
                        type="checkbox"
                        name="needs"
                        value={s.id}
                        checked={brief.needs.includes(s.id)}
                        onChange={toggleNeed}
                      />
                      <span>
                        <strong>{s.name}</strong>
                        <small className="tabular">
                          {s.weeks[0]}–{s.weeks[1]} weeks · from {money(s.from)}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.needs && (
                  <p className="field-error" id="needs-err">
                    {errors.needs}
                  </p>
                )}
              </fieldset>

              <fieldset data-invalid={errors.stage ? "" : undefined}>
                <legend>
                  <span className="step tabular">3</span> Where are you starting
                  from?
                </legend>
                <div className="choices">
                  {briefOptions.stage.map((s) => (
                    <Choice
                      key={s}
                      name="stage"
                      value={s}
                      label={s}
                      checked={brief.stage === s}
                      onChange={set}
                      describedBy={errors.stage ? "stage-err" : undefined}
                    />
                  ))}
                </div>
                {errors.stage && (
                  <p className="field-error" id="stage-err">
                    {errors.stage}
                  </p>
                )}
              </fieldset>

              <fieldset
                data-invalid={errors.budget || errors.timing ? "" : undefined}
              >
                <legend>
                  <span className="step tabular">4</span> Budget and timing
                </legend>
                <p className="group-label" id="budget-label">
                  Budget
                </p>
                <div
                  className="choices"
                  role="radiogroup"
                  aria-labelledby="budget-label"
                >
                  {briefOptions.budget.map((b) => (
                    <Choice
                      key={b.id}
                      name="budget"
                      value={b.id}
                      label={b.label}
                      checked={brief.budget === b.id}
                      onChange={set}
                      describedBy={errors.budget ? "budget-err" : undefined}
                    />
                  ))}
                </div>
                {errors.budget && (
                  <p className="field-error" id="budget-err">
                    {errors.budget}
                  </p>
                )}
                <p className="group-label" id="timing-label">
                  Launch
                </p>
                <div
                  className="choices"
                  role="radiogroup"
                  aria-labelledby="timing-label"
                >
                  {briefOptions.timing.map((t) => (
                    <Choice
                      key={t}
                      name="timing"
                      value={t}
                      label={t}
                      checked={brief.timing === t}
                      onChange={set}
                      describedBy={errors.timing ? "timing-err" : undefined}
                    />
                  ))}
                </div>
                {errors.timing && (
                  <p className="field-error" id="timing-err">
                    {errors.timing}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend>
                  <span className="step tabular">5</span> Tell us about it
                </legend>
                <Field
                  label="What are you making, and why now?"
                  name="message"
                  hint="A paragraph is plenty. What's changing, who it's for, what success looks like."
                  error={errors.message}
                >
                  <textarea
                    required
                    minLength={40}
                    rows={6}
                    value={brief.message}
                    onChange={set}
                  />
                </Field>
                <p className="counter tabular" aria-hidden="true">
                  {brief.message.trim().length < 40
                    ? `${40 - brief.message.trim().length} more characters to go`
                    : "That's enough to start a conversation."}
                </p>
              </fieldset>

              <fieldset>
                <legend>
                  <span className="step tabular">6</span> One last thing
                </legend>
                <Field
                  label="How did you hear about us?"
                  name="source"
                  optional
                >
                  <select value={brief.source} onChange={set}>
                    <option value="">Choose one</option>
                    {briefOptions.source.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </fieldset>

              <p className="brief-mini" aria-hidden="true">
                <strong className="tabular">{answered} of 6 answered.</strong>{" "}
                {est
                  ? `${needsLabel}: ${est.weeks[0]}–${est.weeks[1]} weeks, usually from ${money(est.floor)}.`
                  : "Pick what you need to see a timeline."}
              </p>

              <div className="submit-row">
                <button
                  type="submit"
                  className="btn btn-ink btn-big"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? "Pinning your brief…"
                    : "Send the brief"}
                  {status !== "sending" && <ArrowRight aria-hidden="true" />}
                </button>
                <p className="fine">Demo form: nothing is sent or stored.</p>
              </div>
            </form>
          )}
        </div>

        <aside className="sheet" aria-label="Your brief so far">
          <div className="sheet-paper">
            <div className="sheet-top">
              <span className="sheet-title">Project brief</span>
              <span className="tabular">{ref}</span>
            </div>
            <p className="sheet-company">{brief.company || "Your company"}</p>
            <div className="sheet-progress" aria-hidden="true">
              <span style={{ width: `${(answered / 6) * 100}%` }} />
            </div>
            <p className="sheet-count tabular">{answered} of 6 answered</p>
            <dl>
              <Row
                label="Contact"
                value={[brief.name, brief.email].filter(Boolean).join(" · ")}
              />
              <Row label="We need" value={needsLabel} />
              <Row label="Starting from" value={brief.stage} />
              <Row label="Budget" value={budget?.label ?? ""} />
              <Row label="Launch" value={brief.timing} />
              <Row
                label="In their words"
                value={
                  brief.message.length > 140
                    ? brief.message.slice(0, 140).trimEnd() + "…"
                    : brief.message
                }
              />
            </dl>
            <div className="sheet-read">
              <h2>Our first read</h2>
              {est ? (
                <dl>
                  <div className="sheet-row">
                    <dt>Likely team</dt>
                    <dd>{est.roles.join(", ")}</dd>
                  </div>
                  <div className="sheet-row">
                    <dt>Typical length</dt>
                    <dd className="tabular">
                      {est.weeks[0]}–{est.weeks[1]} weeks
                    </dd>
                  </div>
                  <div className="sheet-row">
                    <dt>Usually from</dt>
                    <dd className="tabular">{money(est.floor)}</dd>
                  </div>
                  <div className="sheet-row">
                    <dt>Closest work</dt>
                    <dd>
                      <Link to={`/work/${est.closest.slug}`}>
                        {est.closest.client}
                      </Link>
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="blank">
                  Pick what you need in step 2 and we'll sketch a team, a
                  timeline and a starting fee.
                </p>
              )}
              {tight && (
                <p className="sheet-note">
                  {budget!.label} is below where {needsLabel.toLowerCase()}{" "}
                  usually starts. We'll likely suggest a paid two-week Sprint
                  first, or a phased plan.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
