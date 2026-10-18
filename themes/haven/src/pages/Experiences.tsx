import { useState } from "react";
import { experiences, seasonLabel, type Season } from "../content";
import { Link } from "../router";
import { money } from "../lib/stay";

export function Experiences() {
  const [season, setSeason] = useState<Season | "any">("any");
  const [guidedOnly, setGuidedOnly] = useState(false);
  const list = experiences.filter(
    (x) =>
      (season === "any" || x.season === season || x.season === "all") &&
      (!guidedOnly || x.guided),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>Experiences</h1>
        <p className="lede">
          Days out from the house, led by Gion and Mia or drawn on our own map.
          Book at reception the evening before; places are few on purpose.
        </p>
      </header>

      <section className="wrap" aria-label="Filter experiences">
        <div className="filters">
          <fieldset className="chips">
            <legend>Season</legend>
            {(["any", "summer", "winter"] as const).map((s) => (
              <label key={s} className="chip">
                <input
                  type="radio"
                  name="season"
                  checked={season === s}
                  onChange={() => setSeason(s)}
                />
                <span>{s === "any" ? "Any season" : seasonLabel[s]}</span>
              </label>
            ))}
          </fieldset>
          <label className="check">
            <input
              type="checkbox"
              checked={guidedOnly}
              onChange={(e) => setGuidedOnly(e.target.checked)}
            />{" "}
            Guided only
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "experience" : "experiences"}
        </p>
      </section>

      <section className="wrap pad-end" aria-label="Results">
        <ul className="xp-grid">
          {list.map((x, i) => (
            <li key={x.id} className="xp-card">
              <Link to={`/experiences/${x.id}`}>
                <img
                  src={x.image.src}
                  alt={x.image.alt}
                  width={1280}
                  height={853}
                  loading={i > 1 ? "lazy" : undefined}
                />
                <h2>{x.title}</h2>
              </Link>
              <p>{x.line}</p>
              <p className="xp-meta">
                {seasonLabel[x.season]} · {x.duration} · {x.level} ·{" "}
                {x.guided ? "Guided" : "Self-guided"} ·{" "}
                <span className="num">
                  {x.price ? money(x.price) : "Included"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
