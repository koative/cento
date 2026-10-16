import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sun,
  Plus,
  Minus,
  Zap,
  BatteryCharging,
} from "lucide-react";
import house from "./assets/house.jpg";
export default function App() {
  const [panels, setPanels] = useState(10);
  const [battery, setBattery] = useState(true);
  const [bill, setBill] = useState(140);
  const [saved, setSaved] = useState(false);
  const coverage = Math.min(96, Math.round(panels * 6 + (battery ? 12 : 0)));
  return (
    <>
      <a className="skip" href="#planner">
        Skip to energy planner
      </a>
      <header className="nav">
        <a href="#" className="brand">
          <Sun />
          grid
        </a>
        <nav>
          <a href="#planner">Build your system</a>
          <a href="#how">How it works</a>
        </nav>
        <a className="nav-action" href="#planner">
          A brighter home <ArrowUpRight />
        </a>
      </header>
      <main>
        <section className="sun-intro">
          <h1>
            Your roof.
            <br />A little more
            <br />
            <span>powerful.</span>
          </h1>
          <div className="sun-circle">
            <Sun strokeWidth={0.6} />
          </div>
          <div className="intro-note">
            <p>
              Turn the everyday into renewable energy. A simpler way to imagine
              your solar-powered home.
            </p>
            <a className="btn" href="#planner">
              Let's build your system <ArrowRight />
            </a>
            <span className="demo">
              An independent energy concept. Illustrative estimates only.
            </span>
          </div>
        </section>
        <section className="planner" id="planner">
          <div className="house-view">
            <img src={house} alt="Modern low-rise home framed by trees" />
            <div className="energy-chip">
              <Sun size={22} />
              <div>
                <strong>{(panels * 0.4).toFixed(1)} kW</strong>
                <span>Your solar array</span>
              </div>
            </div>
            <div className="flow-line" aria-hidden="true" />
            <div className="house-caption">
              A home that gives back.<span>YOUR SYSTEM / LIVE CONCEPT</span>
            </div>
          </div>
          <div className="controls">
            <h2>
              Make room
              <br />
              for sunshine.
            </h2>
            <p>Adjust your setup and see a simplified system estimate.</p>
            <div className="panel-count">
              <div>
                <strong>Solar panels</strong>
                <span>400 W per panel</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    setPanels(Math.max(4, panels - 1));
                    setSaved(false);
                  }}
                  disabled={panels <= 4}
                  aria-label="Remove solar panel"
                >
                  <Minus />
                </button>
                <output aria-label="Solar panel count">{panels}</output>
                <button
                  onClick={() => {
                    setPanels(Math.min(24, panels + 1));
                    setSaved(false);
                  }}
                  disabled={panels >= 24}
                  aria-label="Add solar panel"
                >
                  <Plus />
                </button>
              </div>
            </div>
            <label className="bill-label">
              Monthly energy bill <strong>€{bill}</strong>
              <input
                type="range"
                min="60"
                max="400"
                step="10"
                value={bill}
                onChange={(e) => {
                  setBill(+e.target.value);
                  setSaved(false);
                }}
              />
            </label>
            <label className="battery">
              <BatteryCharging />
              <span>
                <strong>Store your sunshine</strong>
                <small>Add a home battery</small>
              </span>
              <input
                type="checkbox"
                checked={battery}
                onChange={(e) => {
                  setBattery(e.target.checked);
                  setSaved(false);
                }}
              />
            </label>
            <div className="estimate">
              <span>Illustrative annual bill reduction</span>
              <strong>
                €{Math.round((bill * 12 * coverage) / 100).toLocaleString()}
              </strong>
              <span>
                {coverage}% modeled coverage · not an installation quote
              </span>
            </div>
            <button className="btn" onClick={() => setSaved(true)}>
              Save my concept <ArrowRight />
            </button>
            {saved && (
              <p className="status" role="status">
                Your {panels}-panel concept{battery ? " with a battery" : ""} is
                saved for this session. No inquiry was sent.
              </p>
            )}
          </div>
        </section>
        <section id="how" className="section how">
          <h2>
            Good energy.
            <br />
            Less guesswork.
          </h2>
          <div>
            <article>
              <Sun />
              <h3>Start with the sun.</h3>
              <p>
                Solar panels convert daylight into electricity for the moments
                that make a home.
              </p>
            </article>
            <article>
              <BatteryCharging />
              <h3>Keep a little for later.</h3>
              <p>
                A battery shifts stored energy into the evening. Your routines
                set the rhythm.
              </p>
            </article>
            <article>
              <Zap />
              <h3>Make it yours.</h3>
              <p>
                Real output depends on your roof, location, weather, tariffs and
                an installer assessment.
              </p>
            </article>
          </div>
        </section>
        <section className="closing">
          <p>
            The future looks
            <br />
            <em>right at home.</em>
          </p>
          <a href="#planner" className="btn">
            Explore your system <ArrowUpRight />
          </a>
        </section>
      </main>
      <footer className="footer">
        <a className="brand" href="#">
          grid
        </a>
        <span>
          Fictional solar brand by Koative. Calculator uses simplified
          demonstration assumptions, not financial or engineering advice.
        </span>
        <span>Powered by possibility.</span>
      </footer>
    </>
  );
}
