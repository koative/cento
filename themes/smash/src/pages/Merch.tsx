import { useState } from "react";
import { merch, merchSorts, merchTypes, type MerchType } from "../content";
import { MerchCard } from "../components/MerchCard";

type Sort = (typeof merchSorts)[number]["id"];

export function Merch() {
  const [type, setType] = useState<MerchType | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const results = merch
    .filter((m) => type === "all" || m.type === type)
    .sort((a, b) =>
      sort === "price-asc"
        ? a.price - b.price
        : sort === "price-desc"
          ? b.price - a.price
          : a.rank - b.rank,
    );

  return (
    <div className="page merch-page">
      <header className="page-head wrap">
        <h1>Merch</h1>
        <p className="lede">
          Shirts the crew actually wears, the press we smash with, and the sauce
          in a bottle. Ships in three days, or pick it up with your burger for
          free.
        </p>
      </header>

      <div className="wrap filters merch-filters">
        <div className="cat-tabs" role="group" aria-label="Type">
          {[{ id: "all" as const, label: "Everything" }, ...merchTypes].map(
            (t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={type === t.id}
                onClick={() => setType(t.id)}
              >
                {t.label}
              </button>
            ),
          )}
        </div>
        <label className="sort">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            {merchSorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="wrap" aria-label="Products">
        <p className="result-count" aria-live="polite">
          {results.length} {results.length === 1 ? "thing" : "things"}
        </p>
        <h2 className="sr-only">Products</h2>
        <div className="merch-grid">
          {results.map((m) => (
            <MerchCard key={m.id} item={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
