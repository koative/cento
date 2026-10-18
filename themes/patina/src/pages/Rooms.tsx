import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { pieceById, rooms } from "../content";
import { money } from "../lib/cart";

export function Rooms() {
  return (
    <div className="page rooms">
      <header className="page-head">
        <h1>Room sets</h1>
        <p className="lead">
          Every few weeks we rearrange the warehouse into rooms: pieces from
          different decades that we think belong together. Buy one piece, or
          take the room home as staged.
        </p>
      </header>

      <ol className="room-list">
        {rooms.map((room) => {
          const items = room.pieces.map((rp) => ({
            ...rp,
            piece: pieceById(rp.id)!,
          }));
          const total = items
            .filter((i) => !i.piece.sold)
            .reduce((s, i) => s + i.piece.price * i.qty, 0);
          return (
            <li key={room.slug} className="room-row">
              <Link
                to={"/rooms/" + room.slug}
                className="room-row-media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={room.image.src}
                  alt=""
                  width={room.image.w}
                  height={room.image.h}
                  loading="lazy"
                />
              </Link>
              <div className="room-row-copy">
                <h2>
                  <Link to={"/rooms/" + room.slug}>{room.name}</Link>
                </h2>
                <p>{room.blurb}</p>
                <ul className="ledger">
                  {items.map(({ id, qty, piece }) => (
                    <li key={id}>
                      <span>
                        {qty > 1 ? `${qty} × ` : ""}
                        {piece.name}
                      </span>
                      <span>
                        {piece.sold ? "Sold" : money(piece.price * qty)}
                      </span>
                    </li>
                  ))}
                  <li className="ledger-total">
                    <span>The room, as staged · {room.footprint}</span>
                    <span>{money(total)}</span>
                  </li>
                </ul>
                <Link to={"/rooms/" + room.slug} className="text-link">
                  Walk through {room.name.toLowerCase()}{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
