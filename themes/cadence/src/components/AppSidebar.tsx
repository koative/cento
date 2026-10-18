import {
  ArrowLeft,
  Briefcase,
  ClipboardList,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Link } from "../router";
import { app } from "../content";
import { Logo } from "./Logo";
import { Avatar } from "./Visuals";

const icons = [LayoutDashboard, Briefcase, Users, ClipboardList];

export function AppSidebar() {
  return (
    <aside className="app-sidebar" aria-label="Demo workspace">
      <div className="app-brand">
        <Link
          to="/app"
          className="logo-link"
          aria-label="Demo workspace overview"
        >
          <Logo />
        </Link>
        <span className="demo-badge">Demo</span>
      </div>
      <p className="app-workspace">
        <span>{app.workspace}</span>
        <small>{app.plan}</small>
      </p>
      <nav aria-label="Workspace">
        <ul>
          {app.nav.map((n, i) => {
            const Icon = icons[i];
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={n.to === "/app" ? "exact" : undefined}
                >
                  <Icon size={18} aria-hidden />
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="app-user">
        <Avatar name={app.user.name} size="sm" />
        <span>
          {app.user.name}
          <small>{app.user.role}</small>
        </span>
      </div>
      <Link to="/" className="app-exit">
        <ArrowLeft size={16} aria-hidden /> Back to the website
      </Link>
    </aside>
  );
}
