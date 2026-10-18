import { useState } from "react";
import { settings, weddings, type Setting, type Wedding } from "../content";
import { WeddingCard } from "../components/Cards";

const sorts: Record<
  string,
  { label: string; fn: (a: Wedding, b: Wedding) => number }
> = {
  recent: { label: "Most recent", fn: (a, b) => b.date.localeCompare(a.date) },
  large: { label: "Largest first", fn: (a, b) => b.guests - a.guests },
  small: { label: "Smallest first", fn: (a, b) => a.guests - b.guests },
};
type SortKey = keyof typeof sorts;

export function Weddings() {
  const [setting, setSetting] = useState<Setting | "All">("All");
  const [sort, setSort] = useState<SortKey>("recent");
  const list = weddings
    .filter((w) => setting === "All" || w.setting === setting)
    .sort(sorts[sort].fn);

  return (
    <div className="page weddings-page">
      <header className="page-head">
        <h1>Weddings we have planned</h1>
        <p className="lede">
          Orchards, lofts, barns, beaches and one ridge top. Each story tells
          you the brief, the day, and the problem we solved that nobody saw.
        </p>
      </header>

      <div className="toolbar">
        <div className="segmented" role="group" aria-label="Filter by setting">
          {(["All", ...settings] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={setting === s}
              onClick={() => setSetting(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="field inline">
          <label htmlFor="w-sort">Sort</label>
          <select
            id="w-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="count" aria-live="polite">
        {list.length} {list.length === 1 ? "wedding" : "weddings"}
        {setting !== "All" && ` in the ${setting.toLowerCase()} setting`}
      </p>

      <div className="wedding-grid">
        {list.map((w, i) => (
          <WeddingCard key={w.slug} w={w} lazy={i > 1} />
        ))}
      </div>
    </div>
  );
}
