import { useState } from "react";
import { ArrowDown, ArrowUp, Download, Search } from "lucide-react";
import { Link } from "../router";
import { modeLabel, type Mode, type Shipment, type Status } from "../content";
import { useApp } from "../lib/store";
import { hub } from "../lib/geo";
import { eur, when } from "../lib/format";
import { schedule } from "../lib/shipment";
import { StatusPill } from "../components/Waybill";

type SortKey = "id" | "customer" | "lane" | "status" | "eta" | "cost";
type Filters = {
  q: string;
  status: "All" | Status;
  mode: "all" | Mode;
  sort: SortKey;
  dir: 1 | -1;
};

const STATUSES: ("All" | Status)[] = [
  "All",
  "Exception",
  "Booked",
  "In transit",
  "Out for delivery",
  "Delivered",
];

/* Kept for the session so filters survive opening a shipment and coming back. */
let saved: Filters = { q: "", status: "All", mode: "all", sort: "eta", dir: 1 };

const lane = (s: Shipment) =>
  `${hub(s.route[0]).city} → ${hub(s.route[s.route.length - 1]).city}`;

const sorters: Record<SortKey, (a: Shipment, b: Shipment) => number> = {
  id: (a, b) => a.id.localeCompare(b.id),
  customer: (a, b) => a.customer.localeCompare(b.customer),
  lane: (a, b) => lane(a).localeCompare(lane(b)),
  status: (a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status),
  eta: (a, b) => schedule(a).eta.getTime() - schedule(b).eta.getTime(),
  cost: (a, b) => a.cost - b.cost,
};

const columns: [SortKey, string][] = [
  ["id", "Shipment"],
  ["customer", "Customer"],
  ["lane", "Lane"],
  ["status", "Status"],
  ["eta", "ETA / delivered"],
  ["cost", "Cost"],
];

export default function AppShipments() {
  const { shipments } = useApp();
  const [f, setF] = useState<Filters>(saved);
  const [notice, setNotice] = useState("");
  const update = (p: Partial<Filters>) =>
    setF((cur) => (saved = { ...cur, ...p }));

  const needle = f.q.trim().toLowerCase();
  const rows = shipments
    .filter((s) => f.status === "All" || s.status === f.status)
    .filter((s) => f.mode === "all" || s.mode === f.mode)
    .filter(
      (s) =>
        !needle ||
        [s.id, s.customer, s.ref, lane(s), s.unit]
          .join(" ")
          .toLowerCase()
          .includes(needle),
    )
    .sort((a, b) => sorters[f.sort](a, b) * f.dir);

  function exportCsv() {
    const head = [
      "id",
      "reference",
      "customer",
      "lane",
      "mode",
      "status",
      "eta",
      "pallets",
      "weight_kg",
      "cost_eur",
    ];
    const body = rows.map((s) => [
      s.id,
      s.ref,
      s.customer,
      lane(s),
      s.mode,
      s.status,
      schedule(s).eta.toISOString(),
      s.pallets,
      s.weight,
      s.cost,
    ]);
    const csv = [head, ...body]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "relay-shipments.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotice(
      `Exported ${rows.length} ${rows.length === 1 ? "shipment" : "shipments"} to relay-shipments.csv.`,
    );
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <h1>Shipments</h1>
          <p className="muted">
            {shipments.length} shipments in the last 7 days and the next 3
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={exportCsv}
          disabled={!rows.length}
        >
          <Download size={16} aria-hidden /> Export CSV
        </button>
      </header>
      <p className="notice" aria-live="polite">
        {notice}
      </p>

      <div className="app-toolbar">
        <div className="field search-field">
          <label htmlFor="ship-search" className="sr-only">
            Search shipments
          </label>
          <Search size={16} aria-hidden className="search-icon" />
          <input
            id="ship-search"
            type="search"
            placeholder="ID, customer, reference or city"
            value={f.q}
            onChange={(e) => update({ q: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="ship-mode" className="sr-only">
            Mode
          </label>
          <select
            id="ship-mode"
            value={f.mode}
            onChange={(e) =>
              update({ mode: e.target.value as Filters["mode"] })
            }
          >
            <option value="all">All modes</option>
            {(Object.keys(modeLabel) as Mode[]).map((m) => (
              <option key={m} value={m}>
                {modeLabel[m]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="chips" role="group" aria-label="Filter by status">
        {STATUSES.map((st) => {
          const count =
            st === "All"
              ? shipments.length
              : shipments.filter((s) => s.status === st).length;
          return (
            <button
              key={st}
              type="button"
              className="chip"
              aria-pressed={f.status === st}
              onClick={() => update({ status: st })}
            >
              {st} <span className="num chip-count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="muted small" aria-live="polite">
        Showing {rows.length} of {shipments.length}
      </p>

      {rows.length ? (
        <div className="table-scroll panel flush">
          <table className="data-table ship-table">
            <thead>
              <tr>
                {columns.map(([key, label]) => (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={
                      f.sort === key
                        ? f.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    <button
                      type="button"
                      className="sort"
                      onClick={() =>
                        update(
                          f.sort === key
                            ? { dir: f.dir === 1 ? -1 : 1 }
                            : { sort: key, dir: 1 },
                        )
                      }
                    >
                      {label}
                      {f.sort === key &&
                        (f.dir === 1 ? (
                          <ArrowUp size={14} aria-hidden />
                        ) : (
                          <ArrowDown size={14} aria-hidden />
                        ))}
                    </button>
                  </th>
                ))}
                <th scope="col">Mode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr
                  key={s.id}
                  className={
                    s.status === "Exception" ? "is-exception" : undefined
                  }
                >
                  <th scope="row">
                    <Link to={`/app/shipments/${s.id}`} className="num">
                      {s.id}
                    </Link>
                    <small className="muted num">{s.ref}</small>
                  </th>
                  <td>{s.customer}</td>
                  <td>{lane(s)}</td>
                  <td>
                    <StatusPill status={s.status} />
                  </td>
                  <td className="num">
                    {s.status === "Booked"
                      ? `Collect ${when(new Date(s.pickup))}`
                      : when(schedule(s).eta)}
                  </td>
                  <td className="num">{eur(s.cost)}</td>
                  <td>
                    <span className={`mode-tag mode-${s.mode}`}>
                      {modeLabel[s.mode]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <h2>No shipments match</h2>
          <p>
            Nothing fits “{f.q || f.status}”. Clear the filters to see all{" "}
            {shipments.length} shipments.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => update({ q: "", status: "All", mode: "all" })}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
