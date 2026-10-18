import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useBasket } from "../lib/cart";
import { findSlot, dayLabel } from "../lib/slots";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 30C15.5 21 10 14 5 4" />
        <path d="M16 30V2.5" />
        <path d="M16 30C16.5 21 22 14 27 4" />
      </svg>
      <span>saffron</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const basket = useBasket();
  const items = count(basket.lines);
  const slot = findSlot(basket.slot);
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
          <Link to="/delivery" className="slot-chip">
            {slot ? (
              <>
                <span className="slot-chip-label">Your slot</span>{" "}
                {dayLabel(slot.date)}, {slot.window.label}
              </>
            ) : (
              "Book a delivery slot"
            )}
          </Link>
        </nav>
        <Link
          to="/basket"
          className="basket-link"
          aria-label={`Basket, ${items} ${items === 1 ? "item" : "items"}`}
        >
          <ShoppingBasket size={22} strokeWidth={2} aria-hidden="true" />
          <span
            className="basket-count"
            aria-hidden="true"
            key={items}
            data-empty={items ? undefined : ""}
          >
            {items}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items
            ? `${items} ${items === 1 ? "item" : "items"} in your basket`
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
