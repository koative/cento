import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { home, pricing, releases, shortcuts, week } from "../content";
import { formatDay, formatPrice } from "../lib/format";
import { BoardPreview } from "../components/BoardPreview";
import { Planner } from "../components/Planner";
import { Keys } from "../components/Keys";
import wall from "../assets/planning-wall.jpg";

const viewLinks = ["/app", "/app/list", "/app/issues/FRN-201"];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-copy">
          <h1>
            {home.h1[0]} <span className="hl">{home.h1[1]}</span>
          </h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to={home.primary.to} className="btn btn-primary btn-lg">
              {home.primary.label}
            </Link>
            <Link to={home.secondary.to} className="btn btn-line btn-lg">
              {home.secondary.label} <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <p className="fine">{home.note}</p>
        </div>
        <div className="wrap hero-board">
          <BoardPreview />
        </div>
      </section>

      <section className="section week">
        <div className="wrap">
          <div className="section-head">
            <h2>{home.week.title}</h2>
            <p>{home.week.lede}</p>
          </div>
          <ol className="week-strip">
            {week.map((w) => (
              <li key={w.ritual}>
                <p className="week-day">{w.day}</p>
                <h3>{w.ritual}</h3>
                <p className="week-time">{w.time}</p>
                <p>{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section planner-section" aria-labelledby="planner-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="planner-h">{home.planner.title}</h2>
            <p>{home.planner.lede}</p>
          </div>
          <Planner />
        </div>
      </section>

      <section className="section views">
        <div className="wrap">
          <h2>{home.views.title}</h2>
          <ul className="view-rows">
            {home.views.items.map((v, n) => (
              <li key={v.name}>
                <h3>{v.name}</h3>
                <p>{v.text}</p>
                <Link to={viewLinks[n]} className="text-link">
                  Open the {v.name.toLowerCase()} in the demo{" "}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section keys-band">
        <div className="wrap keys-grid">
          <div>
            <h2>{home.keys.title}</h2>
            <p>{home.keys.lede}</p>
          </div>
          <table className="keys-table">
            <caption className="sr-only">Keyboard shortcuts</caption>
            <tbody>
              {shortcuts.map((s) => (
                <tr key={s.action}>
                  <td>
                    <Keys keys={s.keys} />
                  </td>
                  <td>{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section quote-section">
        <figure className="wrap quote">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.quote.person}</strong> {home.quote.role}
            <Link to={`/customers/${home.quote.story}`} className="text-link">
              Read the story <ArrowRight size={16} aria-hidden />
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="section connect">
        <div className="wrap connect-grid">
          <div className="section-head">
            <h2>{home.connect.title}</h2>
            <p>{home.connect.lede}</p>
          </div>
          <dl className="connect-list">
            {home.connect.items.map((c) => (
              <div key={c.name}>
                <dt>{c.name}</dt>
                <dd>{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section shipped">
        <div className="wrap shipped-grid">
          <div>
            <h2>Shipped lately</h2>
            <p>
              We run Sprint on Sprint, in two-week cycles. This is what reached
              Done.
            </p>
            <Link to="/changelog" className="text-link">
              Full changelog <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <ol className="release-mini">
            {releases.slice(0, 3).map((r) => (
              <li key={r.version}>
                <p className="release-meta">
                  <span className="tag" data-kind={r.kind}>
                    {r.kind}
                  </span>
                  <span className="num">v{r.version}</span>
                  <time dateTime={r.date}>{formatDay(r.date)}</time>
                </p>
                <h3>{r.title}</h3>
                <p>{r.notes[0]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section price-strip">
        <div className="wrap">
          <h2>Three plans, one price per person</h2>
          <ul className="price-rows">
            {pricing.plans.map((p) => (
              <li key={p.id}>
                <h3>{p.name}</h3>
                <p className="price-rows-num">
                  {formatPrice(p.yearly)}
                  <span>
                    {p.monthly === 0
                      ? "forever"
                      : "per person / month, billed yearly"}
                  </span>
                </p>
                <p>{p.blurb}</p>
              </li>
            ))}
          </ul>
          <Link to="/pricing" className="text-link">
            Compare every plan <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-grid">
          <img
            src={wall}
            alt="A team member points at index cards pinned across several planning boards on an office wall"
            width={1024}
            height={682}
            loading="lazy"
          />
          <div>
            <h2>{home.close.title}</h2>
            <p>{home.close.lede}</p>
            <div className="actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start free
              </Link>
              <Link to="/contact" className="btn btn-line btn-lg">
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
