import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { notFound } from "../content";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>{notFound.title}</h1>
      <p className="lead">{notFound.text}</p>
      <div className="actions">
        <Link to="/shop" className="btn">
          Shop the floor <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the front door
        </Link>
      </div>
    </div>
  );
}
