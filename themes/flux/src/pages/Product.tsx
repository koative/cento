import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { demoRuns, demoWorkflows, product, templates } from "../content";
import { evaluate } from "../lib/flow";
import { FlowCanvas } from "../components/FlowCanvas";
import { RunStatusTag } from "../components/RunStatusTag";

const roles = [
  { can: "View workflows and run history", roles: [true, true, true] },
  { can: "Run tests on sample records", roles: [true, true, true] },
  { can: "Edit and switch on workflows", roles: [false, true, true] },
  { can: "Replay failed runs", roles: [false, true, true] },
  { can: "Add or remove connections", roles: [false, false, true] },
  { can: "Invite people and change roles", roles: [false, false, true] },
];

function Figure({ id }: { id: string }) {
  if (id === "builder") {
    const t = templates.find((x) => x.slug === "lead-routing")!;
    return <FlowCanvas steps={t.steps} sample={t.sample} states={null} />;
  }
  if (id === "test") {
    const t = templates.find((x) => x.slug === "ticket-escalation")!;
    const sample = [{ ...t.sample[0], value: 4 }];
    return (
      <div>
        <p className="figure-note">Sample: priority score 4</p>
        <FlowCanvas
          steps={t.steps}
          sample={sample}
          states={evaluate(t.steps, sample)}
        />
      </div>
    );
  }
  if (id === "runs")
    return (
      <table className="mini-table">
        <caption className="sr-only">Run history excerpt</caption>
        <thead>
          <tr>
            <th scope="col">Workflow</th>
            <th scope="col">Started</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {demoRuns.slice(0, 7).map((r) => (
            <tr key={r.id}>
              <td>{demoWorkflows.find((w) => w.id === r.workflow)?.name}</td>
              <td className="num">{r.started}</td>
              <td>
                <RunStatusTag status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  return (
    <table className="mini-table roles">
      <caption className="sr-only">What each role can do</caption>
      <thead>
        <tr>
          <th scope="col">Permission</th>
          <th scope="col">Viewer</th>
          <th scope="col">Builder</th>
          <th scope="col">Admin</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((r) => (
          <tr key={r.can}>
            <th scope="row">{r.can}</th>
            {r.roles.map((ok, i) => (
              <td key={i}>
                {ok ? (
                  <Check size={16} aria-label="Yes" />
                ) : (
                  <Minus size={16} aria-label="No" />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Product() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{product.heading}</h1>
        <p className="lede">{product.lede}</p>
      </header>
      {product.sections.map((s) => (
        <section
          key={s.id}
          className="feature wrap"
          aria-labelledby={`f-${s.id}`}
        >
          <div className="feature-copy">
            <h2 id={`f-${s.id}`}>{s.title}</h2>
            <p>{s.text}</p>
            <ul className="tick-list">
              {s.points.map((p) => (
                <li key={p}>
                  <Check size={16} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="feature-figure">
            <Figure id={s.id} />
          </div>
        </section>
      ))}
      <section className="close wrap" aria-labelledby="product-close">
        <h2 id="product-close">See it with your own steps.</h2>
        <p>
          Open a template in the demo workspace, change the sample and run it.
          Nothing is sent.
        </p>
        <div className="actions">
          <Link to="/templates" className="btn btn-plum btn-lg">
            Pick a template
          </Link>
          <Link to="/pricing" className="btn btn-line btn-lg">
            See pricing
          </Link>
        </div>
      </section>
    </>
  );
}
