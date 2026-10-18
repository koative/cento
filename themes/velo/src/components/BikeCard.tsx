import { Link } from "../router";
import type { Bike } from "../content";
import { money } from "../lib/cart";

export function BikeCard({
  bike,
  lazy = true,
}: {
  bike: Bike;
  lazy?: boolean;
}) {
  return (
    <article className="bike-card">
      <div className="bike-card-media">
        <img
          src={bike.photo}
          alt={bike.photoAlt}
          width={800}
          height={600}
          loading={lazy ? "lazy" : undefined}
          style={{ objectPosition: bike.photoPosition }}
        />
      </div>
      <div className="bike-card-body">
        <h3>
          <Link to={`/bikes/${bike.id}`} className="stretched">
            {bike.name}
          </Link>
        </h3>
        <p className="bike-card-price num">{money(bike.price)}</p>
        <p className="bike-card-meta">
          {bike.type} · {bike.material} ·{" "}
          <span className="num">{bike.weight.toFixed(1)} kg</span>
        </p>
        <ul
          className="swatch-row"
          aria-label={`Finishes: ${bike.finishes.map((f) => f.name).join(", ")}`}
        >
          {bike.finishes.map((f) => (
            <li key={f.name} style={{ background: f.hex }} />
          ))}
        </ul>
      </div>
    </article>
  );
}
