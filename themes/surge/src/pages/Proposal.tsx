import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, X } from "lucide-react";
import { Link } from "../router";
import { brand, engagements, proposalPage, services } from "../content";
import { Field, useErrors } from "../components/Field";
import { moneyShort, money, pause, validate } from "../lib/format";
import { fromQuery, project, summarize, type Inputs } from "../lib/roi";

const freeMail = /@(gmail|yahoo|hotmail|outlook|icloud|aol|proton(mail)?)\./i;

type Sent = {
  ref: string;
  name: string;
  email: string;
  company: string;
  services: string[];
};

export function Proposal() {
  const [query] = useState(
    () => new URLSearchParams(window.location.hash.split("?")[1] ?? ""),
  );
  const [model, setModel] = useState<Inputs | null>(() => fromQuery(query));
  const preset = query.get("service");
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sent) done.current?.focus();
  }, [sent]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const website = String(data.get("website") ?? "").trim();
    const picked = data.getAll("services").map(String);
    const extra: Record<string, string> = {};
    if (email && freeMail.test(email))
      extra.email =
        "Use your work email so we can check the company before the call — personal addresses get lost in triage.";
    if (website && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(website))
      extra.website =
        "Enter your site's address, like halfmoon.coffee or https://deskline.example.";
    if (!picked.length)
      extra.services =
        "Pick at least one service, even if you're not sure — it tells us who to bring to the call.";

    const found = validate(
      form,
      {
        name: "Tell us your name so we know who to reply to.",
        email: "Enter your work email, like ruth@halfmoon.coffee.",
        company: "Add your company name.",
        website: "Add your website so we can take a first look.",
        role: "Choose the role closest to yours.",
        budget: "Choose a monthly budget range — a rough one is fine.",
        goal: "Describe what's stuck in at least 40 characters: the number, and what you've tried.",
        timeline: "Choose when you'd like to start.",
        consent: "Tick the box so we're allowed to reply to you.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    await pause(1100);
    setBusy(false);
    setSent({
      ref: `SRG-${Math.floor(1000 + Math.random() * 9000)}`,
      name: String(data.get("name")).split(" ")[0],
      email,
      company: String(data.get("company")),
      services: picked.map(
        (s) => services.find((x) => x.slug === s)?.name ?? s,
      ),
    });
  };

  const s = model && summarize(project(model), model.margin);
  const plan = model && engagements.find((e) => e.id === model.tier);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>{proposalPage.h1}</h1>
          <p className="lede">{proposalPage.lede}</p>
        </div>
      </header>

      <section className="section-tight">
        <div className="wrap proposal-grid">
          <div>
            {model && s && plan && (
              <section className="attached" aria-labelledby="attached-title">
                <div className="attached-head">
                  <h2 id="attached-title">Your ROI model is attached</h2>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label="Remove the attached ROI model"
                    onClick={() => setModel(null)}
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
                <dl>
                  <div>
                    <dt>Monthly revenue</dt>
                    <dd>{money(model.revenue)}</dd>
                  </div>
                  <div>
                    <dt>Engagement</dt>
                    <dd>{plan.name}</dd>
                  </div>
                  <div>
                    <dt>Expected added revenue</dt>
                    <dd>{moneyShort(s.expected)} in 12 months</dd>
                  </div>
                  <div>
                    <dt>Payback</dt>
                    <dd>
                      {s.payback ? `Month ${s.payback}` : "Beyond 12 months"}
                    </dd>
                  </div>
                </dl>
                <Link to="/roi" className="text-link">
                  Change the model
                </Link>
              </section>
            )}
            <div aria-live="polite">
              {sent && (
                <div className="success">
                  <h2 ref={done} tabIndex={-1} className="h-lg">
                    Request received, {sent.name}.
                  </h2>
                  <p>
                    Reference <strong className="num">{sent.ref}</strong>. Sofia
                    will email {sent.email} within three working days to book a
                    30-minute call about {sent.company}
                    {sent.services.length
                      ? ` and ${sent.services.join(", ").toLowerCase()}`
                      : ""}
                    .
                  </p>
                  <ol className="steps">
                    {proposalPage.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="btn-row">
                    <Link to="/work" className="btn btn-ink">
                      Read case studies while you wait
                    </Link>
                    <button
                      type="button"
                      className="btn btn-line"
                      onClick={() => setSent(null)}
                    >
                      Send another request
                    </button>
                  </div>
                </div>
              )}
            </div>
            {!sent && (
              <form
                className="proposal-form"
                noValidate
                onSubmit={submit}
                onChange={onChange}
                aria-busy={busy}
              >
                <fieldset className="form-block" disabled={busy}>
                  <legend>About you</legend>
                  <div className="form-row">
                    <Field
                      label="Full name"
                      name="name"
                      required
                      autoComplete="name"
                      error={errors.name}
                    />
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      error={errors.email}
                    />
                  </div>
                  <div className="form-row">
                    <Field
                      label="Company"
                      name="company"
                      required
                      autoComplete="organization"
                      error={errors.company}
                    />
                    <Field
                      label="Website"
                      name="website"
                      required
                      inputMode="url"
                      autoComplete="url"
                      placeholder="company.com"
                      error={errors.website}
                    />
                  </div>
                  <Field label="Your role" name="role" error={errors.role}>
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      {proposalPage.roles.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </Field>
                </fieldset>

                <fieldset className="form-block" disabled={busy}>
                  <legend>The work</legend>
                  <fieldset
                    className="checks"
                    aria-describedby={
                      errors.services ? "f-services-err" : undefined
                    }
                    aria-invalid={errors.services ? true : undefined}
                  >
                    <legend>Services you're interested in</legend>
                    {services.map((sv) => (
                      <label key={sv.slug} className="check">
                        <input
                          type="checkbox"
                          name="services"
                          value={sv.slug}
                          defaultChecked={sv.slug === preset}
                        />
                        <span>{sv.name}</span>
                      </label>
                    ))}
                    {errors.services && (
                      <p className="field-error" id="f-services-err">
                        {errors.services}
                      </p>
                    )}
                  </fieldset>

                  <fieldset
                    className="checks"
                    aria-describedby={
                      errors.budget ? "f-budget-err" : undefined
                    }
                    aria-invalid={errors.budget ? true : undefined}
                  >
                    <legend>Monthly budget for agency fees</legend>
                    {proposalPage.budgets.map((b) => (
                      <label key={b} className="check">
                        <input type="radio" name="budget" value={b} required />
                        <span>{b}</span>
                      </label>
                    ))}
                    {errors.budget && (
                      <p className="field-error" id="f-budget-err">
                        {errors.budget}
                      </p>
                    )}
                  </fieldset>

                  <Field
                    label="What's stuck?"
                    name="goal"
                    hint="The number you want to move, where it is today, and what you've already tried."
                    error={errors.goal}
                  >
                    <textarea required minLength={40} rows={5} />
                  </Field>

                  <Field
                    label="When would you like to start?"
                    name="timeline"
                    error={errors.timeline}
                  >
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      {proposalPage.timelines.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </fieldset>

                <div
                  className="field"
                  data-invalid={errors.consent ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      disabled={busy}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "f-consent-err" : undefined
                      }
                    />
                    <span>
                      Surge may contact me about this request. No newsletter
                      unless I sign up for it.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="f-consent-err">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-lift btn-big"
                  disabled={busy}
                >
                  {busy ? (
                    <>
                      <Loader2 className="spin" aria-hidden="true" /> Sending
                      request…
                    </>
                  ) : (
                    "Send request"
                  )}
                </button>
                <p className="fine">
                  This is a demo: nothing is sent anywhere and no data leaves
                  your browser.
                </p>
              </form>
            )}
          </div>

          <aside className="proposal-aside">
            <h2 className="h-md">What happens next</h2>
            <ol className="steps">
              {proposalPage.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <h2 className="h-md">Rather talk now?</h2>
            <p>
              <a href={brand.phoneHref}>{brand.phone}</a>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <br />
              {brand.hours}
            </p>
            {!model && (
              <p>
                Not sure what it's worth yet?{" "}
                <Link to="/roi">Build an ROI model</Link> and attach it here.
              </p>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
