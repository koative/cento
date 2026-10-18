import { Link } from "../router";
import { about, brand } from "../content";

export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.heading}</h1>
      </header>
      <section className="wrap about-story" aria-label="Our story">
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <svg
          className="about-diagram"
          viewBox="0 0 320 260"
          role="img"
          aria-label="The first Flux workflow: a spreadsheet row, a script, a chat message"
        >
          <path
            d="M60 60v60a20 20 0 0 0 20 20h160a20 20 0 0 1 20 20v40"
            fill="none"
            stroke="var(--plum)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="20"
            y="24"
            width="120"
            height="44"
            rx="10"
            fill="var(--card)"
            stroke="var(--line-strong)"
          />
          <text x="80" y="51" textAnchor="middle">
            Spreadsheet row
          </text>
          <rect
            x="110"
            y="118"
            width="100"
            height="44"
            rx="10"
            fill="var(--card)"
            stroke="var(--line-strong)"
          />
          <text x="160" y="145" textAnchor="middle">
            A script
          </text>
          <rect
            x="190"
            y="200"
            width="120"
            height="44"
            rx="10"
            fill="var(--plum)"
          />
          <text x="250" y="227" textAnchor="middle" fill="#fff">
            Chat message
          </text>
        </svg>
      </section>

      <section className="band wrap principles" aria-labelledby="principles-h">
        <h2 id="principles-h">What we hold to</h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band wrap" aria-labelledby="team-h">
        <h2 id="team-h">Some of the people who build Flux</h2>
        <ul className="team">
          {about.team.map((m) => (
            <li key={m.name}>
              <span className="monogram" aria-hidden="true">
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <strong>{m.name}</strong>
              <span>
                {m.role} · {m.place}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band wrap offices" aria-labelledby="offices-h">
        <h2 id="offices-h">Where we work</h2>
        <div className="office-row">
          {about.offices.map((o) => (
            <address key={o.city}>
              <strong>{o.city}</strong>
              {o.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          ))}
          <p>
            We hire a few people a year, mostly connector engineers and support.
            Write to <a href={`mailto:${brand.email}`}>{brand.email}</a> with
            something you automated and why. Buying for your team?{" "}
            <Link to="/contact">Talk to sales</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
