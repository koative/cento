import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  home,
  images,
  materials,
  projects,
  services,
  stages,
} from "../content";
import { ProjectCard } from "../components/ProjectCard";
import { availability, formatDay } from "../lib/slots";

const byId = (id: string) => materials.find((m) => m.id === id)!;

export function Home() {
  const hero = projects.find((p) => p.slug === home.heroProject)!;
  const featured = home.featured.map((slug) =>
    projects.find((p) => p.slug === slug)!,
  );
  const quoted = projects.find((p) => p.slug === home.testimonialProject)!;
  const openings = availability("library")
    .flatMap((d) =>
      d.times.filter((t) => !t.taken).map((t) => ({ day: d, time: t.time })),
    )
    .slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{brand.tagline}</h1>
          <p className="lede">
            Mosaic designs homes, inns and restaurants across New England — and
            chooses every stone, timber and plaster with you, in the light of
            your own rooms.
          </p>
          <div className="actions">
            <Link to="/consultation" className="btn">
              Book a consultation
            </Link>
            <Link to="/projects" className="text-link">
              See the projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src={hero.cover}
            alt={hero.gallery[0].alt}
            width={1800}
            height={1350}
            fetchPriority="high"
          />
          <figcaption>
            <Link to={`/projects/${hero.slug}`}>{hero.name}</Link>
            <span>
              {hero.place} · {hero.year}
            </span>
          </figcaption>
        </figure>
        <div className="hero-samples">
          <p>In this room</p>
          <ul>
            {hero.materials.map((id) => {
              const m = byId(id);
              return (
                <li key={id}>
                  <Link to={`/materials/${id}`}>
                    <img src={m.image} alt="" width={80} height={80} />
                    {m.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Recent projects</h2>
          <Link to="/projects" className="text-link">
            All {projects.length} projects{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              size={i === 0 ? "lg" : "md"}
            />
          ))}
        </div>
      </section>

      <section className="statement">
        <p className="statement-line">{home.statement}</p>
        <p>{home.statementNote}</p>
      </section>

      <section className="section library-band">
        <div className="library-copy">
          <h2>The material library</h2>
          <p>
            Fourteen hundred samples live on Cordage Lane; {materials.length} of
            our most specified are online. Put any of them on a sample board,
            see it in morning and lamplight, and we will post up to six to you
            free.
          </p>
          <div className="actions">
            <Link to="/materials" className="btn">
              Open the library
            </Link>
            <Link to="/samples" className="text-link">
              Your sample board <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ul className="tessera-wall">
          {home.librarySwatches.map((id) => {
            const m = byId(id);
            return (
              <li key={id}>
                <Link to={`/materials/${id}`}>
                  <img
                    src={m.image}
                    alt=""
                    loading="lazy"
                    width={800}
                    height={800}
                  />
                  <span>{m.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Ways to work with us</h2>
          <Link to="/services" className="text-link">
            Services and fees <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="service-rows">
          {services.map((s) => (
            <li key={s.id}>
              <h3>{s.name}</h3>
              <p>{s.summary}</p>
              <p className="service-fee">
                <strong>{s.fee}</strong>
                <span>{s.duration}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section process-glance">
        <div className="section-head">
          <h2>From first visit to the last lamp</h2>
          <Link to="/process" className="text-link">
            How a project runs <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="glance-steps">
          {stages.map((s) => (
            <li key={s.name}>
              <h3>{s.name}</h3>
              <p className="tabular">
                Weeks {s.weeks.home[0]}–{s.weeks.home[1]}
              </p>
            </li>
          ))}
        </ol>
        <p className="fine">
          Typical whole-home timeline. A single room runs about twelve weeks.
        </p>
      </section>

      {quoted.quote && (
        <section className="testimonial">
          <img
            src={quoted.gallery[1].src}
            alt={quoted.gallery[1].alt}
            loading="lazy"
          />
          <blockquote>
            <p>“{quoted.quote.text}”</p>
            <footer>
              {quoted.quote.by} —{" "}
              <Link to={`/projects/${quoted.slug}`}>{quoted.name}</Link>
            </footer>
          </blockquote>
        </section>
      )}

      <section className="section visit">
        <img
          src={images.longRoom}
          alt="Long living room with low furniture, warm timber and a wall of windows onto trees"
          loading="lazy"
        />
        <div>
          <h2>Visit the library</h2>
          <p>
            Five designers, one long table and fourteen hundred samples. We take
            on around twelve projects a year, so the person you meet first is
            the person who finishes your house.
          </p>
          <dl className="visit-facts">
            <div>
              <dt>Address</dt>
              <dd>{brand.address.join(", ")}</dd>
            </div>
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="tabular">{h.time}</dd>
              </div>
            ))}
          </dl>
          <Link to="/studio" className="text-link">
            Meet the studio <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="close">
        <h2>Tell us about your rooms.</h2>
        <p>
          The first library visit is free. Bring photographs, a floor plan, or
          just the room that has been bothering you.
        </p>
        <ul className="openings" aria-label="Next library openings">
          {openings.map((o) => (
            <li key={o.day.iso + o.time}>
              <Link to="/consultation">
                <span>{formatDay(o.day.date)}</span>
                <span className="tabular">{o.time}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/consultation" className="btn btn-light">
          Book a consultation
        </Link>
      </section>
    </>
  );
}
