import { Link } from "../router";
import type { MerchItem } from "../content";
import { money } from "../lib";
import { MerchArt } from "./MerchArt";

export function MerchCard({ item }: { item: MerchItem }) {
  return (
    <article className="merch-card">
      <div className="merch-card-art">
        <MerchArt
          kind={item.kind}
          color={item.colors[0]}
          label={`${item.name} in ${item.colors[0].label}`}
        />
      </div>
      <h3>
        <Link to={`/merch/${item.id}`} className="stretch">
          {item.name}
        </Link>
      </h3>
      <p className="merch-card-meta">
        <span className="price">{money(item.price)}</span>
        {item.colors.length > 1 && (
          <span
            className="swatches"
            role="img"
            aria-label={`${item.colors.length} colours`}
          >
            {item.colors.map((c) => (
              <span key={c.id} style={{ background: c.fill }} />
            ))}
          </span>
        )}
      </p>
      <p className="blurb">{item.blurb}</p>
    </article>
  );
}
