import type { Piece } from "../content";
import { Link } from "../router";
import { money } from "../lib/cart";
import { inches } from "../lib/fit";

/** The manila stock tag every piece wears on the floor. */
export function Tag({
  piece,
  size = "small",
}: {
  piece: Piece;
  size?: "small" | "large";
}) {
  return (
    <span className={"tag tag-" + size} data-sold={piece.sold || undefined}>
      <span className="tag-no">{piece.stock}</span>
      <span className="tag-price">
        {piece.sold ? "Sold" : money(piece.price)}
      </span>
      <span className="tag-grade">
        Grade {piece.grade}
        {piece.unit && !piece.sold ? ` · per ${piece.unit}` : ""}
      </span>
    </span>
  );
}

export function dimsLine({ w, d, h }: Piece["dims"]) {
  return `W ${inches(w)} · D ${inches(d)} · H ${inches(h)}`;
}

export function PieceCard({
  piece,
  eager = false,
}: {
  piece: Piece;
  eager?: boolean;
}) {
  const img = piece.images[0];
  return (
    <article className="piece-card" data-sold={piece.sold || undefined}>
      <Link to={"/shop/" + piece.id} className="piece-card-link">
        <span className="piece-card-media">
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading={eager ? "eager" : "lazy"}
          />
        </span>
        <span className="tag-hang">
          <Tag piece={piece} />
        </span>
        <span className="piece-card-body">
          <span className="piece-card-name">{piece.name}</span>
          <span className="piece-card-meta">
            {piece.date} · {piece.origin}
          </span>
          <span className="piece-card-dims">{dimsLine(piece.dims)}</span>
        </span>
      </Link>
    </article>
  );
}
