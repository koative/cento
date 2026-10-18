import { Link } from "../router";
import { sites, type Flight } from "../content";
import { countdown, day, num, useNow, vehicleName } from "../lib/format";

export function FlightTable({
  rows,
  caption,
}: {
  rows: Flight[];
  caption: string;
}) {
  return (
    <div className="table-wrap">
      <table className="flights tnum">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">NET date</th>
            <th scope="col">Flight</th>
            <th scope="col">Vehicle</th>
            <th scope="col">Orbit</th>
            <th scope="col">Site</th>
            <th scope="col">Status</th>
            <th scope="col">Open</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.id}>
              <td data-label="NET">{day(f.date)}</td>
              <th scope="row" data-label="Flight">
                {f.mission ? (
                  <Link to={`/missions/${f.mission}`}>{f.name}</Link>
                ) : (
                  f.name
                )}
                <span className="sub">
                  {f.id.toUpperCase()} · {f.type} · {f.customer}
                </span>
              </th>
              <td data-label="Vehicle">{vehicleName(f.vehicle)}</td>
              <td data-label="Orbit">{f.orbit}</td>
              <td data-label="Site">{sites[f.site].short}</td>
              <td data-label="Status">
                <span className="status" data-status={f.status}>
                  {f.status}
                </span>
              </td>
              <td data-label="Open">
                {f.openKg ? `${num(f.openKg)} kg` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** T-minus clock to `iso`; the visible digits are hidden from screen readers, which get one sentence instead. */
export function Countdown({ iso, name }: { iso: string; name: string }) {
  const now = useNow();
  const t = countdown(Date.parse(iso) - now);
  return (
    <div className="countdown">
      <p className="visually-hidden">
        {name} launches in {t.d} days and {Number(t.h)} hours.
      </p>
      <div className="clock tnum" aria-hidden="true">
        <span>T−</span>
        {[
          [t.d, "days"],
          [t.h, "hrs"],
          [t.m, "min"],
          [t.s, "sec"],
        ].map(([v, l]) => (
          <span key={l} className="clock-unit">
            <b>{v}</b>
            <small>{l}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
