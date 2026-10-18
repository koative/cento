import { useState } from "react";
import { classes, focuses, type Focus } from "../content";
import { ClassTile } from "../components/ClassTile";

export function Classes() {
  const [focus, setFocus] = useState<Focus | "All">("All");
  const [sort, setSort] = useState<"gentle" | "strong" | "short" | "name">(
    "gentle",
  );

  const list = classes
    .filter((c) => focus === "All" || c.focus === focus)
    .sort((a, b) =>
      sort === "short"
        ? a.minutes - b.minutes
        : sort === "name"
          ? a.name.localeCompare(b.name)
          : sort === "strong"
            ? b.effort - a.effort
            : a.effort - b.effort,
    );
  const about = focuses.find((f) => f.id === focus);

  return (
    <>
      <header className="page-head wrap">
        <h1>Classes</h1>
        <p className="lead">
          Eight classes in three families. All are taught slowly, in plain
          words, with a smaller version of everything. If you are not sure where
          to start, try Slow Flow or Restorative.
        </p>
      </header>

      <section className="wrap catalogue" aria-label="Class list">
        <div className="filters filters-row">
          <fieldset className="chips">
            <legend>Show</legend>
            {(["All", ...focuses.map((f) => f.id)] as const).map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={focus === f}
                onClick={() => setFocus(f)}
              >
                {f}
              </button>
            ))}
          </fieldset>
          <label className="sort">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <option value="gentle">Gentlest first</option>
              <option value="strong">Strongest first</option>
              <option value="short">Shortest first</option>
              <option value="name">A to Z</option>
            </select>
          </label>
        </div>
        <p className="catalogue-note" aria-live="polite">
          {about
            ? about.text
            : "Move, soften or settle: every class at Still belongs to one of three families."}{" "}
          <span>{list.length} classes.</span>
        </p>

        <ul className="class-grid">
          {list.map((c) => (
            <li key={c.slug}>
              <ClassTile c={c} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
