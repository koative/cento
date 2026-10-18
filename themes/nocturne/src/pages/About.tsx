import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, images, system } from "../content";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.lead}</p>
      </header>

      <section className="wrap story">
        <figure className="story-media">
          <img
            src={images.bartender.src}
            alt={images.bartender.alt}
            width={images.bartender.w}
            height={images.bartender.h}
          />
        </figure>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section section-walnut">
        <div className="wrap split">
          <div>
            <h2>{about.systemTitle}</h2>
            <p className="lede">{about.systemText}</p>
            <ol className="signal-chain">
              {system.map((s) => (
                <li key={s.part}>
                  <h3>{s.part}</h3>
                  <p>{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <figure className="arch">
            <img
              src={images.amplifier.src}
              alt={images.amplifier.alt}
              width={images.amplifier.w}
              height={images.amplifier.h}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="people">
        <div className="section-head">
          <h2 id="people">{about.teamTitle}</h2>
          <p>{about.teamText}</p>
        </div>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.text}</p>
              <p className="team-listening">
                Always reaches for <em>{t.listening}</em>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-rule">
        <div className="wrap split split-text">
          <div>
            <h2>{about.rulesTitle}</h2>
            <p className="lede">{about.rulesText}</p>
            <figure className="crate-figure">
              <img
                src={images.crate.src}
                alt={images.crate.alt}
                width={images.crate.w}
                height={images.crate.h}
                loading="lazy"
              />
            </figure>
          </div>
          <dl className="spec-list">
            {about.rules.map((r) => (
              <div key={r.term}>
                <dt>{r.term}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-rule wrap faq" aria-labelledby="faq">
        <h2 id="faq">{about.faqTitle}</h2>
        <div className="disclosures">
          {about.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="section-more">
          {brand.street}, {brand.city}.{" "}
          <Link to="/reservations" className="text-link">
            Book a table <ArrowRight aria-hidden="true" />
          </Link>
        </p>
      </section>
    </>
  );
}
