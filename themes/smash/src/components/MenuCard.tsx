import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Link } from "../router";
import { tagLabels, type MenuItem } from "../content";
import { kcalOf, money, priceOf } from "../lib";
import { addMenuItem } from "../cart";
import { ItemVisual } from "./ItemVisual";

export function Tags({ item }: { item: MenuItem }) {
  if (!item.tags.length) return null;
  return (
    <ul className="tags" aria-label="Dietary and notes">
      {item.tags.map((t) => (
        <li key={t} data-tag={t}>
          {tagLabels[t]}
        </li>
      ))}
    </ul>
  );
}

/** Menu item card. The name links to the item; "Add" drops the house build straight into the order. */
export function MenuCard({ item }: { item: MenuItem }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article className="menu-card">
      <div className="menu-card-media">
        <ItemVisual item={item} />
      </div>
      <div className="menu-card-body">
        <div className="menu-card-head">
          <h3>
            <Link to={`/menu/${item.id}`} className="stretch">
              {item.name}
            </Link>
          </h3>
          <p className="price">{money(priceOf(item))}</p>
        </div>
        <p className="blurb">{item.blurb}</p>
        <div className="menu-card-foot">
          <p className="kcal">{kcalOf(item)} kcal</p>
          <Tags item={item} />
          <button
            type="button"
            className="quick-add"
            data-added={added ? "" : undefined}
            onClick={() => {
              addMenuItem(item, item.options);
              setAdded(true);
            }}
            aria-label={`Add ${item.name} to your order`}
          >
            {added ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
