import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "../router";

type Crumb = { to: string; label: string };

export function PageHead({
  title,
  lede,
  crumbs = [],
  children,
}: {
  title: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            {[{ to: "/", label: "Home" }, ...crumbs].map((c) => (
              <li key={c.to}>
                <Link to={c.to}>{c.label}</Link>
                <ChevronRight size={14} aria-hidden="true" />
              </li>
            ))}
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <h1>{title}</h1>
        {lede && <p className="page-lede">{lede}</p>}
        {children}
      </div>
    </div>
  );
}
