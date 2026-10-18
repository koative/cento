import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  photos,
  principles,
  recognition,
  rituals,
  studioPage,
  team,
} from "../content";
import { MarkSvg } from "../components/Mark";
import { Photo } from "../components/CaseCard";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

export function Studio() {
  return (
    <>
      <section className="page-head wrap">
        <h1>{studioPage.title}</h1>
        <p className="lede">{studioPage.intro}</p>
      </section>

      <section className="wrap studio-story">
        <Photo p={photos.loft} lazy={false} className="story-photo" />
        <div className="story-text">
          {studioPage.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section
        className="section principles-band"
        aria-labelledby="principles-title"
      >
        <div className="wrap">
          <h2 id="principles-title">{studioPage.principlesTitle}</h2>
          <ul className="principles">
            {principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="team-title">{studioPage.teamTitle}</h2>
            <p className="tabular">{team.length} people, since 2013</p>
          </div>
          <ul className="team">
            {team.map((p) => (
              <li key={p.name} className={`person tone-${p.tone}`}>
                <div className="person-tile" aria-hidden="true">
                  <MarkSvg
                    kind={p.mark}
                    fg="currentColor"
                    accent="var(--tile-accent)"
                    className="person-mark"
                  />
                  <span className="person-initials">{initials(p.name)}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="person-role">{p.role}</p>
                <p className="person-note">{p.note}</p>
                <p className="person-since tabular">Since {p.since}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section space-band" aria-labelledby="space-title">
        <div className="wrap space-grid">
          <div className="space-text">
            <h2 id="space-title">{studioPage.spaceTitle}</h2>
            <p>{studioPage.spaceText}</p>
            <address>
              {brand.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <dl className="hours">
              {brand.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Photo p={photos.meetingRoom} className="space-a" />
          <Photo p={photos.letterpress} className="space-b" />
          <Photo p={photos.desk} className="space-c" />
        </div>
      </section>

      <section className="section" aria-labelledby="rituals-title">
        <div className="wrap rituals-grid">
          <h2 id="rituals-title">{studioPage.ritualsTitle}</h2>
          <ul className="rituals">
            {rituals.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
          <Photo p={photos.pencils} className="rituals-photo" />
        </div>
      </section>

      <section className="section" aria-labelledby="recognition-title">
        <div className="wrap">
          <h2 id="recognition-title">{studioPage.recognitionTitle}</h2>
          <table className="awards">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Award</th>
                <th scope="col">Project</th>
              </tr>
            </thead>
            <tbody>
              {recognition.map((r) => (
                <tr key={r.award + r.project}>
                  <td className="tabular">{r.year}</td>
                  <td>{r.award}</td>
                  <td>{r.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="close close-compact" aria-labelledby="studio-close">
        <div className="wrap close-grid">
          <h2 id="studio-close">There's room at the table.</h2>
          <div className="close-side">
            <p>
              We're hiring a senior identity designer, a design engineer and
              more. Salaries are on every listing.
            </p>
            <Link to="/careers" className="btn btn-citron btn-big">
              See open roles <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
