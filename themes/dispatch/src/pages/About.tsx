import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, posts } from "../content";
import { SubscribeForm } from "../components/SubscribeForm";

export function About() {
  const craft = posts.find((p) => p.topic === "desk" && p.kind === "letter")!;
  return (
    <div className="page about">
      <header className="wrap about-head">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.lede}</p>
        </div>
        <figure className="about-portrait">
          <img
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={1800}
            height={1200}
          />
          <figcaption>Photo: {about.portrait.credit}</figcaption>
        </figure>
      </header>

      <section
        className="wrap-narrow about-bio prose-plain"
        aria-label="Biography"
      >
        {about.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          I draft every letter on a typewriter first —{" "}
          <Link to={`/archive/${craft.slug}`}>
            here’s why, and how the whole week works
          </Link>
          .
        </p>
      </section>

      <section className="wrap section" aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="section-title">
          Seven years of Sundays
        </h2>
        <ol className="timeline">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="timeline-year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="principles-title">
        <h2 id="principles-title" className="section-title">
          {about.principlesTitle}
        </h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.name}>
              <dt>{p.name}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="wrap section contact-strip"
        aria-labelledby="write-title"
      >
        <div>
          <h2 id="write-title">Write to me</h2>
          <p>
            Story tips, corrections and replies all go to the same inbox, and I
            read every one. Letters on paper are welcome too — the best ones end
            up in the Almanac.
          </p>
        </div>
        <address>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <span>{brand.postal.join(", ")}</span>
        </address>
      </section>

      <section
        className="wrap-narrow section about-sub"
        aria-labelledby="about-sub-title"
      >
        <h2 id="about-sub-title">Read along on Sunday</h2>
        <SubscribeForm id="about" />
        <Link to="/subscribe" className="text-link">
          Or support the reporting <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </div>
  );
}
