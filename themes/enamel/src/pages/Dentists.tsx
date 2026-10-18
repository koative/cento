import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { days, dentists, treatments } from "../content";
import { initials } from "../lib/format";

export function Dentists() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Dentists</h1>
        <p className="lede">
          Five dentists and a hygienist, each with a clear speciality, so the
          person who does your root canal does nothing but root canals. Pick
          someone when you book, or let us match you.
        </p>
      </header>

      <ul className="wrap dentist-grid">
        {dentists.map((d) => (
          <li key={d.slug}>
            <Link to={`/dentists/${d.slug}`} className="dentist">
              <span className="monogram" aria-hidden="true">
                {initials(d.name)}
              </span>
              <span className="d-name">{d.name}</span>
              <span className="d-role">{d.role}</span>
              <span className="d-focus">{d.focus}</span>
              <span className="d-meta">
                <span>
                  In clinic {d.days.map((n) => days[n].slice(0, 3)).join(", ")}
                </span>
                <span>Since {d.since}</span>
              </span>
              <span className="d-treat">
                {treatments
                  .filter((t) => t.dentists.includes(d.slug))
                  .map((t) => t.name)
                  .join(" · ")}
              </span>
              <span className="link-arrow" aria-hidden="true">
                Profile <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="wrap callout" aria-labelledby="match-h">
        <h2 id="match-h">Not sure who to see?</h2>
        <p>
          Start with a check-up with Dr. Okafor or Dr. Marchetti. If you need a
          specialist, they'll book you in with them directly — no referral
          letters, no second waiting list.
        </p>
        <Link to="/book?t=check-up" className="btn btn-primary">
          Book a check-up
        </Link>
      </section>
    </div>
  );
}
