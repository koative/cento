import type { Article } from "../content";
import { Link } from "../router";
import { contributorOf, minutes, sectionOf } from "../lib/magazine";

/** One row in a story list: plate, headline, standfirst, the print reference. */
export function StoryItem({
  article,
  level = 2,
}: {
  article: Article;
  level?: 2 | 3;
}) {
  const H = `h${level}` as const;
  return (
    <article className="story-item">
      {article.image && (
        <img
          src={article.image.src}
          alt=""
          loading="lazy"
          width={320}
          height={240}
        />
      )}
      <div className="story-item-text">
        <H>
          <Link to={"/read/" + article.slug}>{article.title}</Link>
        </H>
        <p>{article.standfirst}</p>
        <p className="meta">
          {sectionOf(article.section).single} ·{" "}
          {contributorOf(article.author).name} · {minutes(article)} min
        </p>
      </div>
      <p className="story-item-ref">
        No. {article.issue}
        <span>p. {article.page}</span>
      </p>
    </article>
  );
}
