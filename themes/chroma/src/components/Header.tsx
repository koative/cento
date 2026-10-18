import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { useVisit } from "../lib/visit";
import { Wordmark } from "./Wordmark";

export function Header() {
  const path = useRoute();
  const { services } = useVisit();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const count = services.length;
  const countLabel = `${count} ${count === 1 ? "service" : "services"} in your booking`;

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
          <Wordmark />
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
            <span>{brand.address.join(", ")}</span>
          </p>
        </nav>

        <div className="header-actions">
          <Link
            to="/book"
            className="btn btn-primary header-cta"
            aria-label={count ? `Book now, ${countLabel}` : undefined}
          >
            Book
            {count > 0 && (
              <span key={count} className="cta-count" aria-hidden="true">
                {count}
              </span>
            )}
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
        {count ? countLabel : ""}
      </p>
    </header>
  );
}
