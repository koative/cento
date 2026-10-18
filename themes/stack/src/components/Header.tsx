import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Link, navigate, useRoute } from "../router";
import { brand, nav } from "../content";
import { Logo } from "./Logo";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);

  // "/" jumps to search from anywhere that isn't a text field, like most docs sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (
        e.key !== "/" ||
        e.metaKey ||
        e.ctrlKey ||
        t.closest("input, textarea, select, [contenteditable]")
      )
        return;
      e.preventDefault();
      if (path === "/search") document.getElementById("search-input")?.focus();
      else navigate("/search");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // pointerdown, not click: the toggle swaps its icon mid-click, so a click target can already be detached.
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <header className="site-header" ref={ref}>
      <div className="header-row">
        <Link to="/" className="logo-link" aria-label={`${brand.site} home`}>
          <Logo />
        </Link>
        <span className="version-tag">{brand.version}</span>
        <Link to="/search" className="search-link">
          <Search size={15} aria-hidden />
          <span>Search docs</span>
          <kbd>/</kbd>
        </Link>
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span>Menu</span>
        </button>
        <div
          className="header-menu"
          id="site-menu"
          data-open={open ? "" : undefined}
        >
          <nav aria-label="Primary">
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/guides/quickstart" className="btn btn-primary">
            Quickstart
          </Link>
        </div>
      </div>
    </header>
  );
}
