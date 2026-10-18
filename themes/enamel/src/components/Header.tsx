import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, Phone, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, hours, nav } from "../content";
import { openStatus } from "../lib/format";
import { Mark } from "./Logo";

export function Header() {
  const path = useRoute();
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

  return (
    <header className="site-header">
      <div className="topline">
        <div className="wrap topline-row">
          <p>
            <span
              className="dot"
              data-open={status.open ? "" : undefined}
              aria-hidden="true"
            />
            {status.label}
          </p>
          <p>
            In pain? Same-day slots at 8:00 ·{" "}
            <a href={`tel:${brand.emergencyPhone.replace(/\s/g, "")}`}>
              {brand.emergencyPhone}
            </a>
          </p>
        </div>
      </div>
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Mark />
          <span>{brand.name.toLowerCase()}</span>
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
            <li className="nav-about">
              <Link to="/about">About</Link>
            </li>
          </ul>
          <a
            className="nav-phone"
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
          >
            <Phone aria-hidden="true" />
            {brand.phone}
          </a>
          <Link to="/book" className="btn btn-primary nav-cta">
            Book online
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/book" className="btn btn-primary header-cta">
            Book online
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
    </header>
  );
}
