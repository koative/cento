import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
const shades = [
  { name: "Cherry pop", color: "#9f192f" },
  { name: "Milk bath", color: "#f3dace" },
  { name: "Poolside", color: "#4d8ab2" },
  { name: "Olive hour", color: "#747a35" },
  { name: "Tangerine", color: "#d6592f" },
];
export default function App() {
  const [shade, setShade] = useState(0),
    [finish, setFinish] = useState("Gloss"),
    [service, setService] = useState("The signature"),
    [saved, setSaved] = useState(false);
  return (
    <>
      <header>
        <a className="brand" href="#">
          lacquer.
        </a>
        <nav>
          <a href="#palette">Play with color</a>
          <a href="#menu">Studio menu</a>
          <a href="#menu">
            Make it yours <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="lacquer-hero">
          <div className="hero-copy">
            <h1>
              Small canvas.
              <br />
              <em>Big personality.</em>
            </h1>
            <p>
              A nail studio for expressive hands.
              <br />
              Find your shade. Set your mood.
              <br />
              Take up a little more color.
            </p>
            <a className="action" href="#palette">
              Meet your next mood <ArrowUpRight size={18} />
            </a>
            <span className="studio-note">COLOR IS A GOOD PLACE TO START.</span>
          </div>
          <div
            className={"nail-stage " + finish.toLowerCase()}
            style={{ "--shade": shades[shade].color } as React.CSSProperties}
            role="img"
            aria-label={
              shades[shade].name +
              " nail color samples with " +
              finish +
              " finish"
            }
          >
            <div className="nail n1" />
            <div className="nail n2" />
            <div className="nail n3" />
            <div className="sample-caption">
              <span>{shades[shade].name}</span>
              <span>{finish} finish</span>
            </div>
          </div>
        </section>
        <section id="palette" className="palette">
          <h2>
            Your mood.
            <br />
            In full color.
          </h2>
          <div>
            <div className="shade-options">
              {shades.map((s, i) => (
                <button
                  aria-label={s.name}
                  aria-pressed={shade === i}
                  key={s.name}
                  onClick={() => {
                    setShade(i);
                    setSaved(false);
                  }}
                >
                  <i style={{ background: s.color }} />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
            <div className="finish">
              <span>Finish the feeling</span>
              <div className="tabs">
                {["Gloss", "Matte"].map((x) => (
                  <button
                    aria-pressed={finish === x}
                    key={x}
                    onClick={() => {
                      setFinish(x);
                      setSaved(false);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="menu" id="menu">
          <div>
            <h2>
              A little time.
              <br />
              All for you.
            </h2>
            <p>
              Choose an illustrative service to complete your studio moodboard.
              Nothing is booked or charged.
            </p>
            <div className="service-menu">
              {[
                { name: "The signature", time: "45 min", price: "£38" },
                { name: "The art session", time: "75 min", price: "£58" },
                { name: "The reset", time: "30 min", price: "£24" },
              ].map((s) => (
                <button
                  aria-pressed={service === s.name}
                  key={s.name}
                  onClick={() => {
                    setService(s.name);
                    setSaved(false);
                  }}
                >
                  <span>
                    {s.name}
                    <small>{s.time}</small>
                  </span>
                  <b>{s.price}</b>
                </button>
              ))}
            </div>
          </div>
          <aside className="appointment">
            <span className="appointment-mark">l.</span>
            <h3>
              Your next little
              <br />
              obsession.
            </h3>
            <dl>
              <dt>Service</dt>
              <dd>{service}</dd>
              <dt>Color story</dt>
              <dd>
                {shades[shade].name} / {finish}
              </dd>
            </dl>
            <button className="action" onClick={() => setSaved(true)}>
              {saved ? <Check size={18} /> : <ArrowUpRight size={18} />}{" "}
              {saved ? "Look saved" : "Save this look"}
            </button>
            <p role="status" className="status">
              {saved
                ? "Your studio look is saved locally. No appointment was booked."
                : ""}
            </p>
          </aside>
        </section>
        <div className="closing">
          Good hands. <em>Great color.</em>
        </div>
      </main>
      <footer>
        <a href="../../">Koative collection</a>
        <p>
          Lacquer is a fictional nail studio. Colors and services are
          illustrative.
        </p>
      </footer>
    </>
  );
}
