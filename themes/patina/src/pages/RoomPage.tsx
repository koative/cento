import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { pieceById, rooms, type RoomSet } from "../content";
import { Tag, dimsLine } from "../components/Tag";
import { addToCart, money, useCart } from "../lib/cart";

export function RoomPage({ room }: { room: RoomSet }) {
  const cart = useCart();
  const [added, setAdded] = useState("");
  const items = room.pieces.map((rp) => ({ ...rp, piece: pieceById(rp.id)! }));
  const buyable = items.filter((i) => !i.piece.sold);
  const total = buyable.reduce((s, i) => s + i.piece.price * i.qty, 0);
  const inCart = (id: string) =>
    cart.filter((l) => l.id === id).reduce((s, l) => s + l.qty, 0);
  const missing = buyable.filter((i) => inCart(i.id) < i.qty);
  const others = rooms.filter((r) => r.slug !== room.slug);

  function addRoom() {
    for (const i of missing)
      addToCart(i.id, i.piece.options[0].id, i.qty - inCart(i.id));
    setAdded(
      `${missing.length} ${missing.length === 1 ? "piece" : "pieces"} from ${room.name.toLowerCase()} added to your cart, as photographed.`,
    );
  }

  return (
    <div className="page room">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/rooms">Room sets</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{room.name}</span>
      </nav>

      <div className="room-hero">
        <figure>
          <img
            src={room.image.src}
            alt={room.image.alt}
            width={room.image.w}
            height={room.image.h}
          />
        </figure>
        <div className="room-hero-copy">
          <h1>{room.name}</h1>
          <p className="lead">{room.blurb}</p>
          {room.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="room-footprint">Staged footprint: {room.footprint}</p>
        </div>
      </div>

      <section className="room-pieces" aria-labelledby="room-pieces-h">
        <h2 id="room-pieces-h">In this room</h2>
        <ul className="room-piece-list">
          {items.map(({ id, qty, piece }) => (
            <li key={id} data-sold={piece.sold || undefined}>
              <Link
                to={"/shop/" + id}
                className="room-piece-media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={piece.images[0].src}
                  alt=""
                  width={piece.images[0].w}
                  height={piece.images[0].h}
                  loading="lazy"
                />
              </Link>
              <div>
                <h3>
                  <Link to={"/shop/" + id}>
                    {qty > 1 ? `${qty} × ` : ""}
                    {piece.name}
                  </Link>
                </h3>
                <p>
                  {piece.date} · {piece.materials}
                </p>
                <p className="room-piece-dims">{dimsLine(piece.dims)}</p>
              </div>
              <Tag piece={piece} />
            </li>
          ))}
        </ul>

        <div className="room-buy">
          <p>
            <span>The room, as photographed</span>
            <strong>{money(total)}</strong>
          </p>
          <button
            type="button"
            className="btn"
            disabled={!missing.length}
            onClick={addRoom}
          >
            {missing.length
              ? `Add ${missing.length === buyable.length ? "the room" : "the rest of the room"} to cart`
              : "The whole room is in your cart"}
          </button>
          <div aria-live="polite" className="buy-added">
            {added && (
              <p>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View cart</Link>
              </p>
            )}
          </div>
          <p className="quiet">
            Change finishes or re-cover a chair from each piece's own page.
          </p>
        </div>
      </section>

      <section className="related" aria-labelledby="other-rooms-h">
        <h2 id="other-rooms-h">Other rooms on the floor</h2>
        <ul className="other-rooms">
          {others.map((r) => (
            <li key={r.slug}>
              <Link to={"/rooms/" + r.slug}>
                <img
                  src={r.image.src}
                  alt=""
                  width={r.image.w}
                  height={r.image.h}
                  loading="lazy"
                />
                <span>
                  {r.name} <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
