import { useState } from "react";
import {
  courses,
  glosses,
  languages,
  type Course,
  type Format,
  type LangId,
  type Level,
} from "../content";
import { CourseRow, langStyle, PageHead } from "../components/Bits";
import { Link } from "../router";

const levels: Level[] = ["A1", "A2", "B1", "B2", "C1"];
const formats: Format[] = [
  "Evening",
  "Morning",
  "Weekend",
  "Intensive",
  "Online",
];
const sorts = {
  start: {
    label: "Start date",
    by: (a: Course, b: Course) => a.start.localeCompare(b.start),
  },
  price: {
    label: "Price, lowest first",
    by: (a: Course, b: Course) => a.price - b.price,
  },
  places: {
    label: "Fewest places left",
    by: (a: Course, b: Course) => a.seatsLeft - b.seatsLeft,
  },
};

export function Courses() {
  const [lang, setLang] = useState<LangId | "">(() => {
    const q = new URLSearchParams(window.location.hash.split("?")[1]).get(
      "lang",
    );
    return languages.some((l) => l.id === q) ? (q as LangId) : "";
  });
  const [level, setLevel] = useState<Level | "">("");
  const [format, setFormat] = useState<Format | "">("");
  const [sort, setSort] = useState<keyof typeof sorts>("start");

  const shown = courses
    .filter(
      (c) =>
        (!lang || c.lang === lang) &&
        (!level || c.levels.includes(level)) &&
        (!format || c.format === format),
    )
    .sort(sorts[sort].by);

  function reset() {
    setLang("");
    setLevel("");
    setFormat("");
  }

  return (
    <div className="wrap page">
      <PageHead
        title="Courses this term"
        lead="Every group course running in the winter term, in six languages and five levels. Filter by what you speak and when you are free."
        gloss={glosses.courses}
      />

      <div className="filters">
        <div className="chips" role="group" aria-label="Language">
          <button
            type="button"
            aria-pressed={lang === ""}
            onClick={() => setLang("")}
          >
            All languages
          </button>
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={lang === l.id}
              onClick={() => setLang(l.id)}
              style={langStyle(l.color)}
            >
              {l.name}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label>
            Level
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level | "")}
            >
              <option value="">Any level</option>
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label>
            Format
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as Format | "")}
            >
              <option value="">Any format</option>
              {formats.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "course" : "courses"}
        {lang && ` in ${languages.find((l) => l.id === lang)!.name}`}
        {level && ` at ${level}`}
        {format && `, ${format.toLowerCase()}`}
      </p>

      {shown.length ? (
        <ul className="course-list">
          {shown.map((c) => (
            <CourseRow key={c.id} course={c} level={2} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>
            No group matches all of that this term. One-to-one lessons can start
            any week, at any level.
          </p>
          <div className="actions">
            <button type="button" className="btn" onClick={reset}>
              Clear the filters
            </button>
            <Link to="/fees" className="btn btn-ghost">
              One-to-one prices
            </Link>
          </div>
        </div>
      )}

      <aside className="aside-note">
        <h2>Not sure which level?</h2>
        <p>
          The <Link to="/level-test">level test</Link> takes ten minutes and
          suggests a group. You can also switch groups free of charge in the
          first two weeks.
        </p>
      </aside>
    </div>
  );
}
