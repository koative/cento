import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { home, images, products, scenes } from "../content";
import { money } from "../lib/cart";
import { dbA } from "../lib/noise";
import { ProductArt } from "../components/ProductArt";
import { ProductCard, Swatches } from "../components/ProductCard";
import { NoiseLab } from "../components/NoiseLab";

const flagship = products[0];

const mics = [
  { x: 66, y: 212, kind: "ff" },
  { x: 66, y: 256, kind: "ff" },
  { x: 334, y: 212, kind: "ff" },
  { x: 334, y: 256, kind: "ff" },
  { x: 133, y: 250, kind: "fb" },
  { x: 267, y: 250, kind: "fb" },
  { x: 104, y: 302, kind: "voice" },
  { x: 296, y: 302, kind: "voice" },
];

export function Home() {
  const [colour, setColour] = useState(flagship.colours[0]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.hero.title}</h1>
          <p className="lead">{home.hero.lead}</p>
          <Swatches
            colours={flagship.colours}
            value={colour.name}
            onChange={setColour}
            name="hero-colour"
          />
          <div className="actions">
            <Link to="/shop/hush-one" className="btn">
              Buy Hush One · {money(flagship.price)}
            </Link>
            <Link to="/story" className="btn btn-quiet">
              Read the story <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <figure className="hero-art">
          <ProductArt
            kind="over"
            colour={colour}
            label={`Hush One headphones in ${colour.name}`}
          />
          <figcaption>
            <ul className="spec-line">
              {home.hero.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </section>

      <section className="scenes" aria-labelledby="h-scenes">
        <div className="section-head">
          <h2 id="h-scenes">{home.scenesTitle}</h2>
          <p>{home.scenesText}</p>
        </div>
        <ul className="scene-grid">
          {scenes.map((s) => (
            <li key={s.id}>
              <img
                src={s.image}
                alt={s.alt}
                width={1400}
                height={933}
                loading="lazy"
              />
              <p>
                <b>{s.name}</b>
                <span>{s.place}</span>
                <span className="num level">
                  {Math.round(dbA(s.levels))} dB(A)
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <NoiseLab product={flagship} title={home.labTitle} text={home.labText} />

      <section className="range" aria-labelledby="h-range">
        <div className="section-head split">
          <div>
            <h2 id="h-range">{home.rangeTitle}</h2>
            <p>{home.rangeText}</p>
          </div>
          <Link to="/shop" className="text-link">
            Parts and cases <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.type !== "Accessory")
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          <Link to="/compare" className="compare-tile">
            <span>Not sure which? Put any three side by side.</span>
            <span className="text-link">
              Compare models <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <section className="mics" aria-labelledby="h-mics">
        <div className="mics-art">
          <ProductArt kind="over" colour={colour} />
          <svg viewBox="0 0 400 320" className="mic-dots" aria-hidden="true">
            {mics.map((m, i) => (
              <g
                key={i}
                className={"mic mic-" + m.kind}
                style={{ animationDelay: i * 0.18 + "s" }}
              >
                <circle cx={m.x} cy={m.y} r="12" className="mic-ring" />
                <circle cx={m.x} cy={m.y} r="4.5" className="mic-dot" />
              </g>
            ))}
          </svg>
          <ul className="mic-key">
            <li className="mic-ff">Feed-forward, listening out</li>
            <li className="mic-fb">Feedback, listening in</li>
            <li className="mic-voice">Voice beam</li>
          </ul>
        </div>
        <div className="mics-copy">
          <h2 id="h-mics">{home.micTitle}</h2>
          {home.micText.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <Link to="/story" className="text-link">
            How we tuned it in the chamber{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <figure className="quiet-band">
        <img
          src={images.nightTrain}
          alt="A late train streaks past a steel bridge at night, its windows a blur of light"
          width={1600}
          height={900}
          loading="lazy"
        />
        <figcaption>{home.quiet}</figcaption>
      </figure>

      <section className="repair" aria-labelledby="h-repair">
        <div>
          <h2 id="h-repair">{home.repairTitle}</h2>
          <p>{home.repairText}</p>
          <Link to="/support/replace-battery" className="text-link">
            See how a battery swap works{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <table className="parts">
          <caption className="visually-hidden">
            Replacement parts for Hush One
          </caption>
          <thead>
            <tr>
              <th scope="col">Part</th>
              <th scope="col">Fitting</th>
              <th scope="col" className="num">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {home.parts.map((p) => (
              <tr key={p.name}>
                <th scope="row">{p.name}</th>
                <td>{p.time}</td>
                <td className="num">{money(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="quotes" aria-labelledby="h-quotes">
        <h2 id="h-quotes" className="visually-hidden">
          What owners say
        </h2>
        {home.quotes.map((q) => (
          <figure key={q.name}>
            <blockquote>
              <p>{q.text}</p>
            </blockquote>
            <figcaption>
              <b>{q.name}</b> {q.role}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="promises" aria-labelledby="h-promises">
        <h2 id="h-promises" className="visually-hidden">
          Our promises
        </h2>
        <dl>
          {home.promises.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close" aria-labelledby="h-close">
        <img
          src={images.listener}
          alt="A man in a denim jacket looks down, headphones resting around his neck"
          width={1400}
          height={956}
          loading="lazy"
        />
        <div>
          <h2 id="h-close">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop all headphones
            </Link>
            <Link to="/support" className="btn btn-quiet">
              Talk to support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
