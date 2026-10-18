import { Link } from "../router";
import { apiPage, resources } from "../content";
import { CodeBlock, Inline, MethodTag } from "../components/Code";
import { DocsLayout } from "../components/DocsLayout";

const TOC = [
  { id: "basics", label: "Basics" },
  { id: "auth", label: "Authentication" },
  { id: "errors", label: "Errors" },
  { id: "pagination", label: "Pagination" },
  { id: "resources", label: "Resources" },
];

export default function Api() {
  return (
    <DocsLayout toc={TOC}>
      <article className="doc">
        <header className="doc-head">
          <h1>{apiPage.h1}</h1>
          <p className="lead">{apiPage.lead}</p>
        </header>

        <section id="basics" className="doc-section" aria-label="Basics">
          <dl className="facts">
            {apiPage.basics.map((b) => (
              <div key={b.term}>
                <dt>{b.term}</dt>
                <dd>
                  <code>{b.value}</code>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="auth" className="doc-section" aria-labelledby="auth-h">
          <h2 id="auth-h">{apiPage.auth.heading}</h2>
          <p>{apiPage.auth.body}</p>
          <CodeBlock code={apiPage.auth.code} label="Authenticated request" />
        </section>

        <section id="errors" className="doc-section" aria-labelledby="errors-h">
          <h2 id="errors-h">{apiPage.errors.heading}</h2>
          <p>
            <Inline text={apiPage.errors.body} />
          </p>
          <div className="table-scroll">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Status</th>
                  <th scope="col">Code</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {apiPage.errors.rows.map((r) => (
                  <tr key={r.code}>
                    <td className="tabular">{r.status}</td>
                    <td>
                      <code>{r.code}</code>
                    </td>
                    <td>{r.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeBlock
            code={{ lang: "json", code: apiPage.errors.example }}
            label="422 response"
          />
        </section>

        <section
          id="pagination"
          className="doc-section"
          aria-labelledby="pagination-h"
        >
          <h2 id="pagination-h">{apiPage.pagination.heading}</h2>
          <p>
            <Inline text={apiPage.pagination.body} />
          </p>
        </section>

        <section
          id="resources"
          className="doc-section"
          aria-labelledby="resources-h"
        >
          <h2 id="resources-h">Resources</h2>
          <ul className="resource-list">
            {resources.map((r) => (
              <li key={r.slug}>
                <h3>
                  <Link to={`/api/${r.slug}`}>{r.name}</Link>
                </h3>
                <p>{r.summary}</p>
                <ul className="ep-mini">
                  {r.endpoints.map((e) => (
                    <li key={e.op}>
                      <MethodTag method={e.method} /> <code>{e.path}</code>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </DocsLayout>
  );
}
