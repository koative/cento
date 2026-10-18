import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "../router";
import {
  audiences,
  brand,
  images,
  productions,
  programmes,
  type Audience,
} from "../content";
import { runDates } from "../lib/util";

export function Learning() {
  const [audience, setAudience] = useState<Audience | null>(null);
  const shown = programmes.filter((g) => !audience || g.audience === audience);
  const youthShow = productions.find((p) => p.slug === "tidewater")!;

  return (
    <>
      <section className="page-head page-head-split">
        <div className="wrap split">
          <div>
            <h1 className="display">Learning &amp; participation</h1>
            <p className="lede">
              Classes for eight-year-olds and eighty-year-olds, matinees for
              every school in the county, and a youth company that makes a full
              production each spring. Over a thousand people a year learn
              theatre in our building.
            </p>
          </div>
          <img
            src={images.workshop.src}
            alt={images.workshop.alt}
            width={images.workshop.w}
            height={images.workshop.h}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="tiers-head">
            <h2>Classes, companies and school visits</h2>
            <div
              className="chips"
              role="group"
              aria-label="Show programmes for"
            >
              <button
                type="button"
                className="chip"
                aria-pressed={!audience}
                onClick={() => setAudience(null)}
              >
                Everyone
              </button>
              {audiences.map((a) => (
                <button
                  key={a}
                  type="button"
                  className="chip"
                  aria-pressed={audience === a}
                  onClick={() => setAudience(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <p className="result-count" aria-live="polite">
            {shown.length} programmes
          </p>
          <ul className="programmes">
            {shown.map((g) => (
              <li key={g.id} className="programme">
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </div>
                <dl>
                  <div>
                    <dt>Who</dt>
                    <dd>{g.ages}</dd>
                  </div>
                  <div>
                    <dt>When</dt>
                    <dd>{g.when}</dd>
                  </div>
                  <div>
                    <dt>Cost</dt>
                    <dd>{g.price}</dd>
                  </div>
                </dl>
                <a
                  className="btn btn-line"
                  href={`mailto:${brand.learningEmail}?subject=${encodeURIComponent(g.title)}`}
                >
                  <Mail aria-hidden="true" /> Ask about a place
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section house-dark">
        <div className="wrap split">
          <img
            src={youthShow.image.src}
            alt={youthShow.image.alt}
            width={youthShow.image.w}
            height={youthShow.image.h}
            loading="lazy"
          />
          <div>
            <h2>{youthShow.title}</h2>
            <p className="spot-dates">
              Studio · {runDates(youthShow.opens, youthShow.closes)}
            </p>
            <p>{youthShow.logline}</p>
            <p>{youthShow.synopsis[0]}</p>
            <Link to={`/season/${youthShow.slug}`} className="btn btn-cream">
              About Tidewater
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split-top">
          <div className="prose">
            <h2>For teachers</h2>
            <p>
              Every Mainstage production has at least two schools matinees, a
              free resource pack written with local teachers, and a cast Q&amp;A
              afterwards. Groups of ten students or more get one free teacher
              place per ten.
            </p>
            <p>
              Title I schools in Port Ellery County travel free: we pay for the
              bus. Ask us about workshops tied to your syllabus, from
              Shakespeare to devising.
            </p>
            <a
              className="text-link"
              href={`mailto:${brand.learningEmail}?subject=Schools%20booking`}
            >
              Email the learning team <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="prose">
            <h2>Bursaries</h2>
            <p>
              No one is turned away from a class because of cost. Half of our
              youth-company places are free or reduced, and we never ask for
              proof — just tell us what you can pay.
            </p>
            <img
              src={images.youthRehearsal.src}
              alt={images.youthRehearsal.alt}
              width={images.youthRehearsal.w}
              height={images.youthRehearsal.h}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
