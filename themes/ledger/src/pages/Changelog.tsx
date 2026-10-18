import { changelog } from "../content";

export default function Changelog() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{changelog.heading}</h1>
        <p className="lede">{changelog.lede}</p>
      </header>
      <ol className="wrap changelog">
        {changelog.entries.map((e) => (
          <li key={e.version}>
            <p className="change-meta">
              <strong className="num">v{e.version}</strong>
              <time>{e.date}</time>
            </p>
            <div>
              <h2>{e.title}</h2>
              <p>{e.text}</p>
              <ul>
                {e.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
