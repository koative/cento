import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { projects, type Project as P } from "../content";
import { Bench, Code, Flow, Section } from "../components/Blocks";

export function Project({ project }: { project: P }) {
  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const related = projects
    .filter(
      (p) => p !== project && p.stack.some((s) => project.stack.includes(s)),
    )
    .slice(0, 2);

  return (
    <article>
      <header className="case-head wrap">
        <Link to="/projects" className="back">
          <ArrowLeft size={16} aria-hidden="true" /> Projects
        </Link>
        <h1>{project.name}</h1>
        <p className="lead">{project.intro}</p>
        <dl className="meta-grid">
          <div>
            <dt>Kind</dt>
            <dd>{project.kind}</dd>
          </div>
          {project.client && (
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
          )}
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{project.duration}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          {project.stars && (
            <div>
              <dt>Stars</dt>
              <dd className="num">{project.stars.toLocaleString("en-GB")}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="wrap case-flow">
        <Flow
          steps={project.flow}
          label={`How data moves through ${project.name}`}
        />
      </div>

      <Section title="Problem">
        <div className="prose">
          {project.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title="Approach">
        <div className="prose">
          {project.approach.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Code file={project.code.file} body={project.code.body} />
      </Section>

      <Section title="Result">
        <div className="prose">
          {project.result.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {project.bench && <Bench bench={project.bench} />}
        <dl className="facts">
          {project.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {project.quote && (
        <figure className="pull wrap">
          <blockquote>
            <p>{project.quote.text}</p>
          </blockquote>
          <figcaption>
            {project.quote.name}, {project.quote.title}
          </figcaption>
        </figure>
      )}

      {related.length > 0 && (
        <Section title="Related">
          <ul className="related">
            {related.map((p) => (
              <li key={p.slug}>
                <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                <p>{p.summary}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <section className="case-cta wrap">
        <h2>Have a problem shaped like this one?</h2>
        <p>
          Tell me what is slow, fragile or offline. I reply within two working
          days.
        </p>
        <div className="actions">
          <Link to="/contact" className="btn">
            Start a project
          </Link>
          <Link to={`/projects/${next.slug}`} className="btn btn-ghost">
            Next: {next.name} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </article>
  );
}
