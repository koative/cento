import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Columns3,
  ListChecks,
  Menu,
  RotateCcw,
  Settings,
  X,
} from "lucide-react";
import { Link, useRoute } from "../router";
import { workspace } from "../content";
import { resetDemo, useDemo } from "../lib/store";
import { formatMonthDay } from "../lib/format";
import { Logo } from "./Logo";

const links = [
  { to: "/app", label: "Board", icon: Columns3 },
  { to: "/app/list", label: "All issues", icon: ListChecks },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRoute();
  const { issues, workspaceName } = useDemo();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const { cycle } = workspace;
  const done = issues
    .filter((i) => i.status === "done")
    .reduce((s, i) => s + i.estimate, 0);
  const total = issues
    .filter((i) => i.status !== "backlog")
    .reduce((s, i) => s + i.estimate, 0);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onClick = (e: MouseEvent) =>
      !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="app-side" ref={ref}>
      <div className="side-top">
        <Link to="/" className="logo-link" aria-label="Sprint home">
          <Logo />
        </Link>
        <span className="demo-badge">Demo</span>
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="app-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span>Menu</span>
        </button>
      </div>
      <div
        className="side-body"
        id="app-menu"
        data-open={open ? "" : undefined}
      >
        <p className="side-workspace">{workspaceName}</p>
        <nav aria-label="Workspace">
          <ul>
            {links.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  data-section={
                    to === "/app" && path.startsWith("/app/issues")
                      ? ""
                      : undefined
                  }
                >
                  <Icon size={18} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="side-cycle">
          <p>
            <strong>{cycle.name}</strong>
            <span>
              {formatMonthDay(cycle.start)} – {formatMonthDay(cycle.end)}
            </span>
          </p>
          <div
            className="cycle-bar"
            role="img"
            aria-label={`${done} of ${total} points done`}
          >
            <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
          </div>
          <p className="side-small">
            {done} of {total} pts done · day {cycle.day} of 10
          </p>
        </div>
        <div className="side-foot">
          <button type="button" className="side-action" onClick={resetDemo}>
            <RotateCcw size={16} aria-hidden /> Reset demo data
          </button>
          <Link to="/" className="side-action">
            <ArrowLeft size={16} aria-hidden /> Back to the website
          </Link>
        </div>
      </div>
    </header>
  );
}
