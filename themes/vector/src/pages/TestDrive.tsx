import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { models, photos, studios, testDrive } from "../content";
import { Field, focusFirst, useErrors, validate } from "../components/Field";
import { useSavedBuild } from "../lib/build";

const messages = {
  model: "Choose the model you'd like to drive.",
  date: "Pick a day for the drive.",
  time: "Pick a start time — greyed-out times are already booked.",
  studio: "Choose the studio to start from.",
  address: "Enter the street address where we should bring the car.",
  name: "Enter your full name.",
  email: "Enter an email address like name@example.com.",
  phone: "Enter a phone number with at least 10 digits.",
  licence:
    "Confirm you hold a full driving licence — we check it at the start of the drive.",
};

const dayFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const longFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

/** The next 12 days, starting tomorrow. */
function upcoming() {
  const today = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i + 1,
    );
    return { iso: d.toLocaleDateString("en-CA"), date: d };
  });
}

/** Deterministic "already booked" slots so the grid looks lived-in. */
function booked(key: string) {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4 === 0;
}

type Done = {
  model: string;
  when: string;
  time: string;
  where: string;
  email: string;
};

export function TestDrive() {
  const saved = useSavedBuild();
  const days = upcoming();
  const { errors, setErrors, onChange } = useErrors();
  const [model, setModel] = useState(saved?.model ?? "span");
  const [mode, setMode] = useState<"studio" | "home">("studio");
  const [studio, setStudio] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const place = studios.find((s) => s.id === studio);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const digits = String(data.get("phone") ?? "").replace(/\D/g, "");
    const found = validate(
      form,
      messages,
      digits && digits.length < 10 ? { phone: messages.phone } : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return focusFirst(form, found);
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDone({
        model: models.find((m) => m.slug === model)?.name ?? "",
        when: longFmt.format(days.find((d) => d.iso === date)!.date),
        time,
        where:
          mode === "home"
            ? String(data.get("address"))
            : `${place?.name} studio, ${place?.address}`,
        email: String(data.get("email")),
      });
    }, 900);
  };

  return (
    <>
      <header className="page-head sheet compact">
        <div className="wrap">
          <h1>{done ? "Your test drive is booked" : testDrive.title}</h1>
          <p className="lede">
            {done
              ? "See you then. Bring your licence and anything you want to try in the back."
              : testDrive.intro}
          </p>
        </div>
      </header>

      <div className="wrap booking">
        <div aria-live="polite">
          {done ? (
            <div className="confirmation">
              <p className="confirm-number">
                <Check aria-hidden="true" /> {done.model}, {done.when} at{" "}
                {done.time}
              </p>
              <p>
                Starting from {done.where}. A confirmation is on its way to{" "}
                {done.email}, with a link to move or cancel the drive up to two
                hours before.
              </p>
              <div className="actions">
                <Link to={`/models/${model}`} className="btn btn-primary">
                  Read up on the {done.model}
                </Link>
                <Link to="/charging" className="btn btn-ghost">
                  How charging works
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <fieldset
                className="field"
                data-invalid={errors.model ? "" : undefined}
              >
                <legend>Model</legend>
                <div className="chip-grid">
                  {models.map((m) => (
                    <label key={m.slug} className="chip">
                      <input
                        type="radio"
                        name="model"
                        value={m.slug}
                        required
                        checked={model === m.slug}
                        onChange={() => setModel(m.slug)}
                      />
                      {m.name}
                      <small>{m.body}</small>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="field">
                <legend>Where should the drive start?</legend>
                <div className="chip-grid two">
                  <label className="chip">
                    <input
                      type="radio"
                      name="mode"
                      value="studio"
                      checked={mode === "studio"}
                      onChange={() => setMode("studio")}
                    />
                    At a studio
                  </label>
                  <label className="chip">
                    <input
                      type="radio"
                      name="mode"
                      value="home"
                      checked={mode === "home"}
                      onChange={() => setMode("home")}
                    />
                    At my address
                    <small>Within 40 miles of a studio</small>
                  </label>
                </div>
              </fieldset>

              {mode === "studio" ? (
                <Field label="Studio" name="studio" error={errors.studio}>
                  <select
                    required
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose a studio
                    </option>
                    {studios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.city} — {s.name}
                      </option>
                    ))}
                  </select>
                </Field>
              ) : (
                <Field
                  label="Street address"
                  name="address"
                  required
                  minLength={6}
                  autoComplete="street-address"
                  hint="We'll call if it's further than 40 miles from a studio."
                  error={errors.address}
                />
              )}

              <fieldset
                className="field"
                data-invalid={errors.date ? "" : undefined}
                aria-describedby={errors.date ? "f-date-err" : undefined}
              >
                <legend>Day</legend>
                <div className="day-grid">
                  {days.map((d) => (
                    <label key={d.iso} className="chip day">
                      <input
                        type="radio"
                        name="date"
                        value={d.iso}
                        required
                        checked={date === d.iso}
                        onChange={() => (setDate(d.iso), setTime(""))}
                      />
                      {dayFmt.format(d.date)}
                    </label>
                  ))}
                </div>
                {errors.date && (
                  <p className="field-error" id="f-date-err">
                    {errors.date}
                  </p>
                )}
              </fieldset>

              <fieldset
                className="field"
                data-invalid={errors.time ? "" : undefined}
                aria-describedby={errors.time ? "f-time-err" : undefined}
              >
                <legend>Start time</legend>
                {date ? (
                  <div className="time-grid">
                    {testDrive.times.map((t) => {
                      const taken = booked(`${date}${t}${studio}${mode}`);
                      return (
                        <label
                          key={t}
                          className="chip time"
                          data-taken={taken ? "" : undefined}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={t}
                            required
                            disabled={taken}
                            checked={time === t}
                            onChange={() => setTime(t)}
                          />
                          <span className="num">{t}</span>
                          {taken && <span className="sr-only"> (booked)</span>}
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <p className="muted">Pick a day to see open times.</p>
                )}
                {errors.time && (
                  <p className="field-error" id="f-time-err">
                    {errors.time}
                  </p>
                )}
              </fieldset>

              <div className="form-row">
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
              </div>
              <div className="form-row">
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  error={errors.phone}
                />
              </div>
              <div
                className="field check-field"
                data-invalid={errors.licence ? "" : undefined}
              >
                <label className="check">
                  <input
                    type="checkbox"
                    name="licence"
                    required
                    aria-invalid={errors.licence ? true : undefined}
                    aria-describedby={
                      errors.licence ? "f-licence-err" : undefined
                    }
                  />
                  I hold a full driving licence and am 21 or older.
                </label>
                {errors.licence && (
                  <p className="field-error" id="f-licence-err">
                    {errors.licence}
                  </p>
                )}
              </div>
              <button
                className="btn btn-signal"
                type="submit"
                disabled={busy}
                aria-busy={busy}
              >
                {busy ? "Booking…" : "Book the drive"}
              </button>
              <p className="fine">
                Demo only: no booking is made and nothing is sent.
              </p>
            </form>
          )}
        </div>

        <aside className="booking-aside">
          <img
            src={photos.dawn.src}
            alt={photos.dawn.alt}
            width={photos.dawn.width}
            height={photos.dawn.height}
            loading="lazy"
          />
          <h2>What to expect</h2>
          <ul className="ticks">
            {testDrive.promises.map((p) => (
              <li key={p}>
                <Check aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          {place && mode === "studio" && (
            <div className="studio-card">
              <h3>
                {place.city} — {place.name}
              </h3>
              <p>{place.address}</p>
              <p className="muted">{place.hours}</p>
              <a href={`tel:${place.phone.replace(/\s/g, "")}`}>
                {place.phone}
              </a>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
