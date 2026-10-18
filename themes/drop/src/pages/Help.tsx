import { SizeTable } from "../components/SizeTable";
import { brand, faqs, policies, sizeGuide } from "../content";

export function Help() {
  return (
    <div className="page help-page">
      <header className="page-head">
        <h1>Help &amp; sizing</h1>
        <p className="lead">
          Shipping, returns, raffles and how our boxy fit actually measures.
          Still stuck? Email <a href={`mailto:${brand.email}`}>{brand.email}</a>
          ; Kit answers Tuesday to Saturday.
        </p>
      </header>

      <section className="policies" aria-label="Policies">
        {policies.map((p) => (
          <div key={p.title}>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </div>
        ))}
      </section>

      <section className="section" aria-labelledby="h-sizes">
        <h2 id="h-sizes">Size guide</h2>
        <div className="size-guides">
          {sizeGuide.map((g) => (
            <div key={g.name} className="size-guide">
              <h3>{g.name}</h3>
              <p className="muted small">{g.note}</p>
              <SizeTable guide={g} />
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} className="disclosure">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
