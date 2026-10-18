import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { tel } from "../lib/util";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.legalName}, home`}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14.5" />
        <circle cx="16" cy="16" r="10.5" />
        <path className="logo-bar" d="M9 16h14" />
      </svg>
      <span className="logo-word">
        {brand.name}
        <small>Partners LLP</small>
      </span>
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
      <div className="utility wrap">
        <span>Portland · Boston</span>
        <span className="utility-hours">{brand.hours}</span>
        <a href={tel(brand.phone)}>
          <Phone size={14} aria-hidden="true" />
          {brand.phone}
        </a>
      </div>
      <div className="header-bar wrap">
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
          <Link to="/enquiry" className="btn nav-cta">
            Make an enquiry
          </Link>
        </nav>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
          Menu
        </button>
      </div>
    </header>
  );
}
