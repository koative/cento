import { Plus } from "lucide-react";
import { Link } from "../router";
import type { Wine } from "../content";
import { addLine, money } from "../lib/cart";
import { Bottle } from "./Bottle";

export function WineCard({ wine }: { wine: Wine }) {
  return (
    <article className="wine-card">
      <Link
        to={"/wines/" + wine.id}
        className="wine-card-shelf"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Bottle wine={wine} />
      </Link>
      <div className="wine-card-tag">
        <h3>
          <Link to={"/wines/" + wine.id}>{wine.name}</Link>
        </h3>
        <p className="wine-card-meta">
          {wine.producer} · {wine.region}
        </p>
        <p className="wine-card-note">{wine.note}</p>
        <div className="wine-card-foot">
          <span className="wine-card-colour" data-colour={wine.colour}>
            {wine.colour}
            {wine.glass ? " · by the glass" : ""}
          </span>
          <button
            type="button"
            className="add-btn"
            onClick={() =>
              addLine({
                kind: "wine",
                id: wine.id,
                name: wine.name,
                detail: "75 cl",
                unit: wine.price,
                qty: 1,
              })
            }
            aria-label={`Add ${wine.name} to your case, ${money(wine.price)}`}
          >
            <span className="num">{money(wine.price)}</span>
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
