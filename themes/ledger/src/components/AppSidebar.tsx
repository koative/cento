import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Landmark,
  LayoutDashboard,
  ListOrdered,
  Mails,
  Settings,
} from "lucide-react";
import { Link, useRoute } from "../router";
import { app } from "../content";
import { actions, useLedger } from "../lib/store";
import { Logo } from "./Logo";

const icons = [LayoutDashboard, Mails, Landmark, ListOrdered, Settings];

export function AppSidebar() {
  const { hidden, prefs } = useLedger();
  const path = useRoute();
  const nav = useRef<HTMLElement>(null);

  // On phones the nav scrolls sideways; keep the current screen's tab in view.
  useEffect(() => {
    const active = nav.current?.querySelector<HTMLElement>(
      '[aria-current], [data-active]:not([href="#/app"])',
    );
    if (active && nav.current) nav.current.scrollLeft = active.offsetLeft - 16;
  }, [path]);

  return (
    <aside className="app-sidebar" aria-label="Demo workspace">
      <div className="app-brand">
        <Link to="/app" className="logo-link" aria-label="Demo overview">
          <Logo />
        </Link>
        <span className="demo-badge">Demo</span>
      </div>
      <nav aria-label="Workspace" ref={nav}>
        <ul>
          {app.nav.map((n, i) => {
            const Icon = icons[i];
            return (
              <li key={n.to}>
                <Link to={n.to}>
                  <Icon size={18} aria-hidden />
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        className="hide-toggle"
        aria-pressed={hidden}
        onClick={actions.toggleHidden}
      >
        {hidden ? (
          <EyeOff size={17} aria-hidden />
        ) : (
          <Eye size={17} aria-hidden />
        )}
        {hidden ? "Show balances" : "Hide balances"}
      </button>
      <div className="app-user">
        <span className="avatar" aria-hidden>
          {prefs.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span>
          {prefs.name}
          <small>{prefs.email}</small>
        </span>
      </div>
      <Link to="/" className="app-exit">
        <ArrowLeft size={16} aria-hidden /> Back to the website
      </Link>
    </aside>
  );
}
