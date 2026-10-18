import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { hubs, lanes, modeLabel, network, type Mode } from "../content";
import { NetworkMap } from "../components/NetworkMap";
import { hub } from "../lib/geo";

const ALL: Mode[] = ["road", "rail", "sea", "air"];

export default function Network() {
  const [modes, setModes] = useState<Mode[]>(ALL);
  const [selected, setSelected] = useState("RTM");
  const [query, setQuery] = useState("");
  const h = hub(selected);
  const hubLanes = lanes.filter(
    (l) => modes.includes(l.mode) && (l.from === selected || l.to === selected),
  );
  const rows = hubs.filter((x) =>
    `${x.city} ${x.code} ${x.country} ${x.kind}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  const toggle = (m: Mode) =>
    setModes((cur) =>
      cur.includes(m)
        ? cur.length > 1
          ? cur.filter((x) => x !== m)
          : cur
        : [...cur, m],
    );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{network.h1}</h1>
          <p className="lede">{network.lead}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap network-layout">
          <div className="network-map-col">
            <div className="toolbar">
              <div
                className="chips"
                role="group"
                aria-label="Show lanes by mode"
              >
                {ALL.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`chip chip-${m}`}
                    aria-pressed={modes.includes(m)}
                    onClick={() => toggle(m)}
                  >
                    <span className={`legend-swatch lane-${m}`} aria-hidden />{" "}
                    {modeLabel[m]}
                  </button>
                ))}
              </div>
              <p className="muted small">
                {lanes.filter((l) => modes.includes(l.mode)).length} lanes shown
              </p>
            </div>
            <NetworkMap
              modes={modes}
              selected={selected}
              onSelect={setSelected}
              label="Relay network map. Select a hub to see its details."
            />
          </div>

          <aside
            className="hub-panel"
            aria-live="polite"
            aria-label="Selected hub"
          >
            <p className="hub-code num">{h.code}</p>
            <h2>{h.city}</h2>
            <p className="muted">
              {h.kind} · {h.country}
            </p>
            <p>{h.note}</p>
            <dl className="spec-table compact">
              <div>
                <dt>Address</dt>
                <dd>{h.site}</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{h.hours}</dd>
              </div>
              <div>
                <dt>Same-day cut-off</dt>
                <dd className="num">{h.cutoff}</dd>
              </div>
              <div>
                <dt>Docks</dt>
                <dd className="num">{h.docks}</dd>
              </div>
              <div>
                <dt>Modes</dt>
                <dd>{h.modes.map((m) => modeLabel[m]).join(", ")}</dd>
              </div>
            </dl>
            <h3>Lanes from {h.city}</h3>
            {hubLanes.length ? (
              <ul className="lane-list">
                {hubLanes.map((l) => {
                  const other = l.from === selected ? l.to : l.from;
                  return (
                    <li key={l.mode + l.from + l.to}>
                      <span className={`mode-tag mode-${l.mode}`}>
                        {modeLabel[l.mode]}
                      </span>
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => setSelected(other)}
                      >
                        {hub(other).city}
                      </button>
                      <span className="muted small">{l.departures}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="muted">
                No lanes for the selected modes. Turn on another mode above.
              </p>
            )}
            <Link to="/quote" className="btn btn-primary">
              Quote from {h.city}
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="toolbar">
            <h2>All hubs</h2>
            <div className="field search-field">
              <label htmlFor="hub-search">Find a hub</label>
              <input
                id="hub-search"
                type="search"
                placeholder="City, code or country"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Hub</th>
                  <th scope="col">Type</th>
                  <th scope="col">Modes</th>
                  <th scope="col">Cut-off</th>
                  <th scope="col">Hours</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((x) => (
                  <tr
                    key={x.code}
                    aria-current={x.code === selected ? "true" : undefined}
                  >
                    <td className="num">{x.code}</td>
                    <th scope="row">
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => setSelected(x.code)}
                      >
                        {x.city}, {x.country}
                      </button>
                    </th>
                    <td>{x.kind}</td>
                    <td>{x.modes.map((m) => modeLabel[m]).join(" · ")}</td>
                    <td className="num">{x.cutoff}</td>
                    <td>{x.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!rows.length && (
            <p className="empty">
              No hub matches “{query}”. Try a city name like Lyon or a code like
              DUI.{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap band-grid">
          <figure className="band-photo">
            <img
              src={network.image}
              alt={network.imageAlt}
              width={1800}
              height={1269}
              loading="lazy"
            />
          </figure>
          <div className="band-copy">
            <h2>Cut-offs, plainly</h2>
            <p>
              Freight that is gated in before a hub’s cut-off leaves on that
              evening’s departure. Rail heads close the gate at the listed time;
              ports close two hours before sailing; air hubs accept until the
              screening cut-off.
            </p>
            <p>
              Bank holidays move cut-offs one working day earlier. The platform
              shows the next departure for every booking.
            </p>
            <Link to="/services" className="text-link">
              Services by mode <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
