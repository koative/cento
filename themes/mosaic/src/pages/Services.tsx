import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { faqs, images, services } from "../content";

// Which service includes what: one column per service, in the order of `services`.
const matrix: [string, boolean[]][] = [
  ["Sample board to keep", [true, true, true, true]],
  ["Measured survey", [false, true, true, true]],
  ["Layout and lighting plans", [false, true, true, true]],
  ["Joinery and bathroom drawings", [false, false, true, true]],
  ["Procurement at trade price", [false, true, true, true]],
  ["Fortnightly site visits", [false, false, true, true]],
  ["Installation and styling", [false, false, true, true]],
  ["Contract-grade specification", [false, false, false, true]],
];

export function Services() {
  return (
    <>
      <header className="page-head">
        <h1>Services and fees</h1>
        <p className="lede">
          Four ways to work with us, from a two-hour session at the sample table
          to a full hotel fit-out. Fees are fixed or a stated percentage — never
          a markup on what you buy.
        </p>
      </header>

      <section className="section" aria-label="Services">
        {services.map((s) => (
          <article key={s.id} className="service">
            <div className="service-price">
              <h2>{s.name}</h2>
              <p className="service-fee-big tabular">{s.fee}</p>
              <p className="fine">{s.feeNote}</p>
              <p className="fine">Typical length: {s.duration}</p>
            </div>
            <div className="service-body">
              <p>{s.summary}</p>
              <ul className="ticks">
                {s.includes.map((i) => (
                  <li key={i}>
                    <Check size={16} aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="service-for">
                <strong>Best for</strong> {s.forWho}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="section">
        <h2>What each service includes</h2>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Comparison of services"
        >
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Included</th>
                {services.map((s) => (
                  <th key={s.id} scope="col">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map(([label, row]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {row.map((yes, i) => (
                    <td key={services[i].id}>
                      {yes ? (
                        <Check size={18} aria-hidden="true" />
                      ) : (
                        <Minus
                          size={18}
                          aria-hidden="true"
                          className="muted-icon"
                        />
                      )}
                      <span className="visually-hidden">
                        {yes ? "Included" : "Not included"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section image-note">
        <img
          src={images.sageBedroom}
          alt="Bedroom with sage walls, a green duvet, orange cushions, a rattan pendant and trailing plants"
          loading="lazy"
        />
        <div>
          <h2>A single room, done properly</h2>
          <p>
            This primary bedroom was a Single room project: eight weeks, one
            sample board, a sage limewash, oak floor kept and re-oiled, and a
            rattan pendant found at a salvage yard in Biddeford. The fee was
            $5,200.
          </p>
          <Link to="/consultation" className="btn">
            Start with a consultation
          </Link>
        </div>
      </section>

      <section className="section faq">
        <h2>Questions we are asked</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
