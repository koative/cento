import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { countdown, nextFlight, useNow } from "../lib/format";
import { Mark } from "./Logo";

export function Header() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const now = useNow();
  const next = nextFlight(now);
  const t = next && countdown(Date.parse(next.date) - now);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target))
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
          <span>{brand.name.toLowerCase()}</span>
        </Link>

        <div
          id="site-menu"
          ref={panel}
          className="site-menu"
          data-open={open ? "" : undefined}
        >
          <nav aria-label="Primary">
            <ul>
              {nav.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          {next && t && (
            <Link
              to="/manifest"
              className="header-next"
              aria-label={`Next: ${next.name}, launches in ${t.d} days`}
            >
              <span className="header-next-label">Next: {next.name}</span>
              <span className="tnum" aria-hidden="true">
                T−{t.d}d {t.h}:{t.m}:{t.s}
              </span>
            </Link>
          )}
          <Link to="/rideshare" className="btn btn-primary">
            Price a payload
          </Link>
        </div>

        <button
          ref={button}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>
    </header>
  );
}
