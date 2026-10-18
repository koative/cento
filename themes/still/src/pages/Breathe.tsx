import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { breatheCopy, patterns } from "../content";
import { Breather } from "../components/Breather";

export function Breathe() {
  const img = breatheCopy.image;
  return (
    <>
      <section className="dusk breathe-page">
        <div className="wrap">
          <header className="breathe-head">
            <h1>
              Take this moment. <em>It's yours.</em>
            </h1>
            <p className="lead">{breatheCopy.lead}</p>
          </header>
          <Breather />
          <p className="breathe-safety">{breatheCopy.safety}</p>
        </div>
      </section>

      <section className="wrap patterns" aria-labelledby="patterns-title">
        <div className="patterns-grid">
          <div>
            <h2 id="patterns-title">Four patterns, and when to use them</h2>
            <dl className="pattern-notes">
              {patterns.map((p) => (
                <div key={p.id}>
                  <dt>
                    {p.name} <span>{p.short}</span>
                  </dt>
                  <dd>
                    <p className="pattern-when">{p.when}</p>
                    <p>{p.how}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="patterns-image">
            <img
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              loading="lazy"
            />
            <figcaption>
              Breathing together is easier.{" "}
              <Link to="/classes/breath-and-sit" className="text-link">
                Breath & Sit, five times a week{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
