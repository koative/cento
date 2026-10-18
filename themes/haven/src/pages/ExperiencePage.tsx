import { ArrowLeft } from "lucide-react";
import { brand, experiences, seasonLabel, type Experience } from "../content";
import { Link } from "../router";
import { money } from "../lib/stay";

export function ExperiencePage({ experience: x }: { experience: Experience }) {
  const related = experiences
    .filter(
      (e) =>
        e.id !== x.id &&
        (e.season === x.season || e.season === "all" || x.season === "all"),
    )
    .slice(0, 3);

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/experiences" className="back-link">
          <ArrowLeft aria-hidden="true" /> All experiences
        </Link>
      </div>

      <section className="wrap xp-top">
        <div>
          <h1>{x.title}</h1>
          <p className="lede">{x.line}</p>
          <dl className="facts">
            <div>
              <dt>Season</dt>
              <dd>{seasonLabel[x.season]}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{x.duration}</dd>
            </div>
            <div>
              <dt>Level</dt>
              <dd>{x.level}</dd>
            </div>
            <div>
              <dt>Meet</dt>
              <dd>{x.meet}</dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>{x.group}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd className="num">
                {x.price
                  ? `${money(x.price)} per person`
                  : "Included in your stay"}
              </dd>
            </div>
          </dl>
        </div>
        <img
          src={x.image.src}
          alt={x.image.alt}
          width={1280}
          height={853}
          className="xp-img"
        />
      </section>

      <section className="section wrap xp-body">
        <div className="prose">
          <h2>What happens</h2>
          <p>{x.intro}</p>
          <h2>What to bring</h2>
          <ul>
            {x.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p>
            Reserve a place at reception the evening before, or write to{" "}
            <a
              href={`mailto:${brand.email}?subject=${encodeURIComponent(x.title)}`}
            >
              {brand.email}
            </a>{" "}
            before you arrive.
          </p>
        </div>
        <div>
          <h2>The day</h2>
          <ol className="timeline">
            {x.plan.map((p) => (
              <li key={p.time}>
                <span className="timeline-time num">{p.time}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section wrap" aria-labelledby="more-h">
          <h2 id="more-h">In the same season</h2>
          <ul className="xp-list">
            {related.map((e) => (
              <li key={e.id}>
                <Link to={`/experiences/${e.id}`}>
                  <span className="xp-title">{e.title}</span>
                  <span className="xp-meta">
                    {e.duration} · {e.level} ·{" "}
                    {e.price ? money(e.price) : "Included"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
