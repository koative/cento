import { Bath, BedDouble, Heart, Ruler } from "lucide-react";
import { Link } from "../router";
import type { Listing } from "../content";
import { areaOf, price } from "../lib/format";
import { toggleSaved, useSaved } from "../lib/store";

export function SaveButton({
  listing,
  label = false,
}: {
  listing: Listing;
  label?: boolean;
}) {
  const on = useSaved().includes(listing.id);
  return (
    <button
      type="button"
      className={"save-btn" + (label ? " save-btn-label" : "")}
      aria-pressed={on}
      aria-label={label ? undefined : `Save ${listing.address}`}
      onClick={() => toggleSaved(listing.id)}
    >
      <Heart
        size={18}
        strokeWidth={1.75}
        fill={on ? "currentColor" : "none"}
        aria-hidden="true"
      />
      {label && (on ? "Saved" : "Save home")}
    </button>
  );
}

export function Facts({ listing }: { listing: Listing }) {
  return (
    <ul className="facts num">
      <li>
        <BedDouble size={16} strokeWidth={1.75} aria-hidden="true" />{" "}
        {listing.beds} bd
      </li>
      <li>
        <Bath size={16} strokeWidth={1.75} aria-hidden="true" /> {listing.baths}{" "}
        ba
      </li>
      <li>
        <Ruler size={16} strokeWidth={1.75} aria-hidden="true" />{" "}
        {listing.sqft.toLocaleString("en-US")} sq ft
      </li>
    </ul>
  );
}

type CardProps = {
  listing: Listing;
  active?: boolean;
  onHover?: (id: string | null) => void;
  lazy?: boolean;
};

export function ListingCard({
  listing,
  active,
  onHover,
  lazy = true,
}: CardProps) {
  return (
    <article
      className="listing-card"
      data-active={active || undefined}
      onPointerEnter={() => onHover?.(listing.id)}
      onPointerLeave={() => onHover?.(null)}
    >
      <div className="card-media">
        <img
          src={listing.images[0].src}
          alt=""
          loading={lazy ? "lazy" : undefined}
        />
        {listing.status && <span className="tag">{listing.status}</span>}
        <SaveButton listing={listing} />
      </div>
      <div className="card-body">
        <p className="card-price num">{price(listing)}</p>
        <h3>
          <Link
            to={"/homes/" + listing.id}
            onFocus={() => onHover?.(listing.id)}
            onBlur={() => onHover?.(null)}
          >
            {listing.address}
          </Link>
        </h3>
        <p className="card-area">
          {areaOf(listing.area).name} · {listing.type}
        </p>
        <Facts listing={listing} />
      </div>
    </article>
  );
}
