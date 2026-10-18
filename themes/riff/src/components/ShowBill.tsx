import type { Show } from "../content";
import { clock, toDate } from "../lib/format";

/** The night's letterpress show bill, set from the show data. */
export function ShowBill({ show }: { show: Show }) {
  const d = toDate(show.date);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return (
    <figure
      className="bill"
      aria-label={`Show poster: Riff at ${show.venue}, ${show.city}`}
    >
      <p className="bill-venue">{show.venue} presents</p>
      <p className="bill-band">Riff</p>
      <p className="bill-tour">Low Ceiling Tour</p>
      <p className="bill-with">with special guests {show.support}</p>
      <p className="bill-date">
        <span>{weekday}</span>
        <strong>
          {month} {d.getDate()}
        </strong>
      </p>
      <p className="bill-city">{show.city}</p>
      <p className="bill-small">
        Doors {clock(show.doors)} · {show.ages} · {show.address}
      </p>
      {(show.status === "sold-out" || show.setlist) && (
        <p className="bill-stamp" aria-hidden="true">
          {show.setlist ? "Played" : "Sold out"}
        </p>
      )}
    </figure>
  );
}
