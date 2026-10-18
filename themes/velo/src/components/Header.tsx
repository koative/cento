import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 44 26" aria-hidden="true">
        <circle cx="9" cy="17" r="7.5" />
        <circle cx="35" cy="17" r="7.5" />
        <path d="M9 17 16 5h17l2 12M16 5l8 12h11M24 17 33 5" />
      </svg>
      <span>velo</span>
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
          <Link to="/service" className="btn btn-small nav-cta">
            Book a service
          </Link>
        </nav>
        <Link
          to="/cart"
          className="cart-link"
          aria-label={`Cart, ${items} ${items === 1 ? "item" : "items"}`}
        >
          <ShoppingBag size={20} strokeWidth={1.75} aria-hidden="true" />
          <span
            className="cart-count"
            aria-hidden="true"
            data-empty={items ? undefined : ""}
          >
            {items}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items
            ? `${items} ${items === 1 ? "item" : "items"} in your cart`
            : ""}
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
