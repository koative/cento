import { products } from "../content";
import type { CartLine } from "../lib/cart";
import { GlazeTile } from "./Ceramics";

/** Product photo for shop lines; the chosen test tile for made-to-order lines. */
export function LineThumb({ line }: { line: CartLine }) {
  const p = products.find((x) => x.id === line.id);
  return (
    <div className="line-thumb">
      {p ? (
        <img
          src={p.photo.src}
          alt=""
          width={p.photo.w}
          height={p.photo.h}
          loading="lazy"
        />
      ) : (
        <GlazeTile glaze={line.glaze} clay={line.clay} />
      )}
    </div>
  );
}

export const lineHref = (line: CartLine) =>
  line.id.startsWith("made-") ? "/glazes" : `/shop/${line.id}`;
