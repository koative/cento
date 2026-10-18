import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "../router";
import { brand, drops, raffle } from "../content";
import { addEntry, useEntries, withdraw, type Entry } from "../lib/raffle";
import {
  at,
  dayLabel,
  drawAt,
  openRaffles,
  productsIn,
  timeLabel,
  useNow,
} from "../lib/time";
import { money } from "../lib/cart";
import { Countdown } from "../components/Countdown";
import { Field, Select, validate, type Errors } from "../components/Field";
import { Flat } from "../components/Flat";
import { Ticket } from "../components/Ticket";

const messages = {
  size: { missing: "Choose the size you want if you win." },
  name: {
    missing:
      "Enter your full name as it appears on your ID; we check it at pickup.",
  },
  email: {
    missing: "Enter an email so we can tell you if you won.",
    invalid: "Check the email: it needs an @ and a domain like example.com.",
  },
  phone: {
    missing: "Enter a phone number for the winner's text.",
    invalid: "Use 7 to 20 digits; spaces, brackets, + and - are fine.",
  },
  postcode: {
    missing: "Enter your ZIP or postcode.",
    invalid: "Use 3 to 10 letters, numbers or spaces for the ZIP or postcode.",
  },
  agree: { missing: "Tick the box to confirm you have read the raffle rules." },
};

export function Raffle() {
  const now = useNow();
  const open = openRaffles(now);
  const entries = useEntries();
  const [dropId, setDropId] = useState(open[0]?.id ?? "");
  const drop = open.find((d) => d.id === dropId) ?? open[0];
  const pieces = drop ? productsIn(drop) : [];
  const [productId, setProductId] = useState(pieces[0]?.id ?? "");
  const product = pieces.find((p) => p.id === productId) ?? pieces[0];
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [issued, setIssued] = useState<Entry | null>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const existing = drop && entries.find((e) => e.drop === drop.id);

  useEffect(() => {
    if (issued) done.current?.focus();
  }, [issued]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length || !drop || !product) return;
    const value = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    setBusy(true);
    setTimeout(() => {
      setIssued(
        addEntry({
          drop: drop.id,
          product: product.id,
          size: value("size"),
          name: value("name"),
          email: value("email"),
        }),
      );
      setBusy(false);
    }, 900);
  }

  const upcomingRaffle = drops.find(
    (d) => d.mode === "raffle" && at(d.date) > now,
  );

  return (
    <div className="page raffle-page">
      <header className="page-head">
        <h1>{raffle.title}</h1>
        <p className="lead">{raffle.intro}</p>
      </header>

      {!drop ? (
        <div className="empty-state">
          <p>
            No raffle is open right now.
            {upcomingRaffle
              ? ` The next one, ${upcomingRaffle.name}, is drawn ${dayLabel(drawAt(upcomingRaffle))}.`
              : " Raffles open on the Monday a raffle drop is posted."}
          </p>
          <Link to="/drops" className="btn">
            Drops calendar <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      ) : issued ? (
        <section className="issued" aria-live="polite">
          <h2 ref={done} tabIndex={-1}>
            You are in. Keep your stub.
          </h2>
          <p>
            Ticket No. {issued.ticket} for {drop.name}. We will email{" "}
            {issued.email} on {dayLabel(drawAt(drop))} after the{" "}
            {timeLabel(drawAt(drop))} draw, win or lose.
          </p>
          <div className="ticket-slot">
            <Ticket drop={drop} entry={issued} issued />
          </div>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIssued(null)}
            >
              Back to the entry form
            </button>
            <Link to={`/drops/${drop.id}`} className="btn">
              About {drop.name} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="raffle-layout">
          <form
            className="raffle-form"
            noValidate
            onSubmit={submit}
            aria-busy={busy}
          >
            {open.length > 1 && (
              <Select
                label="Raffle"
                name="drop"
                value={drop.id}
                onChange={(e) => setDropId(e.target.value)}
              >
                {open.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Select>
            )}

            <fieldset className="piece-picker">
              <legend>The piece you want</legend>
              {pieces.map((p) => (
                <label key={p.id} className="piece">
                  <input
                    type="radio"
                    name="product"
                    value={p.id}
                    checked={product?.id === p.id}
                    onChange={() => setProductId(p.id)}
                  />
                  <span className="plate">
                    <Flat product={p} />
                  </span>
                  <span className="piece-name">{p.name}</span>
                  <span className="num">{money(p.price)}</span>
                </label>
              ))}
            </fieldset>

            <div className="field-row">
              <Select
                label="Size"
                name="size"
                required
                defaultValue=""
                key={product?.id}
                error={errors.size}
              >
                <option value="" disabled>
                  Choose a size
                </option>
                {product?.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
              <Field
                label="ZIP or postcode"
                name="postcode"
                required
                autoComplete="postal-code"
                pattern="[A-Za-z0-9 \-]{3,10}"
                error={errors.postcode}
              />
            </div>
            <Field
              label="Full name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
              hint="Must match your ID if you collect in store."
            />
            <div className="field-row">
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[\+0-9 \(\)\-]{7,20}"
                error={errors.phone}
              />
            </div>

            <fieldset className="radio-row">
              <legend>If you win</legend>
              <label>
                <input type="radio" name="fulfil" value="ship" defaultChecked />{" "}
                Ship it to me
              </label>
              <label>
                <input type="radio" name="fulfil" value="collect" /> Collect at{" "}
                {brand.address[0]}
              </label>
            </fieldset>

            <div
              className="field check"
              data-invalid={errors.agree ? "" : undefined}
            >
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  required
                  aria-invalid={errors.agree ? true : undefined}
                  aria-describedby={errors.agree ? "f-agree-error" : undefined}
                />
                I have read the rules: one entry per person, and duplicates void
                every entry.
              </label>
              {errors.agree && (
                <p className="field-error" id="f-agree-error">
                  {errors.agree}
                </p>
              )}
            </div>

            {existing && (
              <p className="notice">
                You already hold ticket No. {existing.ticket} for this raffle.
                Entering again replaces it.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-signal btn-wide"
              disabled={busy}
            >
              {busy ? (
                <>
                  <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                  Printing your ticket…
                </>
              ) : (
                <>Enter the {drop.name} raffle</>
              )}
            </button>
            {Object.keys(errors).length > 0 && (
              <p className="form-error" role="alert">
                {Object.keys(errors).length === 1
                  ? "One field needs a fix"
                  : `${Object.keys(errors).length} fields need a fix`}{" "}
                before we can print your ticket.
              </p>
            )}
            <p className="muted small">{raffle.note}</p>
          </form>

          <aside className="raffle-side" aria-labelledby="h-rules">
            <h2 id="h-rules">{drop.name}</h2>
            <Countdown
              to={at(drop.raffleCloses!)}
              label="Entries close in"
              size="m"
            />
            <p className="muted">
              Entries close {dayLabel(at(drop.raffleCloses!))} at{" "}
              {timeLabel(at(drop.raffleCloses!))} {brand.tzLabel}. Draw{" "}
              {dayLabel(drawAt(drop))}, {timeLabel(drawAt(drop))}.
            </p>
            <h3>The rules</h3>
            <ol className="rules">
              {raffle.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </aside>
        </div>
      )}

      {entries.length > 0 && (
        <section className="section my-tickets" aria-labelledby="h-mine">
          <h2 id="h-mine">Your tickets</h2>
          <ul>
            {entries.map((e) => {
              const d = drops.find((x) => x.id === e.drop);
              return (
                <li key={e.ticket}>
                  <span className="num">No. {e.ticket}</span>
                  <span>{d?.name}</span>
                  <span>Size {e.size}</span>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => withdraw(e.ticket)}
                  >
                    Withdraw entry
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
