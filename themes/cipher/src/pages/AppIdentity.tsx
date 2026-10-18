import { ArrowLeft, Check, X } from "lucide-react";
import { Link } from "../router";
import { app, type Identity } from "../content";
import { decide, grantsOf, lastUsed, useReview } from "../lib/review";
import { Avatar, RiskTag } from "../components/bits";
import { VerdictMark } from "../components/Review";

export default function AppIdentity({ person }: { person: Identity }) {
  const { decisions } = useReview();
  const gs = grantsOf(person.id);
  const facts = [
    ["Type", person.kind],
    ["Manager or owner", person.manager],
    ["Location", person.location],
    ["Started", person.started],
    ["Last active", person.lastActive],
  ];

  return (
    <div className="app-page">
      <Link to="/app/identities" className="back-link">
        <ArrowLeft size={16} aria-hidden /> All identities
      </Link>
      <header className="app-head identity-head">
        <Avatar initials={person.initials} size="lg" />
        <div>
          <h1>{person.name}</h1>
          <p>
            {person.title} · {person.dept}
          </p>
        </div>
      </header>

      <dl className="facts wide">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <section className="panel" aria-labelledby="grants-title">
        <h2 id="grants-title" className="panel-title">
          Grants in {app.campaign}
        </h2>
        <ul className="grant-rows">
          {gs.map((g) => {
            const d = decisions[g.id];
            return (
              <li key={g.id}>
                <div className="grant-main">
                  <p>
                    <strong>
                      {g.system} · {g.permission}
                    </strong>
                    <RiskTag risk={g.risk} />
                  </p>
                  <p className="quiet small">
                    {g.via} · last used {lastUsed(g.lastUsedDays).toLowerCase()}{" "}
                    · granted {g.granted}
                  </p>
                  <p>{g.reason}</p>
                </div>
                <div className="grant-actions">
                  {d ? (
                    <VerdictMark decision={d} />
                  ) : (
                    <>
                      <Link
                        to={`/app/review?g=${g.id}`}
                        className="btn btn-quiet small-btn"
                      >
                        <X size={14} aria-hidden /> Review to revoke
                      </Link>
                      <button
                        className="btn btn-primary small-btn"
                        onClick={() => decide([g.id], "keep")}
                      >
                        <Check size={14} aria-hidden /> Keep
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="panel" aria-labelledby="hist-title">
        <h2 id="hist-title" className="panel-title">
          History
        </h2>
        <ol className="history">
          {person.history.map((h) => (
            <li key={h.date + h.text}>
              <span className="num">{h.date}</span>
              <p>{h.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
