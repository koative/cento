import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { usePlan, usePlanMessage } from "../lib/plan";
import { Mark } from "./Mark";

export function Header() {
  const path = useRoute();
  const count = usePlan().length;
  const said = usePlanMessage();
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
        <p className="header-when">
          {brand.dates}
          <span>{brand.city}</span>
        </p>

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
                <Link to={l.to}>
                  {l.label}
                  {l.to === "/agenda" && count > 0 && (
                    <span
                      className="nav-count"
                      aria-label={`, ${count} in your plan`}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/tickets" className="btn btn-ink nav-cta">
            Get tickets
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/tickets" className="btn btn-ink header-cta">
            Get tickets
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
      <div className="spectrum-rule" key={path} aria-hidden="true" />
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
    </header>
  );
}
