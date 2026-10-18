import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import { brand, patients } from "../content";
import { Faq } from "../components/Faq";

const sections = [
  ["new", "New patients"],
  ["fees", "Insurance & fees"],
  ["everyday", "Prescriptions & results"],
  ["policies", "Policies"],
  ["faq", "Questions"],
] as const;

export function Patients() {
  return (
    <>
      <header className="page-head">
        <h1>{patients.title}</h1>
        <p className="lede">{patients.lede}</p>
        <nav className="jump" aria-label="On this page">
          {sections.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <aside className="urgent">
        <p>
          <strong>Need help now?</strong> {brand.emergency} For anything else
          after hours, our nurse line is answered around the clock.
        </p>
        <a href={brand.nurseLineHref} className="btn">
          <Phone size={18} aria-hidden="true" /> {brand.nurseLine}
        </a>
      </aside>

      <section className="section split" id="new">
        <div>
          <h2>Registering as a new patient</h2>
          <ol className="steps steps-col">
            {patients.register.map((s, i) => (
              <li key={s.title}>
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/book" className="btn">
            Book an introductory visit{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="leaflet">
          <h3>What to bring to your first visit</h3>
          <ul className="ticks-plain">
            {patients.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section split" id="fees">
        <div>
          <h2>Insurance & fees</h2>
          <p>
            We accept most local plans and bill them directly. If yours isn’t
            listed, call before your first visit and we’ll check for you.
          </p>
          <ul className="plan-list">
            {patients.plans.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <table className="fees">
            <caption>Self-pay prices</caption>
            <thead>
              <tr>
                <th scope="col">Visit</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {patients.fees.map((f) => (
                <tr key={f.item}>
                  <th scope="row">{f.item}</th>
                  <td>${f.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">{patients.feesNote}</p>
        </div>
      </section>

      <section className="section" id="everyday">
        <h2>Prescriptions, results and after hours</h2>
        <div className="topic-grid">
          {patients.topics.map((t) => (
            <div key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="policies">
        <h2>Our policies, briefly</h2>
        <dl className="policy-list">
          {patients.policies.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section narrow" id="faq">
        <h2>Questions patients ask</h2>
        <Faq items={patients.faqs} />
      </section>
    </>
  );
}
