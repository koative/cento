import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";

/** Fourteen lines in three quatrains and an indented couplet: the shape of a sonnet on the page. */
const verse = [16, 13, 15, 11, 16, 14, 12, 15, 13, 16, 11, 14];

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 22 34" aria-hidden="true">
        {verse.map((w, i) => {
          const y = 1.5 + i * 2 + Math.floor(i / 4) * 1.5;
          return <line key={i} x1="1" x2={1 + w} y1={y} y2={y} />;
        })}
        <line className="couplet" x1="5" x2="21" y1="30" y2="30" />
        <line className="couplet" x1="5" x2="17" y1="32" y2="32" />
      </svg>
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
          <Link to="/enrol" className="btn btn-small nav-cta">
            Enrol
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
