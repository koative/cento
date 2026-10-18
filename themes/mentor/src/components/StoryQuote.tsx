import { Link } from "../router";
import { images, programmes, type Story } from "../content";

/** A client's words, with the before/after that makes them credible. */
export function StoryQuote({
  s,
  showProgramme = true,
}: {
  s: Story;
  showProgramme?: boolean;
}) {
  const p = programmes.find((x) => x.slug === s.programme)!;
  const photo = s.photo && images[s.photo];
  return (
    <figure className="story" data-photo={photo ? "" : undefined}>
      {photo && (
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          loading="lazy"
        />
      )}
      <div className="story-body">
        <blockquote>
          <p>{s.quote}</p>
        </blockquote>
        <dl className="story-shift">
          <div>
            <dt>Before</dt>
            <dd>{s.before}</dd>
          </div>
          <div>
            <dt>After</dt>
            <dd>{s.after}</dd>
          </div>
        </dl>
        <figcaption>
          <strong>{s.name}</strong>
          <span>
            {s.role}, {s.company}
          </span>
          {showProgramme && (
            <Link to={`/programmes/${p.slug}`} className="story-prog">
              {p.name}, {s.year}
            </Link>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
