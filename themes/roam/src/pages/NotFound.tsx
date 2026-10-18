import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="sign-404" aria-hidden="true">
        No exit
      </p>
      <h1>Wrong turn. This page isn't on the map.</h1>
      <p className="lede">
        The link may be old, or a car or station has moved. Turn around here:
      </p>
      <div className="station-actions">
        <Link to="/" className="btn btn-sign">
          Home <ArrowRight aria-hidden="true" />
        </Link>
        <Link to="/fleet" className="btn btn-outline">
          The fleet
        </Link>
        <Link to="/locations" className="btn btn-outline">
          Locations
        </Link>
      </div>
    </section>
  );
}
