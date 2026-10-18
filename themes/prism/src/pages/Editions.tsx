import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { editions } from "../content";

const most = Math.max(...editions.map((e) => e.attendees));

export function Editions() {
  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Past editions</h1>
        <p className="lede">
          Five Prisms so far, each with its own theme and its own building. From
          180 people in a borrowed loft to 1,100 around a stage in the round.
        </p>
      </header>

      <ol className="editions">
        {editions.map((e, i) => (
          <li key={e.year}>
            <Link to={`/editions/${e.year}`} className="edition-row">
              <img
                src={e.image.src}
                alt={e.image.alt}
                width={e.image.w}
                height={e.image.h}
                loading={i < 2 ? "eager" : "lazy"}
              />
              <span className="er-year">{e.year}</span>
              <span className="er-body">
                <span className="er-title">{e.title}</span>
                <span className="er-meta">
                  {e.dates} · {e.venue}
                </span>
                <span className="er-summary">{e.summary}</span>
                <span className="er-scale">
                  <span
                    className="er-bar"
                    style={{ width: `${(e.attendees / most) * 100}%` }}
                  />
                  <span className="er-num">
                    {e.attendees.toLocaleString("en")} attendees ·{" "}
                    {e.speakerCount} speakers
                  </span>
                </span>
                <span className="more">
                  Read the recap <ArrowRight aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
