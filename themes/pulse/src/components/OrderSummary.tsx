import {
  chosenAddOns,
  lines,
  money,
  ticketCount,
  total,
  type Order,
} from "../lib/order";

/** Itemised order with total and, when chosen, the instalment split. */
export function OrderSummary({ order }: { order: Order }) {
  const sum = total(order);
  const count = ticketCount(order);
  return (
    <div className="summary">
      <ul>
        {lines(order).map((l) => (
          <li key={l.ticket.id}>
            <span>
              {l.qty} × {l.ticket.name}
            </span>
            <span className="num">{money(l.total)}</span>
          </li>
        ))}
        {count > 0 &&
          chosenAddOns(order).map((a) => (
            <li key={a.id}>
              <span>{a.name}</span>
              <span className="num">{money(a.price)}</span>
            </li>
          ))}
        <li>
          <span>Booking fee</span>
          <span className="num">{money(0)}</span>
        </li>
      </ul>
      <p className="summary-total">
        <span>Total</span>
        <strong className="num">{money(sum)}</strong>
      </p>
      {order.instalments && sum > 0 && (
        <p className="summary-split">
          3 ×{" "}
          <span className="num">
            {money(Math.round((sum / 3) * 100) / 100)}
          </span>{" "}
          — today, in 30 days and in 60 days
        </p>
      )}
    </div>
  );
}
