import { useState } from "react";
import { Phone, Search } from "lucide-react";
import { brand, faq, faqCopy, photos } from "../content";
import { plural } from "../lib/format";

export function Faq() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const groups = faq
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (i) => !term || `${i.q} ${i.a}`.toLowerCase().includes(term),
      ),
    }))
    .filter((g) => g.items.length);
  const count = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <section className="page-head wrap faq-head">
        <div>
          <h1>{faqCopy.title}</h1>
          <p className="lede">{faqCopy.intro}</p>
        </div>
        <img
          src={photos.dash.src}
          alt={photos.dash.alt}
          width={photos.dash.w}
          height={photos.dash.h}
        />
      </section>

      <section className="wrap faq-layout" aria-label="Questions">
        <aside className="faq-side">
          <label className="search" htmlFor="faq-q">
            <Search aria-hidden="true" />
            <span className="sr-only">Search questions</span>
            <input
              id="faq-q"
              type="search"
              placeholder="Search: deposit, late, chains…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <p className="results-count" aria-live="polite">
            {term
              ? `${plural(count, "answer")} for “${q.trim()}”`
              : `${plural(count, "answer")} in ${faq.length} topics`}
          </p>
          <nav aria-label="Topics">
            <ul className="faq-topics">
              {groups.map((g) => (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(`faq-${g.id}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    {g.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="faq-call">
            <p>Roadside, any hour</p>
            <a href={brand.roadsideHref} className="btn btn-outline">
              <Phone aria-hidden="true" /> {brand.roadside}
            </a>
          </div>
        </aside>

        <div className="faq-groups">
          {groups.map((g) => (
            <section
              key={g.id}
              id={`faq-${g.id}`}
              aria-labelledby={`faq-${g.id}-h`}
              className="faq-group"
            >
              <h2 id={`faq-${g.id}-h`}>{g.title}</h2>
              <div className="faq-list">
                {g.items.map((i) => (
                  <details key={i.q} open={!!term}>
                    <summary>{i.q}</summary>
                    <p>{i.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          {!groups.length && (
            <div className="empty">
              <p>
                Nothing matches “{q.trim()}”. Try a single word like deposit,
                license or fuel, or call us on {brand.phone}.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setQ("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
