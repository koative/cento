import { Link } from "../router";
import { Shape } from "../components/Shape";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <div className="lost-shapes" aria-hidden="true">
        <Shape kind="circle" swatch="mint" />
        <Shape kind="arch" swatch="lilac" />
        <Shape kind="triangle" swatch="coral" />
      </div>
      <h1>This gallery wandered off</h1>
      <p className="lede">
        We couldn’t find that page. It may have moved, or it was never here at
        all.
      </p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-ink">
          Back to the entrance
        </Link>
        <Link to="/exhibits" className="btn btn-line">
          See all exhibits
        </Link>
      </div>
    </section>
  );
}
