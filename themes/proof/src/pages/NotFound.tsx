import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <header className="page-head empty-bag" data-not-found>
      <h1>This shelf is empty.</h1>
      <p className="lede">
        The page you were after has sold out, moved, or was never baked. Try the
        bake list instead.
      </p>
      <div className="actions">
        <Link to="/today" className="btn">
          Today's bake <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </header>
  );
}
