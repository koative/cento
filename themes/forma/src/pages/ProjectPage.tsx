import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { posts, projects, type Project } from "../content";
import { ProjectCard } from "../components/ProjectCard";
import { LightStudy } from "../components/LightStudy";
import { area } from "../lib/format";

export function ProjectPage({ project: p }: { project: Project }) {
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const related = [
    ...projects.filter((x) => x !== p && x.type === p.type),
    ...projects.filter((x) => x !== p && x.type !== p.type),
  ].slice(0, 3);
  const notes = posts.filter((x) => x.project === p.slug);
  const [first, ...rest] = p.chapters;

  return (
    <article className="case">
      <header className="wrap case-head">
        <h1>{p.name}</h1>
        <p className="case-summary">{p.summary}</p>
      </header>

      <figure className="wrap case-cover">
        <img
          src={p.cover.src}
          alt={p.cover.alt}
          width={p.cover.w}
          height={p.cover.h}
          data-portrait={p.cover.h > p.cover.w || undefined}
        />
      </figure>

      <div className="wrap case-body">
        <dl className="facts">
          <div>
            <dt>Place</dt>
            <dd>
              {p.place}, {p.country}
            </dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{p.type}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="status" data-status={p.status}>
                {p.status}
              </span>
            </dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd className="num">{p.year}</dd>
          </div>
          <div>
            <dt>Gross area</dt>
            <dd className="num">{area(p.area)}</dd>
          </div>
          <div>
            <dt>Client</dt>
            <dd>{p.client}</dd>
          </div>
          <div>
            <dt>Structural engineer</dt>
            <dd>{p.engineer}</dd>
          </div>
          <div>
            <dt>Studio team</dt>
            <dd>{p.team.join(", ")}</dd>
          </div>
        </dl>

        <div className="prose">
          <p className="case-intro">{p.intro}</p>
          <h2>{first.title}</h2>
          {first.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>

      {p.gallery.map((g) => (
        <figure key={g.src} className="wrap case-figure">
          <img
            src={g.src}
            alt={g.alt}
            width={g.w}
            height={g.h}
            loading="lazy"
          />
        </figure>
      ))}

      {rest.length > 0 && (
        <div className="wrap case-body">
          <div />
          <div className="prose">
            {rest.map((c) => (
              <section key={c.title}>
                <h2>{c.title}</h2>
                {c.body.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      )}

      <section className="wrap band study-band">
        <div className="band-head">
          <h2>Light study</h2>
          <p>
            Direct sun through the {p.section.label.toLowerCase()}, drawn for{" "}
            {p.place} at {p.lat.toFixed(1)}° north. Try the winter solstice at
            noon, then midsummer.
          </p>
        </div>
        <LightStudy project={p} />
      </section>

      <section className="wrap band case-specs">
        <h2>Materials</h2>
        <table className="register compact">
          <tbody>
            {p.materials.map((m) => (
              <tr key={m.name}>
                <th scope="row">{m.name}</th>
                <td>{m.spec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {p.quote && (
        <blockquote className="wrap case-quote">
          <p>{p.quote.text}</p>
          <footer>{p.quote.by}</footer>
        </blockquote>
      )}

      {notes.length > 0 && (
        <section className="wrap band">
          <h2>From the journal</h2>
          <ul className="note-list">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link to={"/journal/" + n.slug}>{n.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="wrap case-cta">
        <h2>Planning something similar?</h2>
        <p>
          Tell us about the site and what you need. We will reply within three
          working days.
        </p>
        <Link to={"/contact?type=" + p.type} className="btn">
          Discuss a project like this{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <nav className="wrap pager" aria-label="Project">
        <Link to={"/projects/" + prev.slug}>
          <ArrowLeft size={16} aria-hidden="true" /> {prev.name}
        </Link>
        <Link to="/projects">All projects</Link>
        <Link to={"/projects/" + next.slug}>
          {next.name} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>

      <section className="wrap band">
        <h2>More projects</h2>
        <div className="plates-grid">
          {related.map((r) => (
            <ProjectCard key={r.slug} project={r} />
          ))}
        </div>
      </section>
    </article>
  );
}
