import { about, images, team } from "../content";
import { Link } from "../router";

export function About() {
  return (
    <>
      <section className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lead">{about.lead}</p>
      </section>

      <section className="wrap story">
        <img
          src={images.tallWall}
          alt="Looking up a tall wall dense with coloured holds and rope lines"
          width={768}
          height={1024}
        />
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>{about.setting.title}</h2>
          {about.setting.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            See the result on the <Link to="/routes">route map</Link>, or come
            to the next{" "}
            <Link to="/events/setters-choice-night">Setters' Choice Night</Link>
            .
          </p>
        </div>
      </section>

      <section className="band-dark" aria-labelledby="values-title">
        <div className="wrap values">
          <h2 id="values-title">What we hold on to</h2>
          <dl>
            {about.values.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap" aria-labelledby="team-title">
        <h2 id="team-title">Setters, coaches and the desk</h2>
        <ul className="team-list">
          {team.map((p) => (
            <li key={p.id}>
              <span className="initials" aria-hidden="true">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <h3>{p.name}</h3>
              <p className="team-role">{p.role}</p>
              <p>{p.bio}</p>
              <p className="team-meta">
                {p.since} · Favourite style: {p.style}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap facilities" aria-labelledby="fac-title">
        <div>
          <h2 id="fac-title">In the building</h2>
          <img
            src={images.holds}
            alt="Yellow, blue and purple holds bolted onto a white volume"
            width={1024}
            height={768}
            loading="lazy"
          />
        </div>
        <dl className="fac-list">
          {about.facilities.map((f) => (
            <div key={f.name}>
              <dt>{f.name}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
