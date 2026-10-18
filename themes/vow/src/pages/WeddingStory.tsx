import { Link } from "../router";
import { packages, weddings, type Wedding } from "../content";
import { Img, WeddingCard } from "../components/Cards";
import { longDate } from "../lib/plan";

export function WeddingStory({ w }: { w: Wedding }) {
  const pkg = packages.find((p) => p.id === w.packageId)!;
  const related = [
    ...weddings.filter((o) => o.slug !== w.slug && o.setting === w.setting),
    ...weddings.filter((o) => o.slug !== w.slug && o.setting !== w.setting),
  ].slice(0, 3);

  return (
    <article className="page story-page">
      <header className="story-head">
        <p className="crumbs">
          <Link to="/weddings">Weddings</Link> / {w.setting}
        </p>
        <h1>{w.couple}</h1>
        <p className="lede">{w.excerpt}</p>
      </header>

      <figure className="story-cover frame">
        <Img photo={w.cover} lazy={false} />
      </figure>

      <div className="story-body">
        <dl className="specs">
          <div>
            <dt>Date</dt>
            <dd>{longDate(w.date)}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>
              {w.venue}, {w.place}
            </dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd className="num">{w.guests}</dd>
          </div>
          <div>
            <dt>Package</dt>
            <dd>
              <Link to="/services">{pkg.name}</Link>
            </dd>
          </div>
          <div>
            <dt>Planning time</dt>
            <dd>
              <span className="num">{w.planningMonths}</span> months
            </dd>
          </div>
          <div>
            <dt>Palette</dt>
            <dd>{w.palette.join(", ")}</dd>
          </div>
        </dl>

        <div className="prose">
          {w.story.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>

      <div className="story-gallery" data-count={w.gallery.length}>
        {w.gallery.map((g) => (
          <figure key={g.src} className="frame">
            <Img photo={g} />
          </figure>
        ))}
      </div>

      <blockquote className="pull">
        <p>{w.quote}</p>
        <footer>{w.couple}</footer>
      </blockquote>

      <section className="credits" aria-labelledby="cr-title">
        <h2 id="cr-title" className="h3">
          With thanks to
        </h2>
        <dl>
          {w.credits.map(([role, name]) => (
            <div key={role}>
              <dt>{role}</dt>
              <dd>{name}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="related" aria-labelledby="rel-title">
        <h2 id="rel-title">More weddings</h2>
        <div className="wedding-grid three">
          {related.map((o) => (
            <WeddingCard key={o.slug} w={o} />
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Planning something like this?</h2>
        <p>
          {w.couple.split(" & ")[0]} and {w.couple.split(" & ")[1]} booked{" "}
          {pkg.name}. Tell us your date and we will tell you what is possible.
        </p>
        <div className="actions">
          <Link to="/enquire" className="btn">
            Enquire
          </Link>
          <Link to="/planner" className="text-link">
            Count back from your date
          </Link>
        </div>
      </section>
    </article>
  );
}
