import {
  ArrowLeft,
  Filter,
  LayoutDashboard,
  Settings,
  Table2,
} from "lucide-react";
import { Link } from "../router";
import { app } from "../content";
import { Logo } from "./Logo";

const icons = [LayoutDashboard, Filter, Table2, Settings];

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
        <small>{app.environment}</small>
      </p>
      <nav aria-label="Workspace">
        <ul>
          {app.nav.map((n, i) => {
            const Icon = icons[i];
            return (
              <li key={n.to}>
                <Link to={n.to}>
                  <Icon size={17} aria-hidden />
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="app-usage">
        <p>
          Events this month <span className="num">38.2M / 100M</span>
        </p>
        <meter
          min={0}
          max={100}
          value={38.2}
          aria-label="Monthly event quota used"
        />
      </div>
      <div className="app-user">
        <span className="avatar" aria-hidden>
          {app.user.initials}
        </span>
        <span>
          {app.user.name}
          <small>{app.user.email}</small>
        </span>
      </div>
      <Link to="/" className="app-exit">
        <ArrowLeft size={16} aria-hidden /> Back to the website
      </Link>
    </aside>
  );
}
