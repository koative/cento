import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "../router";
import {
  about,
  animals,
  brand,
  donate,
  home,
  speciesLabel,
  steps,
  type Species,
} from "../content";
import { ageLabel, money } from "../lib/util";
import { rank } from "../lib/match";
import { KennelCard } from "../components/KennelCard";
import { HoursList, OpenNow } from "../components/Hours";

const hero = animals.find((a) => a.id === home.heroAnimal)!;
const newest = animals
  .filter((a) => a.id !== home.heroAnimal)
  .sort((a, b) => a.daysHere - b.daysHere)
  .slice(0, 4);
const faces = [...animals].sort((a, b) => b.daysHere - a.daysHere).slice(0, 6);
const longest = [...animals].sort((a, b) => b.daysHere - a.daysHere);
const sample = rank(home.matchSample).slice(0, 3);
const counts = (["dog", "cat", "rabbit"] as Species[]).map((s) => ({
  species: s,
  n: animals.filter((a) => a.species === s).length,
}));

export function Home() {
  const [first, ...rest] = longest;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="actions">
            <Link to="/animals" className="btn btn-primary">
              Meet the animals <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/match" className="btn btn-quiet">
              Take the matching quiz
            </Link>
          </div>
          <div className="hero-today">
            <ul className="hero-faces" aria-label="Waiting longest">
              {faces.map((a) => (
                <li key={a.id}>
                  <Link to={`/animals/${a.id}`}>
                    <img
                      src={a.photo}
                      alt={a.name}
                      width={46}
                      height={46}
                      style={a.focus ? { objectPosition: a.focus } : undefined}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <OpenNow />
            <p>
              {animals.length} animals waiting today:{" "}
              {counts.map((c, i) => (
                <span key={c.species}>
                  <Link to={`/animals?species=${c.species}`}>
                    {c.n}{" "}
                    {(c.n === 1
                      ? speciesLabel[c.species].one
                      : speciesLabel[c.species].many
                    ).toLowerCase()}
                  </Link>
                  {i < counts.length - 2
                    ? ", "
                    : i === counts.length - 2
                      ? " and "
                      : "."}
                </span>
              ))}
            </p>
          </div>
        </div>
        <figure className="hero-pet">
          <img
            src={hero.photo}
            alt={hero.alt}
            width={1134}
            height={1400}
            style={{ objectPosition: hero.focus }}
          />
          <span className="hello" aria-hidden="true">
            Hello, I'm {hero.name}!
          </span>
          <figcaption>
            <Link to={`/animals/${hero.id}`} className="hero-tag">
              <span className="hero-tag-name">{hero.name}</span>
              <span>
                {ageLabel(hero.ageMonths)} · Kennel {hero.kennel}
              </span>
              <span className="hero-tag-go">
                Meet {hero.name} <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="wrap section" aria-labelledby="new-h">
        <div className="section-head">
          <h2 id="new-h">Just arrived</h2>
          <Link to="/animals" className="text-link">
            See all {animals.length} animals <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="kgrid">
          {newest.map((a) => (
            <KennelCard key={a.id} animal={a} />
          ))}
        </div>
      </section>

      <section className="band band-forest" aria-labelledby="match-h">
        <div className="wrap match-teaser">
          <div>
            <h2 id="match-h">{home.matchTitle}</h2>
            <p>{home.matchText}</p>
            <Link to="/match" className="btn btn-marigold">
              Start the quiz <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="sample">
            <p className="sample-for">
              <strong>Sample result.</strong> {home.matchSampleLabel}:
            </p>
            <ol>
              {sample.map((m) => (
                <li key={m.animal.id}>
                  <img
                    src={m.animal.photo}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <span>
                    <Link to={`/animals/${m.animal.id}`}>{m.animal.name}</Link>
                    <small>
                      {ageLabel(m.animal.ageMonths)}{" "}
                      {m.animal.breed.toLowerCase()}
                    </small>
                  </span>
                  <b>{m.score}%</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap section longest" aria-labelledby="long-h">
        <div className="longest-feature">
          <img
            src={first.photo}
            alt={first.alt}
            width={1024}
            height={768}
            loading="lazy"
          />
          <div>
            <h2 id="long-h">{home.waitingTitle}</h2>
            <p>{home.waitingText}</p>
            <p className="longest-who">
              <Link to={`/animals/${first.id}`}>{first.name}</Link> has been
              here {first.daysHere} days. {first.line}
            </p>
          </div>
        </div>
        <ol className="wait-list">
          {rest.slice(0, 4).map((a) => (
            <li key={a.id}>
              <Link to={`/animals/${a.id}`}>{a.name}</Link>
              <span className="row-note">
                {ageLabel(a.ageMonths)} {a.breed.toLowerCase()}
              </span>
              <span className="num">{a.daysHere} days</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="steps-h">
        <div className="section-head">
          <h2 id="steps-h">{home.stepsTitle}</h2>
          <Link to="/adopt" className="text-link">
            Fees and the fine print <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p className="step-time">{s.time}</p>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="story wrap" aria-label="An adopter's story">
        <img
          src={home.story.photo}
          alt={home.story.alt}
          width={683}
          height={1024}
          loading="lazy"
        />
        <blockquote>
          <p>“{home.story.quote}”</p>
          <footer>
            <strong>{home.story.name}</strong> · {home.story.detail}
          </footer>
        </blockquote>
      </section>

      <section className="band band-marigold" aria-labelledby="foster-h">
        <div className="wrap foster">
          <img
            src={home.foster.photo}
            alt={home.foster.alt}
            width={1024}
            height={768}
            loading="lazy"
          />
          <div>
            <h2 id="foster-h">{home.foster.title}</h2>
            <p>{home.foster.text}</p>
            <Link to="/volunteer" className="btn btn-primary">
              Become a foster home
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap section impact" aria-labelledby="give-h">
        <div>
          <h2 id="give-h">{home.donateTitle}</h2>
          <p>{donate.intro}</p>
          <Link to="/donate" className="btn btn-primary">
            Give to Kindred
          </Link>
        </div>
        <ul className="ladder">
          {donate.impact.slice(1).map((i) => (
            <li key={i.min}>
              <span className="num">{money(i.min)}</span>
              <span>{i.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section visit" aria-labelledby="visit-h">
        <div>
          <h2 id="visit-h">Visit the shelter</h2>
          <p className="visit-address">
            <MapPin aria-hidden="true" />
            <span>
              {brand.address.join(", ")}
              <br />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </span>
          </p>
          <ul className="notes">
            {about.visitNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div className="visit-hours">
          <HoursList />
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <div className="wrap">
          <h2 id="close-h">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/animals" className="btn btn-primary">
              See who's waiting
            </Link>
            <Link to="/apply" className="btn btn-quiet">
              Start an application
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
