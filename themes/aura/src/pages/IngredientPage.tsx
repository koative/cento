import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { ingredients, posts, products, type Ingredient } from "../content";
import { IngredientMark } from "../components/IngredientMark";
import { ProductCard } from "../components/ProductCard";

export function IngredientPage({ ingredient: g }: { ingredient: Ingredient }) {
  const usedIn = products.filter((p) => p.ingredients.includes(g.slug));
  const pairs = g.pairs.map((slug) =>
    ingredients.find((x) => x.slug === slug)!,
  );
  const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
  const i = sorted.indexOf(g);
  const prev = sorted[(i - 1 + sorted.length) % sorted.length];
  const next = sorted[(i + 1) % sorted.length];
  const story = posts.find((p) =>
    p.products.some((id) => usedIn.some((u) => u.id === id)),
  );

  return (
    <div className="page ingredient-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/ingredients">Ingredients</Link>
        <span aria-hidden="true">/</span>
        <span>{g.kind}</span>
      </nav>

      <div className="ingredient-top">
        <div>
          <h1>{g.name}</h1>
          <p className="inci-name">INCI: {g.inci}</p>
          <p className="lede">{g.summary}</p>
          {g.body.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <div className="ingredient-figure">
          <IngredientMark ingredient={g} large />
        </div>
      </div>

      <dl className="facts ingredient-facts">
        <div>
          <dt>Where it comes from</dt>
          <dd>{g.origin}</dd>
        </div>
        <div>
          <dt>How much we use</dt>
          <dd>{g.strength}</dd>
        </div>
        <div>
          <dt>Worth knowing</dt>
          <dd>{g.note}</dd>
        </div>
        <div>
          <dt>Works well with</dt>
          <dd>
            {pairs.map((p, n) => (
              <span key={p.slug}>
                {n > 0 && ", "}
                <Link to={"/ingredients/" + p.slug}>{p.name}</Link>
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <section className="section">
        <div className="section-head">
          <h2>Find it in</h2>
          {story && (
            <Link to={"/journal/" + story.slug} className="text-link">
              Journal: {story.title} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="product-grid three">
          {usedIn.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <nav className="pager" aria-label="More ingredients">
        <Link to={"/ingredients/" + prev.slug}>
          <ArrowLeft size={16} aria-hidden="true" /> {prev.name}
        </Link>
        <Link to="/ingredients">All ingredients</Link>
        <Link to={"/ingredients/" + next.slug}>
          {next.name} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
