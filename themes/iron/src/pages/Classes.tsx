import { useState } from "react";
import { categories, classes, slots, type CategoryId } from "../content";
import { classById } from "../lib";
import { ClassRow } from "../components/Sessions";
import { Disc } from "../components/Marks";

const perWeek = (id: string) => slots.filter((s) => s.classId === id).length;

const sorts = {
  popular: {
    label: "Most sessions a week",
    fn: (a: string, b: string) => perWeek(b) - perWeek(a),
  },
  hardest: {
    label: "Hardest first",
    fn: (a: string, b: string) =>
      classById(b)!.intensity - classById(a)!.intensity,
  },
  easiest: {
    label: "Easiest first",
    fn: (a: string, b: string) =>
      classById(a)!.intensity - classById(b)!.intensity,
  },
  shortest: {
    label: "Shortest first",
    fn: (a: string, b: string) => classById(a)!.minutes - classById(b)!.minutes,
  },
};
type SortId = keyof typeof sorts;

export function Classes() {
  const [family, setFamily] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("popular");
  const shown = classes
    .filter((c) => family === "all" || c.category === family)
    .sort((a, b) => sorts[sort].fn(a.id, b.id));

  return (
    <>
      <header className="page-head wrap">
        <h1>Classes</h1>
        <p className="lede">
          Eight classes in five families. All of them are coached, capped by the
          equipment in the room, and open to every member who has finished
          Foundations.
        </p>
      </header>

      <section className="wrap" aria-label="Class list">
        <div className="list-tools">
          <fieldset className="chips">
            <legend>Show</legend>
            <button
              type="button"
              className="chip"
              aria-pressed={family === "all"}
              onClick={() => setFamily("all")}
            >
              All classes
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="chip"
                aria-pressed={family === cat.id}
                onClick={() => setFamily(cat.id)}
              >
                <Disc category={cat.id} />
                {cat.name}
              </button>
            ))}
          </fieldset>
          <label className="sort">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
            >
              {Object.entries(sorts).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} {shown.length === 1 ? "class" : "classes"} shown
        </p>
        <ul className="class-list">
          {shown.map((c) => (
            <ClassRow key={c.id} c={c} perWeek={perWeek(c.id)} />
          ))}
        </ul>
      </section>
    </>
  );
}
