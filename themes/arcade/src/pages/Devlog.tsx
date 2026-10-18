import { useState } from "react";
import { games, posts, type PostTag } from "../content";
import { PostCard } from "../components/PostCard";

const TAGS: PostTag[] = ["Design", "Art", "Tech", "Studio", "Release"];

export function Devlog() {
  const [tag, setTag] = useState<PostTag | "all">("all");
  const [game, setGame] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtering = tag !== "all" || game !== "all" || q !== "";
  const shown = posts.filter(
    (p) =>
      (tag === "all" || p.tag === tag) &&
      (game === "all" || p.game === game) &&
      (!q || `${p.title} ${p.excerpt} ${p.author}`.toLowerCase().includes(q)),
  );
  const [lead, ...rest] = shown;

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>Devlog</h1>
        <p className="lede">
          How the games get made, written by the people making them. Design
          notes, art rules, patch notes, and the spreadsheet that keeps us from
          crunching.
        </p>
      </header>

      <div className="filters" role="search" aria-label="Filter posts">
        <fieldset className="chips">
          <legend className="sr-only">Topic</legend>
          {(["all", ...TAGS] as const).map((t) => (
            <label key={t} className="chip">
              <input
                type="radio"
                name="tag"
                value={t}
                checked={tag === t}
                onChange={() => setTag(t)}
              />
              <span>{t === "all" ? "Everything" : t}</span>
            </label>
          ))}
        </fieldset>
        <div className="filter-fields">
          <label className="mini-field">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Fog, fuel, fish…"
            />
          </label>
          <label className="mini-field">
            <span>Game</span>
            <select value={game} onChange={(e) => setGame(e.target.value)}>
              <option value="all">Any game</option>
              {games
                .filter((g) => posts.some((p) => p.game === g.slug))
                .map((g) => (
                  <option key={g.slug} value={g.slug}>
                    {g.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>

      <h2 className="sr-only">Posts</h2>
      <p className="result-count" aria-live="polite">
        {shown.length === 1 ? "1 post" : `${shown.length} posts`}
      </p>

      {lead ? (
        <>
          {!filtering && <PostCard post={lead} big />}
          <div className="post-row">
            {(filtering ? shown : rest).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty">
          <p>No posts match that. Try another topic, or clear the search.</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setTag("all");
              setGame("all");
              setQuery("");
            }}
          >
            Show every post
          </button>
        </div>
      )}
    </div>
  );
}
