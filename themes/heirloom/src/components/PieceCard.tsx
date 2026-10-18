import { Link } from "../router";
import { collections, metals, type Piece } from "../content";
import { money } from "../lib/cart";
import { Plate } from "./Plate";

export function PieceCard({
  piece,
  headingLevel = 3,
}: {
  piece: Piece;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  const collection = collections.find((c) => c.id === piece.collection)!;
  const varies = piece.metals.some((m) => metals[m].surcharge > 0);
  return (
    <article className="piece-card">
      <Link
        to={`/collections/${piece.collection}/${piece.slug}`}
        className="piece-card-link"
      >
        <div className="tray">
          <Plate art={piece.art} metal={piece.metals[0]} />
          {piece.isNew && <span className="tag">New</span>}
        </div>
        <H className="piece-card-name">{piece.name}</H>
      </Link>
      <p className="piece-card-meta">
        {collection.name} · {metals[piece.metals[0]].short}
      </p>
      <p className="price">
        {varies && "from "}
        {money(piece.price)}
      </p>
    </article>
  );
}
