import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { brand, services, speciesLabel, type Species } from "../content";
import { ServiceList } from "../components/ServiceList";

const filters: ("all" | Species)[] = ["all", "dog", "cat", "rabbit"];

export function Services() {
  const [species, setSpecies] = useState<"all" | Species>("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = services.filter(
    (s) =>
      (species === "all" || s.species.includes(species)) &&
      (!q ||
        `${s.name} ${s.short} ${s.visits.map((v) => v.name).join(" ")}`
          .toLowerCase()
          .includes(q)),
  );

  return (
    <>
      <section className="page-head wrap">
        <h1>Services & prices</h1>
        <p className="lede">
          Nine services under one roof, from first vaccines to senior screens.
          Prices are for a standard visit; anything more comes with a written
          estimate first.
        </p>
      </section>

      <section className="section wrap services-page" aria-label="Service list">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by species">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={species === f}
                onClick={() => setSpecies(f)}
              >
                {f === "all" ? "All pets" : speciesLabel[f]}
              </button>
            ))}
          </div>
          <div className="search">
            <Search aria-hidden="true" />
            <label htmlFor="svc-q" className="sr-only">
              Search services
            </label>
            <input
              id="svc-q"
              type="search"
              placeholder="Search: teeth, chip, neuter…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "service" : "services"}
          {species !== "all"
            ? ` for ${speciesLabel[species].toLowerCase()}`
            : ""}
        </p>
        {shown.length ? (
          <ServiceList items={shown} headingLevel={2} />
        ) : (
          <div className="empty">
            <p>Nothing matches “{query}”. We probably still do it — ask us.</p>
            <a href={brand.phoneHref} className="text-link">
              Call {brand.phone}
            </a>
          </div>
        )}
        <aside className="note-box">
          <p>
            Not sure what your pet needs? Book a{" "}
            <Link to="/book?reason=sick">general visit</Link> and we'll work it
            out together. Urgent? See{" "}
            <Link to="/emergency">emergency care</Link>.
          </p>
        </aside>
      </section>
    </>
  );
}
