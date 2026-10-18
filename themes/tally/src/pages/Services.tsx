import { Link } from "../router";
import {
  notDone,
  onboarding,
  photos,
  services,
  type Service,
} from "../content";
import { Img, ServiceRow } from "../components/Bits";

const groups: Service["group"][] = [
  "Every month",
  "Every year",
  "When you need it",
];

export function Services() {
  return (
    <>
      <header className="page-head wrap">
        <h1>Services</h1>
        <p className="lede">
          Bookkeeping, tax, payroll and the advice in between — done every month
          by people who already know your numbers. Most clients use three or
          four of these, bundled into a <Link to="/pricing">package</Link>.
        </p>
      </header>

      {groups.map((g) => (
        <section key={g} className="wrap svc-group" aria-labelledby={`g-${g}`}>
          <h2 id={`g-${g}`}>{g}</h2>
          <ul className="ledger-list is-rich">
            {services
              .filter((s) => s.group === g)
              .map((s) => (
                <ServiceRow key={s.slug} s={s} detail />
              ))}
          </ul>
        </section>
      ))}

      <section className="band band-paper" aria-labelledby="ob-h">
        <div className="wrap section">
          <div className="section-head">
            <h2 id="ob-h">How starting works</h2>
            <p>
              From the first call to your first closed month in about five
              weeks.
            </p>
          </div>
          <ol className="steps">
            {onboarding.map((s) => (
              <li key={s.title}>
                <span className="step-when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="nd-h">
        <Img photo={photos.desk} className="split-img" />
        <div>
          <h2 id="nd-h">What we don't do</h2>
          <p>
            Staying small and focused is how we keep deadlines. If you need one
            of these, we'll introduce you to someone good.
          </p>
          <ul className="plain-list">
            {notDone.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-primary">
            Talk through what you need
          </Link>
        </div>
      </section>
    </>
  );
}
