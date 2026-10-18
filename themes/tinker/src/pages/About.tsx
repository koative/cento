import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { ages, brand, imagery, pages, rules, story, team } from "../content";
import { Block } from "../components/Block";

export function About() {
  return (
    <div className="page about-page">
      <header className="about-hero">
        <div>
          <h1>{pages.about.title}</h1>
          <p className="lead">{pages.about.lead}</p>
        </div>
        <img
          src={imagery.counter.src}
          alt={imagery.counter.alt}
          width={imagery.counter.w}
          height={imagery.counter.h}
        />
      </header>

      <section className="rules" aria-labelledby="h-rules">
        <h2 id="h-rules">How a toy gets on our shelf</h2>
        <ol>
          {rules.map((r, i) => (
            <li key={r.title}>
              <Block shape={ages[i].shape} color={ages[i].color} size={34} />
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline" aria-labelledby="h-story">
        <h2 id="h-story">Fifteen years on Larkspur Street</h2>
        <ol>
          {story.map((s) => (
            <li key={s.year}>
              <b className="num">{s.year}</b>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="team" aria-labelledby="h-team">
        <h2 id="h-team">Behind the counter</h2>
        <ul>
          {team.map((t, i) => (
            <li
              key={t.name}
              style={
                {
                  "--band": ages[i + 1].color,
                  "--on": ages[i + 1].on,
                } as CSSProperties
              }
            >
              <span className="initial" aria-hidden="true">
                {t.name[0]}
              </span>
              <h3>{t.name}</h3>
              <p className="role">{t.role}</p>
              <p>{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="testers" aria-labelledby="h-testers">
        <img
          src={imagery.shelves.src}
          alt={imagery.shelves.alt}
          width={imagery.shelves.w}
          height={imagery.shelves.h}
          loading="lazy"
        />
        <div>
          <h2 id="h-testers">Become a tester family</h2>
          <p>
            Every month we send new toys home with Millbrook families for a
            week. You keep a short diary of what got played with, then bring the
            toy back with your verdict. Testers get first pick of workshop
            seats.
          </p>
          <a
            className="btn"
            href={`mailto:${brand.email}?subject=Tester%20family`}
          >
            Email us to join the list
          </a>
          <Link to="/visit" className="text-link">
            Or come and ask at the counter{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
