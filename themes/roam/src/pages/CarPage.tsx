import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import { acrissKey, cars, fees, photos, stations, type Car } from "../content";
import { setDraft } from "../lib/booking";
import { money } from "../lib/format";
import { CarDrawing } from "../components/CarDrawing";
import { CarCard } from "../components/CarCard";
import { Stepper } from "../components/Stepper";

export function CarPage({ car }: { car: Car }) {
  const [days, setDays] = useState(4);
  const base = car.rate * days;
  const weekly =
    days >= fees.weeklyDays ? Math.round(base * fees.weeklyDiscount) : 0;
  const related = cars
    .filter((c) => c.id !== car.id)
    .sort((a, b) => Math.abs(a.rate - car.rate) - Math.abs(b.rate - car.rate))
    .slice(0, 3);
  const pic = photos[car.photo];
  const bay = `R${String(cars.indexOf(car) + 1).padStart(2, "0")}`;

  const book = () => {
    setDraft({ car: car.id, step: 1 });
    navigate("/book");
  };

  return (
    <>
      <section className="wrap car-head">
        <Link to="/fleet" className="back-link">
          <ArrowLeft aria-hidden="true" /> Fleet
        </Link>
        <div className="car-head-grid">
          <div>
            <p className="key-tag key-tag-lg">
              <span>{car.acriss}</span>
              {car.group} · {car.className}
            </p>
            <h1>{car.name}</h1>
            <p className="lede">{car.tagline}</p>
          </div>
          <aside className="price-box" aria-label="Price estimate">
            <p className="price-rate">
              <strong className="tnum">{money(car.rate)}</strong> a day
            </p>
            <Stepper
              label="Days"
              value={days}
              min={1}
              max={30}
              onChange={setDays}
            />
            <dl className="price-lines tnum">
              <div>
                <dt>
                  {days} × {money(car.rate)}
                </dt>
                <dd>{money(base)}</dd>
              </div>
              {weekly > 0 && (
                <div>
                  <dt>Weekly rate, 10% off</dt>
                  <dd>−{money(weekly)}</dd>
                </div>
              )}
              <div className="price-total">
                <dt>Before fees and tax</dt>
                <dd>{money(base - weekly)}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="btn btn-sign btn-wide"
              onClick={book}
            >
              Book the {car.name} <ArrowRight aria-hidden="true" />
            </button>
            <p className="price-note">
              Deposit {money(car.deposit)} held at pickup · minimum age{" "}
              {car.minAge}
            </p>
          </aside>
        </div>
      </section>

      <section className="wrap car-stage" aria-label="Side elevation">
        <div className="bay bay-lg">
          <span className="bay-no" aria-hidden="true">
            {bay}
          </span>
          <CarDrawing car={car} dims />
        </div>
      </section>

      <section className="section wrap car-detail">
        <div className="car-about">
          <h2>About this group</h2>
          {car.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>On board</h3>
          <ul className="ticks">
            {car.features.map((f) => (
              <li key={f}>
                <Check aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <h3>Good for</h3>
          <p className="tags">
            {car.goodFor.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </p>
        </div>

        <div className="car-specs">
          <h2>Specification</h2>
          <dl className="spec-table tnum">
            <div>
              <dt>Seats</dt>
              <dd>{car.seats}</dd>
            </div>
            <div>
              <dt>Doors</dt>
              <dd>{car.doors}</dd>
            </div>
            <div>
              <dt>Gearbox</dt>
              <dd>{car.transmission}</dd>
            </div>
            <div>
              <dt>Fuel</dt>
              <dd>{car.fuel}</dd>
            </div>
            <div>
              <dt>{car.fuel === "Electric" ? "Range" : "Economy"}</dt>
              <dd>{car.economy}</dd>
            </div>
            <div>
              <dt>Suitcases</dt>
              <dd>
                {car.bags.large} large, {car.bags.small} cabin
              </dd>
            </div>
            <div>
              <dt>Length × width × height</dt>
              <dd>
                {car.dims.length} × {car.dims.width} × {car.dims.height} in
              </dd>
            </div>
            <div>
              <dt>Skis, boards, bikes</dt>
              <dd>{car.longLoad ? "Yes" : "Not inside"}</dd>
            </div>
          </dl>

          <h3>Luggage room</h3>
          <table className="cargo-table tnum">
            <thead>
              <tr>
                <th scope="col">Layout</th>
                <th scope="col">People</th>
                <th scope="col">Cu ft</th>
              </tr>
            </thead>
            <tbody>
              {car.cargo.map((s) => (
                <tr key={s.label}>
                  <td>{s.label}</td>
                  <td>up to {s.upTo}</td>
                  <td>{s.cuft.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Reading the key tag</h3>
          <dl className="acriss">
            {acrissKey.map((k, i) => (
              <div key={k.title}>
                <dt>{car.acriss[i]}</dt>
                <dd>
                  {k.letters[car.acriss[i]]}
                  <small>{k.title}</small>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap car-where">
        <figure className="car-photo">
          <img
            src={pic.src}
            alt={pic.alt}
            width={pic.w}
            height={pic.h}
            loading="lazy"
          />
        </figure>
        <div>
          <h2>Where to collect it</h2>
          <ul className="station-list">
            {stations
              .filter((s) => car.stations.includes(s.id))
              .map((s) => (
                <li key={s.id}>
                  <span className="station-code">{s.code}</span>
                  <Link to={`/locations/${s.id}`} className="card-link">
                    {s.name}
                  </Link>
                </li>
              ))}
          </ul>
          <p className="muted">
            Not listed at your station? Book anyway and we'll move one over at
            no charge with 48 hours' notice.
          </p>
        </div>
      </section>

      <section
        className="section band-concrete"
        aria-labelledby="related-title"
      >
        <div className="wrap">
          <h2 id="related-title">Parked nearby</h2>
          <div className="fleet-grid fleet-grid-3">
            {related.map((c) => (
              <CarCard
                key={c.id}
                car={c}
                bay={`R${String(cars.indexOf(c) + 1).padStart(2, "0")}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
