import { Link } from "../router";
import { FlashArt } from "../components/FlashArt";

export function NotFound() {
  return (
    <div className="page not-found wrap" data-not-found>
      <FlashArt art="threshold" />
      <h1>This sheet came off the wall</h1>
      <p className="lede">
        The page you followed has moved or never existed. The rest of the flash
        book is still up.
      </p>
      <div className="actions">
        <Link to="/flash" className="btn btn-ink">
          Open the flash book
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the studio
        </Link>
      </div>
    </div>
  );
}
