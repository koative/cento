import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, Phone, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { Mark } from "./Mark";

export function Header() {
  const path = useRoute();
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
      <div className="hotline">
        <div className="wrap hotline-row">
          <p>
            <span className="hotline-long">
              Burst pipe, sparks or no power?{" "}
            </span>
            24/7 emergency line{" "}
            <a href={brand.emergencyHref} className="hotline-tel">
              {brand.emergency}
            </a>
          </p>
          <Link to="/emergency" className="hotline-link">
            What to do right now
          </Link>
        </div>
      </div>
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
          <a className="nav-phone" href={brand.phoneHref}>
            <Phone aria-hidden="true" />
            Office {brand.phone}
          </a>
        </nav>

        <div className="header-actions">
          <Link to="/book" className="btn btn-live header-cta">
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
            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
