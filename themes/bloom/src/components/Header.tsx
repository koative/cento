import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="-12 -12 24 24" aria-hidden="true">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse
            key={r}
            cx="0"
            cy="-5.5"
            rx="3.6"
            ry="5.6"
            transform={`rotate(${r})`}
          />
        ))}
        <circle r="2.4" className="logo-eye" />
      </svg>
      bloom
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
    <>
      <p className="ribbon">{brand.announcement}</p>
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
            <Link to="/delivery" className="nav-extra">
              Delivery &amp; FAQ
            </Link>
            <Link to="/shop" className="btn nav-extra nav-cta">
              Send flowers today
            </Link>
          </nav>
          <div className="header-actions">
            <Link to="/shop" className="btn btn-small header-cta">
              Send flowers
            </Link>
            <Link
              to="/cart"
              className="bag-link"
              aria-label={`Your bag, ${label}`}
            >
              <ShoppingBag size={21} strokeWidth={1.6} aria-hidden="true" />
              <span
                className="bag-count"
                aria-hidden="true"
                data-empty={items ? undefined : ""}
              >
                {items}
              </span>
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
        </div>
      </header>
    </>
  );
}
