import { Link } from "../router";
import { products, series, videos, type Video } from "../content";
import { Player } from "../components/Player";
import { VideoCard } from "../components/VideoCard";
import { ProductCard } from "../components/ProductCard";
import { date, views } from "../lib/format";

export function VideoPage({ video }: { video: Video }) {
  const s = series.find((x) => x.slug === video.series)!;
  const related = videos
    .filter((v) => v.series === video.series && v.slug !== video.slug)
    .slice(0, 3);
  const more =
    related.length < 3
      ? videos
          .filter((v) => v.series !== video.series)
          .slice(0, 3 - related.length)
      : [];
  const gear = products.filter((p) =>
    video.onScreen.some((o) => o.product === p.id),
  );
  const episode =
    videos
      .filter((v) => v.series === video.series)
      .reverse()
      .indexOf(video) + 1;

  return (
    <>
      <section className="watch wrap" aria-label="Episode">
        <Player
          video={video}
          head={
            <div className="watch-head">
              <h1>{video.title}</h1>
              <p className="video-meta">
                <Link to={"/series/" + s.slug} data-tone={s.tone}>
                  {s.name}, episode {episode}
                </Link>
                <span>
                  {views(video.views)} ·{" "}
                  <time dateTime={video.published}>
                    {date(video.published)}
                  </time>
                </span>
              </p>
            </div>
          }
        >
          <article className="watch-info">
            <p className="lead">{video.summary}</p>
            {video.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="watch-cta">
              Building along? Plans and the cut list for this episode are in the{" "}
              <Link to="/membership">Night Shift membership</Link>.
            </p>
          </article>
        </Player>
      </section>

      {gear.length > 0 && (
        <section className="section wrap" aria-labelledby="h-gear">
          <div className="section-head">
            <h2 id="h-gear">Seen in this episode</h2>
            <Link to="/shop" className="more">
              All merch
            </Link>
          </div>
          <div className="product-grid">
            {gear.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="section wrap" aria-labelledby="h-next">
        <div className="section-head">
          <h2 id="h-next">Up next</h2>
          <Link to="/videos" className="more">
            All videos
          </Link>
        </div>
        <div className="video-grid video-grid-3">
          {[...related, ...more].map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      </section>
    </>
  );
}
