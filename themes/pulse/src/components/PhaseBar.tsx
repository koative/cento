import { ticketPhases } from "../content";

/** Ticket tiers as a single strip: sold-out, selling, still to come. */
export function PhaseBar() {
  return (
    <ol className="phases">
      {ticketPhases.map((p) => (
        <li
          key={p.name}
          data-state={p.sold >= 1 ? "gone" : p.sold > 0 ? "live" : "next"}
        >
          <span
            className="phase-fill"
            style={{ width: `${p.sold * 100}%` }}
            aria-hidden="true"
          />
          <strong>{p.name}</strong>
          <span>
            {p.status}
            {p.sold > 0 && p.sold < 1
              ? ` · ${Math.round(p.sold * 100)}% sold`
              : ""}
          </span>
        </li>
      ))}
    </ol>
  );
}
