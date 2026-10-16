import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Heart,
  Search,
  House,
  Check,
} from "lucide-react";
import home from "./assets/home.jpg";
import loft from "./assets/loft.jpg";
import garden from "./assets/garden.jpg";
const homes = [
  {
    name: "The garden apartment",
    area: "North Quarter",
    price: "$2,400 / mo",
    beds: 2,
    img: garden,
    tag: "Garden",
  },
  {
    name: "A loft above the city",
    area: "Old Town",
    price: "$3,100 / mo",
    beds: 1,
    img: loft,
    tag: "Loft",
  },
  {
    name: "Room for the everyday",
    area: "North Quarter",
    price: "$3,600 / mo",
    beds: 3,
    img: home,
    tag: "House",
  },
];
export default function App() {
  const [area, setArea] = useState("All neighborhoods");
  const [saved, setSaved] = useState<string[]>([]);
  const [only, setOnly] = useState(false);
  const [selected, setSelected] = useState("");
  const [done, setDone] = useState(false);
  const visible = homes.filter(
    (h) =>
      (area === "All neighborhoods" || h.area === area) &&
      (!only || saved.includes(h.name)),
  );
  return (
    <>
      <header>
        <a className="brand" href="#">
          <House size={25} /> meridian.
        </a>
        <nav>
          <a href="#homes">Find a home</a>
          <button onClick={() => setOnly(!only)} aria-pressed={only}>
            <Heart size={17} /> Saved ({saved.length})
          </button>
        </nav>
      </header>
      <main>
        <section className="title">
          <h1>
            A place to
            <br />
            <em>make your own.</em>
          </h1>
          <p>
            Good spaces. Interesting neighborhoods.
            <br />
            Find the next place to call home.
          </p>
        </section>
        <section className="finder" id="homes">
          <div className="searchbar">
            <label>
              <MapPin size={19} />
              <span className="sr-only">Neighborhood</span>
              <select
                aria-label="Neighborhood"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option>All neighborhoods</option>
                <option>North Quarter</option>
                <option>Old Town</option>
              </select>
            </label>
            <span>Rental collection · Fictional listings</span>
            <button aria-pressed={only} onClick={() => setOnly(!only)}>
              {only ? "Show all homes" : "Saved homes"} <Heart size={17} />
            </button>
          </div>
          <div className="finder-body">
            <div
              className="map"
              aria-label="Schematic neighborhood map, not a real location"
            >
              <svg viewBox="0 0 600 650" aria-hidden="true">
                <path fill="#d4dec3" d="M0 0H600V650H0Z" />
                <path
                  fill="#e9e4ba"
                  d="M45 25H235V175H45ZM335 20H570V170H335ZM40 250H225V420H40ZM330 250H580V420H330ZM30 500H235V630H30ZM340 500H580V630H340Z"
                />
                <path
                  stroke="#f8f6ed"
                  strokeWidth="38"
                  fill="none"
                  d="M280 0V650M0 210H600M0 460H600"
                />
                <path
                  fill="none"
                  stroke="#b5d1ce"
                  strokeWidth="65"
                  d="M0 500Q150 440 100 300T160 0"
                />
                <path
                  fill="none"
                  stroke="#fff9e4"
                  strokeWidth="13"
                  d="M0 210H600M280 0V650"
                />
              </svg>
              <span className="map-label north">NORTH QUARTER</span>
              <span className="map-label old">OLD TOWN</span>
              {homes.map((h, i) => (
                <button
                  key={h.name}
                  className={"pin pin-" + i}
                  aria-label={"View " + h.name}
                  onClick={() => {
                    setSelected(h.name);
                    setDone(false);
                  }}
                >
                  <House size={15} />
                  {h.price.split(" /")[0]}
                </button>
              ))}
              <span className="map-note">Illustrative neighborhood map</span>
            </div>
            <div className="listing">
              <div className="listing-heading">
                <span>{visible.length} homes to discover</span>
                <span>Curated, not crowded.</span>
              </div>
              {visible.map((h) => (
                <article key={h.name}>
                  <img src={h.img} alt={h.name} />
                  <div className="listing-info">
                    <span>
                      {h.area} · {h.beds} bedrooms
                    </span>
                    <h2>{h.name}</h2>
                    <p>{h.price}</p>
                    <button
                      className="view"
                      onClick={() => {
                        setSelected(h.name);
                        setDone(false);
                        document
                          .getElementById("viewing")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Plan a viewing <ArrowUpRight size={17} />
                    </button>
                  </div>
                  <button
                    className="save"
                    aria-label={
                      (saved.includes(h.name) ? "Unsave " : "Save ") + h.name
                    }
                    aria-pressed={saved.includes(h.name)}
                    onClick={() =>
                      setSaved(
                        saved.includes(h.name)
                          ? saved.filter((s) => s !== h.name)
                          : [...saved, h.name],
                      )
                    }
                  >
                    <Heart
                      size={19}
                      fill={saved.includes(h.name) ? "currentColor" : "none"}
                    />
                  </button>
                </article>
              ))}
              {!visible.length && (
                <div className="empty">
                  <Search size={28} />
                  <h2>No homes here yet.</h2>
                  <p>
                    Try another neighborhood or save a home from the full
                    collection.
                  </p>
                  <button
                    onClick={() => {
                      setArea("All neighborhoods");
                      setOnly(false);
                    }}
                    className="btn"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="viewing" id="viewing">
          <div>
            <h2>Picture yourself here.</h2>
            <p>
              Choose a home and prepare a viewing request. This is a
              demonstration, so nothing will be sent.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label>
              Home
              <select
                required
                value={selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                  setDone(false);
                }}
              >
                <option value="">Choose a home</option>
                {homes.map((h) => (
                  <option key={h.name}>{h.name}</option>
                ))}
              </select>
            </label>
            <button className="btn">
              Preview viewing request <ArrowUpRight size={18} />
            </button>
            {done && (
              <p role="status">
                <Check size={18} /> Viewing request prepared for {selected}.
                Demo only — not booked.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <span>Meridian · Fictional properties and prices</span>
        <a href="../../">Koative collection</a>
      </footer>
    </>
  );
}
