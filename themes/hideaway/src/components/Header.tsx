import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";

/** An arched island doorway with the sea line through it. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 28 32" aria-hidden="true">
      <path
        d="M3 31V14a11 11 0 0 1 22 0v17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 31V15a7 7 0 0 1 14 0v16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M7 22.5c2.3-1.4 4.7-1.4 7 0s4.7 1.4 7 0"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

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
          <p className="nav-contact">
            <a href={brand.phoneHref}>{brand.phone}</a>
            <span>{brand.officeHours}</span>
          </p>
        </nav>

        <div className="header-actions">
          <Link to="/book" className="btn btn-primary header-cta">
            Book a stay
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
