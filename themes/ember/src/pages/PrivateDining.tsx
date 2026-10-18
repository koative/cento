import { useRef, useState, type FormEvent } from "react";
import { brand, photos, privateDining as pd } from "../content";
import { Field, useErrors } from "../components/Field";
import { Photo } from "../components/Photo";
import { pause, reference, validate } from "../lib/forms";
import { isoDate, longDate, money } from "../lib/time";

const minDate = isoDate(new Date(Date.now() + 7 * 864e5));

export function PrivateDining() {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    name: string;
    date: string;
    guests: number;
    space: string;
  } | null>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const guests = Number(data.get("guests"));
    const space = pd.spaces.find((s) => s.id === data.get("space"))!;
    const most = space.standing ?? space.seated;
    const extra: Record<string, string> = {};
    if (guests > most)
      extra.guests = `${space.name} holds up to ${most}${space.standing ? " standing" : ""}. Choose a bigger space or fewer guests.`;
    const found = validate(
      form,
      {
        name: "Tell us who's organising.",
        email: "Enter an email like you@example.com so we can send a proposal.",
        date: "Choose a date at least a week from today.",
        guests: "Enter a number of guests between 9 and 70.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    setDone({
      ref: reference("PD"),
      name: String(data.get("name")).trim(),
      date: String(data.get("date")),
      guests,
      space: space.name,
    });
    requestAnimationFrame(() => doneHeading.current?.focus());
  };

  return (
    <div className="pd-page">
      <header className="page-head wrap page-head-split">
        <div>
          <h1>{pd.title}</h1>
          <p className="lede">{pd.intro}</p>
        </div>
        <Photo photo={photos.dining} className="arch head-img" eager />
      </header>

      <section className="wrap" aria-labelledby="spaces-title">
        <h2 id="spaces-title" className="section-title">
          Three rooms, one kitchen
        </h2>
        <div className="table-wrap">
          <table className="spaces">
            <thead>
              <tr>
                <th scope="col">Space</th>
                <th scope="col">Seated</th>
                <th scope="col">Standing</th>
                <th scope="col">Minimum spend</th>
              </tr>
            </thead>
            <tbody>
              {pd.spaces.map((s) => (
                <tr key={s.id}>
                  <th scope="row">
                    <strong>{s.name}</strong>
                    <span>{s.desc}</span>
                  </th>
                  <td className="num">{s.seated}</td>
                  <td className="num">{s.standing ?? "—"}</td>
                  <td className="num">{money(s.minSpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap set-menus" aria-labelledby="menus-title">
        <h2 id="menus-title" className="section-title">
          Set feasts
        </h2>
        <div className="set-grid">
          {pd.menus.map((m) => (
            <div key={m.id} className="set-menu">
              <h3>{m.name}</h3>
              <p className="set-for">{m.for}</p>
              <ol>
                {m.courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
              <p className="set-price">
                <span className="num">{money(m.price)}</span> a head
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap enquiry" aria-labelledby="enquire-title">
        <div className="enquiry-side">
          <h2 id="enquire-title">Tell us about the night</h2>
          <p>
            Dev replies to every enquiry within a working day with a proposal
            and a menu. Prefer to talk? Call{" "}
            <a href={brand.phoneHref}>{brand.phone}</a> or write to{" "}
            <a href={`mailto:${brand.eventsEmail}`}>{brand.eventsEmail}</a>.
          </p>
          <ul className="plain-list">
            {pd.policies.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="sr-only" aria-live="polite">
            {busy
              ? "Sending your enquiry…"
              : done
                ? `Enquiry received. Reference ${done.ref}.`
                : ""}
          </p>
          {done ? (
            <div className="confirm">
              <h2 ref={doneHeading} tabIndex={-1}>
                Thank you, {done.name.split(" ")[0]}. Dev will be in touch.
              </h2>
              <p>
                We've pencilled in {done.space} for {done.guests} on{" "}
                {longDate(done.date)} and will hold it for 48 hours while Dev
                puts a proposal together. Reference{" "}
                <span className="num">{done.ref}</span>.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setDone(null)}
              >
                Send another enquiry
              </button>
              <p className="fine">Demo confirmation: nothing was sent.</p>
            </div>
          ) : (
            <form
              className="enquiry-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <div className="row-2">
                <Field
                  label="Your name"
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
                  placeholder="you@example.com"
                  error={errors.email}
                />
                <Field
                  label="Date"
                  name="date"
                  type="date"
                  required
                  min={minDate}
                  error={errors.date}
                  hint="At least a week ahead."
                />
                <Field
                  label="Guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  required
                  min={9}
                  max={70}
                  defaultValue={12}
                  error={errors.guests}
                />
                <Field label="Space" name="space">
                  <select defaultValue={pd.spaces[0].id}>
                    {pd.spaces.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} · up to {s.standing ?? s.seated}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Menu" name="menu">
                  <select defaultValue={pd.menus[0].id}>
                    {pd.menus.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} · {money(m.price)} a head
                      </option>
                    ))}
                    <option value="undecided">Help me choose</option>
                  </select>
                </Field>
              </div>
              <Field
                label="What's the occasion?"
                name="notes"
                hint="Birthdays, dietary needs, a speech, a cake. Optional."
              >
                <textarea rows={4} maxLength={600} />
              </Field>
              <div className="submit-row">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={busy}
                  aria-busy={busy}
                >
                  {busy ? "Sending…" : "Send enquiry"}
                </button>
                <p className="fine">Demo form — nothing is sent.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
