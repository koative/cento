import { useState } from "react";
import { Luggage } from "lucide-react";
import { cars, type Car } from "../content";
import { fit } from "../lib/fit";
import { plural } from "../lib/format";
import { CarCard } from "../components/CarCard";
import { BagControls, startLoad } from "../components/BagCheck";

const classes = ["All", ...new Set(cars.map((c) => c.className))];
const sorts = {
  price: {
    label: "Price, low to high",
    by: (a: Car, b: Car) => a.rate - b.rate,
  },
  seats: {
    label: "Most seats",
    by: (a: Car, b: Car) => b.seats - a.seats || a.rate - b.rate,
  },
  space: {
    label: "Most luggage room",
    by: (a: Car, b: Car) => b.cargo[0].cuft - a.cargo[0].cuft,
  },
};
type SortKey = keyof typeof sorts;

export function Fleet() {
  const [cls, setCls] = useState("All");
  const [gearbox, setGearbox] = useState("any");
  const [seats, setSeats] = useState(1);
  const [sort, setSort] = useState<SortKey>("price");
  const [bagsOn, setBagsOn] = useState(false);
  const [load, setLoad] = useState(startLoad);
  const [onlyFits, setOnlyFits] = useState(true);

  const list = cars
    .map((car) => ({ car, f: bagsOn ? fit(car, load) : undefined }))
    .filter(
      ({ car, f }) =>
        (cls === "All" || car.className === cls) &&
        (gearbox === "any" || car.transmission === gearbox) &&
        car.seats >= seats &&
        (!f || !onlyFits || f.ok),
    )
    .sort((a, b) => sorts[sort].by(a.car, b.car));

  const reset = () => {
    setCls("All");
    setGearbox("any");
    setSeats(1);
    setOnlyFits(false);
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>The fleet</h1>
        <p className="lede">
          Eight groups, from a 56 mpg city hybrid to a nine-seat van. You book
          the group; we hand over the car shown or its twin. Every rate includes
          unlimited miles and a free second driver.
        </p>
      </section>

      <section className="wrap fleet-tools" aria-label="Filter and sort">
        <fieldset className="chips">
          <legend className="sr-only">Group</legend>
          {classes.map((c) => (
            <label key={c} className="chip">
              <input
                type="radio"
                name="class"
                value={c}
                checked={cls === c}
                onChange={() => setCls(c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </fieldset>
        <div className="fleet-selects">
          <label className="mini-field">
            <span>Gearbox</span>
            <select
              value={gearbox}
              onChange={(e) => setGearbox(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </label>
          <label className="mini-field">
            <span>Seats</span>
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            >
              <option value={1}>Any</option>
              <option value={5}>5 or more</option>
              <option value={9}>9</option>
            </select>
          </label>
          <label className="mini-field">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="btn btn-outline"
            aria-expanded={bagsOn}
            aria-controls="fleet-bags"
            onClick={() => setBagsOn((o) => !o)}
          >
            <Luggage aria-hidden="true" />
            {bagsOn ? "Hide bag check" : "Bag check"}
          </button>
        </div>
        {bagsOn && (
          <div id="fleet-bags" className="fleet-bags">
            <BagControls load={load} onChange={setLoad} />
            <label className="check">
              <input
                type="checkbox"
                checked={onlyFits}
                onChange={(e) => setOnlyFits(e.target.checked)}
              />
              <span>Only cars that take everything</span>
            </label>
          </div>
        )}
      </section>

      <section className="wrap fleet-results" aria-labelledby="results-count">
        <p id="results-count" className="results-count" aria-live="polite">
          {plural(list.length, "group")}{" "}
          {bagsOn && onlyFits ? "take your load" : "shown"}
        </p>
        {list.length ? (
          <div className="fleet-grid">
            {list.map(({ car, f }) => (
              <CarCard
                key={car.id}
                car={car}
                fit={f}
                bay={`R${String(cars.indexOf(car) + 1).padStart(2, "0")}`}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              No group matches all of that. A manual with nine seats doesn't
              exist here, and nothing smaller than the Caravel seats more than
              five.
            </p>
            <button type="button" className="btn btn-outline" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
