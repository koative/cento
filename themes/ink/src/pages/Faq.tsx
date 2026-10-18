import { Plus } from "lucide-react";
import { Link } from "../router";
import { brand, faqPage } from "../content";

export function Faq() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{faqPage.title}</h1>
        <p className="lede">{faqPage.intro}</p>
      </header>

      <div className="wrap faq-grid">
        <div className="faq-groups">
          {faqPage.groups.map((g) => (
            <section key={g.title} aria-labelledby={`faq-${g.title}`}>
              <h2 id={`faq-${g.title}`}>{g.title}</h2>
              {g.items.map((i) => (
                <details key={i.q} className="faq">
                  <summary>
                    {i.q}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{i.a}</p>
                </details>
              ))}
            </section>
          ))}
        </div>

        <aside className="policies" aria-labelledby="policies-title">
          <h2 id="policies-title">{faqPage.policiesTitle}</h2>
          <dl>
            {faqPage.policies.map((p) => (
              <div key={p.term}>
                <dt>{p.term}</dt>
                <dd>{p.detail}</dd>
              </div>
            ))}
          </dl>
          <p>
            Still wondering? <a href={`mailto:${brand.email}`}>{brand.email}</a>{" "}
            or <Link to="/book">send a booking request</Link> with your question
            in the notes.
          </p>
        </aside>
      </div>
    </div>
  );
}
