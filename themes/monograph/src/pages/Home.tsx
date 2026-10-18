import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  articles,
  contributors,
  currentIssue,
  home,
  issues,
  plans,
  sections,
} from "../content";
import {
  articleOf,
  contributorOf,
  minutes,
  money,
  sectionOf,
} from "../lib/magazine";
import { Cover } from "../components/Cover";

export function Home() {
  const issue = currentIssue;
  const lead = articleOf("the-long-threshold")!;
  const conversation = articleOf("the-compositors-hands")!;
  const portfolio = articleOf("allotments-in-october")!;
  const printOnly = issue.contents.filter((c) => !c.slug).slice(0, 2);
  const inIssue = [...new Set(issue.contents.map((c) => c.by))].map(
    contributorOf,
  );

  return (
    <div className="page home">
      {/* 1 · The current issue, cover and contents */}
      <section className="issue-hero wrap">
        <Link
          to={`/issues/${issue.no}`}
          className="issue-hero-cover"
          aria-label={`No. ${issue.no}, ${issue.word}: contents`}
        >
          <Cover issue={issue} eager />
        </Link>
        <div className="issue-hero-text">
          <h1>{home.title}</h1>
          <p className="meta">
            No. {issue.no} · {issue.season} · {issue.pages} pages ·{" "}
            {money(issue.price)}
          </p>
          <p className="lead">{issue.summary}</p>
          <ol className="contents">
            {issue.contents.map((c) => (
              <li key={c.page}>
                <span className="folio">{c.page}</span>
                <span className="contents-title">
                  {c.slug ? (
                    <Link to={"/read/" + c.slug}>{c.title}</Link>
                  ) : (
                    c.title
                  )}
                  <small>
                    {sectionOf(c.section).single}, {contributorOf(c.by).name}
                  </small>
                </span>
                <span className="contents-state">
                  {c.slug ? "Online" : "In print"}
                </span>
              </li>
            ))}
          </ol>
          <div className="actions">
            <Link to={`/issues/${issue.no}`} className="btn">
              Open the issue <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/subscribe" className="btn btn-ghost">
              Subscribe from {money(plans[1].price[1])} a year
            </Link>
          </div>
        </div>
      </section>

      {/* 2 · The lead essay */}
      <section className="lead-story wrap" aria-labelledby="lead-title">
        <figure>
          <img
            src={lead.image!.src}
            alt={lead.image!.alt}
            loading="lazy"
            width={1024}
            height={893}
          />
        </figure>
        <div>
          <h2 id="lead-title">
            <Link to={"/read/" + lead.slug}>{lead.title}</Link>
          </h2>
          <p className="standfirst">{lead.standfirst}</p>
          <p className="meta">
            {sectionOf(lead.section).single} by{" "}
            {contributorOf(lead.author).name} · p. {lead.page} · {minutes(lead)}{" "}
            min
          </p>
          <p className="excerpt">
            {lead.body[0].type === "p" && lead.body[0].text}
          </p>
          <Link to={"/read/" + lead.slug} className="text-link">
            Keep reading <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 3 · Also in this issue: one online, two print-only */}
      <section className="also wrap" aria-labelledby="also-title">
        <h2 id="also-title" className="rule-title">
          Also in No. {issue.no}
        </h2>
        <div className="also-grid">
          <article className="also-main">
            <img
              src={conversation.image!.src}
              alt={conversation.image!.alt}
              loading="lazy"
              width={1024}
              height={600}
            />
            <h3>
              <Link to={"/read/" + conversation.slug}>
                {conversation.title}
              </Link>
            </h3>
            <p>{conversation.standfirst}</p>
            <p className="meta">
              Conversation · {contributorOf(conversation.author).name} ·{" "}
              {minutes(conversation)} min
            </p>
          </article>
          {printOnly.map((c) => (
            <article key={c.page} className="also-print">
              <p className="folio-big">p. {c.page}</p>
              <h3>{c.title}</h3>
              <p className="meta">
                {sectionOf(c.section).single} · {contributorOf(c.by).name}
              </p>
              <p>{c.dek}</p>
              <p className="quiet">
                In print only, or in the subscriber archive.
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 4 · A pull quote, the quiet beat */}
      <section className="pull wrap" aria-label="From the issue">
        <blockquote>
          <p>{home.quote.text}</p>
          <footer>
            {home.quote.who}, in{" "}
            <Link to={"/read/" + home.quote.slug}>{conversation.title}</Link>
          </footer>
        </blockquote>
      </section>

      {/* 5 · The portfolio */}
      <section className="portfolio-band" aria-labelledby="portfolio-title">
        <div className="wrap portfolio-grid">
          <div className="portfolio-text">
            <h2 id="portfolio-title">{portfolio.title}</h2>
            <p className="standfirst">{portfolio.standfirst}</p>
            <p className="meta">
              {portfolio.credit} · pp. {portfolio.page}–{portfolio.page + 19}
            </p>
            <Link to={"/read/" + portfolio.slug} className="text-link">
              See the portfolio <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {[
            portfolio.image!,
            ...portfolio.body.filter((b) => b.type === "figure"),
          ].map((f, i) => (
            <figure key={f.src} className={"plate plate-" + i}>
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                width={1024}
                height={740}
              />
              <figcaption>{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 6 · Sections as a typeset index */}
      <section className="section-index wrap" aria-labelledby="sections-title">
        <h2 id="sections-title" className="rule-title">
          Five ways into an issue
        </h2>
        <ul>
          {sections.map((s) => (
            <li key={s.slug}>
              <Link to={"/sections/" + s.slug}>
                <span className="section-name">{s.name}</span>
                <span className="section-desc">{s.description}</span>
                <span className="section-count">
                  {articles.filter((a) => a.section === s.slug).length} online
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 · Back issues on the shelf */}
      <section className="shelf wrap" aria-labelledby="shelf-title">
        <div className="shelf-head">
          <h2 id="shelf-title">Back issues</h2>
          <Link to="/issues" className="text-link">
            Every issue <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="shelf-row">
          {issues.slice(1).map((i) => (
            <li key={i.no}>
              <Link
                to={`/issues/${i.no}`}
                aria-label={`No. ${i.no}, ${i.word}, ${i.season}. ${i.stock}`}
              >
                <Cover issue={i} />
                <span className="shelf-caption">
                  No. {i.no} · {i.word}
                  <small data-stock={i.stock}>{i.stock}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 8 · Contributors, typeset as a run-in paragraph */}
      <section className="run-in wrap" aria-labelledby="run-in-title">
        <h2 id="run-in-title">Written and photographed by</h2>
        <p>
          {inIssue.map((c, i) => (
            <span key={c.slug}>
              <Link to={"/contributors/" + c.slug}>{c.name}</Link> {c.short}
              {i < inIssue.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <Link to="/contributors" className="text-link">
          All {contributors.length} contributors{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      {/* 9 · Close */}
      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <h2 id="close-title">{home.close.title}</h2>
          <div>
            <p>{home.close.text}</p>
            <ul className="close-prices">
              {plans.map((p) => (
                <li key={p.id}>
                  <span>{p.name}</span>
                  <span>{money(p.price[1])} a year</span>
                </li>
              ))}
            </ul>
            <Link to="/subscribe" className="btn btn-paper">
              Choose a subscription <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
