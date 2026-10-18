import { useState } from "react";
import { Search } from "lucide-react";
import {
  drinkCategories,
  drinks,
  menuPage,
  pours,
  snacks,
  type DrinkCategory,
} from "../content";
import { DrinkLine } from "../components/Cards";

const strengths = [
  { id: "any", label: "Any strength", test: () => true },
  { id: "light", label: "Lighter, under 15%", test: (abv: number) => abv < 15 },
  {
    id: "strong",
    label: "Spirit-forward, 25% and up",
    test: (abv: number) => abv >= 25,
  },
  { id: "zero", label: "Alcohol-free", test: (abv: number) => abv === 0 },
];

const bases = [...new Set(drinks.map((d) => d.base))].sort();

export function Menu() {
  const [category, setCategory] = useState<DrinkCategory | "all">("all");
  const [base, setBase] = useState("all");
  const [strength, setStrength] = useState("any");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const test = strengths.find((s) => s.id === strength)!.test;
  const shown = drinks.filter(
    (d) =>
      (category === "all" || d.category === category) &&
      (base === "all" || d.base === base) &&
      test(d.abv) &&
      (!q ||
        `${d.name} ${d.notes} ${d.taste.join(" ")}`.toLowerCase().includes(q)),
  );
  const filtered =
    category !== "all" || base !== "all" || strength !== "any" || q !== "";
  const clear = () => {
    setCategory("all");
    setBase("all");
    setStrength("any");
    setQuery("");
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Drinks</h1>
        <p className="lede">{menuPage.intro}</p>
      </header>

      <div className="wrap menu-layout">
        <div className="filters" role="search" aria-label="Filter the drinks">
          <div className="chips" role="group" aria-label="Section">
            {[{ id: "all" as const, label: "All" }, ...drinkCategories].map(
              (c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={category === c.id}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ),
            )}
          </div>
          <div className="filter-row">
            <label className="search">
              <span className="sr-only">Search drinks</span>
              <Search aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: smoky, gin, coffee…"
              />
            </label>
            <label className="select">
              <span className="sr-only">Base spirit</span>
              <select value={base} onChange={(e) => setBase(e.target.value)}>
                <option value="all">Any base</option>
                {bases.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label className="select">
              <span className="sr-only">Strength</span>
              <select
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
              >
                {strengths.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="filter-count" aria-live="polite">
            {filtered
              ? `${shown.length} of ${drinks.length} drinks`
              : `${drinks.length} drinks`}
            {filtered && (
              <button type="button" className="link-button" onClick={clear}>
                Clear filters
              </button>
            )}
          </p>
        </div>

        <div className="menu-card">
          {drinkCategories.map((c) => {
            const list = shown.filter((d) => d.category === c.id);
            if (!list.length) return null;
            return (
              <section
                key={c.id}
                className="menu-section"
                aria-labelledby={`menu-${c.id}`}
              >
                <div className="menu-section-head">
                  <h2 id={`menu-${c.id}`}>{c.label}</h2>
                  <p>{c.text}</p>
                </div>
                <ul className="drink-lines">
                  {list.map((d) => (
                    <DrinkLine key={d.id} drink={d} />
                  ))}
                </ul>
              </section>
            );
          })}
          {!shown.length && (
            <div className="empty">
              <p>
                Nothing on the menu matches that. Our bartenders can probably
                make it anyway.
              </p>
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Show every drink
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="section wrap menu-extras">
        <div>
          <h2>By the pour</h2>
          <p className="muted">{menuPage.poursText}</p>
          <ul className="price-list">
            {pours.map((p) => (
              <li key={p.name}>
                <span>
                  <strong>{p.name}</strong>
                  <span>{p.detail}</span>
                </span>
                <span className="price">{p.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Something to eat</h2>
          <p className="muted">{menuPage.snacksText}</p>
          <ul className="price-list">
            {snacks.map((s) => (
              <li key={s.name}>
                <span>
                  <strong>{s.name}</strong>
                  <span>{s.detail}</span>
                </span>
                <span className="price">{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
