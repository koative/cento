import { Link } from "../router";
import { connectors, customers } from "../content";
import { Mark } from "../components/bits";

export default function Customers() {
  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{customers.heading}</h1>
        <p className="lede">{customers.lede}</p>
      </header>
      <ol className="stories">
        {customers.stories.map((s) => {
          const wired = s.wiring.map((slug) =>
            connectors.find((c) => c.slug === slug)!,
          );
          return (
            <li key={s.company} className="story">
              <div className="story-who">
                <p className="story-company">{s.company}</p>
                <p className="muted">{s.kind}</p>
                <ul className="wiring" aria-label="Connectors used">
                  {wired.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/connectors/${c.slug}`}>
                        <Mark connector={c} size="sm" />
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="story-body">
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
                <p className="story-result">{s.result}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <aside className="callout">
        <h2>Draw your own wiring diagram</h2>
        <p>
          Start in Sandbox with test credentials, then switch the key when it
          works.
        </p>
        <Link to="/signup" className="btn btn-signal">
          Create a free workspace
        </Link>
      </aside>
    </div>
  );
}
