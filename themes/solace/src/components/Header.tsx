import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.full}, home`}>
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="10" y="2" width="8" height="24" rx="2.5" />
        <rect x="2" y="10" width="24" height="8" rx="2.5" />
      </svg>
      solace
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
      <div className="utility">
        <p>{brand.utility}</p>
        <a href={brand.nurseLineHref}>
          <Phone size={14} aria-hidden="true" /> Nurse line, 24 hours:{" "}
          {brand.nurseLine}
        </a>
      </div>
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
          <Link to="/book" className="btn nav-cta">
            Book a visit
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
