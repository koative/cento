import { posts } from "../content";
import { Link } from "../router";
import { postDate } from "../lib/stay";

export function Journal() {
  const [lead, ...rest] = posts;
  return (
    <>
      <header className="page-head wrap">
        <h1>Journal</h1>
        <p className="lede">
          Notes from the house: the people who cook, guide and make the cheese,
          and the history we keep finding in the walls.
        </p>
      </header>

      <section className="wrap" aria-label="Stories">
        <article className="journal-lead">
          <Link to={`/journal/${lead.slug}`}>
            <img
              src={lead.image.src}
              alt={lead.image.alt}
              width={1229}
              height={825}
            />
            <h2>{lead.title}</h2>
          </Link>
          <p>{lead.dek}</p>
          <p className="meta">
            <time dateTime={lead.date}>{postDate(lead.date)}</time> ·{" "}
            {lead.author} · {lead.minutes} min read
          </p>
        </article>

        <ul className="journal-list">
          {rest.map((p) => (
            <li key={p.slug}>
              <article>
                <Link to={`/journal/${p.slug}`}>
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    width={1280}
                    height={853}
                    loading="lazy"
                  />
                  <h2>{p.title}</h2>
                </Link>
                <p>{p.dek}</p>
                <p className="meta">
                  <time dateTime={p.date}>{postDate(p.date)}</time> · {p.author}{" "}
                  · {p.minutes} min read
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
