import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import type { Post, Project } from "../content";
import { formatDate, readingMinutes } from "../lib/format";

/** Man-page section: the heading hangs in the left column, content runs on the right. */
export function Section({
  title,
  children,
  aside,
  className = "",
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={"sect wrap " + className}>
      <div className="sect-head">
        <h2>{title}</h2>
        {aside}
      </div>
      <div className="sect-body">{children}</div>
    </section>
  );
}

const COMMENT = /^\s*(\/\/|#|--|\$)/;

export function Code({ file, body }: { file?: string; body: string }) {
  return (
    <figure className="code">
      {file && <figcaption>{file}</figcaption>}
      <pre tabIndex={0} aria-label={file ? `Code: ${file}` : "Code sample"}>
        <code>
          {body.split("\n").map((line, i) => (
            <span key={i} className={COMMENT.test(line) ? "ln c" : "ln"}>
              {line + "\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

/** The project's data path as a left-to-right pipeline (top-to-bottom on phones). */
export function Flow({
  steps,
  label,
}: {
  steps: Project["flow"];
  label: string;
}) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map((s) => (
        <li key={s.label}>
          <span className="flow-label">{s.label}</span>
          <span className="flow-note">{s.note}</span>
        </li>
      ))}
    </ol>
  );
}

export function Bench({ bench }: { bench: NonNullable<Project["bench"]> }) {
  const max = Math.max(...bench.rows.map((r) => r.before));
  // Bars use 80% of the cell at most so the value label always fits beside them.
  const w = (n: number) =>
    ({ "--w": `max(3px, ${(n / max) * 80}%)` }) as CSSProperties;
  const fmt = (n: number) => n.toLocaleString("en-GB") + " " + bench.unit;
  return (
    <table className="bench">
      <caption>{bench.title}, before and after. Lower is better.</caption>
      <thead>
        <tr>
          <th scope="col">Case</th>
          <th scope="col">Before → after</th>
          <th scope="col">Change</th>
        </tr>
      </thead>
      <tbody>
        {bench.rows.map((r) => (
          <tr key={r.label}>
            <th scope="row">{r.label}</th>
            <td>
              <span className="bar-row bar-before" style={w(r.before)}>
                <span className="bar" />
                <span className="bar-val">{fmt(r.before)}</span>
              </span>
              <span className="bar-row bar-after" style={w(r.after)}>
                <span className="bar" />
                <span className="bar-val">{fmt(r.after)}</span>
              </span>
            </td>
            <td className="num">{Math.round(r.before / r.after)}× faster</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PostList({ items }: { items: Post[] }) {
  return (
    <ul className="post-list">
      {items.map((p) => (
        <li key={p.slug}>
          <time dateTime={p.date}>{formatDate(p.date)}</time>
          <div>
            <h3>
              <Link to={`/writing/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>{p.summary}</p>
          </div>
          <span className="post-meta">
            {readingMinutes(p)} min · {p.tags.join(", ")}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project-row">
      <div className="project-row-head">
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p className="project-meta">
          {project.kind} · {project.client ?? project.role} · {project.year}
        </p>
      </div>
      <p className="project-summary">{project.summary}</p>
      <Flow steps={project.flow} label={`${project.name} data flow`} />
      <Link to={`/projects/${project.slug}`} className="more">
        Read the case study <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
