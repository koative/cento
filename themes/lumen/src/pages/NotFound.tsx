import { Link } from "../router";

const chart = ["E", "F P", "T O Z", "L P E D"];

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <p className="snellen" aria-hidden="true">
        {chart.map((row, i) => (
          <span key={row} className={`chart-line l${i}`}>
            {row}
          </span>
        ))}
      </p>
      <h1>We can't see that page</h1>
      <p className="lede">
        The link may be old, or the frame may have been retired. Everything we
        make is one click away.
      </p>
      <div className="actions">
        <Link to="/frames" className="btn">
          Shop frames
        </Link>
        <Link to="/" className="btn btn-quiet">
          Back to the home page
        </Link>
      </div>
    </div>
  );
}
