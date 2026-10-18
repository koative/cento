import { Link } from "../router";
import { series, type Video } from "../content";
import { clock, date, useProgress, views } from "../lib/format";

const tone = (v: Video) =>
  series.find((s) => s.slug === v.series)?.tone ?? "soap";

/** 16:9 frame with the painted caption, duration badge and your watch progress. */
export function Thumb({
  video,
  eager = false,
  caption = true,
}: {
  video: Video;
  eager?: boolean;
  caption?: boolean;
}) {
  const seen = useProgress()[video.slug] ?? 0;
  return (
    <div className="thumb" data-tone={tone(video)}>
      <img
        src={video.image}
        alt=""
        width={1600}
        height={900}
        loading={eager ? "eager" : "lazy"}
      />
      {caption && (
        <span className="thumb-caption" aria-hidden="true">
          {video.caption}
        </span>
      )}
      <span className="thumb-time">{clock(video.duration)}</span>
      {seen > 0 && (
        <span className="thumb-progress" aria-hidden="true">
          <span
            style={{
              width: Math.min(100, (seen / video.duration) * 100) + "%",
            }}
          />
        </span>
      )}
    </div>
  );
}

export function VideoCard({
  video,
  showSeries = true,
}: {
  video: Video;
  showSeries?: boolean;
}) {
  const s = series.find((x) => x.slug === video.series);
  return (
    <article className="video-card">
      <Link to={"/videos/" + video.slug} className="video-card-link">
        <Thumb video={video} />
        <h3>{video.title}</h3>
      </Link>
      <p className="video-meta">
        {showSeries && s && <span data-tone={s.tone}>{s.name}</span>}
        <span>
          {views(video.views)} ·{" "}
          <time dateTime={video.published}>{date(video.published)}</time>
        </span>
      </p>
    </article>
  );
}
