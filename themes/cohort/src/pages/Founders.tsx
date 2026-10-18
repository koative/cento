import { ChevronDown } from "lucide-react";
import { Link } from "../router";
import { faqs, process, terms } from "../content";
import { RoundModeller } from "../components/RoundModeller";

export function Founders() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>What it is like to take our money.</h1>
        <p className="lede">
          Our terms are published, our process takes ten days and every pitch
          gets an answer. Here is all of it, before you spend an hour on a call.
        </p>
      </header>

      <section className="section wrap founders-terms" aria-labelledby="terms">
        <div>
          <h2 id="terms" className="section-title">
            Our standard terms
          </h2>
          <p className="section-sub">
            This is the whole term sheet in plain language. We do not negotiate
            the lines below in our favour, and we do not add new ones late.
          </p>
        </div>
        <dl className="terms">
          {terms.map((t) => (
            <div key={t.term}>
              <dt>{t.term}</dt>
              <dd>{t.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap" aria-labelledby="process">
        <h2 id="process" className="section-title">
          From deck to decision
        </h2>
        <ol className="timeline">
          {process.map((p) => (
            <li key={p.day}>
              <p className="timeline-day">{p.day}</p>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band" aria-labelledby="modeller">
        <div className="wrap">
          <div className="section-head">
            <h2 id="modeller">The round modeller</h2>
            <p className="section-sub">
              Set your pre-money, the size of the raise and the option pool your
              investors want. The bars show who owns what before and after.
              Switch who pays for the pool top-up to see why we create it
              post-money.
            </p>
          </div>
          <RoundModeller />
        </div>
      </section>

      <section className="section wrap-narrow" aria-labelledby="faq">
        <h2 id="faq" className="section-title">
          Questions founders ask us
        </h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <ChevronDown aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>Ready when you are.</h2>
          <p>
            The pitch form takes about six minutes. A deck link and one honest
            line about your first customer is enough.
          </p>
          <div className="actions">
            <Link to="/pitch" className="btn btn-paper">
              Open the pitch form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
