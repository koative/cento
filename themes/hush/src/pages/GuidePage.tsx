import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { brand, guides, type Guide } from "../content";

export function GuidePage({ guide }: { guide: Guide }) {
  const [done, setDone] = useState<number[]>([]);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="page guide-page">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/support">Support</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{guide.title}</span>
      </nav>

      <header className="page-head">
        <h1>{guide.title}</h1>
        <p className="lead">{guide.summary}</p>
        <p className="guide-meta">
          <span className="num">About {guide.minutes} min</span>
          <span>For {guide.products.join(", ")}</span>
        </p>
      </header>

      <div className="guide-body">
        <ol className="steps">
          {guide.steps.map((s, i) => {
            const checked = done.includes(i);
            return (
              <li key={s.title} data-done={checked || undefined}>
                <label className="step-check">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setDone(
                        checked ? done.filter((d) => d !== i) : [...done, i],
                      )
                    }
                  />
                  <span className="visually-hidden">
                    Mark step {i + 1} done
                  </span>
                  <span className="step-num num" aria-hidden="true">
                    {checked ? <Check size={18} /> : i + 1}
                  </span>
                </label>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="progress" aria-live="polite">
          {done.length === guide.steps.length
            ? "All steps done."
            : `${done.length} of ${guide.steps.length} steps done`}
        </p>
        {guide.note && <p className="note">{guide.note}</p>}

        <div className="helpful">
          {helpful === null ? (
            <>
              <p id="h-helpful">Did this guide solve it?</p>
              <div role="group" aria-labelledby="h-helpful">
                <button
                  type="button"
                  className="btn btn-small btn-quiet"
                  onClick={() => setHelpful(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-small btn-quiet"
                  onClick={() => setHelpful(false)}
                >
                  Not yet
                </button>
              </div>
            </>
          ) : (
            <p role="status">
              {helpful
                ? "Glad to hear it. Thanks for telling us."
                : "Sorry about that. "}
              {!helpful && (
                <>
                  <Link to="/support">Write to support</Link> or call{" "}
                  <a href={"tel:" + brand.phone.replace(/\s/g, "")}>
                    {brand.phone}
                  </a>
                  .
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <section className="related-guides" aria-labelledby="h-more">
        <h2 id="h-more">Other guides</h2>
        <ul className="guide-list">
          {others.map((g) => (
            <li key={g.slug}>
              <Link to={"/support/" + g.slug}>
                <b>{g.title}</b>
                <span>{g.summary}</span>
                <span className="muted num">{g.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/support" className="text-link">
          All guides and FAQ <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
