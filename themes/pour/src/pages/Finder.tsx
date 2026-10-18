import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { finder, wines } from "../content";
import { TasteFinder } from "../components/TasteFinder";

export function Finder() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Taste finder</h1>
        <p className="lead">
          Every bottle on our shelf, plotted by how it actually tastes. Put the
          glass where your palate lives and we will hand you the three nearest
          bottles. It is the same map we draw on a napkin at the counter.
        </p>
      </header>

      <TasteFinder start={{ body: 3, wild: 4 }} />

      <section className="section glossary">
        <h2>Reading the map</h2>
        <dl>
          {finder.glossary.map((g) => (
            <div key={g.term}>
              <dt>{g.term}</dt>
              <dd>{g.text}</dd>
            </div>
          ))}
        </dl>
        <p>
          <Link to="/wines" className="text-link">
            Browse all {wines.length} wines instead{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </section>
    </div>
  );
}
