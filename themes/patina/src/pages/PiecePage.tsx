import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import { brand, eras, grades, pieces, rooms, type Piece } from "../content";
import { PieceCard, Tag, dimsLine } from "../components/Tag";
import { FitCheck } from "../components/FitCheck";
import { Qty } from "../components/Qty";
import { addToCart, money, useCart } from "../lib/cart";
import { inches } from "../lib/fit";

export function PiecePage({ piece }: { piece: Piece }) {
  const [shown, setShown] = useState(0);
  const [option, setOption] = useState(piece.options[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const cart = useCart();

  const finish = piece.options.find((o) => o.id === option)!;
  const inCart = cart
    .filter((l) => l.id === piece.id)
    .reduce((s, l) => s + l.qty, 0);
  const left = piece.available - inCart;
  const units = Math.min(qty, Math.max(left, 1));
  const era = eras.find((e) => e.id === piece.era)!;
  const grade = grades.find((g) => g.id === piece.grade)!;
  const room = rooms.find((r) => r.pieces.some((p) => p.id === piece.id));
  const related = pieces
    .filter(
      (p) => p.category === piece.category && p.id !== piece.id && !p.sold,
    )
    .slice(0, 3);
  const img = piece.images[shown];
  const unitWord = piece.unit ?? "piece";

  function add(thenCheckout: boolean) {
    addToCart(piece.id, option, units);
    setAdded(
      `${units > 1 ? units + " × " : ""}${piece.name} (${finish.label.toLowerCase()}) added to your cart.`,
    );
    setQty(1);
    if (thenCheckout) navigate("/checkout");
  }

  return (
    <div className="page piece">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">The floor</Link>
        <span aria-hidden="true">/</span>
        <Link to={"/shop?category=" + piece.category}>{piece.category}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{piece.stock}</span>
      </nav>

      <div className="piece-top">
        <div className="piece-gallery">
          <figure className="piece-main" data-sold={piece.sold || undefined}>
            <img
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              key={img.src}
            />
          </figure>
          {piece.images.length > 1 && (
            <div className="piece-thumbs" role="group" aria-label="Photographs">
              {piece.images.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  aria-pressed={i === shown}
                  onClick={() => setShown(i)}
                  aria-label={`Photograph ${i + 1} of ${piece.images.length}`}
                >
                  <img src={im.src} alt="" width={im.w} height={im.h} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="piece-buy">
          <div className="piece-tag">
            <Tag piece={piece} size="large" />
          </div>
          <h1>{piece.name}</h1>
          <p className="piece-sub">
            {piece.date} · {piece.origin}
          </p>
          <p className="piece-summary">{piece.summary}</p>

          {piece.sold ? (
            <div className="sold-note">
              <p>
                This piece has gone to a new home. We see similar pieces a few
                times a year — email{" "}
                <a
                  href={`mailto:${brand.email}?subject=Looking for something like ${piece.stock}`}
                >
                  {brand.email}
                </a>{" "}
                and we will let you know.
              </p>
              <Link to={"/shop?category=" + piece.category} className="btn">
                More {piece.category.toLowerCase()} on the floor{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <form
              className="buy-form"
              onSubmit={(e) => {
                e.preventDefault();
                add(false);
              }}
            >
              <fieldset className="finish">
                <legend>Finish</legend>
                {piece.options.map((o) => (
                  <label key={o.id} className="finish-option">
                    <input
                      type="radio"
                      name="finish"
                      value={o.id}
                      checked={option === o.id}
                      onChange={() => setOption(o.id)}
                    />
                    <span className="finish-label">{o.label}</span>
                    <span className="finish-price">
                      {o.delta ? "+" + money(o.delta) : "Included"}
                    </span>
                    <span className="finish-note">{o.note}</span>
                  </label>
                ))}
              </fieldset>

              {piece.available > 1 && (
                <div className="buy-qty">
                  <span className="buy-qty-label">How many {unitWord}s</span>
                  <Qty
                    value={units}
                    onChange={setQty}
                    label={`${unitWord}s`}
                    max={Math.max(left, 1)}
                  />
                  <span className="buy-qty-note">
                    {left > 0
                      ? `${left} of ${piece.available} available`
                      : "All in your cart"}
                  </span>
                </div>
              )}

              <p className="buy-total">
                <span>Total</span>
                <strong>{money((piece.price + finish.delta) * units)}</strong>
              </p>

              <div className="actions">
                <button type="submit" className="btn" disabled={left < 1}>
                  {left < 1 ? "Already in your cart" : "Add to cart"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={left < 1}
                  onClick={() => add(true)}
                >
                  Buy now
                </button>
              </div>
              <div className="buy-added" aria-live="polite">
                {added && (
                  <p>
                    <Check size={18} aria-hidden="true" /> {added}{" "}
                    <Link to="/cart">View cart</Link>
                  </p>
                )}
              </div>
              <p className="quiet">
                We hold any piece for 48 hours on request — call {brand.phone}{" "}
                with the stock number.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="piece-details">
        <section aria-labelledby="specs-h" className="specs">
          <h2 id="specs-h">From the stock book</h2>
          <dl>
            <div>
              <dt>Stock number</dt>
              <dd>{piece.stock}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>
                {piece.date} — {era.label}
              </dd>
            </div>
            <div>
              <dt>Made in</dt>
              <dd>{piece.origin}</dd>
            </div>
            <div>
              <dt>Materials</dt>
              <dd>{piece.materials}</dd>
            </div>
            <div>
              <dt>Dimensions</dt>
              <dd>
                {dimsLine(piece.dims)}
                {piece.dims.seat ? ` · seat ${inches(piece.dims.seat)}` : ""}
              </dd>
            </div>
            {piece.splits && (
              <div>
                <dt>Comes apart</dt>
                <dd>
                  Yes — the {piece.splits.note}. Largest part{" "}
                  {dimsLine(piece.splits.largest)}.
                </dd>
              </div>
            )}
            <div>
              <dt>Condition</dt>
              <dd>{grade.name}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="story-h" className="story">
          <h2 id="story-h">Where it has been</h2>
          {piece.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h3>Marks we can see</h3>
          <ul className="marks">
            {piece.marks.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>
      </div>

      {!piece.sold && <FitCheck piece={piece} />}

      {room && (
        <aside className="room-callout" aria-labelledby="room-callout-h">
          <img
            src={room.image.src}
            alt=""
            width={room.image.w}
            height={room.image.h}
            loading="lazy"
          />
          <div>
            <h2 id="room-callout-h">Staged in {room.name.toLowerCase()}</h2>
            <p>{room.blurb}</p>
            <Link to={"/rooms/" + room.slug} className="text-link">
              See the room set <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      )}

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-h">
          <h2 id="related-h">
            More {piece.category.toLowerCase()} on the floor
          </h2>
          <div className="piece-grid piece-grid-3">
            {related.map((p) => (
              <PieceCard key={p.id} piece={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
