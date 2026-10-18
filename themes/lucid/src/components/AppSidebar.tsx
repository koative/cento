import { useEffect, useState } from "react";
import {
  ArrowLeft,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  SpellCheck,
  X,
} from "lucide-react";
import { Link, useRoute } from "../router";
import { app } from "../content";
import { Logo } from "./Logo";

const icons = [LayoutDashboard, FileText, SpellCheck, Settings];

export function AppSidebar() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
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
        <Link to="/app" className="logo-link" aria-label="Editor demo overview">
          <Logo />
        </Link>
        <span className="demo-badge">Demo</span>
        <button
          className="menu-button app-menu-button"
          aria-expanded={open}
          aria-controls="app-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span>Menu</span>
        </button>
      </div>
      <div className="app-menu" id="app-menu" data-open={open ? "" : undefined}>
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
                  {/* The router marks /app active on every /app/* page; Overview should only light up on itself. */}
                  <Link
                    to={n.to}
                    {...(n.to === "/app" && {
                      "data-active": path === "/app" ? "" : undefined,
                    })}
                  >
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
            {app.usage.label}{" "}
            <span className="num">
              {app.usage.used} / {app.usage.limit}
            </span>
          </p>
          <meter
            min={0}
            max={app.usage.limit}
            value={app.usage.used}
            aria-label={app.usage.label}
          />
        </div>
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
