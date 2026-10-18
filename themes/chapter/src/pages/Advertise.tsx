import { useState, type FormEvent } from "react";
import studio from "../assets/studio.jpg";
import { advertise, brand, shows } from "../content";
import { count, emailOk, usd } from "../lib/format";
import {
  Field,
  focusFirstError,
  useErrors,
  type Errors,
} from "../components/Field";

const MIN_EPISODES = 4;
const MIN_SPEND = 3000;

export function Advertise() {
  const [picked, setPicked] = useState<string[]>([
    "the-long-walk",
    "table-for-two",
  ]);
  const [format, setFormat] = useState(advertise.formats[0].id);
  const [eps, setEps] = useState(6);
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [company, setCompany] = useState("");

  const cpm = advertise.formats.find((f) => f.id === format)!.cpm;
  const chosen = shows.filter((s) => picked.includes(s.slug));
  const impressions = chosen.reduce((n, s) => n + s.downloads, 0) * eps;
  const cost = (impressions / 1000) * cpm;
  const meetsMinimum =
    chosen.length > 0 && (cost >= MIN_SPEND || eps >= MIN_EPISODES);
  const plan = chosen.length
    ? `${advertise.formats.find((f) => f.id === format)!.name} on ${chosen.map((s) => s.title).join(", ")}, ${eps} episodes each — about ${count.format(impressions)} downloads, ${usd.format(cost)}`
    : "";

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = "Tell us who to reply to.";
    if (!v("company")) next.company = "Add the brand or company name.";
    if (!v("email"))
      next.email = "Enter a work email so we can send the media kit.";
    else if (!emailOk(v("email")))
      next.email =
        "Check the email address — it should look like name@company.com.";
    if (!v("budget"))
      next.budget = "Choose a budget range; a rough one is fine.";
    if (!v("start"))
      next.start = "Choose the month you would like the campaign to start.";
    if (v("brief").length < 30)
      next.brief =
        "Write at least a sentence or two (30 characters) about the product and who it is for.";
    setErrors(next);
    if (Object.keys(next).length) return focusFirstError(form, next);
    setCompany(v("company"));
    setState("sending");
    window.setTimeout(() => setState("done"), 1000);
  };

  return (
    <>
      <section className="wrap page-head ad-head">
        <div>
          <h1>{advertise.title}</h1>
          <p className="lede">{advertise.intro}</p>
        </div>
        <img
          src={studio}
          alt="Four microphones on boom arms around a round studio table"
          width={1600}
          height={1200}
        />
      </section>

      <section className="wrap" aria-labelledby="how-h">
        <h2 id="how-h">How advertising works here</h2>
        <dl className="principles">
          {advertise.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap" aria-labelledby="aud-h">
        <h2 id="aud-h">Shows and audiences</h2>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-labelledby="aud-h"
        >
          <table className="data">
            <thead>
              <tr>
                <th scope="col">Show</th>
                <th scope="col">Cadence</th>
                <th scope="col" className="num">
                  Downloads per episode
                </th>
                <th scope="col" className="num">
                  Listen-through
                </th>
                <th scope="col">Who listens</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((s) => (
                <tr key={s.slug}>
                  <th scope="row">{s.title}</th>
                  <td>{s.cadence}</td>
                  <td className="num">{count.format(s.downloads)}</td>
                  <td className="num">{Math.round(s.listenThrough * 100)}%</td>
                  <td>{s.audience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="quiet">
          Demonstration figures: first 30 days after release, averaged over the
          last season.
        </p>
      </section>

      <section className="wrap planner" aria-labelledby="plan-h">
        <div className="planner-head">
          <h2 id="plan-h">Plan a campaign</h2>
          <p>
            Pick shows, a format and a run length. The estimate updates as you
            go and is carried into the enquiry below.
          </p>
        </div>
        <div className="planner-grid">
          <fieldset className="checks">
            <legend>Shows</legend>
            {shows.map((s) => (
              <label key={s.slug} className="check">
                <input
                  type="checkbox"
                  checked={picked.includes(s.slug)}
                  onChange={() =>
                    setPicked((p) =>
                      p.includes(s.slug)
                        ? p.filter((x) => x !== s.slug)
                        : [...p, s.slug],
                    )
                  }
                />
                <span>
                  <strong>{s.title}</strong>
                  <span>{count.format(s.downloads)} per episode</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="planner-mid">
            <fieldset className="checks">
              <legend>Format</legend>
              {advertise.formats.map((f) => (
                <label key={f.id} className="check">
                  <input
                    type="radio"
                    name="format"
                    value={f.id}
                    checked={format === f.id}
                    onChange={() => setFormat(f.id)}
                  />
                  <span>
                    <strong>
                      {f.name} · {usd.format(f.cpm)} CPM
                    </strong>
                    <span>{f.detail}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="range-field">
              <label htmlFor="plan-eps">
                Episodes per show <output htmlFor="plan-eps">{eps}</output>
              </label>
              <input
                id="plan-eps"
                type="range"
                min={1}
                max={12}
                value={eps}
                onChange={(e) => setEps(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="estimate" aria-live="polite">
            <p className="estimate-label">Estimated downloads</p>
            <p className="estimate-num">{count.format(impressions)}</p>
            <p className="estimate-label">Estimated cost</p>
            <p className="estimate-num">{usd.format(cost)}</p>
            <p className="estimate-note">
              {!chosen.length
                ? "Choose at least one show to see an estimate."
                : meetsMinimum
                  ? "Meets our minimum booking."
                  : `Below our minimum: ${MIN_EPISODES} episodes on a show, or ${usd.format(MIN_SPEND)} across the network.`}
            </p>
          </div>
        </div>
        <p className="quiet">{advertise.sponsorship}</p>
      </section>

      <section className="wrap enquiry" aria-labelledby="enq-h">
        <div>
          <h2 id="enq-h">Start an enquiry</h2>
          <p>
            Elsa Brandt in partnerships replies to every enquiry within two
            working days, with the media kit and a host's honest opinion of fit.
            Prefer email? Write to{" "}
            <a href={`mailto:${brand.partnersEmail}`}>{brand.partnersEmail}</a>.
          </p>
        </div>
        {state === "done" ? (
          <div className="success" role="status">
            <h3>Thank you — enquiry received.</h3>
            <p>
              We will reply to {company} within two working days.
              {plan && ` Your plan: ${plan}.`}
            </p>
          </div>
        ) : (
          <form
            className="form form-2"
            noValidate
            onSubmit={submit}
            onChange={onChange}
          >
            <Field
              label="Your name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
            <Field
              label="Company or brand"
              name="company"
              autoComplete="organization"
              required
              error={errors.company}
            />
            <Field
              label="Work email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <Field label="Budget" name="budget" error={errors.budget}>
              <select required defaultValue="">
                <option value="" disabled>
                  Choose a range
                </option>
                <option>Under $5,000</option>
                <option>$5,000 – $15,000</option>
                <option>$15,000 – $40,000</option>
                <option>Over $40,000</option>
              </select>
            </Field>
            <Field
              label="Preferred start"
              name="start"
              type="month"
              required
              min={new Date().toISOString().slice(0, 7)}
              error={errors.start}
            />
            <Field
              label="Plan from the planner"
              name="plan"
              className="span-2"
              hint="Edit it in the planner above."
            >
              <textarea readOnly rows={2} value={plan || "No shows selected"} />
            </Field>
            <Field
              label="About the product"
              name="brief"
              className="span-2"
              error={errors.brief}
              hint="What it is, who it is for, and anything a host should try before reading for it."
            >
              <textarea rows={5} required minLength={30} />
            </Field>
            <div className="span-2 form-foot">
              <button
                type="submit"
                className="btn btn-ink"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Sending…" : "Send enquiry"}
              </button>
              <p className="quiet">
                This is a demo form: nothing is sent anywhere.
              </p>
            </div>
          </form>
        )}
        <p className="sr-only" aria-live="polite">
          {state === "sending" ? "Sending enquiry…" : ""}
        </p>
      </section>

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions advertisers ask</h2>
        {advertise.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
