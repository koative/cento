import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";

export function Logo() {
  return (
    <Link
      to="/"
      className="logo"
      aria-label={`${brand.name}, ${brand.person} — home`}
    >
      <svg viewBox="0 0 28 32" aria-hidden="true">
        <rect x="1" y="1" width="26" height="30" rx="3" />
        <path className="logo-rule" d="M8 1v30" />
        <path d="M12 10h10M12 15h10M12 20h6" />
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
      <div className="sheet header-sheet">
        <div className="aside">
          <Logo />
        </div>
        <div className="col header-bar">
          <p className="availability">
            <span className="dot" aria-hidden="true" />
            {brand.availabilityShort}
          </p>
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
            <Link to="/contact" className="btn btn-small">
              Start a project <ArrowUpRight size={16} aria-hidden="true" />
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
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
