import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import {
  addOns,
  categories,
  cities,
  faqs,
  plans,
  postPage,
  workplaces,
  jobTypes,
} from "../content";
import { k, money, validate, type Errors } from "../lib/format";
import { Field, useErrors } from "../components/Field";
import { Listing } from "../components/JobRow";

type Draft = {
  company: string;
  title: string;
  city: string;
  workplace: string;
  type: string;
  min: string;
  max: string;
  reply: string;
};

const messages: Errors = {
  company: "Enter the employer name candidates will see.",
  email:
    "Enter an email like you@company.example for invoices and applicant alerts.",
  title:
    "Give the role a plain title, e.g. “Night Baker” — at least 4 characters.",
  category: "Choose the trade this role belongs to.",
  city: "Choose where the job is based, or Remote (US).",
  min: "Enter the bottom of the yearly range in dollars, e.g. 56000.",
  max: "Enter the top of the yearly range in dollars, e.g. 68000.",
  plan: "Choose how you’d like to pay.",
  description:
    "Write at least 120 characters: what the job is, who it suits, and what a normal week looks like.",
};

export function Post() {
  const [yearly, setYearly] = useState(false);
  const [draft, setDraft] = useState<Draft>({
    company: "",
    title: "",
    city: "",
    workplace: "On-site",
    type: "Full-time",
    min: "",
    max: "",
    reply: "7",
  });
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    email: string;
    plan: string;
  } | null>(null);

  const min = Number(draft.min);
  const max = Number(draft.max);
  const hasRange = min > 0 && max > 0;
  const rules = [
    { ok: hasRange, text: "A salary range is filled in" },
    {
      ok: hasRange && max >= min && max <= min * 1.3,
      text: "The top is no more than 30% above the bottom",
    },
    {
      ok: Number(draft.reply) <= 10,
      text: "You promise a reply within 10 working days",
    },
  ];

  const update = (e: FormEvent<HTMLFormElement>) => {
    onChange(e);
    const t = e.target as HTMLInputElement;
    if (t.name in draft) setDraft((d) => ({ ...d, [t.name]: t.value }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Errors = {};
    if (hasRange && max < min)
      extra.max =
        "The top of the range is below the bottom. Swap them or raise the top.";
    else if (hasRange && max > min * 1.3)
      extra.max = `Narrow the range: with a bottom of ${k(min)}, the top can be at most ${k(min * 1.3)}.`;
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone({
        ref: `JB-${Math.floor(10000 + Math.random() * 90000)}`,
        email: String(data.get("email")),
        plan: plans.find((p) => p.id === data.get("plan"))?.name ?? "",
      });
    }, 1100);
  };

  return (
    <div className="page post-page">
      <div className="wrap page-head">
        <h1>{postPage.title}</h1>
        <p className="lede">{postPage.intro}</p>
      </div>

      <section className="wrap section-tight" aria-labelledby="plans-h">
        <div className="section-head">
          <h2 id="plans-h" className="section-title">
            Plans
          </h2>
          <div className="billing" role="group" aria-label="Billing period">
            <button
              type="button"
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
            >
              Yearly, two months free
            </button>
          </div>
        </div>
        <div className="plans">
          {plans.map((p) => (
            <article
              key={p.id}
              className="plan"
              data-featured={p.id === "team" ? "" : undefined}
            >
              <h3>{p.name}</h3>
              <p className="plan-price">
                {p.monthly === null ? (
                  <>
                    <span className="num">{money(p.single ?? 0)}</span>
                    <span>per listing</span>
                  </>
                ) : (
                  <>
                    <span className="num">
                      {money(
                        yearly ? Math.round((p.monthly * 10) / 12) : p.monthly,
                      )}
                    </span>
                    <span>
                      {yearly
                        ? `a month, billed ${money(p.monthly * 10)} yearly`
                        : "a month, cancel any time"}
                    </span>
                  </>
                )}
              </p>
              <p>{p.blurb}</p>
              <ul className="ticks">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="fine" aria-live="polite">
          {yearly
            ? postPage.yearlyNote
            : "Prices in USD, before sales tax. Single listings never renew automatically."}
        </p>
      </section>

      <section className="wrap section-tight" aria-labelledby="addons-h">
        <h2 id="addons-h" className="section-title">
          Add-ons
        </h2>
        <table className="filled-table addons">
          <tbody>
            {addOns.map((a) => (
              <tr key={a.name}>
                <th scope="row">{a.name}</th>
                <td>{a.note}</td>
                <td className="num">{money(a.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="draft-band" aria-labelledby="draft-h">
        <div className="wrap draft">
          <div className="draft-form">
            <h2 id="draft-h" className="section-title">
              Write your listing
            </h2>
            <p>
              Draft it here and watch it set in the column. Our desk edits it
              for plain English before it goes live.
            </p>
            <p className="sr-only" aria-live="polite">
              {done ? `Listing ${done.ref} sent for review.` : ""}
            </p>
            {done ? (
              <div className="success" tabIndex={-1} ref={(el) => el?.focus()}>
                <h3>Sent to the listings desk.</h3>
                <p>
                  Reference <strong className="num">{done.ref}</strong> on the{" "}
                  {done.plan} plan. An editor will reply to {done.email} within
                  one working day with any changes, then publish it.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setDone(null)}
                >
                  Draft another listing
                </button>
              </div>
            ) : (
              <form
                className="form"
                noValidate
                onSubmit={submit}
                onChange={update}
                aria-busy={sending}
              >
                <div className="form-grid">
                  <Field
                    label="Employer name"
                    name="company"
                    required
                    error={errors.company}
                  />
                  <Field
                    label="Your email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    error={errors.email}
                  />
                  <Field
                    label="Job title"
                    name="title"
                    required
                    minLength={4}
                    error={errors.title}
                  />
                  <Field label="Trade" name="category" error={errors.category}>
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose a trade
                      </option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Location" name="city" error={errors.city}>
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose a location
                      </option>
                      {cities.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Workplace" name="workplace">
                    <select defaultValue="On-site">
                      {workplaces.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Hours" name="type">
                    <select defaultValue="Full-time">
                      {jobTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Reply promise"
                    name="reply"
                    hint="Working days to answer every applicant."
                  >
                    <select defaultValue="7">
                      {[3, 5, 7, 10].map((d) => (
                        <option key={d} value={d}>
                          {d} working days
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Salary from ($ a year)"
                    name="min"
                    type="number"
                    inputMode="numeric"
                    required
                    min={15000}
                    step={500}
                    error={errors.min}
                  />
                  <Field
                    label="Salary to ($ a year)"
                    name="max"
                    type="number"
                    inputMode="numeric"
                    required
                    min={15000}
                    step={500}
                    error={errors.max}
                  />
                  <Field label="Plan" name="plan" error={errors.plan}>
                    <select required defaultValue="single">
                      {plans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field
                  label="Description"
                  name="description"
                  error={errors.description}
                >
                  <textarea
                    rows={6}
                    required
                    minLength={120}
                    placeholder="What the job is, who it suits, what a normal week looks like."
                  />
                </Field>
                <div className="form-foot">
                  <button
                    className="btn btn-pen"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send for review"}
                  </button>
                  <p className="fine">
                    Demo only: nothing is sent and nothing is charged.
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className="draft-preview" aria-label="Live preview">
            <h3 className="preview-label">As it will appear</h3>
            <div className="column preview-column">
              <Listing
                title={draft.title || "Your job title"}
                mark={<span className="preview-mark" aria-hidden="true" />}
                meta={[
                  draft.company || "Employer name",
                  draft.city || "Location",
                  draft.workplace,
                  draft.type,
                ]}
                salary={hasRange ? `${k(min)}–${k(max)}` : "$—"}
                aside={
                  <span className="listing-posted">
                    Replies within {draft.reply} days
                  </span>
                }
                circled={rules.every((r) => r.ok)}
              />
            </div>
            <ul className="house-check" aria-label="House rules check">
              {rules.map((r) => (
                <li key={r.text} data-ok={r.ok ? "" : undefined}>
                  {r.ok ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <X aria-hidden="true" />
                  )}
                  <span>{r.text}</span>
                  <span className="sr-only">
                    {r.ok ? "— met" : "— not met yet"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="fine">
              Meet all three and the listing gets circled — the mark job seekers
              use for one worth a second look.
            </p>
          </aside>
        </div>
      </section>

      <section className="wrap section faq" aria-labelledby="faq-h">
        <h2 id="faq-h" className="section-title">
          Questions employers ask
        </h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
