import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { ages, brand, nav } from "../content";
import { count, useCart } from "../lib/cart";
import { Block } from "./Block";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 30 40" aria-hidden="true">
        <circle cx="15" cy="7" r="6" fill="#f5b52e" />
        <path d="M15 14l9 12H6z" fill="#2c5cc5" />
        <rect x="3" y="27" width="24" height="12" rx="2" fill="#c63a22" />
      </svg>
      <span>tinker</span>
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

  const itemsText = `${items} ${items === 1 ? "item" : "items"}`;

  return (
    <header className="site-header" ref={ref}>
      <p className="announcement">{brand.announcement}</p>
      <div className="header-bar">
        <Logo />
        <div id="site-menu" className="site-menu" data-open={open || undefined}>
          <nav className="site-nav" aria-label="Main">
            {nav
              .filter((n) => n.to !== "/gift-finder")
              .map((n) => (
                <Link key={n.to} to={n.to}>
                  {n.label}
                </Link>
              ))}
          </nav>
          <nav className="age-strip" aria-label="Shop by age">
            <span className="age-strip-label">Shop by age</span>
            {ages.map((a) => (
              <Link key={a.id} to={`/ages/${a.id}`}>
                <Block shape={a.shape} color={a.color} size={16} />
                {a.short}
              </Link>
            ))}
          </nav>
          <Link to="/gift-finder" className="btn btn-small menu-cta">
            Find a gift
          </Link>
        </div>
        <Link
          to="/cart"
          className="basket-link"
          aria-label={`Your basket, ${itemsText}`}
        >
          <ShoppingBasket size={22} strokeWidth={2} aria-hidden="true" />
          <span className="basket-count" aria-hidden="true" key={items}>
            {items || ""}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${itemsText} in your basket` : ""}
        </span>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
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
