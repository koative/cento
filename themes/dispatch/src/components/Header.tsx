import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";

export function Logo() {
  return (
    <span className="logo-type">
      <svg className="logo-mark" viewBox="0 0 40 24" aria-hidden="true">
        <circle
          cx="11"
          cy="12"
          r="9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="11" cy="12" r="3" fill="currentColor" />
        <path
          d="M23 8.5q3-2.4 6 0t6 0M23 15.5q3-2.4 6 0t6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {brand.name}
    </span>
  );
}

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!shell.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-row" ref={shell}>
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Logo />
        </Link>
        <p className="header-by">
          by {brand.writer} · Sundays since {brand.since.split(" ")[1]}
        </p>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-icon" aria-hidden="true" />
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="site-nav"
          className="site-nav"
          data-open={open ? "" : undefined}
          aria-label="Main"
        >
          <ul>
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <Link to="/subscribe" className="btn btn-solid nav-cta">
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
