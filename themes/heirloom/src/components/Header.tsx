import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

/** Wordmark beside a maker's-mark punch: the hallmark stamped inside every piece. */
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <path d="M8 2h28l6 12-6 12H8L2 14z" />
        <path d="M15 8v12M29 8v12M15 14h14" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const items = count(useCart());
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

  const label = `${items} ${items === 1 ? "piece" : "pieces"}`;

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
          <Link to="/appointments" className="btn btn-small nav-cta">
            Book an appointment
          </Link>
        </nav>
        <Link to="/cart" className="bag-link" aria-label={`Your bag, ${label}`}>
          <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
          {items > 0 && (
            <span className="bag-count" aria-hidden="true">
              {items}
            </span>
          )}
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${label} in your bag` : ""}
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
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
          )}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
    </header>
  );
}
