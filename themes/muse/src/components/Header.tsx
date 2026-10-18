import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, useCart } from "../lib/cart";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <span className="logo-word">Muse</span>
      <span className="logo-city">{brand.city}</span>
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

  const label = `${items} ${items === 1 ? "piece" : "pieces"}`;

  return (
    <header className="site-header" ref={ref}>
      <ul className="announcement" aria-label="Services">
        {brand.announcement.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
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
          <Link to="/shop" className="btn btn-ink nav-cta">
            Shop {brand.seasonShort}
          </Link>
        </nav>
        <Link to="/bag" className="bag-link" aria-label={`Bag, ${label}`}>
          <ShoppingBag size={19} strokeWidth={1.5} aria-hidden="true" />
          <span className="bag-word">Bag</span>
          <span className="bag-count" aria-hidden="true">
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
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
          )}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
    </header>
  );
}
