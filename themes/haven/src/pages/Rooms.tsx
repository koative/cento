import { useState } from "react";
import { kindLabel, rooms, type RoomKind } from "../content";
import { Link } from "../router";
import { money } from "../lib/stay";
import { RoomCard } from "../components/RoomCard";

const sorts = {
  price: {
    label: "Price, low to high",
    fn: (a: number, b: number) => a - b,
    key: "price",
  },
  "price-desc": {
    label: "Price, high to low",
    fn: (a: number, b: number) => b - a,
    key: "price",
  },
  size: {
    label: "Size, largest first",
    fn: (a: number, b: number) => b - a,
    key: "size",
  },
} as const;

export function Rooms() {
  const [kind, setKind] = useState<RoomKind | "all">("all");
  const [guests, setGuests] = useState(1);
  const [sort, setSort] = useState<keyof typeof sorts>("price");
  const s = sorts[sort];
  const list = rooms
    .filter((r) => (kind === "all" || r.kind === kind) && r.sleeps >= guests)
    .sort((a, b) => s.fn(a[s.key], b[s.key]));

  return (
    <>
      <header className="page-head wrap">
        <h1>Rooms and cabins</h1>
        <p className="lede">
          Five rooms and suites in the 1898 house, two cabins on the hill. Every
          one faces south to the range, every rate includes breakfast, and none
          of them has a television.
        </p>
      </header>

      <section className="wrap" aria-label="Filter rooms">
        <div className="filters">
          <fieldset className="chips">
            <legend>Type</legend>
            {(["all", "room", "suite", "cabin"] as const).map((k) => (
              <label key={k} className="chip">
                <input
                  type="radio"
                  name="kind"
                  checked={kind === k}
                  onChange={() => setKind(k)}
                />
                <span>{k === "all" ? "All" : `${kindLabel[k]}s`}</span>
              </label>
            ))}
          </fieldset>
          <div className="field">
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              <option value={1}>Any number</option>
              {[2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} or more
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} of {rooms.length} rooms
        </p>
      </section>

      <section className="wrap" aria-label="Results">
        {list.length ? (
          <ul className="room-grid">
            {list.map((r, i) => (
              <li key={r.id}>
                <RoomCard room={r} lazy={i > 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No{" "}
              {kind === "all"
                ? "room"
                : kindLabel[kind as RoomKind].toLowerCase()}{" "}
              sleeps {guests} on its own.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setKind("all");
                setGuests(1);
              }}
            >
              Show all rooms
            </button>
          </div>
        )}
      </section>

      <section className="section wrap" aria-labelledby="compare-h">
        <h2 id="compare-h">Side by side</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="group"
          aria-label="Room comparison table, scroll sideways on small screens"
        >
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Room</th>
                <th scope="col">Size</th>
                <th scope="col">Sleeps</th>
                <th scope="col">Beds</th>
                <th scope="col">Where</th>
                <th scope="col">From</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id}>
                  <th scope="row">
                    <Link to={`/rooms/${r.id}`}>{r.name}</Link>
                  </th>
                  <td className="num">{r.size} m²</td>
                  <td className="num">{r.sleeps}</td>
                  <td>{r.beds}</td>
                  <td>{r.where}</td>
                  <td className="num">{money(r.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
