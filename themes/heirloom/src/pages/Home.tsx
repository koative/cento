import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  bespoke,
  brand,
  collections,
  home,
  images,
  pieces,
  type Metal,
} from "../content";
import { PieceCard } from "../components/PieceCard";
import { Plate } from "../components/Plate";
import { MetalPicker } from "../components/Bits";

const featured = [
  "the-vesper",
  "the-ardent",
  "the-procession",
  "orchard-drops",
].map((s) => pieces.find((p) => p.slug === s)!);

export function Home() {
  const [metal, setMetal] = useState<Metal>("yellow");

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="actions">
            <Link to="/collections" className="btn">
              See the collections <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/appointments" className="btn btn-quiet">
              Book a consultation
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src={images.solitaire.src}
            width={images.solitaire.width}
            height={images.solitaire.height}
            alt={images.solitaire.alt}
            fetchPriority="high"
          />
          <figcaption>
            <Link to="/collections/engagement/the-ardent">
              {home.heroCaption}
            </Link>
          </figcaption>
        </figure>
      </section>

      <nav className="collection-strip wrap" aria-label="Collections">
        {collections.map((c) => {
          const n = pieces.filter((p) => p.collection === c.id).length;
          return (
            <Link key={c.id} to={`/collections/${c.id}`}>
              <span>{c.name}</span>
              <small>
                {n} {n === 1 ? "piece" : "pieces"}
              </small>
            </Link>
          );
        })}
      </nav>

      <section className="section wrap">
        <div className="section-head">
          <h2>{home.featuredTitle}</h2>
          <Link to="/collections" className="text-link">
            All pieces <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="piece-grid">
          {featured.map((p) => (
            <PieceCard key={p.slug} piece={p} />
          ))}
        </div>
      </section>

      <section className="builder-teaser">
        <div className="wrap builder-teaser-inner">
          <div className="lamp">
            <Plate
              art={{
                kind: "solitaire",
                gem: "sapphire",
                cut: "oval",
                carat: 1.2,
              }}
              metal={metal}
              title={`Drawing of an oval sapphire solitaire in ${metal === "platinum" ? "platinum" : metal + " gold"}`}
            />
          </div>
          <div>
            <h2>{home.builderTitle}</h2>
            <p>{home.builderText}</p>
            <MetalPicker
              name="teaser-metal"
              options={["yellow", "rose", "platinum"]}
              value={metal}
              onChange={setMetal}
            />
            <Link to="/ring-builder" className="btn">
              Open the ring builder <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>{home.processTitle}</h2>
          <p>{home.processText}</p>
        </div>
        <ol className="timeline">
          {bespoke.stages.map((s) => (
            <li key={s.name}>
              <span className="timeline-when">{s.weeks}</span>
              <h3>{s.name}</h3>
            </li>
          ))}
        </ol>
        <Link to="/bespoke" className="text-link">
          The bespoke process in full{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="split wrap">
        <img
          src={images.sundial.src}
          width={images.sundial.width}
          height={images.sundial.height}
          alt={images.sundial.alt}
          loading="lazy"
        />
        <div>
          <h2>{home.heirloomTitle}</h2>
          <p>{home.heirloomText}</p>
          <Link to="/appointments" className="btn btn-quiet">
            Book an heirloom assessment
          </Link>
        </div>
      </section>

      <figure className="quote wrap">
        <blockquote>
          <p>{home.quote.text}</p>
        </blockquote>
        <figcaption>{home.quote.by}</figcaption>
      </figure>

      <section className="split split-reverse wrap">
        <div className="print">
          <img
            src={images.joailliers.src}
            width={images.joailliers.width}
            height={images.joailliers.height}
            alt={images.joailliers.alt}
            loading="lazy"
          />
        </div>
        <div>
          <h2>{home.atelierTitle}</h2>
          <p>{home.atelierText}</p>
          <Link to="/atelier" className="text-link">
            Meet the makers <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <h2 className="visually-hidden">Our promises</h2>
        <dl className="promises">
          {home.promises.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <div>
            <h2>{home.closeTitle}</h2>
            <p>{home.closeText}</p>
            <Link to="/appointments" className="btn">
              Book an appointment <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <dl className="hours">
            {brand.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
            <div>
              <dt>Address</dt>
              <dd>
                {brand.street}, {brand.city}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
