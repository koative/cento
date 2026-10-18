import { Circle, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "../router";
import type { Job } from "../content";
import { companyOf, postedLabel, range } from "../lib/format";
import { toggle, useShortlist } from "../lib/shortlist";
import { CompanyMark, PenLoop } from "./Marks";

export function SaveButton({
  job,
  wide = false,
}: {
  job: Job;
  wide?: boolean;
}) {
  const saved = useShortlist().ids.includes(job.id);
  return (
    <button
      type="button"
      className={`save-btn${wide ? " save-btn-wide" : ""}`}
      aria-pressed={saved}
      aria-label={
        wide ? undefined : `Shortlist ${job.title} at ${companyOf(job).name}`
      }
      onClick={() => toggle(job.id)}
    >
      {saved ? (
        <CircleCheck aria-hidden="true" />
      ) : (
        <Circle aria-hidden="true" />
      )}
      <span>{saved ? "Shortlisted" : "Shortlist"}</span>
    </button>
  );
}

/** One classified ad: the title gets circled in red pen once the job is on the visitor's shortlist. */
export function Listing({
  title,
  href,
  mark,
  meta,
  salary,
  aside,
  circled = false,
}: {
  title: string;
  href?: string;
  mark: ReactNode;
  /** Facts shown under the title; each one stays on a single line. */
  meta: string[];
  salary: string;
  aside?: ReactNode;
  circled?: boolean;
}) {
  return (
    <article className="listing" data-circled={circled ? "" : undefined}>
      <div className="listing-mark">{mark}</div>
      <div className="listing-main">
        <h3 className="listing-title">
          <span className="circled">
            {href ? <Link to={href}>{title}</Link> : title}
            <PenLoop />
          </span>
        </h3>
        <p className="listing-meta">
          {meta.map((m, i) => (
            <span key={i}>
              {i > 0 && " · "}
              <span className="nowrap">{m}</span>
            </span>
          ))}
        </p>
      </div>
      <p className="listing-pay">{salary}</p>
      {aside && <div className="listing-aside">{aside}</div>}
    </article>
  );
}

export function JobRow({
  job,
  compact = false,
}: {
  job: Job;
  compact?: boolean;
}) {
  const saved = useShortlist().ids.includes(job.id);
  const company = companyOf(job);
  const place =
    job.workplace === "Remote" ? [job.city] : [job.city, job.workplace];
  const meta = compact
    ? [company.name, job.city]
    : [company.name, ...place, job.type, job.level];
  return (
    <Listing
      title={job.title}
      href={`/jobs/${job.id}`}
      mark={<CompanyMark company={company} size={compact ? 32 : 40} />}
      meta={meta}
      salary={range(job.salary)}
      circled={saved}
      aside={
        <>
          {!compact && (
            <span className="listing-posted">{postedLabel(job.posted)}</span>
          )}
          <SaveButton job={job} />
        </>
      }
    />
  );
}
