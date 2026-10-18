import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand } from "../content";

export function NotFound() {
  return (
    <section
      className="wrap not-found"
      data-not-found
      aria-labelledby="nf-title"
    >
      <p className="plate nf-plate" aria-hidden="true">
        Road closed
      </p>
      <h1 id="nf-title">This page has moved or never existed</h1>
      <p>
        The address may be out of date. Start from the services list, or ask the
        service desk on {brand.phone}.
      </p>
      <div className="row">
        <Link to="/services" className="btn btn-citron">
          Browse services <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-outline">
          Home
        </Link>
      </div>
    </section>
  );
}
