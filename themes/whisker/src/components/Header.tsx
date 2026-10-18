import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, Phone, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { openStatus } from "../lib/format";
import { Mark } from "./Mark";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const status = openStatus();

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
    <>
      <div className="alert-bar">
        <div className="wrap alert-row">
          <p className="status" data-open={status.open ? "" : undefined}>
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </p>
          <p className="alert-line">
            <Link to="/emergency" className="alert-link">
              Emergency?
            </Link>{" "}
            Call <a href={brand.emergencyHref}>{brand.emergencyPhone}</a>
            <span className="alert-extra"> — answered day and night</span>
          </p>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap header-row">
          <Link
            to="/"
            className="logo"
            aria-label={`${brand.name} Veterinary Clinic, home`}
          >
            <Mark />
            <span className="logo-word">
              {brand.name}
              <small>Veterinary clinic</small>
            </span>
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
              <li>
                <Link to="/emergency" className="nav-emergency">
                  Emergency
                </Link>
              </li>
            </ul>
            <a className="nav-phone" href={brand.phoneHref}>
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
          </nav>

          <div className="header-actions">
            <Link to="/book" className="btn btn-primary">
              Book a visit
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
              {open ? (
                <X aria-hidden="true" />
              ) : (
                <MenuIcon aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
