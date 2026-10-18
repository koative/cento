import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { services, type Service } from "../content";
import { ClinicianBadge } from "../components/ClinicianBadge";
import { Faq } from "../components/Faq";
import {
  clinicianBy,
  fmtTime,
  fromIso,
  locationBy,
  nextSlots,
} from "../lib/schedule";

export function ServicePage({ service }: { service: Service }) {
  const team = service.clinicians.map((slug) => clinicianBy(slug)!);
  const next = nextSlots(service, 3);
  const related = services
    .filter(
      (s) =>
        s.slug !== service.slug &&
        (s.audience === service.audience || s.audience === "Everyone"),
    )
    .slice(0, 3);

  return (
    <article className="service">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/services">Services</Link> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{service.name}</span>
      </nav>

      <header className="service-head">
        <div>
          <h1>{service.name}</h1>
          <p className="lede">{service.lede}</p>
          <Link to={`/book?service=${service.slug}`} className="btn btn-large">
            Book {service.name.toLowerCase()}{" "}
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <figure>
          <img
            src={service.image}
            alt={service.alt}
            width={1800}
            height={1200}
          />
        </figure>
      </header>

      <div className="service-body">
        <div className="service-main">
          <section>
            <h2>What happens at the visit</h2>
            <ol className="timeline">
              {service.steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2>What’s covered</h2>
            <ul className="ticks">
              {service.includes.map((i) => (
                <li key={i}>
                  <Check size={18} aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Bring with you</h2>
            <ul className="ticks">
              {service.bring.map((b) => (
                <li key={b}>
                  <Check size={18} aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Questions people ask</h2>
            <Faq items={service.faqs} />
          </section>
        </div>

        <aside className="service-aside">
          <dl className="facts">
            <div>
              <dt>Length</dt>
              <dd>{service.minutes} minutes</dd>
            </div>
            <div>
              <dt>For</dt>
              <dd>{service.ages}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>
                {service.locations.map((l) => locationBy(l)?.name).join(", ")}
              </dd>
            </div>
            <div>
              <dt>With insurance</dt>
              <dd>{service.insured}</dd>
            </div>
            <div>
              <dt>Self-pay</dt>
              <dd>
                ${service.selfPay}{" "}
                <span className="muted">· sliding scale available</span>
              </dd>
            </div>
          </dl>
          {next.length > 0 && (
            <div className="aside-slots">
              <h2>Next open times</h2>
              <ul>
                {next.map((s) => (
                  <li key={`${s.date}${s.time}${s.clinician}`}>
                    <Link
                      to={`/book?service=${service.slug}&clinician=${s.clinician}&location=${s.location}`}
                    >
                      <span className="ns-time">
                        {fromIso(s.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                        , {fmtTime(s.time)}
                      </span>
                      <span className="ns-who">
                        {clinicianBy(s.clinician)?.name} ·{" "}
                        {locationBy(s.location)?.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Who you’ll see</h2>
        </div>
        <div className="badge-row">
          {team.map((c) => (
            <ClinicianBadge key={c.slug} clinician={c} />
          ))}
        </div>
      </section>

      <section className="section related">
        <h2>Related care</h2>
        <ul className="index-list">
          {related.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`}>
                <span className="index-name">{s.name}</span>
                <span className="index-short">{s.short}</span>
                <span className="index-meta">{s.minutes} min</span>
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
