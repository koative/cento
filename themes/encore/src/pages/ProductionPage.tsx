import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  accessNotes,
  productions,
  zoneNames,
  type Production,
  type Zone,
} from "../content";
import { availability, performancesOf, priceFrom } from "../lib/house";
import { clock, money, runDates, weekDate } from "../lib/util";
import { ProductionRow } from "../components/ProductionRow";

export function ProductionPage({ p }: { p: Production }) {
  const perfs = performancesOf(p);
  const related = productions
    .filter(
      (o) => o.slug !== p.slug && (o.genre === p.genre || o.stage === p.stage),
    )
    .slice(0, 3);
  const prices = (Object.entries(p.prices) as [Zone, number][]).filter(
    ([zone]) => zone !== "wheelchair",
  );

  return (
    <>
      <section className="show-hero house-dark">
        <img
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.w}
          height={p.image.h}
        />
        <div className="wrap show-hero-copy">
          <h1 className="display">{p.title}</h1>
          <p className="show-credit">{p.credit}</p>
          <p className="show-run">
            {p.stage} · {runDates(p.opens, p.closes)}
            {p.label && <span className="tag-red">{p.label}</span>}
          </p>
          {perfs.length > 0 ? (
            <Link to={`/book/${p.slug}`} className="btn btn-red">
              Choose your seats · from {money(priceFrom(p))}
            </Link>
          ) : (
            <p className="closed-note">This production has closed.</p>
          )}
        </div>
      </section>

      <div className="wrap facts" role="list">
        {[
          ["Running time", p.runningTime],
          ["Age guidance", p.age],
          [
            "Where",
            p.stage === "Mainstage"
              ? "Mainstage, 312 seats"
              : "Studio, 98 seats",
          ],
          [
            "Tickets",
            `${money(priceFrom(p))} – ${money(Math.max(...Object.values(p.prices)))}`,
          ],
        ].map(([k, v]) => (
          <p role="listitem" key={k}>
            <span>{k}</span>
            {v}
          </p>
        ))}
      </div>

      <section className="section">
        <div className="wrap show-body">
          <div className="prose">
            <h2 className="show-logline">{p.logline}</h2>
            {p.synopsis.map((s) => (
              <p key={s}>{s}</p>
            ))}
            <details className="disclosure">
              <summary>Content guidance</summary>
              <p>{p.guidance}</p>
            </details>
          </div>
          <aside className="credits">
            <h2>Cast</h2>
            <dl>
              {p.cast.map((c) => (
                <div key={c.name + c.role}>
                  <dt>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
            <h2>Creative team</h2>
            <dl>
              {p.creatives.map((c) => (
                <div key={c.name + c.role}>
                  <dt>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {p.quotes.length > 0 && (
        <section className="quotes wrap" aria-label="What the critics said">
          {p.quotes.map((q) => (
            <blockquote key={q.source}>
              <p>“{q.text}”</p>
              <cite>{q.source}</cite>
            </blockquote>
          ))}
        </section>
      )}

      {p.gallery.length > 0 && (
        <section className="section">
          <div className="wrap gallery">
            <h2 className="sr-only">Production images</h2>
            {p.gallery.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}

      <section className="section section-tint">
        <div className="wrap perf-grid">
          <div>
            <h2>Performances</h2>
            <p>
              Tuesday to Saturday at 7:30 pm, matinees Saturday and Sunday at
              2:00 pm. No performances on Mondays.
            </p>
            <h3>Prices</h3>
            <ul className="price-list">
              {prices.map(([zone, price]) => (
                <li key={zone}>
                  <span>{zoneNames[zone]}</span>
                  <span className="num">{money(price)}</span>
                </li>
              ))}
              <li>
                <span>Under 30, any seat</span>
                <span className="num">{money(30)}</span>
              </li>
            </ul>
            {p.access.length > 0 && (
              <>
                <h3>Access performances</h3>
                <ul className="access-list">
                  {p.access.map((a) => (
                    <li key={a.date + a.kind}>
                      <strong>
                        {a.kind} · {weekDate(a.date)}, {clock(a.time)}
                      </strong>
                      <span>{accessNotes[a.kind]}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            {perfs.length ? (
              <ul className="perf-list">
                {perfs.slice(0, 14).map((x) => {
                  const a = availability(x.soldPct);
                  return (
                    <li key={x.id}>
                      <Link to={`/book/${p.slug}?p=${x.id}`}>
                        <span className="pl-date">{weekDate(x.date)}</span>
                        <span className="pl-time num">{clock(x.time)}</span>
                        <span className="pl-flag">
                          {x.access ?? (x.preview ? "Preview" : "")}
                        </span>
                        <span className="avail" data-level={a.level}>
                          {a.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="empty">
                All performances of {p.title} have taken place.
              </p>
            )}
            {perfs.length > 14 && (
              <Link to={`/book/${p.slug}`} className="text-link">
                All {perfs.length} performances{" "}
                <ArrowRight aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Also this season</h2>
          <div className="bill">
            {related.map((r) => (
              <ProductionRow key={r.slug} p={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
