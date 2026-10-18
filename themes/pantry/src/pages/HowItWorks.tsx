import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, faqs, how } from "../content";
import { Faq } from "../components/Bits";

export function HowItWorks() {
  return (
    <div className="page how">
      <header className="page-head">
        <h1>{how.title}</h1>
        <p className="lead">{how.lead}</p>
      </header>

      <ol className="how-steps">
        {how.steps.map((s, i) => (
          <li key={s.title}>
            <img
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.w}
              height={s.image.h}
              loading={i ? "lazy" : undefined}
            />
            <div>
              <span className="step-no" aria-hidden="true">
                {i + 1}
              </span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="section anatomy">
        <div>
          <h2>What’s inside, top to bottom</h2>
          <p>
            We pack in the order you unpack. Cards first, cold things last and
            lowest, where the ice keeps them coldest.
          </p>
        </div>
        <figure className="layers">
          <svg
            viewBox="0 0 360 300"
            role="img"
            aria-label="Cut-away diagram of the box showing five layers"
          >
            {how.layers.map((l, i) => {
              const y = 40 + i * 44;
              return (
                <g key={l.label} className={"layer layer-" + i}>
                  <path d={`M60 ${y}l120-26 120 26-120 26Z`} />
                  <path
                    className="side"
                    d={`M60 ${y}v14l120 26v-14ZM300 ${y}v14l-120 26v-14Z`}
                  />
                </g>
              );
            })}
          </svg>
          <figcaption>
            <ol>
              {how.layers.map((l) => (
                <li key={l.label}>
                  <b>{l.label}</b> {l.body}
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      </section>

      <section className="section delivery">
        <h2>Timing and delivery</h2>
        <dl className="spec-list">
          {how.delivery.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section policies">
        <h2>Skip, pause or cancel. Your call.</h2>
        <div className="policy-row">
          {how.policies.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq-section narrow">
        <h2>Questions people ask</h2>
        <Faq items={faqs} />
        <p>
          Something else? Write to{" "}
          <a href={"mailto:" + brand.email}>{brand.email}</a> and a person in
          the kitchen answers, usually within the hour.
        </p>
      </section>

      <section className="section cta-band">
        <h2>Ready when you are</h2>
        <div className="actions">
          <Link to="/plans" className="btn btn-big">
            Build your box <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/menu" className="btn btn-ghost btn-big">
            See this week’s menu
          </Link>
        </div>
      </section>
    </div>
  );
}
