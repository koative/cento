import { Link } from "../router";
import { games } from "../content";
import { formatDate, money, useRuns } from "../lib/util";
import { BlobHop } from "../components/BlobHop";
import { PairUp } from "../components/PairUp";

const CONTROLS: [string, string][] = [
  ["Space, Up or W", "Hop. Hold for a higher, floatier hop."],
  ["Tap or click the screen", "Same as Space, for touch and mouse."],
  ["P or Escape", "Pause and carry on."],
  ["Assist mode", "Runs the whole valley at 70% speed. Scores still count."],
];

export function Play() {
  const runs = useRuns();
  const blob = games.find((g) => g.slug === "blob-hop")!;

  return (
    <>
      <section className="cabinet cabinet-page">
        <div className="wrap">
          <header className="play-head">
            <h1>Play Blob Hop</h1>
            <p>
              The real first region of {blob.name}: same physics, same thistles,
              same bees. Hop as far as you can and pick up berries on the way.
              Your best runs are saved on this device only.
            </p>
          </header>
          <BlobHop />
        </div>
      </section>

      <section className="wrap play-info">
        <div>
          <h2>How to play</h2>
          <dl className="spec-table">
            {CONTROLS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="small">
            Distance scores a point every eight pixels. Each berry is worth 25.
            Bees arrive after the first big hill.
          </p>
        </div>
        <div>
          <h2>Your top runs</h2>
          {runs.length ? (
            <table className="runs">
              <caption className="sr-only">
                Your best Blob Hop runs on this device
              </caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Score</th>
                  <th scope="col">Berries</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r, i) => (
                  <tr key={r.at}>
                    <td className="num">{i + 1}</td>
                    <td className="num">{r.score}</td>
                    <td className="num">{r.berries}</td>
                    <td>{formatDate(r.at.slice(0, 10))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty">
              No runs yet. Your first one will show up here the moment Blob
              meets a thistle.
            </p>
          )}
          <p className="small">
            Liked it? The full game has eight more regions and couch co-op.{" "}
            <Link to={`/games/${blob.slug}`}>
              {blob.name}, {money(blob.price!)}
            </Link>
          </p>
        </div>
      </section>

      <section className="wrap play-second" aria-labelledby="pairup-title">
        <div className="section-head">
          <h2 id="pairup-title">Also playable: Pair Up!</h2>
          <p>
            Our first game, from 2020. Six pairs, twelve cards, one minute. The
            faces are characters from the rest of the shelf.
          </p>
        </div>
        <PairUp />
      </section>
    </>
  );
}
