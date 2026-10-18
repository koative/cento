import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { planner } from "../content";
import { CarePlanner } from "../components/CarePlanner";

export function Planner() {
  return (
    <>
      <section className="page-head wrap">
        <h1>{planner.title}</h1>
        <p className="lede">{planner.lede}</p>
      </section>

      <section className="section wrap" aria-label="Care card">
        <CarePlanner />
      </section>

      <section className="section wrap">
        <dl className="note-columns">
          {planner.notes.map((n) => (
            <div key={n.title}>
              <dt>{n.title}</dt>
              <dd>{n.text}</dd>
            </div>
          ))}
        </dl>
        <Link to="/services/wellness-and-vaccines" className="text-link">
          How our wellness exams work <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
