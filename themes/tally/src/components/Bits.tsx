import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { closeSlip, type Article, type Photo, type Service } from "../content";
import type { Deadline } from "../lib/deadlines";
import { amount, dollars, fmt, inDays, isoDate } from "../lib/format";
import { Tick } from "./Marks";

export function Img({
  photo,
  className = "",
  eager = false,
}: {
  photo: Photo;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={photo.src}
      alt={photo.alt}
      width={photo.w}
      height={photo.h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

/** One ruled line of the services ledger: name, what it is, starting price. */
export function ServiceRow({
  s,
  detail = false,
}: {
  s: Service;
  detail?: boolean;
}) {
  return (
    <li>
      <Link to={`/services/${s.slug}`} className="ledger-row">
        <span className="lr-name">{s.name}</span>
        <span className="lr-short">
          {s.short}
          {detail && <small>{s.turnaround}</small>}
        </span>
        <span className="lr-price">
          from <strong>{dollars(s.from)}</strong>
          <small>{s.unit}</small>
        </span>
        <ArrowRight className="lr-arrow" aria-hidden="true" />
      </Link>
    </li>
  );
}

export function ArticleRow({ a }: { a: Article }) {
  return (
    <li>
      <Link to={`/resources/${a.slug}`} className="article-row">
        <span className="ar-meta">
          {a.topic} · {a.format}
        </span>
        <span className="ar-title">{a.title}</span>
        <span className="ar-dek">{a.dek}</span>
        <span className="ar-foot">
          {a.author} · {fmt.published.format(isoDate(a.date))} · {a.minutes} min
          read
        </span>
      </Link>
    </li>
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

export function TickList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`tick-list ${className}`}>
      {items.map((i) => (
        <li key={i}>
          <Tick />
          {i}
        </li>
      ))}
    </ul>
  );
}

/** Ledger rows of upcoming deadlines: date, what, forms, countdown. */
export function DeadlineRows({
  items,
  compact = false,
}: {
  items: Deadline[];
  compact?: boolean;
}) {
  return (
    <ol className={`deadline-rows${compact ? " is-compact" : ""}`}>
      {items.map((d) => (
        <li key={d.key} data-soon={d.days <= 30 ? "" : undefined}>
          <time
            className="dl-date"
            dateTime={d.date.toISOString().slice(0, 10)}
          >
            <span className="dl-month">{fmt.month.format(d.date)}</span>
            <span className="dl-day">{d.date.getDate()}</span>
            <span className="dl-wd">{fmt.weekday.format(d.date)}</span>
          </time>
          <div className="dl-what">
            <h3>{d.rule.title}</h3>
            <p className="dl-forms">
              {d.rule.forms} <span className="dl-kind">· {d.rule.kind}</span>
            </p>
            {!compact && <p className="dl-detail">{d.rule.detail}</p>}
          </div>
          <p className="dl-days">{inDays(d.days)}</p>
        </li>
      ))}
    </ol>
  );
}

/** The month-end close as an adding-machine tape. */
export function CloseTape() {
  const net = closeSlip.lines.reduce((s, l) => s + l.amount, 0);
  return (
    <figure
      className="tape"
      aria-label={`${closeSlip.client}, ${closeSlip.period}: net profit ${amount(net)}`}
    >
      <div className="tape-paper">
        <p className="tape-head">
          <strong>{closeSlip.client}</strong>
          <span>{closeSlip.period}</span>
        </p>
        <table>
          <tbody>
            {closeSlip.lines.map((l) => (
              <tr key={l.label}>
                <th scope="row">{l.label}</th>
                <td data-neg={l.amount < 0 ? "" : undefined}>
                  {amount(l.amount)}
                </td>
                <td className="tape-tick">
                  <Tick />
                </td>
              </tr>
            ))}
            <tr className="tape-total">
              <th scope="row">Net profit</th>
              <td>{amount(net)}</td>
              <td />
            </tr>
            <tr className="tape-aside">
              <th scope="row">{closeSlip.setAside.label}</th>
              <td>{amount(closeSlip.setAside.amount)}</td>
              <td />
            </tr>
          </tbody>
        </table>
        <figcaption>{closeSlip.footer}</figcaption>
      </div>
    </figure>
  );
}
