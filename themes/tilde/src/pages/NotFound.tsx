import { Link, useRoute } from "../router";
import { Shell } from "../components/Shell";

export function NotFound() {
  const path = useRoute();
  return (
    <section className="not-found wrap" data-not-found>
      <div>
        <h1>No such file or directory.</h1>
        <p className="lead">
          <code>~{path}</code> does not exist. It may have been renamed, or the
          link had a typo. Everything that does exist is listed in the shell.
        </p>
        <div className="actions">
          <Link to="/" className="btn">
            Go home
          </Link>
          <Link to="/projects" className="btn btn-ghost">
            Browse projects
          </Link>
        </div>
      </div>
      <Shell
        label="Find a page from the shell"
        boot={["ls"]}
        suggestions={["ls projects", "ls writing", "open now.md"]}
      />
    </section>
  );
}
