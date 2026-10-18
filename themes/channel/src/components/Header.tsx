import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

/** The mark: a C-channel steel profile with a play triangle in its mouth. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={"mark " + className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 6h18v5H12v10h13v5H7z" fill="var(--spark)" />
      <path d="M15 13.2l6 2.8-6 2.8z" fill="var(--chalk)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <Mark />
      <span>channel</span>
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
          <Link to="/membership" className="btn btn-spark nav-cta">
            Join the shop
          </Link>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Bag, ${label}`}>
          <ShoppingBag size={20} strokeWidth={2} aria-hidden="true" />
          {items > 0 && (
            <span className="cart-count" aria-hidden="true">
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
