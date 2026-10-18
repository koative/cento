import { Mail, Phone } from "lucide-react";
import { brand, help } from "../content";

export function Help() {
  return (
    <div className="page help-page">
      <header className="page-head">
        <h1>{help.title}</h1>
        <p className="lede">{help.text}</p>
      </header>

      <div className="help-layout">
        <section className="faq" aria-labelledby="faq-h">
          <h2 id="faq-h">Questions we hear most</h2>
          {help.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        <aside className="help-side">
          <section aria-labelledby="ship-h">
            <h2 id="ship-h">Shipping</h2>
            <table className="ship-table">
              <thead>
                <tr>
                  <th scope="col">Method</th>
                  <th scope="col">Arrives in</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                {help.shipping.map((s) => (
                  <tr key={s.method}>
                    <th scope="row">{s.method}</th>
                    <td>{s.time}</td>
                    <td>{s.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="quiet">
              Orders placed before 1 pm ET on a weekday leave the studio the
              same day.
            </p>
          </section>
          <section aria-labelledby="contact-h" className="help-contact">
            <h2 id="contact-h">Talk to a person</h2>
            <p>
              {brand.hours}. We reply to every email within one working day.
            </p>
            <a href={"mailto:" + brand.email}>
              <Mail size={18} aria-hidden="true" /> {brand.email}
            </a>
            <a href={brand.phoneHref}>
              <Phone size={18} aria-hidden="true" /> {brand.phone}
            </a>
          </section>
        </aside>
      </div>
    </div>
  );
}
