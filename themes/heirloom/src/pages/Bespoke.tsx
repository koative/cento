import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { bespoke, images } from "../content";
import { Plate } from "../components/Plate";
import { Faq } from "../components/Bits";

export function Bespoke() {
  return (
    <div className="page">
      <header className="wrap page-head page-head-split">
        <div>
          <h1>{bespoke.title}</h1>
          <p className="lede">{bespoke.intro}</p>
          <Link to="/appointments" className="btn">
            Book a design session <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <img
          src={images.princess.src}
          width={images.princess.width}
          height={images.princess.height}
          alt={images.princess.alt}
          fetchPriority="high"
        />
      </header>

      <section className="wrap section">
        <div className="section-head">
          <h2>Six stages, eight to twelve weeks</h2>
          <p>
            You approve each stage before the next one begins. Nothing is cast
            until you have worn the wax.
          </p>
        </div>
        <ol className="stages">
          {bespoke.stages.map((s, i) => (
            <li key={s.name}>
              <span className="stage-number" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.name}</h3>
                <p className="stage-when">{s.weeks}</p>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap split">
        <img
          src={images.sundial.src}
          width={images.sundial.width}
          height={images.sundial.height}
          alt={images.sundial.alt}
          loading="lazy"
        />
        <div>
          <h2>{bespoke.remodelTitle}</h2>
          {bespoke.remodelText.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>One stone, two lives</h2>
          <p>
            A 1962 solitaire brought in with a worn shank, reset as a platinum
            halo. The sapphire, and the gold of the old band, are both in the
            new ring.
          </p>
        </div>
        <div className="before-after">
          <figure className="tray">
            <Plate
              art={{
                kind: "solitaire",
                gem: "sapphire",
                cut: "round",
                carat: 0.9,
              }}
              metal="yellow"
              title="Drawing of the original yellow gold sapphire solitaire"
            />
            <figcaption>
              As inherited: 18k yellow gold, thin shank, four worn claws
            </figcaption>
          </figure>
          <figure className="tray lamp">
            <Plate
              art={{ kind: "halo", gem: "sapphire", cut: "round", carat: 0.9 }}
              metal="platinum"
              title="Drawing of the same sapphire reset in a platinum halo"
            />
            <figcaption>
              Remodelled: platinum halo, the old gold alloyed into the shank
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="wrap section pricing">
        <div>
          <h2>{bespoke.pricingTitle}</h2>
          <p>{bespoke.pricingNote}</p>
        </div>
        <table>
          <caption className="visually-hidden">
            Guide prices for bespoke work
          </caption>
          <tbody>
            {bespoke.pricing.map(([what, price]) => (
              <tr key={what}>
                <th scope="row">{what}</th>
                <td>{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap section faq-section">
        <h2>Questions we are asked</h2>
        <Faq items={bespoke.faqs} />
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <div>
            <h2>Start with a conversation</h2>
            <p>
              Ninety minutes with our designer, a pad of toned card and whatever
              you bring. There is no charge and no obligation.
            </p>
          </div>
          <div className="actions">
            <Link to="/appointments" className="btn">
              Book a design session
            </Link>
            <Link to="/ring-builder" className="btn btn-quiet">
              Try the ring builder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
