import { useState } from "react";
import { Link } from "../router";
import { articles, type Article } from "../content";
import { shortDate } from "../lib/city";
import { PageHead } from "../components/PageHead";

const topics = ["All", ...new Set(articles.map((a) => a.topic))] as (
  "All" | Article["topic"]
)[];

export function News() {
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const list = articles.filter((a) => topic === "All" || a.topic === topic);

  return (
    <>
      <PageHead
        title="News"
        lede="Road works, budgets, parks and the library — what changed in Commonwell, from the departments that did it."
      />
      <div className="wrap section">
        <fieldset className="chip-set chip-row">
          <legend className="visually-hidden">Filter by topic</legend>
          {topics.map((t) => (
            <label key={t} className="chip">
              <input
                type="radio"
                name="topic"
                checked={topic === t}
                onChange={() => setTopic(t)}
              />
              {t}
            </label>
          ))}
        </fieldset>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "story" : "stories"}
        </p>
        <ul className="news-list">
          {list.map((a) => (
            <li key={a.slug} className="news-item">
              <img
                src={a.image.src}
                alt=""
                width={a.image.w}
                height={a.image.h}
                loading="lazy"
              />
              <div>
                <p className="meta">
                  {a.topic} · <time dateTime={a.date}>{shortDate(a.date)}</time>{" "}
                  · {a.from}
                </p>
                <h2>
                  <Link to={`/news/${a.slug}`}>{a.title}</Link>
                </h2>
                <p>{a.dek}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
