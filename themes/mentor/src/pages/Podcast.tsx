import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  episodes,
  images,
  podcast,
  skills,
  type SkillId,
} from "../content";
import { longDate, minutes } from "../lib/format";
import { Player } from "../components/Player";

export function Podcast() {
  const [skill, setSkill] = useState<SkillId | "all">("all");
  const [kind, setKind] = useState<"all" | "solo" | "guest">("all");
  const [q, setQ] = useState("");
  const [latest] = episodes;

  const needle = q.trim().toLowerCase();
  const list = episodes.filter(
    (e) =>
      (skill === "all" || e.skill === skill) &&
      (kind === "all" || (kind === "guest") === !!e.guest) &&
      (!needle ||
        `${e.title} ${e.summary} ${e.guest?.name ?? ""}`
          .toLowerCase()
          .includes(needle)),
  );

  return (
    <div className="page podcast">
      <header className="pod-head">
        <div className="wrap pod-head-grid">
          <div>
            <h1>{podcast.name}</h1>
            <p className="lede">{podcast.description}</p>
            <p className="pod-schedule">{podcast.schedule}</p>
            <ul className="platforms">
              {podcast.platforms.map((p) => (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {p.label} <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={images.mic.src}
            alt={images.mic.alt}
            width={images.mic.w}
            height={images.mic.h}
          />
        </div>
      </header>

      <section className="wrap pod-latest" aria-labelledby="latest-h">
        <h2 id="latest-h">
          <Link to={`/podcast/${latest.slug}`}>
            <span className="num">Episode {latest.number}.</span> {latest.title}
          </Link>
        </h2>
        <p className="pod-latest-meta">
          {longDate(latest.date)} · {minutes(latest.duration)} ·{" "}
          {latest.summary}
        </p>
        <Player ep={latest} compact />
      </section>

      <section className="wrap pod-all" aria-labelledby="all-h">
        <h2 id="all-h">Every episode</h2>
        <div className="filters" role="group" aria-label="Filter episodes">
          <div className="chips" role="group" aria-label="Episode type">
            {(
              [
                ["all", "All"],
                ["solo", "Margo solo"],
                ["guest", "With a guest"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label>
              <span>Skill</span>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value as SkillId | "all")}
              >
                <option value="all">Every skill</option>
                {skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="search">
              <span>Search</span>
              <span className="search-box">
                <Search aria-hidden="true" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="feedback, Kwame…"
                />
              </span>
            </label>
          </div>
        </div>

        <p className="result-count" aria-live="polite">
          {list.length === 1 ? "1 episode" : `${list.length} episodes`}
        </p>

        {list.length ? (
          <ol className="episodes">
            {list.map((e) => (
              <li key={e.slug}>
                <Link to={`/podcast/${e.slug}`} className="ep-row">
                  <span className="ep-num num">{e.number}</span>
                  <span className="ep-main">
                    <span className="ep-title">{e.title}</span>
                    <span className="ep-guest">
                      {e.guest
                        ? `with ${e.guest.name}, ${e.guest.role}`
                        : "Margo, solo"}
                    </span>
                  </span>
                  <span className="ep-meta num">
                    {longDate(e.date)}
                    <br />
                    {minutes(e.duration)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty">
            <p>
              No episode matches that yet. Suggest the topic and it may become
              one.
            </p>
            <a
              className="btn btn-line"
              href={`mailto:${brand.email}?subject=Episode%20idea`}
            >
              Suggest an episode
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
