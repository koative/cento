import { Check } from "lucide-react";
import { Link } from "../router";
import { home, posts, pricing } from "../content";
import { money } from "../lib/format";
import { ChainBoard } from "../components/ChainBoard";
import { Phone } from "../components/Phone";
import { More, PostCard, StoreButtons } from "../components/Parts";
import { Cross } from "../components/marks";
import run from "../assets/run.jpg";

export default function Home() {
  const latest = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="page home">
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.hero.title}</h1>
          <p className="lede">{home.hero.lede}</p>
          <StoreButtons />
          <p className="quiet-note">{home.hero.note}</p>
        </div>
        <div className="hero-stage">
          <Phone screen="today" interactive className="phone-hero" />
          <p className="hero-hint">Go on, tap a habit.</p>
          <Phone
            screen="chain"
            label="The chain view: October with a red cross on every day and one yellow grace day"
            className="phone-back"
          />
        </div>
      </section>

      <section className="steps wrap" aria-labelledby="steps-title">
        <h2 id="steps-title">{home.steps.title}</h2>
        <ol>
          {home.steps.items.map((s, i) => (
            <li key={s.title}>
              <span className="step-mark" aria-hidden="true">
                {i + 1}
                {i === 2 ? null : <Cross />}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="chain-section" aria-labelledby="chain-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="chain-title">{home.chain.title}</h2>
            <p>{home.chain.lede}</p>
          </div>
          <ChainBoard />
        </div>
      </section>

      <section className="night" aria-labelledby="night-title">
        <div className="wrap night-grid">
          <Phone
            screen="evening"
            label="Evening check-in in dark mode: open habits first, ticked ones below"
          />
          <div>
            <h2 id="night-title">{home.evening.title}</h2>
            <p className="lede">{home.evening.lede}</p>
            <ul className="ticks">
              {home.evening.points.map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <Phone
            screen="lock"
            label="Lock screen at 6:40 with the seven-day chain widget and two reminders"
            className="phone-lock"
          />
        </div>
      </section>

      <section className="scene" aria-label="A member's story">
        <img
          src={run}
          alt="A runner alone on a tree-lined avenue at dawn, light coming through the mist"
          width={1023}
          height={720}
          loading="lazy"
        />
        <div className="wrap">
          <figure className="scene-quote">
            <blockquote>{home.scene.quote}</blockquote>
            <figcaption>
              {home.scene.who} ·{" "}
              <Link to="/blog/day-212-at-6-40">Read her story</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="index wrap" aria-labelledby="index-title">
        <h2 id="index-title">{home.index.title}</h2>
        <dl>
          {home.index.items.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
        <More to="/features">See every feature</More>
      </section>

      <section className="voices" aria-labelledby="voices-title">
        <div className="wrap">
          <h2 id="voices-title">{home.voices.title}</h2>
          <div className="voices-list">
            {home.voices.items.map((v) => (
              <figure key={v.name}>
                <p className="voice-day">
                  Day <strong>{v.day}</strong>
                  <span>{v.habit}</span>
                </p>
                <blockquote>{v.quote}</blockquote>
                <figcaption>{v.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="price-teaser wrap" aria-labelledby="price-title">
        <div>
          <h2 id="price-title">{home.pricing.title}</h2>
          <p className="lede">{home.pricing.lede}</p>
          <More to="/pricing">Compare plans</More>
        </div>
        <div className="teaser-plans">
          {pricing.plans.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="teaser-plan"
              data-featured={p.featured ? "" : undefined}
            >
              <p className="teaser-name">{p.name}</p>
              <p className="teaser-price">
                {p.yearly ? (
                  <>
                    {money(p.yearly)}
                    <small> a year, or {money(p.monthly)} a month</small>
                  </>
                ) : (
                  <>
                    $0<small> for up to 3 habits</small>
                  </>
                )}
              </p>
              <p>{p.pitch}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="latest wrap" aria-labelledby="latest-title">
        <div className="section-row">
          <h2 id="latest-title">{home.blog.title}</h2>
          <More to="/blog">All posts</More>
        </div>
        <div className="post-grid">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-inner">
          <div className="close-day" aria-hidden="true">
            <span>1</span>
            <Cross />
          </div>
          <div>
            <h2 id="close-title">{home.close.title}</h2>
            <p className="lede">{home.close.lede}</p>
            <StoreButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
