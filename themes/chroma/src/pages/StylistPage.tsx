import { ArrowLeft } from "lucide-react";
import { Link, navigate } from "../router";
import {
  days,
  levels,
  looks,
  products,
  services,
  stylists,
  type Stylist,
} from "../content";
import { duration, money } from "../lib/plan";
import { setStylist } from "../lib/visit";
import { LookTile, ProductItem, StylistTile } from "../components/Tiles";

export function StylistPage({ stylist }: { stylist: Stylist }) {
  const theirLooks = looks.filter((l) => l.stylist === stylist.id);
  const signature = stylist.signature.map((id) =>
    services.find((s) => s.id === id)!,
  );
  const favourite = products.find((p) => p.id === stylist.favourite);
  const others = stylists
    .filter(
      (s) =>
        s.id !== stylist.id && s.focus.some((f) => stylist.focus.includes(f)),
    )
    .slice(0, 3);
  const first = stylist.name.split(" ")[0];

  return (
    <article className="page stylist-page">
      <div className="wrap">
        <Link to="/stylists" className="back-link">
          <ArrowLeft aria-hidden="true" size={18} /> All stylists
        </Link>
      </div>

      <div className="wrap profile">
        <figure className="profile-photo">
          <img
            src={stylist.photo.src}
            alt={stylist.photo.alt}
            width={stylist.photo.w}
            height={stylist.photo.h}
          />
        </figure>
        <div className="profile-copy">
          <h1>{stylist.name}</h1>
          <p className="profile-role">
            {stylist.role} · {levels[stylist.level].label} · at Chroma since{" "}
            {stylist.since}
          </p>
          {stylist.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <blockquote className="pull">
            <p>{stylist.quote}</p>
          </blockquote>
          <dl className="profile-facts">
            <div>
              <dt>In the salon</dt>
              <dd>{stylist.days.map((d) => days[d]).join(", ")}</dd>
            </div>
            <div>
              <dt>Works on</dt>
              <dd>{stylist.focus.join(", ")}</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @{stylist.handle}
                </a>
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="btn btn-primary btn-large"
            onClick={() => {
              setStylist(stylist.id);
              navigate("/book");
            }}
          >
            Book with {first}
          </button>
        </div>
      </div>

      <section className="wrap signature" aria-labelledby="sig-h">
        <h2 id="sig-h">{first}'s most-booked</h2>
        <ul className="sig-list">
          {signature.map((s) => (
            <li key={s.id}>
              <span className="sig-name">{s.name}</span>
              <span className="num">
                {duration(s.steps.reduce((n, st) => n + st.min, 0))}
              </span>
              <span className="num price">{money(s.price[stylist.level])}</span>
            </li>
          ))}
        </ul>
        <Link to="/services" className="text-link">
          Full menu at {levels[stylist.level].label} prices
        </Link>
      </section>

      {theirLooks.length > 0 && (
        <section className="wrap" aria-labelledby="work-h">
          <h2 id="work-h">From {first}'s chair</h2>
          <div className="look-row">
            {theirLooks.map((l) => (
              <LookTile key={l.id} look={l} />
            ))}
          </div>
        </section>
      )}

      {favourite && (
        <section className="wrap favourite" aria-labelledby="fav-h">
          <h2 id="fav-h">{first} sends everyone home with</h2>
          <div className="favourite-item">
            <ProductItem product={favourite} />
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="wrap" aria-labelledby="others-h">
          <h2 id="others-h">Also good for {stylist.focus[0].toLowerCase()}</h2>
          <div className="stylist-grid three">
            {others.map((s) => (
              <StylistTile key={s.id} stylist={s} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
