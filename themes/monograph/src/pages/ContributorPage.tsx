import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { articles, contributors, issues, type Contributor } from "../content";
import { byIssueThenPage, sectionOf } from "../lib/magazine";
import { StoryItem } from "../components/StoryItem";

export function ContributorPage({ person }: { person: Contributor }) {
  const online = articles
    .filter((a) => a.author === person.slug)
    .sort(byIssueThenPage);
  const inPrint = issues.flatMap((i) =>
    i.contents
      .filter((c) => c.by === person.slug && !c.slug)
      .map((c) => ({ ...c, issue: i })),
  );
  const others = contributors.filter((c) => c.slug !== person.slug);

  return (
    <div className="page wrap person">
      <header className="person-head">
        <h1>{person.name}</h1>
        <p className="meta">
          {person.role} · {person.based} · contributing since No. {person.since}
        </p>
      </header>

      <div className="person-body">
        <div className="person-bio">
          {person.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="person-elsewhere">{person.elsewhere}</p>
        </div>

        <div className="person-work">
          <section aria-labelledby="online-title">
            <h2 id="online-title" className="rule-title">
              Read online
            </h2>
            <div className="story-list">
              {online.map((a) => (
                <StoryItem key={a.slug} article={a} level={3} />
              ))}
            </div>
          </section>

          {inPrint.length > 0 && (
            <section aria-labelledby="print-title">
              <h2 id="print-title" className="rule-title">
                In print
              </h2>
              <ol className="print-list">
                {inPrint.map((c) => (
                  <li key={c.issue.no + "-" + c.page}>
                    <span className="print-title">{c.title}</span>
                    <span>{sectionOf(c.section).single}</span>
                    <Link to={`/issues/${c.issue.no}`}>
                      No. {c.issue.no}, p. {c.page}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>

      <nav className="person-others" aria-label="Other contributors">
        <Link to="/contributors" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> All contributors
        </Link>
        <p>
          {others.map((c, i) => (
            <span key={c.slug}>
              <Link to={"/contributors/" + c.slug}>{c.name}</Link>
              {i < others.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </nav>
    </div>
  );
}
