import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  courseMinutes,
  courses,
  instructors,
  subjects,
  type Course,
} from "../content";
import { CourseRow } from "../components/course";

const sorts = {
  popular: {
    label: "Most reviewed",
    by: (a, b) => b.reviewCount - a.reviewCount,
  },
  rating: { label: "Highest rated", by: (a, b) => b.rating - a.rating },
  short: {
    label: "Shortest first",
    by: (a, b) => courseMinutes(a) - courseMinutes(b),
  },
  price: { label: "Price, low to high", by: (a, b) => a.price - b.price },
} satisfies Record<
  string,
  { label: string; by: (a: Course, b: Course) => number }
>;
type SortKey = keyof typeof sorts;

/** Home and course pages link here with ?subject=…; read it once on mount. */
function initialSubject() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "subject",
  );
  return q && subjects.includes(q) ? q : "All";
}

export default function Courses() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [level, setLevel] = useState("Any");
  const [sort, setSort] = useState<SortKey>("popular");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses
      .filter((c) => subject === "All" || c.subject === subject)
      .filter((c) => level === "Any" || c.level === level)
      .filter((c) => {
        if (!q) return true;
        const teacher =
          instructors.find((i) => i.slug === c.instructor)?.name ?? "";
        return [c.title, c.summary, c.subject, teacher].some((s) =>
          s.toLowerCase().includes(q),
        );
      })
      .sort(sorts[sort].by);
  }, [query, subject, level, sort]);

  const clear = () => {
    setQuery("");
    setSubject("All");
    setLevel("Any");
  };

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>All courses</h1>
        <p className="lede">
          {courses.length} courses across {subjects.length} subjects, each
          taught by someone who does the work for a living. The first lesson of
          every course is free.
        </p>
      </header>

      <div className="filters" role="search">
        <div className="field search-field">
          <label htmlFor="course-search">Search courses</label>
          <span className="input-icon">
            <Search size={18} aria-hidden />
            <input
              id="course-search"
              type="search"
              placeholder="Try “bread”, “Python” or an instructor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </span>
        </div>
        <div className="field">
          <label htmlFor="course-level">Level</label>
          <select
            id="course-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Any</option>
            <option>Beginner</option>
            <option>Intermediate</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="course-sort">Sort by</label>
          <select
            id="course-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="chips" role="group" aria-label="Subject">
          {["All", ...subjects].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={subject === s}
              onClick={() => setSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {list.length === courses.length
          ? `Showing all ${list.length} courses`
          : `${list.length} of ${courses.length} courses`}
      </p>

      {list.length ? (
        <div className="course-index">
          {list.map((c) => (
            <CourseRow key={c.slug} course={c} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No course matches that yet.</h2>
          <p>
            Try a broader word, another subject, or clear the filters to see all{" "}
            {courses.length} courses.
          </p>
          <button className="btn btn-quiet" onClick={clear}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
