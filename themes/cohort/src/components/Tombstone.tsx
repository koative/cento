import { Link } from "../router";
import type { Company, Round } from "../content";
import { dollars, monthYear } from "../lib/format";

type Props = {
  company: Company;
  round?: Round;
  linked?: boolean;
  headingLevel?: "h2" | "h3";
};

/** A financing announcement set the way the financial press set them: centred, ruled, for the record. */
export function Tombstone({
  company,
  round = company.rounds.at(-1)!,
  linked = true,
  headingLevel = "h3",
}: Props) {
  const Heading = headingLevel;
  const body = (
    <>
      <p className="tomb-amount">{dollars(round.amount)}</p>
      <Heading className="tomb-name">{company.name}</Heading>
      <p className="tomb-line">{company.line}</p>
      <p className="tomb-round">
        {round.round}
        <span>
          {round.role === "Participated"
            ? "Cohort participated"
            : `${round.role} by Cohort`}
        </span>
      </p>
      <p className="tomb-date">
        {monthYear(round.date)}
        {company.status === "Acquired" && (
          <span className="tomb-status">Acquired</span>
        )}
      </p>
    </>
  );
  return linked ? (
    <Link
      to={`/portfolio/${company.slug}`}
      className="tomb"
      aria-label={`${company.name}: ${round.round}, ${dollars(round.amount)}`}
    >
      {body}
    </Link>
  ) : (
    <div className="tomb">{body}</div>
  );
}
