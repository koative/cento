import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  books,
  formatLabels,
  fromPrice,
  sections,
  type Book,
  type FormatId,
  type Section,
} from "../content";
import { BookCard } from "../components/BookCard";

const sorts: Record<
  string,
  { label: string; compare: (a: Book, b: Book) => number }
> = {
  featured: {
    label: "Front table first",
    compare: (a, b) => a.featured - b.featured,
  },
  newest: {
    label: "Newest",
    compare: (a, b) => b.published.localeCompare(a.published),
  },
  priceUp: {
    label: "Price, low to high",
    compare: (a, b) => fromPrice(a) - fromPrice(b),
  },
  priceDown: {
    label: "Price, high to low",
    compare: (a, b) => fromPrice(b) - fromPrice(a),
  },
  title: {
    label: "Title A–Z",
    compare: (a, b) =>
      a.title
        .replace(/^(The|A) /, "")
        .localeCompare(b.title.replace(/^(The|A) /, "")),
  },
  author: {
    label: "Author surname A–Z",
    compare: (a, b) => a.shelf.slice(4).localeCompare(b.shelf.slice(4)),
  },
};

const prices = [
  { id: "any", label: "Any price", test: () => true },
  { id: "under20", label: "Under $20", test: (p: number) => p < 20 },
  { id: "20to30", label: "$20 – $30", test: (p: number) => p >= 20 && p <= 30 },
  { id: "over30", label: "Over $30", test: (p: number) => p > 30 },
];

export function Catalogue() {
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState<Section[]>([]);
  const [format, setFormat] = useState<FormatId | "any">("any");
  const [price, setPrice] = useState("any");
  const [picksOnly, setPicksOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [panel, setPanel] = useState(false);

  const q = query.trim().toLowerCase();
  const priceTest = prices.find((p) => p.id === price)?.test ?? (() => true);
  const results = books
    .filter(
      (b) =>
        (!q ||
          `${b.title} ${b.subtitle ?? ""} ${b.author} ${b.translator ?? ""}`
            .toLowerCase()
            .includes(q)) &&
        (!chosen.length || chosen.includes(b.section)) &&
        (format === "any" || b.formats.some((f) => f.id === format)) &&
        priceTest(fromPrice(b)) &&
        (!picksOnly || !!b.pick),
    )
    .sort(sorts[sort].compare);

  const active =
    chosen.length +
    (format !== "any" ? 1 : 0) +
    (price !== "any" ? 1 : 0) +
    (picksOnly ? 1 : 0) +
    (q ? 1 : 0);

  function reset() {
    setQuery("");
    setChosen([]);
    setFormat("any");
    setPrice("any");
    setPicksOnly(false);
  }

  function toggleSection(s: Section) {
    setChosen((c) => (c.includes(s) ? c.filter((x) => x !== s) : [...c, s]));
  }

  return (
    <div className="page catalogue">
      <header className="page-head">
        <h1>The catalogue</h1>
        <p className="lede">
          Every book on our shelves today, {books.length} titles across three
          rooms. Prices are cover prices; order for collection in two hours or
          bike delivery tomorrow.
        </p>
      </header>

      <div className="catalogue-layout">
        <button
          type="button"
          className="btn btn-ghost filter-toggle"
          aria-expanded={panel}
          aria-controls="filters"
          onClick={() => setPanel(!panel)}
        >
          <SlidersHorizontal size={18} aria-hidden="true" /> Filters
          {active ? ` (${active})` : ""}
        </button>

        <aside
          id="filters"
          className="filters"
          data-open={panel || undefined}
          aria-label="Filter books"
        >
          <div className="field search-field">
            <label htmlFor="q">Search titles and authors</label>
            <div className="input-icon">
              <Search size={17} aria-hidden="true" />
              <input
                id="q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Varga, moss, lighthouses…"
              />
            </div>
          </div>

          <fieldset>
            <legend>Room &amp; section</legend>
            {sections.map((s) => (
              <label key={s} className="check">
                <input
                  type="checkbox"
                  checked={chosen.includes(s)}
                  onChange={() => toggleSection(s)}
                />
                {s}
                <span>{books.filter((b) => b.section === s).length}</span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Format</legend>
            {(["any", "paperback", "hardback", "signed"] as const).map((f) => (
              <label key={f} className="check">
                <input
                  type="radio"
                  name="format"
                  checked={format === f}
                  onChange={() => setFormat(f)}
                />
                {f === "any" ? "Any format" : formatLabels[f]}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            {prices.map((p) => (
              <label key={p.id} className="check">
                <input
                  type="radio"
                  name="price"
                  checked={price === p.id}
                  onChange={() => setPrice(p.id)}
                />
                {p.label}
              </label>
            ))}
          </fieldset>

          <label className="check check-strong">
            <input
              type="checkbox"
              checked={picksOnly}
              onChange={(e) => setPicksOnly(e.target.checked)}
            />
            Staff picks only
          </label>

          {active > 0 && (
            <button type="button" className="text-btn" onClick={reset}>
              Clear all filters
            </button>
          )}
        </aside>

        <section className="results" aria-labelledby="results-count">
          <div className="results-bar">
            <p id="results-count" aria-live="polite">
              {results.length} {results.length === 1 ? "book" : "books"}
            </p>
            <div className="sort">
              <label htmlFor="sort">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {Object.entries(sorts).map(([id, s]) => (
                  <option key={id} value={id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length ? (
            <div className="book-grid">
              {results.map((b) => (
                <BookCard key={b.slug} book={b} showPick />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing on that shelf</h2>
              <p>
                No books match {q ? `“${query.trim()}” with ` : ""}these
                filters. We can still order it in: most books arrive in two to
                three days.
              </p>
              <button type="button" className="btn" onClick={reset}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
