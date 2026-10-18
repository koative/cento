import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { caseBySlug, clients, home, personById, services } from "../content";
import { Readout } from "../components/Readout";
import { CaseCard } from "../components/CaseCard";
import { CloseBand } from "../components/CloseBand";
import { defaults, project, summarize } from "../lib/roi";
import { money, moneyShort } from "../lib/format";

export function Home() {
  const featured = caseBySlug(home.featured)!;
  const lead = ["sofia", "hanna", "daniel", "clara"].map((id) =>
    personById(id)!,
  );

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.h1}</h1>
            <p className="lede">{home.lede}</p>
            <div className="btn-row">
              <Link to="/proposal" className="btn btn-lift btn-big">
                Request a proposal
              </Link>
              <Link to="/work" className="btn btn-line">
                See the case studies
              </Link>
            </div>
          </div>
          <section className="board" aria-labelledby="board-title">
            <header className="board-head">
              <h2 id="board-title">{home.boardTitle}</h2>
              <p>{home.boardNote}</p>
            </header>
            <Readout
              compact
              rows={home.board.map((b) => ({ ...b, name: b.test }))}
            />
          </section>
        </div>
      </section>

      <section className="clients" aria-label="Current clients">
        <div className="wrap clients-row">
          <p>{home.clientsLead}</p>
          <ul>
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap split-head">
          <h2 className="h-xl">{home.servicesTitle}</h2>
          <p className="lede">{home.servicesText}</p>
        </div>
        <div className="wrap">
          <ul className="service-index">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>
                  <span className="si-name">{s.name}</span>
                  <span className="si-text">{s.short}</span>
                  <span className="si-from">{s.from}</span>
                  <ArrowRight aria-hidden="true" className="si-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section feature" aria-labelledby="feature-title">
        <div className="wrap feature-grid">
          <div className="feature-media">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              loading="lazy"
              width={1400}
              height={1068}
            />
            <p className="feature-figure">
              <strong>{featured.figure}</strong>
              <span>{featured.metric}</span>
            </p>
          </div>
          <div className="feature-copy">
            <p className="case-card-client">
              {featured.client} <span>· {featured.industry}</span>
            </p>
            <h2 id="feature-title" className="h-lg">
              {featured.headline}
            </h2>
            <p>{featured.summary}</p>
            <Readout rows={featured.experiments.slice(0, 2)} />
            <Link to={`/work/${featured.slug}`} className="btn btn-ink">
              Read the Halfmoon case <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section loop-section" aria-labelledby="loop-title">
        <div className="wrap split-head">
          <h2 id="loop-title" className="h-xl">
            {home.loopTitle}
          </h2>
          <p className="lede">{home.loopText}</p>
        </div>
        <div className="wrap">
          <ol className="loop">
            {home.loop.map((d) => (
              <li key={d.day}>
                <span className="loop-day">{d.day}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/approach" className="text-link">
            How a program runs, day one to day ninety
          </Link>
        </div>
      </section>

      <RoiTeaser />

      <section className="section">
        <div className="wrap split-head">
          <h2 className="h-xl">More programs, losses included</h2>
          <Link to="/work" className="btn btn-line">
            All seven case studies
          </Link>
        </div>
        <div className="wrap case-grid case-grid-home">
          {home.moreWork.map((slug, i) => (
            <CaseCard key={slug} c={caseBySlug(slug)!} large={i === 0} />
          ))}
        </div>
      </section>

      <section className="quote-band" aria-label="Client quote">
        <figure className="wrap">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.quote.name}</strong> {home.quote.role}
          </figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="wrap team-teaser">
          <img
            src={home.teamImage}
            alt={home.teamImageAlt}
            loading="lazy"
            width={1800}
            height={1200}
            className="team-teaser-img"
          />
          <div>
            <h2 id="team-title" className="h-lg">
              {home.teamTitle}
            </h2>
            <p>{home.teamText}</p>
            <ul className="faces">
              {lead.map((p) => (
                <li key={p.id}>
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                  <span>
                    <strong>{p.name}</strong>
                    {p.role}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/team" className="text-link">
              Meet the whole team
            </Link>
          </div>
        </div>
      </section>

      <CloseBand />
    </>
  );
}

function RoiTeaser() {
  const [revenue, setRevenue] = useState(defaults.revenue);
  const s = summarize(project({ ...defaults, revenue }), defaults.margin);
  return (
    <section className="roi-teaser" aria-labelledby="roi-teaser-title">
      <div className="wrap roi-teaser-grid">
        <div>
          <h2 id="roi-teaser-title" className="h-xl">
            {home.roiTitle}
          </h2>
          <p>{home.roiText}</p>
        </div>
        <div className="roi-teaser-tool">
          <div className="slider slider-dark">
            <label htmlFor="teaser-revenue">Your monthly revenue</label>
            <output htmlFor="teaser-revenue">{money(revenue)}</output>
            <input
              id="teaser-revenue"
              type="range"
              min={50000}
              max={3000000}
              step={10000}
              value={revenue}
              aria-valuetext={money(revenue)}
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
          </div>
          <p className="teaser-out" aria-live="polite">
            <strong>
              {moneyShort(s.low)}–<wbr />
              {moneyShort(s.high)}
            </strong>
            <span>
              added revenue in 12 months on a growth program, paying back in{" "}
              {s.payback ? `month ${s.payback}` : "over a year"}.
            </span>
          </p>
          <Link to="/roi" className="btn btn-lift">
            Open the full ROI model <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
