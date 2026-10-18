import { Link } from "../router";
import { brand, commissions, findFrame } from "../content";

export function Commissions() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Commissions</h1>
        <p className="lede">{commissions.intro}</p>
        <p className="page-note">{brand.booking}.</p>
      </header>

      <section aria-label="Disciplines" className="disciplines">
        {commissions.disciplines.map((d) => {
          const img = findFrame(d.image)!;
          return (
            <article key={d.id} className="discipline">
              <figure>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                />
                <figcaption className="label">
                  <span>
                    {img.title}, from <em>{img.series.title}</em>
                  </span>
                </figcaption>
              </figure>
              <div className="discipline-text">
                <h2>{d.name}</h2>
                <p>{d.body}</p>
                <ul className="ticks">
                  {d.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="rate">{d.rate}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section" aria-labelledby="h-process">
        <h2 id="h-process">How a commission runs</h2>
        <ol className="process">
          {commissions.process.map((p, i) => (
            <li key={p.title}>
              <span className="process-step" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <p className="process-time">{p.time}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section rates-wrap" aria-labelledby="h-rates">
        <div>
          <h2 id="h-rates">Rates</h2>
          <p>
            Fixed quotes, agreed in the treatment before anything is booked.
            Prices are in US dollars and exclude sales tax and film processing.
          </p>
        </div>
        <table className="rates">
          <caption className="visually-hidden">Commission rates</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {commissions.rates.map((r) => (
              <tr key={r.item}>
                <th scope="row">{r.item}</th>
                <td>{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section testimonials" aria-label="What clients say">
        {commissions.testimonials.map((t) => (
          <blockquote className="quote" key={t.name}>
            <p>{t.quote}</p>
            <footer>
              {t.name}, {t.role}
            </footer>
          </blockquote>
        ))}
      </section>

      <section className="section faq" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions editors ask</h2>
        <div className="faq-list">
          {commissions.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="close" aria-labelledby="h-close">
        <h2 id="h-close">Tell me about the job</h2>
        <p>
          Dates, place, where the pictures will run. A rough budget helps me
          write an honest treatment.
        </p>
        <div className="actions">
          <Link to="/contact?type=commission" className="btn btn-solid">
            Start a commission enquiry
          </Link>
          <a href={brand.phoneHref} className="text-link">
            {brand.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
