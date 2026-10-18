import { Link } from "../router";
import { locations } from "../content";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <div className="sign">
        <h1>This door doesn't lead anywhere</h1>
        <p>
          The page may have moved, or the link had a typo. The front desk can
          point you somewhere useful.
        </p>
      </div>
      <ul className="nf-links">
        <li>
          <Link to="/">Back to the lobby</Link>
        </li>
        <li>
          <Link to="/rooms">Book a meeting room</Link>
        </li>
        {locations.map((l) => (
          <li key={l.id}>
            <Link to={`/locations/${l.id}`}>{l.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
