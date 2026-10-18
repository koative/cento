import { Link } from "../router";
import type { Exhibit } from "../content";
import { Shape } from "./Shape";

export function ExhibitCard({
  ex,
  lazy = true,
}: {
  ex: Exhibit;
  lazy?: boolean;
}) {
  return (
    <article className="ex-card" data-swatch={ex.swatch}>
      <div className="ex-photo">
        <img
          src={ex.image}
          alt={ex.alt}
          width={640}
          height={480}
          loading={lazy ? "lazy" : undefined}
        />
        <Shape kind={ex.shape} swatch={ex.swatch} className="ex-badge" />
      </div>
      <h3>
        <Link to={`/exhibits/${ex.slug}`} className="stretch">
          {ex.name}
        </Link>
      </h3>
      <p>{ex.sign}</p>
      <p className="ex-meta">
        <span>{ex.ageLabel}</span>
        <span>{ex.stay} min</span>
        <span>{ex.noise}</span>
      </p>
    </article>
  );
}
