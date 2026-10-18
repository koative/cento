import { Link } from "../router";
import { customers } from "../content";

export default function Customers() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{customers.h1}</h1>
          <p className="lede">{customers.lead}</p>
        </div>
      </section>

      {customers.stories.map((s, i) => (
        <section
          key={s.company}
          className={`story ${i % 2 ? "is-flipped" : ""}`}
          aria-labelledby={`story-${i}`}
        >
          <div className="wrap story-grid">
            <img
              src={s.image}
              alt={s.alt}
              width={900}
              height={700}
              loading={i ? "lazy" : undefined}
            />
            <div className="story-body">
              <h2 id={`story-${i}`}>{s.company}</h2>
              <p className="muted">{s.sector}</p>
              <dl className="story-dl">
                <div>
                  <dt>Before</dt>
                  <dd>{s.problem}</dd>
                </div>
                <div>
                  <dt>What changed</dt>
                  <dd>{s.change}</dd>
                </div>
              </dl>
              <table className="story-results">
                <caption className="sr-only">Results for {s.company}</caption>
                <tbody>
                  {s.results.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td className="num">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <blockquote>
                <p>“{s.quote}”</p>
                <footer>{s.person}</footer>
              </blockquote>
            </div>
          </div>
        </section>
      ))}

      <section className="close">
        <div className="wrap close-row">
          <h2>Your lane could be the next story</h2>
          <p>
            Send us a lane and a weekly volume; we come back with a rate and a
            mode comparison.
          </p>
          <div className="actions">
            <Link to="/quote" className="btn btn-primary btn-lg">
              Quote a lane
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
