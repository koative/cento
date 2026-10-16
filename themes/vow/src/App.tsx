import { useState } from "react";
import { ArrowUpRight, ArrowRight, Check, MoveUpRight } from "lucide-react";
import table from "./assets/table.jpg";
import ceremony from "./assets/ceremony.jpg";
export default function App() {
  const [style, setStyle] = useState("Garden gathering");
  const [guests, setGuests] = useState("60");
  const [names, setNames] = useState("");
  const [done, setDone] = useState(false);
  return (
    <>
      <header>
        <nav>
          <a href="#story">Our approach</a>
          <a href="#celebrations">Celebrations</a>
        </nav>
        <a className="brand" href="#">
          vow.
        </a>
        <a href="#begin" className="begin-link">
          Begin your story <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="opening">
          <h1>
            For a day that feels
            <br />
            <em>entirely like you.</em>
          </h1>
          <p>
            Thoughtfully planned. Beautifully felt.
            <br />
            Celebrations with a little soul.
          </p>
          <div className="folio">
            <figure className="folio-left">
              <img src={ceremony} alt="Outdoor wedding ceremony setting" />
              <figcaption>The feeling comes first.</figcaption>
            </figure>
            <div className="folio-copy">
              <span>V / W</span>
              <p>
                Not a formula.
                <br />A feeling.
              </p>
              <a href="#begin" aria-label="Plan your celebration">
                <MoveUpRight size={28} />
              </a>
            </div>
            <figure className="folio-right">
              <img
                src={table}
                alt="A wedding table with flowers and candlelight"
              />
              <figcaption>A table full of your people.</figcaption>
            </figure>
          </div>
        </section>
        <section className="story" id="story">
          <span className="wordmark">
            Together,
            <br />
            beautifully.
          </span>
          <div>
            <h2>
              The best part
              <br />
              is making it yours.
            </h2>
            <p>
              A long table under the trees. A city dinner that runs late. A
              small ceremony somewhere meaningful. We shape the details around
              the story you want to tell.
            </p>
            <p>
              From the first conversation to the final dance, there is room for
              joy in the process.
            </p>
          </div>
        </section>
        <section className="celebrations" id="celebrations">
          <h2>
            Many ways to say <em>we do.</em>
          </h2>
          <div>
            {["Garden gathering", "City celebration", "Coastal weekend"].map(
              (s, i) => (
                <button
                  key={s}
                  aria-pressed={style === s}
                  onClick={() => {
                    setStyle(s);
                    setDone(false);
                  }}
                >
                  <span>{s}</span>
                  <small>
                    {
                      [
                        "Open air, seasonal flowers, easy conversation.",
                        "An intimate dinner, a favorite room, your people.",
                        "A slower pace, a sea breeze, a little adventure.",
                      ][i]
                    }
                  </small>
                  <ArrowUpRight size={22} />
                </button>
              ),
            )}
          </div>
        </section>
        <section className="brief" id="begin">
          <div>
            <h2>
              A few details.
              <br />
              <em>A beautiful beginning.</em>
            </h2>
            <p>
              Make a little room for imagination. Build a celebration brief,
              just for this demo.
            </p>
            <div className="brief-preview">
              <span>{style}</span>
              <strong>{guests} guests</strong>
              <p>
                {Number(guests) > 100
                  ? "A full-hearted gathering, with room for everyone."
                  : "A personal celebration, with the details close at hand."}
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label>
              Your names
              <input
                required
                placeholder="Alex & Jamie"
                value={names}
                onChange={(e) => {
                  setNames(e.target.value);
                  setDone(false);
                }}
              />
            </label>
            <label>
              Your celebration
              <select
                value={style}
                onChange={(e) => {
                  setStyle(e.target.value);
                  setDone(false);
                }}
              >
                {[
                  "Garden gathering",
                  "City celebration",
                  "Coastal weekend",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Guest count · {guests}
              <input
                type="range"
                min="20"
                max="180"
                step="10"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  setDone(false);
                }}
              />
            </label>
            <button className="btn">
              Create our brief <ArrowRight size={18} />
            </button>
            {done && (
              <p role="status">
                <Check size={18} /> {names}: {style.toLowerCase()} for {guests}{" "}
                guests. Your demo brief is ready; nothing was sent.
              </p>
            )}
            <small>Fictional planning studio. No enquiry is submitted.</small>
          </form>
        </section>
      </main>
      <footer>
        <span>Vow · Stories worth celebrating. Fictional template.</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
