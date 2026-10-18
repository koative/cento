import { ArrowRight, Cat, Dog, Rabbit } from "lucide-react";
import { Link } from "../router";
import { speciesLabel, type Service, type Species } from "../content";
import { money } from "../lib/format";

const icons: Record<Species, typeof Dog> = {
  dog: Dog,
  cat: Cat,
  rabbit: Rabbit,
};

export function SpeciesIcons({ species }: { species: Species[] }) {
  return (
    <span
      className="species"
      aria-label={`For ${species.map((s) => speciesLabel[s].toLowerCase()).join(", ")}`}
      role="img"
    >
      {species.map((s) => {
        const Icon = icons[s];
        return <Icon key={s} aria-hidden="true" />;
      })}
    </span>
  );
}

/** The clinic's fee board: one ruled row per service, priced from. */
export function ServiceList({
  items,
  headingLevel = 3,
}: {
  items: Service[];
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <ul className="fee-board">
      {items.map((s) => (
        <li key={s.slug}>
          <Link to={`/services/${s.slug}`} className="fee-row">
            <span className="fee-main">
              <H className="fee-name">{s.name}</H>
              <span className="fee-short">{s.short}</span>
            </span>
            <SpeciesIcons species={s.species} />
            <span className="fee-price">
              {s.from === 0 ? (
                "Free to start"
              ) : (
                <>
                  from <b>{money(s.from)}</b>
                </>
              )}
            </span>
            <ArrowRight className="fee-arrow" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
