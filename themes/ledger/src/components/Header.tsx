import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { Logo } from "./Logo";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="site-header" ref={ref}>
      <div className="wrap header-row">
        <Link to="/" className="logo-link" aria-label={`${brand.name} home`}>
          <Logo />
        </Link>
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span>Menu</span>
        </button>
        <div
          className="header-menu"
          id="site-menu"
          data-open={open ? "" : undefined}
        >
          <nav aria-label="Primary">
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <Link to="/signin" className="btn btn-quiet">
              Sign in
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Start free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
