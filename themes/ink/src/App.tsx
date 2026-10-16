import { useState } from "react";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import studio from "./assets/studio.jpg";
const flash = [
  { name: "Orbit", style: "Geometry", size: "6–8 cm", price: 140 },
  { name: "Undertow", style: "Linework", size: "8–12 cm", price: 180 },
  { name: "Threshold", style: "Geometry", size: "5–7 cm", price: 120 },
  { name: "Intervals", style: "Linework", size: "7–10 cm", price: 160 },
];
function Mark({ id }: { id: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      {id === 0 ? (
        <>
          <circle cx="100" cy="100" r="55" />
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="25"
            transform="rotate(-35 100 100)"
          />
          <circle cx="143" cy="57" r="5" fill="currentColor" />
        </>
      ) : id === 1 ? (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M30 ${65 + i * 15} Q65 ${25 + i * 15} 100 ${65 + i * 15} T170 ${65 + i * 15}`}
            />
          ))}
        </>
      ) : id === 2 ? (
        <>
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${45 + i * 13} 165 V90 A${55 - i * 13} ${55 - i * 13} 0 0 1 ${155 - i * 13} 90 V165`}
            />
          ))}
        </>
      ) : (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx="100" cy={55 + i * 24} r="24" />
          ))}
        </>
      )}
    </svg>
  );
}
export default function App() {
  const [filter, setFilter] = useState("All");
  const [chosen, setChosen] = useState(0);
  const [placement, setPlacement] = useState("Forearm");
  const [brief, setBrief] = useState("");
  return (
    <>
      <header>
        <a href="#" className="brand">
          INK<span>PRIVATE TATTOO STUDIO</span>
        </a>
        <nav aria-label="Main">
          <a href="#flash">The flashbook</a>
          <a href="#consultation">
            Start a piece <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main>
        <section className="opening">
          <div className="opening-copy">
            <h1>
              A mark.
              <br />A moment.
              <br />
              <em>Yours.</em>
            </h1>
            <p>
              Considered tattoos for the stories
              <br />
              you choose to carry.
            </p>
            <a href="#flash">
              Open the flashbook <ArrowRight size={18} />
            </a>
            <span className="studio-note">
              APPOINTMENT ONLY / ORIGINAL WORK
            </span>
          </div>
          <figure>
            <img src={studio} alt="Tattoo artist at work in a studio" />
            <figcaption>Made slowly. Worn always.</figcaption>
          </figure>
        </section>
        <section className="flashbook" id="flash">
          <div className="flash-head">
            <h2>Available studies</h2>
            <div aria-label="Flash style">
              {["All", "Geometry", "Linework"].map((s) => (
                <button
                  key={s}
                  aria-pressed={filter === s}
                  onClick={() => setFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flash-grid">
            {flash.map(
              (f, i) =>
                (filter === "All" || filter === f.style) && (
                  <button
                    className="flash"
                    key={f.name}
                    aria-pressed={chosen === i}
                    onClick={() => {
                      setChosen(i);
                      setBrief("");
                    }}
                  >
                    <span className="flash-code">
                      STUDY / {String(i + 1).padStart(2, "0")}
                    </span>
                    <Mark id={i} />
                    <span className="flash-meta">
                      <b>{f.name}</b>
                      <span>{f.size}</span>
                      {chosen === i ? (
                        <Check size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </span>
                  </button>
                ),
            )}
          </div>
          <p className="flash-note">
            Original geometric studies for this demo. Every design can begin a
            conversation.
          </p>
        </section>
        <section className="consultation" id="consultation">
          <div>
            <h2>
              It begins with
              <br />a conversation.
            </h2>
            <p>
              Choose a study and a placement. We will shape the idea around you,
              with room to change your mind.
            </p>
            <dl>
              <div>
                <dt>Selected study</dt>
                <dd>{flash[chosen].name}</dd>
              </div>
              <div>
                <dt>Suggested size</dt>
                <dd>{flash[chosen].size}</dd>
              </div>
              <div>
                <dt>Illustrative starting price</dt>
                <dd>£{flash[chosen].price}</dd>
              </div>
            </dl>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBrief(
                `${flash[chosen].name} on your ${placement.toLowerCase()} — consultation brief prepared. Demo only; no request was sent.`,
              );
            }}
          >
            <label>
              Placement
              <select
                value={placement}
                onChange={(e) => {
                  setPlacement(e.target.value);
                  setBrief("");
                }}
              >
                <option>Forearm</option>
                <option>Upper arm</option>
                <option>Ankle</option>
                <option>Shoulder</option>
              </select>
            </label>
            <label>
              Your idea
              <textarea
                placeholder="A story, a feeling, or a detail you would like to explore."
                rows={3}
              />
            </label>
            <button type="submit">
              Preview consultation brief <ArrowUpRight size={19} />
            </button>
            <p className="status" role="status">
              {brief ||
                "No contact details required. This is a local demonstration."}
            </p>
          </form>
        </section>
        <section className="process">
          <h2>
            No rush.
            <br />
            No replicas.
          </h2>
          <p>
            A fictional private studio with a simple philosophy: a good tattoo
            begins with listening. Our imagined process makes time for the
            drawing, the placement, and the person wearing it.
          </p>
          <span>DESIGN / DISCUSS / REFINE / MAKE</span>
        </section>
      </main>
      <footer>
        <strong>INK / A PERSONAL PRACTICE</strong>
        <p>
          Fictional studio by Koative. No appointment or consultation request is
          sent.
        </p>
      </footer>
    </>
  );
}
