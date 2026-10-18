import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  caseBySlug,
  clients,
  home,
  photos,
  process,
  roles,
  services,
  type Case,
} from "../content";
import { ASTERISK } from "../components/Mark";
import { CaseCard, Photo } from "../components/CaseCard";

const pick = (slugs: string[]) =>
  slugs.map((s) => caseBySlug(s)).filter((c): c is Case => !!c);

/** The studio sculpture: each turn lands on the next discipline. */
function Sculpture() {
  const [turns, setTurns] = useState(0);
  const service = services[turns % services.length];
  return (
    <div className="sculpture">
      <button
        type="button"
        className="sculpture-button"
        onClick={() => setTurns((t) => t + 1)}
        aria-describedby="sculpture-now"
      >
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          focusable="false"
          style={{ transform: `rotate(${turns * 45}deg)` }}
        >
          <path d={ASTERISK} />
        </svg>
        <span className="sculpture-label">Give it a spin</span>
      </button>
      <p id="sculpture-now" className="sculpture-now" aria-live="polite">
        <Link to="/services">{service.name}</Link>
      </p>
    </div>
  );
}

function CopyEmail() {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
      setState("done");
    } catch {
      setState("failed");
    }
  };
  return (
    <div className="copy-email">
      <button type="button" className="copy-btn" onClick={copy}>
        {state === "done" ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {state === "done" ? "Email copied" : "Copy email address"}
      </button>
      <p aria-live="polite" className="copy-note">
        {state === "failed" &&
          `Your browser blocked copying. The address is ${brand.email}.`}
      </p>
    </div>
  );
}

export function Home() {
  const quote = caseBySlug(home.quoteFrom)!;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <h1 id="hero-title" className="hero-title">
            <span>{home.heroLines[0]}</span>
            <span className="hl">{home.heroLines[1]}</span>
          </h1>
          <Sculpture />
          <div className="hero-foot">
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/contact" className="btn btn-citron">
                Start a brief <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/work" className="btn btn-line-light">
                See the work
              </Link>
            </div>
          </div>
        </div>
        <ul className="wrap hero-reel" aria-label="Latest projects">
          {pick(home.reel).map((c) => (
            <li key={c.slug}>
              <CaseCard c={c} size="small" />
            </li>
          ))}
        </ul>
      </section>

      <section className="section work-home" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="work-title">
              {home.workTitle}{" "}
              <sup className="tabular">({home.featured.length})</sup>
            </h2>
            <Link to="/work" className="text-link">
              Index of all projects <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="stagger-grid">
            {pick(home.featured).map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section clients" aria-labelledby="clients-title">
        <div className="wrap">
          <h2 id="clients-title" className="small-title">
            {home.clientsTitle}
          </h2>
          <ul className="client-run">
            {clients.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section services-home"
        aria-labelledby="services-title"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="services-title">{home.servicesTitle}</h2>
            <Link to="/services" className="text-link">
              Services and fees <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="service-index">
            {services.map((s) => (
              <li key={s.id}>
                <Link to="/services">
                  <span className="service-name">{s.name}</span>
                  <span className="service-summary">{s.summary}</span>
                  <span className="service-weeks tabular">
                    {s.weeks[0]}–{s.weeks[1]} weeks
                  </span>
                  <ArrowUpRight aria-hidden="true" className="service-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="studio-band" aria-labelledby="studio-title">
        <div className="wrap studio-grid">
          <Photo p={photos.critWall} className="studio-photo" />
          <div>
            <h2 id="studio-title">
              {home.studioTitle[0]} {home.studioTitle[1]}{" "}
              <em>{home.studioTitle[2]}</em>
            </h2>
            <div className="two-col">
              {home.studioText.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <Link to="/studio" className="btn btn-ink">
              Meet the studio
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="wrap">
          <h2 id="process-title">{home.processTitle}</h2>
          <ol className="process">
            {process.map((p, i) => (
              <li key={p.name}>
                <span className="process-step tabular" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{p.name}</h3>
                <p className="process-weeks">{p.weeks}</p>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section quote-band"
        aria-label={`What ${quote.client} said`}
      >
        <figure className="wrap quote">
          <blockquote>
            <p>{quote.quote.text}</p>
          </blockquote>
          <figcaption>
            <span>
              <strong>{quote.quote.name}</strong>, {quote.quote.role}
            </span>
            <Link to={`/work/${quote.slug}`} className="text-link">
              Read the case study <ArrowUpRight aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="section careers-home" aria-labelledby="careers-title">
        <div className="wrap careers-home-grid">
          <div>
            <h2 id="careers-title">{home.careersTitle}</h2>
            <Photo p={photos.riso} className="careers-photo" />
          </div>
          <ul className="role-list">
            {roles.map((r) => (
              <li key={r.id}>
                <Link to={`/careers/${r.id}`}>
                  <span className="role-title">{r.title}</span>
                  <span className="role-meta">
                    {r.type} · {r.location}
                  </span>
                  <span className="role-salary tabular">{r.salary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <h2 id="close-title">
            {home.closeTitle[0]}
            <br />
            <span className="hl">{home.closeTitle[1]}</span>
          </h2>
          <div className="close-side">
            <p>{home.closeText}</p>
            <Link to="/contact" className="btn btn-citron btn-big">
              Start a brief <ArrowRight aria-hidden="true" />
            </Link>
            <a href={`mailto:${brand.email}`} className="close-mail">
              {brand.email}
            </a>
            <CopyEmail />
          </div>
        </div>
      </section>
    </>
  );
}
