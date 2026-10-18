import { episodes, hosts, shows, type Host } from "../content";
import { Link } from "../router";
import { Cover } from "../components/Cover";
import { EpisodeRow } from "../components/EpisodeRow";

export function HostPage({ host }: { host: Host }) {
  const hosted = shows.filter((s) => s.hosts.includes(host.slug));
  const eps = episodes.filter((e) => hosted.some((s) => s.slug === e.show));
  const others = hosts.filter((h) => h.slug !== host.slug).slice(0, 4);

  return (
    <>
      <section className="wrap host-hero">
        <img src={host.photo} alt={host.alt} width={720} height={900} />
        <div>
          <p className="crumbs">
            <Link to="/hosts">Hosts</Link> <span aria-hidden="true">/</span>{" "}
            {host.role}
          </p>
          <h1>{host.name}</h1>
          <p className="host-quote">“{host.quote}”</p>
          {host.bio.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <dl className="host-facts">
            <div>
              <dt>Based in</dt>
              <dd>{host.basedIn}</dd>
            </div>
            <div>
              <dt>On their headphones</dt>
              <dd>
                <ul>
                  {host.onHeadphones.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wrap" aria-labelledby="hosted-h">
        <h2 id="hosted-h">{hosted.length > 1 ? "Shows" : "Show"}</h2>
        <ul className="host-shows">
          {hosted.map((s) => (
            <li key={s.slug}>
              <Link to={`/shows/${s.slug}`} className="host-show">
                <Cover show={s} />
                <span>
                  <span className="shelf-title">{s.title}</span>
                  <span className="shelf-line">{s.tagline}</span>
                  <span className="shelf-cadence">{s.cadence}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap" aria-labelledby="eps-h">
        <h2 id="eps-h">Recent episodes</h2>
        <ul className="ep-list">
          {eps.map((e) => (
            <EpisodeRow key={e.id} ep={e} />
          ))}
        </ul>
      </section>

      <section className="wrap" aria-labelledby="others-h">
        <h2 id="others-h">Other voices on Chapter</h2>
        <ul className="voices-list voices-4">
          {others.map((h) => (
            <li key={h.slug}>
              <Link to={`/hosts/${h.slug}`} className="voice">
                <img
                  src={h.photo}
                  alt=""
                  loading="lazy"
                  width={720}
                  height={900}
                />
                <span className="voice-name">{h.name}</span>
                <span className="voice-role">{h.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
