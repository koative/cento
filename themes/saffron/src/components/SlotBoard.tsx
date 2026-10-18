import { Fragment, type CSSProperties } from "react";
import { Leaf } from "lucide-react";
import { deliveryWindows } from "../content";
import { money, setSlot, useBasket } from "../lib/cart";
import {
  bookable,
  cutoffLabel,
  findSlot,
  slotLabel,
  week,
  type Slot,
} from "../lib/slots";

function cellNote(s: Slot) {
  if (s.status === "closed") return "Closed";
  if (s.status === "full") return "Full";
  if (s.green) return "Green";
  return s.status === "few" ? `${s.left} left` : "Open";
}

/** The delivery board: every two-hour window for the coming days, priced, as a native radio group. */
export function SlotBoard({
  days = 7,
  legend = "Delivery slot",
}: {
  days?: number;
  legend?: string;
}) {
  const { slot } = useBasket();
  const board = week(new Date(), days);
  const chosen = findSlot(slot);

  return (
    <fieldset className="slot-board">
      <legend className="visually-hidden">{legend}</legend>
      <div className="board-scroll" tabIndex={-1}>
        <div className="board" style={{ "--days": days } as CSSProperties}>
          <span className="board-corner" aria-hidden="true" />
          {board.map((d) => (
            <span
              className="board-day"
              key={d.date.toDateString()}
              aria-hidden="true"
            >
              {d.date.toLocaleDateString("en-US", { weekday: "short" })}
              <b>{d.date.getDate()}</b>
            </span>
          ))}
          {deliveryWindows.map((w, wi) => (
            <Fragment key={w.id}>
              <span className="board-time" aria-hidden="true">
                {w.label}
              </span>
              {board.map((d) => {
                const s = d.slots[wi];
                const open = bookable(s);
                return (
                  <label
                    className="slot"
                    key={s.id}
                    data-status={s.status}
                    data-green={(open && s.green) || undefined}
                  >
                    <input
                      type="radio"
                      name="delivery-slot"
                      value={s.id}
                      checked={chosen?.id === s.id}
                      disabled={!open}
                      onChange={() => setSlot(s.id)}
                    />
                    <span className="visually-hidden">
                      {slotLabel(s)},{" "}
                      {open ? money(s.fee) : cellNote(s).toLowerCase()}
                    </span>
                    <span className="slot-fee" aria-hidden="true">
                      {open ? money(s.fee) : "—"}
                    </span>
                    <span className="slot-note">
                      {open && s.green && <Leaf size={13} aria-hidden="true" />}
                      {cellNote(s)}
                    </span>
                  </label>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
      <p className="board-ticket" aria-live="polite">
        {chosen ? (
          <>
            <strong>{slotLabel(chosen)}</strong>
            <span>
              {money(chosen.fee)} delivery{chosen.green ? " (green slot)" : ""}{" "}
              · held until {cutoffLabel(chosen)}
            </span>
          </>
        ) : (
          <>
            <strong>No slot chosen yet</strong>
            <span>Choose any priced window. We hold it while you shop.</span>
          </>
        )}
      </p>
    </fieldset>
  );
}
