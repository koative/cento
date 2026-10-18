import { Link } from "../router";
import { findFrame } from "../content";

export function NotFound() {
  const frame = findFrame("rooms-3")!;
  return (
    <div className="page not-found" data-not-found>
      <figure className="nf-figure">
        <img src={frame.src} alt="" width={frame.w} height={frame.h} />
      </figure>
      <div>
        <h1>This frame did not come out</h1>
        <p className="lede">
          The page you followed is not on any contact sheet here. It may have
          been renamed, or the link was cut short.
        </p>
        <div className="actions">
          <Link to="/series" className="btn btn-solid">
            See the series
          </Link>
          <Link to="/" className="text-link">
            Back to the studio
          </Link>
        </div>
      </div>
    </div>
  );
}
