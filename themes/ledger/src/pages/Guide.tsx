import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { guides, team, type Guide as GuideT } from "../content";
import { money } from "../lib/format";

export default function Guide({ guide }: { guide: GuideT }) {
  const author = team.find((p) => p.name === guide.author);
  const related = [
    ...guides.filter((g) => g.slug !== guide.slug && g.topic === guide.topic),
    ...guides.filter((g) => g.topic !== guide.topic),
  ].slice(0, 3);

  return (
    <article className="article">
      <header className="wrap article-head">
        <Link to="/guides" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All guides
        </Link>
        <h1>{guide.title}</h1>
        <p className="lede">{guide.excerpt}</p>
        <p className="byline">
          <span className="avatar" aria-hidden>
            {author?.initials}
          </span>
          <span>
            {guide.author}
            <small>
              {author?.role} · {guide.date} · {guide.topic}, {guide.minutes} min
              read
            </small>
          </span>
        </p>
      </header>

      <div className="wrap article-body">
        {guide.body.map((b, i) => {
          if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
          if (b.type === "p") return <p key={i}>{b.text}</p>;
          if (b.type === "list")
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          const total = b.rows.reduce((s, [, v]) => s + v, 0);
          return (
            <table key={i} className="ledger-table article-table">
              <caption>{b.caption}</caption>
              <tbody>
                {b.rows.map(([label, v]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="num">{money(v, { cents: false })}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <th scope="row">Total</th>
                  <td className="num">{money(total, { cents: false })}</td>
                </tr>
              </tfoot>
            </table>
          );
        })}
        <aside className="article-cta">
          <h2>Try it on your own numbers</h2>
          <p>The demo workspace has a month of sample money to practise on.</p>
          <Link to="/app/budgets" className="btn btn-primary">
            Open the budget demo
          </Link>
        </aside>
      </div>

      <section className="wrap related" aria-labelledby="related-h">
        <h2 id="related-h">Keep reading</h2>
        <ul className="guide-rows">
          {related.map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`}>
                <strong>{g.title}</strong>
                <span className="guide-excerpt">{g.excerpt}</span>
                <span className="guide-topic">{g.topic}</span>
                <span className="guide-time num">{g.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
