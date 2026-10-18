import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { useBoard } from "../lib/board";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="1" y="1" width="15" height="15" fill="var(--clay)" />
        <rect x="18" y="1" width="9" height="9" fill="var(--sage)" />
        <rect x="18" y="12" width="9" height="15" fill="var(--ink)" />
        <rect x="1" y="18" width="15" height="9" fill="var(--stone)" />
      </svg>
      <span>Mosaic</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
  const board = useBoard();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const count = board.length;
  return (
    <header className="site-header" ref={ref}>
      <div className="header-bar">
        <Logo />
        <nav
          id="site-nav"
          className="site-nav"
          aria-label="Main"
          data-open={open || undefined}
        >
          {nav.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
          <Link to="/consultation" className="btn nav-cta">
            Book a consultation
          </Link>
        </nav>
        <Link
          to="/samples"
          className="board-link"
          aria-label={`Your sample board, ${count} ${count === 1 ? "sample" : "samples"}`}
        >
          <span className="board-chips" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <i key={i} data-on={i < count || undefined} />
            ))}
          </span>
          <span className="board-link-label">Board</span>
          <span className="board-count" aria-hidden="true">
            {count}
          </span>
        </Link>
        <span className="visually-hidden" aria-live="polite">
          {count
            ? `${count} ${count === 1 ? "sample" : "samples"} on your board`
            : ""}
        </span>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
    </header>
  );
}
