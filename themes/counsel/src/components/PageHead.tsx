import type { ReactNode } from "react";
import { Link } from "../router";

type Props = {
  title: ReactNode;
  lede?: ReactNode;
  trail?: { to: string; label: string }[];
  children?: ReactNode;
};

/** Page opening: breadcrumb trail, the page's single h1 and a lede, ruled off like a letterhead. */
export function PageHead({ title, lede, trail = [], children }: Props) {
  return (
    <header className="page-head wrap">
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          {trail.map((t) => (
            <li key={t.to}>
              <Link to={t.to}>{t.label}</Link>
            </li>
          ))}
        </ol>
      </nav>
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </header>
  );
}
