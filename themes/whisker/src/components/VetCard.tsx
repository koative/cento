import { Link } from "../router";
import type { Vet } from "../content";

/** A clinician, introduced through their own pet — the photo on their locker door. */
export function VetCard({
  vet,
  headingLevel = 3,
}: {
  vet: Vet;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <Link to={`/vets/${vet.slug}`} className="vet-card">
      <figure className="polaroid">
        <img
          src={vet.pet.image.src}
          alt={vet.pet.image.alt}
          width={vet.pet.image.w}
          height={vet.pet.image.h}
          loading="lazy"
        />
        <figcaption>
          {vet.pet.name}, {vet.pet.about.split(".")[0].toLowerCase()}
        </figcaption>
      </figure>
      <H className="vet-name">{vet.name}</H>
      <p className="vet-role">{vet.role}</p>
    </Link>
  );
}
