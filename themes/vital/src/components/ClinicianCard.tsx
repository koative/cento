import { Link } from "../router";
import type { Clinician } from "../content";

export function ClinicianCard({
  c,
  lazy = true,
}: {
  c: Clinician;
  lazy?: boolean;
}) {
  const next = c.slots[0];
  return (
    <li className="clin-card">
      <Link to={`/clinicians/${c.slug}`}>
        <img
          src={c.photo}
          alt=""
          width={600}
          height={720}
          loading={lazy ? "lazy" : undefined}
          style={{ objectPosition: c.focus }}
        />
        <span className="clin-name">
          {c.name}, {c.credentials}
        </span>
        <span className="clin-role">{c.role}</span>
        <span className="clin-meta">
          Licensed in {c.states.join(", ")} · {c.languages.join(", ")}
        </span>
        <span className="clin-next num">
          Next: {next.day}, {next.times[0]}
        </span>
      </Link>
    </li>
  );
}
