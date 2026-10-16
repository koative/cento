import { useState } from "react";
import { ArrowUpRight, TrainFront, ArrowRight, Check } from "lucide-react";
const runs = [
  {
    id: "BL 204",
    from: "Rotterdam",
    to: "Duisburg",
    cargo: "Intermodal",
    wagons: 24,
    slot: "08:40",
    km: 224,
  },
  {
    id: "BL 318",
    from: "Antwerp",
    to: "Cologne",
    cargo: "Steel coils",
    wagons: 18,
    slot: "09:15",
    km: 218,
  },
  {
    id: "BL 406",
    from: "Hamburg",
    to: "Prague",
    cargo: "Timber",
    wagons: 32,
    slot: "10:20",
    km: 642,
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [released, setReleased] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const r = runs[active];
  return (
    <>
      <a className="skip" href="#main">
        Skip to dispatch
      </a>
      <header>
        <a className="brand" href="#">
          <TrainFront />
          ballast
        </a>
        <nav>
          <a href="#main">Dispatch</a>
          <a href="#manifest">Manifest</a>
          <span className="shift">Shift A · 07:00–15:00</span>
        </nav>
      </header>
      <div className="workspace">
        <aside>
          <strong>North network</strong>
          <p>Operations / dispatch</p>
          <div className="rail-mark">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span>
            Wednesday
            <br />
            14 October 2026
          </span>
          <div className="aside-foot">
            Demonstration network
            <br />
            All movements are simulated.
          </div>
        </aside>
        <main id="main">
          <div className="title">
            <div>
              <h1>
                Keep good
                <br />
                things moving.
              </h1>
              <p>Your departure board, without the noise.</p>
            </div>
            <span className="live">Network simulation</span>
          </div>
          <div className="dispatch">
            <section className="board">
              <div className="section-head">
                <h2>Departure board</h2>
                <span>3 scheduled</span>
              </div>
              <label className="search">
                Find a train or terminal
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the board"
                />
              </label>
              <div className="board-head">
                <span>Service / route</span>
                <span>Departs</span>
              </div>
              {runs
                .filter((x) =>
                  `${x.id} ${x.from} ${x.to}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((x) => (
                  <button
                    className={"train " + (r.id === x.id ? "selected" : "")}
                    key={x.id}
                    onClick={() => setActive(runs.indexOf(x))}
                  >
                    <span>
                      <b>{x.id}</b>
                      <strong>
                        {x.from} <ArrowRight /> {x.to}
                      </strong>
                      <small>
                        {x.cargo} · {x.wagons} wagons
                      </small>
                    </span>
                    <span className="time">
                      {x.slot}
                      <small>
                        {released.includes(x.id)
                          ? "Released"
                          : "Awaiting release"}
                      </small>
                    </span>
                  </button>
                ))}
              {!runs.some((x) =>
                `${x.id} ${x.from} ${x.to}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ) && (
                <p className="empty">No trains found. Try a terminal name.</p>
              )}
            </section>
            <section className="route">
              <div className="section-head">
                <h2>{r.id} / route</h2>
                <ArrowUpRight />
              </div>
              <div className="track">
                <span>
                  {r.from}
                  <small>Origin terminal</small>
                </span>
                <div className="track-line">
                  <i />
                  <i />
                  <i className="moving" />
                </div>
                <span>
                  {r.to}
                  <small>Arrival terminal</small>
                </span>
              </div>
              <div className="route-meta">
                <div>
                  <strong>{r.km}</strong>
                  <small>route kilometres</small>
                </div>
                <div>
                  <strong>{r.wagons}</strong>
                  <small>loaded wagons</small>
                </div>
              </div>
              <div className="release">
                <p>
                  <Check /> Brake test recorded
                </p>
                <p>
                  <Check /> Consist verified
                </p>
                <button
                  className="primary"
                  disabled={released.includes(r.id)}
                  onClick={() => setReleased([...released, r.id])}
                >
                  {released.includes(r.id)
                    ? "Departure released"
                    : "Release departure"}
                  <ArrowRight />
                </button>
                <p className="status" role="status">
                  {released.includes(r.id)
                    ? `${r.id} cleared in this demo. No real train has been dispatched.`
                    : "Review the manifest before releasing."}
                </p>
              </div>
            </section>
          </div>
          <section id="manifest" className="manifest">
            <div>
              <h2>
                A clear line
                <br />
                from yard to yard.
              </h2>
              <p>
                Every movement has a manifest. Every handover has an owner. Keep
                the important details on one page.
              </p>
            </div>
            <dl>
              <div>
                <dt>Selected service</dt>
                <dd>{r.id}</dd>
              </div>
              <div>
                <dt>Load type</dt>
                <dd>{r.cargo}</dd>
              </div>
              <div>
                <dt>Traction</dt>
                <dd>Electric · Class 193</dd>
              </div>
              <div>
                <dt>Dispatch desk</dt>
                <dd>North corridor</dd>
              </div>
              <div>
                <dt>Release state</dt>
                <dd>
                  {released.includes(r.id) ? "Cleared" : "Pending review"}
                </dd>
              </div>
            </dl>
          </section>
        </main>
      </div>
      <footer>
        <span>Ballast / fictional rail operations template</span>
        <span>Keep the network in view.</span>
      </footer>
    </>
  );
}
