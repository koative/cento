import {
  ArrowLeft,
  Inbox,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "../router";
import { app, grants } from "../content";
import { useReview } from "../lib/review";
import { Logo } from "./Logo";

const icons = [LayoutDashboard, Inbox, Users, Settings];

export function AppSidebar() {
  const { decisions } = useReview();
  const open = grants.length - Object.keys(decisions).length;
  return (
    <aside className="app-sidebar" aria-label="Demo workspace">
      <div className="app-brand">
        <Link to="/app" className="logo-link" aria-label="Workspace overview">
          <Logo />
        </Link>
        <span className="demo-badge">Demo</span>
      </div>
      <p className="app-workspace">
        <span>{app.workspace}</span>
        <small>{app.campaign}</small>
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
                  {i === 1 && open > 0 && (
                    <span className="count num">{open}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="app-user">
        <span className="avatar" aria-hidden>
          {app.reviewer.initials}
        </span>
        <span>
          {app.reviewer.name}
          <small>{app.reviewer.title}</small>
        </span>
      </div>
      <Link to="/" className="app-exit">
        <ArrowLeft size={16} aria-hidden /> Back to the website
      </Link>
    </aside>
  );
}
