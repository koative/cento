import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Loader2, Wrench } from "lucide-react";
import {
  brand,
  dropOffTimes,
  hoursNote,
  photos,
  serviceExtras,
  serviceFaq,
  servicePackages,
} from "../content";
import { Field, FieldError, validate, type Errors } from "../components/Field";
import { money } from "../lib/cart";
import { dayNames } from "../lib/hours";

const messages = {
  service: {
    missing: "Choose a service, or pick “Not sure” and tell us below.",
  },
  day: { missing: "Pick a drop-off day from the workshop calendar." },
  time: { missing: "Pick a drop-off time." },
  bike: {
    missing:
      "Tell us the make and model, e.g. “Corsa 54” or “old blue Raleigh”.",
  },
  name: { missing: "Enter your name for the workshop ticket." },
  email: {
    missing: "Enter your email so we can confirm the booking.",
    invalid:
      "Check the email — it needs an @ and a domain, like name@example.com.",
  },
  phone: {
    missing: "Enter a phone number; we call before doing extra work.",
    invalid: "Use digits, spaces or + only, at least 7 digits.",
  },
};

/** The next 14 days with demo workshop capacity. Sunday and Monday take no drop-offs. */
function workshopDays() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i + 1);
    const closed = d.getDay() === 0 || d.getDay() === 1;
    return {
      date: d,
      iso: d.toDateString(),
      closed,
      slots: closed ? 0 : (d.getDate() * 7 + d.getMonth()) % 5,
    };
  });
}

type Ticket = {
  number: string;
  service: string;
  day: string;
  time: string;
  name: string;
  email: string;
};

export function Service() {
  const days = workshopDays();
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ticket) done.current?.focus();
  }, [ticket]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    const day = days.find((d) => d.iso === data.get("day"))!;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setTicket({
        number: "WK-" + String(Math.floor(2000 + Math.random() * 7000)),
        service:
          servicePackages.find((s) => s.id === data.get("service"))?.name ??
          "Assessment",
        day: `${dayNames[day.date.getDay()]} ${day.date.getDate()} ${day.date.toLocaleString("en-US", { month: "long" })}`,
        time: String(data.get("time")),
        name: String(data.get("name")),
        email: String(data.get("email")),
      });
    }, 900);
  }

  return (
    <div className="page">
      <header className="page-head page-head-media">
        <div>
          <h1>The workshop</h1>
          <p className="lead">
            Four stands, two full-time mechanics and a wheel builder. We service
            any bicycle, quote before we start, and call before doing anything
            extra. Club members get 10% off labour.
          </p>
          <p className="muted">{hoursNote}</p>
        </div>
        <img
          src={photos.shopTools}
          alt="Workshop tool wall with spanners, cone wrenches and pumps on pegboard"
          width={1400}
          height={933}
        />
      </header>

      <section className="section">
        <h2>Service menu</h2>
        <div className="packages">
          {servicePackages.map((s) => (
            <article key={s.id} className="package">
              <h3>{s.name}</h3>
              <p className="package-price num">{money(s.price)}</p>
              <p className="package-time">{s.time}</p>
              <p>{s.summary}</p>
              <ul>
                {s.includes.map((i) => (
                  <li key={i}>
                    <Check size={14} aria-hidden="true" /> {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <h3 className="sub-head">Single jobs</h3>
        <ul className="price-list price-list-cols">
          {serviceExtras.map(([name, price]) => (
            <li key={name}>
              <span>{name}</span>
              <span className="leader" aria-hidden="true" />
              <span className="num">{money(price)}</span>
            </li>
          ))}
        </ul>
        <p className="muted">
          Labour only. Parts are quoted before fitting and charged at the shelf
          price.
        </p>
      </section>

      <section className="section booking" aria-labelledby="book-title">
        <div className="booking-intro">
          <h2 id="book-title">Book a drop-off</h2>
          <p>
            Choose a day and a time, leave the bike with us, and we'll text when
            it's off the stand. Urgent? Call{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>.
          </p>
          <img
            src={photos.shopStand}
            alt="A wheel in a truing stand on a workbench crowded with tools and parts"
            width={1400}
            height={931}
            loading="lazy"
          />
        </div>

        {ticket ? (
          <div className="ticket" role="status" aria-live="polite">
            <Wrench size={28} aria-hidden="true" />
            <h3 ref={done} tabIndex={-1}>
              You're booked in, {ticket.name.split(" ")[0]}
            </h3>
            <dl>
              <div>
                <dt>Ticket</dt>
                <dd className="num">{ticket.number}</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>{ticket.service}</dd>
              </div>
              <div>
                <dt>Drop-off</dt>
                <dd>
                  {ticket.day}, <span className="num">{ticket.time}</span>
                </dd>
              </div>
            </dl>
            <p>
              A confirmation would go to {ticket.email}. Bring the bike
              clean-ish, with any keys for locks or batteries.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setTicket(null)}
            >
              Book another bike
            </button>
          </div>
        ) : (
          <form className="form" noValidate onSubmit={submit}>
            <fieldset
              className="choice-group"
              aria-describedby={errors.service ? "f-service-error" : undefined}
            >
              <legend>Service</legend>
              {servicePackages.map((s) => (
                <label key={s.id} className="choice choice-compact">
                  <input type="radio" name="service" value={s.id} required />
                  <span className="choice-name">{s.name}</span>
                  <span className="choice-price num">{money(s.price)}</span>
                </label>
              ))}
              <label className="choice choice-compact">
                <input type="radio" name="service" value="assess" required />
                <span className="choice-name">Not sure — have a look</span>
                <span className="choice-price">Free quote</span>
              </label>
              <FieldError id="f-service" error={errors.service} />
            </fieldset>

            <fieldset aria-describedby={errors.day ? "f-day-error" : undefined}>
              <legend>Drop-off day</legend>
              <div className="day-strip">
                {days.map((d) => (
                  <label
                    key={d.iso}
                    className="day"
                    data-closed={d.closed || undefined}
                    data-full={(!d.closed && !d.slots) || undefined}
                  >
                    <input
                      type="radio"
                      name="day"
                      value={d.iso}
                      required
                      disabled={!d.slots}
                    />
                    <span className="day-name">
                      {dayNames[d.date.getDay()].slice(0, 3)}
                    </span>
                    <span className="day-date num">{d.date.getDate()}</span>
                    <span className="day-slots">
                      {d.closed
                        ? "Closed"
                        : d.slots
                          ? `${d.slots} left`
                          : "Full"}
                    </span>
                  </label>
                ))}
              </div>
              <FieldError id="f-day" error={errors.day} />
            </fieldset>

            <fieldset
              aria-describedby={errors.time ? "f-time-error" : undefined}
            >
              <legend>Drop-off time</legend>
              <div className="time-row">
                {dropOffTimes.map((t) => (
                  <label key={t} className="size">
                    <input type="radio" name="time" value={t} required />
                    <span className="num">{t}</span>
                  </label>
                ))}
              </div>
              <FieldError id="f-time" error={errors.time} />
            </fieldset>

            <Field
              label="Your bike"
              name="bike"
              required
              error={errors.bike}
              placeholder="Make, model, roughly how old"
            />
            <div className="field-pair">
              <Field
                label="Name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                required
                pattern="[+0-9 ]{7,}"
                autoComplete="tel"
                error={errors.phone}
              />
            </div>
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
            />
            <div className="field">
              <label htmlFor="f-notes">What's it doing? (optional)</label>
              <textarea
                id="f-notes"
                name="notes"
                rows={4}
                placeholder="Clicks when I stand up, back brake feels soft…"
              />
            </div>
            <button type="submit" className="btn btn-wide" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                  Booking…
                </>
              ) : (
                "Book the drop-off"
              )}
            </button>
            <p className="muted small">Demo form — nothing is sent anywhere.</p>
          </form>
        )}
      </section>

      <section className="section faq">
        <h2>Workshop questions</h2>
        <div className="faq-list">
          {serviceFaq.map((f) => (
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
