import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { programmes, themes, type Theme } from "../content";

export function Programmes() {
  const [theme, setTheme] = useState<Theme | "All">("All");
  const shown =
    theme === "All" ? programmes : programmes.filter((p) => p.theme === theme);

  return (
    <>
      <header className="page-head wrap">
        <h1>Programmes</h1>
        <p className="lede">
          Clean, restore, survey, teach. Each programme has a lead, a stretch of
          coast and a number it reports every year, good or bad.
        </p>
      </header>

      <section className="wrap section-tight">
        <div className="filter-bar">
          <div
            className="chips"
            role="group"
            aria-label="Filter by type of work"
          >
            {(["All", ...themes.map((t) => t.id)] as const).map((id) => (
              <button
                key={id}
                type="button"
                className="chip"
                aria-pressed={theme === id}
                onClick={() => setTheme(id)}
              >
                {id}
                <span className="chip-count num">
                  {id === "All"
                    ? programmes.length
                    : programmes.filter((p) => p.theme === id).length}
                </span>
              </button>
            ))}
          </div>
          <p className="filter-status" aria-live="polite">
            {theme === "All"
              ? `All ${shown.length} programmes`
              : `${shown.length} ${theme.toLowerCase()} programme${shown.length === 1 ? "" : "s"}: ${themes.find((t) => t.id === theme)!.blurb}`}
          </p>
        </div>

        <ul className="atlas">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link to={`/programmes/${p.slug}`} className="atlas-item">
                <span className="atlas-img">
                  <img
                    src={p.image.src}
                    alt=""
                    width={p.image.w}
                    height={p.image.h}
                    loading="lazy"
                  />
                </span>
                <strong className="atlas-name">{p.name}</strong>
                <span className="atlas-summary">{p.summary}</span>
                <span className="atlas-facts">
                  <span>
                    {p.theme} <strong className="num">since {p.since}</strong>
                  </span>
                  {p.facts.slice(0, 2).map((f) => (
                    <span key={f.label}>
                      {f.label} <strong className="num">{f.value}</strong>
                    </span>
                  ))}
                </span>
                <span className="text-link">
                  {p.region} <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
