import { Link } from "../router";
import { coasts, type Villa } from "../content";
import { lowestRate, money } from "../lib/stay";

type Props = {
  villa: Villa;
  /** "free" / "taken" when the guest has chosen dates; the reason is shown when taken. */
  fit?: { free: boolean; note: string };
  onHover?: (slug: string | undefined) => void;
  headingLevel?: "h2" | "h3";
  eager?: boolean;
};

export function VillaCard({
  villa,
  fit,
  onHover,
  headingLevel: H = "h3",
  eager,
}: Props) {
  const photo = villa.photos[0];
  return (
    <article
      className="villa-card"
      onPointerEnter={() => onHover?.(villa.slug)}
      onPointerLeave={() => onHover?.(undefined)}
    >
      <div className="villa-card-photo">
        <img
          src={photo.src}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          width={800}
          height={600}
        />
      </div>
      <div className="villa-card-body">
        <H className="plaque">
          <Link
            to={`/villas/${villa.slug}`}
            onFocus={() => onHover?.(villa.slug)}
            onBlur={() => onHover?.(undefined)}
          >
            {villa.name}
          </Link>
        </H>
        <p className="villa-card-line">{villa.line}</p>
        <ul className="villa-card-specs">
          {[
            coasts[villa.coast].label,
            `Sleeps ${villa.sleeps}`,
            `${villa.bedrooms} bedrooms`,
            villa.pool ? "Pool" : "No pool",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="villa-card-price">
          From <strong>{money(lowestRate(villa))}</strong> a night
        </p>
        {fit && (
          <p className="villa-card-fit" data-free={fit.free ? "" : undefined}>
            {fit.note}
          </p>
        )}
      </div>
    </article>
  );
}
