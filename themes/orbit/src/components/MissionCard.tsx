import { Link } from "../router";
import type { Mission } from "../content";
import { day, vehicleName } from "../lib/format";
import { Patch } from "./Patch";

export function MissionCard({
  m,
  headingLevel = 3,
}: {
  m: Mission;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="mission-card">
      <Patch mission={m} size={96} />
      <div>
        <p className="mission-meta tnum">
          <span className="outcome" data-outcome={m.outcome}>
            {m.outcome}
          </span>
          {day(m.date)} · {vehicleName(m.vehicle)}
        </p>
        <H>
          <Link to={`/missions/${m.slug}`} className="stretched">
            {m.name}
          </Link>
        </H>
        <p>{m.summary}</p>
        <p className="mission-card-orbit tnum">
          {m.orbit.label} · {m.payloads}{" "}
          {m.payloads === 1 ? "payload" : "payloads"}
        </p>
      </div>
    </article>
  );
}
