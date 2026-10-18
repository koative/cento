import { Link } from "../router";
import { topics, type Topic } from "../content";
import { postsIn } from "../lib/util";
import { PostRow } from "../components/PostRow";

export function TopicPage({ topic }: { topic: Topic }) {
  const list = postsIn(topic.id);
  const others = topics.filter((t) => t !== topic);
  return (
    <div className="wrap page">
      <header className="page-head">
        <p className="crumb">
          <Link to="/topics">Topics</Link> / {topic.name}
        </p>
        <h1>{topic.name}</h1>
        <p className="lede">{topic.intro}</p>
      </header>
      <h2 className="section-title">
        {list.length} {list.length === 1 ? "letter" : "letters"}
      </h2>
      <ol className="post-list">
        {list.map((p) => (
          <PostRow key={p.slug} post={p} showTopic={false} showImage />
        ))}
      </ol>
      <nav className="other-topics" aria-labelledby="other-topics-title">
        <h2 id="other-topics-title">Other topics</h2>
        <ul>
          {others.map((t) => (
            <li key={t.id}>
              <Link to={`/topics/${t.id}`}>{t.name}</Link>
              <span>{t.line}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
