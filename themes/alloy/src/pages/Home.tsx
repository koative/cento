import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  home,
  images,
  jobs,
  projects,
  services,
  tender,
} from "../content";
import { BuildSequence } from "../components/BuildSequence";
import { ProjectCard } from "../components/ProjectCard";
import { milestone, totalWeeks } from "../lib/programme";

export function Home() {
  const live = projects.filter((p) => p.status === "On site");
  const featured = projects.find((p) => p.slug === "quayside-residences")!;
  const recent = [
    "northgate-tower",
    "ashworth-library",
    "kestrel-park-logistics",
    "millbrook-footbridge",
  ].map((s) => projects.find((p) => p.slug === s)!);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/tender" className="btn btn-signal">
                Invite us to tender <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link to="/projects" className="btn btn-line">
                See the projects
              </Link>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              width={images.hero.w}
              height={images.hero.h}
              fetchPriority="high"
            />
          </figure>
        </div>

        <div className="wrap onsite">
          <h2 className="onsite-title">On site this week</h2>
          <ul className="onsite-list">
            {live.map((p) => {
              const T = totalWeeks(p);
              return (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="onsite-name">
                    {p.name}
                  </Link>
                  <span className="onsite-meta">{milestone(p, p.week!)}</span>
                  <span className="meter" aria-hidden="true">
                    <span style={{ width: `${(p.week! / T) * 100}%` }} />
                  </span>
                  <span className="onsite-week num">
                    Week {p.week} of {T}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section wrap split">
        <div className="split-head">
          <h2>{home.services.title}</h2>
          <p>{home.services.intro}</p>
          <Link to="/services" className="text-link">
            All services <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <ul className="service-index">
          {services.map((s) => (
            <li key={s.id}>
              <Link to={`/services?s=${s.id}`}>
                <span className="service-name">{s.name}</span>
                <span className="service-short">{s.short}</span>
                <span className="service-value num">{s.value}</span>
                <ArrowUpRight aria-hidden="true" className="service-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="band-dark">
        <div className="wrap section">
          <div className="band-head">
            <h2>{home.sequence.title}</h2>
            <p>{home.sequence.intro}</p>
          </div>
          <BuildSequence project={featured} />
          <Link to={`/projects/${featured.slug}`} className="text-link on-dark">
            Read the Quayside Residences story{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="row-head">
          <div>
            <h2>{home.projects.title}</h2>
            <p>{home.projects.intro}</p>
          </div>
          <Link to="/projects" className="text-link">
            All {projects.length} projects{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="recent-grid">
          {recent.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="safety-band">
        <div className="wrap safety-grid">
          <p className="big-figure">
            <span className="num">{home.safety.figure}</span>
            <small>{home.safety.figureLabel}</small>
          </p>
          <div>
            <h2>{home.safety.title}</h2>
            <p>{home.safety.body}</p>
            <Link to="/safety" className="text-link">
              How we keep sites safe <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <h2>{home.process.title}</h2>
        <ol className="steps">
          {home.process.steps.map((s, i) => (
            <li key={s.name}>
              <span className="step-no num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="quote-band">
        <figure className="wrap quote">
          <blockquote>
            <p>{home.testimonial.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.testimonial.name}</strong>
            <span>{home.testimonial.role}</span>
          </figcaption>
        </figure>
      </section>

      <section className="section wrap careers-teaser">
        <img
          src={images.briefing.src}
          alt={images.briefing.alt}
          width={images.briefing.w}
          height={images.briefing.h}
          loading="lazy"
        />
        <div>
          <h2>{home.careers.title}</h2>
          <p>{home.careers.body}</p>
          <ul className="mini-roles">
            {jobs.slice(0, 3).map((j) => (
              <li key={j.id}>
                <Link to={`/careers/${j.id}`}>{j.title}</Link>
                <span>{j.location}</span>
              </li>
            ))}
          </ul>
          <Link to="/careers" className="btn btn-line">
            All {jobs.length} open roles
          </Link>
        </div>
      </section>

      <section className="close-panel">
        <div className="wrap close-grid">
          <div>
            <h2>{home.close.title}</h2>
            <p>{home.close.body}</p>
          </div>
          <div className="close-actions">
            <Link to="/tender" className="btn btn-ink">
              Start a tender invitation{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a href={tender.contacts[0].href} className="close-contact">
              <Mail aria-hidden="true" size={18} /> {tender.contacts[0].value}
            </a>
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="close-contact"
            >
              <Phone aria-hidden="true" size={18} /> {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
