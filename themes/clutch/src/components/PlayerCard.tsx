import { Link } from "../router";
import type { Player } from "../content";

/** Broadcast-style player plate: jersey number, handle, role and flag code. */
export function PlayerCard({ player }: { player: Player }) {
  return (
    <li className="player-card">
      <Link to={`/players/${player.id}`}>
        <span className="pc-number num" aria-hidden="true">
          {String(player.number).padStart(2, "0")}
        </span>
        <span className="pc-handle">{player.handle}</span>
        <span className="pc-name">{player.name}</span>
        <span className="pc-meta">
          <span>{player.role}</span>
          <span className="pc-cc">{player.countryCode}</span>
        </span>
      </Link>
    </li>
  );
}
