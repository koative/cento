import type { CSSProperties } from "react";
import { Link } from "../router";
import type { Coffee } from "../content";
import { money } from "../cart";
import { Bag } from "./Bag";

export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <article
      className="coffee-card"
      style={{ "--bag": coffee.color } as CSSProperties}
    >
      <div className="coffee-card-shelf">
        <Bag
          name={coffee.name}
          origin={coffee.origin}
          color={coffee.color}
          size={9.5}
        />
      </div>
      <div className="coffee-card-text">
        <h3>
          <Link to={"/shop/" + coffee.id}>{coffee.name}</Link>
        </h3>
        <p className="coffee-card-meta">
          {coffee.origin} · {coffee.process} · {coffee.roast} roast
        </p>
        <p className="coffee-card-notes">{coffee.notes.join(", ")}</p>
        <p className="coffee-card-price">
          {money(coffee.price)} <span>/ 250 g</span>
        </p>
      </div>
    </article>
  );
}
