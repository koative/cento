import { Link } from "../router";
import { articles, team, type Article, type Block } from "../content";
import { fmt, isoDate } from "../lib/format";
import { ArticleRow, TickList } from "../components/Bits";
import { Tick } from "../components/Marks";

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p>{b.text}</p>;
    case "h":
      return <h2>{b.text}</h2>;
    case "list":
      return <TickList items={b.items} />;
    case "note":
      return (
        <aside className="note">
          <Tick />
          <p>{b.text}</p>
        </aside>
      );
    case "figures":
      return (
        <figure className="figures">
          <table className="pad-table">
            <tbody>
              {b.rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
  }
}

export function ArticlePage({ article: a }: { article: Article }) {
  const author = team.find((p) => p.name === a.author);
  const related = [
    ...articles.filter((x) => x.slug !== a.slug && x.topic === a.topic),
    ...articles.filter((x) => x.topic !== a.topic),
  ].slice(0, 3);

  return (
    <>
      <article className="wrap article">
        <header className="article-head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/resources">Resources</Link>
            <span aria-hidden="true">/</span>
            <span>{a.topic}</span>
          </nav>
          <h1>{a.title}</h1>
          <p className="lede">{a.dek}</p>
          <p className="byline">
            <span className="monogram" aria-hidden="true">
              {a.author
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            <span>
              <strong>{a.author}</strong>
              {author && `, ${author.credential} · ${author.role}`}
              <br />
              <time dateTime={a.date}>
                {fmt.published.format(isoDate(a.date))}
              </time>{" "}
              · {a.format} · {a.minutes} min read
            </span>
          </p>
        </header>

        <div className="article-body">
          {a.body.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
          <p className="fine">
            General information for US small businesses, not advice for your
            situation. Tally is a fictional firm.
          </p>
        </div>

        <aside className="article-aside" aria-label="Next steps">
          <h2>Want this applied to your numbers?</h2>
          <p>
            A 20-minute call with{" "}
            {author ? author.name.split(" ")[0] : "the team"} or a colleague. No
            charge, no pitch deck.
          </p>
          <Link to="/book" className="btn btn-primary">
            Book a call
          </Link>
          <Link to="/calendar" className="text-link">
            Or build your tax calendar
          </Link>
        </aside>
      </article>

      <section className="band band-paper" aria-labelledby="more-h">
        <div className="wrap section">
          <h2 id="more-h" className="section-title">
            Keep reading
          </h2>
          <ul className="article-list">
            {related.map((r) => (
              <ArticleRow key={r.slug} a={r} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
