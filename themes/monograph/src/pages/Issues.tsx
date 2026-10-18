import { useState } from "react";
import { Link } from "../router";
import { issues, pageCopy } from "../content";
import { money } from "../lib/magazine";
import { Cover } from "../components/Cover";

export function Issues() {
  const [inPrint, setInPrint] = useState(false);
  const shown = inPrint ? issues.filter((i) => i.stock !== "Sold out") : issues;

  return (
    <div className="page wrap issues">
      <header className="page-head">
        <h1>Issues</h1>
        <p className="lead">{pageCopy.issues}</p>
      </header>

      <div className="issues-tools">
        <label className="switch">
          <input
            type="checkbox"
            checked={inPrint}
            onChange={(e) => setInPrint(e.target.checked)}
          />
          <span>Only issues still in print</span>
        </label>
        <p role="status">
          {shown.length} of {issues.length} recent issues
        </p>
      </div>

      <ul className="issue-grid">
        {shown.map((i) => (
          <li key={i.no}>
            <Link
              to={`/issues/${i.no}`}
              className="issue-card"
              aria-label={`No. ${i.no}, ${i.word}, ${i.season}`}
            >
              <Cover issue={i} eager={i.no === issues[0].no} />
            </Link>
            <h2>
              <Link to={`/issues/${i.no}`}>
                No. {i.no}: {i.word}
              </Link>
            </h2>
            <p className="meta">
              {i.season} · {i.pages} pages ·{" "}
              {i.contents.filter((c) => c.slug).length} online
            </p>
            <p>{i.summary}</p>
            <p className="stock" data-stock={i.stock}>
              {i.stock === "Sold out"
                ? "Sold out in print"
                : `${i.stock}, ${money(i.price)}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
