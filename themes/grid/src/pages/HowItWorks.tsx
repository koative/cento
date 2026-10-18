import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { howItWorks, images } from "../content";
import { Faq, PageHead, Photo } from "../components/Bits";

export default function HowItWorks() {
  return (
    <>
      <PageHead title={howItWorks.title} lead={howItWorks.intro} />

      <section className="wrap" aria-label="The six steps">
        <ol className="steps">
          {howItWorks.steps.map((s, i) => (
            <li key={s.title}>
              <div className="step-head">
                <span className="step-n num" aria-hidden="true">
                  {i + 1}
                </span>
                <h2>{s.title}</h2>
                <span className="num when">{s.time}</span>
              </div>
              <dl>
                <div>
                  <dt>What we do</dt>
                  <dd>{s.we}</dd>
                </div>
                <div>
                  <dt>What you do</dt>
                  <dd>{s.you}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap install-day">
        <div>
          <h2>Installation day, hour by hour</h2>
          <p>
            A typical 16-panel job with one battery. Larger systems and tile
            roofs run into a second or third day.
          </p>
          <ol className="hours">
            {howItWorks.installDay.map(([t, what]) => (
              <li key={t}>
                <span className="num">{t}</span>
                {what}
              </li>
            ))}
          </ol>
        </div>
        <Photo img={images.installerRails} className="install-photo" />
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>What we put in writing</h2>
        </div>
        <ul className="guarantees guarantees-wide">
          {howItWorks.guarantees.map((g) => (
            <li key={g.title}>
              <strong>{g.title}</strong>
              <span>{g.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap faq-section">
        <div className="section-head">
          <h2>Common questions</h2>
        </div>
        <Faq items={howItWorks.faqs} />
        <p className="section-foot">
          <Link to="/quote" className="btn btn-sun">
            Book a free survey <ArrowRight size={18} aria-hidden />
          </Link>
        </p>
      </section>
    </>
  );
}
