import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";

export function LanternMark() {
  return (
    <svg className="mark" viewBox="0 0 24 32" aria-hidden="true">
      <circle
        cx="12"
        cy="3.5"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M6 9.5 8.2 6h7.6L18 9.5Z" fill="currentColor" />
      <rect
        x="6.5"
        y="9.5"
        width="11"
        height="15"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        className="mark-flame"
        d="M12 12.5c2.6 3 3.1 5.6 0 9-3.1-3.4-2.6-6 0-9Z"
      />
      <path d="M5 24.5h14V28H5Z" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <LanternMark />
      <span>{brand.name}</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
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
        </nav>
        <Link to="/donate" className="btn nav-cta">
          Donate
        </Link>
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
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}
