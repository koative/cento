import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import { products, type Product } from "../content";
import { addLine, money } from "../lib/cart";
import { ProductArt } from "../components/ProductArt";
import { ProductCard, Qty, Swatches } from "../components/ProductCard";
import { NoiseLab } from "../components/NoiseLab";

export function ProductPage({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.type === product.type ||
          p.uses.some((u) => product.uses.includes(u))),
    )
    .slice(0, 3);
  const s = product.specs;

  function add(thenCheckout: boolean) {
    addLine({
      id: product.id,
      name: product.name,
      colour: colour.name,
      shell: colour.shell,
      unit: product.price,
      qty,
    });
    if (thenCheckout) return navigate("/checkout");
    setAdded(`Added ${qty} × ${product.name} in ${colour.name} to your cart.`);
  }

  return (
    <div className="page product-page">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="buy">
        <figure className="buy-art">
          <ProductArt
            kind={product.kind}
            colour={colour}
            label={`${product.name} in ${colour.name}`}
          />
          <figcaption className="muted">
            {product.name} in {colour.name}.{" "}
            {product.colours.length > 1 &&
              `${product.colours.length} colours, same price.`}
          </figcaption>
        </figure>

        <div className="buy-box">
          <h1>{product.name}</h1>
          <p className="lead">{product.line}</p>
          <p className="buy-type">
            {product.type} · for {product.uses.join(", ").toLowerCase()}
          </p>
          <p className="price num">{money(product.price)}</p>

          <Swatches
            colours={product.colours}
            value={colour.name}
            onChange={(c) => (setColour(c), setAdded(""))}
            name="colour"
          />

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label="Quantity" />
            <button
              type="button"
              className="btn btn-grow"
              onClick={() => add(false)}
            >
              Add to cart · {money(product.price * qty)}
            </button>
          </div>
          <button
            type="button"
            className="btn btn-quiet btn-wide"
            onClick={() => add(true)}
          >
            Buy now and check out
          </button>

          <div className="added" aria-live="polite">
            {added && (
              <p>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View cart</Link>
              </p>
            )}
          </div>

          <ul className="buy-notes">
            <li>Free signed-for shipping, 2–4 working days</li>
            <li>45-day home trial, free returns</li>
            <li>
              {product.fits
                ? `Fits ${product.fits}`
                : "Two-year warranty, three when registered"}
            </li>
          </ul>
        </div>
      </div>

      <section className="detail-story" aria-labelledby="h-about">
        <h2 id="h-about">About {product.name}</h2>
        <p>{product.summary}</p>
        <dl className="highlights">
          {product.highlights.map((h) => (
            <div key={h.title}>
              <dt>{h.title}</dt>
              <dd>{h.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {s && (
        <NoiseLab
          product={product}
          title={`How quiet ${product.name} gets`}
          text="Pick a place and move the slider. The shaded area is the room, the line is what reaches your ear."
        />
      )}

      <section className="specs" aria-labelledby="h-specs">
        <h2 id="h-specs">{s ? "Specifications" : "In the box"}</h2>
        <div className="specs-grid">
          {s && (
            <table className="spec-table">
              <caption className="visually-hidden">
                {product.name} specifications
              </caption>
              <tbody>
                <tr>
                  <th scope="row">Active cancelling</th>
                  <td className="num">Up to −{s.anc} dB at 150 Hz</td>
                </tr>
                <tr>
                  <th scope="row">Passive isolation</th>
                  <td className="num">{s.passive} dB above 2 kHz</td>
                </tr>
                <tr>
                  <th scope="row">Battery</th>
                  <td>{s.battery}</td>
                </tr>
                <tr>
                  <th scope="row">Fast charge</th>
                  <td>{s.charging}</td>
                </tr>
                <tr>
                  <th scope="row">Weight</th>
                  <td className="num">{s.weight}</td>
                </tr>
                <tr>
                  <th scope="row">Microphones</th>
                  <td>{s.mics}</td>
                </tr>
                <tr>
                  <th scope="row">Codecs</th>
                  <td>{s.codecs}</td>
                </tr>
                <tr>
                  <th scope="row">Multipoint</th>
                  <td>
                    {s.multipoint
                      ? "Yes, two devices"
                      : "No, one device at a time"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Water resistance</th>
                  <td>{s.water}</td>
                </tr>
              </tbody>
            </table>
          )}
          <div className="in-box">
            {s && <h3>In the box</h3>}
            <ul>
              {product.inBox.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            {s && (
              <Link to="/compare" className="text-link">
                Compare with other models{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="related" aria-labelledby="h-related">
        <h2 id="h-related">You might also wear</h2>
        <div className="product-grid three">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
