import { ArrowRight } from "lucide-react";
import { games, jobs, team, type Post } from "../content";
import { formatDate } from "../lib/util";
import { Link } from "../router";
import { Avatar } from "./PixelArt";
import { Scene } from "./Scene";

/** The post's first screenshot, or the author's portrait for studio posts. */
export function PostArt({ post }: { post: Post }) {
  const shot = post.body.find((b) => b.kind === "shot");
  const game = shot && games.find((g) => g.slug === shot.game);
  if (game && shot)
    return <Scene game={game} seed={shot.seed} className="post-art" />;
  const author = team.find((p) => p.name === post.author)!;
  return (
    <div className="post-art post-art-author">
      <Avatar person={author} />
    </div>
  );
}

export function PostCard({ post, big = false }: { post: Post; big?: boolean }) {
  const game = games.find((g) => g.slug === post.game);
  return (
    <article className="post-card" data-big={big ? "" : undefined}>
      <Link to={`/devlog/${post.slug}`} className="post-card-link">
        <PostArt post={post} />
        <div className="post-card-body">
          <p className="post-meta">
            <span className="tag">{post.tag}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {game && <span>{game.name}</span>}
          </p>
          <h3>{post.title}</h3>
          {big && <p>{post.excerpt}</p>}
          <p className="post-by">
            {post.author} · {post.minutes} min read
          </p>
        </div>
      </Link>
    </article>
  );
}

export function JobList() {
  return (
    <ul className="job-list">
      {jobs.map((j) => (
        <li key={j.slug}>
          <Link to={`/jobs/${j.slug}`} className="job-row">
            <span className="job-title">{j.title}</span>
            <span className="job-team">{j.team}</span>
            <span className="job-type">
              {j.type}
              <br />
              {j.location}
            </span>
            <span className="job-salary num">{j.salary}</span>
            <ArrowRight aria-hidden="true" className="job-arrow" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
