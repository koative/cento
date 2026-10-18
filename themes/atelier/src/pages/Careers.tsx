import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  careersPage,
  hiringSteps,
  perks,
  photos,
  roles,
} from "../content";
import { Photo } from "../components/CaseCard";

export function Careers() {
  return (
    <>
      <section className="page-head wrap">
        <h1>{careersPage.title}</h1>
        <p className="lede">{careersPage.intro}</p>
      </section>

      <section className="wrap" aria-labelledby="roles-title">
        <div className="section-head">
          <h2 id="roles-title">{careersPage.rolesTitle}</h2>
          <p className="tabular">{roles.length} open now</p>
        </div>
        <ul className="role-list role-list-full">
          {roles.map((r) => (
            <li key={r.id}>
              <Link to={`/careers/${r.id}`}>
                <span className="role-title">{r.title}</span>
                <span className="role-meta">
                  {r.team} · {r.type} · {r.location}
                </span>
                <span className="role-salary tabular">{r.salary}</span>
                <ArrowUpRight aria-hidden="true" className="role-arrow" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="speculative">
          Nothing for you right now? Send a portfolio to{" "}
          <a href={`mailto:${brand.jobsEmail}`}>{brand.jobsEmail}</a>. We read
          every one and keep them for a year.
        </p>
      </section>

      <section className="section perks-band" aria-labelledby="perks-title">
        <div className="wrap perks-grid">
          <div>
            <h2 id="perks-title">{careersPage.perksTitle}</h2>
            <Photo p={photos.meetingRoom} className="perks-photo" />
          </div>
          <dl className="perks">
            {perks.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="hiring-title">
        <div className="wrap">
          <h2 id="hiring-title">{careersPage.processTitle}</h2>
          <ol className="process process-five">
            {hiringSteps.map((s, i) => (
              <li key={s.name}>
                <span className="process-step tabular" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
