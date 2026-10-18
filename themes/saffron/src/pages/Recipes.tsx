import { useState } from "react";
import { Clock, Users } from "lucide-react";
import { Link } from "../router";
import { diets, recipes, type Diet } from "../content";

export function Recipes() {
  const [diet, setDiet] = useState<Diet | null>(null);
  const [quick, setQuick] = useState(false);
  const [sort, setSort] = useState<"new" | "quick">("new");

  const shown = recipes
    .filter((r) => !diet || r.diets.includes(diet))
    .filter((r) => !quick || r.minutes <= 45)
    .sort((a, b) => (sort === "quick" ? a.minutes - b.minutes : 0));

  return (
    <div className="page recipes-page">
      <header className="page-head">
        <h1>Recipes from behind the counter</h1>
        <p className="lede">
          Written by the people who pick your basket. Each one scales to how
          many you are feeding and puts every ingredient we stock into your
          basket in one go.
        </p>
      </header>

      <div className="filters">
        <div className="chip-row" role="group" aria-label="Diet">
          <button
            type="button"
            className="chip"
            aria-pressed={diet === null}
            onClick={() => setDiet(null)}
          >
            Everything
          </button>
          {diets.map((d) => (
            <button
              key={d}
              type="button"
              className="chip"
              aria-pressed={diet === d}
              onClick={() => setDiet(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <label className="chip">
          <input
            type="checkbox"
            checked={quick}
            onChange={(e) => setQuick(e.target.checked)}
          />
          45 minutes or less
        </label>
        <div className="sort-field">
          <label htmlFor="recipe-sort">Sort</label>
          <select
            id="recipe-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "new" | "quick")}
          >
            <option value="new">Newest first</option>
            <option value="quick">Quickest first</option>
          </select>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "recipe" : "recipes"}
      </p>

      {shown.length ? (
        <ul className="recipe-grid">
          {shown.map((r, i) => (
            <li key={r.slug} className="recipe-card">
              <Link to={"/recipes/" + r.slug}>
                <img
                  src={r.photo.src}
                  alt={r.photo.alt}
                  width={r.photo.width}
                  height={r.photo.height}
                  loading={i < 3 ? undefined : "lazy"}
                />
                <h2>{r.name}</h2>
              </Link>
              <p className="meta">
                <span>
                  <Clock size={15} aria-hidden="true" /> {r.minutes} min
                </span>
                <span>
                  <Users size={15} aria-hidden="true" /> Serves {r.serves}
                </span>
              </p>
              <p className="recipe-diets">{r.diets.join(" · ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <h2>No recipe fits all of that</h2>
          <p>
            Nothing {diet ? diet.toLowerCase() : ""} comes in under 45 minutes
            yet. Drop one of the filters.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setDiet(null);
              setQuick(false);
            }}
          >
            Show every recipe
          </button>
        </div>
      )}
    </div>
  );
}
