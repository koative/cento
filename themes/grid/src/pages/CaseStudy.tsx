import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { caseStudies, products, type CaseStudy } from "../content";
import { money } from "../lib/energy";
import { BillChart } from "../components/BillChart";
import { Photo } from "../components/Bits";

export default function CaseStudyPage({ study: c }: { study: CaseStudy }) {
  const kit = c.system.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p) => !!p);
  const i = caseStudies.indexOf(c);
  const next = caseStudies[(i + 1) % caseStudies.length];
  const saved =
    c.billsBefore.reduce((a, b) => a + b, 0) -
    c.billsAfter.reduce((a, b) => a + b, 0);

  const facts: [string, string][] = [
    ["Household", c.household],
    ["Home", c.home],
    ["System", `${c.system.panels} panels, ${c.system.kwp} kWp`],
    ["Battery", c.system.batteryKwh ? `${c.system.batteryKwh} kWh` : "None"],
    [
      "Installed",
      `${c.installed}, ${c.installDays} ${c.installDays === 1 ? "day" : "days"} on site`,
    ],
    ["First-year saving", money(saved)],
  ];

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/case-studies" className="text-link">
          <ArrowLeft size={16} aria-hidden /> All case studies
        </Link>
      </div>
      <article>
        <header className="wrap case-head">
          <h1>{c.title}</h1>
          <p className="case-place">
            {c.place} · {c.tags.join(" · ")}
          </p>
          <p className="lead">{c.summary}</p>
        </header>
        <div className="wrap case-photo">
          <Photo img={c.image} lazy={false} />
        </div>

        <div className="wrap case-body">
          <dl className="spec-table case-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className="num">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="prose">
            <h2>The house</h2>
            <p>{c.challenge}</p>
            <h2>What we fitted</h2>
            <p>{c.solution}</p>
            <h2>A year later</h2>
            <p>{c.outcome}</p>
            <blockquote className="pull">
              <p>“{c.quote}”</p>
              <footer>{c.quoteBy}</footer>
            </blockquote>
          </div>
        </div>

        <section className="section wrap">
          <div className="section-head">
            <h2>Twelve months of bills</h2>
            <p>
              From the household's utility statements, the year before
              installation and the first full year after.
            </p>
          </div>
          <BillChart before={c.billsBefore} after={c.billsAfter} />
        </section>

        <section className="section wrap">
          <div className="section-head">
            <h2>The hardware</h2>
          </div>
          <ul className="kit">
            {kit.map((p) => (
              <li key={p.id}>
                <Link to={`/products/${p.id}`}>
                  <strong>{p.name}</strong>
                  <span className="meta">{p.category}</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <section className="section wrap next-case">
        <Link to={`/case-studies/${next.slug}`} className="next-link">
          <span>Next case study: {next.place}</span>
          <strong>{next.title}</strong>
        </Link>
        <Link to="/quote" className="btn btn-sun">
          Get a quote for your home <ArrowRight size={18} aria-hidden />
        </Link>
      </section>
    </>
  );
}
