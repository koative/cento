import { useEffect, useRef, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { useSaved } from "../lib/store";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="10.5" />
        <path d="M5.5 16h21" className="logo-lat" />
        <path d="M16 2v28" className="logo-meridian" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const saved = useSaved().length;
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
      <div className="header-bar">
        <Logo />
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
          <Link to="/sell" className="btn btn-accent nav-cta">
            Book a valuation
          </Link>
        </nav>
        <Link
          to="/saved"
          className="saved-link"
          aria-label={`Saved homes, ${saved}`}
        >
          <Heart
            size={19}
            strokeWidth={1.75}
            aria-hidden="true"
            fill={saved ? "currentColor" : "none"}
          />
          <span className="saved-count num" aria-hidden="true">
            {saved}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {saved ? `${saved} saved ${saved === 1 ? "home" : "homes"}` : ""}
        </span>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
    </header>
  );
}
