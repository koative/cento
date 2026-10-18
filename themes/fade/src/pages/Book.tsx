import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck } from "lucide-react";
import { Link } from "../router";
import {
  addOns,
  barbers,
  serviceGroups,
  services,
  tierSurcharge,
} from "../content";
import { clock, duration, money, pause, validate } from "../lib/format";
import { dayId, openChairs, slotsFor, upcomingDays } from "../lib/slots";
import { Field, useErrors } from "../components/Field";

const messages = {
  service: "Pick a service first. It sets how long your slot is.",
  day: "Pick a day from the row of dates.",
  time: "Pick a start time. Days with no times left are greyed out.",
  name: "Add your name so your barber knows who to call over.",
  phone:
    "Add a phone number with area code, like (555) 013-6221, for the reminder text.",
  email: "Enter an email like you@example.com for the confirmation.",
};

type Confirmed = {
  code: string;
  service: string;
  barber: string;
  chair: number;
  when: string;
  total: number;
  name: string;
};

const fullDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function Book() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const [serviceId, setServiceId] = useState(() =>
    services.some((s) => s.id === params.get("service"))
      ? params.get("service")!
      : "",
  );
  const [barberId, setBarberId] = useState(() =>
    barbers.some((b) => b.id === params.get("barber"))
      ? params.get("barber")!
      : "any",
  );
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Confirmed | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const service = services.find((s) => s.id === serviceId);
  const minutes = service?.minutes ?? 40;
  const chosen = barbers.find((b) => b.id === barberId);
  const dates = upcomingDays(14);
  const slotsOn = (date: Date) =>
    chosen
      ? slotsFor(chosen, date, minutes).map((t) => ({
          time: t,
          barber: chosen,
        }))
      : openChairs(date, minutes);
  const date = dates.find((d) => dayId(d) === day);
  const times = date ? slotsOn(date) : [];
  const slot = times.find((t) => t.time === time);
  const who = slot?.barber ?? chosen;
  const extrasTotal = addOns
    .filter((a) => extras.includes(a.id))
    .reduce((n, a) => n + a.price, 0);
  const total = service
    ? service.price + (who ? tierSurcharge[who.tier] : 0) + extrasTotal
    : 0;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    if (!slot) extra.time = messages.time;
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length || !service || !slot || !date) return;
    setSending(true);
    await pause();
    setSending(false);
    setDone({
      code: `FD-${(Date.now() % 46656).toString(36).toUpperCase().padStart(3, "0")}${slot.barber.chair}`,
      service: service.name,
      barber: slot.barber.name,
      chair: slot.barber.chair,
      when: `${fullDate.format(date)} at ${clock(slot.time)}`,
      total,
      name: String(new FormData(form).get("name")).split(" ")[0],
    });
  };

  const reset = () => {
    setDone(null);
    setDay("");
    setTime("");
    setExtras([]);
  };

  if (done) {
    return (
      <div
        className="wrap book-done"
        ref={doneRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <CalendarCheck aria-hidden="true" className="done-icon" />
        <h1>
          You're in chair {done.chair}, {done.name}.
        </h1>
        <p className="lede">
          {done.service} with {done.barber}, {done.when}. We will text a
          reminder the evening before.
        </p>
        <dl className="ticket">
          <div>
            <dt>Booking</dt>
            <dd>{done.code}</dd>
          </div>
          <div>
            <dt>Barber</dt>
            <dd>{done.barber}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{done.when}</dd>
          </div>
          <div>
            <dt>Pay at the counter</dt>
            <dd>{money(done.total)}</dd>
          </div>
        </dl>
        <div className="actions">
          <button type="button" className="btn btn-ink" onClick={reset}>
            Book another chair
          </button>
          <Link to="/shop" className="btn btn-line">
            Browse the shop
          </Link>
        </div>
        <p className="demo-note">
          Demo only: nothing was sent and no chair is being held.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Book a chair</h1>
        <p className="lede">
          Four steps, under a minute. You pay at the counter after the cut, and
          you can cancel free up to four hours before.
        </p>
      </header>

      <form
        className="wrap book"
        noValidate
        onSubmit={submit}
        onChange={onChange}
        aria-busy={sending}
      >
        <div className="book-steps">
          <fieldset
            className="step"
            aria-describedby={errors.service ? "err-service" : undefined}
          >
            <legend>
              <span className="step-no">1</span> Service
            </legend>
            {serviceGroups.map((g) => (
              <div key={g.id} className="choice-group">
                <p className="choice-group-title">{g.title}</p>
                <div className="choices">
                  {services
                    .filter((s) => s.group === g.id)
                    .map((s) => (
                      <label key={s.id} className="choice">
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          required
                          checked={serviceId === s.id}
                          onChange={() => setServiceId(s.id)}
                        />
                        <span className="choice-body">
                          <span className="choice-name">{s.name}</span>
                          <span className="choice-meta">
                            {money(s.price)} · {duration(s.minutes)}
                          </span>
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
            {errors.service && (
              <p className="field-error" id="err-service">
                {errors.service}
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-no">2</span> Barber
            </legend>
            <div className="choices barbers-choices">
              <label className="choice">
                <input
                  type="radio"
                  name="barber"
                  value="any"
                  checked={barberId === "any"}
                  onChange={() => setBarberId("any")}
                />
                <span className="choice-body">
                  <span className="choice-name">First free chair</span>
                  <span className="choice-meta">Most times to pick from</span>
                </span>
              </label>
              {barbers.map((b) => (
                <label key={b.id} className="choice">
                  <input
                    type="radio"
                    name="barber"
                    value={b.id}
                    checked={barberId === b.id}
                    onChange={() => setBarberId(b.id)}
                  />
                  <span className="choice-body">
                    <span className="choice-name">
                      {b.name}{" "}
                      <span className="choice-chair">· chair {b.chair}</span>
                    </span>
                    <span className="choice-meta">
                      {b.tier}
                      {tierSurcharge[b.tier]
                        ? ` · +${money(tierSurcharge[b.tier])}`
                        : ""}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset
            className="step"
            aria-describedby={
              errors.day || errors.time ? "err-when" : undefined
            }
          >
            <legend>
              <span className="step-no">3</span> Day & time
            </legend>
            <div className="days" role="radiogroup" aria-label="Day">
              {dates.map((d) => {
                const id = dayId(d);
                const open = slotsOn(d).length;
                return (
                  <label
                    key={id}
                    className="day"
                    data-none={open ? undefined : ""}
                  >
                    <input
                      type="radio"
                      name="day"
                      value={id}
                      required
                      disabled={!open}
                      checked={day === id}
                      onChange={() => {
                        setDay(id);
                        setTime("");
                      }}
                    />
                    <span className="day-body">
                      <span className="day-name">
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span className="day-num">{d.getDate()}</span>
                      <span className="day-open">
                        {open ? `${open} open` : "Full"}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            {date ? (
              <div
                className="times"
                role="radiogroup"
                aria-label={`Start times, ${fullDate.format(date)}`}
              >
                {times.map((t) => (
                  <label key={t.time} className="time">
                    <input
                      type="radio"
                      name="time"
                      value={t.time}
                      checked={time === t.time}
                      onChange={() => setTime(t.time)}
                    />
                    <span>
                      {clock(t.time)}
                      {barberId === "any" && (
                        <small>{t.barber.name.split(" ")[0]}</small>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="times-empty">
                Pick a day to see open times
                {chosen ? ` with ${chosen.name.split(" ")[0]}` : ""}.
              </p>
            )}
            {(errors.day || errors.time) && (
              <p className="field-error" id="err-when">
                {errors.day ?? errors.time}
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-no">4</span> You
            </legend>
            <div className="field-grid">
              <Field
                label="Name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Mobile"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[\d\s\(\)\+\.\-]{10,}"
                placeholder="(555) 013-6221"
                error={errors.phone}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email}
                className="span-2"
              />
              <Field
                label="Notes for your barber"
                name="notes"
                hint="Optional. A description from the fade chart lands here."
                className="span-2"
              >
                <textarea rows={3} defaultValue={params.get("note") ?? ""} />
              </Field>
            </div>
            <div className="addons" role="group" aria-label="Add-ons">
              <p className="choice-group-title">Add-ons</p>
              {addOns.map((a) => (
                <label key={a.id} className="check">
                  <input
                    type="checkbox"
                    name="addons"
                    value={a.id}
                    checked={extras.includes(a.id)}
                    onChange={(e) =>
                      setExtras((x) =>
                        e.target.checked
                          ? [...x, a.id]
                          : x.filter((y) => y !== a.id),
                      )
                    }
                  />
                  <span>
                    {a.name}{" "}
                    <span className="price-num">+{money(a.price)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="book-summary" aria-label="Your booking">
          <h2>Your chair</h2>
          <dl>
            <div>
              <dt>Service</dt>
              <dd>
                {service
                  ? `${service.name} · ${duration(service.minutes)}`
                  : "Not picked yet"}
              </dd>
            </div>
            <div>
              <dt>Barber</dt>
              <dd>
                {who ? `${who.name}, chair ${who.chair}` : "First free chair"}
              </dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {date
                  ? `${fullDate.format(date)}${slot ? `, ${clock(slot.time)}` : ""}`
                  : "Not picked yet"}
              </dd>
            </div>
            {extrasTotal > 0 && (
              <div>
                <dt>Add-ons</dt>
                <dd>{money(extrasTotal)}</dd>
              </div>
            )}
          </dl>
          <p className="summary-total">
            <span>Pay at the counter</span>
            <strong>{service ? money(total) : "—"}</strong>
          </p>
          <button
            type="submit"
            className="btn btn-red btn-block"
            disabled={sending}
          >
            {sending ? "Holding your chair…" : "Confirm booking"}
          </button>
          <p className="demo-note">
            Demo form: nothing is sent and no chair is held.
          </p>
        </aside>
      </form>
    </>
  );
}
