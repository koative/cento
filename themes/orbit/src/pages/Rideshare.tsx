import { Check, Plus } from "lucide-react";
import { brand, images, rideshare } from "../content";
import { money } from "../lib/format";
import { Calculator } from "../components/Calculator";
import { Steps } from "../components/Steps";

export function Rideshare() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Rideshare pricing</h1>
          <p className="lede">
            Your satellite shares a Halcyon with thirty to forty others and pays
            only for its own mass. Set your payload, orbit, flight and services;
            the total below is the price on your contract.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <Calculator />
          <p className="fine">
            Cubesats are billed per unit at {money(rideshare.cubesatPerU)}/U to
            sun-synchronous orbit. Microsatellites are billed by wet mass,
            minimum {rideshare.minBilledKg} kg. Flights more than{" "}
            {rideshare.early.months} months out earn a{" "}
            {Math.abs(rideshare.early.rate * 100)}% credit; bookings inside{" "}
            {rideshare.shortNotice.months} months carry a{" "}
            {rideshare.shortNotice.rate * 100}% short-notice charge.
          </p>
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap split">
          <div>
            <h2>Included in every slot</h2>
            <ul className="included">
              {rideshare.included.map((i) => (
                <li key={i}>
                  <Check aria-hidden="true" size={18} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={images.arrays.src}
            alt={images.arrays.alt}
            width={images.arrays.w}
            height={images.arrays.h}
            loading="lazy"
            className="rounded-photo"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Twelve months, five milestones</h2>
          <Steps steps={rideshare.steps} />
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap faq-grid">
          <div>
            <h2>Questions customers ask</h2>
            <p>
              Anything else goes to the sales desk at{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>. A mission
              manager answers, not a salesperson.
            </p>
          </div>
          <div className="faq">
            {rideshare.faq.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <Plus aria-hidden="true" size={20} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
