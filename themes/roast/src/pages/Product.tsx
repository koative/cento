import { useState, type CSSProperties } from "react";
import { ArrowRight, Check, ChevronLeft, Truck } from "lucide-react";
import { Link } from "../router";
import {
  coffees,
  grinds,
  guides,
  product,
  sizes,
  type Coffee,
  type Size,
} from "../content";
import { addLine, money } from "../cart";
import { Bag } from "../components/Bag";
import { Qty } from "../components/Qty";
import { RoastCurve } from "../components/RoastCurve";
import { CoffeeCard } from "../components/CoffeeCard";

export function Product({ coffee }: { coffee: Coffee }) {
  const [size, setSize] = useState<Size>("250 g");
  const [grind, setGrind] = useState(grinds[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const unit = size === "1 kg" ? coffee.priceKilo : coffee.price;
  const brewWith = guides.filter((g) => coffee.brewWith.includes(g.slug));
  const related = coffees
    .filter((c) => c.id !== coffee.id)
    .sort(
      (a, b) =>
        Math.abs(a.level - coffee.level) - Math.abs(b.level - coffee.level),
    )
    .slice(0, 3);

  function add() {
    addLine({
      id: coffee.id,
      name: coffee.name,
      color: coffee.color,
      size,
      grind,
      unit,
      qty,
    });
    setAdded(
      `Added ${qty} × ${coffee.name}, ${size}, ${grind.toLowerCase()}, to your bag.`,
    );
  }

  return (
    <div className="page product-page">
      <Link to="/shop" className="back-link">
        <ChevronLeft size={16} aria-hidden="true" /> All coffee
      </Link>

      <div className="product-main">
        <div
          className="product-stage"
          style={{ "--bag": coffee.color } as CSSProperties}
        >
          <Bag
            name={coffee.name}
            origin={coffee.origin}
            color={coffee.color}
            weight={size}
            size={17}
            className="stage-bag"
            key={size}
          />
          <p className="stage-note">
            {coffee.origin} · {coffee.region}
          </p>
        </div>

        <div className="product-buy">
          <p className="product-kind">
            {coffee.kind} · {coffee.nickname}
          </p>
          <h1>{coffee.name}</h1>
          <p className="product-notes">{coffee.notes.join(" · ")}</p>
          <p className="product-blurb">{coffee.blurb}</p>

          <div
            className="roast-meter"
            aria-label={`Roast level ${coffee.level} of 5, ${coffee.roast.toLowerCase()}`}
            role="img"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} data-on={n <= coffee.level || undefined} />
            ))}
            <em>{coffee.roast} roast</em>
          </div>

          <fieldset className="segmented">
            <legend>Size</legend>
            {sizes.map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => setSize(s)}
                />
                <span>
                  {s}{" "}
                  <small>
                    {money(s === "1 kg" ? coffee.priceKilo : coffee.price)}
                  </small>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="grind">Grind</label>
            <select
              id="grind"
              value={grind}
              onChange={(e) => setGrind(e.target.value)}
            >
              {grinds.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label="quantity" />
            <button type="button" className="btn btn-wide" onClick={add}>
              Add to bag · {money(unit * qty)}
            </button>
          </div>

          <div className="added" aria-live="polite">
            {added && (
              <p>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart" className="text-link">
                  View bag
                </Link>
              </p>
            )}
          </div>

          <p className="product-ship">
            <Truck size={18} aria-hidden="true" /> {product.freshness}{" "}
            {product.shipping}
          </p>
          <Link to="/subscribe" className="text-link">
            Get it every few weeks and save 10%{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <section className="product-story" aria-labelledby="h-story">
        <div>
          <h2 id="h-story">From {coffee.producer.split(",")[0]}</h2>
          <p>{coffee.story}</p>
        </div>
        <dl className="specs">
          {(
            [
              ["Origin", `${coffee.region}, ${coffee.origin}`],
              ["Producer", coffee.producer],
              ["Altitude", coffee.altitude],
              ["Variety", coffee.variety],
              ["Process", coffee.process],
              ["Harvest", coffee.harvest],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="product-profile" aria-labelledby="h-profile">
        <div>
          <h2 id="h-profile">How we roast it</h2>
          <p>{product.profileNote}</p>
        </div>
        <RoastCurve
          drop={coffee.profile.drop}
          temp={coffee.profile.temp}
          color={coffee.color}
        />
      </section>

      <section className="product-brew" aria-labelledby="h-brewwith">
        <h2 id="h-brewwith">Best brewed with</h2>
        <ul>
          {brewWith.map((g) => (
            <li key={g.slug}>
              <Link to={"/brew/" + g.slug}>
                <strong>{g.name}</strong>
                <span>
                  1:{g.ratio} · {g.time} · {g.grind.split(",")[0].toLowerCase()}
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="related" aria-labelledby="h-related">
        <h2 id="h-related">If you like {coffee.name}</h2>
        <div className="shelf">
          {related.map((c) => (
            <CoffeeCard key={c.id} coffee={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
