import { ArrowDown, ArrowUp, X } from "lucide-react";
import { jobs } from "../content";
import { Link } from "../router";
import {
  band,
  companyOf,
  dateIn,
  ordinal,
  percentile,
  range,
} from "../lib/format";
import { move, remove, useShortlist } from "../lib/shortlist";
import { JobRow } from "../components/JobRow";
import { CompanyMark } from "../components/Marks";

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export function Shortlist() {
  const { ids, applied } = useShortlist();
  const saved = ids
    .map((id) => jobs.find((j) => j.id === id))
    .filter((j) => j !== undefined);
  const suggestions = jobs
    .filter((j) => !ids.includes(j.id) && j.posted <= 3)
    .slice(0, 4);

  const rows: [string, (j: (typeof saved)[number]) => string][] = [
    ["Base salary", (j) => range(j.salary)],
    [
      "Against the market",
      (j) =>
        `${ordinal(percentile(band(j.role, j.city, j.level), (j.salary[0] + j.salary[1]) / 2))} percentile`,
    ],
    ["Location", (j) => j.city],
    ["Workplace", (j) => j.workplace],
    ["Hours", (j) => j.type],
    ["Level", (j) => j.level],
    ["Reply promise", (j) => `${companyOf(j).replyDays} working days`],
    ["Applications close", (j) => dateIn(j.closes)],
    [
      "Your status",
      (j) =>
        applied[j.id]
          ? `Applied ${shortDate(applied[j.id])}`
          : "Not applied yet",
    ],
  ];

  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>Your shortlist</h1>
        <p className="lede">
          The jobs you’ve circled, in your order. Move the best to the top,
          compare the pay side by side, and apply when you’re ready. Kept on
          this device only.
        </p>
      </div>

      {saved.length === 0 ? (
        <section className="empty empty-large" aria-labelledby="empty-h">
          <h2 id="empty-h">Nothing circled yet.</h2>
          <p>
            Press “Shortlist” on any listing and it lands here. Here are a few
            from the last three days to start with.
          </p>
          <div className="listing-stack">
            {suggestions.map((j) => (
              <JobRow key={j.id} job={j} />
            ))}
          </div>
          <Link to="/jobs" className="btn btn-pen">
            Browse all jobs
          </Link>
        </section>
      ) : (
        <>
          <section aria-labelledby="rank-h" className="section-tight">
            <h2 id="rank-h" className="section-title">
              Ranked by you
            </h2>
            <ol className="rank-list">
              {saved.map((j, i) => {
                const company = companyOf(j);
                return (
                  <li key={j.id} className="rank-item">
                    <span className="rank-num num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <CompanyMark company={company} size={36} />
                    <div className="rank-main">
                      <Link to={`/jobs/${j.id}`} className="rank-title">
                        {j.title}
                      </Link>
                      <span className="rank-meta">
                        {company.name} · {range(j.salary)}
                        {applied[j.id] && <span className="tag">Applied</span>}
                      </span>
                    </div>
                    <div className="rank-actions">
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => move(j.id, -1)}
                        disabled={i === 0}
                        aria-label={`Move ${j.title} up`}
                      >
                        <ArrowUp aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => move(j.id, 1)}
                        disabled={i === saved.length - 1}
                        aria-label={`Move ${j.title} down`}
                      >
                        <ArrowDown aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => remove(j.id)}
                        aria-label={`Remove ${j.title} from shortlist`}
                      >
                        <X aria-hidden="true" />
                      </button>
                      {!applied[j.id] && (
                        <Link
                          to={`/jobs/${j.id}/apply`}
                          className="btn btn-small"
                        >
                          Apply
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-labelledby="compare-h" className="section-tight">
            <h2 id="compare-h" className="section-title">
              Side by side
            </h2>
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-labelledby="compare-h"
            >
              <table className="compare">
                <thead>
                  <tr>
                    <td />
                    {saved.map((j, i) => (
                      <th key={j.id} scope="col">
                        <span className="num">{i + 1}.</span> {j.title}
                        <span className="compare-co">{companyOf(j).name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {saved.map((j) => (
                        <td key={j.id}>{value(j)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
