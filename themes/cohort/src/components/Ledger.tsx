import { Link } from "../router";
import { domainById, partnerBySlug, type Company } from "../content";
import { compact } from "../lib/format";

/** The portfolio as a plain ledger: one row per company, newest class first. */
export function Ledger({
  companies,
  caption,
}: {
  companies: Company[];
  caption: string;
}) {
  return (
    <div className="ledger-scroll">
      <table className="ledger">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Company</th>
            <th scope="col" className="hide-sm">
              What they do
            </th>
            <th scope="col">Class</th>
            <th scope="col" className="hide-sm">
              Domain
            </th>
            <th scope="col">Stage</th>
            <th scope="col" className="num hide-sm">
              Rounds with Cohort
            </th>
            <th scope="col" className="hide-sm">
              Partner
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c.slug}>
              <th scope="row">
                <Link to={`/portfolio/${c.slug}`}>{c.name}</Link>
              </th>
              <td className="hide-sm">{c.line}</td>
              <td className="num">{c.classOf}</td>
              <td className="hide-sm">{domainById(c.domain).name}</td>
              <td>{c.status === "Acquired" ? "Acquired" : c.stage}</td>
              <td className="num hide-sm">
                {c.rounds.length} ·{" "}
                {compact(c.rounds.reduce((s, r) => s + r.amount, 0))} total
              </td>
              <td className="hide-sm">{partnerBySlug(c.partner)?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
