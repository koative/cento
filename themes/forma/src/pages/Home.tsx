import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import {
  awards,
  brand,
  home,
  posts,
  projectBySlug,
  projects,
  projectTypes,
  principles,
  stages,
  studio,
} from "../content";
import { ProjectCard } from "../components/ProjectCard";
import { LightStudy } from "../components/LightStudy";
import { longDate } from "../lib/format";

export function Home() {
  const featured = home.featured.map((s) => projectBySlug(s)!);
  const selected = home.selected.map((s) => projectBySlug(s)!);
  const [active, setActive] = useState(0);
  const shown = featured[active];

  return (
    <>
      <section className="hero wrap">
        <div className="hero-head">
          <h1>{home.title}</h1>
          <div className="hero-lead">
            <p>{home.lead}</p>
            <div className="actions">
              <Link to="/projects" className="btn">
                See the projects <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Start a project
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-stage">
          <Link
            to={"/projects/" + shown.slug}
            className="hero-image"
            aria-label={`${shown.name}, view project`}
          >
            <img
              key={shown.slug}
              src={shown.cover.src}
              alt={shown.cover.alt}
              width={shown.cover.w}
              height={shown.cover.h}
            />
            <span className="hero-arrow" aria-hidden="true">
              <ArrowUpRight size={26} />
            </span>
          </Link>
          <dl className="title-block" aria-live="polite">
            <div>
              <dt>Project</dt>
              <dd>{shown.name}</dd>
            </div>
            <div>
              <dt>Place</dt>
              <dd>
                {shown.place}, {shown.country}
              </dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{shown.type}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd className="num">{shown.year}</dd>
            </div>
          </dl>
        </div>

        <div className="switcher" role="group" aria-label="Featured project">
          {featured.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span className="num">{p.year}</span> {p.name}
            </button>
          ))}
        </div>
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>Recent work</h2>
          <Link to="/projects" className="text-link">
            All {projects.length} projects{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="plates-home">
          {selected.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              size={["wide", "tall", "", ""][i]}
            />
          ))}
        </div>
      </section>

      <section className="wrap questions">
        <h2>{home.question.title}</h2>
        <ul>
          {home.question.asks.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p>{home.question.body}</p>
      </section>

      <section className="wrap band study-band">
        <div className="band-head">
          <h2>{home.study.title}</h2>
          <p>{home.study.body}</p>
        </div>
        <LightStudy project={projectBySlug(home.study.project)!} />
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>What we build</h2>
          <p>{home.typologies}</p>
        </div>
        <ul className="typologies">
          {projectTypes.map((t) => {
            const of = projects.filter((p) => p.type === t);
            return (
              <li key={t}>
                <Link to={"/projects?type=" + t}>
                  <span className="typo-name">{t}</span>
                  <span className="typo-list">
                    {of.map((p) => p.name).join(", ")}
                  </span>
                  <span className="typo-count num">
                    {String(of.length).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>Six stages, one team</h2>
          <Link to="/process" className="text-link">
            How we work and what it costs{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="ruler">
          {stages.map((s) => (
            <li key={s.name}>
              <span className="ruler-name">{s.name}</span>
              <span className="ruler-weeks">{s.weeks}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap band studio-strip">
        <figure>
          <img
            src={studio.room.src}
            alt={studio.room.alt}
            width={studio.room.w}
            height={studio.room.h}
            loading="lazy"
          />
          <figcaption>{studio.roomCaption}</figcaption>
        </figure>
        <div>
          <h2>{home.studioTitle}</h2>
          <p>{studio.intro}</p>
          <ul className="principle-names">
            {principles.map((p) => (
              <li key={p.title}>{p.title}</li>
            ))}
          </ul>
          <Link to="/studio" className="text-link">
            Meet the studio <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>Recognition</h2>
        </div>
        <table className="register compact">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Award</th>
              <th scope="col">Project</th>
            </tr>
          </thead>
          <tbody>
            {awards.slice(0, 5).map((a) => (
              <tr key={a.prize}>
                <td className="num">{a.year}</td>
                <td>{a.prize}</td>
                <td>{a.project}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>From the journal</h2>
          <Link to="/journal" className="text-link">
            All entries <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="posts-row">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} to={"/journal/" + p.slug} className="post-link">
              <span className="post-meta">
                {p.category} · {longDate(p.date)}
              </span>
              <span className="post-title">{p.title}</span>
              <span className="post-excerpt">{p.excerpt}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.close.title}</h2>
          <div>
            <p>{home.close.body}</p>
            <div className="actions">
              <Link to="/contact" className="btn btn-light">
                Start a project <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={"mailto:" + brand.email} className="text-link">
                {brand.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
