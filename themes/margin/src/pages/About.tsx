import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";
import portrait from "../assets/portrait.jpg";
import workshop from "../assets/workshop.jpg";
import sketchbook from "../assets/sketchbook.jpg";
import wall from "../assets/research-wall.jpg";
import grid from "../assets/grid-sketch.jpg";

export function About() {
  return (
    <>
      <section className="sheet page-head about-head">
        <dl className="aside meta">
          <div>
            <dt>Name</dt>
            <dd>{brand.person}</dd>
          </div>
          <div>
            <dt>Practice</dt>
            <dd>{brand.role}</dd>
          </div>
          <div>
            <dt>Time zone</dt>
            <dd>{brand.timezone}</dd>
          </div>
        </dl>
        <div className="col about-grid">
          <div>
            <h1 className="display">{about.title}</h1>
            <div className="prose">
              {about.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <img
            className="portrait"
            src={portrait}
            alt={`${brand.person}, black-and-white portrait, arms folded on a white table`}
            width={960}
            height={1200}
          />
        </div>
      </section>

      <section className="sheet photo-row" aria-label="At work">
        <p className="aside margin-note">
          Left: mapping a check-in flow with a client team. Right: a homepage
          sketched before anything opens on a screen.
        </p>
        <div className="col photo-pair">
          <img
            src={workshop}
            alt="Two people pointing at a large sheet of hand-drawn screen wireframes with arrows between them"
            width={1200}
            height={1017}
            loading="lazy"
          />
          <img
            src={sketchbook}
            alt="An open sketchbook with pen wireframes of a web page, an orange pen beside it"
            width={1400}
            height={1050}
            loading="lazy"
          />
        </div>
      </section>

      <section className="sheet" aria-labelledby="process">
        <p className="aside margin-note">
          The weeks stretch on longer projects; the order never changes.
        </p>
        <div className="col">
          <h2 id="process">{about.process.title}</h2>
          <ol className="timeline">
            {about.process.steps.map((s) => (
              <li key={s.title}>
                <span className="timeline-when num">{s.when}</span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sheet" aria-labelledby="beliefs">
        <div className="aside" />
        <div className="col">
          <h2 id="beliefs">Three things I hold to</h2>
          <dl className="beliefs">
            {about.beliefs.map((b) => (
              <div key={b.title}>
                <dt>{b.title}</dt>
                <dd>{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sheet photo-row" aria-label="Research">
        <p className="aside margin-note">
          A research wall after a week of interviews, and a phone layout drawn
          on grid paper — most projects start in one of these two places.
        </p>
        <div className="col photo-pair photo-pair-wide">
          <img
            src={wall}
            alt="A wall covered in rows of yellow, orange and white sticky notes from a research synthesis"
            width={1200}
            height={800}
            loading="lazy"
          />
          <img
            src={grid}
            alt="A rough mobile page sketch in blue pen on grid paper, with labels for logo, profile, call to action and details"
            width={750}
            height={1000}
            loading="lazy"
          />
        </div>
      </section>

      <section className="sheet" aria-labelledby="outside">
        <div className="aside" />
        <div className="col prose">
          <h2 id="outside">Outside work</h2>
          <p>{about.outside}</p>
          <p>
            <Link to="/resume" className="text-link">
              The full résumé, with dates{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
          <p>
            <Link to="/contact" className="btn">
              Start a project <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
