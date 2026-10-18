import { useState } from "react";
import { Search } from "lucide-react";
import { brand, faqs, faqTopics } from "../content";

export function Faq() {
  const [topic, setTopic] = useState<(typeof faqTopics)[number]>("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = faqs.filter(
    (f) =>
      (topic === "All" || f.topic === topic) &&
      (!q || `${f.q} ${f.a}`.toLowerCase().includes(q)),
  );
  const groups = faqTopics.filter(
    (t) => t !== "All" && shown.some((f) => f.topic === t),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>Questions, answered</h1>
        <p>
          Tickets, entry, camping, care and access. If it isn't here, email{" "}
          <a href={`mailto:${brand.email}`}>{brand.email}</a> — we reply within
          a day, faster in July.
        </p>
      </header>

      <section
        className="wrap section-tight faq-page"
        aria-label="Frequently asked questions"
      >
        <div className="filters">
          <div className="search">
            <label htmlFor="faq-q">Search the FAQ</label>
            <div className="search-box">
              <Search aria-hidden="true" />
              <input
                id="faq-q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Refund, camping, ID…"
              />
            </div>
          </div>
          <fieldset className="chips">
            <legend>Topic</legend>
            {faqTopics.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </fieldset>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "answer" : "answers"}
        </p>

        {groups.map((t) => (
          <div key={t} className="faq-group">
            <h2>{t}</h2>
            <div className="faq-list">
              {shown
                .filter((f) => f.topic === t)
                .map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
            </div>
          </div>
        ))}
        {!shown.length && (
          <div className="empty">
            <p>
              No answer matches “{query}”. Try a shorter word, or ask us
              directly.
            </p>
            <a className="btn btn-line" href={`mailto:${brand.email}`}>
              Email {brand.email}
            </a>
          </div>
        )}
      </section>
    </>
  );
}
