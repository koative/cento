import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { bag, bagCount, shortlist } from "../lib/store";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <span aria-hidden="true">{brand.name}</span>
      <svg viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="5" />
      </svg>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const items = bagCount(bag.use());
  const listed = shortlist.use().length;
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
        <div className="header-tools">
          <Link
            to="/bag"
            className="bag-link"
            aria-label={`Your bag, ${items} ${items === 1 ? "item" : "items"}`}
          >
            <ShoppingBag size={20} strokeWidth={1.6} aria-hidden="true" />
            {items > 0 && (
              <span className="count" aria-hidden="true">
                {items}
              </span>
            )}
          </Link>
          <Link to="/enquire" className="btn btn-small header-cta">
            Enquire
            {listed > 0 && (
              <span className="count count-on-dark" aria-hidden="true">
                {listed}
              </span>
            )}
            {listed > 0 && (
              <span className="visually-hidden">
                {" "}
                about {listed} saved {listed === 1 ? "work" : "works"}
              </span>
            )}
          </Link>
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
        <span className="visually-hidden" aria-live="polite">
          {items
            ? `${items} ${items === 1 ? "item" : "items"} in your bag`
            : ""}
        </span>
      </div>
    </header>
  );
}
