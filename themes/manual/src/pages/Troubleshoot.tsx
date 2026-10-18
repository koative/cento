import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { flows, type Flow } from "../content";
import { categoryOf } from "../lib/manual";
import { Troubleshooter } from "../components/Troubleshooter";

export function Troubleshoot({ flow }: { flow?: Flow }) {
  return (
    <div className="wrap ts-page">
      <header className="page-head">
        <h1>{flow ? flow.title : "Troubleshooter"}</h1>
        <p className="lead">
          {flow
            ? `${flow.summary} Answer each question; you can change any earlier answer and the path redraws from there.`
            : "Pick what's going wrong. Each troubleshooter is the same set of questions our specialists ask on the phone, in the same order."}
        </p>
      </header>

      <div className="ts-page-grid">
        <nav aria-label="Troubleshooters" className="flow-picker">
          <ul>
            {flows.map((f) => (
              <li key={f.id}>
                <Link to={`/troubleshoot/${f.id}`}>
                  <span className="flow-title">{f.title}</span>
                  <span className="flow-sub">{f.summary}</span>
                  <span className="flow-ch">
                    {categoryOf(f.category)?.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="muted">
            Not listed? <Link to="/search">Search the manual</Link> or{" "}
            <Link to="/contact">contact support</Link>.
          </p>
        </nav>

        {flow ? (
          <section
            className="ts-sheet"
            aria-label={`${flow.title} troubleshooter`}
          >
            <Troubleshooter key={flow.id} flow={flow} />
          </section>
        ) : (
          <section className="ts-sheet ts-blank" aria-labelledby="how">
            <h2 id="how">How it works</h2>
            <ol className="qs-steps">
              <li>
                <h3>Answer what you can see</h3>
                <p>
                  Questions ask about lights, labels and messages on your own
                  screen, never about what's going on inside.
                </p>
              </li>
              <li>
                <h3>Change your mind freely</h3>
                <p>
                  Every answer stays pinned on the path. Change one and only the
                  steps after it are asked again.
                </p>
              </li>
              <li>
                <h3>Hand over, don't start over</h3>
                <p>
                  If the path ends with us, your answers are copied into the
                  support form so nobody asks them twice.
                </p>
              </li>
            </ol>
            <Link
              to={`/troubleshoot/${flows[0].id}`}
              className="btn btn-primary"
            >
              Start with “{flows[0].title}” <ArrowRight aria-hidden="true" />
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
