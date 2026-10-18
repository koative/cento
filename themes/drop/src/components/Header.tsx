import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";
import { at, dropNo, nextDrop, shortCountdown, useNow } from "../lib/time";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="1" y="1" width="22" height="22" />
        <path d="M12 4v11M7 10.5l5 5 5-5M6 19.5h12" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const items = count(useCart());
  const now = useNow();
  const next = nextDrop(now);
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
        </nav>
        <Link to={`/drops/${next.id}`} className="next-pill">
          <span className="next-pill-no">{dropNo(next)}</span>
          <span className="next-pill-name">{next.name}</span>
          <span className="num">
            {at(next.date) > now ? shortCountdown(at(next.date) - now) : "Live"}
          </span>
        </Link>
        <Link
          to="/cart"
          className="cart-link"
          aria-label={`Bag, ${items} ${items === 1 ? "item" : "items"}`}
        >
          <ShoppingBag size={20} strokeWidth={2} aria-hidden="true" />
          <span className="cart-count num" aria-hidden="true">
            {items || ""}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items
            ? `${items} ${items === 1 ? "item" : "items"} in your bag`
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
