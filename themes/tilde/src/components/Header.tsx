import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { toggleScheme, useScheme } from "../lib/theme";

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 28 16" aria-hidden="true">
      <path d="M2 11c2.5-6 6.5-6 9.5-3s6.8 3 9.5-3" />
      <rect x="23.5" y="2" width="3" height="12" />
    </svg>
  );
}

export function Header() {
  const path = useRoute();
  const scheme = useScheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="site-header" ref={ref}>
      <div className="header-bar wrap">
        <Link to="/" className="logo" aria-label={`${brand.person}, home`}>
          <Mark />
          <span className="logo-name">{brand.handle}</span>
          <span
            key={path}
            className="logo-path"
            aria-hidden="true"
            style={{ "--n": path.length + 1 } as CSSProperties}
          >
            {path === "/" ? "~" : "~" + path}
          </span>
        </Link>
        <nav
          id="site-nav"
          className="site-nav"
          aria-label="Main"
          data-open={open || undefined}
        >
          {nav.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="btn nav-cta">
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          className="icon-btn"
          onClick={toggleScheme}
          aria-label={
            scheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {scheme === "dark" ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}
        </button>
        <button
          ref={toggle}
          type="button"
          className="icon-btn menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
    </header>
  );
}
