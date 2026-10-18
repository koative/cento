import { useState } from "react";
import { Search } from "lucide-react";
import { families, programmes, type Family } from "../content";
import { Coda, ProgrammeCard } from "../components/Bits";

const AGES = [
  { id: "any", label: "Any age", range: [0, 120] },
  { id: "early", label: "3 to 4", range: [3, 4] },
  { id: "young", label: "5 to 8", range: [5, 8] },
  { id: "junior", label: "9 to 12", range: [9, 12] },
  { id: "teen", label: "13 to 17", range: [13, 17] },
  { id: "adult", label: "Adults", range: [18, 120] },
];

export function Programmes() {
  const [family, setFamily] = useState<Family | "All">("All");
  const [age, setAge] = useState("any");
  const [query, setQuery] = useState("");

  const [lo, hi] = AGES.find((a) => a.id === age)!.range;
  const q = query.trim().toLowerCase();
  const shown = programmes.filter((p) => {
    const maxAge = p.maxAge ?? 120;
    return (
      (family === "All" || p.family === family) &&
      p.minAge <= hi &&
      maxAge >= lo &&
      (!q || `${p.name} ${p.summary} ${p.family}`.toLowerCase().includes(q))
    );
  });
  const reset = () => {
    setFamily("All");
    setAge("any");
    setQuery("");
  };

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Programmes</h1>
        <p className="lede">
          Private lessons on nine instruments, group classes for small children
          and a Saturday full of ensembles. Every programme starts with a free
          thirty-minute trial.
        </p>
      </header>

      <div
        className="wrap filters"
        role="search"
        aria-label="Filter programmes"
      >
        <fieldset className="chips">
          <legend>Family</legend>
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
        </fieldset>
        <div className="filter-row">
          <label className="select-field">
            <span>Learner's age</span>
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              {AGES.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="search-field">
            <span>Search</span>
            <span className="search-box">
              <Search aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cello, choir, theory…"
              />
            </span>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} of {programmes.length} programmes
        </p>
      </div>

      <div className="wrap">
        {shown.length ? (
          <div className="prog-grid">
            {shown.map((p) => (
              <ProgrammeCard key={p.slug} p={p} headingLevel={2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              Nothing matches that combination. Try another age or family — or
              ask us, because we often find a way.
            </p>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Coda
        title="Not sure where to start?"
        text="Book a trial in the instrument you're curious about. The teacher will tell you honestly whether it suits — and suggest another if it doesn't."
      />
    </div>
  );
}
