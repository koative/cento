import { Check } from "lucide-react";
import { approachPage, home } from "../content";
import { Readout } from "../components/Readout";
import { CloseBand } from "../components/CloseBand";

export function Approach() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>{approachPage.h1}</h1>
          <p className="lede">{approachPage.lede}</p>
        </div>
      </header>

      <section className="section-tight" aria-labelledby="week-title">
        <div className="wrap">
          <h2 id="week-title" className="h-lg">
            {home.loopTitle}
          </h2>
          <ol className="loop">
            {home.loop.map((d) => (
              <li key={d.day}>
                <span className="loop-day">{d.day}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section timeline-section"
        aria-labelledby="ninety-title"
      >
        <div className="wrap">
          <h2 id="ninety-title" className="h-lg">
            {approachPage.ninetyTitle}
          </h2>
          <ol className="timeline">
            {approachPage.ninety.map((w) => (
              <li key={w.span}>
                <span className="timeline-span">{w.span}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="stats-title">
        <div className="wrap two-col">
          <div>
            <h2 id="stats-title" className="h-lg">
              {approachPage.statsTitle}
            </h2>
            <p>{approachPage.statsText}</p>
          </div>
          <Readout
            rows={home.board.slice(2).map((b) => ({ ...b, name: b.test }))}
          />
        </div>
      </section>

      <section className="section-tight" aria-labelledby="need-title">
        <div className="wrap svc-grid">
          <h2 id="need-title" className="h-lg">
            {approachPage.needTitle}
          </h2>
          <ul className="ticks ticks-big">
            {approachPage.need.map((n) => (
              <li key={n}>
                <Check aria-hidden="true" /> {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap svc-grid">
          <h2 id="faq-title" className="h-lg">
            {approachPage.faqTitle}
          </h2>
          <div className="faq">
            {approachPage.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CloseBand />
    </>
  );
}
