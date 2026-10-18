import { ArrowRight, Check, Phone } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  caseStudies,
  categories,
  home,
  howItWorks,
  images,
  model,
  planner,
  products,
} from "../content";
import { cents, estimate, money } from "../lib/energy";
import { EnergyDay } from "../components/EnergyDay";
import { ProductArt } from "../components/ProductArt";
import { CompareTable, Faq, Photo } from "../components/Bits";

const demo = estimate(planner.defaults);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export default function Home() {
  // The hero house links to its own case; the feature and list show the others.
  const [lead, feature, ...others] = caseStudies;
  const featured = [...products]
    .sort((a, b) => a.featured - b.featured)
    .slice(0, 4);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.heroTitle}</h1>
          <p className="lead">{home.heroLead}</p>
          <div className="actions">
            <Link to="/planner" className="btn btn-sun">
              Plan your roof <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/quote" className="btn btn-line">
              Get a quote
            </Link>
          </div>
          <ul className="ticks">
            {home.heroPoints.map((p) => (
              <li key={p}>
                <Check size={18} aria-hidden /> {p}
              </li>
            ))}
          </ul>
        </div>
        <figure className="hero-photo">
          <Photo img={images.roofHouse} lazy={false} />
          <figcaption>
            <Link to={`/case-studies/${lead.slug}`}>
              <span>{lead.place}</span>
              <strong className="num">
                {lead.system.panels} panels · {lead.system.kwp} kWp ·{" "}
                {lead.system.batteryKwh} kWh battery
              </strong>
              <span>August bill: {money(lead.billsAfter[7])}</span>
            </Link>
          </figcaption>
        </figure>
      </section>

      <nav className="category-strip wrap" aria-label="Product categories">
        {categories.map((c) => (
          <Link key={c} to={`/products?c=${encodeURIComponent(c)}`}>
            <span>
              {c}
              <small className="num">
                from{" "}
                {money(
                  Math.min(
                    ...products
                      .filter((p) => p.category === c)
                      .map((p) => p.price),
                  ),
                )}
              </small>
            </span>
            <ArrowRight size={16} aria-hidden />
          </Link>
        ))}
      </nav>

      <section className="section wrap day-section">
        <div className="section-head">
          <h2>{home.flowTitle}</h2>
          <p>{home.flowLead}</p>
        </div>
        <EnergyDay hours={demo.hours} capacity={model.batteryKwh} start={13} />
        <p className="section-foot">
          <Link to="/planner" className="text-link">
            Lay out your own roof in the planner{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>{home.installTitle}</h2>
          <p>{home.installLead}</p>
        </div>
        <ul className="spec-rail">
          {featured.map((p) => (
            <li key={p.id}>
              <Link to={`/products/${p.id}`} className="spec-item">
                <ProductArt art={p.art} />
                <strong>{p.name}</strong>
                <span>{p.summary}</span>
                <span className="num price">
                  {money(p.price)} <small>{p.unit}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="section-foot">
          <Link to="/products" className="text-link">
            All eight products <ArrowRight size={16} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="section bill-section">
        <div className="wrap">
          <div className="section-head">
            <h2>{home.billTitle}</h2>
            <p>{home.billLead}</p>
          </div>
          <div className="bills">
            <Statement
              label="August 2025, before solar"
              rows={home.bill.before}
            />
            <Statement
              label="August 2026, with Grid"
              rows={home.bill.after}
              after
            />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>{home.stepsTitle}</h2>
          <p>{home.stepsLead}</p>
        </div>
        <ol className="timeline">
          {howItWorks.steps.map((s) => (
            <li key={s.title}>
              <span className="num when">{s.time}</span>
              <strong>{s.title}</strong>
              <span>{s.we}</span>
            </li>
          ))}
        </ol>
        <p className="section-foot">
          <Link to="/how-it-works" className="text-link">
            Every step, and what you need to do{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>{home.caseTitle}</h2>
        </div>
        <div className="case-feature">
          <Link
            to={`/case-studies/${feature.slug}`}
            className="case-feature-photo"
          >
            <Photo img={feature.image} />
          </Link>
          <div className="case-feature-copy">
            <blockquote>
              <p>“{feature.quote}”</p>
              <footer>
                {feature.quoteBy}, {feature.place}
              </footer>
            </blockquote>
            <p>{feature.summary}</p>
            <Link to={`/case-studies/${feature.slug}`} className="text-link">
              Read the {feature.place} case study{" "}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
        <ul className="case-lines">
          {others.slice(0, 3).map((c) => (
            <li key={c.slug}>
              <Link to={`/case-studies/${c.slug}`}>
                <strong>{c.title}</strong>
                <span className="case-place">
                  {c.place} · {c.home}
                </span>
                <span className="num">
                  {money(sum(c.billsBefore) - sum(c.billsAfter))} saved in year
                  one
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>{home.payTitle}</h2>
          <p>{home.payLead}</p>
        </div>
        <CompareTable />
        <p className="section-foot">
          <Link to="/financing" className="text-link">
            Compare monthly costs in the calculator{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="section wrap crew">
        <Photo img={images.installerCarry} className="crew-photo" />
        <div className="crew-copy">
          <h2>{home.crewTitle}</h2>
          {home.crewBody.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="guarantees">
            {howItWorks.guarantees.map((g) => (
              <li key={g.title}>
                <strong>{g.title}</strong>
                <span>{g.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap faq-section">
        <div className="section-head">
          <h2>Questions we hear on every survey</h2>
        </div>
        <Faq items={howItWorks.faqs.slice(0, 4)} />
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeBody}</p>
          <div className="actions">
            <Link to="/planner" className="btn btn-sun">
              Open the planner <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/quote" className="btn btn-line-light">
              Request a quote
            </Link>
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="close-phone"
            >
              <Phone size={18} aria-hidden /> {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Statement({
  label,
  rows,
  after,
}: {
  label: string;
  rows: [string, string, number][];
  after?: boolean;
}) {
  const total = rows.reduce((t, r) => t + r[2], 0);
  return (
    <article className="statement" data-after={after ? "" : undefined}>
      <header>
        <h3>{label}</h3>
        <span>{home.bill.account}</span>
        <span>{home.bill.period}</span>
      </header>
      <table>
        <tbody>
          {rows.map(([item, qty, amount]) => (
            <tr key={item}>
              <th scope="row">{item}</th>
              <td className="num">{qty}</td>
              <td className="num">{cents(amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Amount due</th>
            <td />
            <td className="num">{cents(total)}</td>
          </tr>
        </tfoot>
      </table>
    </article>
  );
}
