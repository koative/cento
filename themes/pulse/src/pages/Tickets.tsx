import { Minus, Plus } from "lucide-react";
import { navigate } from "../router";
import {
  addOns,
  maxTickets,
  ticketNotes,
  tickets,
  type Ticket,
} from "../content";
import {
  money,
  setInstalments,
  setQty,
  ticketCount,
  toggleAddOn,
  useOrder,
} from "../lib/order";
import { PhaseBar } from "../components/PhaseBar";
import { OrderSummary } from "../components/OrderSummary";

export function Tickets() {
  const order = useOrder();
  const count = ticketCount(order);
  const full = count >= maxTickets;

  const band = (t: Ticket) => {
    const qty = order.qty[t.id] ?? 0;
    return (
      <li key={t.id} className="band" data-picked={qty ? "" : undefined}>
        <div className="band-main">
          <h3>{t.name}</h3>
          <p className="band-valid">{t.valid}</p>
          <ul>
            {t.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          {t.limited && <p className="band-limited">Limited to {t.limited}</p>}
        </div>
        <div className="band-buy">
          <p className="band-price">
            <strong className="num">{money(t.price)}</strong>
            {order.instalments && (
              <span className="num">
                or 3 × {money(Math.round((t.price / 3) * 100) / 100)}
              </span>
            )}
          </p>
          <div className="qty" role="group" aria-label={`${t.name} tickets`}>
            <button
              type="button"
              onClick={() => setQty(t.id, qty - 1)}
              disabled={!qty}
              aria-label={`One fewer ${t.name} ticket`}
            >
              <Minus aria-hidden="true" />
            </button>
            <output
              className="num"
              aria-live="polite"
              aria-label={`${qty} ${t.name}`}
            >
              {qty}
            </output>
            <button
              type="button"
              onClick={() => setQty(t.id, qty + 1)}
              disabled={full}
              aria-label={`One more ${t.name} ticket`}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Tickets</h1>
        <p>
          One wristband, every stage. Prices go up when each tier sells out, and
          there is never a booking fee.
        </p>
        <PhaseBar />
      </header>

      <div className="wrap tickets-layout">
        <div>
          <fieldset className="segmented">
            <legend>How do you want to pay?</legend>
            <label>
              <input
                type="radio"
                name="pay"
                checked={!order.instalments}
                onChange={() => setInstalments(false)}
              />
              <span>Pay in full</span>
            </label>
            <label>
              <input
                type="radio"
                name="pay"
                checked={order.instalments}
                onChange={() => setInstalments(true)}
              />
              <span>3 monthly instalments</span>
            </label>
          </fieldset>

          <section aria-labelledby="weekend-title" className="band-group">
            <h2 id="weekend-title">Weekend wristbands</h2>
            <ul className="bands">{tickets.filter((t) => !t.day).map(band)}</ul>
          </section>

          <section aria-labelledby="day-title" className="band-group">
            <h2 id="day-title">Day tickets</h2>
            <ul className="bands bands-day">
              {tickets.filter((t) => t.day).map(band)}
            </ul>
          </section>

          <section aria-labelledby="extras-title" className="band-group">
            <h2 id="extras-title">Extras</h2>
            <ul className="addons">
              {addOns.map((a) => (
                <li key={a.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={order.addOns.includes(a.id)}
                      onChange={() => toggleAddOn(a.id)}
                    />
                    <span className="addon-name">{a.name}</span>
                    <span className="num">{money(a.price)}</span>
                    <span className="addon-text">{a.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="order-panel" aria-labelledby="order-title">
          <h2 id="order-title">Your order</h2>
          {count ? (
            <OrderSummary order={order} />
          ) : (
            <p className="empty">
              Add a wristband to start. Up to {maxTickets} per order.
            </p>
          )}
          <p className="order-limit" aria-live="polite">
            {full ? `That's the ${maxTickets}-ticket limit for one order.` : ""}
          </p>
          <button
            type="button"
            className="btn btn-acid btn-wide"
            disabled={!count}
            onClick={() => navigate("/tickets/checkout")}
          >
            Continue to checkout
          </button>
          <ul className="order-notes">
            {ticketNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
