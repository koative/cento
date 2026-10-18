import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { rooms } from "../content";
import { money } from "../lib/quote";
import { Link } from "../router";

const typical = Object.fromEntries(
  rooms.flatMap((r) => r.items.map((i) => [i.id, i.typical])),
);
const subtotal = (counts: Record<string, number>, roomId: string) =>
  rooms
    .find((r) => r.id === roomId)!
    .items.reduce((s, i) => s + i.each * counts[i.id], 0);

/**
 * Room-by-room replacement-cost counter. Without `onUse` it links into the quote with the total;
 * inside the quote it hands the rounded total back instead.
 */
export function ContentsCounter({
  onUse,
}: {
  onUse?: (total: number) => void;
}) {
  const [counts, setCounts] = useState<Record<string, number>>(typical);
  const [roomId, setRoomId] = useState(rooms[0].id);
  const room = rooms.find((r) => r.id === roomId)!;
  const totals = rooms.map((r) => ({ ...r, value: subtotal(counts, r.id) }));
  const total = totals.reduce((s, r) => s + r.value, 0);
  const rounded = Math.max(5000, Math.ceil(total / 1000) * 1000);
  const step = (id: string, by: number) =>
    setCounts((c) => ({ ...c, [id]: Math.min(20, Math.max(0, c[id] + by)) }));

  return (
    <div className="counter">
      <div className="counter-rooms" role="group" aria-label="Room">
        {totals.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={r.id === roomId}
            onClick={() => setRoomId(r.id)}
          >
            <span>{r.name}</span>
            <span className="num">{money(r.value)}</span>
          </button>
        ))}
      </div>

      <ul className="counter-items" aria-label={`${room.name} items`}>
        {room.items.map((item) => (
          <li key={item.id}>
            <span className="counter-label">
              {item.label}
              <small>{money(item.each)} each</small>
            </span>
            <span className="stepper">
              <button
                type="button"
                aria-label={`One fewer: ${item.label}`}
                disabled={!counts[item.id]}
                onClick={() => step(item.id, -1)}
              >
                <Minus aria-hidden="true" size={16} />
              </button>
              <output aria-label={`${item.label} count`}>
                {counts[item.id]}
              </output>
              <button
                type="button"
                aria-label={`One more: ${item.label}`}
                disabled={counts[item.id] >= 20}
                onClick={() => step(item.id, 1)}
              >
                <Plus aria-hidden="true" size={16} />
              </button>
            </span>
            <span className="num counter-sub">
              {money(item.each * counts[item.id])}
            </span>
          </li>
        ))}
      </ul>

      <div className="counter-bar" aria-hidden="true">
        {totals.map((r) => (
          <span
            key={r.id}
            data-active={r.id === roomId ? "" : undefined}
            style={{ flexGrow: r.value || 0.0001 }}
          />
        ))}
      </div>

      <div className="counter-foot">
        <p aria-live="polite">
          <span>Replacing everything, new</span>
          <strong className="num" key={total}>
            {money(total)}
          </strong>
        </p>
        {onUse ? (
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => onUse(rounded)}
          >
            Use {money(rounded)} as my limit
          </button>
        ) : (
          <Link to={`/quote?contents=${rounded}`} className="btn btn-primary">
            Quote with {money(rounded)} of cover
          </Link>
        )}
      </div>
    </div>
  );
}
