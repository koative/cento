import { Link } from "../router";
import { categories } from "../content";

/** The printed manual's thumb index: one tab per chapter down the fore-edge, the open chapter pulled out. */
export function ThumbIndex({ current }: { current?: string }) {
  return (
    <nav className="thumb-index" aria-label="Chapters">
      <ol>
        {categories.map((c, i) => (
          <li key={c.slug}>
            <Link
              to={`/categories/${c.slug}`}
              data-current={c.slug === current ? "" : undefined}
              title={c.title}
            >
              <span className="thumb-num">{i + 1}</span>
              <span className="thumb-name">{c.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
