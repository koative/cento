import { useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import {
  brand,
  conciergePage,
  servicePhotos,
  services,
  villas,
  type ServiceGroup,
} from "../content";
import { validate, pause } from "../lib/form";
import { money } from "../lib/stay";
import { Field, useErrors } from "../components/Field";

const groups = Object.keys(servicePhotos) as ServiceGroup[];

function AskElena() {
  const { errors, setErrors, onChange } = useErrors();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const done = useRef<HTMLDivElement>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Tell us your name so Elena knows who to reply to.",
      email: "Enter an email address like you@example.com.",
      message: "Tell us what you would like arranged, even in a few words.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await pause();
    setName(String(new FormData(form).get("name")).split(" ")[0]);
    setStatus("sent");
    requestAnimationFrame(() => done.current?.focus());
  };

  if (status === "sent")
    return (
      <div className="form-done" ref={done} tabIndex={-1} aria-live="polite">
        <h3>Thank you, {name}.</h3>
        <p>
          Elena will reply within a day with what she has arranged and who will
          turn up. Nothing was actually sent; this is a demo.
        </p>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setStatus("idle")}
        >
          Ask for something else
        </button>
      </div>
    );

  return (
    <form className="form" noValidate onSubmit={submit} onChange={onChange}>
      <div className="form-row">
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
          error={errors.email}
        />
      </div>
      <Field
        label="Staying at"
        name="villa"
        hint="Optional. Leave it if you have not booked yet."
      >
        <select defaultValue="">
          <option value="">Not booked yet</option>
          {villas.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.name}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label="What would you like arranged?"
        name="message"
        error={errors.message}
      >
        <textarea
          rows={5}
          required
          minLength={4}
          placeholder="A cook for eight on the Saturday, and a boat if the wind allows."
        />
      </Field>
      <p className="fine">
        This demo form sends nothing; the reply above is all that happens.
      </p>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? "Sending to Elena…" : "Send to Elena"}
      </button>
    </form>
  );
}

export function Concierge() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{conciergePage.title}</h1>
        <p className="lede">{conciergePage.lede}</p>
      </header>

      <section className="wrap how" aria-labelledby="h-how">
        <h2 id="h-how">{conciergePage.howTitle}</h2>
        <ol className="how-steps">
          {conciergePage.how.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      {groups.map((g, i) => {
        const photo = servicePhotos[g];
        const id = `h-group-${i}`;
        return (
          <section
            key={g}
            className="wrap service-group"
            data-flip={i % 2 ? "" : undefined}
            aria-labelledby={id}
          >
            <figure>
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i ? "lazy" : "eager"}
                width={1280}
                height={853}
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
            <div>
              <h2 id={id}>{g}</h2>
              <ul className="services">
                {services
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <li key={s.id}>
                      <div className="ledger-line">
                        <h3>{s.name}</h3>
                        <span className="ledger-dots" aria-hidden="true" />
                        <span className="ledger-price">{money(s.price)}</span>
                      </div>
                      <p>
                        {s.text} <span className="unit">{s.unit}.</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="wrap ask" aria-labelledby="h-ask">
        <div>
          <h2 id="h-ask">Ask Elena</h2>
          <p className="measure">
            Anything not on this page, she can probably still arrange. Or call
            the office on <a href={brand.phoneHref}>{brand.phone}</a>,{" "}
            {brand.officeHours.toLowerCase()}.
          </p>
          <p className="measure">
            Booking a house as well? Add the extras on the{" "}
            <Link to="/book">booking form</Link> instead.
          </p>
        </div>
        <AskElena />
      </section>
    </div>
  );
}
