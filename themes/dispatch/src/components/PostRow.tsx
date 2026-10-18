import { Lock } from "lucide-react";
import { Link } from "../router";
import type { Post } from "../content";
import { issueLabel, minutes, shortDate, topicOf } from "../lib/util";

type Props = {
  post: Post;
  showTopic?: boolean;
  showImage?: boolean;
  heading?: "h2" | "h3";
};

/** One line of the index: issue number, title + dek, topic, date and length. */
export function PostRow({
  post,
  showTopic = true,
  showImage = false,
  heading: H = "h3",
}: Props) {
  return (
    <li className="post-row" data-kind={post.kind}>
      <span className="post-row-no">{issueLabel(post)}</span>
      <div className="post-row-main">
        <H className="post-row-title">
          <Link to={`/archive/${post.slug}`}>{post.title}</Link>
        </H>
        <p className="post-row-dek">{post.dek}</p>
      </div>
      <p className="post-row-meta">
        {showTopic && <span>{topicOf(post).name}</span>}
        <time dateTime={post.date}>{shortDate(post.date)}</time>
        <span>
          {minutes(post)} min
          {post.kind === "field-note" && (
            <>
              {" · "}
              <Lock aria-hidden="true" size={13} strokeWidth={2} /> Readers
            </>
          )}
        </span>
      </p>
      {showImage && post.image && (
        <img
          className="post-row-img"
          src={post.image.src}
          alt=""
          loading="lazy"
          style={{ aspectRatio: post.image.ratio }}
        />
      )}
    </li>
  );
}
