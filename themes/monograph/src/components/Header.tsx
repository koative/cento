import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, currentIssue, nav, nextIssue } from "../content";

export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label={brand.name + ", home"}>
      Monograph<span aria-hidden="true">Quarterly</span>
    </Link>
  );
}

export function Header() {
  const path = useRoute();
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

  return (
    <header className="site-header" ref={ref}>
      <div className="dateline wrap">
        <span>
          No. {currentIssue.no} · {currentIssue.word} · {currentIssue.season}
        </span>
        <span className="dateline-next">
          No. {nextIssue.no}, {nextIssue.word}, ships {nextIssue.ships}
        </span>
      </div>
      <div className="bar wrap">
        <Wordmark />
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
          <Link to="/subscribe" className="btn nav-cta">
            Subscribe
          </Link>
        </nav>
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
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>
    </header>
  );
}
