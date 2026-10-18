import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, firing, nav } from "../content";
import { count, useCart } from "../lib/cart";

/** Three pyrometric cones on their pad: the potter's sign that a firing reached temperature. */
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 36 28" aria-hidden="true">
        <path d="M4.5 23 H9 C 9 18, 11 14.5, 16.5 13.6 C 10.5 13.6, 5.6 16.5, 4.5 23 Z" />
        <path d="M15 23 H19.5 C 19.5 18, 20 13, 23.5 8.6 C 18.8 12, 15.8 16.5, 15 23 Z" />
        <path d="M25.5 23 H30 L 28.6 3.8 Z" />
        <rect x="2" y="24.2" width="32" height="2.4" className="logo-pad" />
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

  const bagLabel = `${items} ${items === 1 ? "piece" : "pieces"}`;

  return (
    <header className="site-header" ref={ref}>
      <p className="notice">
        Kiln opening {firing.opening}.{" "}
        <Link to="/journal/opening-the-october-kiln">
          What is in the firing
        </Link>
      </p>
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
          <Link to="/workshops" className="btn btn-small nav-cta">
            Book a class
          </Link>
        </nav>
        <Link
          to="/cart"
          className="bag-link"
          aria-label={`Your bag, ${bagLabel}`}
        >
          <ShoppingBag size={20} strokeWidth={1.6} aria-hidden="true" />
          <span className="bag-count" aria-hidden="true">
            {items || ""}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${bagLabel} in your bag` : ""}
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
