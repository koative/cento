import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  conditions,
  visitTypes,
  type Category,
  type VisitType,
} from "../content";
import { ConditionRow, visitIcon } from "../components/ConditionRow";

type Sort = "name" | "price" | "fastest";

export function Conditions() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [type, setType] = useState<VisitType | "any">("any");
  const [sort, setSort] = useState<Sort>("name");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const found = conditions.filter(
      (c) =>
        (cat === "all" || c.category === cat) &&
        (type === "any" || c.visitTypes.includes(type)) &&
        (!q ||
          [c.name, c.summary, ...c.symptoms, ...c.weTreat].some((s) =>
            s.toLowerCase().includes(q),
          )),
    );
    // Message-only visits (minutes 0) have no live wait, so they sort as the fastest.
    const by: Record<
      Sort,
      (a: (typeof found)[0], b: (typeof found)[0]) => number
    > = {
      name: (a, b) => a.name.localeCompare(b.name),
      price: (a, b) => a.price - b.price || a.name.localeCompare(b.name),
      fastest: (a, b) => a.minutes - b.minutes,
    };
    return [...found].sort(by[sort]);
  }, [query, cat, type, sort]);

  const reset = () => {
    setQuery("");
    setCat("all");
    setType("any");
  };

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Conditions we treat</h1>
          <p className="lede">
            {conditions.length} of the most common reasons people see us, with
            what we can treat, when to go in person instead, and the self-pay
            price. Not on the list? Start a check-in and choose “Something
            else”.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="filters" role="search">
            <div className="search">
              <Search aria-hidden="true" />
              <label className="sr-only" htmlFor="cond-q">
                Search symptoms or conditions
              </label>
              <input
                id="cond-q"
                type="search"
                placeholder="Search a symptom, like “burning” or “rash”"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="chips" role="group" aria-label="Category">
              {(["all", ...categories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                >
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
            <div className="filter-row">
              <div className="chips" role="group" aria-label="Visit type">
                <button
                  type="button"
                  className="chip"
                  aria-pressed={type === "any"}
                  onClick={() => setType("any")}
                >
                  Any visit
                </button>
                {(Object.keys(visitTypes) as VisitType[]).map((t) => {
                  const Icon = visitIcon[t];
                  return (
                    <button
                      key={t}
                      type="button"
                      className="chip"
                      aria-pressed={type === t}
                      onClick={() => setType(t)}
                    >
                      <Icon aria-hidden="true" /> {visitTypes[t].short}
                    </button>
                  );
                })}
              </div>
              <label className="sort">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                >
                  <option value="name">A to Z</option>
                  <option value="price">Price, low to high</option>
                  <option value="fastest">Quickest to be seen</option>
                </select>
              </label>
            </div>
          </div>

          <p className="result-count" aria-live="polite">
            {list.length} {list.length === 1 ? "condition" : "conditions"}
          </p>

          {list.length ? (
            <ul className="cond-list">
              {list.map((c) => (
                <ConditionRow key={c.slug} c={c} />
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>
                Nothing matches “{query}” with those filters. A clinician can
                still help with most things.
              </p>
              <div className="actions">
                <button type="button" className="btn btn-quiet" onClick={reset}>
                  Clear filters
                </button>
                <Link to="/check-in" className="btn btn-primary">
                  Check in with something else
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
