import { useEffect, useRef, useState } from "react";
import { Menu, Package, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { itemCount, useBox } from "../lib/box";
import { deliveryDates, shortDate, timeLeft, useNow } from "../lib/week";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={brand.name + ", home"}>
      <svg viewBox="0 0 28 32" aria-hidden="true">
        <rect x="6" y="2" width="16" height="5" rx="1.5" />
        <path d="M5 9h18a2 2 0 0 1 2 2v16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V11a2 2 0 0 1 2-2Z" />
        <path d="M8 18h12M8 22h8" />
      </svg>
      pantry
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const items = itemCount(useBox());
  const now = useNow();
  const dates = deliveryDates(now);
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
    <header className="site-header" ref={ref}>
      <p className="cutoff-bar">
        <span>
          Choose by Wed 11:59 pm
          <span className="cutoff-dates">
            {" "}
            for delivery {shortDate(dates.Mon)} – {shortDate(dates.Thu)}
          </span>
        </span>
        <span className="cutoff-left">{timeLeft(now)} left</span>
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
          <Link to="/plans" className="btn btn-small nav-cta">
            Build your box
          </Link>
        </nav>
        <Link to="/box" className="box-link" aria-label={`Your box, ${label}`}>
          <Package size={21} strokeWidth={1.75} aria-hidden="true" />
          <span className="box-count" aria-hidden="true">
            {items || ""}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {items ? `${label} in your box` : ""}
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
