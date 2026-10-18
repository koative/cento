import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { events, images, wines, type WineEvent } from "../content";
import { addLine, money, useCart } from "../lib/cart";
import { eventDate } from "../lib/format";
import { Bottle } from "../components/Bottle";
import { Qty } from "../components/Qty";

export function EventPage({ event }: { event: WineEvent }) {
  const cart = useCart();
  const inCart =
    cart.find((l) => l.kind === "ticket" && l.id === event.id)?.qty ?? 0;
  const free = event.left - inCart;
  const [seats, setSeats] = useState(Math.min(2, Math.max(1, free)));
  const [added, setAdded] = useState("");
  const pours = event.pours.map((id) => wines.find((w) => w.id === id)!);
  const others = events.filter((e) => e.id !== event.id).slice(0, 3);
  const photo =
    event.kind === "Winemaker night" || event.kind === "Supper"
      ? images.vigneron
      : images.tasting;

  function add() {
    addLine(
      {
        kind: "ticket",
        id: event.id,
        name: event.title,
        detail: `${eventDate(event.date)}, ${event.time}`,
        unit: event.price,
        qty: seats,
      },
      event.left,
    );
    setAdded(
      `${seats} ${seats === 1 ? "seat" : "seats"} for ${event.title} added to your case.`,
    );
  }

  return (
    <div className="page event-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/tastings">Tastings</Link> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{event.title}</span>
      </nav>

      <div className="event-main">
        <div>
          <p className="event-kind">
            {event.kind} · hosted by {event.host}
          </p>
          <h1>{event.title}</h1>
          <p className="lead">{event.summary}</p>
          <img
            src={photo}
            alt=""
            width={1400}
            height={1050}
            className="event-photo"
          />
          <div className="prose">
            {event.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <aside className="ticket" aria-labelledby="ticket-title">
          <h2 id="ticket-title">
            {eventDate(event.date, "long")}, {event.time}
          </h2>
          <dl className="specs">
            <div>
              <dt>Length</dt>
              <dd>{event.length}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd className="num">{money(event.price)} per seat</dd>
            </div>
            <div>
              <dt>Seats</dt>
              <dd>
                {event.left} of {event.seats} left
              </dd>
            </div>
          </dl>
          <h3>Included</h3>
          <ul className="ticks">
            {event.includes.map((i) => (
              <li key={i}>
                <Check size={16} aria-hidden="true" /> {i}
              </li>
            ))}
          </ul>
          {free > 0 ? (
            <form
              className="buy"
              onSubmit={(e) => {
                e.preventDefault();
                add();
              }}
            >
              <div className="buy-row">
                <Qty
                  value={Math.min(seats, free)}
                  onChange={(n) => (setSeats(n), setAdded(""))}
                  label="seats"
                  max={Math.min(8, free)}
                />
                <button type="submit" className="btn">
                  Reserve ·{" "}
                  <span className="num">
                    {money(event.price * Math.min(seats, free))}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <p className="sold-out">All remaining seats are in your case.</p>
          )}
          <p className="buy-status" aria-live="polite">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View your case</Link>
              </>
            )}
          </p>
          <p className="quiet">
            Full refund up to 48 hours before. After that, send a friend in your
            place.
          </p>
        </aside>
      </div>

      <section className="section">
        <h2>On the table</h2>
        <ul className="pour-list">
          {pours.map((w) => (
            <li key={w.id}>
              <Bottle wine={w} className="bottle-mini" />
              <div>
                <Link to={"/wines/" + w.id}>{w.name}</Link>
                <p>
                  {w.producer} · {w.colour}
                </p>
              </div>
            </li>
          ))}
          <li className="pour-more">
            <p>Plus bottles we keep back for the night.</p>
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Also coming up</h2>
          <Link to="/tastings" className="text-link">
            All tastings <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="mini-events">
          {others.map((e) => (
            <li key={e.id}>
              <p className="event-kind">
                {eventDate(e.date)} · {e.kind}
              </p>
              <Link to={"/tastings/" + e.id}>{e.title}</Link>
              <span className="num">{money(e.price)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
