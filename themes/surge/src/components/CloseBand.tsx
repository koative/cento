import { Link } from "../router";
import { home } from "../content";

/** The page close: one dark band, one ask. */
export function CloseBand({
  title = home.closeTitle,
  text = home.closeText,
  to = "/proposal",
}: {
  title?: string;
  text?: string;
  to?: string;
}) {
  return (
    <section className="close-band" aria-labelledby="close-title">
      <div className="wrap close-inner">
        <h2 id="close-title">{title}</h2>
        <div>
          <p>{text}</p>
          <div className="btn-row">
            <Link to={to} className="btn btn-lift btn-big">
              Request a proposal
            </Link>
            <Link to="/roi" className="btn btn-ghost-dark">
              Model your ROI first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
