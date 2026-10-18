import {
  ArrowLeft,
  Cable,
  LayoutDashboard,
  ScrollText,
  Settings,
} from "lucide-react";
import { Link } from "../router";
import { app } from "../content";
import { Logo } from "./Logo";

const icons = [LayoutDashboard, Cable, ScrollText, Settings];

export function AppSidebar() {
  return (
    <aside className="app-side">
      <Link to="/" className="logo-link" aria-label="Back to the Conduit site">
        <Logo />
      </Link>
      <p className="app-workspace">
        <span>Workspace</span>
        <strong>{app.workspace}</strong>
      </p>
      <nav aria-label="Dashboard">
        <ul>
          {app.nav.map((n, i) => {
            const Icon = icons[i];
            return (
              <li key={n.to}>
                <Link to={n.to}>
                  <Icon size={17} aria-hidden /> {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="app-side-foot">
        <p>Demo data only — changes reset on reload.</p>
        <Link to="/" className="link-arrow">
          <ArrowLeft size={15} aria-hidden /> Back to site
        </Link>
      </div>
    </aside>
  );
}
