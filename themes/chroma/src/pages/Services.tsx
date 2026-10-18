import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  levelOrder,
  pageCopy,
  levels,
  serviceNotes,
  services,
  type Level,
} from "../content";
import { duration, money, plan } from "../lib/plan";
import { toggleService, useVisit } from "../lib/visit";

export function Services() {
  const [level, setLevel] = useState<Level>("senior");
  const visit = useVisit();
  const chosen = plan(visit.services, level);

  return (
    <div className="page services-page">
      <header className="page-head wrap">
        <h1>{pageCopy.services.title}</h1>
        <p className="lede">{pageCopy.services.lede}</p>
      </header>

      <div className="wrap services-tools">
        <fieldset className="segmented">
          <legend>Show prices for</legend>
          {levelOrder.map((l) => (
            <label key={l}>
              <input
                type="radio"
                name="level"
                value={l}
                checked={level === l}
                onChange={() => setLevel(l)}
              />
              <span>{levels[l].label}</span>
            </label>
          ))}
        </fieldset>
        <p className="level-note" aria-live="polite">
          {levels[level].note}
        </p>
        <nav className="jump" aria-label="Service categories">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                document.getElementById(`cat-${c.id}`)?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              {c.name}
            </button>
          ))}
        </nav>
      </div>

      {categories.map((c) => (
        <section
          key={c.id}
          id={`cat-${c.id}`}
          className="service-cat wrap"
          aria-labelledby={`cat-${c.id}-h`}
        >
          <div className="cat-aside">
            <h2 id={`cat-${c.id}-h`}>{c.name}</h2>
            <p>{c.intro}</p>
            <img
              src={c.photo.src}
              alt={c.photo.alt}
              width={c.photo.w}
              height={c.photo.h}
              loading="lazy"
            />
          </div>
          <ul className="service-list">
            {services
              .filter((s) => s.category === c.id)
              .map((s) => {
                const total = s.steps.reduce((n, st) => n + st.min, 0);
                const added = visit.services.includes(s.id);
                return (
                  <li
                    key={s.id}
                    className="service-row"
                    data-added={added ? "" : undefined}
                  >
                    <div className="service-main">
                      <h3>{s.name}</h3>
                      <p>{s.blurb}</p>
                      <div
                        className="mini-bar"
                        aria-hidden="true"
                        style={{
                          width: `calc(${Math.min(total / 240, 1)} * 22rem)`,
                        }}
                      >
                        {s.steps.map((st) => (
                          <span
                            key={st.label}
                            data-kind={st.kind}
                            style={{ flexGrow: st.min }}
                          />
                        ))}
                      </div>
                      <p className="service-steps">
                        {s.steps
                          .map((st) => `${st.label} ${st.min}′`)
                          .join(" · ")}
                      </p>
                    </div>
                    <div className="service-side">
                      <span className="price num">{money(s.price[level])}</span>
                      <span className="dur num">{duration(total)}</span>
                      {s.patchTest && <span className="tag">Patch test</span>}
                      <button
                        type="button"
                        className="btn btn-small"
                        aria-pressed={added}
                        onClick={() => toggleService(s.id)}
                      >
                        {added ? (
                          <Check aria-hidden="true" size={16} />
                        ) : (
                          <Plus aria-hidden="true" size={16} />
                        )}
                        <span>
                          Add <span className="sr-only">{s.name}</span> to
                          booking
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}

      <section className="wrap notes" aria-labelledby="notes-h">
        <h2 id="notes-h">Good to know</h2>
        <ul>
          {serviceNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      {chosen.services.length > 0 && (
        <div
          className="booking-bar"
          role="region"
          aria-label="Your booking so far"
        >
          <div className="wrap booking-bar-inner">
            <p>
              <strong>
                {chosen.services.length}{" "}
                {chosen.services.length === 1 ? "service" : "services"}
              </strong>
              <span className="num">
                {duration(chosen.minutes)} · {money(chosen.price)} at{" "}
                {levels[level].label}
              </span>
            </p>
            <Link to="/book" className="btn btn-primary">
              Choose a time
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
