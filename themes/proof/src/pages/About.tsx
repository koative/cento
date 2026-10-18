import { ArrowRight } from "lucide-react";
import { images, story, team } from "../content";
import { Link } from "../router";

export function About() {
  return (
    <>
      <header className="page-head page-head-split">
        <div>
          <h1>{story.title}</h1>
          <p className="lede">{story.lede}</p>
        </div>
        <img
          src={images.braided}
          alt="A braided loaf, proofed and ready for the oven"
          width={1500}
          height={999}
        />
      </header>

      <section className="section timeline" aria-labelledby="years-title">
        <h2 id="years-title">Ten years on Mill Lane</h2>
        <ol>
          {story.chapters.map((c) => (
            <li key={c.year}>
              <span className="year">{c.year}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section principles" aria-labelledby="how-title">
        <h2 id="how-title">How we bake</h2>
        <div className="principles-list">
          {story.principles.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section team" aria-labelledby="team-title">
        <div className="section-head">
          <h2 id="team-title">Who's in the bakehouse</h2>
          <p>
            Five of us on the benches, with a few more on the counter. The first
            one in turns the ovens on at 3:30.
          </p>
        </div>
        <ul className="team-list">
          {team.map((t) => (
            <li key={t.name}>
              <span className="team-shift">{t.shift}</span>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section split-note">
        <h2>Bake with us</h2>
        <p>
          Hester, Tomas, Odile and Priya all teach upstairs. The easiest way to
          meet them is with your hands in a bowl of dough.
        </p>
        <Link to="/classes" className="text-link">
          See the class calendar <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
