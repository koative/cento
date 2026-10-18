import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { Logo } from "./Logo";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

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
        <Link to="/" className="home-link" aria-label={`${brand.name}, home`}>
          <Logo />
        </Link>

        <div
          id="site-nav"
          ref={panel}
          className="nav-panel"
          data-open={open ? "" : undefined}
        >
          <nav aria-label="Primary">
            <ul className="nav-list">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            className="header-phone"
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
          >
            <Phone aria-hidden="true" size={16} />
            {brand.phone}
          </a>
          <Link to="/tender" className="btn btn-signal">
            Invite us to tender
          </Link>
        </div>

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
