import { useMemo, useState } from "react";
import {
  Activity,
  LayoutDashboard,
  BarChart3,
  Users,
  MousePointer2,
  Globe,
  Settings2,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  X,
  Check,
  Radio,
  CalendarDays,
  SlidersHorizontal,
} from "lucide-react";
const rows = [
  {
    path: "/",
    name: "Homepage",
    visitors: 12489,
    views: 18432,
    bounce: 32.4,
    time: "2m 48s",
  },
  {
    path: "/journal/designing-for-the-long-run",
    name: "Designing for the long run",
    visitors: 6872,
    views: 8106,
    bounce: 24.8,
    time: "4m 12s",
  },
  {
    path: "/work",
    name: "Selected work",
    visitors: 4210,
    views: 5842,
    bounce: 28.6,
    time: "3m 06s",
  },
  {
    path: "/about",
    name: "About the studio",
    visitors: 2841,
    views: 3127,
    bounce: 41.2,
    time: "1m 34s",
  },
  {
    path: "/contact",
    name: "Get in touch",
    visitors: 1456,
    views: 1836,
    bounce: 18.9,
    time: "1m 12s",
  },
];
const series = {
  "7 days": [
    20, 32, 25, 48, 45, 69, 57, 87, 77, 110, 94, 120, 113, 146, 135, 169, 155,
    178, 164, 205, 183, 215, 200, 236, 218, 249, 231, 266,
  ],
  "30 days": [
    25, 15, 29, 35, 28, 57, 45, 74, 66, 93, 90, 85, 105, 79, 121, 115, 148, 117,
    150, 138, 172, 156, 196, 181, 211, 196, 224, 240,
  ],
  "90 days": [
    15, 23, 20, 40, 36, 50, 70, 52, 78, 65, 84, 105, 95, 110, 126, 119, 138,
    160, 145, 172, 165, 180, 203, 192, 208, 230, 222, 259,
  ],
};
export default function App() {
  const [range, setRange] = useState<keyof typeof series>("30 days"),
    [query, setQuery] = useState(""),
    [metric, setMetric] = useState("Visitors"),
    [active, setActive] = useState("Overview"),
    [compare, setCompare] = useState(true),
    [notice, setNotice] = useState(""),
    [site, setSite] = useState("northstar.studio");
  const factor = range === "7 days" ? 0.28 : range === "90 days" ? 2.7 : 1;
  const data = useMemo(
    () =>
      rows.filter((x) =>
        (x.name + x.path).toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  const chartValues = series[range].map((v, i) =>
    metric === "Bounce rate"
      ? 96 - v * 0.2 + Math.sin(i * 1.7) * 13
      : metric === "Visit duration"
        ? v * 0.55 + Math.cos(i * 0.9) * 18
        : metric === "Page views"
          ? v * 0.75
          : v * 0.67,
  );
  const points = chartValues
    .map((v, i) => `${i * (760 / 27)},${245 - v}`)
    .join(" ");
  const axisLabels =
    range === "7 days"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : range === "90 days"
        ? ["Jul 1", "Jul 15", "Aug 1", "Aug 15", "Sep 1", "Sep 15", "Sep 30"]
        : ["Sep 1", "Sep 5", "Sep 10", "Sep 15", "Sep 20", "Sep 25", "Sep 30"];
  function exportCSV() {
    const csv =
      "Page,Visitors,Page views,Bounce rate,Avg time\n" +
      data
        .map(
          (r) =>
            `"${r.path}",${Math.round(r.visitors * factor)},${Math.round(r.views * factor)},${r.bounce}%,${r.time}`,
        )
        .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `signal-pages-${range.replace(" ", "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Your page report has been exported.");
  }
  return (
    <div className="signal-app">
      <aside>
        <a className="brand" href="#overview">
          <Radio size={25} />
          signal<span>analytics</span>
        </a>
        <label className="site-selector">
          <span className="site-icon">n</span>
          <select
            value={site}
            onChange={(e) => {
              setSite(e.target.value);
              setNotice("Switched demo workspace. Metrics are illustrative.");
            }}
            aria-label="Select website"
          >
            <option>northstar.studio</option>
            <option>journal.example</option>
          </select>
        </label>
        <div className="nav-heading">Workspace</div>
        <nav aria-label="Workspace navigation">
          {[
            { name: "Overview", icon: LayoutDashboard },
            { name: "Realtime", icon: Activity },
            { name: "Audience", icon: Users },
            { name: "Acquisition", icon: Globe },
            { name: "Behavior", icon: MousePointer2 },
          ].map(({ name, icon: Icon }) => (
            <button
              className={active === name ? "selected" : ""}
              key={name}
              onClick={() => {
                setActive(name);
                document
                  .getElementById(
                    name === "Overview"
                      ? "overview"
                      : name === "Realtime"
                        ? "traffic"
                        : name === "Audience"
                          ? "audience"
                          : name === "Acquisition"
                            ? "acquisition"
                            : "pages",
                  )
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <Icon size={17} />
              {name}
              {name === "Realtime" && <i />}
            </button>
          ))}
        </nav>
        <div className="nav-heading reports-heading">Saved reports</div>
        <button
          className="report-link"
          onClick={() => {
            setRange("30 days");
            setMetric("Visitors");
            setNotice("Monthly traffic report loaded.");
          }}
        >
          <BarChart3 size={17} /> Monthly traffic
        </button>
        <button
          className="report-link"
          onClick={() => {
            setRange("90 days");
            setMetric("Page views");
            setNotice("Quarterly content report loaded.");
          }}
        >
          <BarChart3 size={17} /> Content performance
        </button>
        <div className="sidebar-bottom">
          <div className="usage">
            <span>
              Monthly events<b>68%</b>
            </span>
            <div>
              <i />
            </div>
            <small>68,420 of 100,000 events</small>
          </div>
          <a href="../../">
            Explore Koative templates <ArrowUpRight size={14} />
          </a>
          <div className="profile">
            <span>AC</span>
            <div>
              Alex Carter<small>Demo administrator</small>
            </div>
            <Settings2 size={17} />
          </div>
        </div>
      </aside>
      <main id="overview">
        <header>
          <div>
            <span className="crumb">Workspace /</span> Overview
          </div>
          <span className="live">
            <i /> All systems operational
          </span>
        </header>
        <div className="page-heading">
          <div>
            <h1>The bigger picture.</h1>
            <p>Understand what brings people in. And what makes them stay.</p>
          </div>
          <button className="export" onClick={exportCSV}>
            <Download size={15} /> Export report
          </button>
        </div>
        <div className="toolbar">
          <div className="site-title">
            <span className="site-icon">n</span>
            {site}
            <span className="sample">Sample data</span>
          </div>
          <label className="date-picker">
            <CalendarDays size={14} />
            <select
              aria-label="Reporting period"
              value={range}
              onChange={(e) => setRange(e.target.value as keyof typeof series)}
            >
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </label>
        </div>
        <section className="metrics" aria-label="Key metrics">
          {[
            {
              label: "Visitors",
              value: Math.round(24862 * factor).toLocaleString(),
              change: "12.8",
              up: true,
            },
            {
              label: "Page views",
              value: Math.round(41343 * factor).toLocaleString(),
              change: "8.2",
              up: true,
            },
            { label: "Bounce rate", value: "34.2%", change: "3.1", up: false },
            {
              label: "Visit duration",
              value: "2m 46s",
              change: "16.4",
              up: true,
            },
          ].map((m) => (
            <button
              key={m.label}
              className={metric === m.label ? "metric active" : "metric"}
              onClick={() => setMetric(m.label)}
            >
              <span>{m.label}</span>
              <div>{m.value}</div>
              <small>
                {m.up ? (
                  <ArrowUpRight size={13} />
                ) : (
                  <ArrowDownRight size={13} />
                )}{" "}
                {m.change}% <em>vs. previous period</em>
              </small>
            </button>
          ))}
        </section>
        <section className="traffic" id="traffic">
          <div className="panel-heading">
            <h2>{metric} over time</h2>
            <label className="compare">
              <input
                type="checkbox"
                checked={compare}
                onChange={(e) => setCompare(e.target.checked)}
              />{" "}
              Compare previous period
            </label>
          </div>
          <div className="chart-wrap">
            <div className="y-axis">
              {(metric === "Bounce rate"
                ? ["50%", "40%", "30%", "20%"]
                : metric === "Visit duration"
                  ? ["4m", "3m", "2m", "1m"]
                  : metric === "Page views"
                    ? ["3,000", "2,000", "1,000", "0"]
                    : ["1,500", "1,000", "500", "0"]
              ).map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <svg
              viewBox="0 0 760 270"
              preserveAspectRatio="none"
              role="img"
              aria-label={`${metric} over the last ${range}; illustrative trend`}
            >
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#379b82" stopOpacity=".16" />
                  <stop offset="1" stopColor="#379b82" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[25, 95, 165, 235].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="760"
                  y2={y}
                  stroke="#e8eeeb"
                  strokeDasharray="3 4"
                />
              ))}
              {compare && (
                <polyline
                  points="0,220 28,215 56,230 84,205 112,215 140,190 168,199 196,176 224,190 252,179 280,160 308,174 336,154 364,170 392,145 420,165 448,140 476,148 504,131 532,144 560,129 588,142 616,115 644,132 672,118 700,138 728,121 760,110"
                  stroke="#aebfb8"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5 5"
                />
              )}
              <polygon points={`0,270 ${points} 760,270`} fill="url(#area)" />
              <polyline
                className="chart-line"
                points={points}
                fill="none"
                stroke="#217b64"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="x-axis">
            {axisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="chart-legend">
            <span>
              <i />
              {metric}
            </span>
            {compare && (
              <span>
                <i />
                Previous period
              </span>
            )}
            <span className="chart-insight">
              <ArrowUpRight size={13} /> A steady month of discovery
            </span>
          </div>
        </section>
        <div className="lower-grid">
          <section id="pages" className="pages-panel">
            <div className="panel-heading">
              <h2>Top pages</h2>
              <label className="search">
                <Search size={14} />
                <input
                  placeholder="Find a page…"
                  aria-label="Search pages"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Visitors</th>
                    <th>Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r) => (
                    <tr key={r.path}>
                      <td>
                        <strong>{r.name}</strong>
                        <small>{r.path}</small>
                      </td>
                      <td>
                        {Math.round(r.visitors * factor).toLocaleString()}
                      </td>
                      <td>{r.bounce}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data.length && (
                <div className="empty">
                  No pages match “{query}”.{" "}
                  <button onClick={() => setQuery("")}>Clear search</button>
                </div>
              )}
            </div>
            <div className="table-footer">
              Showing {data.length} of {rows.length} pages
              <button onClick={exportCSV}>
                Download CSV <Download size={12} />
              </button>
            </div>
          </section>
          <section className="sources" id="acquisition">
            <div className="panel-heading">
              <h2>Where they come from</h2>
              <Globe size={16} />
            </div>
            {[
              { name: "Direct", percent: 42, value: "10,442" },
              { name: "Google", percent: 31, value: "7,707" },
              { name: "Instagram", percent: 16, value: "3,978" },
              { name: "Other", percent: 11, value: "2,735" },
            ].map((s, i) => (
              <div className="source" key={s.name}>
                <span className="source-letter">{s.name[0]}</span>
                <div>
                  <div className="source-text">
                    <strong>{s.name}</strong>
                    <span>
                      {Math.round(
                        Number(s.value.replace(",", "")) * factor,
                      ).toLocaleString()}{" "}
                      <small>{s.percent}%</small>
                    </span>
                  </div>
                  <div className="source-track">
                    <span
                      style={{
                        width: s.percent * 2 + "%",
                        opacity: 1 - i * 0.17,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="device-note" id="audience">
              <span>Device breakdown</span>
              <div>
                <b>Desktop 64%</b>
                <span>Mobile 32% · Tablet 4%</span>
              </div>
              <div className="device-bar">
                <i />
                <i />
                <i />
              </div>
            </div>
          </section>
        </div>
        <footer>
          <span>
            <Check size={12} /> Privacy-friendly by design
          </span>
          <span>
            Fictional analytics · No tracking is installed · Signal by Koative
          </span>
        </footer>
        {notice && (
          <div role="status" className="toast">
            <Check size={16} />
            {notice}
            <button
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
