import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  categories,
  levels,
  pageCopy,
  products,
  services,
  stylists,
  type Level,
} from "../content";
import {
  clock,
  duration,
  levelOf,
  money,
  plan,
  slotsFor,
  upcomingDays,
} from "../lib/plan";
import { clearVisit, setStylist, toggleService, useVisit } from "../lib/visit";
import { pause, useErrors, validate } from "../lib/form";
import { ChairTimeline } from "../components/ChairTimeline";
import { Field } from "../components/Field";

type Confirmed = {
  ref: string;
  name: string;
  date: string;
  start: number;
  stylist: string;
  ids: string[];
  level: Level;
  held: string[];
};

const messages: Record<string, string> = {
  returning:
    "Tell us whether you've had colour with us in the last six months, so we know if you need a patch test.",
  day: "Pick a day for your appointment.",
  time: "Pick a start time. Greyed-out times are already booked.",
  name: "Add your name so we know who's in the chair.",
  email: "Enter an email like you@example.com for your confirmation.",
  phone:
    "Enter a phone number with at least 10 digits, like 555 014 8220, for the reminder text.",
  policy: "Please confirm you've read the cancellation policy.",
};

const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export function Book() {
  const visit = useVisit();
  const level = levelOf(visit.stylist);
  const p = plan(visit.services, level);
  const [returning, setReturning] = useState<"" | "yes" | "no">("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Confirmed | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const needsPatch = p.patchTest && returning === "no";
  const calendar = upcomingDays(visit.stylist).map((d, i) => ({
    ...d,
    open: d.open && !(needsPatch && i < 2),
  }));
  const chosenDay = calendar.find((d) => d.key === day && d.open);
  const slots = chosenDay
    ? slotsFor(chosenDay.date, visit.stylist, p.minutes)
    : [];
  const chosenSlot = slots.find((s) => s.min === time && s.free);

  // Drop a day or time that a later change (stylist, services, patch test) has made impossible.
  useEffect(() => {
    if (day && !chosenDay) setDay("");
    if (time !== null && !chosenSlot) setTime(null);
  }, [day, chosenDay, time, chosenSlot]);

  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

  const clear = (name: string) =>
    errors[name] && setErrors(({ [name]: _, ...rest }) => rest);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    if (!visit.services.length)
      extra.services =
        "Choose at least one service. Not sure? The free colour consultation is a good start.";
    const phone = String(new FormData(form).get("phone") ?? "");
    if (phone && phone.replace(/\D/g, "").length < 10)
      extra.phone = messages.phone;
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length || !chosenDay || !chosenSlot) return;

    setSending(true);
    await pause();
    setDone({
      ref: `CH-${Math.floor(1000 + Math.random() * 9000)}`,
      name: String(new FormData(form).get("name")).split(" ")[0],
      date: longDate(chosenDay.date),
      start: chosenSlot.min,
      stylist:
        stylists.find((s) => s.id === visit.stylist)?.name ??
        "the first free stylist",
      ids: visit.services,
      level,
      held: visit.products,
    });
    setSending(false);
    clearVisit();
  };

  if (done) {
    const heldItems = products.filter((x) => done.held.includes(x.id));
    return (
      <div className="page wrap book-done" role="status" aria-live="polite">
        <CalendarCheck aria-hidden="true" size={40} />
        <h1 ref={doneHeading} tabIndex={-1}>
          See you {done.date}, {done.name}.
        </h1>
        <p className="lede">
          {clock(done.start)} with {done.stylist}. Your reference is{" "}
          <strong className="num">{done.ref}</strong>; a confirmation would go
          to your email in a live salon.
        </p>
        <div className="done-grid">
          <ChairTimeline ids={done.ids} level={done.level} start={done.start} />
          <div className="done-notes">
            {heldItems.length > 0 && (
              <p>
                Waiting at the desk: {heldItems.map((x) => x.name).join(", ")} (
                <span className="num">
                  {money(heldItems.reduce((n, x) => n + x.price, 0))}
                </span>
                , pay in salon).
              </p>
            )}
            <p>
              Need to change it? Call {brand.phone} up to 24 hours before at no
              charge.
            </p>
            <div className="actions">
              <Link to="/visit" className="btn btn-ghost">
                How to find us
              </Link>
              <Link to="/" className="btn btn-ghost">
                Back to the start
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page book-page">
      <header className="page-head wrap">
        <h1>{pageCopy.book.title}</h1>
        <p className="lede">{pageCopy.book.lede}</p>
      </header>

      <div className="wrap book-layout">
        <form
          className="book-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
        >
          <fieldset
            className="step"
            data-invalid={errors.services ? "" : undefined}
            aria-describedby={errors.services ? "services-err" : undefined}
          >
            <legend>
              <span className="step-n num">1</span> What you'd like done
            </legend>
            {categories.map((c) => (
              <div key={c.id} className="choice-group">
                <p className="choice-head">{c.name}</p>
                <div className="choice-list">
                  {services
                    .filter((s) => s.category === c.id)
                    .map((s) => (
                      <label key={s.id} className="choice">
                        <input
                          type="checkbox"
                          name="services"
                          value={s.id}
                          checked={visit.services.includes(s.id)}
                          onChange={() => {
                            toggleService(s.id);
                            clear("services");
                          }}
                        />
                        <span className="choice-name">{s.name}</span>
                        <span className="choice-meta num">
                          {duration(s.steps.reduce((n, st) => n + st.min, 0))} ·{" "}
                          {money(s.price[level])}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
            {errors.services && (
              <p className="field-error" id="services-err">
                {errors.services}
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n num">2</span> Who you'd like to see
            </legend>
            <div className="stylist-choices">
              {[
                {
                  id: "any",
                  name: "Any stylist",
                  sub: "First free chair, Stylist prices",
                },
                ...stylists.map((s) => ({
                  id: s.id,
                  name: s.name,
                  sub: `${s.role} · ${levels[s.level].label}`,
                })),
              ].map((s) => {
                const who = stylists.find((x) => x.id === s.id);
                return (
                  <label key={s.id} className="choice stylist-choice">
                    <input
                      type="radio"
                      name="stylist"
                      value={s.id}
                      checked={visit.stylist === s.id}
                      onChange={() => setStylist(s.id)}
                    />
                    {who ? (
                      <img src={who.photo.src} alt="" width={44} height={44} />
                    ) : (
                      <span className="any-mark" aria-hidden="true" />
                    )}
                    <span className="choice-name">
                      {s.name}
                      <small>{s.sub}</small>
                    </span>
                    {p.services.length > 0 && (
                      <span className="choice-meta num">
                        {money(plan(visit.services, levelOf(s.id)).price)}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n num">3</span> When
            </legend>

            {p.patchTest && (
              <fieldset
                className="sub"
                data-invalid={errors.returning ? "" : undefined}
              >
                <legend>
                  Have you had colour at Chroma in the last six months?
                </legend>
                <div className="inline-radios">
                  {(["yes", "no"] as const).map((v) => (
                    <label key={v} className="pill-radio">
                      <input
                        type="radio"
                        name="returning"
                        value={v}
                        required
                        checked={returning === v}
                        aria-describedby={
                          errors.returning ? "returning-err" : undefined
                        }
                        onChange={() => setReturning(v)}
                      />
                      <span>
                        {v === "yes" ? "Yes" : "No, I'm new to colour here"}
                      </span>
                    </label>
                  ))}
                </div>
                {needsPatch && (
                  <p className="notice">
                    You'll need a free five-minute patch test at least 48 hours
                    before, so the next two days are closed to you. Walk in any
                    open hour to do it.
                  </p>
                )}
                {errors.returning && (
                  <p className="field-error" id="returning-err">
                    {errors.returning}
                  </p>
                )}
              </fieldset>
            )}

            <fieldset
              className="sub"
              data-invalid={errors.day ? "" : undefined}
            >
              <legend>Day</legend>
              <div className="day-strip">
                {calendar.map((d) => (
                  <label
                    key={d.key}
                    className="day"
                    data-off={d.open ? undefined : ""}
                  >
                    <input
                      type="radio"
                      name="day"
                      value={d.key}
                      required
                      disabled={!d.open}
                      checked={day === d.key}
                      aria-describedby={errors.day ? "day-err" : undefined}
                      onChange={() => {
                        setDay(d.key);
                        setTime(null);
                      }}
                    />
                    <span className="day-name">
                      {d.date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span className="day-num num">{d.date.getDate()}</span>
                    <span className="day-month">
                      {d.date.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </label>
                ))}
              </div>
              {errors.day && (
                <p className="field-error" id="day-err">
                  {errors.day}
                </p>
              )}
            </fieldset>

            <fieldset
              className="sub"
              data-invalid={errors.time ? "" : undefined}
            >
              <legend>
                Start time{chosenDay ? `, ${longDate(chosenDay.date)}` : ""}
              </legend>
              {!chosenDay ? (
                <p className="muted">Pick a day to see free chairs.</p>
              ) : slots.some((s) => s.free) ? (
                <div className="slot-grid">
                  {slots.map((s) => (
                    <label
                      key={s.min}
                      className="slot"
                      data-off={s.free ? undefined : ""}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={s.min}
                        required
                        disabled={!s.free}
                        checked={time === s.min}
                        aria-describedby={errors.time ? "time-err" : undefined}
                        onChange={() => setTime(s.min)}
                      />
                      <span className="num">{clock(s.min)}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="notice">
                  No chair is free long enough on this day for a{" "}
                  {duration(p.minutes)} appointment. Try another day, or choose
                  “Any stylist”.
                </p>
              )}
              {errors.time && (
                <p className="field-error" id="time-err">
                  {errors.time}
                </p>
              )}
            </fieldset>
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n num">4</span> Your details
            </legend>
            <div className="field-grid">
              <Field
                label="Full name"
                name="name"
                error={errors.name}
                required
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                error={errors.email}
                required
                autoComplete="email"
              />
              <Field
                label="Mobile"
                name="phone"
                type="tel"
                error={errors.phone}
                required
                autoComplete="tel"
                hint="For a reminder text the day before."
              />
              <Field
                label="Anything we should know?"
                name="notes"
                error={errors.notes}
                className="wide"
                hint="Optional. Past colour, box dye, a photo you'll bring, access needs."
              >
                <textarea rows={3} maxLength={500} />
              </Field>
            </div>
            <div
              className="check-field"
              data-invalid={errors.policy ? "" : undefined}
            >
              <label>
                <input
                  type="checkbox"
                  name="policy"
                  required
                  aria-describedby={errors.policy ? "policy-err" : undefined}
                />
                <span>
                  I've read the <Link to="/visit">cancellation policy</Link>:
                  free up to 24 hours before, 50% after that.
                </span>
              </label>
              {errors.policy && (
                <p className="field-error" id="policy-err">
                  {errors.policy}
                </p>
              )}
            </div>
          </fieldset>

          <div className="submit-row">
            <button className="btn btn-primary btn-large" disabled={sending}>
              {sending ? "Holding your chair…" : "Request this appointment"}
            </button>
            <p className="fine">
              This is a demo: nothing is sent, booked or charged.
            </p>
          </div>
        </form>

        <aside className="book-summary" aria-labelledby="summary-h">
          <h2 id="summary-h">Your chair time</h2>
          <p className="summary-when">
            {stylists.find((s) => s.id === visit.stylist)?.name ??
              "Any stylist"}
            {chosenDay &&
              ` · ${chosenDay.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`}
            {chosenSlot && ` · ${clock(chosenSlot.min)}`}
          </p>
          <ChairTimeline
            ids={visit.services}
            level={level}
            start={chosenSlot ? chosenSlot.min : null}
            pricePrefix={visit.stylist === "any" ? "from " : ""}
          />
          {visit.products.length > 0 && (
            <p className="summary-held">
              Plus {visit.products.length} set-aside{" "}
              {visit.products.length === 1 ? "product" : "products"}, paid in
              salon. <Link to="/products">Change</Link>
            </p>
          )}
          {p.minutes > 180 && (
            <p className="fine">
              Over three hours: a $50 deposit is taken in salon and deducted
              from your bill.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
