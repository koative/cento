import { useState } from "react";
import { Package, ArrowRight, Check, Truck, MapPin } from "lucide-react";
export default function App() {
  const [zone, setZone] = useState("Domestic");
  const [weight, setWeight] = useState("2");
  const [service, setService] = useState("Standard");
  const [label, setLabel] = useState(false);
  const numeric = Number(weight);
  const valid = Number.isFinite(numeric) && numeric > 0 && numeric <= 30;
  const price =
    (zone === "Domestic" ? 4.5 : 12) +
    Math.ceil(numeric) * 1.2 +
    (service === "Express" ? 8 : 0);
  return (
    <>
      <a className="skip" href="#main">
        Skip to shipping desk
      </a>
      <header>
        <a className="brand" href="#">
          <Package />
          parcel
        </a>
        <nav>
          <a href="#desk">Shipping desk</a>
          <a href="#guide">Packing guide</a>
        </nav>
        <span>Small packages. Big possibilities.</span>
      </header>
      <main id="main">
        <div className="intro">
          <h1>
            Send a little
            <br />
            something good.
          </h1>
          <p>
            A simpler shipping desk for the things you make, sell and share.
          </p>
        </div>
        <section className="shipping-desk" id="desk">
          <div className="shipping-form">
            <h2>Let's get it on its way.</h2>
            <div className="fields">
              <label>
                Destination
                <select
                  value={zone}
                  onChange={(e) => {
                    setZone(e.target.value);
                    setLabel(false);
                  }}
                >
                  <option>Domestic</option>
                  <option>International</option>
                </select>
              </label>
              <label>
                Package weight (kg)
                <input
                  type="number"
                  min="0.1"
                  max="30"
                  step="0.1"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setLabel(false);
                  }}
                  aria-describedby="weight-help"
                />
              </label>
            </div>
            <p className="helper" id="weight-help">
              Packages from 0.1 to 30 kg. Rates are fictional estimates.
            </p>
            <fieldset>
              <legend>Choose a delivery pace</legend>
              {["Standard", "Express"].map((x) => (
                <label
                  key={x}
                  className={"service " + (service === x ? "active" : "")}
                >
                  <input
                    type="radio"
                    name="service"
                    value={x}
                    checked={service === x}
                    onChange={() => {
                      setService(x);
                      setLabel(false);
                    }}
                  />
                  <span>
                    <strong>{x}</strong>
                    <small>
                      {x === "Standard"
                        ? "A little patience. A lighter price."
                        : "For the things that cannot wait."}
                    </small>
                  </span>
                  <span>
                    {zone === "Domestic"
                      ? x === "Standard"
                        ? "3–5 days"
                        : "1–2 days"
                      : x === "Standard"
                        ? "7–12 days"
                        : "3–5 days"}
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="rate">
              <span>
                Estimated shipping
                <strong>{valid ? `€${price.toFixed(2)}` : "—"}</strong>
              </span>
              <button
                className="primary"
                disabled={!valid}
                onClick={() => setLabel(true)}
              >
                Create demo label <ArrowRight />
              </button>
            </div>
            <p className="status" role="status">
              {!valid
                ? "Enter a weight above 0 and no more than 30 kg."
                : label
                  ? `${service} demo label created for a ${weight} kg ${zone.toLowerCase()} package.`
                  : "No payment, shipment or real label is created."}
            </p>
          </div>
          <div className="label-stage">
            <div className={"shipping-label " + (label ? "printed" : "")}>
              <div className="label-top">
                <Package />
                <strong>PARCEL</strong>
                <span>{service === "Express" ? "EXP" : "STD"}</span>
              </div>
              <div className="address">
                <small>DESTINATION ZONE</small>
                <h3>{zone}</h3>
                <p>
                  Sample recipient
                  <br />
                  24 Makers Lane
                  <br />
                  Example City
                </p>
              </div>
              <div className="label-metadata">
                <span>{valid ? weight : "—"} KG</span>
                <span>{service.toUpperCase()}</span>
                <span>1 OF 1</span>
              </div>
              <div className="barcode" aria-hidden="true">
                {Array.from({ length: 42 }, (_, i) => (
                  <i key={i} style={{ width: (i % 3) + 1 }} />
                ))}
              </div>
              <code>DEMO — NOT VALID FOR POSTAGE</code>
              <div className="label-state">
                {label ? (
                  <>
                    <Check /> Demo label ready
                  </>
                ) : (
                  <>Your label preview</>
                )}
              </div>
            </div>
            <span className="paper-caption">
              A good journey starts with a clear label.
            </span>
          </div>
        </section>
        <section id="guide" className="packing">
          <div>
            <h2>
              Pack a little
              <br />
              care into it.
            </h2>
            <p>Three practical habits for a better parcel.</p>
          </div>
          <ol>
            <li>
              <strong>Choose the right box.</strong>
              <p>
                A snug fit with room for cushioning keeps movement to a minimum.
              </p>
            </li>
            <li>
              <strong>Protect what matters.</strong>
              <p>Wrap fragile pieces individually and fill any empty space.</p>
            </li>
            <li>
              <strong>Make the outside clear.</strong>
              <p>
                Remove old labels and keep the delivery information flat and
                visible.
              </p>
            </li>
          </ol>
        </section>
        <div className="formula">
          Demo rate: zone base (€4.50 domestic / €12 international) + €1.20 per
          started kilogram + €8 for Express. Transit times are fictional
          examples.
        </div>
      </main>
      <footer>
        <span>Parcel — fictional shipping service</span>
        <span>Every good thing starts somewhere.</span>
      </footer>
    </>
  );
}
