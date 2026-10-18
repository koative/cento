import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, TriangleAlert, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { alerts, brand, nav } from "../content";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.full}, home`}>
      <span className="logo-mark plate" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M6 11 16 5.5 26 11Z M8 25V14 M13 25V14 M19 25V14 M24 25V14 M5 26.5h22" />
        </svg>
      </span>
      <span className="logo-text">
        <span className="logo-small">City of</span>
        {brand.name}
      </span>
    </Link>
  );
}

const urgent = alerts.find((a) => a.level === "Urgent");
const active = alerts.filter((a) => a.level !== "Notice").length;

export function Header() {
  const path = useRoute();
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
      <p className="official">
        <span className="wrap">
          {brand.official} — a fictional city, for demonstration only.
        </span>
      </p>
      <div className="header-bar wrap">
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
              {n.to === "/alerts" && (
                <>
                  <span className="nav-count" aria-hidden="true">
                    {active}
                  </span>
                  <span className="visually-hidden">, {active} active</span>
                </>
              )}
            </Link>
          ))}
          <Link to="/report" className="btn btn-citron nav-cta">
            Report an issue
          </Link>
        </nav>
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
          <span>Menu</span>
        </button>
      </div>
      {urgent && path !== "/alerts" && (
        <Link to="/alerts" className="alert-strip">
          <span className="wrap">
            <TriangleAlert size={18} aria-hidden="true" />
            <strong>{urgent.level}:</strong>{" "}
            <span className="alert-strip-title">{urgent.title}</span>
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="alert-strip-go"
            />
          </span>
        </Link>
      )}
    </header>
  );
}
