import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { ages, products, workshops, type AgeBand } from "../content";
import { fitsBand, money } from "../lib/format";
import { Block } from "../components/Block";
import { ProductCard } from "../components/ProductCard";

export function AgeShelf({ band }: { band: AgeBand }) {
  const index = ages.indexOf(band);
  const prev = ages[index - 1];
  const next = ages[index + 1];
  const toys = products
    .filter((p) => fitsBand(p, band))
    .sort((a, b) => a.pick - b.pick);
  const classes = workshops.filter(
    (w) => w.ageMin < band.max && w.ageMax >= band.min,
  );

  return (
    <div
      className="page age-page"
      style={{ "--band": band.color, "--on": band.on } as CSSProperties}
    >
      <header className="age-hero">
        <Block shape={band.shape} color="currentColor" size={120} />
        <div>
          <h1>
            {band.label}: <span>{band.nickname.toLowerCase()}</span>
          </h1>
          <p className="lead">{band.intro}</p>
        </div>
      </header>

      <div className="age-notes">
        <section aria-labelledby="h-into">
          <h2 id="h-into">What they are into</h2>
          <ul className="into-list">
            {band.into.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <figure className="staff-note">
            <blockquote>{band.tip.quote}</blockquote>
            <figcaption>{band.tip.by}</figcaption>
          </figure>
        </section>
        <section aria-labelledby="h-look">
          <h2 id="h-look">What we look for on this shelf</h2>
          <dl className="look-for">
            {band.lookFor.map((l) => (
              <div key={l.title}>
                <dt>{l.title}</dt>
                <dd>{l.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section aria-labelledby="h-shelf">
        <div className="section-head section-head-row">
          <h2 id="h-shelf">
            On the {band.short} shelf: {toys.length} toys
          </h2>
          <Link to="/gift-finder" className="text-link">
            Narrow it down with the gift finder{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {toys.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {classes.length > 0 && (
        <section className="age-classes" aria-labelledby="h-classes">
          <h2 id="h-classes">Workshops for this age</h2>
          <ul>
            {classes.map((w) => (
              <li key={w.id}>
                <Link to={`/workshops/${w.id}`}>{w.name}</Link>
                <span>
                  Ages {w.ages} · {w.length} · {money(w.price)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="shelf-pager" aria-label="Other age shelves">
        {prev ? (
          <Link to={`/ages/${prev.id}`}>
            <ArrowLeft size={18} aria-hidden="true" /> {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/ages/${next.id}`}>
            {next.label} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  );
}
