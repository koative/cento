import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { eventKinds, events, imagery, pages, type EventKind } from "../content";
import { dateParts, monthLabel, shortDate } from "../lib/format";
import {
  Field,
  FormAlert,
  Select,
  validate,
  type Errors,
} from "../components/Field";

const rsvpEvents = events.filter((e) => e.rsvp);

const messages = {
  event: { missing: "Choose which event you are saving places for." },
  name: { missing: "Enter a name so we can find you on the list." },
  email: {
    missing: "Enter your email so we can confirm your places.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  people: {
    missing: "Enter how many people are coming.",
    invalid: "We can save between 1 and 6 places per family.",
  },
};

export function Events() {
  const [kind, setKind] = useState<EventKind | "">("");
  const [chosen, setChosen] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    title: string;
    people: string;
    email: string;
  } | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const shown = events.filter((e) => !kind || e.kind === kind);
  const months = [...new Set(shown.map((e) => monthLabel(e.date)))];

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function save(id: string) {
    setChosen(id);
    setDone(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement).value;
    const ev = rsvpEvents.find((x) => x.id === get("event"))!;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setDone({ title: ev.title, people: get("people"), email: get("email") });
    }, 800);
  }

  return (
    <div className="page events-page">
      <header className="page-head events-head">
        <div>
          <h1>{pages.events.title}</h1>
          <p className="lead">{pages.events.lead}</p>
        </div>
        <img
          src={imagery.windowTrain.src}
          alt={imagery.windowTrain.alt}
          width={imagery.windowTrain.w}
          height={imagery.windowTrain.h}
        />
      </header>

      <fieldset className="chips event-filter">
        <legend className="visually-hidden">Show events of type</legend>
        <label className="chip">
          <input
            type="radio"
            name="kind"
            checked={kind === ""}
            onChange={() => setKind("")}
          />
          <span>Everything</span>
        </label>
        {eventKinds.map((k) => (
          <label key={k} className="chip">
            <input
              type="radio"
              name="kind"
              checked={kind === k}
              onChange={() => setKind(k)}
            />
            <span>{k}</span>
          </label>
        ))}
      </fieldset>

      {months.map((m) => (
        <section
          key={m}
          className="event-month"
          aria-labelledby={"h-" + m.replace(/\s/g, "")}
        >
          <h2 id={"h-" + m.replace(/\s/g, "")}>{m}</h2>
          <ul className="event-list">
            {shown
              .filter((e) => monthLabel(e.date) === m)
              .map((e) => {
                const d = dateParts(e.date);
                return (
                  <li key={e.id}>
                    <span
                      className="date-chip date-chip-large"
                      aria-hidden="true"
                    >
                      <b>{d.day}</b>
                      {d.month}
                    </span>
                    <div>
                      <h3>{e.title}</h3>
                      <p className="event-when">
                        {d.weekday}, {d.month} {d.day} · {e.time} · {e.who}
                      </p>
                      <p>{e.text}</p>
                    </div>
                    <div className="event-action">
                      <span className="event-kind">{e.kind}</span>
                      {e.rsvp ? (
                        <button
                          type="button"
                          className="btn btn-small btn-ghost"
                          onClick={() => save(e.id)}
                        >
                          Save places
                        </button>
                      ) : (
                        <span className="event-free">Free, just drop in</span>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}

      <section className="rsvp" ref={formRef} aria-labelledby="h-rsvp">
        <div>
          <h2 id="h-rsvp">Save places</h2>
          <p>
            Games nights and toy swaps have limited room, so we keep a list at
            the door. Everything else is first come, first served.
          </p>
          <p className="muted">
            This is a demo: nothing is sent, and no email will arrive.
          </p>
        </div>
        {done ? (
          <div className="form-success" aria-live="polite">
            <Check size={28} aria-hidden="true" />
            <h3 ref={doneRef} tabIndex={-1}>
              You are on the list
            </h3>
            <p>
              {done.people} {done.people === "1" ? "place" : "places"} saved for{" "}
              {done.title}. A confirmation would go to {done.email}.
            </p>
            <button
              type="button"
              className="text-button"
              onClick={() => setDone(null)}
            >
              Save places for another event
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} aria-busy={busy} key={chosen}>
            <Select
              label="Event"
              name="event"
              required
              defaultValue={chosen}
              error={errors.event}
            >
              <option value="" disabled>
                Choose an event
              </option>
              {rsvpEvents.map((e) => (
                <option key={e.id} value={e.id}>
                  {shortDate(e.date)} · {e.title}
                </option>
              ))}
            </Select>
            <div className="field-row">
              <Field
                label="Your name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="People coming"
                name="people"
                type="number"
                min={1}
                max={6}
                defaultValue={2}
                required
                error={errors.people}
                inputMode="numeric"
              />
            </div>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <button type="submit" className="btn" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                  Saving…
                </>
              ) : (
                "Save my places"
              )}
            </button>
            <FormAlert errors={errors} />
          </form>
        )}
      </section>
    </div>
  );
}
