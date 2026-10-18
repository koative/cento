import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import {
  filters,
  maxMeals,
  minMeals,
  recipes,
  sorts,
  type SortId,
} from "../content";
import { RecipeCard } from "../components/RecipeCard";
import { money, perServing, totals, useBox } from "../lib/box";
import { menuWeek, useNow } from "../lib/week";

const sorters: Record<
  SortId,
  (a: (typeof recipes)[number], b: (typeof recipes)[number]) => number
> = {
  menu: (a, b) => a.no - b.no,
  quick: (a, b) => a.minutes - b.minutes,
  light: (a, b) => a.nutrition.kcal - b.nutrition.kcal,
  loved: (a, b) => b.loved - a.loved,
};

export function Menu() {
  const now = useNow();
  const box = useBox();
  const { meals } = totals(box);
  const [active, setActive] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("menu");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tests = filters.filter((f) => active.includes(f.id));
    return recipes
      .filter((r) => tests.every((f) => f.test(r)))
      .filter(
        (r) =>
          !q ||
          (r.name + " " + r.with + " " + r.bag.map((b) => b[0]).join(" "))
            .toLowerCase()
            .includes(q),
      )
      .sort(sorters[sort]);
  }, [active, query, sort]);

  const toggle = (id: string) =>
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  const nextSaving =
    meals >= minMeals && meals < maxMeals
      ? perServing(box.people, meals) - perServing(box.people, meals + 1)
      : 0;

  return (
    <div className="page">
      <header className="page-head">
        <h1>This week’s menu</h1>
        <p className="lead">
          Twelve recipes for the week of {menuWeek(now)}. Every one is cooked by
          three home testers before it gets here, and every card names the farm.
        </p>
      </header>

      <div className="box-progress" aria-live="polite">
        <div className="progress-bags" aria-hidden="true">
          {Array.from({ length: maxMeals }, (_, i) => (
            <span key={i} data-filled={i < meals ? "" : undefined} />
          ))}
        </div>
        <p>
          {meals === 0 &&
            `Your box is empty. Add between ${minMeals} and ${maxMeals} recipes, for ${box.people} people.`}
          {meals === 1 && "One recipe in. Boxes start at two."}
          {meals >= minMeals && (
            <>
              <b>{meals} recipes</b> for {box.people} ·{" "}
              {money(perServing(box.people, meals))} a serving
              {nextSaving > 0 && (
                <> · one more saves {money(nextSaving)} a serving</>
              )}
            </>
          )}
        </p>
        {meals > 0 && (
          <Link to="/box" className="btn btn-small">
            Review box <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter recipes">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={active.includes(f.id)}
              onClick={() => toggle(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="toolbar-row">
          <label className="search">
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">
              Search recipes or ingredients
            </span>
            <input
              type="search"
              placeholder="Search recipes or ingredients"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="sort">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length === recipes.length
          ? `All ${recipes.length} recipes`
          : `${shown.length} of ${recipes.length} recipes`}
      </p>

      {shown.length > 0 ? (
        <ul className="recipe-grid">
          {shown.map((r, i) => (
            <li key={r.slug}>
              <RecipeCard recipe={r} lazy={i > 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <h2>Nothing on this week’s menu matches</h2>
          <p>
            Try fewer filters, or search for a single ingredient like “squash”.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setActive([]);
              setQuery("");
            }}
          >
            Clear filters and search
          </button>
        </div>
      )}
    </div>
  );
}
