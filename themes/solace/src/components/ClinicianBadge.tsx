import type { Clinician } from "../content";
import { Link } from "../router";
import { locationBy } from "../lib/schedule";

/** The clinic ID badge every Solace clinician wears — used as their card across the site. */
export function ClinicianBadge({
  clinician,
  headingLevel = 3,
}: {
  clinician: Clinician;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const where = Object.keys(clinician.schedule)
    .map((slug) => locationBy(slug)?.name)
    .join(" · ");
  return (
    <article className="badge">
      <span className="badge-clip" aria-hidden="true" />
      <span className="badge-initials" aria-hidden="true">
        {clinician.initials}
      </span>
      <H className="badge-name">
        <Link to={`/clinicians/${clinician.slug}`}>{clinician.name}</Link>
      </H>
      <p className="badge-role">{clinician.role}</p>
      <p className="badge-meta">{where}</p>
      <p className="badge-meta">Speaks {clinician.languages.join(", ")}</p>
      <p className="badge-status" data-open={clinician.accepting || undefined}>
        {clinician.accepting
          ? "Accepting new patients"
          : "Waiting list for new patients"}
      </p>
    </article>
  );
}
