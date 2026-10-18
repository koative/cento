import { useRef, useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Link } from "../router";
import {
  artistById,
  artists,
  bookingPage,
  designById,
  flash,
  placementById,
  placements,
  rates,
} from "../content";
import { estimate, hoursLabel, money, routeQuery } from "../lib/ink";
import { Field, messageFor, useErrors, type Errors } from "../components/Field";
import { FlashArt } from "../components/FlashArt";

type Kind = "flash" | "custom" | "touch-up";

const kinds: { id: Kind; label: string; note: string }[] = [
  { id: "flash", label: "A flash design", note: "Fixed price, from the wall" },
  { id: "custom", label: "A custom piece", note: "Drawn for you, $170 / hour" },
  { id: "touch-up", label: "A touch-up", note: "Free within three months" },
];

const customMessages: Record<string, string> = {
  adult:
    "Confirm you are 18 or over — we can't tattoo anyone younger, even with a parent.",
  policy: "Tick to confirm you've read the deposit and rescheduling policy.",
};

export function Book() {
  const [initial] = useState(() => {
    const q = routeQuery();
    const design = designById(q.get("design") ?? "");
    const kind = q.get("type");
    return {
      kind: (design
        ? "flash"
        : kind === "custom" || kind === "touch-up"
          ? kind
          : "flash") as Kind,
      design: design && design.availability !== "claimed" ? design.id : "orbit",
      size: Number(q.get("size")) || design?.minCm || 6,
      placement: placementById(q.get("placement") ?? "")?.id ?? "",
      artist: artistById(q.get("artist") ?? "")?.id ?? "",
    };
  });
  const [kind, setKind] = useState<Kind>(initial.kind);
  const [designId, setDesignId] = useState<string>(initial.design);
  const [size, setSize] = useState(String(initial.size));
  const [placement, setPlacement] = useState(initial.placement);
  const [artist, setArtist] = useState(initial.artist);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [reference, setReference] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const form = useRef<HTMLFormElement>(null);

  const design = designById(designId);
  const flashOptions = flash.filter((d) => d.availability !== "claimed");
  const chosenArtist = artistById(
    kind === "flash" && design ? design.artist : artist,
  );
  const sizeCm = design
    ? Math.min(
        Math.max(Number(size) || design.minCm, design.minCm),
        design.maxCm,
      )
    : 0;
  const est = kind === "flash" && design ? estimate(design, sizeCm) : null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const next: Errors = {};
    let first: HTMLElement | null = null;
    for (const el of Array.from(
      f.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea"),
    )) {
      if (!el.name || el.checkValidity() || next[el.name]) continue;
      const label = el.labels?.[0]?.textContent?.trim() ?? el.name;
      next[el.name] = customMessages[el.name] ?? messageFor(el, label);
      first ??= el;
    }
    const days = f.querySelectorAll<HTMLInputElement>('input[name="days"]');
    if (![...days].some((d) => d.checked)) {
      next.days = "Pick at least one day you could come in.";
      first ??= days[0];
    }
    setErrors(next);
    if (first) {
      first.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setReference(`INK-${String(Date.now()).slice(-5)}`);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  const onDaysChange = () => {
    if (
      errors.days &&
      form.current?.querySelector('input[name="days"]:checked')
    ) {
      setErrors(({ days: _, ...rest }) => rest);
    }
  };

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{bookingPage.title}</h1>
        <p className="lede">{bookingPage.intro}</p>
      </header>

      <div className="wrap" aria-live="polite">
        {status === "done" && (
          <section className="success" aria-labelledby="success-title">
            <Check aria-hidden="true" className="success-icon" />
            <h2 id="success-title">{bookingPage.successTitle}</h2>
            <p>
              Reference <strong className="tabular">{reference}</strong>.{" "}
              {bookingPage.successText}
            </p>
            <dl className="spec compact">
              <div>
                <dt>Request</dt>
                <dd>
                  {kind === "flash" && design
                    ? `${design.name}, ${size} cm`
                    : kinds.find((k) => k.id === kind)?.label}
                </dd>
              </div>
              <div>
                <dt>Placement</dt>
                <dd>{placementById(placement)?.label}</dd>
              </div>
              <div>
                <dt>Artist</dt>
                <dd>{chosenArtist?.name ?? "First available"}</dd>
              </div>
            </dl>
            <p className="quiet">{bookingPage.demoNote}</p>
            <div className="actions">
              <Link to="/aftercare" className="btn btn-ink">
                Read aftercare before your session
              </Link>
              <Link to="/flash" className="btn btn-line">
                Back to the flash book
              </Link>
            </div>
          </section>
        )}
      </div>

      {status !== "done" && (
        <div className="wrap book-grid">
          <form
            ref={form}
            className="book-form"
            noValidate
            onSubmit={onSubmit}
            onChange={onChange}
            aria-busy={status === "sending"}
          >
            <fieldset className="kind">
              <legend>What are you booking?</legend>
              <div className="kind-options">
                {kinds.map((k) => (
                  <label key={k.id} className="kind-option">
                    <input
                      type="radio"
                      name="kind"
                      value={k.id}
                      checked={kind === k.id}
                      onChange={() => setKind(k.id)}
                    />
                    <span className="kind-label">{k.label}</span>
                    <span className="kind-note">{k.note}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {kind === "flash" && (
              <div className="form-row">
                <Field label="Flash design" name="design" error={errors.design}>
                  <select
                    value={designId}
                    onChange={(e) => setDesignId(e.target.value)}
                    required
                  >
                    {flashOptions.map((d) => (
                      <option key={d.id} value={d.id}>
                        No. {d.no} — {d.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Size (cm)"
                  name="size"
                  type="number"
                  inputMode="decimal"
                  min={design?.minCm}
                  max={design?.maxCm}
                  step={0.5}
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  hint={
                    design
                      ? `${design.name} is drawn for ${design.minCm}–${design.maxCm} cm.`
                      : undefined
                  }
                  error={errors.size}
                />
              </div>
            )}

            {kind === "custom" && (
              <Field
                label="Your idea"
                name="idea"
                hint="What it is, what it means to you, and any references you will send. At least 30 characters."
                error={errors.idea}
              >
                <textarea rows={5} required minLength={30} />
              </Field>
            )}

            {kind === "touch-up" && (
              <Field
                label="Which tattoo, and when was it done?"
                name="touchup"
                hint="Artist, design and session date."
                error={errors.touchup}
              >
                <textarea rows={3} required minLength={10} />
              </Field>
            )}

            <div className="form-row">
              <Field
                label="Placement"
                name="placement"
                error={errors.placement}
              >
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  required
                >
                  <option value="">Choose a placement</option>
                  {placements.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>
              {kind === "flash" ? (
                <div className="field">
                  <span className="field-static-label">Artist</span>
                  <p className="field-static">
                    {chosenArtist?.name} — flash is tattooed by the artist who
                    drew it.
                  </p>
                </div>
              ) : (
                <Field label="Artist" name="artist">
                  <select
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  >
                    <option value="">No preference — first available</option>
                    {artists.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} {a.books === "waitlist" ? "(waitlist)" : ""}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </div>

            <fieldset
              className="days"
              data-invalid={errors.days ? "" : undefined}
              aria-describedby={errors.days ? "days-err" : undefined}
            >
              <legend>Days you could come in</legend>
              <div className="chips">
                {bookingPage.days.map((d) => (
                  <label key={d} className="chip">
                    <input
                      type="checkbox"
                      name="days"
                      value={d}
                      onChange={onDaysChange}
                    />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
              {errors.days && (
                <p className="field-error" id="days-err">
                  {errors.days}
                </p>
              )}
            </fieldset>

            <div className="form-row">
              <Field
                label="Full name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
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
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              pattern="[+0-9 ()\-]{7,}"
              hint="For a text if a date opens up earlier."
              error={errors.phone}
            />

            <div className="consents">
              <label
                className="check"
                data-invalid={errors.adult ? "" : undefined}
              >
                <input
                  type="checkbox"
                  name="adult"
                  required
                  aria-describedby={errors.adult ? "adult-err" : undefined}
                  aria-invalid={errors.adult ? true : undefined}
                />
                <span>I am 18 or over and will bring photo ID.</span>
              </label>
              {errors.adult && (
                <p className="field-error" id="adult-err">
                  {errors.adult}
                </p>
              )}
              <label
                className="check"
                data-invalid={errors.policy ? "" : undefined}
              >
                <input
                  type="checkbox"
                  name="policy"
                  required
                  aria-describedby={errors.policy ? "policy-err" : undefined}
                  aria-invalid={errors.policy ? true : undefined}
                />
                <span>
                  I've read the{" "}
                  <Link to="/faq">deposit and rescheduling policy</Link>.
                </span>
              </label>
              {errors.policy && (
                <p className="field-error" id="policy-err">
                  {errors.policy}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-red btn-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle aria-hidden="true" className="spin" /> Sending
                  request…
                </>
              ) : (
                "Send booking request"
              )}
            </button>
            <p className="quiet">{bookingPage.demoNote}</p>
          </form>

          <aside className="book-summary" aria-label="Request summary">
            {kind === "flash" && design ? (
              <>
                <div className="summary-sheet">
                  <span className="flash-no">No. {design.no}</span>
                  <FlashArt art={design.id} />
                </div>
                <h2>{design.name}</h2>
              </>
            ) : (
              <h2>{kinds.find((k) => k.id === kind)?.label}</h2>
            )}
            <dl className="spec compact">
              {est && (
                <>
                  <div>
                    <dt>Estimate</dt>
                    <dd>{money(est.price)}</dd>
                  </div>
                  <div>
                    <dt>Sit time, approx.</dt>
                    <dd>{hoursLabel(est.hours)}</dd>
                  </div>
                </>
              )}
              {kind === "custom" && (
                <div>
                  <dt>Rate</dt>
                  <dd>{money(rates.hourly)} / hour</dd>
                </div>
              )}
              <div>
                <dt>Placement</dt>
                <dd>{placementById(placement)?.label ?? "Not chosen yet"}</dd>
              </div>
              <div>
                <dt>Artist</dt>
                <dd>{chosenArtist?.name ?? "First available"}</dd>
              </div>
              <div>
                <dt>Deposit</dt>
                <dd>
                  {kind === "touch-up"
                    ? "None"
                    : `${money(rates.deposit)}, off the final price`}
                </dd>
              </div>
            </dl>
            {chosenArtist && (
              <p className="quiet">{chosenArtist.nextOpening}.</p>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
