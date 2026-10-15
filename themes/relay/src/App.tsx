import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  Download,
  LayoutDashboard,
  MapPin,
  Search,
  Truck,
  Route,
} from "lucide-react";
type Shipment = {
  id: string;
  customer: string;
  from: string;
  to: string;
  status: string;
  eta: string;
  carrier: string;
  weight: string;
  progress: number;
};
const shipments: Shipment[] = [
  {
    id: "RL-2048",
    customer: "Form & Field",
    from: "Rotterdam",
    to: "Berlin",
    status: "In transit",
    eta: "Today, 16:30",
    carrier: "Northline Freight",
    weight: "240 kg",
    progress: 64,
  },
  {
    id: "RL-2049",
    customer: "Morrow Goods",
    from: "Antwerp",
    to: "Paris",
    status: "Delivered",
    eta: "Today, 09:12",
    carrier: "Continental Cargo",
    weight: "180 kg",
    progress: 100,
  },
  {
    id: "RL-2050",
    customer: "Studio North",
    from: "Hamburg",
    to: "Copenhagen",
    status: "Attention",
    eta: "Tomorrow, 11:00",
    carrier: "Northline Freight",
    weight: "320 kg",
    progress: 42,
  },
  {
    id: "RL-2051",
    customer: "Common Ground",
    from: "Amsterdam",
    to: "Brussels",
    status: "In transit",
    eta: "Today, 17:45",
    carrier: "Lowlands Express",
    weight: "95 kg",
    progress: 77,
  },
  {
    id: "RL-2052",
    customer: "Oslo Objects",
    from: "Berlin",
    to: "Warsaw",
    status: "Scheduled",
    eta: "26 Oct, 10:00",
    carrier: "Eastbound Logistics",
    weight: "415 kg",
    progress: 0,
  },
  {
    id: "RL-2053",
    customer: "Sunday Supply",
    from: "Lyon",
    to: "Milan",
    status: "Delivered",
    eta: "Yesterday, 15:20",
    carrier: "Continental Cargo",
    weight: "160 kg",
    progress: 100,
  },
];
const statusClass = (s: string) => s.toLowerCase().replace(" ", "-");
export default function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All shipments");
  const [selected, setSelected] = useState("RL-2048");
  const [notice, setNotice] = useState("");
  const active = shipments.find((s) => s.id === selected)!;
  const visible = shipments.filter(
    (s) =>
      (filter === "All shipments" || filter === s.status) &&
      [s.id, s.customer, s.from, s.to]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const exportCSV = () => {
    const rows = [
      ["ID", "Customer", "Origin", "Destination", "Status", "ETA"],
      ...visible.map((s) => [s.id, s.customer, s.from, s.to, s.status, s.eta]),
    ];
    const data = rows
      .map((row) =>
        row.map((c) => '"' + c.replaceAll('"', '""') + '"').join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([data], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "relay-sample-shipments.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(`Exported ${visible.length} sample shipments.`);
  };
  return (
    <div className="app">
      <aside className="sidebar">
        <a className="logo" href="#overview">
          <span className="logo-icon">
            <Route size={22} />
          </span>
          relay<span className="logo-dot">.</span>
        </a>
        <div className="workspace">
          Acme operations<span>Demo workspace</span>
        </div>
        <nav aria-label="Workspace navigation">
          <a href="#overview" className="active">
            <LayoutDashboard size={18} />
            Overview
          </a>
          <a href="#shipments">
            <Box size={18} />
            Shipments<span>6</span>
          </a>
          <a href="#tracking">
            <Route size={18} />
            Route detail
          </a>
        </nav>
        <div className="sidebar-bottom">
          <span className="avatar">JD</span>
          <div>
            Jamie Davis<small>Operations manager</small>
          </div>
        </div>
        <a href="../../" className="back-link">
          Koative Templates <ArrowUpRight size={14} />
        </a>
      </aside>
      <div className="workspace-main">
        <header>
          <span>
            Workspace <ChevronRight size={13} /> Overview
          </span>
          <span className="demo-badge">Sample data</span>
        </header>
        <main id="overview">
          <div className="page-title">
            <div>
              <h1>Keep everything moving.</h1>
              <p>Your network at a glance. Monday, 26 October 2026.</p>
            </div>
            <button className="export" onClick={exportCSV}>
              <Download size={16} />
              Export shipments
            </button>
          </div>
          <p role="status" className="notice">
            {notice}
          </p>
          <section className="summary" aria-label="Shipment summary">
            {[
              {
                title: "Active shipments",
                number: "03",
                note: "Across 3 corridors",
                icon: Truck,
              },
              {
                title: "Delivered",
                number: "02",
                note: "In the sample period",
                icon: Check,
              },
              {
                title: "Needs attention",
                number: "01",
                note: "Hamburg → Copenhagen",
                icon: MapPin,
              },
            ].map((item, i) => (
              <div key={item.title}>
                <div>
                  <span>{item.title}</span>
                  <item.icon size={18} />
                </div>
                <strong>{item.number}</strong>
                <p className={i === 2 ? "attention-text" : ""}>{item.note}</p>
              </div>
            ))}
          </section>
          <section className="tracking-layout" id="tracking">
            <div className="network">
              <div className="panel-heading">
                <h2>Network view</h2>
                <span>Route schematic · Europe</span>
              </div>
              <svg
                className="network-map"
                viewBox="0 0 640 330"
                role="img"
                aria-label={`Schematic route from ${active.from} to ${active.to}. Illustrative geometry, not a geographic map.`}
              >
                <defs>
                  <pattern
                    id="dots"
                    width="25"
                    height="25"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1" fill="#d6dee8" />
                  </pattern>
                </defs>
                <rect width="640" height="330" fill="url(#dots)" />
                <g fill="none" stroke="#bccbdc" strokeWidth="2">
                  <path d="M100 250L160 160 285 100 380 185 540 220M160 160L250 250 380 185 440 65M285 100L440 65M250 250L100 250" />
                </g>
                <path
                  className="active-route"
                  d="M160 160C220 145 295 160 380 185"
                  fill="none"
                  stroke="#255bd8"
                  strokeWidth="4"
                />
                <g fill="#fff" stroke="#879cb5" strokeWidth="2">
                  {[
                    [100, 250],
                    [160, 160],
                    [285, 100],
                    [380, 185],
                    [540, 220],
                    [250, 250],
                    [440, 65],
                  ].map(([x, y]) => (
                    <circle key={x} cx={x} cy={y} r="6" />
                  ))}
                </g>
                <circle cx="160" cy="160" r="8" fill="#255bd8" />
                <circle cx="380" cy="185" r="8" fill="#255bd8" />
                <g className="map-labels">
                  <text x="160" y="138" textAnchor="middle">
                    {active.from}
                  </text>
                  <text x="380" y="215" textAnchor="middle">
                    {active.to}
                  </text>
                  <text x="285" y="80" textAnchor="middle">
                    North hub
                  </text>
                  <text x="440" y="45" textAnchor="middle">
                    Baltic hub
                  </text>
                  <text x="100" y="278" textAnchor="middle">
                    West hub
                  </text>
                  <text x="540" y="246" textAnchor="middle">
                    East hub
                  </text>
                </g>
                <g
                  transform={`translate(${160 + active.progress * 2.2},${160 + active.progress * 0.25})`}
                >
                  <rect
                    x="-17"
                    y="-16"
                    width="34"
                    height="30"
                    rx="7"
                    fill="#ffad74"
                  />
                  <path
                    d="M-7-5H3V5H-7ZM3-1H8L10 3V5H3M-4 5V8M7 5V8"
                    fill="none"
                    stroke="#632c0c"
                    strokeWidth="1.8"
                  />
                </g>
              </svg>
              <div className="network-footer">
                <span>
                  <i />
                  Selected route
                </span>
                <span>Illustrative network · Not live tracking</span>
              </div>
            </div>
            <article className="tracking-detail" aria-label="Selected shipment">
              <div className="panel-heading">
                <h2>{active.id}</h2>
                <span className={"badge " + statusClass(active.status)}>
                  {active.status}
                </span>
              </div>
              <div className="route-name">
                <strong>{active.from}</strong>
                <ArrowRight size={20} />
                <strong>{active.to}</strong>
              </div>
              <p className="customer">
                {active.customer} · {active.weight}
              </p>
              <div
                className="progress"
                aria-label={`Sample route progress ${active.progress}%`}
              >
                <span style={{ width: active.progress + "%" }} />
              </div>
              <div className="eta">
                <span>
                  {active.status === "Delivered"
                    ? "Delivered"
                    : "Estimated arrival"}
                </span>
                <strong>{active.eta}</strong>
              </div>
              <ol className="timeline">
                <li className="done">
                  <span />
                  <div>
                    <strong>Shipment created</strong>
                    <small>{active.carrier}</small>
                  </div>
                </li>
                <li className={active.progress > 0 ? "done" : ""}>
                  <span />
                  <div>
                    <strong>
                      {active.status === "Attention"
                        ? "Transfer needs review"
                        : "Collected at origin"}
                    </strong>
                    <small>
                      {active.status === "Attention"
                        ? "Sample exception: delayed transfer"
                        : active.from + " distribution center"}
                    </small>
                  </div>
                </li>
                <li className={active.status === "Delivered" ? "done" : ""}>
                  <span />
                  <div>
                    <strong>
                      {active.status === "Delivered"
                        ? "Delivery complete"
                        : "Destination handoff"}
                    </strong>
                    <small>{active.to + " receiving team"}</small>
                  </div>
                </li>
              </ol>
            </article>
          </section>
          <section id="shipments" className="shipment-panel">
            <div className="panel-heading">
              <h2>
                Shipments <span className="count">{visible.length}</span>
              </h2>
              <label className="search">
                <Search size={16} />
                <input
                  aria-label="Search shipments"
                  placeholder="Search ID, customer, city…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="filters" role="group" aria-label="Shipment status">
              {[
                "All shipments",
                "In transit",
                "Delivered",
                "Attention",
                "Scheduled",
              ].map((s) => (
                <button
                  key={s}
                  aria-pressed={filter === s}
                  onClick={() => setFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Shipment</th>
                    <th scope="col">Route</th>
                    <th scope="col">Status</th>
                    <th scope="col">Expected arrival</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((s) => (
                    <tr
                      key={s.id}
                      className={selected === s.id ? "selected" : ""}
                    >
                      <td>
                        <strong>{s.id}</strong>
                        <small>{s.customer}</small>
                      </td>
                      <td>
                        {s.from}
                        <ArrowRight size={12} />
                        {s.to}
                      </td>
                      <td>
                        <span className={"badge " + statusClass(s.status)}>
                          {s.status}
                        </span>
                      </td>
                      <td>{s.eta}</td>
                      <td>
                        <button
                          aria-label={"Track " + s.id}
                          onClick={() => {
                            setSelected(s.id);
                            document
                              .getElementById("tracking")
                              ?.scrollIntoView({ block: "start" });
                          }}
                        >
                          Track <ArrowUpRight size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!visible.length && (
              <div className="empty">
                <Box size={30} />
                <h3>No matching shipments</h3>
                <p>Try a different ID, city, customer, or status.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("All shipments");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
            <div className="table-bottom">
              <span>
                {visible.length} of {shipments.length} sample shipments
              </span>
              <span>All times are illustrative local times</span>
            </div>
          </section>
        </main>
        <footer>
          <span>Relay · A fictional logistics workspace</span>
          <span>No live tracking or external account connections.</span>
        </footer>
      </div>
    </div>
  );
}
