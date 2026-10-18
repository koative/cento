import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { customersPage, stories, type Story } from "../content";

const sizes: ("All" | Story["size"])[] = ["All", "Under 20", "20–100", "100+"];
const industries = [
  "All industries",
  ...new Set(stories.map((s) => s.industry)),
];

export default function Customers() {
  const [size, setSize] = useState<(typeof sizes)[number]>("All");
  const [industry, setIndustry] = useState(industries[0]);
  const shown = stories.filter(
    (s) =>
      (size === "All" || s.size === size) &&
      (industry === industries[0] || s.industry === industry),
  );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{customersPage.h1}</h1>
          <p className="lede">{customersPage.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="filters">
            <fieldset className="chips">
              <legend>Team size</legend>
              {sizes.map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="size"
                    checked={size === s}
                    onChange={() => setSize(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </fieldset>
            <label className="select-label">
              <span>Industry</span>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                {industries.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </label>
            <p className="count" aria-live="polite">
              {shown.length} {shown.length === 1 ? "story" : "stories"}
            </p>
          </div>

          {shown.length ? (
            <ul className="stories">
              {shown.map((s) => (
                <li key={s.slug} className="story">
                  <p className="story-mark">{s.company}</p>
                  <p className="story-meta">
                    {s.industry} · {s.teamSize} people · {s.city}
                  </p>
                  <h2>
                    <Link to={`/customers/${s.slug}`}>{s.headline}</Link>
                  </h2>
                  <p>{s.summary}</p>
                  <ol
                    className="flow"
                    aria-label={`${s.company}’s board columns`}
                  >
                    {s.workflow.map((w) => (
                      <li key={w.name}>{w.name}</li>
                    ))}
                  </ol>
                  <span className="text-link" aria-hidden="true">
                    Read the story <ArrowRight size={16} />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>No stories match both filters yet.</p>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => {
                  setSize("All");
                  setIndustry(industries[0]);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section cta-band">
        <div className="wrap cta-row">
          <h2>Want your team’s board set up before the first call?</h2>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Talk to sales
          </Link>
        </div>
      </section>
    </>
  );
}
