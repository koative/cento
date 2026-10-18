import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { Programme } from "../content";
import { clock, money } from "../lib/format";
import { fromPrice, type DatedRecital } from "../lib/school";

/** Steps drawn as measures of a score: a staff strip on top, barlines between, bar numbers in the margin. */
export function BarSystem({
  items,
  label,
}: {
  items: { title: string; text: string }[];
  label: string;
}) {
  return (
    <ol
      className="bars"
      aria-label={label}
      style={{ ["--bars" as string]: items.length }}
    >
      {items.map((it, i) => (
        <li key={it.title} className="bar">
          <span className="bar-no" aria-hidden="true">
            {i + 1}
          </span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function ProgrammeCard({
  p,
  headingLevel = 3,
}: {
  p: Programme;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="prog-card">
      <img
        src={p.image.src}
        alt=""
        width={p.image.w}
        height={p.image.h}
        loading="lazy"
      />
      <div className="prog-card-body">
        <H>
          <Link to={`/programmes/${p.slug}`} className="stretched">
            {p.name}
          </Link>
        </H>
        <p className="prog-card-meta">
          Ages {p.ages} ·{" "}
          {p.format === "Group" ? "Group class" : "Private lessons"}
        </p>
        <p>{p.summary}</p>
        <p className="prog-card-price">
          from <strong>{money(fromPrice(p))}</strong>{" "}
          {p.format === "Group" ? "a class" : "a lesson"}
        </p>
      </div>
    </article>
  );
}

export function RecitalRow({
  r,
  headingLevel = 3,
}: {
  r: DatedRecital;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="recital-row">
      <p className="recital-date">
        <span className="recital-day">{r.date.getDate()}</span>
        <span>
          {r.date.toLocaleDateString("en-US", { month: "short" })}
          <br />
          {r.date.toLocaleDateString("en-US", { weekday: "short" })}
        </span>
      </p>
      <div>
        <H>
          <Link to={`/recitals/${r.id}`} className="stretched">
            {r.title}
          </Link>
        </H>
        <p className="recital-meta">
          {r.kind} · {clock(r.time)} · {r.venue.split(",")[0]}
        </p>
      </div>
      <p className="recital-entry">{r.entry.split(" · ")[0]}</p>
    </article>
  );
}

/** The closing call to action used at the foot of most pages. */
export function Coda({
  title,
  text,
  to = "/trial",
  action = "Book a free trial lesson",
}: {
  title: string;
  text: string;
  to?: string;
  action?: string;
}) {
  return (
    <section className="coda" aria-labelledby="coda-h">
      <div className="wrap coda-inner">
        <h2 id="coda-h">{title}</h2>
        <p>{text}</p>
        <Link to={to} className="btn btn-primary btn-large">
          {action}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
