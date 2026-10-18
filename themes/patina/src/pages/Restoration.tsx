import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { restoration } from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { money } from "../lib/cart";

const { estimator } = restoration;

export function Restoration() {
  const [kind, setKind] = useState(estimator.pieces[1].id);
  const [jobs, setJobs] = useState<string[]>(["upholstery"]);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const factor = estimator.pieces.find((p) => p.id === kind)!.factor;
  const base = estimator.jobs
    .filter((j) => jobs.includes(j.id))
    .reduce((s, j) => s + j.base * factor, 0);
  // A quoted range rather than a price: the low end assumes a sound piece, the high end the usual surprises.
  const low = Math.round(base / 10) * 10;
  const high = Math.round((base * 1.45) / 10) * 10;

  function toggle(id: string) {
    setJobs(jobs.includes(id) ? jobs.filter((j) => j !== id) : [...jobs, id]);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "r-name": { missing: "Tell us your name so we know who to quote." },
      "r-email": {
        missing: "Add an email for the written quote.",
        invalid:
          "That email is missing something — check the @ and the domain.",
      },
      "r-piece": {
        missing:
          "Describe the piece: what it is, roughly how old, what is wrong with it.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  }

  return (
    <div className="page restoration">
      <header className="page-head page-head-split">
        <div>
          <h1>{restoration.title}</h1>
          <p className="lead">{restoration.intro}</p>
        </div>
        <figure>
          <img
            src={restoration.image.src}
            alt={restoration.image.alt}
            width={restoration.image.w}
            height={restoration.image.h}
          />
        </figure>
      </header>

      <section className="section" aria-labelledby="services-h">
        <h2 id="services-h">What the workshop does</h2>
        <div className="table-wrap">
          <table className="price-table">
            <thead>
              <tr>
                <th scope="col">Work</th>
                <th scope="col">What it involves</th>
                <th scope="col">From</th>
                <th scope="col">Weeks</th>
              </tr>
            </thead>
            <tbody>
              {restoration.services.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.text}</td>
                  <td className="num">{money(s.from)}</td>
                  <td className="num">{s.weeks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="quiet">
          Prices are for a dining chair or equivalent; larger pieces are quoted
          after we have seen them.
        </p>
      </section>

      <section className="section archive" aria-labelledby="process-h">
        <figure>
          <img
            src={restoration.archive.src}
            alt={restoration.archive.alt}
            width={restoration.archive.w}
            height={restoration.archive.h}
            loading="lazy"
          />
          <figcaption>{restoration.archiveCaption}</figcaption>
        </figure>
        <div>
          <h2 id="process-h">How a job runs</h2>
          <ol className="steps">
            {restoration.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section estimate" aria-labelledby="estimate-h">
        <div className="estimate-calc">
          <h2 id="estimate-h">Rough estimate</h2>
          <p>
            Choose the piece and the work. This is the range we would expect to
            quote before seeing it.
          </p>
          <div className="field">
            <label htmlFor="est-kind">The piece</label>
            <select
              id="est-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              {estimator.pieces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="checks">
            <legend>The work</legend>
            {estimator.jobs.map((j) => (
              <label key={j.id} className="check">
                <input
                  type="checkbox"
                  checked={jobs.includes(j.id)}
                  onChange={() => toggle(j.id)}
                />
                <span>{j.label}</span>
              </label>
            ))}
          </fieldset>
          <p className="estimate-result" aria-live="polite">
            {jobs.length ? (
              <>
                <span>Likely quote</span>
                <strong>
                  {money(low)} – {money(high)}
                </strong>
              </>
            ) : (
              <span>Tick at least one kind of work to see a range.</span>
            )}
          </p>
        </div>

        <div className="estimate-form" aria-live="polite">
          {state === "sent" ? (
            <div className="success-panel">
              <Check size={28} aria-hidden="true" />
              <h2>Thank you — Ruth will look at it this week.</h2>
              <p>
                You will have a written quote by email within five working days.
                If photographs would help, we will ask for them.
              </p>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <h2>Ask for a written quote</h2>
              <Field
                label="Your name"
                name="r-name"
                autoComplete="name"
                required
                error={errors["r-name"]}
              />
              <Field
                label="Email"
                name="r-email"
                type="email"
                autoComplete="email"
                required
                error={errors["r-email"]}
              />
              <Field
                as="textarea"
                label="The piece"
                name="r-piece"
                rows={4}
                required
                hint="What it is, roughly how old, and what needs doing. “Not sure” is a fine answer."
                error={errors["r-piece"]}
              />
              <Field
                label="Photographs (optional)"
                name="r-photos"
                type="file"
                accept="image/*"
                multiple
              />
              <button
                type="submit"
                className="btn"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? "Sending…"
                  : `Request a quote${jobs.length ? ` (${money(low)}–${money(high)})` : ""}`}
              </button>
              <p className="quiet">Demo form — nothing is sent anywhere.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
