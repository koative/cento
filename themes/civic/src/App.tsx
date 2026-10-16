import { useState } from "react";
import {
  ArrowRight,
  Search,
  Landmark,
  ArrowUpRight,
  Check,
  MapPin,
  ChevronDown,
} from "lucide-react";
const services = [
  {
    name: "Bins & recycling",
    group: "At home",
    text: "Collection days, sorting and bulky items.",
  },
  {
    name: "Streets & lighting",
    group: "Your neighborhood",
    text: "Streetlights, pavement and public spaces.",
  },
  {
    name: "Parks & recreation",
    group: "Your neighborhood",
    text: "Find green spaces and local activities.",
  },
  {
    name: "Permits & applications",
    group: "At home",
    text: "Building, parking and everyday permissions.",
  },
  {
    name: "Libraries & learning",
    group: "Community",
    text: "Books, workshops and shared resources.",
  },
  {
    name: "Community events",
    group: "Community",
    text: "Meet the people who make this place.",
  },
];
export default function App() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All services");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [report, setReport] = useState(false);
  const visible = services.filter(
    (s) =>
      (group === "All services" || group === s.group) &&
      (s.name + " " + s.text).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <div className="official">
        A fictional public-service portal · Demonstration only
      </div>
      <header>
        <a href="#" className="brand">
          <Landmark size={34} />
          <span>
            Civic
            <br />
            <small>Town of Commonwell</small>
          </span>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#report">Report an issue</a>
        </nav>
      </header>
      <main>
        <section className="search-hero">
          <div>
            <h1>
              Your town.
              <br />
              At your service.
            </h1>
            <p>
              Find a useful answer.
              <br />
              Get on with your day.
            </p>
          </div>
          <label className="searchbox">
            <Search size={27} />
            <span className="sr-only">Search town services</span>
            <input
              placeholder="What can we help with?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <ArrowRight size={25} />
          </label>
          <div className="popular">
            <span>Popular:</span>
            {["Bins", "Parks", "Permits"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setQ(t);
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </section>
        <section className="directory" id="services">
          <div className="directory-head">
            <h2>Find your service.</h2>
            <span>{visible.length} services</span>
          </div>
          <div className="directory-body">
            <aside>
              {[
                "All services",
                "At home",
                "Your neighborhood",
                "Community",
              ].map((x) => (
                <button
                  key={x}
                  aria-pressed={group === x}
                  onClick={() => setGroup(x)}
                >
                  {x}
                  <ArrowRight size={16} />
                </button>
              ))}
            </aside>
            <div className="service-list">
              {visible.map((s) => (
                <article key={s.name}>
                  <button
                    onClick={() => setService(service === s.name ? "" : s.name)}
                    aria-expanded={service === s.name}
                  >
                    <span>
                      <h3>{s.name}</h3>
                      <p>{s.text}</p>
                    </span>
                    <ChevronDown size={22} />
                  </button>
                  {service === s.name && (
                    <div className="service-detail">
                      <p>
                        Visit the town service desk Monday–Friday, 9:00–17:00,
                        or prepare a local issue report below. These are
                        illustrative service details for this fictional town.
                      </p>
                      <a href="#report">
                        Prepare an issue report <ArrowRight size={16} />
                      </a>
                    </div>
                  )}
                </article>
              ))}
              {!visible.length && (
                <div className="empty">
                  <h3>No services found.</h3>
                  <p>Try a shorter phrase or choose another group.</p>
                  <button
                    className="btn"
                    onClick={() => {
                      setQ("");
                      setGroup("All services");
                    }}
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="town-note">
          <MapPin size={30} />
          <div>
            <h2>Small town. Shared spaces.</h2>
            <p>
              Explore the library, the park and the places where neighbors
              become friends.
            </p>
          </div>
          <a
            href="#services"
            onClick={() => {
              setGroup("Community");
              setQ("");
            }}
          >
            Explore community services <ArrowUpRight size={19} />
          </a>
        </section>
        <section className="report" id="report">
          <div>
            <h2>
              Something
              <br />
              needs attention?
            </h2>
            <p>
              Try the demo reporting flow. Please use fictional details; no
              report leaves your browser.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReport(true);
            }}
          >
            <label>
              Issue type
              <select onChange={() => setReport(false)}>
                <option>Streetlight not working</option>
                <option>Damaged pavement</option>
                <option>Park maintenance</option>
              </select>
            </label>
            <label>
              Location
              <input
                required
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setReport(false);
                }}
                placeholder="e.g. Willow Street, near the park"
              />
            </label>
            <button className="btn">
              Create demo report <ArrowRight size={18} />
            </button>
            {report && (
              <p role="status" className="report-status">
                <Check size={20} /> Demo report CW-1042 created for {location}.
                Status: recorded locally. Nothing was submitted.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <span>Civic · Fictional town. Not a government website.</span>
        <a href="../../">Koative collection</a>
      </footer>
    </>
  );
}
