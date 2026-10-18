import { about, brand } from "../content";
import { More, PageHead } from "../components/Parts";
import notepad from "../assets/notepad.jpg";

export default function About() {
  return (
    <div className="page">
      <PageHead title={about.hero.title} lede={about.hero.lede} />

      <section className="story wrap" aria-label="Our story">
        <img
          src={notepad}
          alt="Hands writing in an open planner on a wooden table beside a mug of coffee"
          width={1400}
          height={933}
        />
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="principles wrap" aria-labelledby="pr-title">
        <h2 id="pr-title">What we hold to</h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="team wrap" aria-labelledby="team-title">
        <h2 id="team-title">The team, and the chains they're on</h2>
        <ul>
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="team-day">
                <strong>{t.day}</strong> days
              </span>
              <span className="team-name">{t.name}</span>
              <span className="team-role">{t.role}</span>
              <span className="team-habit">{t.habit}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="press wrap" aria-labelledby="press-title">
        <h2 id="press-title">Press and partnerships</h2>
        <p>
          {about.press} <a href={`mailto:${brand.press}`}>{brand.press}</a>
        </p>
        <More to="/contact">Or write to support</More>
      </section>
    </div>
  );
}
