import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { countOf, useCart } from "../cart";
import { Mark } from "./Mark";

export function Header() {
  const path = useRoute();
  const count = countOf(useCart());
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

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
          <Link to="/menu" className="btn btn-primary nav-cta">
            Start an order
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            to="/order"
            className="bag"
            aria-label={`Your order: ${count} ${count === 1 ? "item" : "items"}`}
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
          <Link to="/menu" className="btn btn-primary header-cta">
            Order now
          </Link>
          <button
            ref={button}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {count
          ? `${count} ${count === 1 ? "item" : "items"} in your order`
          : ""}
      </p>
    </header>
  );
}
