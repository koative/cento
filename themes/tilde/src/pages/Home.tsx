import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  calendar,
  log,
  now,
  posts,
  practices,
  projects,
  steps,
  testimonial,
  uses,
} from "../content";
import { Shell } from "../components/Shell";
import { PostList, ProjectRow, Section } from "../components/Blocks";
import { formatDate, formatMonth } from "../lib/format";

export function Home() {
  const featured = projects.filter((p) => p.featured);
  const [before, after] = brand.tagline.split(brand.taglineMark);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="status">
            <span className="dot" aria-hidden="true" />
            {brand.status}
          </p>
          <h1>
            {before}
            <mark>{brand.taglineMark}</mark>
            {after}
          </h1>
          <p className="lead">{brand.intro}</p>
          <div className="actions">
            <Link to="/projects" className="btn">
              See the work
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Start a project
            </Link>
          </div>
        </div>
        <Shell
          label="Explore the site from a shell"
          boot={["whoami", "ls projects"]}
          suggestions={["help", "ls writing", "cat now.md", "open resume.json"]}
        />
      </section>

      <Section
        title="Selected work"
        aside={
          <Link to="/projects" className="more">
            All {projects.length} projects{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        }
      >
        <div className="project-rows">
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section title="What I do">
        <dl className="practices">
          {practices.map((p) => (
            <div key={p.name}>
              <dt>{p.name}</dt>
              <dd>
                <p>{p.text}</p>
                <p className="muted">{p.typical}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <figure className="pull wrap">
        <blockquote>
          <p>{testimonial.text}</p>
        </blockquote>
        <figcaption>
          {testimonial.name}, {testimonial.title}
        </figcaption>
      </figure>

      <Section
        title="Writing"
        aside={
          <Link to="/writing" className="more">
            Archive <ArrowRight size={16} aria-hidden="true" />
          </Link>
        }
      >
        <PostList items={posts.slice(0, 4)} />
      </Section>

      <Section title="git log">
        <ol className="gitlog">
          {log.map((l) => (
            <li key={l.hash}>
              <code className="hash">{l.hash}</code>
              <time dateTime={l.date}>{formatDate(l.date)}</time>
              <Link to={l.to}>{l.text}</Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Working together">
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="step-len">{s.length}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="split wrap">
        <div>
          <h2>
            <Link to="/now">Now</Link>
          </h2>
          <p className="muted">Updated {formatDate(now.updated)}</p>
          <dl className="kv">
            {now.items.slice(0, 3).map((i) => (
              <div key={i.title}>
                <dt>{i.title}</dt>
                <dd>{i.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>
            <Link to="/uses">Uses</Link>
          </h2>
          <p className="muted">Hardware, software and four dotfiles</p>
          <ul className="uses-short">
            {uses[0].items
              .slice(0, 2)
              .concat(uses[1].items.slice(0, 3))
              .map((u) => (
                <li key={u.name}>{u.name}</li>
              ))}
          </ul>
        </div>
      </section>

      <section className="close wrap">
        <h2>Open from January.</h2>
        <p className="lead">
          I take three or four engagements a year. Here is the calendar as it
          stands; booked months are booked.
        </p>
        <ol className="calendar" aria-label="Availability by month">
          {calendar.map((m) => (
            <li key={m.month} data-state={m.state}>
              <span className="cal-month">{formatMonth(m.month)}</span>
              <span className="cal-note">{m.note}</span>
            </li>
          ))}
        </ol>
        <div className="actions">
          <Link to="/contact" className="btn">
            Tell me about your problem
          </Link>
          <a className="btn btn-ghost" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </div>
      </section>
    </>
  );
}
