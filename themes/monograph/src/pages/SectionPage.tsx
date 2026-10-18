import { Link } from "../router";
import { articles, issues, sections, type Section } from "../content";
import { byIssueThenPage, contributorOf } from "../lib/magazine";
import { StoryItem } from "../components/StoryItem";

export function SectionPage({ section }: { section: Section }) {
  const online = articles
    .filter((a) => a.section === section.slug)
    .sort(byIssueThenPage);
  const inPrint = issues.flatMap((i) =>
    i.contents
      .filter((c) => c.section === section.slug && !c.slug)
      .map((c) => ({ ...c, issue: i })),
  );

  return (
    <div className="page wrap section-page">
      <header className="page-head">
        <h1>{section.name}</h1>
        <p className="lead">{section.description}</p>
        <p className="section-note">{section.note}</p>
      </header>

      <section aria-labelledby="online-title">
        <h2 id="online-title" className="rule-title">
          Online
        </h2>
        <div className="story-list">
          {online.map((a) => (
            <StoryItem key={a.slug} article={a} level={3} />
          ))}
        </div>
      </section>

      <section aria-labelledby="print-title">
        <h2 id="print-title" className="rule-title">
          In print only
        </h2>
        <ol className="print-list">
          {inPrint.map((c) => (
            <li key={c.issue.no + "-" + c.page}>
              <span className="print-title">{c.title}</span>
              <Link to={"/contributors/" + c.by}>
                {contributorOf(c.by).name}
              </Link>
              <Link to={`/issues/${c.issue.no}`}>
                No. {c.issue.no}, p. {c.page}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <nav className="section-pager" aria-label="Other sections">
        {sections
          .filter((s) => s.slug !== section.slug)
          .map((s) => (
            <Link key={s.slug} to={"/sections/" + s.slug}>
              {s.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}
