import { Play } from "lucide-react";
import { Link } from "../router";
import { resources, type Resource as ResourceT } from "../content";
import { CodeBlock, MethodTag } from "../components/Code";
import { DocsLayout } from "../components/DocsLayout";
import { initialInputs, snippets } from "../lib/sandbox";

export default function Resource({ resource }: { resource: ResourceT }) {
  const i = resources.indexOf(resource);
  const next = resources[(i + 1) % resources.length];
  const toc = [
    { id: "object", label: resource.object.name },
    ...resource.endpoints.map((e) => ({
      id: e.op.replace(".", "-"),
      label: e.summary,
    })),
  ];

  return (
    <DocsLayout toc={toc}>
      <article className="doc">
        <header className="doc-head">
          <p className="crumbs">
            <Link to="/api">API reference</Link> <span aria-hidden>/</span>{" "}
            {resource.name}
          </p>
          <h1>{resource.name}</h1>
          <p className="lead">{resource.summary}</p>
        </header>

        <section id="object" className="doc-section" aria-labelledby="object-h">
          <h2 id="object-h">{resource.object.name}</h2>
          <div className="table-scroll">
            <table className="data params">
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {resource.object.fields.map((f) => (
                  <tr key={f.name}>
                    <th scope="row">
                      <code>{f.name}</code>
                    </th>
                    <td className="type">{f.type}</td>
                    <td>{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {resource.endpoints.map((e) => {
          const id = e.op.replace(".", "-");
          return (
            <section
              key={e.op}
              id={id}
              className="doc-section endpoint"
              aria-labelledby={`${id}-h`}
            >
              <h2 id={`${id}-h`}>{e.summary}</h2>
              <p className="ep-line">
                <MethodTag method={e.method} />
                <code>{e.path}</code>
                <span className="ep-op">{e.op}</span>
              </p>
              <p>{e.description}</p>
              {e.params.length > 0 && (
                <div className="table-scroll">
                  <table className="data params">
                    <caption className="sr-only">Parameters for {e.op}</caption>
                    <thead>
                      <tr>
                        <th scope="col">Parameter</th>
                        <th scope="col">In</th>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.params.map((p) => (
                        <tr key={p.name}>
                          <th scope="row">
                            <code>{p.name}</code>
                            {p.required && (
                              <span className="req">required</span>
                            )}
                          </th>
                          <td>{p.in}</td>
                          <td className="type">{p.type}</td>
                          <td>{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="ep-examples">
                <CodeBlock
                  code={{
                    lang: "bash",
                    code: snippets(e, initialInputs(e)).curl,
                  }}
                  label="Request"
                />
                <CodeBlock
                  code={{ lang: "json", code: e.response.body }}
                  label={`Response · ${e.response.status}`}
                />
              </div>
              <Link to={`/playground/${e.op}`} className="btn btn-quiet try">
                <Play size={14} aria-hidden /> Try {e.op} in the playground
              </Link>
            </section>
          );
        })}

        <nav className="pager" aria-label="API reference">
          <span />
          <Link to={`/api/${next.slug}`} className="pager-next">
            <span>Next resource</span>
            {next.name}
          </Link>
        </nav>
      </article>
    </DocsLayout>
  );
}
