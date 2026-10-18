import type { CSSProperties } from "react";
import { Link } from "../router";
import {
  artistBySlug,
  workById,
  type Exhibition,
  type ShopItem,
} from "../content";
import { dateRange, money } from "../lib/format";
import { Artwork } from "./Artwork";
import { WorkPlate } from "./WorkCard";

export const artistNames = (ex: Exhibition) =>
  ex.artists.map((a) => artistBySlug(a)?.name).join(", ");

/** Installation view when we have one, otherwise the lead work on a plate of wall. */
export function ExhibitionVisual({
  ex,
  eager,
}: {
  ex: Exhibition;
  eager?: boolean;
}) {
  if (ex.view)
    return (
      <img
        className="ex-view"
        src={ex.view.src}
        alt={ex.view.alt}
        loading={eager ? "eager" : "lazy"}
      />
    );
  const lead = workById(ex.works[0]);
  return lead ? <WorkPlate work={lead} className="ex-plate" /> : null;
}

export function ExhibitionCard({
  ex,
  as: Heading = "h3",
}: {
  ex: Exhibition;
  as?: "h2" | "h3";
}) {
  return (
    <article className="ex-card">
      <Link
        to={`/exhibitions/${ex.slug}`}
        className="ex-card-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ExhibitionVisual ex={ex} />
      </Link>
      <div className="ex-card-text">
        <Heading>
          <Link to={`/exhibitions/${ex.slug}`}>{ex.title}</Link>
        </Heading>
        <p className="ex-artists">{artistNames(ex)}</p>
        <p className="ex-meta">
          <time dateTime={ex.opens}>{dateRange(ex.opens, ex.closes)}</time> ·{" "}
          {ex.space}
        </p>
      </div>
    </article>
  );
}

/** Editions and posters hang as plates; books get an authored cover. */
export function ShopVisual({ item }: { item: ShopItem }) {
  if (item.cover) {
    const dark = item.cover === "#161513";
    return (
      <div
        className="book"
        style={{ background: item.cover }}
        data-dark={dark || undefined}
      >
        <Artwork art={item.art} w={40} h={30} className="book-art" />
        <span className="book-by">{item.by}</span>
        <span className="book-title">{item.name}</span>
      </div>
    );
  }
  const [h, w] = (item.spec.match(/\d+/g) ?? ["50", "40"]).map(Number);
  return (
    <div
      className="plate"
      style={{ "--ar": `${w} / ${h}` } as CSSProperties}
      data-wide={w >= h || undefined}
    >
      <Artwork art={item.art} w={w} h={h} />
    </div>
  );
}

export function ShopCard({ item }: { item: ShopItem }) {
  return (
    <article className="shop-card">
      <Link
        to={`/shop/${item.id}`}
        className="shop-card-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ShopVisual item={item} />
      </Link>
      <h3>
        <Link to={`/shop/${item.id}`}>{item.name}</Link>
      </h3>
      <p className="shop-by">
        {item.by} ·{" "}
        {item.kind === "Books"
          ? "Book"
          : item.kind === "Editions"
            ? "Edition"
            : "Poster"}
      </p>
      <p className="shop-price">
        {money(item.price)} <span>· {item.spec}</span>
      </p>
    </article>
  );
}
