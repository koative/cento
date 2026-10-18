import { Briefcase, Cog, Fuel, Users, Zap } from "lucide-react";
import type { Car } from "../content";
import { Link } from "../router";
import type { Fit } from "../lib/fit";
import { money } from "../lib/format";
import { CarDrawing } from "./CarDrawing";

/** One car parked in its bay: drawing on the painted lines, key tag, specs, day rate. */
export function CarCard({
  car,
  bay,
  fit,
}: {
  car: Car;
  bay: string;
  fit?: Fit;
}) {
  return (
    <article
      className="car-card"
      data-fit={fit ? (fit.ok ? "yes" : "no") : undefined}
    >
      <div className="bay">
        <span className="bay-no" aria-hidden="true">
          {bay}
        </span>
        <CarDrawing
          car={car}
          load={
            fit
              ? { pct: fit.room ? fit.need / fit.room : 2, ok: fit.ok }
              : undefined
          }
        />
      </div>
      <div className="car-card-body">
        <p className="key-tag">
          <span>{car.acriss}</span>
          {car.group}
        </p>
        <h3>
          <Link to={`/fleet/${car.id}`} className="card-link">
            {car.name}
          </Link>
        </h3>
        <p className="car-card-class">{car.className} · or similar</p>
        <ul className="specs">
          <li>
            <Users aria-hidden="true" />
            {car.seats} seats
          </li>
          <li>
            <Briefcase aria-hidden="true" />
            {car.bags.large} + {car.bags.small} bags
          </li>
          <li>
            <Cog aria-hidden="true" />
            {car.transmission}
          </li>
          <li>
            {car.fuel === "Electric" ? (
              <Zap aria-hidden="true" />
            ) : (
              <Fuel aria-hidden="true" />
            )}
            {car.fuel}
          </li>
        </ul>
        {fit && (
          <p className="fit-note">
            {fit.ok ? `Fits · ${fit.layout}` : fit.reason}
          </p>
        )}
        <p className="car-card-rate">
          <strong className="tnum">{money(car.rate)}</strong> a day
        </p>
      </div>
    </article>
  );
}
