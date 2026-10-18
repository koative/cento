import { Play } from "lucide-react";
import { Link } from "../router";
import { series as allSeries, videos, type Series } from "../content";
import { Thumb } from "../components/VideoCard";
import { clock, date, useProgress, views } from "../lib/format";

export function SeriesPage({ series }: { series: Series }) {
  const progress = useProgress();
  const eps = videos.filter((v) => v.series === series.slug).reverse();
  const total = eps.reduce((sum, v) => sum + v.duration, 0);
  const resume =
    eps.find((v) => (progress[v.slug] ?? 0) < v.duration - 10) ?? eps[0];
  const started = eps.some((v) => progress[v.slug]);

  return (
    <>
      <header className="series-hero" data-tone={series.tone}>
        <img src={eps[eps.length - 1].image} alt="" width={1600} height={900} />
        <div className="wrap series-hero-inner">
          <h1>{series.name}</h1>
          <p className="lead">{series.pitch}</p>
          <p className="series-hero-meta">
            {eps.length} episodes · {clock(total)} total · {series.rhythm}
          </p>
          <Link to={"/videos/" + resume.slug} className="btn btn-spark">
            <Play size={18} fill="currentColor" aria-hidden="true" />{" "}
            {started ? "Keep watching" : "Play from episode 1"}
          </Link>
        </div>
      </header>

      <div className="wrap series-body" data-tone={series.tone}>
        <div className="series-about">
          {series.description.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <section aria-labelledby="h-eps">
          <h2 id="h-eps">Episodes, in order</h2>
          <ol className="episode-list">
            {eps.map((v, i) => (
              <li key={v.slug}>
                <Link to={"/videos/" + v.slug} className="episode">
                  <Thumb video={v} caption={false} />
                  <span className="episode-n">Ep. {i + 1}</span>
                  <span className="episode-title">{v.title}</span>
                  <span className="episode-summary">{v.summary}</span>
                  <span className="episode-meta">
                    {views(v.views)} · {date(v.published)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <nav className="other-series" aria-label="Other series">
          <h2>Other series</h2>
          <ul>
            {allSeries
              .filter((s) => s.slug !== series.slug)
              .map((s) => (
                <li key={s.slug} data-tone={s.tone}>
                  <Link to={"/series/" + s.slug}>
                    <strong>{s.name}</strong>
                    <span>{s.pitch}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
