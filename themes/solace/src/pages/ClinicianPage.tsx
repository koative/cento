import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { clinicians, services, type Clinician } from "../content";
import { ClinicianBadge } from "../components/ClinicianBadge";
import {
  DAYS,
  WEEK,
  fmtTime,
  fromIso,
  locationBy,
  nextSlots,
} from "../lib/schedule";

export function ClinicianPage({ clinician }: { clinician: Clinician }) {
  const offers = services.filter((s) => s.clinicians.includes(clinician.slug));
  const next = offers.length
    ? nextSlots(offers[0], 4, { clinician: clinician.slug })
    : [];
  const others = clinicians
    .filter((c) => c.slug !== clinician.slug && c.role === clinician.role)
    .slice(0, 3);

  return (
    <article className="profile">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/clinicians">Clinicians</Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{clinician.name}</span>
      </nav>

      <header className="profile-head">
        <span className="profile-initials" aria-hidden="true">
          {clinician.initials}
        </span>
        <div>
          <h1>{clinician.name}</h1>
          <p className="profile-role">
            {clinician.role} · <span>{clinician.pronouns}</span>
          </p>
          <p className="muted">
            {clinician.credentials}. At Solace since {clinician.since}.
          </p>
        </div>
        <p
          className="badge-status"
          data-open={clinician.accepting || undefined}
        >
          {clinician.accepting
            ? "Accepting new patients"
            : "Waiting list for new patients"}
        </p>
      </header>

      <div className="profile-body">
        <div className="profile-main">
          {clinician.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <blockquote className="profile-quote">
            <p>“{clinician.quote}”</p>
          </blockquote>

          <h2>Special interests</h2>
          <ul className="pill-list">
            {clinician.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>

          <h2>Book {clinician.short} for</h2>
          <ul className="index-list index-compact">
            {offers.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/book?service=${s.slug}&clinician=${clinician.slug}`}
                >
                  <span className="index-name">{s.name}</span>
                  <span className="index-meta">{s.minutes} min</span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="profile-aside">
          <h2>Weekly clinics</h2>
          <table className="week">
            <caption className="visually-hidden">
              Where {clinician.name} works each day
            </caption>
            <tbody>
              {WEEK.slice(0, 6).map((d) => {
                const loc = Object.keys(clinician.schedule).find((slug) =>
                  clinician.schedule[slug].includes(d),
                );
                return (
                  <tr key={d} data-off={loc ? undefined : ""}>
                    <th scope="row">{DAYS[d]}</th>
                    <td>{loc ? locationBy(loc)?.name : "Not in clinic"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="muted">Languages: {clinician.languages.join(", ")}</p>

          {next.length > 0 && (
            <div className="aside-slots">
              <h2>Next open times</h2>
              <ul>
                {next.map((s) => (
                  <li key={`${s.date}${s.time}`}>
                    <Link
                      to={`/book?service=${offers[0].slug}&clinician=${clinician.slug}&location=${s.location}`}
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
                        {offers[0].name} · {locationBy(s.location)?.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Also a {clinician.role.toLowerCase()}</h2>
          </div>
          <div className="badge-row">
            {others.map((c) => (
              <ClinicianBadge key={c.slug} clinician={c} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
