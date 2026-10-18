import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { articles, brand, contributors, issues, pageCopy } from "../content";

export function Contributors() {
  return (
    <div className="page wrap contributors">
      <header className="page-head">
        <h1>Contributors</h1>
        <p className="lead">{pageCopy.contributors}</p>
      </header>

      <ul className="people">
        {contributors.map((c) => {
          const pieces = issues
            .flatMap((i) => i.contents)
            .filter((x) => x.by === c.slug).length;
          const online = articles.filter((a) => a.author === c.slug).length;
          return (
            <li key={c.slug}>
              <h2>
                <Link to={"/contributors/" + c.slug}>{c.name}</Link>
              </h2>
              <p className="meta">
                {c.role} · {c.based} · since No. {c.since}
              </p>
              <p>
                {c.name.split(" ")[0]} {c.short}
              </p>
              <p className="people-count">
                {pieces} pieces in the last five issues, {online} online
              </p>
            </li>
          );
        })}
      </ul>

      <aside className="pitch">
        <h2>{pageCopy.pitch.title}</h2>
        <p>{pageCopy.pitch.text}</p>
        <div className="actions">
          <Link to="/about" className="btn btn-ghost">
            Submission guidelines <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href={"mailto:" + brand.email} className="text-link">
            {brand.email}
          </a>
        </div>
      </aside>
    </div>
  );
}
