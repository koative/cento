import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { images, products, story } from "../content";
import { money } from "../lib/cart";
import { NoiseLab } from "../components/NoiseLab";
import { ProductArt } from "../components/ProductArt";

const flagship = products[0];

/** Hush One target response: a gentle lift below 100 Hz, flat mids, a soft presence dip and treble roll-off. */
const response = Array.from({ length: 61 }, (_, i) => {
  const f = 20 * Math.pow(1000, i / 60);
  const db =
    4 / (1 + Math.pow(f / 90, 2)) -
    1.2 * Math.exp(-Math.pow(Math.log2(f / 3000), 2) * 3) +
    0.8 * Math.exp(-Math.pow(Math.log2(f / 6500), 2) * 4) -
    5 / (1 + Math.pow(14000 / f, 4));
  return [40 + (i / 60) * 560, 110 - db * 9] as const;
});

export function Story() {
  const [problem, room, fit, sound] = story.chapters;
  return (
    <div className="story">
      <header className="story-hero">
        <div>
          <h1>{story.title}</h1>
          <p className="lead">{story.lead}</p>
        </div>
        <img
          src={images.windowSeat}
          alt="Sunset over a sea of clouds, seen past an aircraft wing through an oval cabin window"
          width={825}
          height={820}
        />
      </header>

      <section className="chapter" aria-labelledby="c-problem">
        <div className="chapter-text">
          <h2 id="c-problem">{problem.title}</h2>
          {problem.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <img
          src={images.commute}
          alt="Commuters pressed together in a subway carriage late in the evening"
          width={1400}
          height={1050}
          loading="lazy"
        />
      </section>

      <section className="chapter chamber" aria-labelledby="c-room">
        <img
          src={images.foam}
          alt="Close-up of the grey-blue foam wedges that line the walls of an anechoic chamber"
          width={1200}
          height={900}
          loading="lazy"
        />
        <div className="chapter-text">
          <h2 id="c-room">{room.title}</h2>
          {room.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>

      <section className="chapter fit" aria-labelledby="c-fit">
        <div className="chapter-text">
          <h2 id="c-fit">{fit.title}</h2>
          {fit.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <blockquote className="pull">
          Same quiet with glasses on. That one sentence took eighteen months.
        </blockquote>
      </section>

      <section className="chapter response" aria-labelledby="c-sound">
        <div className="chapter-text">
          <h2 id="c-sound">{sound.title}</h2>
          {sound.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <figure>
          <svg
            viewBox="0 0 620 230"
            role="img"
            aria-label="Hush One frequency response: about 4 dB of lift below 100 Hz, flat through the mids, a slight dip near 3 kHz and a gentle roll-off above 12 kHz."
          >
            {[-10, 0, 10].map((db) => (
              <g key={db}>
                <line
                  x1="40"
                  x2="600"
                  y1={110 - db * 9}
                  y2={110 - db * 9}
                  className={db === 0 ? "axis" : "grid"}
                />
                <text x="32" y={114 - db * 9} textAnchor="end" className="tick">
                  {db > 0 ? "+" + db : db}
                </text>
              </g>
            ))}
            {[
              [20, "20"],
              [100, "100"],
              [1000, "1k"],
              [10000, "10k"],
            ].map(([f, l]) => {
              const x = 40 + (Math.log10(Number(f) / 20) / 3) * 560;
              return (
                <g key={l}>
                  <line x1={x} x2={x} y1="16" y2="204" className="grid" />
                  <text x={x} y="222" textAnchor="middle" className="tick">
                    {l}
                  </text>
                </g>
              );
            })}
            <polyline
              points={response.map((p) => p.join(",")).join(" ")}
              className="response-line"
            />
          </svg>
          <figcaption className="muted">
            Measured on a head and torso simulator, cancelling on, dB relative
            to 1 kHz.
          </figcaption>
        </figure>
      </section>

      <NoiseLab
        product={flagship}
        title="Try it in four places"
        text="The same model we use in the chamber, applied to the noise we measured in each place. Move the slider and watch the rumble fall away first."
      />

      <section className="materials" aria-labelledby="h-materials">
        <h2 id="h-materials">What it is made of</h2>
        <dl>
          {story.materials.map((m) => (
            <div key={m.name}>
              <dt>{m.name}</dt>
              <dd>{m.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="timeline" aria-labelledby="h-timeline">
        <h2 id="h-timeline">Four years, in order</h2>
        <ol>
          {story.timeline.map((t) => (
            <li key={t.year}>
              <span className="num">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-close" aria-labelledby="h-story-close">
        <ProductArt kind="over" colour={flagship.colours[3]} />
        <div>
          <h2 id="h-story-close">Hush One, {money(flagship.price)}</h2>
          <p>
            Four colours, forty hours, every part replaceable. Try it for 45
            days at home.
          </p>
          <div className="actions">
            <Link to="/shop/hush-one" className="btn">
              Choose your colour
            </Link>
            <Link to="/compare" className="btn btn-quiet">
              Compare models <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
