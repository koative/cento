import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand } from "../content";
import { tel } from "../lib/util";

/** The close every page ends on: one sentence, the enquiry, the phone. */
export function Closing({
  title = "Tell us what has happened.",
  to = "/enquiry",
}: {
  title?: string;
  to?: string;
}) {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="wrap closing-inner">
        <h2 id="closing-title">{title}</h2>
        <div>
          <p>
            A lawyer reads every enquiry, usually the same day. The first thirty
            minutes are free, and nothing is billed until you have signed an
            engagement letter.
          </p>
          <div className="actions">
            <Link to={to} className="btn btn-light">
              Make an enquiry <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a className="closing-phone" href={tel(brand.phone)}>
              {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
