import { ArrowRight, Check, Heart, HeartOff } from "lucide-react";
import { Link } from "../router";
import {
  animals,
  included,
  speciesLabel,
  tags,
  type Animal,
  type Level,
} from "../content";
import { ageLabel, feeFor, money } from "../lib/util";
import { GoodWith, KennelCard, TagChip } from "../components/KennelCard";

const scaleWords: Record<string, [string, string, string]> = {
  Energy: ["Couch potato", "Steady", "Full tilt"],
  Affection: ["Independent", "Friendly", "Velcro"],
  "Time alone": ["Needs company", "A few hours", "A work day"],
};

function Scale({ label, value }: { label: string; value: Level }) {
  return (
    <div className="scale">
      <dt>{label}</dt>
      <dd>
        <span className="pips" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span key={n} data-on={n <= value ? "" : undefined} />
          ))}
        </span>
        {scaleWords[label][value - 1]}
      </dd>
    </div>
  );
}

export function AnimalPage({ animal: a }: { animal: Animal }) {
  const fee = feeFor(a);
  const related = animals
    .filter((x) => x.id !== a.id)
    .sort(
      (x, y) =>
        Number(y.species === a.species) - Number(x.species === a.species) ||
        y.daysHere - x.daysHere,
    )
    .slice(0, 3);
  const specs: [string, string][] = [
    ["Kennel", a.kennel],
    ["With us", `${a.daysHere} days`],
    ["Age", ageLabel(a.ageMonths)],
    ["Sex", a.sex],
    ["Breed", a.breed],
    ["Size", a.size],
    ["Weight", `${a.weightLb} lb`],
    ["Colour", a.colour],
  ];

  return (
    <article className="wrap page animal">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/animals">Animals</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/animals?species=${a.species}`}>
          {speciesLabel[a.species].many}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{a.name}</span>
      </nav>

      <div className="animal-top">
        <figure className="animal-photo">
          <img
            src={a.photo}
            alt={a.alt}
            width={1024}
            height={768}
            style={a.focus ? { objectPosition: a.focus } : undefined}
          />
        </figure>

        <div className="animal-card" data-tag={a.tag}>
          <h1>{a.name}</h1>
          <p className="lede">{a.line}</p>
          <dl className="specs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="animal-tag">
            <TagChip animal={a} />
            <p>{tags[a.tag].note}</p>
          </div>
          <h2 className="mini-h">Good with</h2>
          <GoodWith animal={a} full />
          <div className="animal-cta">
            <Link to={`/apply/${a.id}`} className="btn btn-primary">
              Apply to adopt {a.name}
            </Link>
            <p>
              Adoption fee <strong className="num">{money(fee)}</strong> ·{" "}
              <Link to="/adopt">what's included</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="animal-body">
        <section aria-labelledby="story-h" className="prose">
          <h2 id="story-h">{a.name}'s story</h2>
          {a.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h2>The right home</h2>
          <p>{a.idealHome}</p>
          <div className="loves">
            <div>
              <h3>
                <Heart aria-hidden="true" /> Loves
              </h3>
              <ul>
                {a.loves.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>
                <HeartOff aria-hidden="true" /> Not keen on
              </h3>
              <ul>
                {a.notKeen.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="animal-aside">
          <section aria-labelledby="char-h">
            <h2 id="char-h" className="mini-h">
              Character, from our notes
            </h2>
            <dl className="scales">
              <Scale label="Energy" value={a.energy} />
              <Scale label="Affection" value={a.affection} />
              <Scale label="Time alone" value={a.independence} />
            </dl>
          </section>
          <section aria-labelledby="health-h">
            <h2 id="health-h" className="mini-h">
              Health
            </h2>
            <ul className="ticks">
              {a.medical.map((m) => (
                <li key={m}>
                  <Check aria-hidden="true" /> {m}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="fee-h" className="fee-box">
            <h2 id="fee-h" className="mini-h">
              {money(fee)} adoption fee includes
            </h2>
            <ul>
              {included.slice(0, 4).map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section className="section related" aria-labelledby="rel-h">
        <div className="section-head">
          <h2 id="rel-h">Also waiting</h2>
          <Link to="/match" className="text-link">
            Not sure? Take the quiz <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="kgrid kgrid-3">
          {related.map((r) => (
            <KennelCard key={r.id} animal={r} />
          ))}
        </div>
      </section>
    </article>
  );
}
