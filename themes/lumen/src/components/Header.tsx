import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, plural, useCart } from "../lib/cart";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <svg viewBox="0 0 44 20" aria-hidden="true">
        <circle cx="10" cy="11" r="7.5" />
        <circle cx="34" cy="11" r="7.5" />
        <path d="M17.5 9.5q4.5-4 9 0" />
      </svg>
      lumen
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

  return (
    <header className="site-header" ref={ref}>
      <p className="announcement">{brand.announcement}</p>
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
          <Link to="/eye-test" className="btn btn-small nav-cta">
            Book an eye test
          </Link>
        </nav>
        <Link
          to="/cart"
          className="bag-link"
          aria-label={`Your bag, ${plural(items, "item")}`}
        >
          <ShoppingBag size={20} strokeWidth={1.75} aria-hidden="true" />
          <span
            className="bag-count"
            aria-hidden="true"
            data-empty={items ? undefined : ""}
          >
            {items}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${plural(items, "item")} in your bag` : ""}
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
