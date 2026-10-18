import { Minus, Plus } from "lucide-react";
import { Link } from "../router";
import {
  eventTypes,
  type Beer,
  type KettleEvent,
  type Product,
} from "../content";
import { beerColor, dateParts, eventTime, money } from "../lib/util";
import { Glass, ProductArt } from "./Art";

/** A beer standing on the shelf: its glass, name and the numbers that matter. */
export function BeerTile({
  beer,
  headingLevel = 3,
}: {
  beer: Beer;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="beer-tile">
      <div className="beer-tile-glass">
        <Glass
          shape={beer.glass}
          color={beerColor(beer)}
          id={`tile-${beer.slug}`}
        />
      </div>
      <H className="beer-tile-name">
        <Link to={`/beers/${beer.slug}`}>{beer.name}</Link>
      </H>
      <p className="beer-tile-style">{beer.style}</p>
      <p className="beer-tile-specs tnum">
        <span>{beer.abv.toFixed(1)}% ABV</span>
        <span>{beer.ibu} IBU</span>
      </p>
      <p
        className="beer-tile-status"
        data-on={beer.tap !== null ? "" : undefined}
      >
        {beer.tap !== null ? `Tap ${beer.tap}` : beer.back}
        {beer.shopId && beer.tap !== null && " · In cans"}
      </p>
    </article>
  );
}

export function ProductTile({
  product,
  headingLevel = 3,
}: {
  product: Product;
  headingLevel?: 2 | 3;
}) {
  const from = Math.min(...product.variants.map((v) => v.price));
  const H = `h${headingLevel}` as const;
  const v = product.variants;
  return (
    <article className="product-tile">
      <div className="product-tile-art">
        <ProductArt product={product} />
      </div>
      <H className="product-tile-name">
        <Link to={`/shop/${product.id}`}>{product.name}</Link>
      </H>
      <p className="product-tile-meta tnum">
        <span>
          {product.kind === "apparel" || product.kind === "gift"
            ? `${v[0].label}–${v[v.length - 1].label}`
            : v[0].label}
        </span>
        <span>
          {v.length > 1 && product.kind !== "apparel"
            ? `from ${money(from)}`
            : money(from)}
        </span>
      </p>
    </article>
  );
}

/** A row in the events calendar: date block, title, time and price. */
export function EventRow({
  event,
  headingLevel = 3,
}: {
  event: KettleEvent;
  headingLevel?: 2 | 3;
}) {
  const d = dateParts(event.date);
  const H = `h${headingLevel}` as const;
  return (
    <article className="event-row">
      <p className="event-date" aria-hidden="true">
        <span>{d.month}</span>
        <strong className="tnum">{d.day}</strong>
        <span>{d.weekday}</span>
      </p>
      <div className="event-main">
        <H>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </H>
        <p>{event.summary}</p>
      </div>
      <p className="event-when tnum">
        <span className="sr-only">{`${d.weekday} ${d.month} ${d.day}, `}</span>
        <span className="event-type">
          {eventTypes.find((t) => t.id === event.type)?.label}
        </span>
        {eventTime(event)}
        <br />
        {event.price ? money(event.price) : "Free"}
        {event.repeats && ` · ${event.repeats}`}
      </p>
    </article>
  );
}

export function Qty({
  value,
  onChange,
  label,
  max = 24,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  max?: number;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`One fewer, ${label}`}
      >
        <Minus aria-hidden="true" />
      </button>
      <output className="tnum" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`One more, ${label}`}
      >
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}
