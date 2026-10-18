import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { fees, type Programme } from "../content";
import { money } from "../lib/format";
import { fromPrice, programmeBySlug, teachersFor } from "../lib/school";
import { BarSystem, Coda, ProgrammeCard } from "../components/Bits";

export function ProgrammePage({ p }: { p: Programme }) {
  const staff = teachersFor(p.slug);
  const related = p.related
    .map(programmeBySlug)
    .filter((r): r is Programme => !!r);
  const book = `/trial?programme=${p.slug}`;

  return (
    <div className="page programme">
      <header className="prog-head wrap">
        <div className="prog-head-text">
          <Link to="/programmes" className="back-link">
            <ArrowLeft aria-hidden="true" /> All programmes
          </Link>
          <h1>{p.name}</h1>
          <p className="lede">{p.summary}</p>
          <dl className="facts">
            <div>
              <dt>Ages</dt>
              <dd>{p.ages}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>
                {p.group
                  ? `Weekly group class, ${p.group.minutes} min, ${p.group.size}`
                  : `Weekly private lesson, ${p.lengths.join(", ")} min`}
              </dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>
                {money(fromPrice(p))} {p.group ? "a class" : "a lesson"}
              </dd>
            </div>
            <div>
              <dt>Teachers</dt>
              <dd>{staff.map((t) => t.name).join(", ")}</dd>
            </div>
          </dl>
          <Link to={book} className="btn btn-primary btn-large">
            Book a free {p.short} trial
          </Link>
        </div>
        <img
          className="prog-head-img"
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.w}
          height={p.image.h}
          data-portrait={p.image.h > p.image.w ? "" : undefined}
        />
      </header>

      <section className="wrap prog-intro" aria-label="About the programme">
        <div className="prose">
          {p.intro.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <aside className="aside-notes">
          <h2>What you need</h2>
          <p>{p.bring}</p>
          {p.hire && (
            <>
              <h2>Instrument hire</h2>
              <p>{p.hire}</p>
            </>
          )}
        </aside>
      </section>

      <section className="wrap prog-path" aria-labelledby="path-h">
        <h2 id="path-h">The path</h2>
        <p className="section-lede">
          Roughly how students move through the programme. Nobody is rushed, and
          many stay happily at one stage for years.
        </p>
        <BarSystem
          items={p.stages.map((s) => ({ title: s.name, text: s.text }))}
          label={`${p.name}: four stages`}
        />
      </section>

      <section className="wrap prog-split" aria-label="Repertoire and teachers">
        <div>
          <h2>On the stand this year</h2>
          <ul className="stand-list">
            {p.repertoire.map((r) => {
              const [composer, piece] = r.includes(" — ")
                ? r.split(" — ")
                : ["", r];
              return (
                <li key={r}>
                  {composer && (
                    <span className="stand-composer">{composer}</span>
                  )}
                  <em>{piece}</em>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2>Who teaches it</h2>
          <ul className="teacher-mini">
            {staff.map((t) => (
              <li key={t.slug}>
                <Link to={`/teachers/${t.slug}`}>{t.name}</Link>
                <span>{t.role}</span>
                <p>{t.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap prog-fees" aria-labelledby="pf-h">
        <h2 id="pf-h">Fees</h2>
        <table className="rate-table">
          <caption className="sr-only">{p.name} fees</caption>
          <thead>
            <tr>
              <th scope="col">{p.group ? "Class" : "Weekly lesson"}</th>
              <th scope="col">{p.group ? "Per class" : "Per lesson"}</th>
              <th scope="col">Per {fees.termWeeks}-week term</th>
              <th scope="col">Monthly, 3 payments</th>
            </tr>
          </thead>
          <tbody>
            {(p.group
              ? [{ minutes: p.group.minutes, perLesson: p.group.perSession }]
              : fees.private
            ).map((r) => (
              <tr key={r.minutes}>
                <th scope="row">{r.minutes} minutes</th>
                <td>{money(r.perLesson)}</td>
                <td>{money(r.perLesson * fees.termWeeks)}</td>
                <td>{money((r.perLesson * fees.termWeeks) / 3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/fees" className="text-link">
          Discounts, bursaries and hire <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="wrap related" aria-labelledby="rel-h">
        <h2 id="rel-h">Often paired with {p.name}</h2>
        <div className="prog-grid">
          {related.map((r) => (
            <ProgrammeCard key={r.slug} p={r} />
          ))}
        </div>
      </section>

      <Coda
        title={`Half an hour of ${p.short}, on us.`}
        text={`A free trial with ${staff[0]?.name ?? "one of our teachers"}${staff.length > 1 ? " or a colleague" : ""}. We'll have an instrument ready.`}
        to={book}
      />
    </div>
  );
}
