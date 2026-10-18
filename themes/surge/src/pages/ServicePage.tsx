import { Check } from "lucide-react";
import { Link } from "../router";
import { cases, personById, services, type Service } from "../content";
import { CaseCard } from "../components/CaseCard";
import { CloseBand } from "../components/CloseBand";

export function ServicePage({ service: s }: { service: Service }) {
  const lead = personById(s.lead)!;
  const related = cases.filter((c) => c.services.includes(s.slug)).slice(0, 3);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="crumbs">
            <Link to="/services">Services</Link> / {s.name}
          </p>
          <h1>{s.name}</h1>
          <p className="lede">{s.lede}</p>
          <div className="btn-row">
            <Link
              to={`/proposal?service=${s.slug}`}
              className="btn btn-lift btn-big"
            >
              Request a proposal
            </Link>
            <p className="price-note">{s.from}</p>
          </div>
        </div>
      </header>

      <section className="section-tight">
        <div className="wrap svc-grid">
          <div className="prose">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="svc-aside" aria-labelledby="moves-title">
            <h2 id="moves-title">Numbers it moves</h2>
            <ul className="moves">
              {s.moves.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <h2>Tools we work in</h2>
            <p>{s.channels.join(" · ")}</p>
          </aside>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="includes-title">
        <div className="wrap svc-grid">
          <h2 id="includes-title" className="h-lg">
            What's included
          </h2>
          <ul className="ticks ticks-big">
            {s.includes.map((i) => (
              <li key={i}>
                <Check aria-hidden="true" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section timeline-section"
        aria-labelledby="weeks-title"
      >
        <div className="wrap">
          <h2 id="weeks-title" className="h-lg">
            The first weeks
          </h2>
          <ol className="timeline">
            {s.weeks.map((w) => (
              <li key={w.span}>
                <span className="timeline-span">{w.span}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="lead-title">
        <div className="wrap lead-card">
          <img
            src={lead.image}
            alt={`Portrait of ${lead.name}`}
            loading="lazy"
            width={800}
            height={1000}
          />
          <div>
            <h2 id="lead-title" className="h-md">
              Led by {lead.name}
            </h2>
            <p className="lead-role">{lead.role}</p>
            <p>{lead.bio}</p>
            <Link to="/team" className="text-link">
              The rest of the team
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" className="h-lg">
              {s.name} in practice
            </h2>
            <div className="case-grid">
              {related.map((c) => (
                <CaseCard key={c.slug} c={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight" aria-labelledby="faq-title">
        <div className="wrap svc-grid">
          <h2 id="faq-title" className="h-lg">
            Questions
          </h2>
          <div className="faq">
            {s.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav className="section-tight other-services" aria-label="Other services">
        <div className="wrap">
          <h2 className="h-md">Other services</h2>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/services/${o.slug}`}>{o.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CloseBand to={`/proposal?service=${s.slug}`} />
    </>
  );
}
