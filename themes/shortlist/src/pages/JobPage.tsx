import { categories, jobs, salaryRoles, type Job } from "../content";
import { Link } from "../router";
import {
  band,
  companyOf,
  dateIn,
  k,
  money,
  ordinal,
  percentile,
  postedLabel,
} from "../lib/format";
import { useShortlist } from "../lib/shortlist";
import { JobRow, SaveButton } from "../components/JobRow";
import { CompanyMark, PenLoop } from "../components/Marks";
import { SalaryScale } from "../components/SalaryScale";

export function JobPage({ job }: { job: Job }) {
  const company = companyOf(job);
  const list = useShortlist();
  const saved = list.ids.includes(job.id);
  const applied = list.applied[job.id];
  const category = categories.find((c) => c.id === job.category)!;
  const role = salaryRoles.find((r) => r.id === job.role)!;
  const market = band(job.role, job.city, job.level);
  const mid = (job.salary[0] + job.salary[1]) / 2;
  const related = [
    ...jobs.filter((j) => j.id !== job.id && j.category === job.category),
    ...jobs.filter(
      (j) =>
        j.id !== job.id &&
        j.category !== job.category &&
        j.company === job.company,
    ),
  ].slice(0, 3);

  return (
    <div className="wrap page job-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/jobs">Find jobs</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/jobs?category=${category.id}`}>{category.label}</Link>
      </nav>

      <div className="job-layout">
        <div className="job-title-block" data-circled={saved ? "" : undefined}>
          <Link to={`/companies/${company.slug}`} className="job-company">
            <CompanyMark company={company} size={40} />
            <span>{company.name}</span>
          </Link>
          <h1>
            <span className="circled">
              {job.title}
              <PenLoop />
            </span>
          </h1>
          <p className="lede">{job.summary}</p>
        </div>

        <div className="job-text">
          <section aria-labelledby="do-h">
            <h2 id="do-h">What you’ll do</h2>
            <ul className="ticks">
              {job.duties.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="bring-h">
            <h2 id="bring-h">What you bring</h2>
            <ul className="ticks">
              {job.requirements.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h3>Good to have, not required</h3>
            <ul className="ticks ticks-quiet">
              {job.niceToHave.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="pay-h">
            <h2 id="pay-h">The pay, against the market</h2>
            <p>
              The middle of this range sits around the{" "}
              <strong>{ordinal(percentile(market, mid))} percentile</strong> for
              a {job.level.toLowerCase()} {role.label.toLowerCase()} in{" "}
              {job.city}, where the median base is {k(market.p50)}.
            </p>
            <SalaryScale
              band={market}
              advertised={job.salary}
              label={`Salary range for this job compared with the ${role.label} market in ${job.city}`}
            />
            <p className="fine">
              Market figures from the{" "}
              <Link to="/salaries">Shortlist salary guide</Link>.
            </p>
          </section>
          <section aria-labelledby="process-h">
            <h2 id="process-h">How hiring works</h2>
            <ol className="steps">
              {job.process.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>
        </div>

        <div className="job-side">
          <aside className="ad-box" aria-label="Key facts">
            <p className="ad-pay num">
              {money(job.salary[0])} – {money(job.salary[1])}
              <span>base salary a year</span>
            </p>
            <dl className="facts">
              <div>
                <dt>Location</dt>
                <dd>{job.city}</dd>
              </div>
              <div>
                <dt>Workplace</dt>
                <dd>{job.workplace}</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{job.type}</dd>
              </div>
              <div>
                <dt>Level</dt>
                <dd>{job.level}</dd>
              </div>
              <div>
                <dt>Listed</dt>
                <dd>{postedLabel(job.posted).replace("Posted ", "")}</dd>
              </div>
              <div>
                <dt>Closes</dt>
                <dd>{dateIn(job.closes)}</dd>
              </div>
              <div className="facts-wide">
                <dt>Reply promise</dt>
                <dd>
                  Every applicant hears back within {company.replyDays} working
                  days
                </dd>
              </div>
            </dl>
            {applied ? (
              <p className="applied-note" role="status">
                You applied on{" "}
                {new Date(applied).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
                . Expect a reply by {dateIn(company.replyDays + 2)}.
              </p>
            ) : (
              <Link
                to={`/jobs/${job.id}/apply`}
                className="btn btn-pen btn-block"
              >
                Apply for this job
              </Link>
            )}
            <SaveButton job={job} wide />
          </aside>
          <aside className="company-card" aria-labelledby="co-h">
            <img src={company.image} alt={company.imageAlt} loading="lazy" />
            <h2 id="co-h">
              <Link to={`/companies/${company.slug}`}>{company.name}</Link>
            </h2>
            <p>{company.tagline}</p>
            <p className="fine">
              {company.industry} · {company.size} · since {company.founded}
            </p>
            <h3>Benefits</h3>
            <ul className="ticks ticks-quiet">
              {company.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section related" aria-labelledby="rel-h">
          <h2 id="rel-h" className="section-title">
            Also worth a look
          </h2>
          <div className="listing-stack">
            {related.map((j) => (
              <JobRow key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
