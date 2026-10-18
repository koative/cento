import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { projects, type Project } from "../content";
import { BuildSequence } from "../components/BuildSequence";
import { ProjectCard } from "../components/ProjectCard";
import { money, monthAt } from "../lib/format";
import { totalWeeks } from "../lib/programme";

export function ProjectPage({ project: p }: { project: Project }) {
  const T = totalWeeks(p);
  const related = [
    ...projects.filter((x) => x.slug !== p.slug && x.sector === p.sector),
    ...projects.filter((x) => x.sector !== p.sector),
  ].slice(0, 3);
  const facts: [string, string][] = [
    ["Client", p.client],
    ["Design lead", p.architect],
    ["Delivery route", p.route],
    ["Contract value", money(p.value)],
    ["Size", p.size],
    [
      "Programme",
      `${T} weeks, ${monthAt(p.start, 0)} – ${monthAt(p.start, T)}`,
    ],
    ...p.quantities,
  ];

  return (
    <>
      <header className="wrap project-head">
        <Link to="/projects" className="back-link">
          <ArrowLeft aria-hidden="true" size={16} /> All projects
        </Link>
        <div className="project-title">
          <h1>{p.name}</h1>
          <p className="project-sub">
            <span
              className="status-tag"
              data-status={p.status === "On site" ? "live" : "done"}
            >
              {p.status === "On site"
                ? `On site · week ${p.week} of ${T}`
                : `Completed ${p.year}`}
            </span>
            <span>{p.sector}</span>
            <span>{p.location}</span>
          </p>
        </div>
        <p className="lede">{p.summary}</p>
      </header>

      <div className="wrap project-hero">
        <img
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.w}
          height={p.image.h}
          fetchPriority="high"
        />
        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className="num">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="section wrap story">
        <div className="prose">
          <h2>How it was built</h2>
          {p.story.map((s) => (
            <p key={s.slice(0, 24)}>{s}</p>
          ))}
        </div>
        <aside className="scope">
          <h2>Scope</h2>
          <ul>
            {p.scope.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="band-dark">
        <div className="wrap section">
          <div className="band-head">
            <h2>Programme, week by week</h2>
            <p>
              {p.status === "On site"
                ? `This is the live programme as of this week. Scrub forward to see what comes next, or play it through to handover.`
                : `The as-built programme. Scrub through ${T} weeks from mobilisation to handover.`}
            </p>
          </div>
          <BuildSequence project={p} />
        </div>
      </section>

      {p.gallery.length > 0 && (
        <section className="section wrap">
          <h2>From the site</h2>
          <div className="gallery" data-count={p.gallery.length}>
            {p.gallery.map((g) => (
              <figure key={g.src}>
                <img
                  src={g.src}
                  alt={g.alt}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {p.quote && (
        <section className="quote-band">
          <figure className="wrap quote">
            <blockquote>
              <p>{p.quote.text}</p>
            </blockquote>
            <figcaption>
              <strong>{p.quote.name}</strong>
              <span>{p.quote.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      <section className="section wrap">
        <div className="row-head">
          <h2>
            {related[0].sector === p.sector
              ? `More ${p.sector.toLowerCase()} work`
              : "More of our work"}
          </h2>
          <Link to="/projects" className="text-link">
            All projects <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="project-grid">
          {related.map((r) => (
            <ProjectCard key={r.slug} project={r} />
          ))}
        </div>
      </section>

      <section className="close-panel">
        <div className="wrap close-grid">
          <div>
            <h2>Planning something like {p.name}?</h2>
            <p>
              Send us the brief or the tender documents. We will tell you within
              two working days whether we can help and how.
            </p>
          </div>
          <div className="close-actions">
            <Link to="/tender" className="btn btn-ink">
              Invite us to tender <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
