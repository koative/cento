import { Link } from "../router";
import { glazeById, type Product } from "../content";
import { money } from "../lib/cart";

export function stockLabel(stock: Product["stock"]) {
  if (stock === "made") return "Made to order";
  return stock <= 3 ? `${stock} left` : "In stock";
}

/** A shop object with its catalogue label: number, name, glaze, price. */
export function ProductCard({
  product,
  lazy = true,
}: {
  product: Product;
  lazy?: boolean;
}) {
  const p = product;
  return (
    <article className="object-card">
      <Link to={`/shop/${p.id}`} className="object-link">
        <div className="object-photo">
          <img
            src={p.photo.src}
            alt={p.photo.alt}
            width={p.photo.w}
            height={p.photo.h}
            loading={lazy ? "lazy" : undefined}
          />
        </div>
        <div className="object-label">
          <span className="object-no">
            No. {String(p.number).padStart(3, "0")}
          </span>
          <h3>{p.name}</h3>
          <span className="object-glaze">
            {p.glazes.map((g) => (
              <i
                key={g}
                style={{ background: glazeById(g).color }}
                aria-hidden="true"
              />
            ))}
            {p.glazes.length > 1
              ? `${p.glazes.length} glazes`
              : glazeById(p.glazes[0]).name}
          </span>
          <span className="object-price">
            {p.sizes ? "from " : ""}
            {money(p.price)}
          </span>
          <span
            className="object-stock"
            data-made={p.stock === "made" || undefined}
          >
            {stockLabel(p.stock)}
          </span>
        </div>
      </Link>
    </article>
  );
}
