import type { Photo as PhotoData, Product, Release, Show } from "../content";
import { Link } from "../router";
import { dayName, money, monthDay } from "../lib/format";
import { Cover } from "./Cover";
import { MerchArt } from "./MerchArt";

/** Photographs print as one-ink halftone on the stock; `red` runs them through the second ink. */
export function Photo({
  photo,
  className = "",
  eager,
  red,
}: {
  photo: PhotoData;
  className?: string;
  eager?: boolean;
  red?: boolean;
}) {
  return (
    <div className={`print ${red ? "print-red" : ""} ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={1600}
        height={1067}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

const STATUS = {
  "on-sale": "Tickets",
  low: "Few left",
  "sold-out": "Sold out",
};

export function ShowRow({ show }: { show: Show }) {
  const label = show.setlist ? "Setlist" : STATUS[show.status];
  return (
    <li>
      <Link
        to={`/tour/${show.id}`}
        className="show-row"
        data-status={show.setlist ? "played" : show.status}
      >
        <span className="show-date">
          <span>{dayName(show.date)}</span>
          {monthDay(show.date)}
        </span>
        <span className="show-place">
          <strong>{show.city}</strong>
          <span>{show.venue}</span>
        </span>
        <span className="show-support">
          {show.note ?? `with ${show.support}`}
        </span>
        <span className="show-status">{label}</span>
      </Link>
    </li>
  );
}

export function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link to={`/music/${release.slug}`} className="release-card">
      <Cover release={release} />
      <span className="release-meta">
        <strong>{release.title}</strong>
        <span>
          {release.kind} · {release.date.slice(0, 4)}
        </span>
      </span>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/merch/${product.id}`} className="product-card">
      <span className="product-art">
        <MerchArt product={product} />
        {product.badge && <span className="tag">{product.badge}</span>}
      </span>
      <span className="product-meta">
        <strong>{product.name}</strong>
        <span>{money(product.price)}</span>
      </span>
    </Link>
  );
}
