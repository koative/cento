import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  about,
  brand,
  home,
  issueSponsor,
  posts,
  readerNotes,
  topics,
} from "../content";
import { issueLabel, longDate, minutes, postsIn } from "../lib/util";
import { PostRow } from "../components/PostRow";
import { Postmark, stampFor } from "../components/Postmark";
import { SubscribeForm } from "../components/SubscribeForm";

export function Home() {
  const [latest, ...rest] = posts;
  const opening = latest.body.find((b) => b.type === "p");
  const feature = posts.find((p) => p.topic === "energy" && p.image)!;
  const [lead, ...notes] = readerNotes;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1 className="hero-title">{brand.tagline}</h1>
          <p className="hero-pitch">{brand.pitch}</p>
          <SubscribeForm
            id="hero"
            note={`Free · ${brand.readers} readers · one click to unsubscribe`}
          />
        </div>

        <article className="latest" aria-labelledby="latest-title">
          <img
            className="latest-media"
            src={latest.image!.src}
            alt=""
            width={1024}
            height={643}
          />
          <Postmark
            className="latest-stamp"
            {...stampFor(latest.date, issueLabel(latest))}
          />
          <h2 id="latest-title" className="latest-title">
            <Link to={`/archive/${latest.slug}`}>{latest.title}</Link>
          </h2>
          <p className="latest-dek">{latest.dek}</p>
          <p className="meta">
            {issueLabel(latest)} ·{" "}
            <time dateTime={latest.date}>{longDate(latest.date)}</time> ·{" "}
            {minutes(latest)} min read
          </p>
        </article>
      </section>

      {opening && opening.type === "p" && (
        <section
          className="opening wrap-narrow"
          aria-labelledby="opening-title"
        >
          <h2 id="opening-title" className="visually-hidden">
            From the opening of {issueLabel(latest)}
          </h2>
          <blockquote className="opening-text">
            <p>{opening.text}</p>
          </blockquote>
          <Link to={`/archive/${latest.slug}`} className="text-link">
            Keep reading {issueLabel(latest)}{" "}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </section>
      )}

      <section
        className="wrap section index-section"
        aria-labelledby="recent-title"
      >
        <div className="section-head">
          <h2 id="recent-title">Recent letters</h2>
          <Link to="/archive" className="text-link">
            The full archive <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <ol className="post-list">
          {rest.slice(0, 6).map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </ol>
      </section>

      <section
        className="wrap section topics-band"
        aria-labelledby="topics-title"
      >
        <div className="section-head">
          <h2 id="topics-title">What I write about</h2>
          <Link to="/topics" className="text-link">
            All topics <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <ul className="topic-index">
          {topics.map((t) => (
            <li key={t.id}>
              <Link to={`/topics/${t.id}`} className="topic-index-name">
                {t.name}
              </Link>
              <span className="topic-index-count">
                {postsIn(t.id).length} letters
              </span>
              <p>{t.line}</p>
            </li>
          ))}
        </ul>
      </section>

      <figure className="feature-band">
        <img
          src={feature.image!.src}
          alt={feature.image!.alt}
          loading="lazy"
          width={1800}
          height={1350}
        />
        <figcaption className="wrap">
          <Link to={`/archive/${feature.slug}`} className="feature-link">
            <span className="feature-title">{feature.title}</span>
            <span className="feature-dek">{feature.dek}</span>
          </Link>
          <span className="credit">Photo: {feature.image!.credit}</span>
        </figcaption>
      </figure>

      <section className="wrap section ritual" aria-labelledby="ritual-title">
        <div className="section-head">
          <h2 id="ritual-title">{home.ritualTitle}</h2>
          <Link to="/subscribe" className="text-link">
            Compare plans <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <ol className="route">
          {home.ritual.map((r) => (
            <li key={r.name}>
              <span className="route-day">{r.day}</span>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section readers" aria-labelledby="readers-title">
        <h2 id="readers-title" className="visually-hidden">
          From readers’ replies
        </h2>
        <figure className="reader-lead">
          <blockquote>
            <p>{lead.quote}</p>
          </blockquote>
          <figcaption>{lead.who}</figcaption>
        </figure>
        <div className="reader-more">
          {notes.map((n) => (
            <figure key={n.who}>
              <blockquote>
                <p>{n.quote}</p>
              </blockquote>
              <figcaption>{n.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="wrap section writer" aria-labelledby="writer-title">
        <img
          src={about.portrait.src}
          alt={about.portrait.alt}
          loading="lazy"
          width={1800}
          height={1200}
        />
        <div>
          <h2 id="writer-title">Written by {brand.writer}</h2>
          <p>{about.bio[0]}</p>
          <p>{about.bio[2]}</p>
          <Link to="/about" className="text-link">
            About the writer <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section
        className="wrap section sponsor-note"
        aria-labelledby="sponsor-title"
      >
        <h2 id="sponsor-title">
          This week’s letter is supported by {issueSponsor.name}
        </h2>
        <p>{issueSponsor.text}</p>
        <Link to="/sponsor" className="text-link">
          Sponsor a Sunday <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <section className="close-band" aria-labelledby="close-title">
        <div className="wrap close-inner">
          <h2 id="close-title">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <SubscribeForm id="close" tone="ink" />
        </div>
      </section>
    </>
  );
}
