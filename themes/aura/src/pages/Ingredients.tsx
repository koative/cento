import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import {
  ingredientKinds,
  ingredients,
  ingredientsCopy,
  products,
  type IngredientKind,
} from "../content";
import { IngredientMark } from "../components/IngredientMark";

export function Ingredients() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<IngredientKind | "all">("all");
  const q = query.trim().toLowerCase();
  const list = [...ingredients]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      (g) =>
        (kind === "all" || g.kind === kind) &&
        (!q || `${g.name} ${g.inci} ${g.summary}`.toLowerCase().includes(q)),
    );
  const letters = [...new Set(list.map((g) => g.name[0].toUpperCase()))];

  return (
    <div className="page glossary-page">
      <header className="page-head">
        <h1>{ingredientsCopy.title}</h1>
        <p className="lede">{ingredientsCopy.text}</p>
      </header>

      <div className="glossary-tools">
        <div className="field search-field">
          <label htmlFor="ing-search">Search ingredients or INCI names</label>
          <div className="input-icon">
            <Search size={16} aria-hidden="true" />
            <input
              id="ing-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Squalane, Rosa Canina…"
            />
          </div>
        </div>
        <fieldset>
          <legend>Kind</legend>
          <div className="chips">
            {(["all", ...ingredientKinds] as const).map((k) => (
              <label key={k} className="chip">
                <input
                  type="radio"
                  name="kind"
                  checked={kind === k}
                  onChange={() => setKind(k)}
                />
                {k === "all" ? "All" : k + "s"}
              </label>
            ))}
          </div>
        </fieldset>
        <nav className="az" aria-label="Jump to letter">
          {letters.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() =>
                document.getElementById("letter-" + l)?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              {l}
            </button>
          ))}
        </nav>
      </div>

      <p className="results-note" aria-live="polite">
        {list.length} of {ingredients.length} ingredients
      </p>

      {letters.map((l) => (
        <section
          key={l}
          className="letter-group"
          id={"letter-" + l}
          aria-labelledby={"lh-" + l}
        >
          <h2 id={"lh-" + l} className="letter">
            {l}
          </h2>
          <ul className="ing-list">
            {list
              .filter((g) => g.name[0].toUpperCase() === l)
              .map((g) => {
                const n = products.filter((p) =>
                  p.ingredients.includes(g.slug),
                ).length;
                return (
                  <li key={g.slug}>
                    <IngredientMark ingredient={g} />
                    <div>
                      <h3>
                        <Link to={"/ingredients/" + g.slug}>{g.name}</Link>
                      </h3>
                      <p className="inci-name">{g.inci}</p>
                      <p>{g.summary}</p>
                    </div>
                    <p className="ing-count">
                      {g.kind}
                      <br />
                      in {n} {n === 1 ? "formula" : "formulas"}
                    </p>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}

      {!list.length && (
        <div className="empty">
          <h2>No ingredient by that name</h2>
          <p>
            We may not use it. Check the full ingredient list on any product
            page, or write to us and we will tell you why.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setQuery("");
              setKind("all");
            }}
          >
            Show all ingredients
          </button>
        </div>
      )}
    </div>
  );
}
