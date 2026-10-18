import { useState } from "react";
import { Search } from "lucide-react";
import { articles, categories, type Category } from "../content";
import { ArticleCard, PageHead } from "../components/Bits";

export function News() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const list = articles.filter(
    (a) =>
      (cat === "all" || a.category === cat) &&
      (!needle ||
        (a.title + " " + a.standfirst).toLowerCase().includes(needle)),
  );
  const [lead, ...rest] = list;

  return (
    <>
      <PageHead
        title="Club news"
        lede="Match reports from the touchline, committee news from the clubhouse, and the people who keep both going."
      />
      <section className="section-tight">
        <div className="wrap">
          <div className="filters">
            <fieldset className="segmented">
              <legend className="sr-only">Category</legend>
              {(["all", ...categories] as const).map((c) => (
                <label key={c}>
                  <input
                    type="radio"
                    name="cat"
                    checked={cat === c}
                    onChange={() => setCat(c)}
                  />
                  <span>{c === "all" ? "Everything" : c}</span>
                </label>
              ))}
            </fieldset>
            <div className="search">
              <label htmlFor="news-q" className="sr-only">
                Search news
              </label>
              <Search aria-hidden="true" size={18} />
              <input
                id="news-q"
                type="search"
                placeholder="Search news"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <p className="count" role="status">
            {list.length} {list.length === 1 ? "story" : "stories"}
          </p>
          {lead ? (
            <div className="news-index">
              <ArticleCard a={lead} lead level={2} />
              <div className="news-rest">
                {rest.map((a) => (
                  <ArticleCard key={a.slug} a={a} level={2} />
                ))}
              </div>
            </div>
          ) : (
            <div className="empty">
              <p>
                Nothing matches "{q}" in {cat === "all" ? "any category" : cat}.
                Try a team name, like "women" or "walking".
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setQ("");
                  setCat("all");
                }}
              >
                Show all news
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
