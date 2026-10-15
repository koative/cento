import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MoveUpRight,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import bicycle from "./assets/bicycle.jpg";
const finishes = [
  { name: "Race red", hex: "#d42d22" },
  { name: "Chalk", hex: "#e6dfcc" },
  { name: "Forest", hex: "#36584c" },
];
export default function App() {
  const [finish, setFinish] = useState(0),
    [size, setSize] = useState("M"),
    [model, setModel] = useState("Road"),
    [specs, setSpecs] = useState(false),
    [saved, setSaved] = useState(false);
  const price = model === "Road" ? 2450 : 2780;
  return (
    <>
      <header className="mast">
        <a className="wordmark" href="#">
          vélo<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#build">The bicycle</a>
          <a href="#manifesto">Our thinking</a>
          <a className="nav-build" href="#build">
            Build your ride <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="ride-hero">
          <img
            src={bicycle}
            alt="Classic white steel road bicycle with leather saddle against a dark workshop wall"
          />
          <div className="hero-copy">
            <h1>
              Less machine.
              <br />
              More feeling.
            </h1>
            <p>
              For the long way home.
              <br />
              And every reason to take it.
            </p>
          </div>
          <a className="hero-link" href="#build">
            Find your rhythm <ArrowRight size={20} />
          </a>
          <div className="hero-caption">
            THE EVERYDAY ESCAPE / STEEL ROAD COLLECTION
          </div>
        </section>
        <div className="red-band">
          <span>BUILT FOR THE RIDE.</span>
          <MoveUpRight size={42} />
          <span>NOT THE FINISH LINE.</span>
        </div>
        <section id="build" className="config">
          <div className="drawing-area">
            <div className="drawing-top">
              <span>YOUR NEXT CHAPTER</span>
              <span>
                {model.toUpperCase()} / {size}
              </span>
            </div>
            <div className="bike-stage">
              <svg
                role="img"
                aria-label={`${finish === 0 ? "Race red" : finishes[finish].name} ${model.toLowerCase()} bicycle geometry preview`}
                viewBox="0 0 620 370"
              >
                <g fill="none" stroke="#232724">
                  <circle cx="135" cy="240" r="102" strokeWidth="9" />
                  <circle cx="485" cy="240" r="102" strokeWidth="9" />
                  <g strokeWidth="1" opacity=".22">
                    {Array.from({ length: 20 }, (_, i) => {
                      const a = (i * Math.PI) / 10;
                      return (
                        <g key={i}>
                          <path
                            d={`M135 240l${Math.cos(a) * 100} ${Math.sin(a) * 100}`}
                          />
                          <path
                            d={`M485 240l${Math.cos(a) * 100} ${Math.sin(a) * 100}`}
                          />
                        </g>
                      );
                    })}
                  </g>
                  <g
                    stroke={finishes[finish].hex}
                    strokeWidth="10"
                    strokeLinejoin="round"
                  >
                    <path d="M135 240L240 95L295 245L135 240M240 95L435 95L295 245M435 95L485 240" />
                  </g>
                  <path
                    d="M235 95L225 64M425 95L418 52L460 45Q490 48 475 75"
                    strokeWidth="7"
                  />
                  <path
                    d="M203 60H253"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />
                  <circle cx="295" cy="245" r="24" strokeWidth="5" />
                  <path d="M295 245L316 270H337" strokeWidth="5" />
                </g>
              </svg>
              <span className="geometry-note">
                Illustrative geometry · finish preview
              </span>
            </div>
            <div className="drawing-bottom">
              <span>Steel soul. Open road.</span>
              <span>
                Designed to go further <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
          <div className="builder">
            <h2>
              Make it
              <br />
              your own.
            </h2>
            <p>
              A considered bicycle. A little less noise. Choose your everyday
              escape.
            </p>
            <fieldset>
              <legend>Ride style</legend>
              <div className="segmented">
                {["Road", "All-road"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={model === x}
                    onClick={() => {
                      setModel(x);
                      setSaved(false);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>
                Finish <span>{finishes[finish].name}</span>
              </legend>
              <div className="swatches">
                {finishes.map((x, i) => (
                  <button
                    key={x.name}
                    aria-label={x.name}
                    aria-pressed={finish === i}
                    style={{ background: x.hex }}
                    onClick={() => {
                      setFinish(i);
                      setSaved(false);
                    }}
                  >
                    {finish === i && (
                      <Check size={17} color={i === 1 ? "#171b19" : "white"} />
                    )}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>
                Frame size <span>Choose your usual size</span>
              </legend>
              <div className="sizes">
                {["XS", "S", "M", "L", "XL"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={size === x}
                    onClick={() => {
                      setSize(x);
                      setSaved(false);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="price">
              <strong>€{price.toLocaleString("en")}</strong>
              <span>Illustrative build price</span>
            </div>
            <button className="primary" onClick={() => setSaved(true)}>
              Save this build <ArrowRight size={18} />
            </button>
            <p className="save-status" role="status">
              {saved
                ? `${model} · ${finishes[finish].name} · ${size} saved for this visit.`
                : "Demo configurator. No purchase or reservation."}
            </p>
            <button
              className="spec-toggle"
              aria-expanded={specs}
              aria-controls="spec-panel"
              onClick={() => setSpecs(!specs)}
            >
              The considered details{" "}
              {specs ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            {specs && (
              <dl id="spec-panel" className="specs">
                <div>
                  <dt>Frame</dt>
                  <dd>Double-butted steel</dd>
                </div>
                <div>
                  <dt>Gearing</dt>
                  <dd>
                    {model === "Road" ? "2 × 11 road" : "1 × 12 wide range"}
                  </dd>
                </div>
                <div>
                  <dt>Tire clearance</dt>
                  <dd>{model === "Road" ? "32 mm" : "45 mm"}</dd>
                </div>
                <div>
                  <dt>Build</dt>
                  <dd>Illustrative specifications</dd>
                </div>
              </dl>
            )}
          </div>
        </section>
        <section id="manifesto" className="manifesto">
          <span className="round-mark" aria-hidden="true">
            <ArrowUpRight size={54} />
          </span>
          <h2>
            Some things
            <br />
            are better
            <br />
            <em>unhurried.</em>
          </h2>
          <div>
            <p>
              The coffee before the climb. A road you haven't tried. That last
              stretch with a friend who always takes the lead.
            </p>
            <p>
              We think a bicycle should make room for all of it. Honest
              materials, familiar mechanics, and nothing between you and the
              ride.
            </p>
            <a href="#build">
              Start with your bicycle <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#">
          vélo®
        </a>
        <p>
          A fictional cycling brand. A Koative template.
          <br />
          Reference photograph is not the configured bicycle.
        </p>
        <a href="#build">
          Back to the build <ArrowUpRight size={15} />
        </a>
      </footer>
    </>
  );
}
