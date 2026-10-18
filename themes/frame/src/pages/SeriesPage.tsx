import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { prints, series as allSeries, type Series } from "../content";
import { MarksTray, Viewer } from "../components/Viewer";
import { PrintCard } from "../components/PrintCard";

export function SeriesPage({ series }: { series: Series }) {
  const ids = series.frames.map((f) => f.id);
  const available = prints.filter((p) => ids.includes(p.frameId));
  const next = allSeries[(allSeries.indexOf(series) + 1) % allSeries.length];

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/series">Series</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{series.title}</span>
      </nav>
      <header className="series-head">
        <h1>{series.title}</h1>
        <p className="lede">{series.summary}</p>
        <dl className="facts">
          <div>
            <dt>Subject</dt>
            <dd>{series.subject}</dd>
          </div>
          <div>
            <dt>Years</dt>
            <dd>{series.years}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{series.place}</dd>
          </div>
          <div>
            <dt>Frames</dt>
            <dd>{series.frames.length} shown</dd>
          </div>
        </dl>
      </header>

      <Viewer series={series} />

      <div className="series-body">
        <section className="essay" aria-labelledby="h-essay">
          <h2 id="h-essay">About the series</h2>
          {series.essay.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <ul className="shown">
            {series.shown.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <aside className="marks-aside" aria-labelledby="h-marks">
          <h2 id="h-marks">Your marks</h2>
          <MarksTray withCta />
        </aside>
      </div>

      {available.length > 0 && (
        <section className="section" aria-labelledby="h-series-prints">
          <div className="section-head">
            <h2 id="h-series-prints">Prints from this series</h2>
            <Link to="/prints" className="text-link">
              All prints <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="print-grid">
            {available.map((p) => (
              <PrintCard key={p.id} print={p} />
            ))}
          </div>
        </section>
      )}

      <Link to={`/series/${next.slug}`} className="next-series">
        <span className="next-series-label">Next series</span>
        <span className="next-series-title">{next.title}</span>
        <img
          src={next.frames[0].src}
          alt=""
          width={next.frames[0].w}
          height={next.frames[0].h}
          loading="lazy"
        />
      </Link>
    </div>
  );
}
