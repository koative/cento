import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import {
  allergyNote,
  dietLabels,
  dishes,
  services,
  type Diet,
  type Service,
} from "../content";
import { DishRow } from "../components/DishRow";
import { Photo } from "../components/Photo";
import { TablePlanner } from "../components/TablePlanner";

const diets = Object.keys(dietLabels) as Diet[];

export function Menu({ service }: { service: Service }) {
  const [diet, setDiet] = useState<Diet[]>([]);
  const [query, setQuery] = useState("");
  const all = dishes.filter((d) => d.service === service.id);
  const q = query.trim().toLowerCase();
  const shown = all.filter(
    (d) =>
      diet.every((x) => d.diet.includes(x)) &&
      (!q || `${d.name} ${d.desc}`.toLowerCase().includes(q)),
  );
  const pictured = all.filter((d) => d.photo);
  const filtered = diet.length > 0 || q !== "";

  return (
    <div className="menu-page">
      <header className="page-head wrap">
        <nav className="service-tabs" aria-label="Menus">
          {services.map((s) => (
            <Link key={s.id} to={`/menu/${s.id}`}>
              {s.name}
            </Link>
          ))}
        </nav>
        <h1>{service.title}</h1>
        <p className="lede">{service.intro}</p>
        <p className="when">{service.when}</p>
      </header>

      {pictured.length > 0 && (
        <ul
          className="photo-strip wrap"
          aria-label={`Pictured from the ${service.name.toLowerCase()} menu`}
        >
          {pictured.map((d) => (
            <li key={d.id}>
              <Link to={`/menu/${d.service}/${d.id}`}>
                <Photo photo={d.photo!} />
                <span>{d.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="wrap menu-layout">
        <div className="menu-sheet">
          <div className="menu-tools">
            <div className="search">
              <label htmlFor="menu-search" className="sr-only">
                Search the {service.name.toLowerCase()} menu
              </label>
              <Search aria-hidden="true" />
              <input
                id="menu-search"
                type="search"
                placeholder={`Search ${service.name.toLowerCase()}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="chips" role="group" aria-label="Dietary filters">
              {diets.map((d) => (
                <button
                  key={d}
                  type="button"
                  className="chip"
                  aria-pressed={diet.includes(d)}
                  onClick={() =>
                    setDiet((cur) =>
                      cur.includes(d)
                        ? cur.filter((x) => x !== d)
                        : [...cur, d],
                    )
                  }
                >
                  {dietLabels[d]}
                </button>
              ))}
            </div>
            <p className="result-count" aria-live="polite">
              {filtered
                ? `${shown.length} of ${all.length} dishes`
                : `${all.length} dishes`}
            </p>
          </div>

          {shown.length ? (
            service.sections.map((sec) => {
              const items = shown.filter((d) => d.section === sec.title);
              if (!items.length) return null;
              return (
                <section
                  key={sec.title}
                  className="menu-section"
                  aria-labelledby={`sec-${sec.title}`}
                >
                  <div className="menu-section-head">
                    <h2 id={`sec-${sec.title}`}>{sec.title}</h2>
                    {sec.note && <p>{sec.note}</p>}
                  </div>
                  <ul className="dish-list">
                    {items.map((d) => (
                      <DishRow key={d.id} dish={d} />
                    ))}
                  </ul>
                </section>
              );
            })
          ) : (
            <div className="empty">
              <p>
                Nothing on the {service.name.toLowerCase()} menu matches
                {diet.length
                  ? ` ${diet.map((d) => dietLabels[d].toLowerCase()).join(" and ")}`
                  : ""}
                {q ? ` “${query.trim()}”` : ""}. The kitchen can often adapt a
                dish — just ask.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setDiet([]);
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <p className="legend">
            {diets
              .map((d) => `${d} ${dietLabels[d].toLowerCase()}`)
              .join(" · ")}
            . {allergyNote}
          </p>
        </div>
        <TablePlanner />
      </div>
    </div>
  );
}
