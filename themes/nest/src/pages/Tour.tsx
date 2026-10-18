import { useRef, useState, type FormEvent } from "react";
import { Check, CircleCheck, Loader2 } from "lucide-react";
import { Link } from "../router";
import { brand, rooms, tours } from "../content";
import {
  Field,
  focusFirstError,
  useErrors,
  type Errors,
} from "../components/Field";
import { getDraft, weekdays } from "../lib/fees";
import {
  ageInMonths,
  dayLabel,
  longDay,
  tourSlots,
  type Slot,
} from "../lib/time";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Booking = {
  slot: Slot;
  parent: string;
  email: string;
  child: string;
  room: string;
};

export function Tour() {
  const draft = getDraft();
  const [days] = useState(() => tourSlots(6));
  const [slotId, setSlotId] = useState("");
  const [birthday, setBirthday] = useState("");
  const [roomId, setRoomId] = useState(draft?.roomId ?? "");
  const [picked, setPicked] = useState<string[]>(() =>
    draft ? weekdays.filter((_, i) => draft.pattern[i]) : [],
  );
  const { errors, setErrors, onChange } = useErrors();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [booking, setBooking] = useState<Booking | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const age = birthday ? ageInMonths(birthday) : null;
  const suggested =
    age != null && age >= 0
      ? rooms.find((r) => age >= r.minMonths && age < r.maxMonths)
      : undefined;
  const slot = days.flatMap((d) => d.slots).find((s) => s.id === slotId);

  const validate = (form: HTMLFormElement): Errors => {
    const f = new FormData(form);
    const e: Errors = {};
    const text = (k: string) => String(f.get(k) ?? "").trim();
    if (!slot)
      e.slot = "Choose a tour time. Grayed-out times are already full.";
    if (text("parent").length < 2)
      e.parent = "Enter your name so we know who to expect.";
    if (!text("email"))
      e.email = "Enter an email address for your confirmation.";
    else if (!EMAIL.test(text("email")))
      e.email =
        "That email looks incomplete. It needs an @ and a domain, like name@example.com.";
    const phone = text("phone");
    if (phone && phone.replace(/\D/g, "").length < 7)
      e.phone = "Phone numbers need at least 7 digits, or leave this blank.";
    if (!text("child"))
      e.child =
        "Enter your child's first name (or 'Baby' if they're not here yet).";
    if (!birthday)
      e.birthday =
        "Enter a birthday or due date so we can show you the right room.";
    else if (age != null && age < -9)
      e.birthday = "That date is more than nine months away. Check the year.";
    else if (age != null && age >= 96)
      e.birthday =
        "Nest cares for children up to 8. Check the year, or call us about older siblings.";
    if (!f.get("consent"))
      e.consent = "Tick to confirm we can contact you about this tour.";
    return e;
  };

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      if (e.slot) document.getElementById("slot-group")?.focus();
      else focusFirstError(form, e);
      return;
    }
    const f = new FormData(form);
    setStatus("sending");
    window.setTimeout(() => {
      setBooking({
        slot: slot!,
        parent: String(f.get("parent")).trim(),
        email: String(f.get("email")).trim(),
        child: String(f.get("child")).trim(),
        room:
          rooms.find((r) => r.id === (roomId || suggested?.id))?.name ??
          "the right room",
      });
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 900);
  };

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Book a tour</h1>
          <p className="lede">
            {tours.intro} Pick a time below; it takes about {tours.length}.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap tour-grid">
          <aside className="tour-side">
            <h2>What happens on a tour</h2>
            <ul className="ticks">
              {tours.expect.map((t) => (
                <li key={t}>
                  <Check aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <p>
              Can't make these times? Call{" "}
              <a href={brand.phoneHref}>{brand.phone}</a> or email{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
            {draft && (
              <p className="draft-note">
                We've carried over the{" "}
                {rooms.find((r) => r.id === draft.roomId)?.name} days from your
                fees calculation. Change them below if you like.
              </p>
            )}
          </aside>

          <div>
            <p className="sr-only" aria-live="polite">
              {status === "sending"
                ? "Booking your tour…"
                : booking
                  ? `Tour booked for ${longDay(booking.slot.date)} at ${booking.slot.time}.`
                  : ""}
            </p>
            {status === "done" && booking ? (
              <div className="confirm" ref={doneRef} tabIndex={-1}>
                <CircleCheck aria-hidden="true" />
                <h2>
                  See you {longDay(booking.slot.date)} at {booking.slot.time}.
                </h2>
                <p>
                  Thanks, {booking.parent}. We've penciled in a tour of{" "}
                  {booking.room} for {booking.child}. A confirmation would go to{" "}
                  {booking.email}, with directions and the side-gate code.
                </p>
                <dl className="facts">
                  <div>
                    <dt>When</dt>
                    <dd>
                      {dayLabel(booking.slot.date)}, {booking.slot.time}
                    </dd>
                  </div>
                  <div>
                    <dt>Where</dt>
                    <dd>{brand.address.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>Length</dt>
                    <dd>{tours.length}</dd>
                  </div>
                </dl>
                <div className="actions">
                  <Link to="/parents" className="btn btn-primary">
                    Read parent info while you wait
                  </Link>
                  <Link to="/" className="btn btn-ghost">
                    Back to home
                  </Link>
                </div>
                <p className="quiet">
                  Demo booking: nothing was sent or reserved.
                </p>
              </div>
            ) : (
              <form
                className="form"
                noValidate
                onSubmit={submit}
                onChange={onChange}
                aria-busy={status === "sending"}
              >
                <fieldset
                  className="slots"
                  data-invalid={errors.slot ? "" : undefined}
                >
                  <legend>Choose a time</legend>
                  <div
                    id="slot-group"
                    className="slot-days"
                    tabIndex={-1}
                    aria-describedby={errors.slot ? "slot-err" : undefined}
                  >
                    {days.map((d) => (
                      <div key={d.date.toISOString()} className="slot-day">
                        <p>{dayLabel(d.date)}</p>
                        {d.slots.map((s) => (
                          <label
                            key={s.id}
                            className="slot"
                            data-full={s.full ? "" : undefined}
                          >
                            <input
                              type="radio"
                              name="slot"
                              value={s.id}
                              disabled={s.full}
                              checked={slotId === s.id}
                              onChange={() => {
                                setSlotId(s.id);
                                setErrors(({ slot: _, ...rest }) => rest);
                              }}
                            />
                            <span className="num">{s.time}</span>
                            {s.full && <small>Full</small>}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                  {errors.slot && (
                    <p className="field-error" id="slot-err">
                      {errors.slot}
                    </p>
                  )}
                </fieldset>

                <div className="form-row">
                  <Field
                    label="Your name"
                    name="parent"
                    autoComplete="name"
                    required
                    minLength={2}
                    error={errors.parent}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                </div>
                <div className="form-row">
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    error={errors.phone}
                    hint="Only if you'd like a reminder text."
                  />
                  <Field
                    label="Child's first name"
                    name="child"
                    required
                    error={errors.child}
                  />
                </div>
                <div className="form-row">
                  <Field
                    label="Birthday or due date"
                    name="birthday"
                    type="date"
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    error={errors.birthday}
                    hint={
                      suggested
                        ? `That's the ${suggested.name} room today (${suggested.ages.split(" · ")[0]}).`
                        : age != null && age < 0
                          ? "Due soon: babies join Wrens from 3 months."
                          : age != null && age < 3
                            ? "Babies join Wrens from 3 months."
                            : "We'll suggest a room."
                    }
                  />
                  <Field label="Room you're interested in" name="room">
                    <select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                    >
                      <option value="">
                        {suggested
                          ? `Suggested: ${suggested.name}`
                          : "Not sure yet"}
                      </option>
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} · {r.ages.split(" · ")[0]}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <fieldset className="days-pick">
                  <legend>Days you're hoping for</legend>
                  <div className="seg seg-multi">
                    {weekdays.map((d) => (
                      <label key={d}>
                        <input
                          type="checkbox"
                          name="days"
                          value={d}
                          checked={picked.includes(d)}
                          onChange={(e) =>
                            setPicked((p) =>
                              e.target.checked
                                ? [...p, d]
                                : p.filter((x) => x !== d),
                            )
                          }
                        />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field
                  label="Anything we should know? (optional)"
                  name="notes"
                  hint="Allergies, additional needs, or a question for the tour."
                >
                  <textarea rows={4} maxLength={600} />
                </Field>

                <div
                  className="field"
                  data-invalid={errors.consent ? "" : undefined}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "f-consent-err" : undefined
                      }
                    />
                    <span>
                      You can contact me about this tour and my child's place.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="f-consent-err">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="form-submit">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="spin" aria-hidden="true" /> Booking
                        your tour…
                      </>
                    ) : (
                      "Book this tour"
                    )}
                  </button>
                  <p className="quiet">Demo form: nothing is sent anywhere.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
