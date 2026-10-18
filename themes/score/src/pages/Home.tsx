import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, fees, home, images, programmes, teachers } from "../content";
import { clock, longDate, money } from "../lib/format";
import { fromPrice, season } from "../lib/school";
import { BarSystem, Coda, RecitalRow } from "../components/Bits";
import { KeyboardStaff } from "../components/KeyboardStaff";

export function Home() {
  const { upcoming } = season();
  const [next, ...later] = upcoming;
  const featured = teachers.slice(0, 6);
  const ines = teachers[0];

  return (
    <div className="page home">
      <section className="hero wrap">
        <div className="hero-text">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/trial" className="btn btn-primary btn-large">
              Book a free trial lesson
            </Link>
            <Link to="/programmes" className="btn btn-ghost btn-large">
              See all programmes
            </Link>
          </div>
          <p className="hero-note">
            Trial lessons every weekday from 3 pm and Saturday mornings ·{" "}
            {brand.address.join(", ")}
          </p>
        </div>
        <figure className="hero-figure">
          <img
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.w}
            height={images.hero.h}
            fetchPriority="high"
          />
          <figcaption>Piano, Room 2, a Tuesday at 4:30.</figcaption>
        </figure>
      </section>

      <section className="contents wrap" aria-labelledby="contents-h">
        <div className="contents-head">
          <h2 id="contents-h">Contents</h2>
          <p>
            Ten programmes, from a first song at three to diploma repertoire.
            Private lessons are 30, 45 or 60 minutes, once a week.
          </p>
        </div>
        <ul className="toc">
          {programmes.map((p) => (
            <li key={p.slug}>
              <Link to={`/programmes/${p.slug}`} className="toc-row">
                <span className="toc-name">{p.name}</span>
                <span className="toc-leader" aria-hidden="true" />
                <span className="toc-meta">
                  {p.ages} · from {money(fromPrice(p))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="first-lesson wrap" aria-labelledby="first-h">
        <h2 id="first-h">Your first lesson, bar by bar</h2>
        <BarSystem
          items={home.firstLesson}
          label="From booking to weekly lessons, in four steps"
        />
      </section>

      <section className="play-band" aria-labelledby="play-h">
        <div className="wrap play-grid">
          <div className="play-text">
            <h2 id="play-h">{home.practice.title}</h2>
            <p>{home.practice.text}</p>
            <Link to="/practice" className="text-link on-dark">
              Open the practice room <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <KeyboardStaff compact />
        </div>
      </section>

      <section className="faculty wrap" aria-labelledby="faculty-h">
        <div className="faculty-head">
          <h2 id="faculty-h">The faculty</h2>
          <blockquote className="pull">
            <p>“{ines.quote}”</p>
            <footer>
              <Link to={`/teachers/${ines.slug}`}>{ines.name}</Link>,{" "}
              {ines.role.toLowerCase()}
            </footer>
          </blockquote>
        </div>
        <ul className="faculty-list">
          {featured.map((t) => (
            <li key={t.slug}>
              <Link to={`/teachers/${t.slug}`} className="faculty-name">
                {t.name}
              </Link>
              <span className="faculty-role">{t.role}</span>
              <p>{t.short}</p>
            </li>
          ))}
        </ul>
        <Link to="/teachers" className="text-link">
          All ten teachers <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      {next && (
        <section className="recitals-teaser" aria-labelledby="recitals-h">
          <div className="wrap recitals-grid">
            <img
              src={images.recitalHall.src}
              alt={images.recitalHall.alt}
              width={images.recitalHall.w}
              height={images.recitalHall.h}
              loading="lazy"
            />
            <div>
              <h2 id="recitals-h">Next in the Long Room</h2>
              <article className="programme-sheet">
                <p className="sheet-date">
                  {longDate(next.date)} · {clock(next.time)}
                </p>
                <h3>
                  <Link to={`/recitals/${next.id}`}>{next.title}</Link>
                </h3>
                <p className="sheet-kind">
                  {next.kind} · {next.entry}
                </p>
                <ol className="sheet-list">
                  {next.programme.slice(0, 4).map((item) => (
                    <li key={item.piece}>
                      <span className="sheet-piece">
                        {item.composer} <em>{item.piece}</em>
                      </span>
                      <span className="sheet-performer">{item.performers}</span>
                    </li>
                  ))}
                </ol>
              </article>
              <div className="later">
                {later.slice(0, 2).map((r) => (
                  <RecitalRow key={r.id} r={r} />
                ))}
              </div>
              <Link to="/recitals" className="text-link">
                The whole season <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="ensemble" aria-labelledby="ensemble-h">
        <img
          src={images.ensemble.src}
          alt={images.ensemble.alt}
          width={images.ensemble.w}
          height={images.ensemble.h}
          loading="lazy"
        />
        <div className="wrap ensemble-text">
          <h2 id="ensemble-h">{home.ensemble.title}</h2>
          <p>{home.ensemble.text}</p>
          <Link to="/programmes/chamber" className="text-link">
            Ensembles & chamber music <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="voices wrap" aria-labelledby="voices-h">
        <h2 id="voices-h" className="sr-only">
          From students and parents
        </h2>
        {home.voices.map((v) => (
          <figure key={v.who} className="voice">
            <blockquote>
              <p>{v.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{v.who}</strong>
              <span>{v.detail}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="fees-teaser wrap" aria-labelledby="fees-h">
        <h2 id="fees-h">What it costs</h2>
        <p>{home.fees}</p>
        <table className="rate-table">
          <caption className="sr-only">Private lesson prices</caption>
          <thead>
            <tr>
              <th scope="col">Weekly lesson</th>
              <th scope="col">Per lesson</th>
              <th scope="col">Per {fees.termWeeks}-week term</th>
            </tr>
          </thead>
          <tbody>
            {fees.private.map((r) => (
              <tr key={r.minutes}>
                <th scope="row">{r.minutes} minutes</th>
                <td>{money(r.perLesson)}</td>
                <td>{money(r.perLesson * fees.termWeeks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/fees" className="text-link">
          Fees, hire and bursaries <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <Coda title={home.close.title} text={home.close.text} />
    </div>
  );
}
