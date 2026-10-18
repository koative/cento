import { brand, plan, policies } from "../content";
import { Link } from "../router";

export function Plan() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{plan.title}</h1>
        <p className="lede">{plan.lede}</p>
      </header>

      <section className="section wrap plan-arrive" aria-labelledby="arrive-h">
        <div>
          <h2 id="arrive-h">Getting here</h2>
          <dl className="defs">
            {plan.arrive.map((a) => (
              <div key={a.mode}>
                <dt>{a.mode}</dt>
                <dd>{a.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <img src={plan.map.src} alt={plan.map.alt} width={1280} height={853} />
      </section>

      <section className="section band-linen" aria-labelledby="when-h">
        <div className="wrap plan-cols">
          <div>
            <h2 id="when-h">When we are open</h2>
            <p>{plan.seasonsText}</p>
            <h3>House rules</h3>
            <ul className="plain-list">
              {policies.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>What to pack</h2>
            <ul className="plain-list">
              {plan.pack.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link to="/book" className="btn btn-primary">
              Check availability
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions guests ask</h2>
        {plan.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <section
        className="section wrap contact-block"
        aria-labelledby="contact-h"
      >
        <h2 id="contact-h">Write or call</h2>
        <p>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <br />
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>,
          daily 08:00–20:00
        </p>
        <address>
          {brand.address.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </address>
      </section>
    </>
  );
}
