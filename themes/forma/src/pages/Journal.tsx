import { useState } from "react";
import { Link } from "../router";
import { postCategories, posts, type PostCategory } from "../content";
import { longDate, readMinutes } from "../lib/format";

export function Journal() {
  const [cat, setCat] = useState<PostCategory | "All">("All");
  const list = posts.filter((p) => cat === "All" || p.category === cat);
  const [lead, ...rest] = list;

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Journal</h1>
        <p>
          Essays, site notes and material studies from the studio, written by
          the people who drew the buildings.
        </p>
      </header>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by category">
          {(["All", ...postCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {list.length === 1 ? "1 entry" : `${list.length} entries`}
      </p>

      {lead && (
        <Link to={"/journal/" + lead.slug} className="post-lead">
          <span className="post-lead-img">
            <img
              src={lead.image.src}
              alt={lead.image.alt}
              width={lead.image.w}
              height={lead.image.h}
            />
          </span>
          <span className="post-lead-text">
            <span className="post-meta">
              {lead.category} · {longDate(lead.date)} · {readMinutes(lead)} min
              read
            </span>
            <span className="post-title">{lead.title}</span>
            <span className="post-excerpt">{lead.excerpt}</span>
            <span className="post-meta">By {lead.author}</span>
          </span>
        </Link>
      )}

      <ul className="post-list">
        {rest.map((p) => (
          <li key={p.slug}>
            <Link to={"/journal/" + p.slug} className="post-row">
              <img
                src={p.image.src}
                alt=""
                width={p.image.w}
                height={p.image.h}
                loading="lazy"
              />
              <span className="post-meta">
                {p.category} · {longDate(p.date)}
              </span>
              <span className="post-title">{p.title}</span>
              <span className="post-excerpt">{p.excerpt}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
