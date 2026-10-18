import { Link } from "../router";
import { Plate } from "../components/Plate";

export function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <div className="tray">
        <Plate art={{ kind: "band", band: "court" }} metal="platinum" />
      </div>
      <div>
        <h1>This drawer is empty</h1>
        <p className="lede">
          The page you were looking for has been moved, sold or never existed.
          The pieces are all still here.
        </p>
        <div className="actions">
          <Link to="/collections" className="btn">
            See the collections
          </Link>
          <Link to="/" className="btn btn-quiet">
            Back to the atelier
          </Link>
        </div>
      </div>
    </div>
  );
}
