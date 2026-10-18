import { useState, type FormEvent } from "react";
import { Check, Gift, ShoppingBasket } from "lucide-react";
import { Link, navigate } from "../router";
import { products, wraps, type Product } from "../content";
import { addLine } from "../lib/cart";
import { ageLabel, bandFor, money } from "../lib/format";
import { AgeBadge } from "../components/Block";
import { ProductCard } from "../components/ProductCard";
import { Qty } from "../components/Qty";

export function ProductPage({ product }: { product: Product }) {
  const images = [product.image, ...product.gallery];
  const band = bandFor(product.ageMin);
  const [shown, setShown] = useState(0);
  const [choice, setChoice] = useState(0);
  const [wrap, setWrap] = useState("kraft");
  const [tag, setTag] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const value = product.option?.values[choice];
  const wrapping = wraps.find((w) => w.id === wrap) ?? wraps[0];
  const unit = product.price + (value?.add ?? 0) + wrapping.price;
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.aisle === product.aisle ||
          p.interests.some((i) => product.interests.includes(i))),
    )
    .sort(
      (a, b) =>
        Math.abs(a.ageMin - product.ageMin) -
          Math.abs(b.ageMin - product.ageMin) || a.pick - b.pick,
    )
    .slice(0, 4);

  function add(goToCheckout: boolean) {
    addLine({
      kind: "toy",
      id: product.id,
      name: product.name,
      detail: value?.label ?? "",
      wrap: wrapping.id === "none" ? undefined : wrapping.label,
      tag: wrapping.id === "none" ? undefined : tag.trim() || undefined,
      image: product.image.src,
      unit,
      qty,
      max: product.stock,
    });
    if (goToCheckout) navigate("/checkout");
    else
      setAdded(
        `${qty} × ${product.name} added to your basket${wrapping.id === "none" ? "" : ", gift wrapped"}.`,
      );
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    add(submitter?.value === "checkout");
  }

  return (
    <div className="page product-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/ages/${band.id}`}>{band.label}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-layout">
        <div className="gallery">
          <div className="gallery-main">
            <img
              src={images[shown].src}
              alt={images[shown].alt}
              width={images[shown].w}
              height={images[shown].h}
            />
            <AgeBadge ageMin={product.ageMin} ageMax={product.ageMax} />
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  aria-pressed={shown === i}
                  onClick={() => setShown(i)}
                >
                  <img src={im.src} alt="" width={im.w} height={im.h} />
                  <span className="visually-hidden">Show photo {i + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="buy-box" onSubmit={submit}>
          <h1>{product.name}</h1>
          <p className="buy-meta">
            {product.aisle} · ages {ageLabel(product)}
          </p>
          <p className="lead">{product.blurb}</p>
          <p className="buy-price">
            <span className="price-tag price-tag-large">{money(unit)}</span>
            <span className={product.stock <= 5 ? "low-stock" : "in-stock"}>
              {product.stock <= 5
                ? `Only ${product.stock} left on the shelf`
                : "On the shelf, ready today"}
            </span>
          </p>

          {product.option && (
            <fieldset className="option-set">
              <legend>
                {product.option.name}: <b>{value?.label}</b>
              </legend>
              <div className="option-values">
                {product.option.values.map((v, i) => (
                  <label key={v.label} className="option">
                    <input
                      type="radio"
                      name="option"
                      checked={choice === i}
                      onChange={() => setChoice(i)}
                    />
                    <span>
                      {v.swatch && (
                        <i
                          className="swatch"
                          style={{ background: v.swatch }}
                          aria-hidden="true"
                        />
                      )}
                      {v.label}
                      {v.add ? <small> +{money(v.add)}</small> : null}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="option-set">
            <legend>
              <Gift size={18} aria-hidden="true" /> Gift wrap
            </legend>
            <div className="option-values">
              {wraps.map((w) => (
                <label key={w.id} className="option">
                  <input
                    type="radio"
                    name="wrap"
                    checked={wrap === w.id}
                    onChange={() => setWrap(w.id)}
                  />
                  <span>
                    <i className={"swatch wrap-" + w.id} aria-hidden="true" />
                    {w.label}
                    <small>
                      {" "}
                      {w.price
                        ? "+" + money(w.price)
                        : w.id === "none"
                          ? ""
                          : "free"}
                    </small>
                  </span>
                </label>
              ))}
            </div>
            {wrap !== "none" && (
              <div className="field tag-field">
                <label htmlFor="gift-tag">
                  Message for the gift tag (optional)
                </label>
                <input
                  id="gift-tag"
                  value={tag}
                  maxLength={60}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Happy 4th birthday, Mo! Love, Gran"
                  aria-describedby="gift-tag-count"
                />
                <p className="field-hint" id="gift-tag-count">
                  Handwritten at the counter. {60 - tag.length} characters left.
                </p>
              </div>
            )}
          </fieldset>

          <div className="buy-row">
            <Qty
              value={qty}
              max={product.stock}
              onChange={setQty}
              label="Quantity"
            />
            <button type="submit" className="btn" value="basket">
              <ShoppingBasket size={18} aria-hidden="true" /> Add to basket ·{" "}
              {money(unit * qty)}
            </button>
          </div>
          <button type="submit" className="text-button" value="checkout">
            Add and go to checkout
          </button>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View basket</Link>
              </>
            )}
          </p>
        </form>
      </div>

      <div className="product-details">
        <section aria-labelledby="h-about-toy">
          <h2 id="h-about-toy">About this toy</h2>
          {product.description.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {product.note && (
            <figure className="staff-note">
              <blockquote>{product.note.quote}</blockquote>
              <figcaption>{product.note.by}, at the counter</figcaption>
            </figure>
          )}
        </section>
        <section aria-labelledby="h-specs">
          <h2 id="h-specs">The details</h2>
          <dl className="specs">
            <div>
              <dt>Ages</dt>
              <dd>{ageLabel(product)}</dd>
            </div>
            {product.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div>
              <dt>Made by</dt>
              <dd>{product.maker}</dd>
            </div>
          </dl>
        </section>
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="h-related">
          <h2 id="h-related">Played with alongside</h2>
          <div className="product-grid product-grid-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
