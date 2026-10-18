import { ArrowRight, Check, Phone } from "lucide-react";
import { Link } from "../router";
import { services, type Service } from "../content";
import { PageHead } from "../components/PageHead";
import { StreetLookup } from "../components/StreetLookup";

function Action({ action }: { action: Service["action"] }) {
  const inner = (
    <>
      {action.label} <ArrowRight size={18} aria-hidden="true" />
    </>
  );
  return action.to.startsWith("/") ? (
    <Link to={action.to} className="btn btn-citron btn-block">
      {inner}
    </Link>
  ) : (
    <a href={action.to} className="btn btn-citron btn-block">
      {inner}
    </a>
  );
}

export function ServicePage({ service: s }: { service: Service }) {
  const related = s.related.map((slug) =>
    services.find((x) => x.slug === slug)!,
  );

  return (
    <>
      <PageHead
        title={s.name}
        lede={s.summary}
        crumbs={[{ to: "/services", label: "Services" }]}
      >
        <dl className="head-facts">
          <div>
            <dt>Cost</dt>
            <dd>{s.fee}</dd>
          </div>
          <div>
            <dt>How long</dt>
            <dd>{s.time}</dd>
          </div>
          <div>
            <dt>Handled by</dt>
            <dd>{s.dept}</dd>
          </div>
        </dl>
      </PageHead>

      <div className="wrap service-layout">
        <article className="prose-col">
          <p className="intro">{s.intro}</p>
          {s.image && (
            <img
              className="service-img"
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.w}
              height={s.image.h}
            />
          )}

          <h2>Before you start</h2>
          <ul className="checklist">
            {s.needs.map((n) => (
              <li key={n}>
                <Check size={18} aria-hidden="true" /> {n}
              </li>
            ))}
          </ul>

          <h2>How it works</h2>
          <ol className="steps">
            {s.steps.map((st) => (
              <li key={st.title}>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>

          {s.tool === "bin-day" && (
            <section className="tool-box" aria-labelledby="tool-title">
              <h2 id="tool-title">Find your collection day</h2>
              <StreetLookup headingLevel={3} />
            </section>
          )}

          <h2>Fees</h2>
          <table className="fee-table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {s.fees.map((f) => (
                <tr key={f.item}>
                  <td>{f.item}</td>
                  <td>{f.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Common questions</h2>
          <div className="faqs">
            {s.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        <aside className="service-aside" aria-label="Get started">
          <div className="aside-card">
            <Action action={s.action} />
            <p className="aside-dept">
              <strong>{s.dept}</strong>
              <a href={`tel:${s.phone.replace(/\s/g, "")}`}>
                <Phone size={16} aria-hidden="true" /> {s.phone}
              </a>
              <span>
                {s.online
                  ? "You can start this online."
                  : "Handled in person or by phone."}
              </span>
            </p>
            <p className="aside-updated">Page checked {s.updated}</p>
          </div>
        </aside>
      </div>

      <section className="band band-mist" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title">Related services</h2>
          <ul className="related">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={`/services/${r.slug}`}>
                  <strong>{r.name}</strong>
                  <span>{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
