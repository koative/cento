import { Plus } from "lucide-react";
import { Link } from "../router";
import { brand, faq, grades, type Grade } from "../content";
import { Blaze } from "../components/Marks";

export function Faq() {
  return (
    <>
      <header className="page-head wrap">
        <h1>FAQ & policies</h1>
        <p className="lede">
          Fitness, payments, cancellations and what happens when the weather
          turns. If your question isn't here, the planning desk answers within a
          working day.
        </p>
      </header>

      <div className="wrap faq-layout">
        <div>
          {faq.map((g, gi) => (
            <section
              key={g.group}
              className="faq-group"
              aria-labelledby={`faq-${gi}`}
            >
              <h2 id={`faq-${gi}`}>{g.group}</h2>
              {g.items.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
        <aside className="faq-aside">
          <h2>Grades in one look</h2>
          <dl>
            {([1, 2, 3] as Grade[]).map((g) => (
              <div key={g}>
                <dt>
                  <Blaze grade={g} />
                </dt>
                <dd>
                  {grades[g].hours}, {grades[g].ascent}.
                </dd>
              </div>
            ))}
          </dl>
          <h2>Still wondering?</h2>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            {brand.hours}
          </p>
          <Link to="/route-finder" className="btn btn-ghost">
            Try the route finder
          </Link>
        </aside>
      </div>
    </>
  );
}
