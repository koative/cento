import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useRoute } from "../router";
import { brand, nav } from "../content";
import { useBench } from "../lib/bench";
import { Logo } from "./Logo";

export function Header() {
  const path = useRoute();
  const count = useBench().length;
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

  const benchLabel = `${count} ${count === 1 ? "member" : "members"}`;

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
          <Logo />
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
          <div className="nav-extra">
            <Link to="/signin">Sign in</Link>
            <Link to="/post" className="btn btn-seal">
              Post a project
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <Link
            to="/bench"
            className="bench-link"
            aria-label={`Your bench: ${benchLabel}`}
          >
            Bench
            <span
              key={count}
              className="bench-count"
              data-empty={count ? undefined : ""}
            >
              {count}
            </span>
          </Link>
          <Link to="/signin" className="header-signin">
            Sign in
          </Link>
          <Link to="/post" className="btn btn-seal header-cta">
            Post a project
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
        {count ? `${benchLabel} on your bench` : ""}
      </p>
    </header>
  );
}
