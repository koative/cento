import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { materials, projects, type Project } from "../content";
import { MaterialCard } from "../components/Samples";
import { BOARD_MAX, toggle, useBoard } from "../lib/board";

export function ProjectPage({ project }: { project: Project }) {
  const [shown, setShown] = useState(0);
  const board = useBoard();
  const used = project.materials.map((id) =>
    materials.find((m) => m.id === id)!,
  );
  const missing = used.filter((m) => !board.includes(m.id));
  const room = BOARD_MAX - board.length;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const image = project.gallery[shown];

  return (
    <>
      <header className="page-head project-head">
        <Link to="/projects" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>
        <h1>{project.name}</h1>
        <p className="lede">{project.summary}</p>
        <dl className="facts">
          <div>
            <dt>Location</dt>
            <dd>{project.place}</dd>
          </div>
          <div>
            <dt>Completed</dt>
            <dd className="tabular">{project.year}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{project.scope}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd className="tabular">
              {project.area.toLocaleString("en-US")} sq ft
            </dd>
          </div>
          <div>
            <dt>Programme</dt>
            <dd className="tabular">{project.months} months</dd>
          </div>
        </dl>
      </header>

      <section className="viewer" aria-label="Photographs">
        <figure>
          <img key={image.src} src={image.src} alt={image.alt} />
          <figcaption>
            <span className="tabular">
              {shown + 1} / {project.gallery.length}
            </span>{" "}
            {image.caption}
          </figcaption>
        </figure>
        {project.gallery.length > 1 && (
          <div
            className="viewer-thumbs"
            role="group"
            aria-label="Choose a photograph"
          >
            {project.gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                aria-pressed={i === shown}
                onClick={() => setShown(i)}
              >
                <img src={g.src} alt="" loading="lazy" />
                <span className="visually-hidden">{g.caption}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="section story">
        <div>
          <h2>The brief</h2>
          <p>{project.brief}</p>
        </div>
        <div>
          <h2>What we did</h2>
          {project.approach.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </div>
      </section>

      {project.quote && (
        <blockquote className="pull-quote">
          <p>“{project.quote.text}”</p>
          <footer>{project.quote.by}</footer>
        </blockquote>
      )}

      <section className="section">
        <div className="section-head">
          <h2>The palette</h2>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={!missing.length || room < missing.length}
            onClick={() => missing.forEach((m) => toggle(m.id))}
          >
            {!missing.length
              ? "All on your board"
              : room < missing.length
                ? `Board has room for ${room} more`
                : `Add ${missing.length < used.length ? "the other" : "all"} ${missing.length} to your board`}
          </button>
        </div>
        <p className="section-intro">
          The {used.length} materials that carry this project, all in our
          library. Put them on a sample board and see them in your own light.
        </p>
        <div className="material-grid">
          {used.map((m) => (
            <MaterialCard key={m.id} material={m} />
          ))}
        </div>
      </section>

      <section className="next-project">
        <Link to={`/projects/${next.slug}`}>
          <img src={next.cover} alt="" loading="lazy" />
          <span>
            <span className="next-label">Next project</span>
            <span className="next-name">
              {next.name} <ArrowRight size={20} aria-hidden="true" />
            </span>
          </span>
        </Link>
        <div>
          <h2>Have a room like this?</h2>
          <p>
            Book a free library visit and bring photographs. We will pull the
            samples before you arrive.
          </p>
          <Link to="/consultation" className="btn">
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
