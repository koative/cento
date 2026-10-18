import { useState, type FormEvent } from "react";
import { ArrowRight, Phone, Search } from "lucide-react";
import { Link, navigate } from "../router";
import {
  articles,
  audiences,
  brand,
  claimsPage,
  contentsCopy,
  covers,
  home,
  premiumSplit,
  stories,
} from "../content";
import { PolicySchedule } from "../components/PolicySchedule";
import { ContentsCounter } from "../components/ContentsCounter";
import { money } from "../lib/quote";

export function Home() {
  const { hero, finePrint } = home;
  const [clause, setClause] = useState(0);

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    navigate(q ? `/help?q=${encodeURIComponent(q)}` : "/help");
  };

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="lede">{hero.text}</p>
          <div className="actions">
            <Link to="/quote" className="btn btn-primary">
              Get a quote <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link to="/claims" className="btn btn-ghost">
              Make a claim
            </Link>
          </div>
          <ul className="hero-paths" aria-label="Start from your situation">
            {audiences.slice(0, 3).map((a) => {
              const c = covers.find((cover) => cover.audience === a.id)!;
              return (
                <li key={a.id}>
                  <Link to={`/cover/${c.slug}`}>
                    <span>{a.label}</span>
                    <span>
                      {c.name} from <span className="num">{money(c.from)}</span>
                      /mo
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <figure className="hero-figure">
          <img
            src={hero.image}
            alt={hero.alt}
            width={1700}
            height={1265}
            fetchPriority="high"
          />
          <PolicySchedule
            className="hero-schedule"
            title="Schedule of cover"
            meta={[
              ["Policy", "Renters · sample"],
              ["Home", "1-bed apartment, Columbus OH"],
            ]}
            lines={hero.sample.lines}
            monthly={hero.sample.premium}
          />
        </figure>
      </section>

      <section className="band products-index" aria-labelledby="cover-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="cover-h">Eight kinds of cover, one way of writing them</h2>
            <Link to="/cover" className="text-link">
              Compare all cover <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ol className="index-list">
            {covers.map((c) => (
              <li key={c.slug}>
                <Link to={`/cover/${c.slug}`}>
                  <span className="index-name">{c.name}</span>
                  <span className="index-summary">{c.summary}</span>
                  <span className="index-price">
                    {c.audience === "add-on" ? "add-on from" : "from"}{" "}
                    <span className="num">{money(c.from)}</span>/mo
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap counter-section" aria-labelledby="counter-h">
        <div className="counter-intro">
          <h2 id="counter-h">{contentsCopy.title}</h2>
          <p>{contentsCopy.text}</p>
          <p className="fine">{contentsCopy.note}</p>
        </div>
        <ContentsCounter />
      </section>

      <section className="band band-ink fine-print" aria-labelledby="fine-h">
        <div className="wrap">
          <div className="fine-head">
            <h2 id="fine-h">{finePrint.title}</h2>
            <p>{finePrint.text}</p>
          </div>
          <div className="clause-tabs" role="group" aria-label="Clause">
            {finePrint.clauses.map((c, i) => (
              <button
                key={c.ref}
                type="button"
                aria-pressed={clause === i}
                onClick={() => setClause(i)}
              >
                {c.ref}
              </button>
            ))}
          </div>
          <div className="clause" key={clause}>
            <blockquote>
              <p>{finePrint.clauses[clause].legal}</p>
            </blockquote>
            <p className="clause-plain">
              <span>In plain English</span>
              {finePrint.clauses[clause].plain}
            </p>
          </div>
        </div>
      </section>

      <section className="wrap claims-teaser" aria-labelledby="claims-h">
        <figure>
          <img
            src={claimsPage.image}
            alt={claimsPage.imageAlt}
            width={1300}
            height={867}
            loading="lazy"
          />
        </figure>
        <div>
          <h2 id="claims-h">When something goes wrong</h2>
          <ol className="steps">
            {home.claimSteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="claims-line">
            <Phone aria-hidden="true" size={18} />
            <span>
              Claims line, every hour of every day:{" "}
              <a href={brand.claimsPhoneHref}>{brand.claimsPhone}</a>
            </span>
          </p>
          <Link to="/claims" className="text-link">
            The full claims guide <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="band stories" aria-labelledby="stories-h">
        <div className="wrap">
          <h2 id="stories-h">Claims, in members' words</h2>
          <p className="pledge">{home.pledge}</p>
          <ul className="story-list">
            {stories.map((s) => (
              <li key={s.name}>
                <blockquote>
                  <p>“{s.quote}”</p>
                </blockquote>
                <p className="story-by">
                  {s.name}, {s.place} <span>{s.cover}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap split" aria-labelledby="split-h">
        <div>
          <h2 id="split-h">Where $100 of premium went last year</h2>
          <p>
            Vault is a mutual, so there is no shareholder line. What we don't
            spend on claims and running costs goes back to members.{" "}
            <Link to="/about">How the mutual works</Link>.
          </p>
        </div>
        <ul className="split-bars">
          {premiumSplit.map((p) => (
            <li key={p.label}>
              <span className="split-label">{p.label}</span>
              <span className="split-track" aria-hidden="true">
                <span
                  style={{
                    width: `${(p.value / premiumSplit[0].value) * 100}%`,
                  }}
                />
              </span>
              <span className="num">${p.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band help-teaser" aria-labelledby="help-h">
        <div className="wrap help-teaser-grid">
          <div>
            <h2 id="help-h">Questions before you buy</h2>
            <form className="search" role="search" onSubmit={search}>
              <label htmlFor="home-q" className="sr-only">
                Search the help centre
              </label>
              <input
                id="home-q"
                name="q"
                type="search"
                placeholder="Try “deductible” or “moving”"
              />
              <button type="submit" className="btn btn-primary">
                <Search aria-hidden="true" size={18} /> Search
              </button>
            </form>
          </div>
          <ul className="help-links">
            {articles.slice(0, 5).map((a) => (
              <li key={a.slug}>
                <Link to={`/help/${a.slug}`}>
                  {a.title}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap close" aria-labelledby="close-h">
        <h2 id="close-h">{home.close.title}</h2>
        <p>{home.close.text}</p>
        <div className="actions">
          <Link to="/quote" className="btn btn-primary">
            Start my quote <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <a href={brand.phoneHref} className="btn btn-ghost">
            Or call {brand.phone}
          </a>
        </div>
      </section>
    </>
  );
}
