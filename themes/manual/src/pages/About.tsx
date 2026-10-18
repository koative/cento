import { Link } from "../router";
import { about, articles } from "../content";
import { formatDay } from "../lib/manual";
import { Avatar } from "../components/Avatar";

const lifecycle = [
  {
    title: "A ticket repeats",
    text: "Three shops ask the same thing in a week, or one question takes a specialist more than ten minutes to answer.",
  },
  {
    title: "The specialist drafts it",
    text: "Whoever answered writes the first version, in the words shops actually used on the phone.",
  },
  {
    title: "Someone else tests it",
    text: "A second person follows every step on a fresh register and reader, and rewrites anything they had to guess.",
  },
  {
    title: "It's published and numbered",
    text: "The article gets a chapter number that never changes, so support can point to it out loud.",
  },
  {
    title: "It's re-tested every 90 days",
    text: "Or the same week the app changes, whichever comes first. The revised date is the last test.",
  },
];

export function About() {
  return (
    <div className="wrap about-page">
      <header className="page-head about-head">
        <h1>{about.title}</h1>
        <p className="lead">{about.lead}</p>
      </header>

      <section className="section-tight" aria-labelledby="principles">
        <h2 id="principles">House style</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="section-tight lifecycle-section"
        aria-labelledby="lifecycle"
      >
        <h2 id="lifecycle">How an article gets made</h2>
        <ol className="lifecycle">
          {lifecycle.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="muted">
          {articles.length} articles are live today. The newest was revised on{" "}
          {formatDay(
            [...articles].sort((a, b) => b.updated.localeCompare(a.updated))[0]
              .updated,
          )}
          .
        </p>
      </section>

      <section className="section-tight" aria-labelledby="team">
        <h2 id="team">Colophon: the support team</h2>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Support team"
        >
          <table className="roster">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Based in</th>
                <th scope="col">Languages</th>
                <th scope="col">Since</th>
              </tr>
            </thead>
            <tbody>
              {about.team.map((p) => (
                <tr key={p.name}>
                  <th scope="row">
                    <span className="roster-name">
                      <Avatar name={p.name} staff />
                      {p.name}
                    </span>
                  </th>
                  <td>{p.role}</td>
                  <td>{p.base}</td>
                  <td>{p.languages}</td>
                  <td className="num">{p.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="commit">
        <h2 id="commit">What we commit to</h2>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Response commitments"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Request</th>
                <th scope="col">Response</th>
                <th scope="col">Staffed</th>
              </tr>
            </thead>
            <tbody>
              {about.commitments.map(([req, resp, when]) => (
                <tr key={req}>
                  <th scope="row">{req}</th>
                  <td>{resp}</td>
                  <td>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="close close-inline" aria-labelledby="fix">
        <div>
          <h2 id="fix">Found a step that doesn't match your screen?</h2>
          <p>
            Tell us the article number and what you see instead. Corrections go
            live within two business days, and we'll email you when it's fixed.
          </p>
        </div>
        <Link to="/contact" className="btn btn-primary">
          Report a correction
        </Link>
      </section>
    </div>
  );
}
