import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, Search, X } from "lucide-react";
import { Link, navigate, useRoute } from "../router";
import { brand, nav } from "../content";
import { active, headline, overall } from "../lib/status";
import { Mark } from "./Mark";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // "/" jumps to search from anywhere, as it does in the register app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      const box = document.querySelector<HTMLInputElement>(
        "[data-search-input]",
      );
      if (box) box.focus();
      else {
        navigate("/search");
        setTimeout(
          () =>
            document
              .querySelector<HTMLInputElement>("[data-search-input]")
              ?.focus(),
          60,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const notices = active.length;

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.site}, home`}>
          <Mark />
          <span className="logo-word">
            {brand.name} <span>Manual</span>
          </span>
        </Link>

        <nav
          id="site-nav"
          ref={panel}
          className="site-nav"
          data-open={open ? "" : undefined}
          aria-label="Primary"
        >
          <ul>
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary nav-cta">
            Contact support
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            to="/status"
            className="status-pill"
            data-state={overall}
            title={headline[overall]}
          >
            <span className="dot" aria-hidden="true" />
            <span>
              {notices
                ? `${notices} notice${notices > 1 ? "s" : ""}`
                : "All systems go"}
            </span>
          </Link>
          <Link
            to="/search"
            className="icon-btn"
            aria-label="Search the manual"
          >
            <Search aria-hidden="true" />
            <kbd className="hint-key">/</kbd>
          </Link>
          <Link to="/contact" className="btn btn-primary header-cta">
            Contact support
          </Link>
          <button
            ref={button}
            type="button"
            className="nav-toggle icon-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
