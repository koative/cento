import { ArrowRight, Mail } from "lucide-react";
import { Link } from "../router";
import { brand, cases, home } from "../content";
import { Annotated } from "../components/Annotated";
import { CaseRow } from "../components/CaseRow";
import { EasingLab } from "../components/EasingLab";

export function Home() {
  const hero = cases.find((c) => c.slug === home.heroCase)!;
  const featured = home.featured.map((s) => cases.find((c) => c.slug === s)!);
  const [lead, ...quotes] = home.quotes;

  return (
    <>
      <section className="sheet hero">
        <dl className="aside meta">
          <div>
            <dt>Designer</dt>
            <dd>{brand.person}</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{brand.city}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>{brand.availability}</dd>
          </div>
        </dl>
        <div className="col hero-grid">
          <div className="hero-text">
            <h1 className="display">{home.title}</h1>
            <p className="lead">{home.intro}</p>
            <div className="actions">
              <Link to="/work" className="btn">
                See the case studies <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/resume" className="btn btn-line">
                Read the résumé
              </Link>
            </div>
            <p className="hero-case">
              The screen here: {hero.client}, {hero.year}.{" "}
              <Link to={`/work/${hero.slug}`}>
                Read how the ticket flow went from six screens to two
              </Link>
            </p>
          </div>
          <Annotated screen={hero.screens[0]} accent={hero.accent} />
        </div>
      </section>

      <section className="section-head sheet" aria-labelledby="selected">
        <div className="aside" />
        <div className="col">
          <h2 id="selected">Selected work</h2>
          <p className="section-sub">
            Three recent engagements. Every case study opens with the screens,
            annotated the way I'd hand them to engineering.
          </p>
        </div>
      </section>
      {featured.map((c) => (
        <CaseRow key={c.slug} c={c} />
      ))}

      <section className="approach" aria-labelledby="approach">
        <div className="sheet">
          <div className="aside" />
          <div className="col">
            <h2 id="approach">{home.approach.title}</h2>
          </div>
        </div>
        {home.approach.paragraphs.map((p, i) => (
          <div className="sheet note-row" key={i}>
            <p className="aside margin-note">{home.approach.notes[i]}</p>
            <div className="col">
              <p className="prose-lg">{p}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="sheet index-section" aria-labelledby="index">
        <p className="aside margin-note">
          Six of the projects I can show publicly. Others are under NDA and
          happy to discuss.
        </p>
        <div className="col">
          <h2 id="index">Index</h2>
          <table className="index-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Project</th>
                <th scope="col">Client</th>
                <th scope="col">Discipline</th>
                <th scope="col">Platform</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.slug}>
                  <td className="num">{c.year}</td>
                  <td>
                    <Link to={`/work/${c.slug}`}>{c.title}</Link>
                  </td>
                  <td>{c.client}</td>
                  <td>{c.disciplines.join(", ")}</td>
                  <td>{c.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sheet play-teaser" aria-labelledby="play">
        <p className="aside margin-note">
          Drag the red handles. The top puck follows your curve.
        </p>
        <div className="col">
          <h2 id="play">From the playground</h2>
          <p className="section-sub">
            Small tools I build for my own projects. This one settles arguments
            about motion before they reach a design review.
          </p>
          <EasingLab showPresets={false} />
          <p>
            <Link to="/playground" className="text-link">
              Open the playground — type scale and contrast tools too{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="sheet words" aria-labelledby="words">
        <div className="aside" />
        <div className="col">
          <h2 id="words" className="visually-hidden">
            Kind words
          </h2>
          <figure className="quote-lead">
            <blockquote>
              <p>{lead.text}</p>
            </blockquote>
            <figcaption>
              {lead.by}, {lead.role}
            </figcaption>
          </figure>
          <div className="quote-pair">
            {quotes.map((q) => (
              <figure key={q.by}>
                <blockquote>
                  <p>{q.text}</p>
                </blockquote>
                <figcaption>
                  {q.by}, {q.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sheet teams" aria-labelledby="teams">
        <div className="aside" />
        <div className="col">
          <h2 id="teams" className="h-small">
            Teams I've worked with
          </h2>
          <ul className="team-run">
            {home.teams.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sheet now" aria-labelledby="now">
        <p className="aside margin-note">Updated October 2026.</p>
        <div className="col">
          <h2 id="now">Now</h2>
          <dl className="now-list">
            {home.now.map((n) => (
              <div key={n.label}>
                <dt>{n.label}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="close" aria-labelledby="close">
        <div className="sheet">
          <div className="aside" />
          <div className="col">
            <h2 id="close" className="display">
              {home.close.title}
            </h2>
            <p className="lead">{home.close.text}</p>
            <div className="actions">
              <Link to="/contact" className="btn btn-paper">
                Start a project <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href={"mailto:" + brand.email} className="btn btn-line">
                <Mail size={18} aria-hidden="true" /> {brand.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
