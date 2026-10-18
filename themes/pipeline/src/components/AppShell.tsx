import { ArrowLeft, ChartColumn, Columns3, Users } from "lucide-react";
import { Link } from "../router";
import { app, owners } from "../content";
import { Logo } from "./Logo";

const icons = [Columns3, Users, ChartColumn];

export function AppSidebar() {
  const me = owners.find((o) => o.id === app.me)!;
  return (
    <aside className="app-side">
      <Link to="/" className="logo-link" aria-label="Pipeline home">
        <Logo />
      </Link>
      <p className="app-ws">
        <strong>{app.workspace}</strong>
        <span>{app.team} · demo</span>
      </p>
      <nav aria-label="Workspace">
        <ul>
          {app.nav.map((n, i) => {
            const Icon = icons[i];
            return (
              <li key={n.to}>
                <Link to={n.to}>
                  <Icon size={18} aria-hidden /> {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="app-me">
        <span className="avatar">{me.initials}</span>
        <span>
          <strong>{me.name}</strong>
          <span>Account executive</span>
        </span>
      </div>
      <Link to="/" className="app-exit">
        <ArrowLeft size={16} aria-hidden /> Back to the website
      </Link>
    </aside>
  );
}
