import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { families, materials, type Family, type Material } from "../content";
import { MaterialCard } from "../components/Samples";
import { BOARD_MAX, boardMaterials, role, useBoard } from "../lib/board";

const sorts: Record<
  string,
  { label: string; fn: (a: Material, b: Material) => number }
> = {
  family: {
    label: "By family",
    fn: (a, b) => families.indexOf(a.family) - families.indexOf(b.family),
  },
  light: {
    label: "Lightest first",
    fn: (a, b) =>
      ["Light", "Mid", "Dark"].indexOf(a.tone) -
      ["Light", "Mid", "Dark"].indexOf(b.tone),
  },
  price: { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  lead: {
    label: "Shortest lead time",
    fn: (a, b) => a.leadWeeks - b.leadWeeks,
  },
};

export function Materials() {
  const [family, setFamily] = useState<Family | "All">("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("family");
  const board = boardMaterials(useBoard());

  const q = query.trim().toLowerCase();
  const shown = materials
    .filter((m) => family === "All" || m.family === family)
    .filter(
      (m) =>
        !q ||
        [m.name, m.origin, m.finish, ...m.bestFor]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort(sorts[sort].fn);

  return (
    <>
      <header className="page-head">
        <h1>Material library</h1>
        <p className="lede">
          {materials.length} of the samples we specify most, out of fourteen
          hundred on Cordage Lane. Add up to {BOARD_MAX} to a sample board, see
          them together in morning and lamplight, and we will post six to you
          free.
        </p>
      </header>

      <div className="library">
        <section aria-label="Samples">
          <div className="filters">
            <div
              className="segmented"
              role="group"
              aria-label="Material family"
            >
              {(["All", ...families] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={family === f}
                  onClick={() => setFamily(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="filter-selects">
              <label className="search">
                <Search size={16} aria-hidden="true" />
                <span className="visually-hidden">Search materials</span>
                <input
                  type="search"
                  placeholder="Search: floors, Maine, honed…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <label>
                <span>Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(sorts).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <p className="result-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "sample" : "samples"}
          </p>
          {shown.length ? (
            <div className="material-grid">
              {shown.map((m, i) => (
                <MaterialCard key={m.id} material={m} eager={i < 4} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                Nothing in the online library matches “{query}”. The full
                library has far more — ask us at a visit.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setQuery("");
                  setFamily("All");
                }}
              >
                Show all samples
              </button>
            </div>
          )}
        </section>

        <aside className="board-aside" aria-labelledby="board-aside-title">
          <h2 id="board-aside-title">Your board</h2>
          {board.length ? (
            <>
              <ol className="board-mini">
                {board.map((m, i) => (
                  <li key={m.id}>
                    <img src={m.image} alt="" />
                    <span>
                      <b>{role(i)}</b>
                      {m.name}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="fine tabular">
                {board.length} of {BOARD_MAX} places used
              </p>
              <Link to="/samples" className="btn">
                Compose your board
              </Link>
            </>
          ) : (
            <p className="fine">
              Empty for now. Press <strong>+</strong> on any sample: the first
              becomes your field material, the second your secondary, the rest
              accents.
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
