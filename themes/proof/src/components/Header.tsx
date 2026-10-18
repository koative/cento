import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, home, nav } from "../content";
import { count, useCart } from "../lib/cart";
import { openState } from "../lib/time";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <svg viewBox="0 0 44 30" aria-hidden="true">
        <path
          className="logo-loaf"
          d="M4 19.5C4 11 12 5 22 5s18 6 18 14.5c0 3.6-3 5.5-7 5.5H11c-4 0-7-1.9-7-5.5Z"
        />
        <path className="logo-score" d="M12 18c5-6.5 12-8.5 20-7.5" />
      </svg>
      <span>proof</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const items = count(useCart());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const status = openState();

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

  const bagLabel = `${items} ${items === 1 ? "item" : "items"}`;

  return (
    <header className="site-header" ref={ref}>
      <p className="topline">
        <span className="topline-status" data-open={status.open || undefined}>
          {status.text}
        </span>
        <span className="topline-note">{home.orderNote}</span>
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
        </nav>
        <div className="header-actions">
          <Link to="/shop" className="btn btn-small header-cta">
            Order for tomorrow
          </Link>
          <Link
            to="/cart"
            className="bag-link"
            aria-label={`Your bag, ${bagLabel}`}
          >
            <ShoppingBag size={22} strokeWidth={1.8} aria-hidden="true" />
            <span
              className="bag-count"
              aria-hidden="true"
              data-empty={items === 0 || undefined}
            >
              {items}
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
      </div>
    </header>
  );
}
