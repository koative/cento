import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import type { DanceStyle, StudioEvent } from "../content";
import { dateParts } from "../lib/util";

export function PageHead({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head wrap">
      <h1>{title}</h1>
      <p className="lede">{intro}</p>
      {children}
    </header>
  );
}

/** Styles as a poster index: huge names, their speed, a photo that rides along. */
export function StyleRows({
  list,
  lazy = true,
}: {
  list: DanceStyle[];
  lazy?: boolean;
}) {
  return (
    <ul className="style-rows">
      {list.map((s) => (
        <li key={s.slug}>
          <Link to={`/styles/${s.slug}`} className="style-row">
            <img
              src={s.image.src}
              alt=""
              width={s.image.w}
              height={s.image.h}
              loading={lazy ? "lazy" : undefined}
              style={{ objectPosition: s.image.pos }}
            />
            <span className="sr-name">{s.name}</span>
            <span className="sr-line">{s.line}</span>
            <span className="sr-meta">
              {s.family} · {s.bpm[0]}–{s.bpm[1]} BPM
            </span>
            <ArrowUpRight className="sr-arrow" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Events as a flyer stack: big date, title, price. */
export function EventRows({
  list,
  headingLevel = 3,
}: {
  list: StudioEvent[];
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <ul className="event-rows">
      {list.map((e) => {
        const d = dateParts(e.date);
        return (
          <li key={e.slug}>
            <Link to={`/events/${e.slug}`} className="event-row">
              <time dateTime={e.date} className="er-date">
                <b>{d.day}</b>
                <span>
                  {d.weekday} {d.month}
                </span>
              </time>
              <span className="er-body">
                <H className="er-title">{e.title}</H>
                <span className="er-summary">{e.summary}</span>
              </span>
              <span className="er-price">
                <span className="er-kind">{e.kind}</span>
                {e.time}
                <br />
                {e.price}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
