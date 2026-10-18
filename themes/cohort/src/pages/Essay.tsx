import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { essays, partnerBySlug, type Essay as EssayT } from "../content";
import { longDate } from "../lib/format";
import { EssayRow } from "../components/EssayRow";

export function Essay({ essay: e }: { essay: EssayT }) {
  const author = partnerBySlug(e.author)!;
  const more = essays.filter((o) => o.slug !== e.slug).slice(0, 3);

  return (
    <article className="page essay">
      <header className="wrap-narrow essay-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/writing">Writing</Link>
          <span aria-hidden="true">/</span>
          <span>{e.topic}</span>
        </nav>
        <h1>{e.title}</h1>
        <p className="essay-dek">{e.dek}</p>
        <p className="essay-byline">
          By <Link to={`/team/${author.slug}`}>{author.name}</Link> ·{" "}
          <time dateTime={e.date}>{longDate(e.date)}</time> · {e.minutes} min
          read
        </p>
      </header>

      <div className="wrap-narrow prose essay-body">
        {e.body.map((b, i) =>
          b.kind === "h" ? (
            <h2 key={i}>{b.text}</h2>
          ) : b.kind === "quote" ? (
            <blockquote key={i} className="pull">
              <p>{b.text}</p>
            </blockquote>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
      </div>

      <footer className="wrap-narrow essay-foot rule-top">
        <p>
          <strong>{author.name}</strong> is {author.role.toLowerCase()} at
          Cohort, based in {author.based}. {author.before}
        </p>
        <Link to={`/team/${author.slug}`} className="text-link">
          More about {author.name.split(" ")[0]}{" "}
          <ArrowRight aria-hidden="true" />
        </Link>
      </footer>

      <section className="section wrap">
        <h2 className="section-title">Keep reading</h2>
        <div className="essay-grid">
          {more.map((o) => (
            <EssayRow key={o.slug} essay={o} />
          ))}
        </div>
      </section>
    </article>
  );
}
