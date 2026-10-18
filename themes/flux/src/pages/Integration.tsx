import { ArrowLeft, Zap, Play } from "lucide-react";
import { Link } from "../router";
import { connectors, templates, type Connector } from "../content";
import { ConnectorMark } from "../components/Marks";
import { TemplateTile } from "../components/StepList";

export default function Integration({
  connector: c,
}: {
  connector: Connector;
}) {
  const using = templates.filter((t) => t.steps.some((s) => s.app === c.slug));
  const related = connectors
    .filter((x) => x.category === c.category && x.slug !== c.slug)
    .slice(0, 4);
  const others = related.length
    ? related
    : connectors.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <header className="page-head wrap detail-head">
        <Link to="/integrations" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All integrations
        </Link>
        <div className="detail-title">
          <ConnectorMark slug={c.slug} size={64} />
          <div>
            <h1>{c.name}</h1>
            <p className="lede">{c.blurb}</p>
          </div>
        </div>
      </header>

      <div className="wrap detail-grid">
        <div className="detail-main">
          <p className="prose">{c.description}</p>
          <div className="capabilities">
            <section aria-labelledby="triggers-h">
              <h2 id="triggers-h">
                <Zap size={18} aria-hidden /> Triggers
              </h2>
              {c.triggers.length ? (
                <ul>
                  {c.triggers.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {c.name} only starts workflows; it has no triggers to listen
                  to.
                </p>
              )}
            </section>
            <section aria-labelledby="actions-h">
              <h2 id="actions-h">
                <Play size={18} aria-hidden /> Actions
              </h2>
              {c.actions.length ? (
                <ul>
                  {c.actions.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {c.name} starts workflows; pair it with any app's actions
                  below it.
                </p>
              )}
            </section>
          </div>
        </div>
        <aside className="spec-sheet" aria-label={`${c.name} details`}>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{c.category}</dd>
            </div>
            <div>
              <dt>Available on</dt>
              <dd>{c.plan}</dd>
            </div>
            <div>
              <dt>Sign-in</dt>
              <dd>{c.auth}</dd>
            </div>
            <div>
              <dt>Workspaces using it</dt>
              <dd className="num">{c.workspaces.toLocaleString("en-US")}</dd>
            </div>
          </dl>
          <Link to="/app/settings" className="btn btn-plum">
            Connect in the demo
          </Link>
          <p className="quiet-note">Figures are fictional demo data.</p>
        </aside>
      </div>

      {using.length > 0 && (
        <section className="band wrap" aria-labelledby="uses-h">
          <h2 id="uses-h">Templates that use {c.name}</h2>
          <ul className="template-row">
            {using.map((t) => (
              <TemplateTile key={t.slug} t={t} />
            ))}
          </ul>
        </section>
      )}

      <section className="band wrap" aria-labelledby="related-h">
        <h2 id="related-h">
          {related.length ? `More in ${c.category}` : "Often used alongside"}
        </h2>
        <ul className="mark-wall">
          {others.map((x) => (
            <li key={x.slug}>
              <Link to={`/integrations/${x.slug}`}>
                <ConnectorMark slug={x.slug} size={36} />
                <span>{x.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
