import {
  ArrowLeft,
  History,
  LayoutDashboard,
  Settings,
  Workflow,
} from "lucide-react";
import { Link } from "../router";
import { appNav, brand } from "../content";
import { Logo } from "./Marks";

const icons = [LayoutDashboard, Workflow, History, Settings];

export function AppSidebar() {
  return (
    <aside className="app-side">
      <Link
        to="/app"
        className="logo-link"
        aria-label={`${brand.name} demo overview`}
      >
        <Logo inverse />
      </Link>
      <p className="app-workspace">
        <span className="app-avatar" aria-hidden="true">
          NO
        </span>
        <span>
          {brand.workspace}
          <small>Demo workspace</small>
        </span>
      </p>
      <nav aria-label="Workspace">
        <ul>
          {appNav.map((n, i) => {
            const Icon = icons[i];
            return (
              <li key={n.to}>
                <Link to={n.to} data-root={n.to === "/app" ? "" : undefined}>
                  <Icon size={18} aria-hidden />
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="app-side-foot">
        <p>Sample data in this browser. Nothing runs for real.</p>
        <Link to="/" className="app-back">
          <ArrowLeft size={16} aria-hidden />
          Back to the website
        </Link>
      </div>
    </aside>
  );
}
