import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Headphones } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  episodes,
  programmes,
  resources,
  skills,
  type Resource,
} from "../content";
import { pause, validate } from "../lib/forms";
import { minutes } from "../lib/format";
import { Field, useErrors } from "../components/Field";
import { Sheet } from "../components/Sheet";
import { Cover } from "../components/Cover";

const messages = {
  name: "Add your first name so the email doesn't start with “Hi there”.",
  email: "Enter an email like you@example.com; that's where the PDF goes.",
};

export function ResourcePage({ r }: { r: Resource }) {
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ name: string; email: string } | null>(
    null,
  );
  const programme = programmes.find((p) => p.slug === r.programme)!;
  const episode = episodes.find((e) => e.slug === r.episode)!;
  const skill = skills.find((s) => s.id === r.skill)!;
  const more = resources
    .filter((x) => x.slug !== r.slug && x.type === r.type)
    .slice(0, 2);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    await pause();
    setSending(false);
    setSent({
      name: String(data.get("name")),
      email: String(data.get("email")),
    });
  };

  return (
    <div className="page resource">
      <div className="wrap crumbs">
        <Link to="/resources" className="link-back">
          <ArrowLeft aria-hidden="true" /> Free resources
        </Link>
      </div>

      <div className="wrap res-layout">
        <div className="res-main">
          <header className="res-head">
            <h1>{r.title}</h1>
            <p className="lede">{r.summary}</p>
            <p className="res-kind">
              Free {r.type.toLowerCase()} · {skill.label}
            </p>
          </header>
          <Sheet r={r} full />
        </div>

        <aside className="res-aside">
          <section className="res-why" aria-labelledby="why-h">
            <h2 id="why-h">Why it works</h2>
            <p>{r.why}</p>
            <dl className="facts facts-tight">
              <div>
                <dt>Format</dt>
                <dd>{r.format}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{r.minutes} minutes to use</dd>
              </div>
            </dl>
          </section>

          <section className="get" aria-labelledby="get-h">
            <h2 id="get-h">Get the printable version</h2>
            {sent ? (
              <div className="done" role="status">
                <Check aria-hidden="true" />
                <p>
                  Sent, {sent.name}. Check {sent.email} in the next few minutes;
                  it comes from {brand.email}.
                </p>
                <button
                  type="button"
                  className="btn-text"
                  onClick={() => setSent(null)}
                >
                  Send to another address
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="stack-form"
              >
                <Field
                  label="First name"
                  name="name"
                  required
                  autoComplete="given-name"
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <label className="check">
                  <input type="checkbox" name="notes" defaultChecked />
                  <span>
                    Also send me Monday Notes, one coaching question a week
                  </span>
                </label>
                <button
                  type="submit"
                  className="btn btn-ink btn-block"
                  disabled={sending}
                  aria-busy={sending}
                >
                  {sending ? "Sending…" : "Email me the PDF"}
                </button>
                <p className="form-small">
                  Demo form: nothing is sent anywhere.
                </p>
              </form>
            )}
            <p className="sr-only" aria-live="polite">
              {sent ? `The ${r.title} is on its way to ${sent.email}.` : ""}
            </p>
          </section>
        </aside>
      </div>

      <section className="wrap res-next" aria-labelledby="next-h">
        <h2 id="next-h">Go further</h2>
        <div className="res-next-grid">
          <Link to={`/podcast/${episode.slug}`} className="next-ep">
            <Headphones aria-hidden="true" />
            <span className="num">
              Episode {episode.number} · {minutes(episode.duration)}
            </span>
            <span className="next-title">{episode.title}</span>
            <span>{episode.summary}</span>
          </Link>
          <Link to={`/programmes/${programme.slug}`} className="next-prog">
            <Cover p={programme} />
            <span className="next-title">{programme.name}</span>
            <span className="link-arrow" aria-hidden="true">
              See the programme <ArrowRight />
            </span>
          </Link>
          {more.map((m) => (
            <Link key={m.slug} to={`/resources/${m.slug}`} className="next-res">
              <Sheet r={m} />
              <span className="next-title">{m.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
