import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" className="logo-ring" />
        <circle cx="12" cy="12" r="3.2" className="logo-dot" />
      </svg>
      hush
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

  const label = `${items} ${items === 1 ? "item" : "items"}`;

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
          <Link to="/shop/hush-one" className="btn btn-small nav-cta">
            Buy Hush One
          </Link>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Cart, ${label}`}>
          <ShoppingBag size={20} strokeWidth={1.6} aria-hidden="true" />
          {items > 0 && (
            <span className="cart-count num" aria-hidden="true">
              {items}
            </span>
          )}
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${label} in your cart` : ""}
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
