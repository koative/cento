import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { Link, useRoute } from "../router";
import { app } from "../content";
import { useApp } from "../lib/store";
import { Logo } from "./Logo";

const icons = [LayoutDashboard, Package, Settings];

export function AppSidebar() {
  const { shipments } = useApp();
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const exceptions = shipments.filter((s) => s.status === "Exception").length;

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <aside className="app-sidebar" aria-label="Demo workspace">
      <div className="app-brand">
        <Link to="/app" className="logo-link" aria-label="Workspace overview">
          <Logo />
        </Link>
        <span className="demo-badge">Demo</span>
        <button
          className="menu-button app-menu-button"
          aria-expanded={open}
          aria-controls="app-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span>Menu</span>
        </button>
      </div>
      <div
        className="app-drawer"
        id="app-nav"
        data-open={open ? "" : undefined}
      >
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
                  <Link to={n.to}>
                    <Icon size={18} aria-hidden />
                    {n.label}
                    {n.to === "/app/shipments" && exceptions > 0 && (
                      <span
                        className="nav-count num"
                        aria-label={`${exceptions} exceptions`}
                      >
                        {exceptions}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link to="/quote" className="btn btn-primary btn-block">
          <Plus size={16} aria-hidden /> New booking
        </Link>
        <div className="app-user">
          <span className="avatar" aria-hidden>
            {app.user.initials}
          </span>
          <span>
            {app.user.name}
            <small>{app.user.role}</small>
          </span>
        </div>
        <Link to="/" className="app-exit">
          <ArrowLeft size={16} aria-hidden /> Back to the website
        </Link>
      </div>
    </aside>
  );
}
