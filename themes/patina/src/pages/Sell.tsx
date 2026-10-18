import { useRef, useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { brand, sell } from "../content";
import { Field, validate, type Errors } from "../components/Field";

const MAX_PHOTOS = 8;

export function Sell() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState("");
  const done = useRef<HTMLHeadingElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Errors = {};
    if (photos.length > MAX_PHOTOS)
      extra["s-photos"] =
        `That is ${photos.length} photographs — choose up to ${MAX_PHOTOS}: front, back, underside and any marks.`;
    const found = validate(
      form,
      {
        "s-kind": { missing: "Choose what kind of piece it is." },
        "s-desc": {
          missing:
            "Tell us a little about it — where it came from, any maker's label, what condition it is in.",
        },
        "s-photos": {
          missing:
            "Attach at least one photograph. We cannot make an offer without seeing it.",
        },
        "s-name": { missing: "Add your name." },
        "s-email": {
          missing: "Add an email for our offer.",
          invalid:
            "That email is missing something — check the @ and the domain.",
        },
        "s-zip": {
          missing: "Add the ZIP code where the piece is.",
          invalid: "Use a five-digit ZIP code, like 02911.",
        },
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setName(String(new FormData(form).get("s-name")).split(" ")[0]);
    setState("sending");
    setTimeout(() => {
      setState("sent");
      requestAnimationFrame(() => done.current?.focus());
    }, 1000);
  }

  return (
    <div className="page sell">
      <header className="page-head page-head-split">
        <div>
          <h1>{sell.title}</h1>
          <p className="lead">{sell.intro}</p>
        </div>
        <figure>
          <img
            src={sell.image.src}
            alt={sell.image.alt}
            width={sell.image.w}
            height={sell.image.h}
          />
          <figcaption>{sell.imageCaption}</figcaption>
        </figure>
      </header>

      <section className="section buy-pass" aria-label="What we buy">
        <div>
          <h2>Gladly</h2>
          <ul className="tick-list">
            {sell.buy.map((b) => (
              <li key={b}>
                <Check size={18} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Not for us</h2>
          <ul className="tick-list tick-list-no">
            {sell.pass.map((b) => (
              <li key={b}>
                <X size={18} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section sell-form-wrap" aria-labelledby="sell-form-h">
        <div aria-live="polite">
          {state === "sent" ? (
            <div className="success-panel">
              <Check size={28} aria-hidden="true" />
              <h2 id="sell-form-h" tabIndex={-1} ref={done}>
                Thank you{name ? `, ${name}` : ""}. Daniel has your photographs.
              </h2>
              <p>
                You will have a fixed offer, or an honest no, by email within
                three working days. If you would rather talk it through, call{" "}
                {brand.phone}.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => (setState("idle"), setPhotos([]))}
              >
                Offer us another piece
              </button>
            </div>
          ) : (
            <form className="sell-form" noValidate onSubmit={submit}>
              <h2 id="sell-form-h">Tell us about the piece</h2>
              <fieldset>
                <legend>The piece</legend>
                <Field
                  as="select"
                  label="What is it?"
                  name="s-kind"
                  required
                  defaultValue=""
                  error={errors["s-kind"]}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {sell.kinds.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </Field>
                <Field
                  as="textarea"
                  label="About it"
                  name="s-desc"
                  rows={4}
                  required
                  hint="How you came by it, any label or stamp, roughly how old you think it is, what is wrong with it."
                  error={errors["s-desc"]}
                />
                <div className="field-row field-row-3">
                  <Field
                    label="Width (in)"
                    name="s-w"
                    type="number"
                    inputMode="decimal"
                    min={1}
                  />
                  <Field
                    label="Depth (in)"
                    name="s-d"
                    type="number"
                    inputMode="decimal"
                    min={1}
                  />
                  <Field
                    label="Height (in)"
                    name="s-h"
                    type="number"
                    inputMode="decimal"
                    min={1}
                  />
                </div>
                <Field
                  label="Photographs"
                  name="s-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  required
                  hint={
                    photos.length
                      ? `${photos.length} chosen: ${photos.join(", ")}`
                      : `Up to ${MAX_PHOTOS}. Front, back, underside and any marks.`
                  }
                  error={errors["s-photos"]}
                  onChange={(e) =>
                    setPhotos(
                      [...(e.currentTarget.files ?? [])].map((f) => f.name),
                    )
                  }
                />
                <Field
                  label="Hoping for (optional)"
                  name="s-price"
                  type="text"
                  inputMode="numeric"
                  placeholder="$"
                  hint="Leave blank and we will simply make an offer."
                />
              </fieldset>
              <fieldset>
                <legend>You</legend>
                <div className="field-row">
                  <Field
                    label="Name"
                    name="s-name"
                    autoComplete="name"
                    required
                    error={errors["s-name"]}
                  />
                  <Field
                    label="Email"
                    name="s-email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors["s-email"]}
                  />
                </div>
                <div className="field-row">
                  <Field
                    label="Phone (optional)"
                    name="s-phone"
                    type="tel"
                    autoComplete="tel"
                  />
                  <Field
                    label="ZIP code of the piece"
                    name="s-zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    pattern="\d{5}"
                    required
                    error={errors["s-zip"]}
                  />
                </div>
                <label className="check">
                  <input type="checkbox" name="s-collect" defaultChecked />
                  <span>We would need you to collect it</span>
                </label>
              </fieldset>
              <button
                type="submit"
                className="btn"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? "Sending photographs…"
                  : "Send for an offer"}
              </button>
              <p className="quiet">
                Demo form — nothing is uploaded or sent anywhere.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
