import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import {
  engagements,
  quarterlyDiscount,
  services,
  servicesPage,
} from "../content";
import { CloseBand } from "../components/CloseBand";
import { money } from "../lib/format";

export function Services() {
  const [quarterly, setQuarterly] = useState(false);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>{servicesPage.h1}</h1>
          <p className="lede">{servicesPage.lede}</p>
        </div>
      </header>

      <section className="section-tight" aria-label="All services">
        <div className="wrap">
          <ul className="service-sheet">
            {services.map((s) => (
              <li key={s.slug}>
                <div className="ss-name">
                  <h2>
                    <Link to={`/services/${s.slug}`}>{s.name}</Link>
                  </h2>
                  <p>{s.from}</p>
                </div>
                <div className="ss-body">
                  <p>{s.lede}</p>
                  <ul className="ticks">
                    {s.includes.slice(0, 3).map((i) => (
                      <li key={i}>
                        <Check aria-hidden="true" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ss-moves">
                  <h3>Numbers it moves</h3>
                  <ul>
                    {s.moves.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-link"
                    aria-label={`${s.name}: scope, timeline and FAQ`}
                  >
                    Scope and timeline <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section plans-section" aria-labelledby="plans-title">
        <div className="wrap split-head">
          <div>
            <h2 id="plans-title" className="h-xl">
              {servicesPage.engagementsTitle}
            </h2>
            <p className="lede">{servicesPage.engagementsText}</p>
          </div>
          <div className="toggle" role="group" aria-label="Billing">
            <button
              type="button"
              aria-pressed={!quarterly}
              onClick={() => setQuarterly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={quarterly}
              onClick={() => setQuarterly(true)}
            >
              Quarterly <span>save 8%</span>
            </button>
          </div>
        </div>
        <div className="wrap plans">
          {engagements.map((e) => {
            const price =
              e.oneOff || !quarterly
                ? e.monthly
                : Math.round(e.monthly * (1 - quarterlyDiscount));
            return (
              <article
                key={e.id}
                className="plan"
                data-featured={e.id === "program" ? "" : undefined}
              >
                <h3>{e.name}</h3>
                <p className="plan-price" aria-live="polite">
                  <strong>{money(price)}</strong>
                  <span>
                    {e.oneOff
                      ? "fixed fee, 4 weeks"
                      : quarterly
                        ? "a month, billed quarterly"
                        : "a month"}
                  </span>
                </p>
                <p>{e.summary}</p>
                <ul className="ticks">
                  {e.includes.map((i) => (
                    <li key={i}>
                      <Check aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
                <Link to="/roi" className="text-link">
                  Model the return on a {e.name.toLowerCase()}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <CloseBand />
    </>
  );
}
