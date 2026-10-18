import { Link } from "../router";
import { games } from "../content";
import { Scene } from "../components/Scene";

export function NotFound() {
  return (
    <div className="page wrap not-found" data-not-found>
      <div className="screen not-found-art">
        <Scene
          game={games.find((g) => g.slug === "orbital-delivery")!}
          seed={404}
        />
      </div>
      <div>
        <h1>Lost in the Brim</h1>
        <p className="lede">
          This page drifted out of orbit, or never had an address to begin with.
          Pim checked twice. The rest of the site is right where we left it.
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Back to the start
          </Link>
          <Link to="/games" className="btn btn-ghost">
            Browse the games
          </Link>
        </div>
      </div>
    </div>
  );
}
