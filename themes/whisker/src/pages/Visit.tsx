import { ArrowRight, Bus, Car, Check, Footprints } from "lucide-react";
import { Link } from "../router";
import { brand, hours, visit } from "../content";
import { clock, openStatus, weekday } from "../lib/format";
import { Faq } from "../components/Faq";

const icons = [Car, Bus, Footprints];

export function Visit() {
  const status = openStatus();
  const todayIdx = new Date().getDay();

  return (
    <>
      <section className="page-head wrap">
        <h1>{visit.title}</h1>
        <p className="lede">{visit.lede}</p>
      </section>

      <section className="section wrap visit-top">
        <div className="visit-card">
          <h2>Whisker Veterinary Clinic</h2>
          <address className="visit-address">
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
          <p className="hero-status" data-open={status.open ? "" : undefined}>
            <span className="status-dot" aria-hidden="true" /> {status.label}
          </p>
        </div>
        <table className="hours-table">
          <caption>Opening hours</caption>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <tr key={d} aria-current={d === todayIdx ? "date" : undefined}>
                <th scope="row">{weekday[d]}</th>
                <td>
                  {hours[d]
                    ? `${clock(hours[d]!.open)} – ${clock(hours[d]!.close)}`
                    : "Closed — emergency line open"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section wrap" aria-labelledby="h-getting">
        <h2 id="h-getting">Getting here</h2>
        <ul className="getting">
          {visit.getting.map((g, i) => {
            const Icon = icons[i];
            return (
              <li key={g.title}>
                <Icon aria-hidden="true" />
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section wrap first-visit" aria-labelledby="h-first">
        <div>
          <h2 id="h-first">New here? Bring these</h2>
          <p>
            We're taking new patients for dogs, cats, rabbits, guinea pigs and
            rats. First visits are 30 minutes so we can take a full history.
          </p>
          <Link to="/book" className="btn btn-primary">
            Book a first visit <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="check-list">
          {visit.firstVisit.map((f) => (
            <li key={f}>
              <Check aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="h-policies">
        <h2 id="h-policies">Payment & policies</h2>
        <dl className="note-columns note-columns-4">
          {visit.policies.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="section wrap faq-section"
        aria-labelledby="h-visit-faq"
      >
        <h2 id="h-visit-faq">Common questions</h2>
        <Faq items={visit.faqs} />
      </section>
    </>
  );
}
