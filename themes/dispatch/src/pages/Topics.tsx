import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { topics } from "../content";
import { postsIn } from "../lib/util";

export function Topics() {
  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Topics</h1>
        <p className="lede">
          Five beats, walked on foot. Each letter starts with a visit to a place
          where something is being kept running.
        </p>
      </header>
      <ul className="topic-sheets">
        {topics.map((t) => {
          const list = postsIn(t.id);
          const cover = list.find((p) => p.image)?.image;
          return (
            <li key={t.id} className="topic-sheet">
              {cover && (
                <img
                  src={cover.src}
                  alt=""
                  loading="lazy"
                  style={{ aspectRatio: cover.ratio }}
                />
              )}
              <div>
                <h2>
                  <Link to={`/topics/${t.id}`}>{t.name}</Link>
                </h2>
                <p>{t.intro}</p>
                <ul className="topic-latest" aria-label={`Latest in ${t.name}`}>
                  {list.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <Link to={`/archive/${p.slug}`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/topics/${t.id}`} className="text-link">
                  All {list.length} in {t.name}{" "}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
