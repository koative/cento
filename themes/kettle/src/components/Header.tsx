import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, hours, nav } from "../content";
import { countOf, useCart } from "../lib/cart";
import { openStatus } from "../lib/util";
import { Mark } from "./Art";

export function Header() {
  const path = useRoute();
  const count = countOf(useCart());
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const status = openStatus(hours);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const items = `${count} ${count === 1 ? "item" : "items"}`;

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Mark />
          <span>{brand.name}</span>
        </Link>

        <nav
          id="site-nav"
          ref={panel}
          className="site-nav"
          data-open={open ? "" : undefined}
          aria-label="Primary"
        >
          <ul>
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="nav-status" data-open={status.open ? "" : undefined}>
            {status.label}
          </p>
          <Link to="/tours" className="btn btn-copper nav-cta">
            Book a tour
          </Link>
        </nav>

        <div className="header-actions">
          <p className="header-status" data-open={status.open ? "" : undefined}>
            {status.label}
          </p>
          <Link
            to="/cart"
            className="bag"
            aria-label={`Pickup order: ${items}`}
          >
            <ShoppingBag aria-hidden="true" />
            <span
              key={count}
              className="bag-count"
              data-empty={count ? undefined : ""}
            >
              {count}
            </span>
          </Link>
          <Link to="/tours" className="btn btn-copper header-cta">
            Book a tour
          </Link>
          <button
            ref={button}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {count ? `${items} in your pickup order` : ""}
      </p>
    </header>
  );
}
