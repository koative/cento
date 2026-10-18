import { useState } from "react";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { Link } from "../router";
import { matches, players, type Crosshair, type Player } from "../content";
import { byDate, divisionOf } from "../lib/format";
import { MatchRow } from "../components/MatchRow";
import { PlayerCard } from "../components/PlayerCard";

/** Shareable code in the order length · gap · thickness · dot · colour, the way players paste it in chat. */
const crosshairCode = (c: Crosshair) =>
  `CLT-X ${c.length}·${c.gap}·${c.thickness}·${c.dot ? 1 : 0}·${c.color.slice(1).toUpperCase()}`;

export function PlayerPage({ player }: { player: Player }) {
  const division = divisionOf(player.division);
  const played = matches
    .filter((m) => m.lineup.includes(player.id))
    .sort(byDate)
    .reverse()
    .slice(0, 5);
  const mates = players.filter(
    (p) => p.division === player.division && p.id !== player.id,
  );

  return (
    <>
      <header className="player-hero">
        <div className="wrap player-hero-grid">
          <span className="player-no num" aria-hidden="true">
            {String(player.number).padStart(2, "0")}
          </span>
          <div className="player-id">
            <Link to="/teams" className="text-link back">
              <ArrowLeft aria-hidden="true" /> {division.game} roster
            </Link>
            <h1>{player.handle}</h1>
            <p className="player-name">
              {player.name} · {player.role}
            </p>
            <dl className="player-facts">
              <div>
                <dt>Country</dt>
                <dd>
                  {player.country}{" "}
                  <span className="pc-cc">{player.countryCode}</span>
                </dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd className="num">{player.age}</dd>
              </div>
              <div>
                <dt>Joined</dt>
                <dd>{player.joined}</dd>
              </div>
              <div>
                <dt>Division</dt>
                <dd>{division.game}</dd>
              </div>
            </dl>
          </div>
          <blockquote className="player-quote">
            <p>“{player.quote}”</p>
          </blockquote>
        </div>
      </header>

      <section className="wrap section stat-board" aria-labelledby="stats-h">
        <h2 id="stats-h">This season</h2>
        <dl className="stats">
          {player.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd className="num">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="wrap player-body">
        <section className="prose" aria-labelledby="bio-h">
          <h2 id="bio-h">About {player.handle}</h2>
          {player.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h3>Career</h3>
          <ol className="career">
            {player.career.map((c) => (
              <li key={c.years}>
                <span className="num">{c.years}</span>
                <strong>{c.team}</strong>
                <span>{c.note}</span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="player-side" aria-label={`${player.handle}'s setup`}>
          <h2>{division.poolLabel}</h2>
          <ul className="pool">
            {player.pool.map((p, i) => (
              <li key={p}>
                <span className="num">{i + 1}</span> {p}
              </li>
            ))}
          </ul>
          <h2>Setup</h2>
          <dl className="setup">
            {player.setup.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          {player.crosshair && (
            <CrosshairPanel
              crosshair={player.crosshair}
              handle={player.handle}
            />
          )}
        </aside>
      </div>

      {played.length > 0 && (
        <section className="wrap section" aria-labelledby="matches-h">
          <h2 id="matches-h">Recent and upcoming matches</h2>
          <ul className="match-list">
            {played.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </ul>
        </section>
      )}

      <section className="wrap section" aria-labelledby="mates-h">
        <h2 id="mates-h">{division.game} teammates</h2>
        <ul className="player-grid">
          {mates.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </ul>
      </section>
    </>
  );
}

function CrosshairPanel({
  crosshair: c,
  handle,
}: {
  crosshair: Crosshair;
  handle: string;
}) {
  const [copied, setCopied] = useState(false);
  const code = crosshairCode(c);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code stays visible and selectable */
    }
  };
  // Arms drawn from the centre of a 64-unit box, scaled ×3 so a 1px game setting stays visible.
  const s = 3;
  const arms = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ].map(([x, y]) => {
    const from = c.gap * s;
    const to = (c.gap + c.length) * s;
    return (
      <line
        key={`${x}${y}`}
        x1={32 + x * from}
        y1={32 + y * from}
        x2={32 + x * to}
        y2={32 + y * to}
      />
    );
  });

  return (
    <div className="crosshair">
      <h2>Crosshair</h2>
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label={`${handle}'s crosshair preview`}
      >
        <g stroke={c.color} strokeWidth={c.thickness * 1.5}>
          {arms}
        </g>
        {c.dot && <rect x={31} y={31} width={2} height={2} fill={c.color} />}
      </svg>
      <code>{code}</code>
      <button type="button" className="btn btn-ghost" onClick={copy}>
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {copied ? "Copied" : "Copy code"}
      </button>
      <p className="sr-only" aria-live="polite">
        {copied ? "Crosshair code copied" : ""}
      </p>
    </div>
  );
}
