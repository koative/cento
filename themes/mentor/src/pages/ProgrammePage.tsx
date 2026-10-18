import { useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import { Link } from "../router";
import { images, programmes, stories, type Programme } from "../content";
import { longDate, money } from "../lib/format";
import { upcoming } from "../lib/programmes";
import { Cover } from "../components/Cover";
import { StoryQuote } from "../components/StoryQuote";

export function ProgrammePage({ p }: { p: Programme }) {
  const cohorts = upcoming(p);
  const [cohort, setCohort] = useState(
    cohorts.find((c) => c.left > 0)?.start ?? "",
  );
  const [pay, setPay] = useState<"full" | "plan">("full");
  const [tab, setTab] = useState(0);
  const img = images[p.image];
  const own = stories.filter((s) => s.programme === p.slug);
  const related = programmes
    .filter(
      (x) => x.slug !== p.slug && x.stages.some((s) => p.stages.includes(s)),
    )
    .slice(0, 3);

  const query = new URLSearchParams({
    programme: p.slug,
    ...(cohort && { cohort }),
    ...(p.plan && { pay }),
  });

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = p.curriculum.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: tab + 1,
      ArrowDown: tab + 1,
      ArrowLeft: tab - 1,
      ArrowUp: tab - 1,
      Home: 0,
      End: last,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + p.curriculum.length) % p.curriculum.length;
    setTab(i);
    document.getElementById(`tab-${i}`)?.focus();
  };

  return (
    <div className="page programme">
      <div className="wrap crumbs">
        <Link to="/programmes" className="link-back">
          <ArrowLeft aria-hidden="true" /> All programmes
        </Link>
      </div>

      <section className="wrap prog-hero" aria-labelledby="prog-h">
        <Cover p={p} size="lg" />
        <div className="prog-hero-copy">
          <h1 id="prog-h">{p.name}</h1>
          <p className="lede">{p.summary}</p>
          <dl className="facts">
            <div>
              <dt>Format</dt>
              <dd>{p.format}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{p.length}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{p.perWeek}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{p.schedule}</dd>
            </div>
            <div>
              <dt>For</dt>
              <dd>{p.stages.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <aside className="enrol" aria-labelledby="enrol-h">
          <h2 id="enrol-h" className="sr-only">
            Price and dates
          </h2>
          {p.plan && (
            <fieldset className="seg">
              <legend>How you'd pay</legend>
              <label>
                <input
                  type="radio"
                  name="pay"
                  checked={pay === "full"}
                  onChange={() => setPay("full")}
                />
                <span>In full</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="pay"
                  checked={pay === "plan"}
                  onChange={() => setPay("plan")}
                />
                <span>{p.plan.count} monthly</span>
              </label>
            </fieldset>
          )}
          <p className="enrol-price" aria-live="polite">
            <span className="num">
              {pay === "plan" && p.plan ? money(p.plan.amount) : money(p.price)}
            </span>
            <span className="enrol-unit">
              {pay === "plan" && p.plan
                ? `a month for ${p.plan.count} months (${money(p.plan.amount * p.plan.count)} total)`
                : (p.priceNote ?? "one payment, USD")}
            </span>
          </p>

          {cohorts.length > 0 ? (
            <fieldset className="cohorts">
              <legend>Choose a start date</legend>
              {cohorts.map((c) => (
                <label key={c.start} data-full={c.left === 0 ? "" : undefined}>
                  <input
                    type="radio"
                    name="cohort"
                    value={c.start}
                    checked={cohort === c.start}
                    disabled={c.left === 0}
                    onChange={() => setCohort(c.start)}
                  />
                  <span className="cohort-date">{longDate(c.start)}</span>
                  <span
                    className="cohort-left num"
                    data-few={c.left <= 5 ? "" : undefined}
                  >
                    {c.left === 0 ? "Full" : `${c.left} of ${c.seats} left`}
                  </span>
                </label>
              ))}
            </fieldset>
          ) : (
            <p className="enrol-avail">{p.availability}</p>
          )}

          <Link to={`/apply?${query}`} className="btn btn-ink btn-block">
            Apply for {p.name} <ArrowRight aria-hidden="true" />
          </Link>
          <p className="enrol-small">
            Reply within three working days. Nothing to pay until we've talked.
          </p>
        </aside>
      </section>

      <section className="promise" aria-label="The promise">
        <div className="wrap">
          <p>
            <span className="mark">{p.promise}</span>
          </p>
        </div>
      </section>

      <section className="wrap outcomes" aria-labelledby="out-h">
        <h2 id="out-h">What you'll leave with</h2>
        <ul className="ticks">
          {p.outcomes.map((o) => (
            <li key={o}>
              <Check aria-hidden="true" />
              {o}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap curriculum" aria-labelledby="cur-h">
        <h2 id="cur-h">
          What happens, {p.curriculum.length > 4 ? "week by week" : "in order"}
        </h2>
        <div className="binder">
          <div
            className="binder-tabs"
            role="tablist"
            aria-label="Curriculum"
            aria-orientation="vertical"
          >
            {p.curriculum.map((c, i) => (
              <button
                key={c.label}
                id={`tab-${i}`}
                type="button"
                role="tab"
                aria-selected={tab === i}
                aria-controls="tab-panel"
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={onTabKey}
              >
                <span className="binder-label">{c.label}</span>
                <span className="binder-title">{c.title}</span>
              </button>
            ))}
          </div>
          <div
            className="binder-page"
            role="tabpanel"
            id="tab-panel"
            aria-labelledby={`tab-${tab}`}
            key={tab}
          >
            <p className="binder-page-label">{p.curriculum[tab].label}</p>
            <h3>{p.curriculum[tab].title}</h3>
            <ul>
              {p.curriculum[tab].points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap includes" aria-labelledby="inc-h">
        <figure className="includes-photo">
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
          />
        </figure>
        <div>
          <h2 id="inc-h">What's included</h2>
          <ul className="ticks">
            {p.includes.map((x) => (
              <li key={x}>
                <Check aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
          <div className="fit">
            <div>
              <h3>It's for you if</h3>
              <ul className="ticks">
                {p.forYou.map((x) => (
                  <li key={x}>
                    <Check aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>It's not, if</h3>
              <ul className="ticks ticks-no">
                {p.notForYou.map((x) => (
                  <li key={x}>
                    <Minus aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {own.length > 0 && (
        <section className="wrap prog-stories" aria-labelledby="ps-h">
          <h2 id="ps-h">From people who took it</h2>
          {own.map((s) => (
            <StoryQuote key={s.id} s={s} showProgramme={false} />
          ))}
        </section>
      )}

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions people ask</h2>
        {p.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      {related.length > 0 && (
        <section className="wrap related" aria-labelledby="rel-h">
          <h2 id="rel-h">Also at this stage</h2>
          <ul className="related-list">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={`/programmes/${r.slug}`} className="related-item">
                  <Cover p={r} />
                  <span className="related-name">{r.name}</span>
                  <span className="related-meta num">
                    {r.length} · {money(r.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
