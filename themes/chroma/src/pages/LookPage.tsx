import { ArrowLeft } from "lucide-react";
import { Link, navigate } from "../router";
import { levels, looks, stylists, type Look } from "../content";
import { startVisit } from "../lib/visit";
import { ChairTimeline } from "../components/ChairTimeline";
import { LookTile } from "../components/Tiles";

export function LookPage({ look }: { look: Look }) {
  const by = stylists.find((s) => s.id === look.stylist)!;
  const related = looks
    .filter(
      (l) =>
        l.id !== look.id &&
        (l.category === look.category || l.stylist === look.stylist),
    )
    .slice(0, 3);

  return (
    <article className="page look-page">
      <div className="wrap">
        <Link to="/lookbook" className="back-link">
          <ArrowLeft aria-hidden="true" size={18} /> Lookbook
        </Link>
      </div>
      <div className="wrap look-layout">
        <figure className="look-photo">
          <img
            src={look.photo.src}
            alt={look.photo.alt}
            width={look.photo.w}
            height={look.photo.h}
          />
        </figure>
        <div className="look-info">
          <h1>{look.name}</h1>
          <p className="lede">{look.story}</p>

          <h2>The formula card</h2>
          <dl className="formula">
            {look.formula.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div>
              <dt>Upkeep</dt>
              <dd>{look.upkeep}</dd>
            </div>
          </dl>

          <Link to={`/stylists/${by.id}`} className="by-line">
            <img src={by.photo.src} alt="" width={48} height={48} />
            <span>
              <strong>{by.name}</strong>
              {by.role} · {levels[by.level].label}
            </span>
          </Link>

          <h2>The appointment</h2>
          <ChairTimeline ids={look.services} level={by.level} />
          <button
            type="button"
            className="btn btn-primary btn-large"
            onClick={() => {
              startVisit(look.services, by.id);
              navigate("/book");
            }}
          >
            Book this look with {by.name.split(" ")[0]}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap related" aria-labelledby="related-h">
          <h2 id="related-h">More like this</h2>
          <div className="look-row">
            {related.map((l) => (
              <LookTile key={l.id} look={l} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
