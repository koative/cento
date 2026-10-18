import { useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { shows, ticketTiers, type Show } from "../content";
import { Link } from "../router";
import { addLine } from "../lib/cart";
import {
  clock,
  longDate,
  money,
  monthDay,
  pause,
  validate,
} from "../lib/format";
import { ShowBill } from "../components/ShowBill";
import { ShowRow } from "../components/Cards";
import { Qty } from "../components/Qty";
import { Field, useErrors } from "../components/Field";

export function ShowPage({ show }: { show: Show }) {
  const more = shows
    .filter((s) => s.id !== show.id && !s.setlist && s.region === show.region)
    .slice(0, 4);

  return (
    <>
      <div className="wrap crumb">
        <Link to="/tour">
          <ArrowLeft aria-hidden="true" /> All tour dates
        </Link>
      </div>
      <section className="wrap show-grid">
        <ShowBill show={show} />
        <div className="show-info">
          <h1 className="display-lg">
            {show.city} <span className="h1-sub">{show.venue}</span>
          </h1>
          <p className="lede">{longDate(show.date)}</p>
          {show.note && <p className="show-note">{show.note}</p>}
          <dl className="facts">
            <div>
              <dt>Doors</dt>
              <dd>{clock(show.doors)}</dd>
            </div>
            <div>
              <dt>Riff on stage</dt>
              <dd>{clock(show.onstage)}</dd>
            </div>
            <div>
              <dt>Support</dt>
              <dd>{show.support}</dd>
            </div>
            <div>
              <dt>Ages</dt>
              <dd>{show.ages}</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{show.capacity.toLocaleString("en-US")}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{show.address}</dd>
            </div>
          </dl>

          {show.setlist ? (
            <Setlist show={show} />
          ) : show.status === "sold-out" ? (
            <Waitlist show={show} />
          ) : (
            <Tickets show={show} />
          )}
        </div>
      </section>

      {more.length > 0 && (
        <section className="section wrap" aria-labelledby="more">
          <h2 id="more" className="display-md">
            More {show.region} dates
          </h2>
          <ul className="ledger">
            {more.map((s) => (
              <ShowRow key={s.id} show={s} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function Tickets({ show }: { show: Show }) {
  const [tier, setTier] = useState(ticketTiers[0].id);
  const [qty, setQty] = useState(2);
  const [added, setAdded] = useState("");
  const chosen = ticketTiers.find((t) => t.id === tier)!;
  const unit = show.ga + chosen.extra;

  function add() {
    addLine(
      {
        key: `ticket|${show.id}|${tier}`,
        kind: "ticket",
        ref: show.id,
        name: `${show.city} — ${monthDay(show.date)}`,
        detail: `${chosen.name} · ${show.venue}`,
        unit,
      },
      qty,
    );
    setAdded(`${qty} × ${chosen.name} for ${show.city} added to your cart.`);
  }

  return (
    <div className="buy-box">
      <h2 className="box-head">Tickets</h2>
      {show.status === "low" && (
        <p className="warn">Fewer than 50 tickets left.</p>
      )}
      <fieldset className="options">
        <legend className="sr-only">Ticket type</legend>
        {ticketTiers.map((t) => (
          <label key={t.id} className="option">
            <input
              type="radio"
              name="tier"
              value={t.id}
              checked={tier === t.id}
              onChange={() => setTier(t.id)}
            />
            <span>
              <strong>{t.name}</strong>
              <span>{t.detail}</span>
            </span>
            <span className="option-price">{money(show.ga + t.extra)}</span>
          </label>
        ))}
      </fieldset>
      <div className="buy-row">
        <Qty value={qty} onChange={setQty} label="tickets" />
        <button type="button" className="btn btn-red" onClick={add}>
          Add tickets · {money(unit * qty)}
        </button>
      </div>
      <p aria-live="polite" className="added">
        {added && (
          <>
            {added} <Link to="/cart">View cart</Link>
          </>
        )}
      </p>
      <p className="quiet">
        Limit 8 per order. E-tickets are emailed; bring ID matching the name on
        the order.
      </p>
    </div>
  );
}

function Waitlist({ show }: { show: Show }) {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      email:
        "Enter an email like you@example.com so we can tell you when tickets come back.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    setState("done");
  }

  return (
    <div className="buy-box">
      <h2 className="box-head">Sold out</h2>
      <p>
        Returned tickets are offered to the waitlist first, at face value, in
        the order people joined.
      </p>
      {state === "done" ? (
        <p className="form-done" role="status">
          You're on the {show.city} waitlist. If a ticket comes back we'll email
          you and hold it for 24 hours.
        </p>
      ) : (
        <form
          className="inline-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
        >
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            error={errors.email}
          />
          <button className="btn btn-red" disabled={state === "sending"}>
            {state === "sending" ? "Joining…" : "Join the waitlist"}
          </button>
        </form>
      )}
    </div>
  );
}

function Setlist({ show }: { show: Show }) {
  return (
    <div className="buy-box setlist">
      <h2 className="box-head">What we played</h2>
      <ol>
        {show.setlist!.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="quiet">
        Thanks, {show.city.split(",")[0]}. Taped to the floor by June,
        transcribed the next morning.
      </p>
    </div>
  );
}
