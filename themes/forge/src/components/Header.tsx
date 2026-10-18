import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, nav } from "../content";
import { Link, useRoute } from "../router";
import { Logo } from "./Logo";

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
      <div className="utility">
        <div className="wrap utility-row">
          <span>{brand.certs.join(" · ")}</span>
          <span className="utility-contact">
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.rfqEmail}`}>{brand.rfqEmail}</a>
          </span>
        </div>
      </div>
      <div className="wrap header-row">
        <Logo />
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
          <Link to="/rfq" className="btn btn-primary nav-cta">
            Request a quote
          </Link>
        </nav>
        <Link to="/rfq" className="btn btn-primary header-cta">
          Request a quote
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
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
