import { useState } from "react";
import { Search } from "lucide-react";
import { papers, research, type Topic } from "../content";
import { PageHead } from "../components/PageHead";
import { PaperRow } from "../components/PaperRow";

export default function Research() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<Topic | "All">("All");
  const [order, setOrder] = useState<"new" | "old">("new");
  const q = query.trim().toLowerCase();
  const shown = papers
    .filter((p) => topic === "All" || p.topic === topic)
    .filter(
      (p) =>
        !q ||
        [p.title, p.abstract, p.authors.join(" "), p.report].some((t) =>
          t.toLowerCase().includes(q),
        ),
    )
    .sort((a, b) =>
      order === "new"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );

  return (
    <>
      <PageHead title={research.heading} lead={research.lead} />
      <section className="wrap" aria-label="Search and filter papers">
        <div className="list-tools">
          <div className="search">
            <Search size={18} aria-hidden />
            <label htmlFor="paper-q" className="visually-hidden">
              Search papers
            </label>
            <input
              id="paper-q"
              type="search"
              placeholder="Search titles, abstracts, authors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <fieldset className="segmented wrap-ok">
            <legend className="visually-hidden">Topic</legend>
            {(["All", ...research.topics] as const).map((t) => (
              <label key={t}>
                <input
                  type="radio"
                  name="topic"
                  checked={topic === t}
                  onChange={() => setTopic(t)}
                />
                <span>{t}</span>
              </label>
            ))}
          </fieldset>
          <label className="sort">
            <span>Order</span>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "new" | "old")}
            >
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
            </select>
          </label>
          <p className="list-count" aria-live="polite">
            {shown.length} of {papers.length} papers
          </p>
        </div>
      </section>

      <section className="wrap">
        {shown.length ? (
          <ul className="paper-list library">
            {shown.map((p) => (
              <PaperRow key={p.slug} paper={p} level={2} />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No papers match “{query}” in{" "}
              {topic === "All" ? "any topic" : topic}.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setQuery("");
                setTopic("All");
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </>
  );
}
