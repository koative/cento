import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  home,
  images,
  packages,
  posts,
  process,
  testimonials,
  weddings,
} from "../content";
import { Img, PostCard, WeddingCard } from "../components/Cards";
import {
  iso,
  longDate,
  money,
  schedule,
  setPlan,
  today,
  usePlan,
  weeksUntil,
} from "../lib/plan";

function Countdown() {
  const plan = usePlan();
  const weeks = weeksUntil(plan.date);
  const steps = schedule(plan);
  const next = steps.find((s) => s.state === "next");
  const late = steps.filter((s) => s.state === "late").length;

  return (
    <div className="countdown place-card">
      <div className="field">
        <label htmlFor="h-date">Your wedding date</label>
        <input
          id="h-date"
          type="date"
          min={iso(today())}
          value={plan.date}
          onChange={(e) => e.target.value && setPlan({ date: e.target.value })}
        />
      </div>
      <p className="countdown-weeks" aria-live="polite">
        {weeks >= 1 ? (
          <>
            <span className="num">{weeks}</span> weeks
          </>
        ) : (
          "Pick a future date"
        )}
      </p>
      {weeks >= 1 && (
        <p className="countdown-next">
          {next ? (
            <>
              Next: <strong>{next.title.toLowerCase()}</strong>, by{" "}
              {longDate(next.due)}.
            </>
          ) : (
            "Every milestone is behind you. Time for the final week."
          )}
          {late > 0 &&
            ` ${late} earlier ${late === 1 ? "step is" : "steps are"} already due.`}
        </p>
      )}
      <Link to="/planner" className="btn">
        Open the full planner{" "}
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function Home() {
  const [first, second, third] = weddings;
  const featured = weddings.find((w) => w.slug === "fenwick-barn")!;
  const more = weddings.filter(
    (w) => ![first, second, third, featured].includes(w),
  );

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="actions">
            <Link to="/enquire" className="btn">
              Enquire about your date
            </Link>
            <Link to="/weddings" className="text-link">
              See the weddings
            </Link>
          </div>
          <p className="availability">{brand.availability}</p>
        </div>
        <div className="hero-folio">
          {[first, second, third].map((w, i) => (
            <Link
              key={w.slug}
              to={`/weddings/${w.slug}`}
              className={`folio-item folio-${i}`}
            >
              <span className="frame">
                <Img photo={w.cover} lazy={false} />
              </span>
              <span className="folio-cap">
                {w.couple} <span>{w.venue}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-packages" aria-labelledby="hp-title">
        <h2 id="hp-title">Four ways to work with us</h2>
        <ul className="menu-card">
          {packages.map((p) => (
            <li key={p.id}>
              <Link to="/services">
                <span className="mc-name">{p.name}</span>
                <span className="mc-kind">{p.kind}</span>
                <span className="mc-price">
                  from <span className="num">{money(p.prices[0]!)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="fine">
          Flat fees by guest count. No percentage of your budget, no supplier
          commission.
        </p>
      </section>

      <section className="feature" aria-labelledby="ft-title">
        <figure className="frame">
          <Img photo={featured.cover} />
        </figure>
        <div className="feature-copy">
          <h2 id="ft-title">
            {featured.couple}, {featured.venue}
          </h2>
          <p className="meta">
            {longDate(featured.date)} ·{" "}
            <span className="num">{featured.guests}</span> guests ·{" "}
            {featured.planningMonths} months of planning
          </p>
          <p>{featured.story[1].paragraphs[0]}</p>
          <blockquote>
            <p>{featured.quote}</p>
          </blockquote>
          <Link to={`/weddings/${featured.slug}`} className="text-link">
            Read their story
          </Link>
        </div>
      </section>

      <section className="home-planner" aria-labelledby="pl-title">
        <div>
          <h2 id="pl-title">{home.plannerTitle}</h2>
          <p>{home.plannerText}</p>
        </div>
        <Countdown />
      </section>

      <section className="approach" aria-labelledby="ap-title">
        <div className="approach-copy">
          <h2 id="ap-title">{home.storyTitle}</h2>
          {home.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <Link to="/about" className="text-link">
            Meet the studio
          </Link>
        </div>
        <figure className="frame tilt">
          <Img photo={images.ceremony} />
        </figure>
      </section>

      <section className="process" aria-labelledby="pr-title">
        <h2 id="pr-title">{home.processTitle}</h2>
        <ol className="process-list">
          {process.map((s) => (
            <li key={s.title}>
              <p className="when">{s.when}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-more" aria-labelledby="more-title">
        <div className="section-head">
          <h2 id="more-title">More weddings</h2>
          <Link to="/weddings" className="text-link">
            All {weddings.length} stories
          </Link>
        </div>
        <div className="wedding-grid three">
          {more.map((w) => (
            <WeddingCard key={w.slug} w={w} />
          ))}
        </div>
      </section>

      <section className="voices" aria-labelledby="vo-title">
        <h2 id="vo-title" className="visually-hidden">
          What couples say
        </h2>
        {testimonials.map((t, i) => (
          <figure key={t.by} className={i === 0 ? "voice voice-lead" : "voice"}>
            <blockquote>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption>
              {t.by}, {t.where}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="home-journal" aria-labelledby="hj-title">
        <div className="section-head">
          <h2 id="hj-title">From the journal</h2>
          <Link to="/journal" className="text-link">
            All articles
          </Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section className="close">
        <figure className="close-image">
          <Img photo={images.rings} />
        </figure>
        <div className="close-copy">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/enquire" className="btn btn-light">
              Start an enquiry
            </Link>
            <a href={`mailto:${brand.email}`} className="text-link">
              {brand.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
