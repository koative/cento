import { X } from "lucide-react";
import { brand, security } from "../content";

export default function Security() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{security.heading}</h1>
        <p className="lede">{security.lede}</p>
      </header>

      <section className="wrap" aria-labelledby="practice-h">
        <h2 id="practice-h" className="section-title">
          How it works, line by line
        </h2>
        <dl className="ruled-list ruled-wide">
          {security.practices.map((p) => (
            <div key={p.label}>
              <dt>{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band band-plum" aria-labelledby="never-h">
        <div className="wrap split">
          <h2 id="never-h">Things Ledger will never do</h2>
          <ul className="never-list">
            {security.never.map((n) => (
              <li key={n}>
                <X size={18} aria-hidden />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="sfaq-h">
        <h2 id="sfaq-h">If something goes wrong</h2>
        {security.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <p className="quiet-note">
          Urgent? Call{" "}
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a> or
          write to{" "}
          <a href="mailto:security@ledger.example">security@ledger.example</a>.
        </p>
      </section>
    </>
  );
}
