import { ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "../router";
import { brand, days, faq, hours, visit } from "../content";
import { hoursLabel, openStatus } from "../lib/plan";

export function Visit() {
  const status = openStatus();
  const today = new Date().getDay();

  return (
    <div className="page visit-page">
      <header className="page-head wrap">
        <h1>{visit.title}</h1>
        <p className="lede">{visit.lede}</p>
      </header>

      <div className="wrap visit-top">
        <img
          src={visit.photo.src}
          alt={visit.photo.alt}
          width={visit.photo.w}
          height={visit.photo.h}
        />
        <div className="visit-facts">
          <p className="open-status" data-open={status.open ? "" : undefined}>
            <Clock aria-hidden="true" size={16} />
            {status.label}
          </p>
          <table className="hours-table">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {[2, 3, 4, 5, 6, 0, 1].map((d) => (
                <tr key={d} aria-current={d === today ? "date" : undefined}>
                  <th scope="row">{days[d]}</th>
                  <td className="num">{hoursLabel(hours[d])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="contact-list">
            <li>
              <MapPin aria-hidden="true" size={18} />
              {brand.address.join(", ")}
            </li>
            <li>
              <Phone aria-hidden="true" size={18} />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </li>
            <li>
              <Mail aria-hidden="true" size={18} />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <section className="wrap getting" aria-labelledby="getting-h">
        <h2 id="getting-h">Getting here</h2>
        <dl>
          {visit.getting.map((g) => (
            <div key={g.title}>
              <dt>{g.title}</dt>
              <dd>{g.body}</dd>
            </div>
          ))}
          <div>
            <dt>Access</dt>
            <dd>{visit.access}</dd>
          </div>
        </dl>
      </section>

      <section className="wrap policies" aria-labelledby="policies-h">
        <h2 id="policies-h">Policies</h2>
        <dl>
          {visit.policies.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions we hear at the desk</h2>
        <div className="faq-list">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <ChevronDown aria-hidden="true" size={20} />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p>
          Still wondering? <a href={brand.phoneHref}>Call the desk</a> or{" "}
          <Link to="/book">book a free colour consultation</Link>.
        </p>
      </section>
    </div>
  );
}
