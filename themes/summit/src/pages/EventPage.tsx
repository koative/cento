import { useState, type FormEvent } from "react";
import { events, type EventItem } from "../content";
import { Link } from "../router";
import { longDate, money, shortDate } from "../lib/format";
import { pause, useErrors, validate } from "../lib/forms";
import { Field } from "../components/Field";

export function EventPage({ item }: { item: EventItem }) {
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ name: string; email: string } | null>(
    null,
  );
  const left = item.capacity - item.taken;
  const more = events
    .filter((e) => e.id !== item.id)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add your name so we can find you on the list at the desk.",
      email: "Enter an email like you@example.com for your confirmation.",
      category: "Choose the category you'll compete in.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    await pause();
    setSending(false);
    setDone({
      name: String(data.get("name")),
      email: String(data.get("email")),
    });
  };

  return (
    <>
      <section className="event-hero">
        <img src={item.image} alt={item.alt} width={1024} height={768} />
        <div className="wrap event-hero-copy">
          <p className="crumbs">
            <Link to="/events">Events</Link> / {item.kind}
          </p>
          <h1>{item.title}</h1>
          <p className="lead">{item.summary}</p>
        </div>
      </section>

      <section className="wrap detail-body">
        <div className="prose">
          <dl className="spec-grid">
            <div>
              <dt>Date</dt>
              <dd>{longDate(item.date)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd className="num">
                {item.start}–{item.end}
              </dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd className="num">{money(item.price)}</dd>
            </div>
            <div>
              <dt>Places</dt>
              <dd>
                {left} of {item.capacity} left
              </dd>
            </div>
          </dl>
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>On the night</h2>
          <table className="price-table">
            <caption className="sr-only">Schedule</caption>
            <tbody>
              {item.schedule.map((s) => (
                <tr key={s.time}>
                  <th scope="row" className="num">
                    {s.time}
                  </th>
                  <td>{s.item}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Bring</h2>
          <ul className="ticks-list">
            {item.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <aside className="detail-side">
          <div className="rsvp" aria-live="polite">
            {done ? (
              <div className="success">
                <h2 className="h-sm">You're on the list</h2>
                <p>
                  Thanks, {done.name}. We've saved you a place at {item.title}{" "}
                  on {shortDate(item.date)}. Confirmation goes to {done.email}
                  {item.price
                    ? `; pay ${money(item.price)} at the desk on the night.`
                    : "."}
                </p>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={() => setDone(null)}
                >
                  Add someone else
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="form-stack"
              >
                <h2 className="h-sm">Save me a place</h2>
                <Field
                  label="Full name"
                  name="name"
                  required
                  autoComplete="name"
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
                {item.categories && (
                  <Field
                    label="Category"
                    name="category"
                    error={errors.category}
                  >
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose a category
                      </option>
                      {item.categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                )}
                <button
                  type="submit"
                  className="btn btn-tape"
                  disabled={sending}
                >
                  {sending
                    ? "Saving your place…"
                    : item.price
                      ? `Reserve · pay ${money(item.price)} on the night`
                      : "Reserve a free place"}
                </button>
                <p className="fine">Demo form: nothing is sent or charged.</p>
              </form>
            )}
          </div>
        </aside>
      </section>

      <section className="wrap related" aria-labelledby="more-title">
        <h2 id="more-title" className="h-sm">
          More events
        </h2>
        <ul className="related-list">
          {more.map((e) => (
            <li key={e.id}>
              <Link to={`/events/${e.id}`} className="related-item">
                <img
                  src={e.image}
                  alt=""
                  width={320}
                  height={240}
                  loading="lazy"
                />
                <span>
                  <strong>{e.title}</strong>
                  {shortDate(e.date)} · {money(e.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
