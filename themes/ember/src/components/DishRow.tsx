import { Plus } from "lucide-react";
import { Link } from "../router";
import { dietLabels, type Dish } from "../content";
import { add, usePlan } from "../lib/table";
import { money } from "../lib/time";

export function Diets({ dish }: { dish: Dish }) {
  if (!dish.diet.length) return null;
  return (
    <span className="diets">
      {dish.diet.map((d) => (
        <abbr key={d} title={dietLabels[d]}>
          {d}
        </abbr>
      ))}
    </span>
  );
}

/** One line of the printed menu: name, leader, price, and a quiet add-to-table control. */
export function DishRow({ dish }: { dish: Dish }) {
  const qty = usePlan().items[dish.id] ?? 0;
  return (
    <li className="dish-row">
      <div className="dish-head">
        <h3>
          <Link to={`/menu/${dish.service}/${dish.id}`}>{dish.name}</Link>
        </h3>
        <Diets dish={dish} />
        <span className="leader" aria-hidden="true" />
        <span className="price">{money(dish.price)}</span>
      </div>
      <p>{dish.desc}</p>
      <button
        type="button"
        className="add"
        onClick={() => add(dish.id)}
        aria-label={`Add ${dish.name} to your table`}
      >
        <Plus aria-hidden="true" />
        <span aria-hidden="true">
          {qty ? `${qty} on your table` : "Add to table"}
        </span>
      </button>
    </li>
  );
}
