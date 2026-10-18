import { ArrowLeft } from "lucide-react";
import { Link, navigate } from "../router";
import { templates, type Template } from "../content";
import { connector } from "../lib/flow";
import { createFromTemplate } from "../lib/workspace";
import { LiveFlow } from "../components/LiveFlow";
import { ConnectorMark } from "../components/Marks";
import { TemplateTile } from "../components/StepList";

export default function TemplatePage({ template: t }: { template: Template }) {
  const apps = [...new Set(t.steps.map((s) => s.app))].filter((a) =>
    connector(a),
  );
  const related = [
    ...templates.filter((x) => x.team === t.team && x.slug !== t.slug),
    ...templates.filter((x) => x.team !== t.team),
  ].slice(0, 3);

  return (
    <>
      <header className="page-head wrap detail-head">
        <Link to="/templates" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All templates
        </Link>
        <h1>{t.name}</h1>
        <p className="lede">{t.summary}</p>
      </header>

      <div className="wrap detail-grid">
        <div className="detail-main">
          <LiveFlow
            steps={t.steps}
            sample={t.sample}
            title="Try it on a sample"
          />
          <p className="prose">{t.description}</p>
        </div>
        <aside className="spec-sheet" aria-label="Template details">
          <dl>
            <div>
              <dt>Team</dt>
              <dd>{t.team}</dd>
            </div>
            <div>
              <dt>Steps</dt>
              <dd className="num">{t.steps.length}</dd>
            </div>
            <div>
              <dt>Setup time</dt>
              <dd className="num">About {t.setupMinutes} minutes</dd>
            </div>
            <div>
              <dt>What changes</dt>
              <dd>{t.outcome}</dd>
            </div>
          </dl>
          <h2 className="spec-sub">Apps it connects</h2>
          <ul className="app-chips">
            {apps.map((a) => (
              <li key={a}>
                <Link to={`/integrations/${a}`}>
                  <ConnectorMark slug={a} size={24} />
                  {connector(a)!.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn-plum"
            onClick={() =>
              navigate(`/app/workflows/${createFromTemplate(t.slug)}`)
            }
          >
            Use this template
          </button>
          <p className="quiet-note">
            Opens a copy in the demo workspace, switched off.
          </p>
        </aside>
      </div>

      <section className="band wrap" aria-labelledby="related-h">
        <h2 id="related-h">Related templates</h2>
        <ul className="template-row">
          {related.map((x) => (
            <TemplateTile key={x.slug} t={x} />
          ))}
        </ul>
      </section>
    </>
  );
}
