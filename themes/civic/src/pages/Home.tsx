import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Search,
  TriangleAlert,
} from "lucide-react";
import { Link } from "../router";
import {
  alerts,
  articles,
  brand,
  categories,
  homeCopy,
  images,
  issueTypes,
  meetings,
  sampleReports,
  services,
  stages,
} from "../content";
import {
  findServices,
  hallStatus,
  longDate,
  shortDate,
  timeOf,
} from "../lib/city";
import { CityMap } from "../components/CityMap";
import { StreetLookup } from "../components/StreetLookup";
import { AlertRow } from "../components/AlertRow";

const nextMeeting = meetings.find((m) => m.upcoming)!;

export function Home() {
  const [q, setQ] = useState("");
  const results = q.trim() ? findServices(q) : [];
  const hall = hallStatus();
  const lead = articles[0];

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-main">
            <h1 id="hero-title">{homeCopy.title}</h1>
            <p className="hero-lede">{homeCopy.lede}</p>
            <div className="search" role="search">
              <label htmlFor="home-search" className="visually-hidden">
                Search city services
              </label>
              <Search size={26} aria-hidden="true" />
              <input
                id="home-search"
                type="search"
                placeholder="Try “trash day” or “permit”"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoComplete="off"
                aria-describedby="home-search-count"
              />
            </div>
            <p
              className="visually-hidden"
              id="home-search-count"
              aria-live="polite"
            >
              {q.trim()
                ? `${results.length} ${results.length === 1 ? "service" : "services"} found`
                : ""}
            </p>
            {q.trim() ? (
              <ul className="search-results">
                {results.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}>
                      <strong>{s.name}</strong>
                      <span>{s.summary}</span>
                    </Link>
                  </li>
                ))}
                {!results.length && (
                  <li className="search-none">
                    Nothing matches “{q}”. Try one word, browse{" "}
                    <Link to="/services">all services</Link> or call{" "}
                    <a href={brand.tel}>{brand.phone}</a>.
                  </li>
                )}
                {results.length > 5 && (
                  <li>
                    <Link
                      to={`/services?q=${encodeURIComponent(q)}`}
                      className="search-more"
                    >
                      See all {results.length} results{" "}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <div className="popular">
                <span id="popular-label">Most asked:</span>
                <ul aria-labelledby="popular-label">
                  {homeCopy.popular.map((t) => (
                    <li key={t}>
                      <button type="button" onClick={() => setQ(t)}>
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="today" aria-labelledby="today-title">
            <h2 id="today-title">{longDate(new Date())}</h2>
            <ul>
              <li>
                <Clock size={20} aria-hidden="true" />
                <span>
                  <strong>City Hall</strong>{" "}
                  <span
                    className="status-dot"
                    data-open={hall.open || undefined}
                    aria-hidden="true"
                  />
                  {hall.open ? "Open" : "Closed"} · {hall.text}
                </span>
              </li>
              <li>
                <TriangleAlert size={20} aria-hidden="true" />
                <span>
                  <strong>
                    {alerts.filter((a) => a.level !== "Notice").length} active
                    alerts.
                  </strong>{" "}
                  <Link to="/alerts">{alerts[0].title}</Link>
                </span>
              </li>
              <li>
                <CalendarDays size={20} aria-hidden="true" />
                <span>
                  <strong>Next meeting</strong>{" "}
                  <Link to={`/council/${nextMeeting.id}`}>
                    {nextMeeting.body}
                  </Link>
                  , {shortDate(nextMeeting.starts)} at{" "}
                  {timeOf(nextMeeting.starts)}
                </span>
              </li>
            </ul>
            <Link to="/report" className="btn btn-ink btn-block">
              Report an issue <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="dir-title">
        <div className="section-head">
          <h2 id="dir-title">Every service, by what it is for</h2>
          <Link to="/services" className="arrow-link">
            Services A–Z <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="directory">
          {categories.map((c) => (
            <div key={c} className="directory-col">
              <h3>{c}</h3>
              <ul>
                {services
                  .filter((s) => s.category === c)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="band band-mist" aria-labelledby="alerts-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="alerts-title">Alerts and closures</h2>
            <Link to="/alerts" className="arrow-link">
              All alerts, and sign up{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="alert-list">
            {alerts.slice(0, 3).map((a) => (
              <AlertRow key={a.id} alert={a} headingLevel={3} />
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section wrap report-teaser"
        aria-labelledby="report-title"
      >
        <div className="report-teaser-text">
          <h2 id="report-title">{homeCopy.reportTitle}</h2>
          <p>{homeCopy.reportBody}</p>
          <Link to="/report" className="btn btn-citron">
            Report an issue <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <h3 className="small-head">Latest reports</h3>
          <ul className="report-feed">
            {sampleReports.slice(0, 4).map((r) => (
              <li key={r.ref}>
                <span className="ref">{r.ref}</span>
                <span>{issueTypes.find((t) => t.id === r.type)?.label}</span>
                <span
                  className="stage-tag"
                  data-stage={r.stage === stages.length - 1 ? "fixed" : "open"}
                >
                  {stages[r.stage]}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <CityMap
          label="Map of open and fixed reports across Commonwell"
          reports={sampleReports}
          className="teaser-map"
        />
      </section>

      <section className="band band-ink" aria-labelledby="lookup-title">
        <div className="wrap">
          <h2 id="lookup-title">Your address, your city</h2>
          <p className="band-lede">
            Trash day, ward, councillor and polling place for any Commonwell
            address.
          </p>
          <StreetLookup headingLevel={3} />
        </div>
      </section>

      <section
        className="section wrap council-teaser"
        aria-labelledby="council-title"
      >
        <img
          src={images.chamber.src}
          alt={images.chamber.alt}
          width={images.chamber.w}
          height={images.chamber.h}
          loading="lazy"
        />
        <div>
          <h2 id="council-title">Next at the council table</h2>
          <div className="date-plate">
            <span>
              {new Date(nextMeeting.starts).toLocaleDateString("en-US", {
                month: "short",
              })}
            </span>
            <strong>{new Date(nextMeeting.starts).getDate()}</strong>
          </div>
          <p className="meeting-line">
            <strong>{nextMeeting.body}</strong> · {timeOf(nextMeeting.starts)} ·{" "}
            {nextMeeting.room}
          </p>
          <p>{nextMeeting.summary}</p>
          <ul className="agenda-peek">
            {nextMeeting.agenda
              .filter((a) => a.kind === "Public hearing" || a.kind === "Action")
              .map((a) => (
                <li key={a.title}>
                  <span className="kind">{a.kind}</span> {a.title}
                </li>
              ))}
          </ul>
          <Link to={`/council/${nextMeeting.id}`} className="arrow-link">
            Full agenda and how to speak{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="news-title">
        <div className="section-head">
          <h2 id="news-title">News from City Hall</h2>
          <Link to="/news" className="arrow-link">
            All news <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="news-home">
          <article className="news-lead">
            <img
              src={lead.image.src}
              alt={lead.image.alt}
              width={lead.image.w}
              height={lead.image.h}
              loading="lazy"
            />
            <p className="meta">
              {lead.topic} ·{" "}
              <time dateTime={lead.date}>{shortDate(lead.date)}</time>
            </p>
            <h3>
              <Link to={`/news/${lead.slug}`}>{lead.title}</Link>
            </h3>
            <p>{lead.dek}</p>
          </article>
          <ul className="news-side">
            {articles.slice(1, 4).map((a) => (
              <li key={a.slug}>
                <p className="meta">
                  {a.topic} · <time dateTime={a.date}>{shortDate(a.date)}</time>
                </p>
                <h3>
                  <Link to={`/news/${a.slug}`}>{a.title}</Link>
                </h3>
                <p className="news-dek">{a.dek}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="winter" aria-labelledby="winter-title">
        <img
          src={images.snowplow.src}
          alt=""
          width={images.snowplow.w}
          height={images.snowplow.h}
          loading="lazy"
        />
        <div className="wrap winter-inner">
          <div className="winter-card">
            <h2 id="winter-title">Snow routes start November 1</h2>
            <p>
              Market Street, 3rd Avenue and Station Street are cleared first.
              When a snow emergency is declared, cars left on them are towed.
            </p>
            <Link to="/services/snow-winter" className="arrow-link">
              Winter roads and snow alerts{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap close" aria-labelledby="close-title">
        <h2 id="close-title">{homeCopy.close.title}</h2>
        <p>{homeCopy.close.body}</p>
        <div className="close-ways">
          <a href={brand.tel} className="close-way">
            <Phone size={22} aria-hidden="true" />
            <span>
              <strong>{brand.phone}</strong>
              <span>{hall.text}</span>
            </span>
          </a>
          <Link to="/city-hall" className="close-way">
            <MapPin size={22} aria-hidden="true" />
            <span>
              <strong>{brand.address[0]}</strong>
              <span>Service desk, first floor</span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
