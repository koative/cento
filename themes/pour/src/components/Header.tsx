import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 28 40" aria-hidden="true">
        <path d="M5 3h18l-1.5 13a7.5 7.5 0 0 1-15 0Z" />
        <path d="M14 23.5V36M8 37h12" />
        <path className="logo-wine" d="M6.3 11h15.4l-.7 5a7 7 0 0 1-14 0Z" />
      </svg>
      pour
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

  const itemsLabel = `${items} ${items === 1 ? "item" : "items"}`;

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
          <Link to="/about" className="nav-extra">
            Our story
          </Link>
        </nav>
        <Link to="/wines" className="btn btn-small header-cta">
          Shop wines
        </Link>
        <Link
          to="/cart"
          className="cart-link"
          aria-label={`Your case, ${itemsLabel}`}
        >
          <ShoppingBag size={20} strokeWidth={1.75} aria-hidden="true" />
          <span className="cart-count" aria-hidden="true">
            {items || ""}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${itemsLabel} in your case` : ""}
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
