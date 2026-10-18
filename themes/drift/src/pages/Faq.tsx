import { ChevronDown } from "lucide-react";
import { Link } from "../router";
import { bring, brand, faqs } from "../content";

export function Faq() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Questions, answered</h1>
          <p className="lede">
            The things people ask at the hut most often. Anything else, call{" "}
            <a href={brand.phoneHref}>{brand.phone}</a> or email{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </div>
      </section>

      <div className="wrap faq-layout">
        <div className="faq-groups">
          {faqs.map((g, n) => (
            <section key={g.title} aria-labelledby={`faq-${n}`}>
              <h2 id={`faq-${n}`}>{g.title}</h2>
              {g.items.map((i) => (
                <details key={i.q} className="faq">
                  <summary>
                    <span>{i.q}</span>
                    <ChevronDown aria-hidden="true" size={20} />
                  </summary>
                  <p>{i.a}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
        <aside className="faq-aside" aria-labelledby="h-pack">
          <h2 id="h-pack">What to bring</h2>
          <ul className="ticks">
            {bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p>Boards, wetsuits, boots in winter and hot showers are on us.</p>
          <Link to="/book" className="btn btn-ink">
            Book a lesson
          </Link>
        </aside>
      </div>
    </>
  );
}
