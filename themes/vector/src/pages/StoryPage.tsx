import { Link } from "../router";
import { stories, type Story } from "../content";
import { Elevation } from "../components/Elevation";
import { modelBySlug, paintHex } from "../lib/build";
import { money } from "../lib/calc";

export function StoryPage({ story }: { story: Story }) {
  const model = modelBySlug(story.model)!;
  const others = stories.filter((s) => s.slug !== story.slug);
  const [first, second, ...rest] = story.body;

  return (
    <article className="article">
      <header className="article-head sheet">
        <div className="wrap narrow">
          <h1>{story.title}</h1>
          <p className="lede">{story.dek}</p>
          <p className="byline">
            {story.owner} · {story.place} ·{" "}
            <Link to={`/models/${model.slug}`}>{model.name}</Link> ·{" "}
            {story.miles}
          </p>
        </div>
      </header>
      <figure className="article-photo wrap">
        <img
          src={story.photo.src}
          alt={story.photo.alt}
          width={story.photo.width}
          height={story.photo.height}
        />
      </figure>
      <div className="wrap narrow prose article-body">
        <p>{first}</p>
        <p>{second}</p>
        <blockquote>
          <p>{story.quote}</p>
        </blockquote>
        {rest.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <aside
        className="wrap narrow article-model"
        aria-label={`About the ${model.name}`}
      >
        <Elevation
          profile={model.profile}
          paint={paintHex(model.color)}
          label={`Vector ${model.name}`}
        />
        <div>
          <h2>
            {model.name} <span>{model.body}</span>
          </h2>
          <p>{model.line}</p>
          <p className="num">From {money(model.trims[0].price)}</p>
          <div className="actions">
            <Link to={`/models/${model.slug}`} className="btn btn-ghost">
              View {model.name}
            </Link>
            <Link to={`/configure/${model.slug}`} className="text-link">
              Configure
            </Link>
          </div>
        </div>
      </aside>

      <section className="section sheet">
        <div className="wrap">
          <h2>More from owners</h2>
          <ul className="story-list across">
            {others.map((s) => (
              <li key={s.slug}>
                <Link to={`/owners/${s.slug}`}>
                  <span className="story-meta">
                    {s.owner} · {s.place}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
