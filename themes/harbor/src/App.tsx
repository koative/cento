import { useState } from "react";
import {
  Anchor,
  Search,
  ArrowUpRight,
  ChevronRight,
  Ship,
  Wind,
  Check,
  Download,
  MapPin,
} from "lucide-react";
const vessels = [
  {
    id: "HB-204",
    name: "Northern Light",
    flag: "NO",
    berth: "B-03",
    eta: "08:40",
    status: "Alongside",
    cargo: "Container",
    length: 284,
    route: "Rotterdam → Bergen",
    progress: 68,
  },
  {
    id: "HB-118",
    name: "Pacific Meridian",
    flag: "SG",
    berth: "A-01",
    eta: "10:15",
    status: "Inbound",
    cargo: "Container",
    length: 312,
    route: "Singapore → Bergen",
    progress: 24,
  },
  {
    id: "HB-316",
    name: "Baltic Runner",
    flag: "DK",
    berth: "C-02",
    eta: "11:30",
    status: "Scheduled",
    cargo: "Ro-Ro",
    length: 186,
    route: "Aarhus → Bergen",
    progress: 0,
  },
  {
    id: "HB-092",
    name: "Atlantic Sol",
    flag: "PT",
    berth: "B-01",
    eta: "07:20",
    status: "Alongside",
    cargo: "Bulk",
    length: 220,
    route: "Lisbon → Bergen",
    progress: 91,
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All vessels");
  const [checked, setChecked] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const v = vessels[active];
  const list = vessels.filter(
    (v) =>
      (filter === "All vessels" || v.status === filter) &&
      `${v.name} ${v.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  function exportManifest() {
    const rows = [
      "Vessel,Reference,Berth,Status",
      ...list.map((v) => `${v.name},${v.id},${v.berth},${v.status}`),
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    a.download = "harbor-demo-manifest.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    setNotice(`${list.length} vessels exported to a local CSV.`);
  }
  return (
    <>
      <a href="#operations" className="skip">
        Skip to port operations
      </a>
      <div className="port-shell">
        <header className="port-header">
          <a className="brand" href="#">
            <Anchor />
            HARBOR
          </a>
          <nav>
            <a href="#operations">Port overview</a>
            <a href="#vessels">Vessel movements</a>
          </nav>
          <span>
            <span className="live-dot" /> Simulation mode
          </span>
        </header>
        <main>
          <section className="port-title">
            <div>
              <h1>
                A clear view.
                <br />A moving port.
              </h1>
              <p>Bergen concept terminal · Thursday, 16 October</p>
            </div>
            <div className="conditions">
              <Wind />
              <span>
                <strong>12 kn / NW</strong>Illustrative conditions
              </span>
              <span className="tide">
                <strong>+1.4 m</strong>High water 12:20
              </span>
            </div>
          </section>
          <section id="operations" className="operations">
            <div className="port-map">
              <div className="map-top">
                <span>
                  <MapPin size={13} /> Terminal overview
                </span>
                <span>60°23′N 005°19′E</span>
              </div>
              <svg
                className="harbor-map"
                viewBox="0 0 700 450"
                role="img"
                aria-label="Diagrammatic terminal map with three piers and selected vessel"
              >
                <defs>
                  <pattern
                    id="water"
                    width="35"
                    height="35"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M0 17h35" stroke="#367b8730" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="700" height="450" fill="url(#water)" />
                <path
                  d="M0 0H700V80H570V220H510V80H360V280H300V80H150V190H90V80H0Z"
                  fill="#b9c6b7"
                  stroke="#829c89"
                />
                <path d="M30 35H670" stroke="#eff0d9" strokeWidth="8" />
                {[100, 310, 520].map((x, i) => (
                  <g key={x}>
                    <text x={x + 10} y="65" fontSize="11" fill="#365349">
                      {String.fromCharCode(65 + i)}
                    </text>
                    {[0, 1, 2, 3].map((j) => (
                      <rect
                        key={j}
                        x={x - 1}
                        y={95 + j * 23}
                        width="30"
                        height="12"
                        rx="1"
                        fill={j % 2 ? "#9f7763" : "#6c8b81"}
                      />
                    ))}
                  </g>
                ))}
                <path
                  d="M580 420Q400 390 405 260T340 180"
                  fill="none"
                  stroke="#cfac66"
                  strokeWidth="2"
                  strokeDasharray="6 7"
                  className="shipping-route"
                />
                {vessels.map((ship, i) => {
                  const x = [375, 195, 575, 260][i],
                    y = [170, 330, 245, 150][i];
                  return (
                    <g
                      key={ship.id}
                      transform={`translate(${x},${y})`}
                      onClick={() => setActive(i)}
                      className={
                        i === active ? "map-ship selected" : "map-ship"
                      }
                    >
                      <rect
                        x="-18"
                        y="-40"
                        width="36"
                        height="80"
                        rx="15"
                        fill={i === active ? "#e1b669" : "#e5e7d5"}
                        stroke="#365c63"
                      />
                      <path
                        d="M-10 -20H10V25H-10Z"
                        fill={i === active ? "#b98540" : "#9cb3b0"}
                      />
                      <text
                        x="0"
                        y="57"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#d4e3db"
                      >
                        {ship.id}
                      </text>
                    </g>
                  );
                })}
                <text x="40" y="410" fontSize="10" fill="#9fc6c9">
                  FICTIONAL GEOMETRY / NOT FOR NAVIGATION
                </text>
              </svg>
              <div className="map-legend">
                <span>
                  <i />
                  Alongside
                </span>
                <span>
                  <i />
                  Selected vessel
                </span>
                <span>Terminal map · schematic</span>
              </div>
            </div>
            <aside className="vessel-detail">
              <div className="detail-top">
                <Ship />
                <span>VESSEL DETAIL</span>
                <span className={"status-tag " + v.status.toLowerCase()}>
                  {v.status}
                </span>
              </div>
              <h2>{v.name}</h2>
              <p>
                {v.id} · {v.flag} registry · {v.cargo}
              </p>
              <div className="route-label">{v.route}</div>
              <dl>
                <div>
                  <dt>Assigned berth</dt>
                  <dd>{v.berth}</dd>
                </div>
                <div>
                  <dt>Arrival window</dt>
                  <dd>{v.eta}</dd>
                </div>
                <div>
                  <dt>Length overall</dt>
                  <dd>{v.length} m</dd>
                </div>
              </dl>
              <div className="cargo-progress">
                <span>
                  Cargo operation <strong>{v.progress}%</strong>
                </span>
                <div>
                  <i style={{ width: v.progress + "%" }} />
                </div>
                <small>Simulated handling progress</small>
              </div>
              <button
                className="btn"
                onClick={() =>
                  setChecked(
                    checked.includes(v.id)
                      ? checked.filter((x) => x !== v.id)
                      : [...checked, v.id],
                  )
                }
              >
                {checked.includes(v.id)
                  ? "Handover acknowledged"
                  : "Acknowledge handover"}
                <Check />
              </button>
              <p role="status" className="handover-status">
                {checked.includes(v.id)
                  ? `${v.name}: handover acknowledged locally.`
                  : "No operational instruction is sent."}
              </p>
            </aside>
          </section>
          <section id="vessels" className="movements">
            <div className="movements-head">
              <h2>Vessel movements</h2>
              <button onClick={exportManifest}>
                <Download />
                Export manifest
              </button>
            </div>
            <div className="table-tools">
              <div className="tabs">
                {["All vessels", "Alongside", "Inbound", "Scheduled"].map(
                  (x) => (
                    <button
                      key={x}
                      aria-pressed={filter === x}
                      onClick={() => setFilter(x)}
                    >
                      {x}
                    </button>
                  ),
                )}
              </div>
              <label>
                <Search size={14} />
                <input
                  aria-label="Search vessels"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a vessel…"
                />
              </label>
            </div>
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Scrollable vessel movements"
            >
              <table>
                <thead>
                  <tr>
                    <th>Vessel</th>
                    <th>Reference</th>
                    <th>Berth</th>
                    <th>ETA</th>
                    <th>Status</th>
                    <th>
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((v) => (
                    <tr
                      key={v.id}
                      className={
                        vessels.indexOf(v) === active ? "selected" : ""
                      }
                    >
                      <td>
                        <button onClick={() => setActive(vessels.indexOf(v))}>
                          {v.name}
                        </button>
                      </td>
                      <td>{v.id}</td>
                      <td>{v.berth}</td>
                      <td>{v.eta}</td>
                      <td>
                        <span
                          className={"status-tag " + v.status.toLowerCase()}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td>
                        <button
                          aria-label={"View " + v.name}
                          onClick={() => setActive(vessels.indexOf(v))}
                        >
                          <ChevronRight />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!list.length && (
              <p className="empty" role="status">
                No vessels match your search. Clear the search or choose another
                status.
              </p>
            )}
            <p className="export-status" role="status">
              {notice}
            </p>
          </section>
        </main>
        <footer className="port-footer">
          <span>
            <Anchor size={14} /> HARBOR / Koative
          </span>
          <span>
            Fictional port operations. Synthetic vessel data. Not for
            navigation.
          </span>
          <a href="#operations">
            Back to overview <ArrowUpRight size={12} />
          </a>
        </footer>
      </div>
    </>
  );
}
