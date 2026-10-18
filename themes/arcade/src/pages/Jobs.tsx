import { brand, hiring } from "../content";
import { JobList } from "../components/PostCard";

export function Jobs() {
  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>{hiring.title}</h1>
        <p className="lede">{hiring.lede}</p>
      </header>

      <section aria-labelledby="roles-title">
        <h2 id="roles-title">Open roles</h2>
        <JobList />
        <p className="small">
          Don't see your role? Write to{" "}
          <a href={`mailto:${brand.jobsEmail}`}>{brand.jobsEmail}</a> with your
          work and what you'd like to make. We read everything.
        </p>
      </section>

      <section className="jobs-detail">
        <div>
          <h2>What every role gets</h2>
          <ul className="perk-list">
            {hiring.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>How hiring works</h2>
          <ol className="steps">
            {hiring.process.map((s, i) => (
              <li key={s.title}>
                <span className="step-n num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
