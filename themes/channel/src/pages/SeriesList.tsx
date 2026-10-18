import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { series, videos } from "../content";
import { clock } from "../lib/format";

export function SeriesList() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Four series, one shop</h1>
        <p className="lead">
          Rescues, cheap builds, shop upgrades and straight answers. Pick the
          one that matches your weekend, then watch it in order.
        </p>
      </header>
      <div className="wrap series-blocks">
        {series.map((s) => {
          const eps = videos.filter((v) => v.series === s.slug);
          const total = eps.reduce((sum, v) => sum + v.duration, 0);
          const first = eps[eps.length - 1];
          return (
            <section
              key={s.slug}
              className="series-block"
              data-tone={s.tone}
              aria-labelledby={"h-" + s.slug}
            >
              <Link
                to={"/series/" + s.slug}
                className="series-cover"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={eps[0].image}
                  alt=""
                  width={1600}
                  height={900}
                  loading="lazy"
                />
                <span className="series-cover-name">{s.name}</span>
              </Link>
              <div className="series-copy">
                <h2 id={"h-" + s.slug}>
                  <Link to={"/series/" + s.slug}>{s.name}</Link>
                </h2>
                <p className="series-pitch">{s.pitch}</p>
                <p>{s.description[0]}</p>
                <dl className="facts">
                  <div>
                    <dt>Episodes</dt>
                    <dd>{eps.length}</dd>
                  </div>
                  <div>
                    <dt>Runtime</dt>
                    <dd>{clock(total)}</dd>
                  </div>
                  <div>
                    <dt>New episodes</dt>
                    <dd>{s.rhythm}</dd>
                  </div>
                </dl>
                <div className="actions">
                  <Link to={"/videos/" + first.slug} className="btn btn-spark">
                    Start at episode 1
                  </Link>
                  <Link to={"/series/" + s.slug} className="more">
                    All episodes <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
