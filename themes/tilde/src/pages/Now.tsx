import { Link } from "../router";
import { brand, now } from "../content";
import { formatDate } from "../lib/format";

export function Now() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Now</h1>
        <p className="lead">{now.intro}</p>
        <p className="muted">
          Last updated{" "}
          <time dateTime={now.updated}>{formatDate(now.updated)}</time> in{" "}
          {brand.city}.
        </p>
      </header>
      <div className="wrap">
        <dl className="now-list">
          {now.items.map((i) => (
            <div key={i.title}>
              <dt>{i.title}</dt>
              <dd>{i.text}</dd>
            </div>
          ))}
        </dl>
        <p className="now-foot">
          Want to know what I did before this? The{" "}
          <Link to="/resume">résumé</Link> has the long version and the{" "}
          <Link to="/writing">writing</Link> has the lessons.
        </p>
      </div>
    </>
  );
}
