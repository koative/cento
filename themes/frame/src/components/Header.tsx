import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { count, order } from "../lib/store";

export function Logo() {
  return (
    <Link
      to="/"
      className="logo"
      aria-label={`${brand.name}, ${brand.photographer} photography, home`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 12V4h8M20 4h8v8M28 20v8h-8M12 28H4v-8" />
        <circle cx="16" cy="16" r="2.6" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const items = count(order.use());
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
        <Link to="/contact" className="btn nav-cta">
          Commission a shoot
        </Link>
      </nav>
      <Link
        to="/order"
        className="order-link"
        aria-label={`Print order, ${items} ${items === 1 ? "print" : "prints"}`}
      >
        Order <span className="order-count">{items}</span>
      </Link>
      <span className="visually-hidden" aria-live="polite">
        {items
          ? `${items} ${items === 1 ? "print" : "prints"} in your order`
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
          <X size={22} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
        )}
        <span className="visually-hidden">Menu</span>
      </button>
    </header>
  );
}
