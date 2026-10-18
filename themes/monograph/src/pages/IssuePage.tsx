import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { issues, plans, type Issue } from "../content";
import { contributorOf, longDate, money, sectionOf } from "../lib/magazine";
import { Cover } from "../components/Cover";

export function IssuePage({ issue }: { issue: Issue }) {
  const at = issues.indexOf(issue);
  const newer = issues[at - 1];
  const older = issues[at + 1];

  return (
    <div className="page wrap issue-page">
      <div className="issue-cover-col">
        <Cover issue={issue} eager />
      </div>

      <div className="issue-main">
        <header>
          <h1>
            No. {issue.no}: <em>{issue.word}</em>
          </h1>
          <p className="meta">
            {issue.season} · published{" "}
            <time dateTime={issue.published}>{longDate(issue.published)}</time>
          </p>
        </header>

        <div className="buy-box">
          <p className="buy-price">
            {money(issue.price)}
            <small data-stock={issue.stock}>
              {issue.stock === "Sold out" ? "Sold out in print" : issue.stock}
            </small>
          </p>
          {issue.stock === "Sold out" ? (
            <Link to="/subscribe?plan=digital" className="btn">
              Read it in the archive <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <Link
              to={`/subscribe?plan=single&issue=${issue.no}`}
              className="btn"
            >
              Buy this issue <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          <Link to="/subscribe" className="text-link">
            Or subscribe from {money(plans[1].price[1])} a year
          </Link>
        </div>

        <section className="editor-letter" aria-labelledby="letter-title">
          <h2 id="letter-title">From the editor</h2>
          {issue.letter.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="signature">Hanna Lowe, Editor</p>
        </section>

        <section aria-labelledby="contents-title">
          <h2 id="contents-title" className="rule-title">
            Contents
          </h2>
          <ol className="contents contents-full">
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
                    <Link to={"/sections/" + c.section}>
                      {sectionOf(c.section).single}
                    </Link>
                    ,{" "}
                    <Link to={"/contributors/" + c.by}>
                      {contributorOf(c.by).name}
                    </Link>
                  </small>
                </span>
                <span className="contents-state">
                  {c.slug ? "Read online" : "In print"}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="specs-title">
          <h2 id="specs-title" className="rule-title">
            The object
          </h2>
          <dl className="specs">
            <div>
              <dt>Format</dt>
              <dd>210 × 280 mm, perfect bound, sewn</dd>
            </div>
            <div>
              <dt>Extent</dt>
              <dd>{issue.pages} pages</dd>
            </div>
            <div>
              <dt>Paper</dt>
              <dd>Cream uncoated 115 gsm text, 300 gsm cover</dd>
            </div>
            <div>
              <dt>Edition</dt>
              <dd>
                6,000 copies, printed by a family press on two-colour offset
              </dd>
            </div>
          </dl>
        </section>

        <nav className="issue-pager" aria-label="Other issues">
          {older ? (
            <Link to={`/issues/${older.no}`}>
              <ArrowLeft size={16} aria-hidden="true" /> No. {older.no},{" "}
              {older.word}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link to={`/issues/${newer.no}`}>
              No. {newer.no}, {newer.word}{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
